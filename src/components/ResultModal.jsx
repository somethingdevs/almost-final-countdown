import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

const ResultModal = forwardRef(function ResultModal(
  { remainingTime, targetTime, onReset },
  ref
) {
  const userLost = remainingTime <= 0;
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  const score = Math.round((1 - remainingTime / (targetTime * 1000)) * 100);

  const dialog = useRef();

  useImperativeHandle(ref, () => ({
    open() {
      dialog.current.showModal();
    },
  }));

  return createPortal(
    <dialog
      className="result-modal"
      ref={dialog}
      onClose={onReset}
    >
      {userLost ? <h2>You lost!</h2> : <h2>Score {score}</h2>}
      <p>
        Target time was <strong>{targetTime} sec</strong>
      </p>
      <p>
        You stopped at <strong>{formattedRemainingTime} sec left</strong>
      </p>
      <form
        method="dialog"
        onSubmit={onReset}
      >
        <button>Close</button>
      </form>
    </dialog>,
    document.getElementById('modal')
  );
});

export default ResultModal;
