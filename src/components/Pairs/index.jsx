import React from 'react';
import './style.css';

import Card from '../Card';
import { pairs } from './pairs.js';

const Pairs = () => {
  let numberOfPairs = 9;
  const mq = window.matchMedia('(min-width: 576px)');
  if (mq.matches) { numberOfPairs = 12; }
  
  const pairsToDisplay = pairs.slice(0, numberOfPairs);
  const wordsToDisplayCS = pairsToDisplay.map(item => { return {word: item.cs, couple: item.en}});
  const wordsToDisplayEN = pairsToDisplay.map(item => { return {word: item.en, couple: item.cs}});
  const wordsToDisplay = [].concat(wordsToDisplayCS, wordsToDisplayEN);

  return (
    <main className="pairs">
      <section className="pairs__text">
        <h1 className="heading">Hledání dvojic</h1>
        <p className="text">Hledej kartičky, které k sobě patří! Na některých kartičkách jsou anglické termíny, na jiných jejich české překlady. Označ, které dvě označují tu samou věc, a sbírej body. Kliknutím na tlačítko Nová hra si nech kartičky rozdat znovu. Good luck!</p>
      </section>

      <section className="pairs__wrapper">
        <div className="game__wrapper">
          <div className="game__button-wrapper">
            <button className="button">Nová hra</button>
          </div>

          <div className="game">
            {
              wordsToDisplay.map((item, index) => 
                <Card key={index} text={item.word} />)
            }
            
          </div>
        </div>
        <div className="deck__wrapper">
          <h2 className="deck__title">Nalezené dvojice</h2>
          <div className="deck">
            {
              wordsToDisplay.map((item, index) => 
                <Card key={index} text={item.word} />)
            }
          </div>
        </div>
      </section>

    </main>
  );
};

export default Pairs;