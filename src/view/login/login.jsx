import { useState } from 'react';
import { Navigate } from 'react-router-dom'; 
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Logo from '../../assets/logo-img.png';
import '../login/login.css';
//import Navbar from '../../components/navbar/menu';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebase from '../../config/firebase';
import { useSelector, useDispatch } from 'react-redux';

function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [msgTipo, setMsgTipo] = useState();
    //const [loading, setLoading] = useState();

    const dispatch = useDispatch();
    const auth = getAuth(firebase);
    
    function logar() {
        signInWithEmailAndPassword(auth, email, password)
            .then(response => {
                setMsgTipo('success');
                setTimeout(() => {
                    dispatch({ type: 'LOG_IN', userEmail: email });
                }, 2000);
               // setLoading(0);
                console.log(response);
            })
            .catch((error) => {
                setMsgTipo('error');
               // setLoading(0);
                console.log(error.message);
            });
    }

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
               
                {useSelector(state => state.userLogged) > 0 ? <Navigate to='/' /> : null}
               
                <div className="row">
                    <div className="col-md-6 d-flex flex-column justify-content-between">
                        <div className="d-flex justify-content-center">
                            <Image src={Logo} alt="Logo" fluid className="img-mobile" />
                        </div>
                    </div>
                    <div className="col-md-6 d-flex flex-column justify-content-between">
                        <p className="h1 text-center font-weight-bold">Bem vindo!</p>
                        <p className="lead text-center">Ao Sistema de Recomendação de Planos de Ensino</p>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Senha</Form.Label>
                                <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Senha" />
                            </Form.Group>
                            <div className='text-center'>
                                <Button onClick={logar} variant="primary" type="button">Entrar</Button>
                            </div>
                            
                            <div className="msg-login text-black text-center my-5">
                                {msgTipo === 'success' && <span><strong>WoW!</strong> Você está conectado!</span>}
                                {msgTipo === 'error' && <span><strong>Ops!</strong> Verifique se a senha ou usuário estão corretos!  </span>}
                            </div>
                            
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login; 