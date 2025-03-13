"use client";

import { useState, useEffect, useRef } from "react";
import React from "react";
import AfterGame from "../components/AfterGame";

const Quiz = () => {
  const [after, setAfter] = useState(false);
  const [level, setLevel] = useState(1);
  const [numone, setNumone] = useState(1);
  const [numtwo, setNumtwo] = useState(1);
  const [operator, setOperator] = useState("+");
  const [live, setLive] = useState(3);
  const userRef = useRef();

  useEffect(() => {
    const newOperator = ["+", "-", "*", "/"][Math.floor(Math.random() * 4)];
    const digitMultiplier = Math.pow(10, Math.floor(level / 15));
    let newNumone = Math.floor(Math.random() * 10 * digitMultiplier);
    let newNumtwo = Math.floor(Math.random() * 10 * digitMultiplier);

    if (newOperator === "/") {
      if (newNumtwo === 0) {
        newNumtwo = 1;
      }
      if (newNumone === 0) {
        newNumone = 1;
      }
      if (newNumone < newNumtwo) {
        [newNumone, newNumtwo] = [newNumtwo, newNumone];
      }
    }

    setOperator(newOperator);
    setNumone(newNumone);
    setNumtwo(newNumtwo);
  }, [level]);

  const checkup = (useranswer) => {
    userRef.current.value = "";
    if (
      parseFloat(useranswer) ===
      parseFloat(eval(`${numone} ${operator} ${numtwo}`).toFixed(2))
    ) {
      setLevel((levelpast) => levelpast + 1);
    } else {
      setLive((livepast) => livepast - 1);
      if (live === 1) {
        setAfter(true);
      }
    }
  };

  return (
    <>
      {after ? (
        <>
          <h1 className="title">Oops!</h1>
          <h2>
            The correct answer was{" "}
            {parseFloat(eval(`${numone} ${operator} ${numtwo}`).toFixed(2))}.
          </h2>
          <br />
          {level === 1 ? (
            <h2>Wanna try that again?</h2>
          ) : (
            <h2>You reached level {level - 1}.</h2>
          )}
          <br />
          <br />
          <AfterGame />
        </>
      ) : (
        <>
          {level === 1 ? (
            <h1 className="title">Bet!</h1>
          ) : (
            <h1 className="title">Nice!</h1>
          )}
          <h2>
            You have {live} lives. If you get a question wrong, you lose a life.
          </h2>
          <h2 className="question">
            Level {level}&#41; Evaluate {numone} {operator} {numtwo}
          </h2>
          <div className="ithinkits">
            <p>I think it's</p>
            <input type="text" ref={userRef} />
          </div>
          {operator === "/" && <p>Round your answer to two decimal places.</p>}
          <button
            className="button"
            onClick={() => checkup(userRef.current.value)}
          >
            Press to see if your correct...
          </button>
        </>
      )}
    </>
  );
};

export default Quiz;
