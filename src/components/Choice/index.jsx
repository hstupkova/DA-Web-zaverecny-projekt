import React, { useState } from 'react';
import './style.css';

const Choice = () => {
  const [answer, setAnswer] = useState('');
  const [answerAccepted, setAnswerAccepted] = useState(null);

  const handleChange = (event) => {
    setAnswer(event.target.value);
    console.log(event.target.value);
  };
  const handleClick = () => {
    answer === 'font weight'
      ? setAnswerAccepted(true)
      : setAnswerAccepted(false);
  };

  return (
    <>
      <main className="choice">
        <section className="choice__text">
          <h1 className="heading">Výběr slov</h1>
          <p className="text">Zvol chybějící slovo ve větě.</p>
        </section>
        <section className="choice__assignement">
          <p className="choice__sentence text">
            Set a __________ to change the boldness of a font.
          </p>
          <div className="text" onChange={handleChange}>
            <label>
              <input
                type="radio"
                name="answer"
                id="answer1"
                value="font size"
              />
              font size
            </label>
            <label>
              <input
                type="radio"
                name="answer"
                id="answer2"
                value="font style"
              />
              font style
            </label>
            <label>
              <input
                type="radio"
                name="answer"
                id="answer3"
                value="font weight"
              />
              font weight
            </label>
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
              Správná odpověď je:
              <span className="choice__solution--bold"> font weight</span>.
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
