import React, { useState } from 'react';
import useSound from 'use-sound';
import { audio } from './audio';
import number1 from './records/number1.mp3';
import './style.css';

const Audio = () => {
  const [answer, setAnswer] = useState('');
  const [answerAccepted, setAnswerAccepted] = useState(null);

  const [play] = useSound(number1);

  const handleChange = (event) => {
    setAnswer(event.target.value.toLowerCase());
  };

  const handleClick = () => {
    answer === 'length' ? setAnswerAccepted(true) : setAnswerAccepted(false);
  };

  return (
    <>
      <main className="listening">
        <section className="listening__text">
          <h1 className="heading">Poslech</h1>
          <p className="text">
            Poslechni si nahrávku a doplň chybějící slovo věty.
          </p>
        </section>
        <section className="listening__assignement">
          <p className="listening__sentence text">
            The <input type="text" value={answer} onChange={handleChange} />
            property of an array tells us how many elements it has.
          </p>
          <img
            className="listening__speaker"
            src="./assets/speaker.svg"
            alt="speaker"
            onClick={play}
          />
          <img
            className="listening__check"
            src="./assets/check.svg"
            alt="good answer"
            style={{
              display: answerAccepted === true ? 'inline-block' : 'none',
            }}
          />
        </section>
        <section
          className="listening__feedback--negative text"
          style={{
            display: answerAccepted === false ? 'inline-block' : 'none',
          }}
        >
          <img
            className="listening__cross"
            src="./assets/cross.svg"
            alt="bad answer"
          />
          <p className="listening__solution text">
            Správná odpověď je:
            <span className="listening__solution--bold"> length</span>.
          </p>
        </section>
        <nav className="listening__buttons">
          <button
            className={
              answerAccepted === null
                ? 'listening__button'
                : 'listening__button listening__button--disabled'
            }
            disabled={answerAccepted === null ? false : true}
            onClick={handleClick}
          >
            Vyhodnotit
          </button>
          <button
            className={
              answerAccepted === null
                ? 'listening__button listening__button--disabled'
                : 'listening__button'
            }
            disabled={answerAccepted === null ? true : false}
          >
            Další věta
          </button>
        </nav>
        <img
          className="listening__programmer"
          src="./assets/programmer-working-desk.jpg"
          alt="programmer listening to music"
        />
      </main>
    </>
  );
};

export default Audio;
