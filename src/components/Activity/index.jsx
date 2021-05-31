import React from 'react';
import './style.css';
import { Link } from 'react-router-dom';

const Activity = ({path, name, text, image}) => (
  <div className="activity">
    <Link to={path} className="activity__link">
        <div className="activity__img-wrapper">
          <img src={image} alt={name} className="activity__img" />
        </div>
        <h3 className="activity__title">{name}</h3>
        <p className="activity__description">{text}</p>
    </Link>
  </div>
);

export default Activity;