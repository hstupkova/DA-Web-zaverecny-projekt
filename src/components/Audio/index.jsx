import React, { useState } from 'react';
import useSound from 'use-sound';
import { audio as audioArray } from './audio';

import './style.css';

const Audio = () => {
  const [answer, setAnswer] = useState('');
  const [answerAccepted, setAnswerAccepted] = useState(null);
  const [audioIndex, setAudioIndex] = useState(0);
  const audio = audioArray[audioIndex];
  const [play] = useSound(`${audio?.path}`);

  const handleChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleClick = () => {
    answer.toLowerCase().trim() === `${audio.reply}`
      ? setAnswerAccepted(true)
      : setAnswerAccepted(false);
  };

  const handleAudioIndex = () => {
    setAudioIndex(audioIndex + 1);
    setAnswer('');
    setAnswerAccepted(null);
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
        {audio && (
          <div>
            <section className="listening__assignement">
              <img
                className="listening__speaker"
                src="./assets/speaker.svg"
                alt="speaker"
                onClick={play}
              />
              <p className="listening__sentence text">
                {audio.textA}{' '}
                <input
                  autoFocus
                  type="text"
                  value={answer}
                  onChange={handleChange}
                />
                {audio.textB}
              </p>
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
                Správná odpověď je:{' '}
                <span className="listening__solution--bold">{audio.reply}</span>
                .
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
                onClick={handleAudioIndex}
              >
                Další věta
              </button>
            </nav>
          </div>
        )}
        <div className="listening__result">
          {audioIndex >= audioArray.length && <p>Jsi v cíli!</p>}
        </div>
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
