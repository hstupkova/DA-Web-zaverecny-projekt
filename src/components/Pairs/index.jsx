import React from 'react';
import './style.css';

import Card from '../Card';
import Answer from '../Answer';
import { pairs } from './pairs.js';

const Pairs = () => {
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  let numberOfPairs = 9;
  const mq = window.matchMedia('(min-width: 576px)');
  if (mq.matches) { numberOfPairs = 12; }

  shuffleArray(pairs);
  const pairsToDisplay = pairs.slice(0, numberOfPairs);
  const wordsCS = pairsToDisplay.map(item => { return {word: item.cs, couple: item.en}});
  const wordsEN = pairsToDisplay.map(item => { return {word: item.en, couple: item.cs}});
  const words = [].concat(wordsCS, wordsEN);
  shuffleArray(words);

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
              words.map((item, index) => 
                <Card key={index} text={item.word} />)
            }
            
          </div>
        </div>
        <div className="deck__wrapper">
          <h2 className="deck__title">Nalezené dvojice</h2>
          <div className="deck">
            {
              words.map((item) => 
                <Answer key={item.word} />)
            }
          </div>
        </div>
      </section>

    </main>
  );
};

export default Pairs;