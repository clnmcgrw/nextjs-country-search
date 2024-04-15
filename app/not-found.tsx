import Link from 'next/link';
import style from '@/styles/error.module.css';

const NotFound = () => {
  return (
    <section className={style.error} data-cy="not-found">
      <div className="ws-inner">
        <h2>Page Not Found</h2>
        <p>Go to the <Link href="/">home page</Link></p>
      </div>
    </section>
  );
};

export default NotFound;
