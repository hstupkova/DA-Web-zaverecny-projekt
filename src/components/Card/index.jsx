import React from 'react';
import './style.css';
import classNames from 'classnames';

const Card = ({word, couple, language, play, disabled, selected, answered, wrong}) => {

  const handleClick = () => {
    play(word, couple, language);
  };

  const classNameText = classNames({
    'card': true,
    'card--selected': selected,
    'card--answered': answered,
    'card--wrong': wrong
  });

  return (
    <button type="button" 
      className={classNameText} 
      disabled={(disabled && !selected) || answered}
      onClick={handleClick}>{word}</button>
  );
};

export default Card;