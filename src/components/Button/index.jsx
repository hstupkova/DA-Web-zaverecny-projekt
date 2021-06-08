import React from 'react';
import './style.css';
import classNames from 'classnames';

const Button = ({children, page, onClick, disabled}) => {
  const btnClass = classNames({
    btn: true,
    'btn--pairs': page === 'pairs',
    'btn--audio': page === 'audio',
    'btn--choice': page === 'choice'
  });

  return (
    <button className={btnClass} 
      onClick={onClick}
      disabled={disabled}>{children}</button>
  )
};

export default Button;