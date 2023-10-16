import { useState, useEffect } from 'react';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore'; // Importe Firestore
import Navbar from '../../components/navbar/menu';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import './perfil.css';

function Perfil() {
    const [msgTipo, setMsgTipo] = useState();
    const [nome, setNome] = useState('');
    const [matricula, setMatricula] = useState('');
    const [email, setEmail] = useState('');
    const [moradia, setMoradia] = useState(false);
    const [cursoTecnico, setCursoTecnico] = useState(false);
    const [saudeMental, setSaudeMental] = useState(''); // Pode ser uma string
    const [vinculoTrabalho, setVinculoTrabalho] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const db = getFirestore();
            const alunoDocRef = doc(db, 'usuarios', 'matricula'); // Substitua 'UID_DO_ALUNO' pelo identificador do aluno

            const alunoDoc = await getDoc(alunoDocRef);

            if (alunoDoc.exists()) {
                // Se os dados já existem, atualize os estados com os valores do Firestore
                const alunoData = alunoDoc.data();
                setNome(alunoData.nome);
                setMatricula(alunoData.matricula);
                setEmail(alunoData.email);
                setMoradia(alunoData.moradia);
                setCursoTecnico(alunoData.cursoTecnico);
                setSaudeMental(alunoData.saudeMental);
                setVinculoTrabalho(alunoData.vinculoTrabalho);
            }
        };

        fetchData();
    }, []);

    function save() {
        const db = getFirestore(); // Obtenha uma referência para o Firestore
        const alunoDocRef = doc(db, 'usuarios', matricula); // Substitua 'UID_DO_ALUNO' pelo identificador do aluno

        const userData = {
            nome: nome,
            matricula: matricula,
            email: email,
            moradia: moradia,
            cursoTecnico: cursoTecnico,
            saudeMental: saudeMental,
            vinculoTrabalho: vinculoTrabalho,
        };

        // Adicione os dados do usuário ao Firestore
        /*addDoc(collection(db, 'usuarios'), userData)
            .then(() => {
                setMsgTipo('sucesso');
                alert('Dados salvos com sucesso.');
            })
            .catch((error) => {
                setMsgTipo('erro');
                alert('Erro ao salvar os dados: ' + error.message);
            });*/

        setDoc(alunoDocRef, userData, { merge: true })
            .then(() => {
                setMsgTipo('sucesso');
                alert('Dados salvos com sucesso.');
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
                <p className="h2 text-left my-4">Editar Perfil</p>
                <div className="container">
                    <form>
                        <div className="form-group mb-4">
                            <label htmlFor="nome">Nome:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="nome"
                                name="nome"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="matricula">Matrícula:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="matricula"
                                name="matricula"
                                value={matricula}
                                onChange={(e) => setMatricula(e.target.value)}
                            />
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="email">Email:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="moradia">Você mora sozinho?</label>
                            <Form.Select
                                aria-label="Default select example"
                                value={moradia ? 'true' : 'false'}
                                onChange={(e) => setMoradia(e.target.value === 'true')}
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
                                value={cursoTecnico ? 'true' : 'false'}
                                onChange={(e) => setCursoTecnico(e.target.value === 'true')}
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
                                value={saudeMental}
                                onChange={(e) => setSaudeMental(e.target.value)}
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
                                value={vinculoTrabalho}
                                onChange={(e) => setVinculoTrabalho(e.target.value)}
                            >
                                <option>Selecione uma opção</option>
                                <option value="0">Menos de 20 horas / Não possuo</option>
                                <option value="20">20 horas</option>
                                <option value="30">30 horas</option>
                                <option value="40">40 horas</option>
                                <option value="50">44 horas</option>
                            </Form.Select>
                        </div>

                        <div>
                            <Button onClick={save} type="button" variant="primary">
                                Salvar
                            </Button>
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
