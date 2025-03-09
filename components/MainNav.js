import { useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Link from 'next/link';

export default function MainNav() {
    const [searchField, setSearchField] = useState('');
    const router = useRouter();

    const handleSearch = (event) => {
        event.preventDefault();
        if (searchField.trim()) {
            router.push(`/artwork?title=true&q=${searchField}`);
        }
    };

    return (
        <>
            <Navbar className="fixed-top navbar-dark bg-dark">
                <Container>
                    <Navbar.Brand>Mustansir Lightwalla</Navbar.Brand>
                    <Nav className="me-auto">
                        <Link href="/" passHref legacyBehavior>
                            <Nav.Link>Home</Nav.Link>
                        </Link>
                        <Link href="/search" passHref legacyBehavior>
                            <Nav.Link>Advanced Search</Nav.Link>
                        </Link>
                    </Nav>
                    <Form className="d-flex" onSubmit={handleSearch}>
                    <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            value={searchField}
                            onChange={(e) => setSearchField(e.target.value)}
                        />
                        <Button type="submit" variant="light">Search</Button>
                    </Form>
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    );
}