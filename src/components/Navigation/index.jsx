import React, {useState} from 'react';
import './style.css';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
  const [hamburger, setHamburger] = useState(false);

  const handleClick = () => {
    setHamburger(!hamburger);
  };

  return (
    <nav className="menu">
      <button 
        id="menu__btn" 
        className="menu__btn"
        onClick={handleClick} />
        
      <div className={hamburger ? "menu__links menu--opened" : "menu__links"}>
        <NavLink 
          exact to="/" 
          className="menu__item" 
          activeClassName="menu__item--current">
          Domů
        </NavLink>

        <NavLink 
          to="/hledani-dvojic" 
          className="menu__item" 
          activeClassName="menu__item--current">
          Hledání dvojic
        </NavLink>

        <NavLink 
          to="/poslech" 
          className="menu__item" 
          activeClassName="menu__item--current">
          Poslech
        </NavLink>

        <NavLink 
          to="/vyber-slov" 
          className="menu__item" 
          activeClassName="menu__item--current">
          Výběr slov
        </NavLink>

        <NavLink 
          to="/o-projektu" 
          className="menu__item" 
          activeClassName="menu__item--current">
          O projektu
        </NavLink>
      </div>
    </nav>
  );
};

export default Navigation;