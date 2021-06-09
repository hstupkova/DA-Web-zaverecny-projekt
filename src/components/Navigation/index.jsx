import React, {useState} from 'react';
import './style.css';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const [hamburger, setHamburger] = useState(false);

  const handleClick = () => {
    setHamburger(!hamburger);
  };

  const handleClickItem = () => {
    setHamburger(false);
  }

  return (
    <nav className="menu">
      <button 
        id="menu__btn" 
        className="menu__btn"
        onClick={handleClick} />
        
      <div className={hamburger ? "menu__links menu--opened" : "menu__links"}>
        <div className="menu__inner">
          <NavLink 
            exact to="/" 
            className="menu__item" 
            activeClassName="menu__item--current"
            onClick={handleClickItem}>
            Domů
          </NavLink>

          <NavLink 
            to="/hledani-dvojic" 
            className="menu__item" 
            activeClassName="menu__item--current"
            onClick={handleClickItem}>
            Hledání dvojic
          </NavLink>

          <NavLink 
            to="/poslech" 
            className="menu__item" 
            activeClassName="menu__item--current"
            onClick={handleClickItem}>
            Poslech
          </NavLink>

          <NavLink 
            to="/vyber-slov" 
            className="menu__item" 
            activeClassName="menu__item--current"
            onClick={handleClickItem}>
            Výběr slov
          </NavLink>

          <NavLink 
            to="/o-projektu" 
            className="menu__item" 
            activeClassName="menu__item--current"
            onClick={handleClickItem}>
            O projektu
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;