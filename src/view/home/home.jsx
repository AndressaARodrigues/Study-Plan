import { useState, useEffect } from 'react';

import { getFirestore, collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; 

import firebase from '../../config/firebase';

import Navbar from '../../components/navbar/mainNavigation';
import DisciplinasOfertadas from '../../components/disciplinasOfertadas/disciplinasOfertadas';
import './home.css';

function Home() {
    const auth = getAuth(firebase);
    const user = auth.currentUser;

    const [capacidadeMochila, setCapacidadeMochila] = useState(null);
    const [disciplinas, setDisciplinesUser] = useState([]);
    const [disciplinasRecomendadas, setDisciplinasRecomendadas] = useState([]);

    useEffect(() => {
        if (user){
             // Função para buscar a capacidadeMochila do banco de dados Firebase
            const fetchKnapsackCapacity = async () => {
                const db = getFirestore();
                const usersCollection = collection(db, 'usuarios');
                const userDoc = doc(usersCollection, user.uid); 
            
                try {
                    const userDocSnapshot = await getDoc(userDoc);
                    if (userDocSnapshot.exists()) {
                        const userData = userDocSnapshot.data();
                        if (userData && userData.capacidadeMochila !== undefined) {
                            setCapacidadeMochila(userData.capacidadeMochila);
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
        
            // Função para buscar as disciplinas dos Usuários do banco de dados Firebase
            const fetchDisciplinesUser = async () => {
                const db = getFirestore();
                const userId = `/usuarios/${user.uid}/disciplinas`;
                const disciplinesUserCollection = collection(db, userId);
                const disciplinesUserSnapshot = await getDocs(disciplinesUserCollection);

                const disciplinesUserList = [];
                disciplinesUserSnapshot.forEach((doc) => {
                    disciplinesUserList.push(doc.data());
                });

                setDisciplinesUser(disciplinesUserList);
            };
            
            // Chamar as funções de busca ao montar o componente
            fetchKnapsackCapacity();
            fetchDisciplinesUser();
        }
    }, [user]);

    const knapsack = (items, capacidadeMochila) => {
        const n = items.length;
        const dp = new Array(n + 1).fill(0).map(() => new Array(capacidadeMochila + 1).fill(0));
    
        for (let i = 1; i <= n; i++) {
          const { weight, value } = items[i - 1];
          for (let w = 1; w <= capacidadeMochila; w++) {
            if (weight <= w) {
              dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - weight] + value);
            } else {
              dp[i][w] = dp[i - 1][w];
            }
          }
        }
    
        const selectedItems = [];
        let i = n;
        let w = capacidadeMochila;
        while (i > 0 && w > 0) {
          if (dp[i][w] !== dp[i - 1][w]) {
            selectedItems.push(items[i - 1]);
            w -= items[i - 1].weight;
          }
          i--;
        }
    
        return {
          maxValue: dp[n][capacidadeMochila],
          selectedItems: selectedItems,
        };
    };

    const gerarRecomendacao = () => {
        console.log("Gerando sua Recomendação!");

        // Verifica se há disciplinas e capacidade da mochila
        if (disciplinas.length > 0 && capacidadeMochila !== null) {
            // Filtra os itens para cálculo com base no semestre selecionado e se não possui a disciplina
            const itemsToCalculate = disciplinas.filter(disciplina => disciplina.include === false &&  disciplina.semester === "2");
        
            // Filtra as disciplinas que têm pré-requisitos e verifica se eles foram vencidos
            const validItemsToCalculate = itemsToCalculate.filter(disciplina => {
                if (typeof disciplina.prerequisites === 'string' && disciplina.prerequisites !== '') {
                  const prereqDisciplina = disciplinas.find(i => i.name === disciplina.prerequisites);
                  return prereqDisciplina && prereqDisciplina.include;
                }
                return true;
            });
              
            // Chame a função knapsack com as disciplinas e a capacidade da mochila
            const resultado = knapsack(validItemsToCalculate, capacidadeMochila);
        
            console.log('Resultado da recomendação:', resultado);
        
            setDisciplinasRecomendadas(resultado.selectedItems);
        } else {
            console.error('Não há disciplinas ou capacidade da mochila disponíveis.');
        }
        
    };

    return (
        <>
            <Navbar/>
            <div className='conteiner custom-container2'>
                <button onClick={gerarRecomendacao} className='my-4 custom-button'> + Gerar Recomendação</button>
                <ul>
                    {disciplinasRecomendadas.map((disciplina, index) => (
                        <li key={index}>{disciplina.name}</li>
                    ))}
                </ul>
                <DisciplinasOfertadas/>
            </div>

        </>
    );
}

export default Home;
