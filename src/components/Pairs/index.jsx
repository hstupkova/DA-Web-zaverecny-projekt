import React, {useState, useEffect} from 'react';
import './style.css';

import Card from '../Card';
import { pairs } from './pairs.js';
import { shuffleArray } from '../../library/shuffleArray';
import isEqual from 'lodash/isEqual';
import xorWith from 'lodash/xorWith';

const Pairs = () => {
  const [wordsCS, setWordsCS] = useState([]);
  const [wordsEN, setWordsEN] = useState([]);
  const [cardsSelected, setCardsSelected] = useState([]);

  useEffect(() => {
    let numberOfPairs = 9;
    const mq = window.matchMedia('(min-width: 576px)');
    if (mq.matches) { numberOfPairs = 12; }

    const pairsShuffled = shuffleArray(pairs);

    const pairsToDisplay = pairsShuffled.slice(0, numberOfPairs);
    const pairsCS = pairsToDisplay.map(item => { return {word: item.cs, couple: item.en, language: 'cs'}});
    setWordsCS(shuffleArray(pairsCS));
    const pairsEN = pairsToDisplay.map(item => { return {word: item.en, couple: item.cs, language: 'en'}});
    setWordsEN(shuffleArray(pairsEN));
  }, []);

  const play = (word, couple, language) => {
    const currentCard = {word: word, couple: couple, language: language};
    setCardsSelected(xorWith(cardsSelected, [currentCard], isEqual));
  }

  useEffect(() => {
    console.log('cardsSelected:');
    console.log(cardsSelected);
    if (cardsSelected.length === 2 && cardsSelected[0]['word'] === cardsSelected[1]['couple']) {
      alert('hurá');
    } else if (cardsSelected.length === 2 && cardsSelected[0]['word'] !== cardsSelected[1]['couple']) {
      alert('zkus to znova');
    }
  }, [cardsSelected]);

  return (
    <main className="pairs">
      <section className="pairs__text">
        <h1 className="heading">Hledání dvojic</h1>
        <p className="text">Hledej kartičky, které k sobě patří! Na některých kartičkách jsou anglické termíny, na jiných jejich české překlady. Označ, které dvě označují tu samou věc, a sbírej body. Kliknutím na tlačítko Nová hra si nech kartičky rozdat znovu. Good luck!</p>
      </section>

      <section className="pairs__game">
        <div className="game__button-wrapper">
          <button className="button">Nová hra</button>
        </div>

        <div className="game__wrapper">
          <div className="game game--en">
            {
              wordsEN !== [] &&
              wordsEN.map((item, index) => 
                <Card key={index} 
                  word={item.word} 
                  couple={item.couple}
                  language={item.language}
                  play={play}
                  disabled={cardsSelected.length === 2}
                  selected={cardsSelected.some(card => isEqual(card, item))} />)
            }
            
          </div>
          <div className="game game--cs">
            {
              wordsCS !== [] &&
              wordsCS.map((item, index) => 
                <Card key={index} 
                  word={item.word} 
                  couple={item.couple}
                  language={item.language}
                  play={play}
                  disabled={cardsSelected.length === 2}
                  selected={cardsSelected.some(card => isEqual(card, item))} />)
            }
          </div>
        </div>
      </section>

    </main>
  );
};

export default Pairs;