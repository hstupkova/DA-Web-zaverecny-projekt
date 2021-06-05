import React, { useState } from 'react';
import { choice as choiceArray } from './choice';
import './style.css';

const Choice = () => {
  const [answer, setAnswer] = useState('');
  const [answerAccepted, setAnswerAccepted] = useState(null);
  const [choiceIndex, setChoiceIndex] = useState(0);
  const choice = choiceArray[choiceIndex];

  const handleChange = (event) => {
    setAnswer(event.target.value);
  };

  const rightAnswer = choice.options.find((item) => item.correct === true).word;

  const handleClick = () => {
    answer === rightAnswer ? setAnswerAccepted(true) : setAnswerAccepted(false);
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
        </section>
        <section className="choice__assignement">
          <p className="choice__sentence text">{choice.sentence}</p>
          <div className="text" onChange={handleChange}>
            {choice.options.map((item) => (
              <label key={item.word}>
                <input type="radio" name="answer" value={item.word} />
                {item.word}
              </label>
            ))}
          </div>
        </section>
        <section className="choice__feedback">
          <img
            className="choice__check"
            src="./assets/check.svg"
            alt="good answer"
            style={{
              display: answerAccepted === true ? 'inline-block' : 'none',
            }}
          />
          <div
            className="choice__feedback--negative"
            style={{
              display: answerAccepted === false ? 'inline-block' : 'none',
            }}
          >
            <img
              className="choice__cross"
              src="./assets/cross.svg"
              alt="bad answer"
            />
            <p className="choice__solution text">
              Správná odpověď je:{' '}
              <span className="choice__solution--bold">{rightAnswer}</span>.
            </p>
          </div>
        </section>
        <nav className="choice__buttons">
          <button
            className={
              answerAccepted === null
                ? 'choice__button'
                : 'choice__button choice__button--disabled'
            }
            disabled={answerAccepted === null ? false : true}
            onClick={handleClick}
          >
            Vyhodnotit
          </button>
          <button
            className={
              answerAccepted === null
                ? 'choice__button choice__button--disabled'
                : 'choice__button'
            }
            disabled={answerAccepted === null ? true : false}
            onClick={handleChoiceIndex}
          >
            Další věta
          </button>
        </nav>
        <img
          className="choice__programmer"
          src="./assets/programmer-on-pc.jpg"
          alt="programmer sitting on a laptop"
        />
      </main>
    </>
  );
};

export default Choice;
