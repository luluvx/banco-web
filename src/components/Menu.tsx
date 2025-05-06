import { Navbar, Nav, Container } from "react-bootstrap";

import { useAuth } from "../hooks/useAuth"; // o la ruta que uses
import { Link } from "react-router";
import { URLS } from "../navigation/CONSTANTS";


const Menu = () => {

    const { username, doLogout } = useAuth();

    return (
        <Navbar color="light" expand="lg" className="navbar-menu-principal">
            <Container className="container-menu">
                <Navbar.Brand className="logo" as={Link} to={URLS.HOME}><i className="bi bi-bank" style={{ color: "#206ff4" }}></i> Mi Banquito</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {username ? (
                            <>
                                <Nav.Link as={Link} to={URLS.HOME}>{username}</Nav.Link>
                                <Nav.Link onClick={doLogout}>Cerra sesion</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to={URLS.LOGIN}>Iniciar sesión</Nav.Link>
                                <Nav.Link as={Link} to={URLS.REGISTER}>Registrarse</Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Menu;
