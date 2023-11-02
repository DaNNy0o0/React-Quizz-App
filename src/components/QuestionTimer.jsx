import React, { useEffect, useState } from "react";

const QuestionTimer = ({ timeout, onTimeout, mode }) => {

  //*************************** */

  // State that updates remaining time of progress bar (starts with custom value prop from Quiz.jsx)
  const [remainingTime, setRemainingTime] = useState(timeout);

  //*************************** */

  // Effect that updates state every time that prop elements change
  useEffect(() => {
    const timer = setTimeout(onTimeout, timeout);

    return () => {
        clearTimeout(timer) //  "clean up" fn to clean older timers and reset to can set a timer again /
    }
  }, [timeout, onTimeout]);

  //*************************** */

  // Effect that prevents event loop from usage of setInterval
  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    return () => {
        clearInterval(interval) // "clean up" fn to clean older intervals and reset to can set a new interval again/
    }

  }, []);

  return (
    <progress id="question-time" max={timeout} value={remainingTime} className={mode}/>
  );
};

export default QuestionTimer;
