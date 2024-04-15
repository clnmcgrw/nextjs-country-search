import Link from 'next/link';
import ThemeToggle from '@/components/shared/theme-toggle';
import { ThemeToggleModes } from '@/types';
import style from '@/styles/header.module.css';

const Header = ({ theme }: { theme: ThemeToggleModes | null }) => (
  <header className={style.header}>
    <div className={`ws-inner ${style.inner}`}>
      <h1 className={style.title}>
        <Link href="/">Where in the world?</Link>
      </h1>
      <div>
        <ThemeToggle initialMode={theme} />
      </div>
    </div>
  </header>
);

export default Header;
