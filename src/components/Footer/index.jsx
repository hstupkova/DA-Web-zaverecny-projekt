import React from 'react';
import './style.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer__text">Vyrobeno s 🖤 pro Czechitas, 2021</p>
      <p className="footer__text">
        pictures from <a href="https://www.freepik.com/">freepik</a> | icons
        from <a href="https://iconmonstr.com/">iconmonstr</a> | texts inspired
        by <a href="https://eloquentjavascript.net/">Eloquent JavaScript</a> and{' '}
        <a href="https://marksheet.io/">MarkSheet</a> | Audio animation from{' '}
        <a href="https://codepen.io/WebKitCoding/pen/MWKQKKZ">CodePen</a>
      </p>
    </footer>
  );
};

export default Footer;
