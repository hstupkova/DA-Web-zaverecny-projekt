import React from 'react';
import './style.css';

const Button = ({children, page, onClick, disabled}) => {
  let classNameText = "btn";
  if (page === "pairs") {
    classNameText += " btn--pairs";
  } else if (page === "audio") {
    classNameText += " btn--audio";
  } else if (page === "choice") {
    classNameText += " btn--choice";
  }

  return (
    <button className={classNameText} 
      onClick={onClick}
      disabled={disabled}>{children}</button>
  )
};

export default Button;