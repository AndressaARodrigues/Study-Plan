import React from 'react';
import './disciplinasRecomendadas.css';

function DisciplinasRecomendadas({ title, onRemover/*, index*/ }) {
  return (
    <div className='disciplinas-recomendadas'>
      <button className='remover-btn' onClick={onRemover/*() => onRemover(index)*/}>
        <i className="bi bi-x-circle"></i>
      </button>
      <div className='title-recomendada'>{title}</div>
    </div>
  );
}

export default DisciplinasRecomendadas;
