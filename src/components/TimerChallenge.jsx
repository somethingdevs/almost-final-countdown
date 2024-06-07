import { useState, useRef, useEffect } from 'react';

import ResultModal from './ResultModal';

export default function TimerChallenge({ title, targetTime }) {
  const timer = useRef();
  const dialog = useRef();
  const [timeRemaining, setTimeRemaining] = useState(targetTime * 1000);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (isActive && timeRemaining <= 0) {
      clearInterval(timer.current);
      setIsActive(false);
      dialog.current.open();
    }
  }, [timeRemaining, isActive]);

  function handleStart() {
    if (!isActive) {
      setIsActive(true);
      timer.current = setInterval(() => {
        setTimeRemaining((prevTimeRemaining) => prevTimeRemaining - 10);
      }, 10);
    }
  }

  function handleStop() {
    clearInterval(timer.current);
    setIsActive(false);
    dialog.current.open();
  }

  function handleReset() {
    setTimeRemaining(targetTime * 1000);
    setIsActive(false);
  }

  return (
    <>
      <ResultModal
        ref={dialog}
        targetTime={targetTime}
        remainingTime={timeRemaining}
        onReset={handleReset}
      />
      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">{targetTime} sec</p>
        <p>
          <button onClick={isActive ? handleStop : handleStart}>
            {isActive ? 'Stop' : 'Start'} Challenge
          </button>
        </p>
        <p className={isActive ? 'active' : undefined}>
          {isActive ? 'Time is running...' : 'Timer inactive'}
        </p>
      </section>
    </>
  );
}
