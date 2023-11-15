import { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc, getDocs, DocumentReference, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; 
import firebase from '../../config/firebase';
import Navbar from '../../components/navbar/mainNavigation';
import AccordionComponent from '../../components/accordion/accordion';
import DisciplinasRecomendadas from '../../components/disciplinasRecomendadas/disciplinasRecomendadas';
import './home.css';

function Home() {
    const auth = getAuth(firebase);
    const user = auth.currentUser;

    const [capacidadeMochila, setCapacidadeMochila] = useState(null);
    const [nomesDisciplinas, setNomesDisciplinas] = useState([]);
    const [nomesDisciplinasNaoNoUsuario, setNomesDisciplinasNaoNoUsuario] = useState([]);
    const [resultDisciplinas, setResultDisciplinas] = useState([]);
    const [mostrarDisciplinasRecomendadas, setMostrarDisciplinasRecomendadas] = useState(false);

    const semestreIdExemplo = 'twyH3UVeA28bvH82xBJ2';
       
    async function obterNomesDisciplinas(referencias) {
        const nomesDisciplinas = [];

        for (const referencia of referencias) {
            try {
                // Verifique se a referência é uma instância válida de DocumentReference
                if (referencia instanceof DocumentReference) {
                    const disciplinaDocSnapshot = await getDoc(referencia);

                    if (disciplinaDocSnapshot.exists()) {
                        const disciplinaDados = disciplinaDocSnapshot.data();

                        const periodo = disciplinaDados.disciplina_periodo;
                        // Cria um array para o período se ainda não existir
                        if (!nomesDisciplinas[periodo]) {
                            nomesDisciplinas[periodo] = [];
                        }
                        
                        // Adiciona a disciplina ao array do período
                        nomesDisciplinas[periodo].push({
                            id: referencia.id,
                            nome: disciplinaDados.disciplina_nome,
                            peso: disciplinaDados.peso,
                            valor: disciplinaDados.valor,
                        });
                    } else {
                        console.log('Disciplina não encontrada:', referencia.id);
                    }
                } else {
                    console.error('Referência inválida:', referencia);
                }
            } catch (error) {
                console.error('Erro ao obter disciplina:', error);
            }
        }

        return nomesDisciplinas;
    }

    useEffect(() => {
       if(user){
            const fetchKnapsackCapacity = async () => {
                const db = getFirestore();
                const usersCollection = collection(db, 'usuarios');
                const userDoc = doc(usersCollection, user.uid); 
            
                try {
                    const userDocSnapshot = await getDoc(userDoc);
                    if (userDocSnapshot.exists()) {
                        const userData = userDocSnapshot.data();
                        if (userData && userData.capacidade_mochila !== undefined) {
                            setCapacidadeMochila(userData.capacidade_mochila);
                            //console.log(userData.capacidade_mochila);
                        } else {
                            console.error('Campo capacidade_mochila não encontrado no documento do usuário.');
                        }
                    } else {
                        console.error('Usuário não encontrado.');
                    }
                } catch (error) {
                    console.error('Erro ao buscar capacidade da mochila:', error);
                }
            };

            const fetchDisciplinasUsuario = async (semestreId) => {
                try {
                  const db = getFirestore();
                  const colecaoUsuarios = collection(db, 'usuarios');
                  const colecaoDisciplinas = collection(db, 'disciplinas');
                  const referenciaDocUsuario = doc(colecaoUsuarios, user.uid);
              
                  const snapshotDocUsuario = await getDoc(referenciaDocUsuario);
              
                  if (snapshotDocUsuario.exists()) {
                    const dadosUsuario = snapshotDocUsuario.data();
              
                    // Verifique se o usuário tem um array 'disciplinas'
                    if (dadosUsuario && dadosUsuario.disciplinas) {
                      const referenciasDisciplinasUsuario = dadosUsuario.disciplinas;
              
                      // Obtenha todas as disciplinas da coleção "disciplinas"
                      const snapshotDisciplinas = await getDocs(colecaoDisciplinas);
                      const disciplinasColecao = snapshotDisciplinas.docs.map(doc => doc.ref);
              
                      // Obtenha as referências das disciplinas do semestre específico
                      const semestreDocRef = doc(db, 'semestres', semestreId);
                      const semestreDocSnapshot = await getDoc(semestreDocRef);
              
                      if (semestreDocSnapshot.exists()) {
                        const semestreDados = semestreDocSnapshot.data();
                        const referenciasDisciplinasSemestre = semestreDados?.disciplinas || [];
              
                        // Verifique se os arrays estão definidos antes de realizar as operações
                        if (Array.isArray(referenciasDisciplinasUsuario) && Array.isArray(referenciasDisciplinasSemestre)) {
                          // Encontre as disciplinas que não estão no array do usuário
                          let disciplinasNaoNoUsuario = disciplinasColecao.filter(
                            disciplina =>
                              !referenciasDisciplinasUsuario.find(ref => ref.path === disciplina.path) &&
                              referenciasDisciplinasSemestre.some(refSemestre => refSemestre.path === disciplina.path)
                          );
              
                          // Filtrar as disciplinas que possuem pré-requisitos vencidos ou não possuem pré-requisitos
                            disciplinasNaoNoUsuario = await Promise.all(disciplinasNaoNoUsuario.map(async disciplina => {
                                const disciplinaSnapshot = await getDoc(disciplina);
                                const disciplinaData = disciplinaSnapshot.data();
                            
                                // Verificar se a disciplina tem um pré-requisito e se está vencido
                                const prerequisitoVencido = (
                                    disciplinaData?.prerequisito &&
                                    disciplinaData.prerequisito.path &&
                                    referenciasDisciplinasUsuario.some(
                                        refUsuario => refUsuario.path === disciplinaData.prerequisito.path
                                    )
                                );
                            
                                // Se a disciplina tem um pré-requisito vencido OU não tem pré-requisito, incluir na lista
                                return prerequisitoVencido || !disciplinaData.prerequisito ? disciplina : null;
                            }));
                            
                            // Remover elementos nulos do array resultante
                            disciplinasNaoNoUsuario = disciplinasNaoNoUsuario.filter(Boolean);

                            // Mapeie as disciplinas não encontradas para obter os nomes
                            const nomesDisciplinasNaoNoUsuario = await obterNomesDisciplinas(disciplinasNaoNoUsuario);
                
                            //console.log('Disciplinas não vencidas pelo usuário, e ofertadas no semestre:', nomesDisciplinasNaoNoUsuario);
                            setNomesDisciplinasNaoNoUsuario(nomesDisciplinasNaoNoUsuario);
                        } else {
                          console.error('Arrays de disciplinas do usuário ou do semestre não estão definidos corretamente.');
                        }
                      } else {
                        console.log('Semestre não encontrado');
                      }
                    } else {
                      console.error('Campo disciplinas não encontrado no documento do usuário.');
                    }
                  } else {
                    console.error('Usuário não encontrado.');
                  }
                } catch (error) {
                  console.error('Erro ao buscar disciplinas do usuário:', error);
                }
              };
              
            
            fetchKnapsackCapacity();
            fetchDisciplinasUsuario(semestreIdExemplo);
       }       

       const fetchNomesDisciplinasPorSemestre = async (semestreId) => {
        try {
            const db = getFirestore();
            const semestreDocRef = doc(db, 'semestres', semestreId);

            const semestreDocSnapshot = await getDoc(semestreDocRef);

            if (semestreDocSnapshot.exists()) {
                const semestreDados = semestreDocSnapshot.data();
                const referenciasDisciplinas = semestreDados.disciplinas;

                //console.log('Referências de Disciplinas:', referenciasDisciplinas);

                const nomesDisciplinas = await obterNomesDisciplinas(referenciasDisciplinas);

                //console.log('Nomes das Disciplinas:', nomesDisciplinas);

                setNomesDisciplinas(nomesDisciplinas);
            } else {
                console.log('Semestre não encontrado');
            }
        } catch (error) {
            console.error('Erro ao obter nomes das disciplinas por semestre:', error);
        }
       };

        fetchNomesDisciplinasPorSemestre(semestreIdExemplo);

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

    const knapsackButtonClick = () => {
        if (nomesDisciplinasNaoNoUsuario && capacidadeMochila) {
            const items = nomesDisciplinasNaoNoUsuario
                .reduce((acc, curr) => acc.concat(curr), []) 
                .map(disciplina => ({
                    nome: disciplina.nome,
                    weight:  disciplina.peso || 0, 
                    value: disciplina.valor || 0, 
                }));
    
            const result = knapsack(items, capacidadeMochila);
    
            //console.log('Disciplinas Recomendadas:', result.selectedItems);
    
            setResultDisciplinas(result.selectedItems);
            setMostrarDisciplinasRecomendadas(true);
        }
    };

    return (
        <>
            <Navbar />
            <div className='conteiner custom-container2'>
                <button onClick={knapsackButtonClick} className='my-4 custom-button'> + Gerar Recomendação</button>
                <div>
                    {mostrarDisciplinasRecomendadas && (
                        <>
                            <p className='h2 text-center my-4'>Disciplinas Recomendadas</p>
                            {resultDisciplinas.map((disciplina, i) => (
                                <DisciplinasRecomendadas key={i} title={disciplina.nome} />
                            ))}
                        </>
                    )}
                </div>
                <div>
                    <p className='h2 text-center my-4'>Disciplinas Ofertadas 2023/2</p>
                    {Object.keys(nomesDisciplinas).map((periodo, index) => (
                        <div key={index}>
                            <p><b>{periodo === 'Complementar' ? 'Disciplinas Complementares' : `${periodo}º Semestre`}</b></p>
                            
                            {nomesDisciplinas[periodo].map((disciplina, i) => (
                                <AccordionComponent key={i} title={disciplina.nome} />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Home;
