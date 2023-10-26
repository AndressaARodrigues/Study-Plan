import { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import Navbar from '../../components/navbar/mainNavigation';
import DisciplinasOfertadas from '../../components/disciplinasOfertadas/disciplinasOfertadas';
import './home.css';
import { getAuth } from 'firebase/auth'; 
import firebase from '../../config/firebase';

/*const gerarRecomendacao = () => {
    alert("Gerando sua Recomendação!");
}*/

function Home() {
    const auth = getAuth(firebase);
    const user = auth.currentUser;

    const [capacidadeMochila, setCapacidadeMochila] = useState(null);
    const [disciplinas, setDisciplinas] = useState([]);

    useEffect(() => {
        if (user){
             // Função para buscar a capacidadeMochila do banco de dados Firebase
             const buscarCapacidadeMochila = async () => {
                const db = getFirestore();
                const usuariosCollection = collection(db, 'usuarios');
                const usuarioDoc = doc(usuariosCollection, user.uid); 
            
                try {
                    const usuarioDocSnapshot = await getDoc(usuarioDoc);
                    if (usuarioDocSnapshot.exists()) {
                        const usuarioData = usuarioDocSnapshot.data();
                        if (usuarioData && usuarioData.capacidadeMochila !== undefined) {
                            setCapacidadeMochila(usuarioData.capacidadeMochila);
                        } else {
                            console.error('Campo capacidadeMochila não encontrado no documento do usuário.');
                        }
                    } else {
                        console.error('Usuário não encontrado.');
                    }
                } catch (error) {
                    console.error('Erro ao buscar capacidadeMochila:', error);
                }
             };
        
            // Função para buscar as disciplinas do banco de dados Firebase
            const buscarDisciplinas = async () => {
                const db = getFirestore();
                const userId = `/usuarios/${user.uid}/disciplinas`;
                const disciplinasCollection = collection(db, userId);
                const disciplinasSnapshot = await getDocs(disciplinasCollection);

                const disciplinasList = [];
                disciplinasSnapshot.forEach((doc) => {
                    disciplinasList.push(doc.data());
                });

                setDisciplinas(disciplinasList);
            };

            // Chamar as funções de busca ao montar o componente
            buscarCapacidadeMochila();
            buscarDisciplinas();
        }
    }, [user]);

    const gerarRecomendacao = () => {
        alert("Gerando sua Recomendação!");
        // Você pode usar os valores de capacidadeMochila e disciplinas aqui para gerar a recomendação.
    }

    return (
        <>
            <Navbar/>
            <div className='conteiner custom-container2'>
                <button onClick={gerarRecomendacao} className='my-4 custom-button'> + Gerar Recomendação</button>
                <p>Capacidade da Mochila: {capacidadeMochila}</p>
                <p>Disciplinas:</p>
                <ul>
                    {disciplinas.map((disciplina, index) => (
                        <li key={index}>{disciplina.name}</li>
                    ))}
                </ul>
            </div>

            <DisciplinasOfertadas/>
        </>
    );
}

export default Home;
