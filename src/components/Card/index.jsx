import React from 'react';
import './style.css';

const Card = ({word, couple, language, play, disabled, selected}) => {

  const handleClick = () => {
    play(word, couple, language);
  };

  return (
    <button type="button" 
      className={selected ? "card card--selected" : "card"} 
      disabled={disabled && !selected}
      onClick={handleClick}>{word}</button>
  );
};

export default Card;