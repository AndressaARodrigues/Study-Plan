import React, { useState } from 'react';
import './accordion.css';

function AccordionComponent({ title, codigo, periodo, peso, onAdicionar, mostrarBotaoAdicionar}) {
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
        {mostrarBotaoAdicionar && (
          <button className='adicionar-btn' onClick={onAdicionar}>
          <i className="bi bi-plus-circle"></i>
        </button>
        )}
        {title}
        <i className={`fa ${isOpen ? 'bi bi-chevron-up' : 'bi bi-chevron-down'}`}
           style={{ color: `${isOpen ? 'blue' : ''}`} 
        } />

      </div>
      {isOpen && (
        <div className='accordion-info'>
          <p>{codigo} - {title}</p>
          
          <p dangerouslySetInnerHTML={{ __html: periodo === 'Complementar' ?
                'Disciplina Complementar<br>(Cadeira não Obrigatória)' :
                `${periodo}º Semestre<br>(Cadeira Obrigatória)` }}
          />
          
          <p>
            {peso} créditos - {peso === 4 ? '60h' : peso === 2 ? '30h' : peso === 3 ? '45h' : ''}
          </p>

        </div>
      )}
    </div>
  );
}

export default AccordionComponent;
