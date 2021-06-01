import React, {useState, useEffect} from 'react';
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

  const [words, setWords] = useState([]);

  useEffect(() => {
    let numberOfPairs = 9;
    const mq = window.matchMedia('(min-width: 576px)');
    if (mq.matches) { numberOfPairs = 12; }

    shuffleArray(pairs);
    const pairsToDisplay = pairs.slice(0, numberOfPairs);
    const wordsCS = pairsToDisplay.map(item => { return {word: item.cs, couple: item.en}});
    const wordsEN = pairsToDisplay.map(item => { return {word: item.en, couple: item.cs}});
    const wordsCombined = [].concat(wordsCS, wordsEN);
    shuffleArray(wordsCombined);
    setWords(wordsCombined);
  }, []);

  const [cardsSelected, setCardsSelected] = useState([]);
  const [cardDisabled, setCardDisabled] = useState(false);
  const [index, setIndex] = useState(null);

  const play = (word, couple) => {
    
    console.log(word, couple);
    const currentCard = {word: word, couple: couple};

    const includesObject = (array, object) => {
      return array.some(item => 
        JSON.stringify(item) === JSON.stringify(object));
    }

    const indexOfObject = (array, object) => {
      for (let i = 0; i < array.length; i++) {
        if (JSON.stringify(array[i]) === JSON.stringify(object)) {
          return i;
        } else {return null};
      }
    }

    if (includesObject(cardsSelected, currentCard)) {
      setIndex(indexOfObject(cardsSelected, currentCard));
      if (index === 1) {
        setCardsSelected(cardsSelected.splice(0, 1));
        setIndex(null);
      } else if (index === 0 && cardsSelected.length === 2) {
        setCardsSelected(cardsSelected.splice(1, 1));
        setIndex(null);
      } else if (index === 0 && cardsSelected.length === 1) {
        setCardsSelected([]);
        setIndex(null);
      }
    } else if (cardsSelected.length < 2) {
      setCardsSelected(cardsSelected.concat(currentCard));
    }

    /*
    if (cardsSelected.length === 2) {
      setCardDisabled(true);
    } else {
      setCardDisabled(false);
    }*/
  }

  useEffect(() => {
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
                  play={play}
                  disabled={cardDisabled} />)
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