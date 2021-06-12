import React from 'react';
import './style.css';
import classNames from 'classnames';

const Button = ({children, page, onClick, disabled, type}) => {
  const btnClass = classNames({
    btn: true,
    'btn--pairs': page === 'pairs',
    'btn--audio': page === 'audio',
    'btn--choice': page === 'choice',
    'btn--about': page === 'about'
  });

  return (
    <button className={btnClass} 
      onClick={onClick}
      disabled={disabled}
      type={type}>{children}</button>
  )
};

export default Button;