import React, { useState } from 'react';
import './accordion.css';

function AccordionComponent({ title }) {
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
          {/* Conteúdo adicional pode ser adicionado aqui se necessário */}
        </div>
      )}
    </div>
  );
}

export default AccordionComponent;
