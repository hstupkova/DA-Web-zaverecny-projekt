import React from 'react';
import './style.css';

const Card = ({word, couple, language, play, disabled, selected, answered, wrong}) => {

  const handleClick = () => {
    play(word, couple, language);
  };

  let classNameText = "card";
  if (selected) {
    classNameText = classNameText + " card--selected";
  }

  if (answered) {
    classNameText = "card card--answered";
  }

  if (wrong) {
    classNameText = "card card--wrong";
  }

  return (
    <button type="button" 
      className={classNameText} 
      disabled={(disabled && !selected) || answered}
      onClick={handleClick}>{word}</button>
  );
};

export default Card;