import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setDisciplines } from '../../store/disciplinesAction';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

import AccordionComponent from '../accordion/accordion';

function DisciplinasOfertadas() {

    //const disciplinas = useSelector((state) => state.disciplines.data);
    const disciplinas = useSelector((state) => state.disciplines.data) || [];
    const dispatch = useDispatch();

    useEffect(() => {
            // Função para buscar as disciplinas do banco de dados Firebase
            const fetchDisciplines = async () => {
                const db = getFirestore();
                const disciplinesCollection = collection(db, 'disciplinas');
                const disciplinesSnapshot = await getDocs(disciplinesCollection);

                const disciplinesList = [];
                disciplinesSnapshot.forEach((doc) => {
                    disciplinesList.push(doc.data());
                });

                dispatch(setDisciplines(disciplinesList)); 
            };
            fetchDisciplines();
        
    }, [dispatch]);

    return (
        <>
            <div className='conteiner custom-container2'>
                <p className="h2 text-center my-4">Disciplinas Ofertadas 2022/2</p>
                <div>
                    <p><b>2º Semestre</b></p>
                    {Array.isArray(disciplinas) &&
                        disciplinas
                            .filter((discipline) => discipline.semestre === "2" && discipline.oferta === 2)
                            .map((discipline, index) => (
                            <AccordionComponent key={index} title={discipline.nome} />
                            ))}
                </div>
                <div>
                    <p><b>4º Semestre</b></p>
                    {Array.isArray(disciplinas) &&
                        disciplinas
                            .filter((discipline) => discipline.semestre === "4" && discipline.oferta === 2)
                            .map((discipline, index) => (
                            <AccordionComponent key={index} title={discipline.nome} />
                            ))}
                </div>
                <div>
                    <p><b>6º Semestre</b></p>
                    {Array.isArray(disciplinas) &&
                        disciplinas
                            .filter((discipline) => discipline.semestre === "6" && discipline.oferta === 2)
                            .map((discipline, index) => (
                            <AccordionComponent key={index} title={discipline.nome} />
                            ))}
                </div>
                <div>
                    <p><b>8º Semestre</b></p>
                    {Array.isArray(disciplinas) &&
                        disciplinas
                            .filter((discipline) => discipline.semestre === "8" && discipline.oferta === 2)
                            .map((discipline, index) => (
                            <AccordionComponent key={index} title={discipline.nome} />
                            ))}
                </div>
                <div>
                    <p><b>Disciplinas Complementares</b></p>
                    {Array.isArray(disciplinas) &&
                        disciplinas
                            .filter((discipline) => discipline.semestre === "complementar" && discipline.oferta === 2)
                            .map((discipline, index) => (
                            <AccordionComponent key={index} title={discipline.nome} />
                            ))}
                </div>
            </div>
        </>
    );
}

export default DisciplinasOfertadas;
