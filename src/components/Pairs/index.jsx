import React, {useState, useEffect} from 'react';
import './style.css';

import Card from '../Card';
import Button from '../Button';
import { pairs } from './pairs.js';
import { shuffleArray } from '../../library/shuffleArray';
import isEqual from 'lodash/isEqual';
import xorWith from 'lodash/xorWith';

const Pairs = () => {
  const [numberOfPairs] = useState(window.matchMedia('(min-width: 576px)').matches ? 12 : 9);
  const [wordsCS, setWordsCS] = useState([]);
  const [wordsEN, setWordsEN] = useState([]);
  const [cardsSelected, setCardsSelected] = useState([]);
  const [cardsAnswered, setCardsAnswered] = useState([]);
  const [cardsWrong, setCardsWrong] = useState([]);
  const [mistakes, setMistakes] = useState(0);

  const newGame = () => {
    const pairsShuffled = shuffleArray(pairs);

    const pairsToDisplay = pairsShuffled.slice(0, numberOfPairs);
    const pairsCS = pairsToDisplay.map(item => { return {word: item.cs, couple: item.en, language: 'cs'}});
    setWordsCS(shuffleArray(pairsCS));
    const pairsEN = pairsToDisplay.map(item => { return {word: item.en, couple: item.cs, language: 'en'}});
    setWordsEN(shuffleArray(pairsEN));
  };

  const handleClick = () => {
    setCardsAnswered([]);
    setCardsSelected([]);
    setCardsWrong([]);
    setMistakes(0);
    newGame();
  };

  useEffect(() => {
    newGame();
  }, []);

  const play = (word, couple, language) => {
    const currentCard = {word: word, couple: couple, language: language};
    const newCardsSelected = xorWith(cardsSelected, [currentCard], isEqual);
    setCardsSelected(newCardsSelected);

    if (newCardsSelected.length === 2 && 
      newCardsSelected[0]['word'] === newCardsSelected[1]['couple']) {
        setCardsAnswered(cardsAnswered.concat(newCardsSelected));
        setCardsSelected([]);
    } else if (newCardsSelected.length === 2 && 
      newCardsSelected[0]['word'] !== newCardsSelected[1]['couple']) {
        setCardsWrong(cardsWrong.concat(newCardsSelected));
        setMistakes(mistakes + 1);
    }
  }

  useEffect(() => {
    let timerId;
    if (cardsSelected.length === 2 && 
      cardsSelected[0]['word'] !== cardsSelected[1]['couple']) {
      timerId = setTimeout(() => {
        setCardsSelected([]);
        setCardsWrong([]);
      }, 500);
    }

    return () => {timerId && clearTimeout(timerId)};
  }, [cardsSelected]);

  return (
    <main className="pairs">
      <section className="pairs__text">
        <h1 className="heading">Hledání dvojic</h1>
        <p className="text">Hledej kartičky, které k sobě patří! Na některých kartičkách jsou anglické termíny, na jiných jejich české překlady. Označ, které dvě označují tu samou věc, a sbírej body. Kliknutím na tlačítko Nová hra si nech kartičky rozdat znovu. Good luck!</p>
      </section>

      <section className="pairs__game">
        <div className="game__button-wrapper">
          <Button page="pairs" onClick={handleClick}>
            Nová hra</Button>
        </div>

        {
          cardsAnswered.length / 2 !== numberOfPairs
          ? <p className="game__score">
              Uhodnuto {cardsAnswered.length / 2}/{numberOfPairs}. Chyb {mistakes}.
            </p>
          : <p className="game__score">
              Konec hry. 
                {mistakes === 0
                  ? ' Uhodl jsi všechno napoprvé!'
                  : ` ${mistakes}x ses netrefil.`}
            </p>
        }

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
                  disabled={wordsEN.some(card => 
                    isEqual(card, cardsSelected[0]))}
                  selected={cardsSelected.some(card => isEqual(card, item))}
                  answered={cardsAnswered.some(card => isEqual(card, item))}
                  wrong={cardsWrong.some(card => isEqual(card, item))} />)
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
                  disabled={wordsCS.some(card => 
                    isEqual(card, cardsSelected[0]))}
                  selected={cardsSelected.some(card => isEqual(card, item))}
                  answered={cardsAnswered.some(card => isEqual(card, item))}
                  wrong={cardsWrong.some(card => isEqual(card, item))} />)
            }
          </div>

          {
            (cardsAnswered.length === numberOfPairs * 2) &&
            <div className="gameover">
            <div className="gameover__content">
              <div className="gameover__pic">
                <img src="./assets/nice-work.svg" alt="nice work" />
              </div>
              <p className="gameover__text">Hurá, vyhrál jsi!</p>
              <p className="gameover__mistakes">
                {mistakes === 0
                  ? 'Uhodl jsi všechno napoprvé, jsi borec.'
                  : `Netrefil ses ${mistakes}x.`}
              </p>
              <div className="game__button-wrapper">
                <Button
                  page="pairs"
                  onClick={handleClick}>Nová hra</Button>
              </div>
            </div>
          </div>
          }
          
        </div>
      </section>

    </main>
  );
};

export default Pairs;