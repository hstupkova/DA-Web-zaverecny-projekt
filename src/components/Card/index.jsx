import React, {useState} from 'react';
import './style.css';

const Card = ({text, couple, play, disabled}) => {
  const [selectedCard, setSelectedCard] = useState(false);

  const handleClick = () => {
    setSelectedCard(!selectedCard);
    play(text, couple);
  };

  return (
    <button type="button" 
      className={selectedCard ? "card card--selected" : "card"} 
      disabled={disabled && !selectedCard}
      onClick={handleClick}>{text}</button>
  );
};

export default Card;