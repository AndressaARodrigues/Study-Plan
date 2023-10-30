import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'; 
import { getAuth } from 'firebase/auth'; 

import { updateProfile } from '../../store/dataAction';
import firebase from '../../config/firebase';

import Navbar from '../../components/navbar/mainNavigation';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './perfil.css';

function Perfil() {
    const auth = getAuth(firebase);
    const user = auth.currentUser;

    const dispatch = useDispatch();
    const userDataFromRedux = useSelector(state => state.profile.data);  
    const [userData, setUserData] = useState(userDataFromRedux);

    const [isEditing, setIsEditing] = useState(false);
    const [feedback, setFeedback] = useState(null);

    function calculateCapacityknapsack(userData){
        // Valores atribuídos a cada resposta
        const values = {
            moraSozinho: { true: 2, false: 0 },
            cursoTecnico: { true: 0, false: 1 },
            vinculoTrabalho: { 0: 0, 20: 6, 30: 8, 40: 10, 44: 12 },
            saudeMental: { Bom: 0, Regular: 2, Ruim: 5 },
        };

        // Inicializa a capacidade da mochila com 32
        let initialCapacity = 32;
        let capacityStudent = 0;
        // Calcular a capacidade com base nas respostas do usuário
        capacityStudent = values.moraSozinho[userData.moradia] 
                        + values.cursoTecnico[userData.cursoTecnico] 
                        + values.vinculoTrabalho[userData.vinculoTrabalho] 
                        + values.saudeMental[userData.saudeMental];

        const knapSackCapacity = initialCapacity - capacityStudent;

        return knapSackCapacity;
    }

    useEffect(() => {
        if (user) {
            const fetchUser = async () => {
                const db = getFirestore();
                const userDocRef = doc(db, 'usuarios', user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    dispatch(updateProfile(userData));
                    setUserData(userData); 
                }
            };
            fetchUser();
        } 
    }, [dispatch, user]);

    const save = async () => {
        try {
            if (user) {
                // Calcular a capacidade da mochila
                const newCapacity = calculateCapacityknapsack(userData);

                // Salvar os dados no Firebase
                const db = getFirestore();
                const userDocRef = doc(db, 'usuarios', user.uid);
                await setDoc(userDocRef, { ...userData, capacidadeMochila: newCapacity });
                setIsEditing(false);
                
                console.log(newCapacity);
                // Atualizar os dados no Redux Store
                dispatch(updateProfile({ ...userData, capacidadeMochila: newCapacity }));
                
                // Define a mensagem de feedback
                setFeedback('Informações salvas com sucesso.');

                // Limpa a mensagem de feedback após 3 segundos (3000 milissegundos)
                setTimeout(() => {
                    setFeedback(null);
                }, 3000);
            
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
                {isEditing ? (
                    <p className="h3 text-center my-4">Editar de Perfil</p>
                ) : (
                    <p className="h3 text-center my-4">Perfil</p>
                )}
                <div className="container">
                    {feedback && (
                        <div className="alert alert-success rounded mt-2">
                            {feedback}
                        </div>
                    )}
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
                                value={userData.vinculoTrabalho}
                                onChange={(e) => setUserData({ ...userData, vinculoTrabalho: e.target.value})}
                                disabled={!isEditing}
                            >
                                <option>Selecione uma opção</option>
                                <option value="0">Menos de 20 horas / Não possuo</option>
                                <option value="20">20 horas</option>
                                <option value="30">30 horas</option>
                                <option value="40">40 horas</option>
                                <option value="44">44 horas</option>
                            </Form.Select>
                        </div>

                        <div className='text-center'>
                            {isEditing ? (
                                <>
                                    <Button onClick={save} type="button" variant="primary" className="mx-2 my-2">
                                    Salvar
                                    </Button>
                                    <Button onClick={() => setIsEditing(false)} type="button" variant="secondary" className="mx-2 my-2">
                                    Cancelar
                                    </Button>
                                </>
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
