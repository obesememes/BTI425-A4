import { useState, useEffect } from 'react';
import { useAtom } from 'jotai';
import { favouritesAtom } from '@/store';
import useSWR from 'swr';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Error from 'next/error';


const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkCardDetail({ objectID }) {
    const { data, error } = useSWR(
        objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null,
        fetcher
    );

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [showAdded, setShowAdded] = useState(false);
    useEffect(() => {
        setShowAdded(favouritesList.includes(objectID));
    }, [favouritesList, objectID]);


    const handleFavouriteClick = () => {
        if (showAdded) {
            setFavouritesList((current) => current.filter((fav) => fav !== objectID));
        } else {
            setFavouritesList((current) => [...current, objectID]);
        }
        setShowAdded(!showAdded);
    };


    if (error) return <Error statusCode={404} />;
    if (!data) return <p>Loading artwork details...</p>;
    if (data.message === 'Not Found') return <Error statusCode={404} />;

    return (
        <Card>
            {data.primaryImage && <Card.Img variant="top" src={data.primaryImage} alt={data.title} />}
            <Card.Body>
                <Card.Title>{data.title || 'Untitled'}</Card.Title>
                <Card.Text>
                    <strong>Date:</strong> {data.objectDate || 'Unknown'} <br />
                    <strong>Classification:</strong> {data.classification || 'N/A'} <br />
                    <strong>Medium:</strong> {data.medium || 'N/A'} <br />
                    <strong>Artist:</strong> {data.artistDisplayName || 'Unknown'} <br />
                    {data.artistDisplayName && (
                        <>
                            <strong>Artist Bio:</strong> {data.artistDisplayBio || 'No artist information available'} <br />
                        </>
                    )}
                    <strong>Credit Line:</strong> {data.creditLine || 'N/A'} <br />
                    <strong>Dimensions:</strong> {data.dimensions || 'N/A'}
                </Card.Text>
                <Button 
                    variant={showAdded ? "primary" : "outline-primary"} 
                    onClick={handleFavouriteClick}
                >
                    {showAdded ? "+ Favourite (Added)" : "+ Favourite"}
                </Button>
            </Card.Body>
        </Card>
    );
}