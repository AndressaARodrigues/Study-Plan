import Navbar from '../../components/navbar/menu';
import Button from 'react-bootstrap/Button';
import './perfil.css';

function Perfil() {
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
                            />
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="matricula">Matrícula:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="matricula"
                                name="matricula"
                            />
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="moradia">Você mora sozinho?</label>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="moradiaSim"
                                    name="moradia"
                                />
                                <label className="form-check-label" htmlFor="moradiaSim">
                                    Sim
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="moradiaNao"
                                    name="moradia"
                                />
                                <label className="form-check-label" htmlFor="moradiaNao">
                                    Não
                                </label>
                            </div>
                        </div>

                        <div className="form-group mb-4">
                            <label htmlFor="cursotecnico">Você possui experiência prévia em um curso técnico ?</label>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="cursoTecnicoSim"
                                    name="cursotecnico"
                                />
                                <label className="form-check-label" htmlFor="cursoTecnicoSim">
                                    Sim
                                </label>
                            </div>

                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="cursoTecnicoNao"
                                    name="cursotecnico"
                                />
                                <label className="form-check-label" htmlFor="cursoTecnicoNao">
                                    Não
                                </label>
                            </div>
                        </div>

                        <div className="form-group mb-4">
                            <label>Como classifica sua saúde mental?</label>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="saudeMentalBom"
                                    name="saudeMental"
                                />
                                <label className="form-check-label" htmlFor="saudeMentalBom">
                                    Bom
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="saudeMentalRegular"
                                    name="saudeMental"
                                />
                                <label className="form-check-label" htmlFor="saudeMentalRegular">
                                    Regular
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="saudeMentalRuim"
                                    name="saudeMental"
                                />
                                <label className="form-check-label" htmlFor="saudeMentalRuim">
                                    Ruim
                                </label>
                            </div>
                        </div>

                        <div className="form-group mb-4">
                            <label>Você possui vínculo de trabalho?</label>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="vinculoSem"
                                    name="vinculoTrabalho"
                                />
                                <label className="form-check-label" htmlFor="vinculoSem">
                                    Menos de 20 horas / Não possuo
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="vinculo20"
                                    name="vinculoTrabalho"
                                />
                                <label className="form-check-label" htmlFor="vinculo20">
                                    20 horas
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="vinculo30"
                                    name="vinculoTrabalho"
                                />
                                <label className="form-check-label" htmlFor="vinculo30">
                                    30 horas
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="vinculo40"
                                    name="vinculoTrabalho"
                                />
                                <label className="form-check-label" htmlFor="vinculo40">
                                    40 horas
                                </label>
                            </div>
                            <div className="form-check">
                                <input
                                    type="radio"
                                    className="form-check-input"
                                    id="vinculo44"
                                    name="vinculoTrabalho"
                                />
                                <label className="form-check-label" htmlFor="vinculo44">
                                    44 horas
                                </label>
                            </div>
                        </div>

                        <div>
                            <Button variant="primary">
                                Salvar
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Perfil;
