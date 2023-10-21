import { useState, useEffect } from 'react';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'; 
import { getAuth } from 'firebase/auth'; 

import Navbar from '../../components/navbar/mainNavigation';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './perfil.css';

function Perfil() {
    const auth = getAuth();
    const user = auth.currentUser;

    const [isEditing, setIsEditing] = useState(false);
    const [msgTipo, setMsgTipo] = useState();
    const [userData, setUserData] = useState({
        nome: '',
        matricula: '',
        email: '',
        moradia: false,
        cursoTecnico: false,
        saudeMental: '',
        vinculoTrabalho: '',
    });


    useEffect(() => {
        const fetchData = async () => {
            /*if (!user) {
                // O usuário não está autenticado
                alert('Usuário não autenticado');
                return;
            }*/

            const db = getFirestore();
            const alunoDocRef = doc(db, 'usuarios', user.uid); 

            const alunoDoc = await getDoc(alunoDocRef);

            if (alunoDoc.exists()) {
                const alunoData = alunoDoc.data();
                setUserData({
                    nome: alunoData.nome,
                    matricula: alunoData.matricula,
                    email: alunoData.email,
                    moradia: alunoData.moradia,
                    cursoTecnico: alunoData.cursoTecnico,
                    saudeMental: alunoData.saudeMental,
                    vinculoTrabalho: alunoData.vinculoTrabalho,
                });
            }
        };

        fetchData();
    }, [user]);

    function handleEdit() {
        setIsEditing(!isEditing); 
    }

    function save() {
        /*if (!user) {
            // O usuário não está autenticado
            alert('Usuário não autenticado');
            return;
        }*/

        const db = getFirestore(); 
        const alunoDocRef = doc(db, 'usuarios', user.uid); 

        setDoc(alunoDocRef, userData, { merge: true })
            .then(() => {
                setMsgTipo('sucesso');
                alert('Dados salvos com sucesso.');
                setIsEditing(false);
            })
            .catch((error) => {
                setMsgTipo('erro');
                alert('Erro ao salvar os dados: ' + error.message);
            });
    }

    return (
        <>
            <Navbar />
            <div className='container custom-container'>
                <p className="h2 text-center my-4">Editar Perfil</p>
                <div className="container">
                    <form>
                        <div className="form-group mb-4">
                            <label htmlFor="nome">Nome:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nome"
                                name="nome"
                                value={userData.nome}
                                onChange={(e) => setUserData({ ...userData, nome: e.target.value })}
                                disabled={!isEditing}
                           />
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="matricula">Matrícula:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="matricula"
                                name="matricula"
                                value={userData.matricula}
                                onChange={(e) => setUserData({ ...userData, matricula: e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                name="email"
                                value={userData.email}
                                onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                                disabled={!isEditing}
                            />
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="moradia">Você mora sozinho?</label>
                            <Form.Select
                                aria-label="Default select example"
                                value={userData.moradia}
                                onChange={(e) => setUserData({ ...userData, moradia: e.target.value})}
                                disabled={!isEditing}
                            >
                                <option>Selecione uma opção</option>
                                <option value="true">Sim</option>
                                <option value="false">Não</option>
                            </Form.Select>
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="cursoTecnico">Você possui experiência prévia em um curso técnico?</label>
                            <Form.Select
                                aria-label="Default select example"
                                value={userData.cursoTecnico}
                                onChange={(e) => setUserData({ ...userData, cursoTecnico: e.target.value})}
                                disabled={!isEditing}
                            >
                                <option>Selecione uma opção</option>
                                <option value="true">Sim</option>
                                <option value="false">Não</option>
                            </Form.Select>
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="saudeMental">Como classifica sua saúde mental?</label>
                            <Form.Select
                                aria-label="Default select example"
                                value={userData.saudeMental}
                                onChange={(e) => setUserData({ ...userData, saudeMental: e.target.value})}
                                disabled={!isEditing}
                            >
                                <option>Selecione uma opção</option>
                                <option value="Boa">Boa</option>
                                <option value="Regular">Regular</option>
                                <option value="Ruim">Ruim</option>
                            </Form.Select>
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="vinculoTrabalho">Você possui vínculo de trabalho?</label>
                            <Form.Select
                                aria-label="Default select example"
                                value={userData.vinculoTrabalho}
                                onChange={(e) => setUserData({ ...userData, vinculoTrabalho: e.target.value})}
                                disabled={!isEditing}
                            >
                                <option>Selecione uma opção</option>
                                <option value="0">Menos de 20 horas / Não possuo</option>
                                <option value="20">20 horas</option>
                                <option value="30">30 horas</option>
                                <option value="40">40 horas</option>
                                <option value="50">44 horas</option>
                            </Form.Select>
                        </div>

                        <div className='text-center'>
                            {isEditing ? (
                                <Button onClick={save} type="button" variant="primary">
                                Salvar
                                </Button>
                            ) : (
                                <Button onClick={handleEdit} type="button" variant="info">
                                Editar
                                </Button>
                            )}
                            </div>

                    </form>
                    <div className="msg-login text-center mt-2">
                        {msgTipo === 'sucesso' && <span><strong>WoW!</strong> Dados salvos com sucesso! </span>}
                        {msgTipo === 'erro' && <span><strong>Ops!</strong> Não foi possível salvar os dados!  </span>}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Perfil;
