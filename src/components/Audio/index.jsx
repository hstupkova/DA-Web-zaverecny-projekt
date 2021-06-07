import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import { audio as audioArray } from './audio';
import Button from '../Button';

import './style.css';

const Audio = () => {
  const [answer, setAnswer] = useState('');
  const [answerAccepted, setAnswerAccepted] = useState(null);
  const [audioIndex, setAudioIndex] = useState(0);
  const audio = audioArray[audioIndex];
  const [play, { stop, duration }] = useSound(`${audio?.path}`, {
    interrupt: true,
  });
  const [points, setPoints] = useState(0);

  // useEffect(() => {
  //   console.log('start');
  //   return () => {
  //     console.log('Ahoj');
  //     stop();
  //   };
  // }, []);

  const handleChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleClick = () => {
    answer.toLowerCase().trim() === `${audio.reply}`
      ? setAnswerAccepted(true) & setPoints(points + 1)
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
          <p className="text">Zodpovězeno správně {points}/15.</p>
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
            </section>
            <section className="listening__feedback">
              {answerAccepted ? (
                <img
                  className="listening__check"
                  src="./assets/check.svg"
                  alt="good answer"
                />
              ) : null}
              {!answerAccepted ? (
                <div
                  className="listening__feedback--negative"
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
                    <span className="listening__solution--bold">
                      {audio.reply}
                    </span>
                    .
                  </p>
                </div>
              ) : null}
            </section>
            <nav className="listening__buttons">
              <div className="listening__button">
                <Button
                  page="audio"
                  disabled={answerAccepted === null ? false : true}
                  onClick={handleClick}
                >
                  Vyhodnotit
                </Button>
              </div>
              <div className="listening__button">
                <Button
                  page="audio"
                  disabled={answerAccepted === null ? true : false}
                  onClick={handleAudioIndex}
                >
                  Další věta
                </Button>
              </div>
            </nav>
            <img
              className="listening__programmer"
              src="./assets/programmer-working-desk.jpg"
              alt="programmer listening to music"
            />
          </div>
        )}
        <div className="listening__result">
          {audioIndex >= audioArray.length && (
            <div>
              <p className="listening__result--big">Jsi v cíli!</p>
              <img
                className="listening__victory"
                src="./assets/finish-listening.jpg"
                alt="woman celebrating victory"
              />
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Audio;
