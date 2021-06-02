import React, { useState, useEffect } from 'react';
import useSound from 'use-sound';
// import number1 from './assets/number1.mp3';
import './style.css';

const Audio = () => {
  const [answer, setAnswer] = useState('');
  const [answerAccepted, setAnswerAccepted] = useState(null);

  // const [play] = useSound(number1);

  const handleChange = (event) => {
    setAnswer(event.target.value.toLowerCase());
  };

  useEffect(() => {
    console.log(answer);
  }, [answer]);

  const handleClick = () => {
    answer === 'length' ? setAnswerAccepted(true) : setAnswerAccepted(false);
  };

  return (
    <>
      <section className="listening">
        <div className="listening__assignement">
          <p className="listening__sentence">
            The <input type="text" value={answer} onChange={handleChange} />
            property of an array tells us how many elements it has.
          </p>
          <img
            className="listening__speaker"
            src="./assets/speaker.svg"
            alt="speaker"
          />
          <img
            className="listening__check"
            src="./assets/check.svg"
            alt="good answer"
            style={{
              display: answerAccepted === true ? 'inline-block' : 'none',
            }}
          />
        </div>
        <div className="listening__feedback--negative">
          <img
            className="listening__cross"
            src="./assets/cross.svg"
            alt="bad answer"
            style={{
              display: answerAccepted === false ? 'inline-block' : 'none',
            }}
          />
          <p
            className="listening__solution"
            style={{
              display: answerAccepted === false ? 'inline-block' : 'none',
            }}
          >
            Správná odpověď je:
            <span className="listening__solution--bold"> length</span>.
          </p>
        </div>
        <div className="listening__buttons">
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
        </div>
        <img
          className="listening__programmer"
          src="./assets/programmer-working-desk.jpg"
          alt=""
        />
      </section>
    </>
  );
};

export default Audio;
