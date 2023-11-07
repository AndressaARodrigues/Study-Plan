import React, { useState } from 'react';
import './accordion.css';

function AccordionComponent({ title, codigoDisciplina, cargaHoraria, tipoDisciplina}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='accordion-container'>
      <div
        className='accordion-title'
        onClick={toggleAccordion}
        style={{
            border: `1px solid ${isOpen ? 'blue' : '#D9D9D9'}`,
            color: isOpen ? 'blue' : '',
        }}
        >
        {title}
        <i className={`fa ${isOpen ? 'bi bi-chevron-up' : 'bi bi-chevron-down'}`}
           style={{ color: `${isOpen ? 'blue' : ''}`} 
        } />
      </div>
      {isOpen && (
        <div className='accordion-info'>
            {/*<p>Codigo da disciplina: {codigoDisciplina}</p>
            <p>Carga Horária: {cargaHoraria}</p>
            <p>{tipoDisciplina}</p>*/}
            teste
        </div>
      )}
    </div>
  );
}

export default AccordionComponent;
