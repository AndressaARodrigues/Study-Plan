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
   
    function calcularCapacidadeMochila(userData){
        
        // Valores atribuídos a cada resposta
        const valores = {
            moraSozinho: { true: -2, false: 0 },
            cursoTecnico: { true: 0, false: -1 },
            vinculoTrabalho: { 0: 0, 20: -6, 30: -8, 40: -10, 50: -12 },
            saudeMental: { Bom: 0, Regular: -2, Ruim: -5 },
        };

        // Inicializar a capacidade com 32
        let capacidadeMochila = 32;
        // Calcular a capacidade com base nas respostas do usuário
        capacidadeMochila += valores.moraSozinho[userData.moradia];
        capacidadeMochila += valores.cursoTecnico[userData.cursoTecnico];
        capacidadeMochila += valores.vinculoTrabalho[userData.vinculoTrabalho];
        capacidadeMochila += valores.saudeMental[userData.saudeMental];

        /* Outro jeito de fazer
        const respostas = {
            moraSozinho,
            cursoTecnico,
            vinculoTrabalho,
            saudeMental,
        };
        Object.keys(userData).forEach((pergunta) => {
            const resposta = userData[pergunta];
            capacidadeMochila += valores[pergunta][resposta];
        }); 
        */

        return capacidadeMochila;
    }

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
                }
            };
            fetchData();
        } 
    }, [dispatch, user]);

    const save = async () => {
        try {
            if (user) {
                // Calcular a capacidade da mochila
                const novaCapacidade = calcularCapacidadeMochila(userData);

                // Salvar os dados no Firebase
                const db = getFirestore();
                const userDocRef = doc(db, 'usuarios', user.uid);
                await setDoc(userDocRef, { ...userData, capacidadeMochila: novaCapacidade });
                setIsEditing(false);
                
                // Atualizar os dados no Redux Store
                dispatch(atualizarPerfil({ ...userData, capacidadeMochila: novaCapacidade }));
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
                                <Button onClick={handleEdit} type="button" variant="secondary">
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
