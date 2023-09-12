import React, { useEffect, useState } from 'react';
import Die from './components/Die';
import { nanoid } from 'nanoid';
import { useWindowSize } from '@react-hook/window-size';
import Confetti from 'react-confetti';

function App() {
  const [dices, setDices] = useState([]);
  const [tenzies, setTenzies] = useState(false);
  const { width, height } = useWindowSize();
  const [rolls, setRolls] = useState(0);
  const [time, setTime] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [score, setScore] = useState(localStorage.getItem('score') || 1000);

  useEffect(() => {
    let intervalID;

    if (gameStarted) {
      let seconds = 0;

      intervalID = setInterval(() => {
        seconds += 1;
        setTime(seconds);
      }, 1000);
    }

    return () => clearInterval(intervalID);
  }, [gameStarted]);

  function allNewDice() {
    const newDices = [];
    let number = 0;

    for (let i = 0; i < 10; i++) {
      number = Math.ceil(Math.random() * 6);
      newDices.push({
        id: nanoid(),
        value: number,
        isHeld: false,
      });
    }

    return newDices;
  }

  function roll() {
    if (!gameStarted) {
      setDices(allNewDice());
      setRolls(1);
      setTime(0);
      setGameStarted(true);
    }

    if (!tenzies) {
      setDices((prevDices) =>
        prevDices.map((dice) => {
          if (!dice.isHeld) {
            return {
              id: nanoid(),
              value: Math.ceil(Math.random() * 6),
              isHeld: false,
            };
          }

          return dice;
        })
      );
      setRolls((prevValue) => prevValue + 1);
    } else if (tenzies) {
      setTenzies(false);
    }
  }

  function holdDice(id) {
    setDices((prevDices) =>
      prevDices.map((die) => {
        if (die.id === id) {
          return {
            ...die,
            isHeld: !die.isHeld,
          };
        }

        return die;
      })
    );
  }

  const diceElements = dices.map((die) => (
    <Die
      value={die.value}
      key={die.id}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  useEffect(() => {
    if (
      dices.every((dice) => dice.isHeld) &&
      dices.every((dice) => dices[0].value === dice.value) &&
      gameStarted
    ) {
      setTenzies(true);
      setGameStarted(false);

      if (time < score || !score) {
        setScore(time);
        localStorage.setItem('score', time);
      }
    }
  }, [dices]);

  return (
    <>
      {tenzies && <Confetti width={width} height={height} />}
      <main>
        <p className="score">
          Best score: <span className="score-seconds">{score}</span>
        </p>
        <p className="time">
          Time: <span className="time-seconds">{time}</span>
        </p>
        <p className="rolls">
          Rolls: <span className="rolls-num">{rolls}</span>
        </p>
        <h2 className="title">Tenzies</h2>
        <p className="text">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="dices-wrapper">{diceElements}</div>
        <button className="roll-btn" onClick={roll}>
          {tenzies || !dices.length ? 'New Game' : 'Roll'}
        </button>
      </main>
    </>
  );
}

export default App;
