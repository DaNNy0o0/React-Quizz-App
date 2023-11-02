import React, { useRef } from "react";

const Answers = ({ answers, userSelectedAnswers, answerState, onSelect }) => {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    // New array with shuffled answers and sorted by random number
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = userSelectedAnswers === answer; // Return true of false if answer selected by user is same that last answer picked on array of answers selected by user
        let cssClass = ""; // Variable to contain values for class changes

        // If answer state is answered and isSelected is true, cssClass now is equal to selected
        if (answerState === "answered" && isSelected) {
          cssClass = "selected";
        }

        // If answer state is correct/wrong and isSelected is true, cssClass now is equal to value of answerState
        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClass = answerState;
        }

        return (
          <li key={answer} className="answer">
            <button onClick={() => onSelect(answer)} className={cssClass} disabled={answerState !== ''}>
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Answers;
