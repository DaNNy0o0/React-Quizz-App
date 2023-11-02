import React, { useState } from "react";
import QuestionTimer from "./QuestionTimer";
import Answers from "./Answers";

import QUESTIONS_ARRAY from "../questions.js";

const Question = ({
  onSelectAnswer,
  onSkipAnswer,
  questionIndex
}) => {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  let timer = 10000

  if (answer.selectedAnswer) {
    timer = 1000
  }

  if (answer.isCorrect !== null) {
    timer = 2000
  }

  function handleSelectAnswer(answer) {
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null,
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS_ARRAY[questionIndex].answers[0] === answer,
      });

      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000);
  }

  let answerState = "";

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer){
    answerState = 'answered'
  }

  return (
    <div id="question">
      {/* !! ==> key value usage in this case makes that React destroy this component and mount again after activeQuestionIndex changes <== !! */}
      {/* !! ==> to make that progress bar works again after pass to next question <== !! */}
      <QuestionTimer timeout={timer} onTimeout={answer.selectedAnswer === '' ? onSkipAnswer : null} mode={answerState} key={timer}/>
      <h2>{QUESTIONS_ARRAY[questionIndex].text}</h2>
      <Answers
        answers={QUESTIONS_ARRAY[questionIndex].answers}
        userSelectedAnswers={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
};

export default Question;
