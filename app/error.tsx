'use client';
import style from '@/styles/error.module.css';

// Error boundary to show if data fetching throws error
// in real-world project we'd want a much more helpful message!
const ErrorView = ({ reset }: { reset: () => void }) => {

  return (
    <section className={style.error} data-cy="error">
      <div className="ws-inner">
        <h2>Uh Oh! Something went wrong</h2>
        <p><button onClick={() => reset()}>Try Again</button></p>
      </div>
    </section>
  )
};

export default ErrorView;
