import React, {useState} from 'react';
import './style.css';

const Card = ({text, couple, language, play, disabled, selected}) => {

  const handleClick = () => {
    play(text, couple, language);
  };

  return (
    <button type="button" 
      className={selected ? "card card--selected" : "card"} 
      disabled={disabled && !selected}
      onClick={handleClick}>{text}</button>
  );
};

export default Card;