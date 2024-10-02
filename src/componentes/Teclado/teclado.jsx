import React from 'react';

const Teclado = ({ onInput, onCorrige, onConfirma, onBranco }) => {
  const botoes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];

  return (
    <div className="teclado">
      {botoes.map((num) => (
        <button className='tecladoNumerico' key={num} onClick={() => onInput(num.toString())}>{num}</button>
      ))}
      <button className='tecladoNumerico corrige' onClick={onCorrige}>Corrige</button>
     
      <button className='tecladoNumerico branco' onClick={onBranco}>Branco</button>
      
      <p className=''></p>

            <button  className='tecladoNumerico confirma' onClick={onConfirma}>CONFIRMA </button>
    </div>
  );
};

export default Teclado;
