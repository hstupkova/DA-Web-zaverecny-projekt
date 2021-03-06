import React, { useEffect, useState } from 'react';
import useSound from 'use-sound';
import { audio } from './audio';
import { shuffleArray } from '../../library/shuffleArray';
import Button from '../Button';
import './style.css';

const Audio = () => {
  const [answer, setAnswer] = useState('');
  const [answerAccepted, setAnswerAccepted] = useState(null);
  const [points, setPoints] = useState(0);
  const [audioIndex, setAudioIndex] = useState(0);
  const [array] = useState(shuffleArray(audio));
  const audioItem = array[audioIndex];
  const [isPlaying, setIsPlaying] = useState(false);
  const [play, { stop }] = useSound(`${audioItem?.path}`, {
    onend: () => {
      setIsPlaying(false);
    },
  });

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  const handleSound = () => {
    if (isPlaying) {
      stop();
    } else {
      play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleClick = () => {
    answer.toLowerCase().trim() === `${audioItem.reply}`
      ? setAnswerAccepted(true) & setPoints(points + 1)
      : setAnswerAccepted(false);
  };

  const handleAudioIndex = () => {
    setIsPlaying(false);
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
            Poslechni si nahrávku a doplň chybějící slovo do věty.
          </p>
          <p className="listening__points text">
            Zodpovězeno správně {points}/15.
          </p>
        </section>
        {audioItem && (
          <>
            <section className="listening__assignment">
              {isPlaying ? (
                <>
                  <div onClick={handleSound} className="listening__sound">
                    <img
                      className="listening__speaker"
                      src="./assets/sound-off.svg"
                      alt="speaker off"
                    />
                    <div className="listening__loader">
                      <span className="listening__stroke"></span>
                      <span className="listening__stroke"></span>
                      <span className="listening__stroke"></span>
                      <span className="listening__stroke"></span>
                      <span className="listening__stroke"></span>
                      <span className="listening__stroke"></span>
                      <span className="listening__stroke"></span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <img
                    onClick={handleSound}
                    className="listening__speaker"
                    src="./assets/sound-on.svg"
                    alt="speaker on"
                  />
                </>
              )}
              <p className="listening__sentence text">
                {audioItem.textA}{' '}
                <input
                  autoFocus
                  type="text"
                  value={answer}
                  onChange={handleChange}
                />
                {audioItem.textB}
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
              {answerAccepted === false ? (
                <div className="listening__feedback--negative">
                  <img
                    className="listening__cross"
                    src="./assets/cross.svg"
                    alt="bad answer"
                  />
                  <p className="listening__solution text">
                    Správná odpověď je:{' '}
                    <span className="listening__solution--bold">
                      {audioItem.reply}
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
                  disabled={answerAccepted !== null}
                  onClick={handleClick}
                >
                  Vyhodnotit
                </Button>
              </div>
              <div className="listening__button">
                <Button
                  page="audio"
                  disabled={answerAccepted === null}
                  onClick={handleAudioIndex}
                >
                  Další věta
                </Button>
              </div>
            </nav>
            <img
              className="listening__programmer"
              src="./assets/programmer-working-desk.svg"
              alt="programmer listening to music"
            />
          </>
        )}
        {audioIndex >= array.length && (
          <div className="listening__result">
            <p className="listening__result--big">Jsi v cíli!</p>
            <img
              className="listening__victory"
              src="./assets/finish-listening.svg"
              alt="woman celebrating victory"
            />
          </div>
        )}
      </main>
    </>
  );
};

export default Audio;
