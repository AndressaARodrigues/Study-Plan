import { useState } from 'react';
import { Navigate } from 'react-router-dom'; 
import { useSelector, useDispatch } from 'react-redux';

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebase from '../../config/firebase';

import { logIn } from '../../store/userAction';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Logo from '../../assets/logo-img.png';
import '../login/login.css';

function Login() {
    const auth = getAuth(firebase);

    const dispatch = useDispatch();
    const userLogged = useSelector((state) => state.user.userLogged);
    
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [msgType, setMsgType] = useState();

    function logar() {
        signInWithEmailAndPassword(auth, email, password)
            .then(response => {
                setMsgType('success');
                setTimeout(() => {
                    dispatch(logIn(email));
                }, 2000);
                console.log(response);
            })
            .catch((error) => {
                setMsgType('error');
                console.log(error.message);
            });
    }

    return (
        <>
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
                
                {/*console.log('Valor de userLogged:', userLogged)*/}

                {userLogged > 0 ? <Navigate to='/inicio' /> : <Navigate to='/' />}
               
                <div className="row">
                    <div className="col-md-6 d-flex flex-column justify-content-between">
                        <div className="d-flex justify-content-center">
                            <Image src={Logo} alt="Logo" fluid className="img-mobile" />
                        </div>
                    </div>
                    <div className="col-md-6 d-flex flex-column justify-content-between">
                        <p className="h1 text-center font-weight-bold"><strong>Study Plan</strong></p>
                        <p className="lead text-center">Sistema para Recomendação de Planos de Estudos</p>
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
                                {msgType === 'success' && <span className="alert alert-success rounded mt-2"><strong>WoW!</strong> Você está conectado!</span>}
                                {msgType === 'error' && <span className="alert alert-danger rounded mt-2"><strong>Ops!</strong> Verifique se a senha ou usuário estão corretos!  </span>}
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login; 