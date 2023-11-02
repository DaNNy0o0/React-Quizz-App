import React, { useState, useCallback, useRef } from "react";

// Component imports
import Question from "./Question.jsx";

// Dummy_Data
import QUESTIONS_ARRAY from "../questions.js";
import Summary from "./Summary.jsx";

// Assets

const Quiz = () => {
  //   // State to know if an answer has been answered(clicked) or not
  //   const [answerState, setAnswerState] = useState("");

  //*********************************/

  // Register answers selected by users
  const [userSelectedAnswers, setUserSelectedAnswers] = useState([]);

  //*********************************/

  // Length of answers array
  const activeQuestionIndex = userSelectedAnswers.length;

  //******************************* */

  // Compare if index of actual question is same to length of questions array (To know if it's over)
  const quizIsComplete = activeQuestionIndex === QUESTIONS_ARRAY.length;

  //*********************************/

  // Fn that handle selected answers and insert on array of answers
  // Use of useCallback to avoid to create a new value on memory after every useEffect change
  const handleSelectedAnswer = useCallback(
    function handleSelectedAnswer(selectedAnswer) {
      // setAnswerState("answered"); // Change state of answer selected
      setUserSelectedAnswers((prevUserAnswers) => {
        return [...prevUserAnswers, selectedAnswer];
      });

      // // Timer to change state (again) to a correct or wrong response
      // setTimeout(() => {
      //   if (
      //     selectedAnswer === QUESTIONS_ARRAY[activeQuestionIndex].answers[0]
      //   ) {
      //     setAnswerState("correct");
      //   } else {
      //     setAnswerState("wrong");
      //   }

      //   // Timer for reset state of answer
      //   setTimeout(() => {
      //     setAnswerState("");
      //   }, 2000);
      // }, 1000);
    },
    []
  );

  //*********************************/

  // Fn that handle skip answers when times come out
  // Use of useCallback to avoid to create a new value on memory after every useEffect change
  const handleSkipAnswer = useCallback(
    () => handleSelectedAnswer(null),
    [handleSelectedAnswer]
  );

  //*********************************/

  // If quiz is complete, show a summary
  if (quizIsComplete) {
    return (
      <Summary userAnswers={userSelectedAnswers} />
    );
  }

  //*********************************/

  return (
    <div id="quiz">
      <div id="question">
        <Question
          onSelectAnswer={handleSelectedAnswer}
          onSkipAnswer={handleSkipAnswer}
          key={activeQuestionIndex}
          questionIndex={activeQuestionIndex}
        />
      </div>
    </div>
  );
};

export default Quiz;
