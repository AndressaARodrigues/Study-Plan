import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './mainNavigation.css';
import { useSelector, useDispatch } from 'react-redux';
import Logo from '../../assets/logo.png'
import './mainNavigation.css'

function MainNavigation() {
    const dispatch = useDispatch();

    return (
        <>
            <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img src={Logo} alt="Logo"  className="logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto"></Nav>
                        <Nav>
                            {useSelector(state => state.userLogged) > 0 ? (
                                <>
                                    <Nav.Link as={Link} to="/editarPerfil">Editar Perfil</Nav.Link>
                                    <Nav.Link onClick={() => dispatch({ type: 'LOG_OUT' }) } as={Link} to="/login">Sair</Nav.Link>
                                </>
                            ) : (
                                <>
                                    <Nav.Link as={Link} to="/login">Logar</Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default MainNavigation;
