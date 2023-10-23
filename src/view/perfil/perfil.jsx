import { useState, useEffect } from 'react';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'; 
import { getAuth } from 'firebase/auth'; 
import { useSelector, useDispatch } from 'react-redux';

import Navbar from '../../components/navbar/mainNavigation';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './perfil.css';
import { atualizarPerfil } from '../../store/dataAction';
import firebase from '../../config/firebase';

function Perfil() {
    const auth = getAuth(firebase);
    const user = auth.currentUser;
   
    const userDataFromRedux = useSelector(state => state.perfil.data);  
    const dispatch = useDispatch();

    const [userData, setUserData] = useState(userDataFromRedux);

    const [isEditing, setIsEditing] = useState(false);
   
    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                const db = getFirestore();
                const userDocRef = doc(db, 'usuarios', user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    dispatch(atualizarPerfil(userData));
                    setUserData(userData); 
                    
                    //localStorage.setItem('userData', JSON.stringify(userData));
                }
            };
            fetchData();
        } /*else {
            // Recupere os dados do Local Storage, se existirem
            const storedData = localStorage.getItem('userData');
            if (storedData) {
                setUserData(JSON.parse(storedData));
            }*
        }*/
    }, [dispatch, user]);

    const save = async () => {
        try {
            if (user) {
                // Salvar os dados no Firebase
                const db = getFirestore();
                const userDocRef = doc(db, 'usuarios', user.uid);
                await setDoc(userDocRef, userData);
                setIsEditing(false);
                
                // Atualizar os dados no Redux Store
                dispatch(atualizarPerfil(userData));
                //localStorage.setItem('userData', JSON.stringify(userData));
            } else {
                console.error('Usuário não autenticado.');
            }
        } catch (error) {
            console.error('Erro ao salvar os dados:', error);
        }
    };

    const handleEdit = () => {
        setIsEditing(true);
    }

    return (
        <>
            <Navbar />
            {/*console.log('Valor de userData:', userDataFromRedux)*/}

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
                    
                </div>
            </div>
        </>
    );
}

export default Perfil;
