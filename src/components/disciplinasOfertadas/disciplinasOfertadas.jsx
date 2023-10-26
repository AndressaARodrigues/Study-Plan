import AccordionComponent from '../../components/accordion/accordion';

const accordionData = [
    {
        title: "Álgebra Linear",
        codigoDisciplina: "Al0335",
        cargaHoraria: "60 horas",
        tipoDisciplina: "Disciplina complementar",
    },
    {
        title: "Calculo I",
        codigoDisciplina: "Al0335",
        cargaHoraria: "60 horas",
        tipoDisciplina: "Disciplina complementar",
    },
    {
        title: "Circuitos Digitais",
        codigoDisciplina: "Al0335",
        cargaHoraria: "60 horas",
        tipoDisciplina: "Disciplina complementar",
    },
    {
        title: "Estrutura de Dados I",
        codigoDisciplina: "Al0335",
        cargaHoraria: "60 horas",
        tipoDisciplina: "Disciplina complementar",
    }
];

const accordionData2 = [
    {
        title: "Álgebra Linear",
        codigoDisciplina: "Al0335",
        cargaHoraria: "60 horas",
        tipoDisciplina: "Disciplina obrigatória",
    },
    {
        title: "Calculo I",
        codigoDisciplina: "Al0335",
        cargaHoraria: "60 horas",
        tipoDisciplina: "Disciplina obrigatória",
    },
    {
        title: "Circuitos Digitais",
        codigoDisciplina: "Al0335",
        cargaHoraria: "60 horas",
        tipoDisciplina: "Disciplina obrigatória",
    },
    {
        title: "Estrutura de Dados I",
        codigoDisciplina: "Al0335",
        cargaHoraria: "60 horas",
        tipoDisciplina: "Disciplina obrigatória",
    },
    {
        title: "Matemática Discreta",
        codigoDisciplina: "Al0335",
        cargaHoraria: "60 horas",
        tipoDisciplina: "Disciplina obrigatória",
    }
];

const accordionData4 = [
    {
        title: "Arquitetura e Organização de Computadores II",
        codigoDisciplina: "Al0335",
        cargaHoraria: "60 horas",
        tipoDisciplina: "Disciplina obrigatória",
    },
    {
        title: "Banco de Dados I",
        codigoDisciplina: "Al0335",
        cargaHoraria: "60 horas",
        tipoDisciplina: "Disciplina obrigatória",
    },
    {
        title: "Computação Gráfica",
        codigoDisciplina: "Al0335",
        cargaHoraria: "60 horas",
        tipoDisciplina: "Disciplina obrigatória",
    },
    {
        title: "Programação Orientada a Objetos",
        codigoDisciplina: "Al0335",
        cargaHoraria: "60 horas",
        tipoDisciplina: "Disciplina obrigatória",
    },
    {
        title: "Projeto e Análise de Algoritmos",
        codigoDisciplina: "Al0335",
        cargaHoraria: "60 horas",
        tipoDisciplina: "Disciplina obrigatória",
    }
];

const accordionData6 = [
    {
        title: "Computabilidade",
        codigoDisciplina: "Al0335",
        cargaHoraria: "60 horas",
        tipoDisciplina: "Disciplina obrigatória",
    },
    {
        title: "Engenharia de Software II",
        codigoDisciplina: "Al0335",
        cargaHoraria: "60 horas",
        tipoDisciplina: "Disciplina obrigatória",
    },
    {
        title: "Redes de Computadores",
        codigoDisciplina: "Al0335",
        cargaHoraria: "60 horas",
        tipoDisciplina: "Disciplina obrigatória",
    }
];

const accordionData8 = [
    {
        title: "Sistemas da Informação",
        codigoDisciplina: "Al0335",
        cargaHoraria: "60 horas",
        tipoDisciplina: "Disciplina obrigatória",
    }
];

function disciplinasOfertadas() {
    return (
        <>
            <div className='conteiner custom-container2'>
                <p className="h2 text-center my-4">Disciplinas Ofertadas 2022/2</p>
                <div>
                    <p><b>2º Semestre</b></p>
                    {accordionData2.map((item, index) => (
                        <AccordionComponent 
                        key={index} 
                        title={item.title} 
                        codigoDisciplina={item.codigoDisciplina}
                        cargaHoraria={item.cargaHoraria}
                        tipoDisciplina={item.tipoDisciplina}
                        />
                    ))}
                </div>
                <div>
                    <p><b>4º Semestre</b></p>
                    {accordionData4.map((item, index) => (
                        <AccordionComponent 
                            key={index} 
                            title={item.title} 
                            codigoDisciplina={item.codigoDisciplina} 
                            cargaHoraria={item.cargaHoraria}
                            tipoDisciplina={item.tipoDisciplina}
                        />
                    ))}
                </div>
                <div>
                    <p><b>6º Semestre</b></p>
                    {accordionData6.map((item, index) => (
                        <AccordionComponent 
                            key={index} 
                            title={item.title} 
                            codigoDisciplina={item.codigoDisciplina} 
                            cargaHoraria={item.cargaHoraria}
                            tipoDisciplina={item.tipoDisciplina}
                        />
                    ))}
                </div>
                <div>
                    <p><b>8º Semestre</b></p>
                    {accordionData8.map((item, index) => (
                        <AccordionComponent 
                            key={index} 
                            title={item.title} 
                            codigoDisciplina={item.codigoDisciplina} 
                            cargaHoraria={item.cargaHoraria}
                            tipoDisciplina={item.tipoDisciplina}
                        />
                    ))}
                </div>
                <div>
                    <p><b>Disciplinas Complementares</b></p>
                    {accordionData.map((item, index) => (
                        <AccordionComponent 
                            key={index} 
                            title={item.title} 
                            codigoDisciplina={item.codigoDisciplina} 
                            cargaHoraria={item.cargaHoraria}
                            tipoDisciplina={item.tipoDisciplina}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}

export default disciplinasOfertadas;
