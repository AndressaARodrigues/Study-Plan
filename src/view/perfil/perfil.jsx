import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'; 
import { getAuth } from 'firebase/auth'; 
import firebase from '../../config/firebase';
import Navbar from '../../components/navbar/mainNavigation';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './perfil.css';

function Perfil() {
    const auth = getAuth(firebase);
    const user = auth.currentUser;
    const [userData, setUserData] = useState(() => {
        // Tenta obter dados do localStorage, caso contrário, usa um objeto vazio
        const storedData = localStorage.getItem('userData');
        return storedData ? JSON.parse(storedData) : {
            nome: '',
            matricula: '',
            email: '',
            moradia: '',
            curso_tecnico: '',
            saude_mental: '',
            vinculo_trabalho: '',
        };
    });
    const [isEditing, setIsEditing] = useState(false);
    const [feedback, setFeedback] = useState(null);
    
    const calculateCapacityknapsack = (userData) => {
        const values = {
            moradia: { Sim: 2, Nao: 0 },
            curso_tecnico: { Sim: 0, Nao: 1 },
            vinculo_trabalho: { 0: 0, 20: 6, 30: 8, 40: 10, 44: 12 },
            saude_mental: { Bom: 0, Regular: 2, Ruim: 5 },
        };

        // Inicializa a capacidade da mochila com 32
        let initialCapacity = 32;
        let capacityStudent = 0;
        // Calcular a capacidade com base nas respostas do usuário
        capacityStudent = values.moradia[userData.moradia] 
                        + values.curso_tecnico[userData.curso_tecnico] 
                        + values.vinculo_trabalho[userData.vinculo_trabalho] 
                        + values.saude_mental[userData.saude_mental];

        const knapSackCapacity = initialCapacity - capacityStudent;

        return knapSackCapacity;
    }

    useEffect(() => {

        const fetchUser = async () => {
            if (user) {
                try {
                    const db = getFirestore();
                    const userDocRef = doc(db, 'usuarios', user.uid);
                    const userDoc = await getDoc(userDocRef);
                    
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUserData(userData);

                        // Salva os dados no localStorage
                        localStorage.setItem('userData', JSON.stringify(userData));
                
                    }
                } catch (error) {
                    console.error('Erro ao buscar os dados do usuário:', error);
                }
            }
        };
  
        fetchUser();
    }, [user]);


    const save = async () => {
        try {
            if (user && userData) {
                const newCapacity = calculateCapacityknapsack(userData);
                
                const db = getFirestore();
                const userDocRef = doc(db, 'usuarios', user.uid);
                await setDoc(userDocRef, { ...userData, capacidade_mochila: newCapacity });
                setIsEditing(false);

                setFeedback('Informações salvas com sucesso.');

                // Atualiza os dados no localStorage após salvar
                localStorage.setItem('userData', JSON.stringify({ ...userData, capacidade_mochila: newCapacity }));

                setTimeout(() => {
                    setFeedback(null);
                }, 3000);
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
            <div className='container custom-container'>
                {isEditing ? (
                    <p className="h3 text-center my-4">Editar Perfil</p>
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
                                <option value="Sim">Sim</option>
                                <option value="Nao">Não</option>
                            </Form.Select>
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="curso_tecnico">Você possui experiência prévia em um curso técnico?</label>
                            <Form.Select
                                value={userData.curso_tecnico}
                                onChange={(e) => setUserData({ ...userData, curso_tecnico: e.target.value})}
                                disabled={!isEditing}
                            >
                                <option>Selecione uma opção</option>
                                <option value="Sim">Sim</option>
                                <option value="Nao">Não</option>
                            </Form.Select>
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="saude_mental">Como classifica sua saúde mental?</label>
                            <Form.Select
                                value={userData.saude_mental}
                                onChange={(e) => setUserData({ ...userData, saude_mental: e.target.value})}
                                disabled={!isEditing}
                            >
                                <option>Selecione uma opção</option>
                                <option value="Bom">Bom</option>
                                <option value="Regular">Regular</option>
                                <option value="Ruim">Ruim</option>
                            </Form.Select>
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="vinculo_trabalho">Você possui vínculo de trabalho?</label>
                            <Form.Select
                                value={userData.vinculo_trabalho}
                                onChange={(e) => setUserData({ ...userData, vinculo_trabalho: e.target.value})}
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
