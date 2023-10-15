import { useSate } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Logo from '../../assets/logo-img.png';
import '../login/login.css';

function Login() {
    const [email, setEmail] = useSate();
    const [senha, setSenha] = useSate();

    function logar(){
        alert('vamos logar');
    }

    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
            <div className="row">
                <div className="col-md-6 d-flex flex-column justify-content-between">
                    <div className="d-flex justify-content-center">
                        <Image src={Logo} alt="Logo" fluid className="img-mobile" />
                    </div>
                </div>
                <div className="col-md-6 d-flex flex-column justify-content-between">
                    <p className="h1 text-center font-weight-bold">Bem vindo!</p>
                    <p className="lead text-center">Ao Sistema de Recomendação de Planos de Ensino</p>
                    <Form >
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Entre com email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Senha</Form.Label>
                            <Form.Control type="password" placeholder="Senha" />
                        </Form.Group>
                       <div className='text-center'>
                        <Button onClick={logar} variant="primary" type="button">Entrar</Button>
                       </div>
                    </Form>
                </div>
            </div>
        </div>
    );
}

export default Login;
