export default function TimerChallenge({ title, targetTime }) {
  return (
    <section className="challenge">
      <h2>{title}</h2>
      <p className="challenge-time">{targetTime} sec</p>
      <p>
        <button>Start Challenge</button>
      </p>
      <p className="">Time is running.../ Timer inactive</p>
    </section>
  );
}
