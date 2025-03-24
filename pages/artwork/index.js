import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Error from 'next/error';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Pagination from 'react-bootstrap/Pagination';
import ArtworkCard from '@/components/ArtworkCard';
import validObjectIDList from '@/public/data/validObjectIDList.json'

const PER_PAGE = 12;

export default function Artwork() {
    const router = useRouter();
    let finalQuery = router.asPath.split('?')[1];

    const { data, error } = useSWR(
        finalQuery
            ? `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`
            : null
    );

    const [artworkList, setArtworkList] = useState([]);
    const [page, setPage] = useState(1);
    useEffect(() => {
        if (data?.objectIDs) {
            let filteredResults = validObjectIDList.objectIDs.filter(x => data.objectIDs.includes(x));  
            let results = [];
            for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
                results.push(filteredResults.slice(i, i + PER_PAGE));
            }
    
            setArtworkList(results);
            setPage(1);
        }
    }, [data]);
    
    if (error) return <Error statusCode={404} />;

    return (
        <>
            {artworkList.length > 0 ? (
                <>
                    <Row className="gy-4">
                        {artworkList[page - 1]?.map((objectID) => (
                            <Col lg={3} key={objectID}>
                                <ArtworkCard objectID={objectID} />
                            </Col>
                        ))}
                    </Row>
                    <Row className="mt-4">
                        <Col className="d-flex justify-content-center">
                            <Pagination>
                                <Pagination.Prev
                                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={page === 1}
                                />
                                <Pagination.Item active>{page}</Pagination.Item>
                                <Pagination.Next
                                    onClick={() =>
                                        setPage((prev) =>
                                            prev < artworkList.length ? prev + 1 : prev
                                        )
                                    }
                                    disabled={page === artworkList.length}
                                />
                            </Pagination>
                        </Col>
                    </Row>
                </>
            ) : (
                <Row>
                    <Col>
                        <h4>Nothing Here</h4>
                        <p>Try searching for something else.</p>
                    </Col>
                </Row>
            )}
        </>
    );
}