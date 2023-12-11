import { Link, NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import './mainNavigation.css';

function MainNavigation() {
    const dispatch = useDispatch();

    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand as={Link} to="/inicio">
                        <p>Study Plan</p>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto"></Nav>
                        <Nav>
                            {useSelector(state => state.user.userLogged) > 0 ? (
                                <>
                                    <Nav.Link as={NavLink} to="/inicio" className="NavLink" >Início</Nav.Link>
                                    <Nav.Link as={NavLink} to="/editarPerfil" className="NavLink" >Perfil</Nav.Link>
                                    <Nav.Link onClick={() => dispatch({ type: 'LOG_OUT' })} as={NavLink} to="/" className="NavLink">Sair</Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link as={NavLink} to="/" className="NavLink">Logar</Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default MainNavigation;
