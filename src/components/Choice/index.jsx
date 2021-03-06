import React, { useState } from 'react';
import { choice } from './choice';
import { shuffleArray } from '../../library/shuffleArray';
import Button from '../Button';
import './style.css';

const Choice = () => {
  const [answer, setAnswer] = useState('');
  const [answerAccepted, setAnswerAccepted] = useState(null);
  const [points, setPoints] = useState(0);
  const [choiceIndex, setChoiceIndex] = useState(0);
  const [array] = useState(shuffleArray(choice));
  const choiceItem = array[choiceIndex];

  const handleChange = (event) => {
    setAnswer(event.target.value);
  };

  const isRightAnswer = () =>
    choiceItem.options.find((item) => item.correct === true).word;

  const handleClick = () => {
    answer === isRightAnswer()
      ? setAnswerAccepted(true) & setPoints(points + 1)
      : setAnswerAccepted(false);
  };

  const handleChoiceIndex = () => {
    setChoiceIndex(choiceIndex + 1);
    setAnswer('');
    setAnswerAccepted(null);
  };

  return (
    <>
      <main className="choice">
        <section className="choice__text">
          <h1 className="heading">Výběr slov</h1>
          <p className="text">Zvol chybějící slovo ve větě.</p>
          <p className="choice__points text">
            Zodpovězeno správně {points}/16.
          </p>
        </section>
        {choiceItem && (
          <div>
            <section className="choice__assignment">
              <p className="choice__sentence text">{choiceItem.sentence}</p>
              <div className="choice__options text" onChange={handleChange}>
                {choiceItem.options.map((item) => (
                  <label key={item.word} className="choice__label">
                    <input type="radio" name="answer" value={item.word} />
                    {item.word}
                  </label>
                ))}
              </div>
            </section>
            <section className="choice__feedback">
              {answerAccepted ? (
                <img
                  className="choice__check"
                  src="./assets/check.svg"
                  alt="good answer"
                />
              ) : null}
              {answerAccepted === false ? (
                <div className="choice__feedback--negative">
                  <img
                    className="choice__cross"
                    src="./assets/cross.svg"
                    alt="bad answer"
                  />
                  <p className="choice__solution text">
                    Správná odpověď je:{' '}
                    <span className="choice__solution--bold">
                      {isRightAnswer()}
                    </span>
                    .
                  </p>
                </div>
              ) : null}
            </section>

            <nav className="choice__buttons">
              <div className="choice__button">
                <Button
                  page="choice"
                  disabled={answerAccepted !== null}
                  onClick={handleClick}
                >
                  Vyhodnotit
                </Button>
              </div>
              <div className="listening__button">
                <Button
                  page="choice"
                  disabled={answerAccepted === null}
                  onClick={handleChoiceIndex}
                >
                  Další věta
                </Button>
              </div>
            </nav>
            <img
              className="choice__programmer"
              src="./assets/programmer-on-pc.svg"
              alt="programmer sitting on a laptop"
            />
          </div>
        )}
        {choiceIndex >= array.length && (
          <div className="choice__result">
            <p className="choice__result--big">Jsi v cíli!</p>
            <img
              className="choice__victory"
              src="./assets/finish-choice.svg"
              alt="woman looking in the mirror"
            />
          </div>
        )}
      </main>
    </>
  );
};

export default Choice;
