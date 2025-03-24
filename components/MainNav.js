import { useState } from 'react';
import { useRouter } from 'next/router';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';

export default function MainNav() {
    const [searchField, setSearchField] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const router = useRouter();

    const handleSearch = (event) => {
        event.preventDefault();
        if (searchField.trim()) {
            router.push(`/artwork?title=true&q=${searchField}`);
            setIsExpanded(false);
        }
    };

    return (
        <>
            <Navbar className="fixed-top navbar-dark bg-dark" expanded={isExpanded} expand="lg">
                <Container>
                    <Navbar.Brand>Mustansir Lightwalla</Navbar.Brand>
                    <Navbar.Toggle onClick={() => setIsExpanded(!isExpanded)} aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link href="/" passHref legacyBehavior>
                                <Nav.Link active={router.pathname === "/"} onClick={() => setIsExpanded(false)}>
                                    Home
                                </Nav.Link>
                            </Link>
                            <Link href="/search" passHref legacyBehavior>
                                <Nav.Link active={router.pathname === "/search"} onClick={() => setIsExpanded(false)}>
                                    Advanced Search
                                </Nav.Link>
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
                            <Button type="submit" variant="outline-success">Search</Button>
                        </Form>
                        {/* User Dropdown */}
                        <Nav>
                            <NavDropdown title="User Name" id="user-dropdown">
                                <Link href="/favourites" passHref legacyBehavior>
                                    <NavDropdown.Item active={router.pathname === "/favourites"} onClick={() => setIsExpanded(false)}>
                                        Favourites
                                    </NavDropdown.Item>
                                </Link>
                                <Link href="/history" passHref legacyBehavior>
                                    <NavDropdown.Item active={router.pathname === "/history"} onClick={() => setIsExpanded(false)}>
                                        Search History
                                    </NavDropdown.Item>
                                </Link>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
        </>
    );
}