import React, {useState, useEffect} from 'react';
import './style.css';

import Card from '../Card';
import Answer from '../Answer';
import { pairs } from './pairs.js';
import { shuffleArray } from '../../library/shuffleArray';
import isEqual from 'lodash/isEqual';
import xorWith from 'lodash/xorWith';

const Pairs = () => {
  const [words, setWords] = useState([]);

  useEffect(() => {
    let numberOfPairs = 9;
    const mq = window.matchMedia('(min-width: 576px)');
    if (mq.matches) { numberOfPairs = 12; }

    const pairsCopy = shuffleArray(pairs);

    const pairsToDisplay = pairsCopy.slice(0, numberOfPairs);
    const wordsCS = pairsToDisplay.map(item => { return {word: item.cs, couple: item.en, language: 'cs'}});
    shuffleArray(wordsCS);
    const wordsEN = pairsToDisplay.map(item => { return {word: item.en, couple: item.cs, language: 'en'}});
    shuffleArray(wordsEN);
    const wordsCombined = [].concat(wordsCS, wordsEN);
    setWords(wordsCombined);
    console.log(wordsCombined);
  }, []);

  const [cardsSelected, setCardsSelected] = useState([]);

  const play = (word, couple, language) => {
    console.log(word, couple, language);
    const currentCard = {word: word, couple: couple, language: language};

    setCardsSelected(xorWith(cardsSelected, [currentCard], isEqual));
  }

  useEffect(() => {
    console.log('cardsSelected:');
    console.log(cardsSelected);
  }, [cardsSelected]);

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
              words !== [] &&
              words.map((item, index) => 
                <Card key={index} 
                  text={item.word} 
                  couple={item.couple}
                  language={item.language}
                  play={play}
                  disabled={cardsSelected.length === 2}
                  selected={cardsSelected.some(card => isEqual(card, item))} />)
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