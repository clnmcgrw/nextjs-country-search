'use client';
import { useState, useEffect } from 'react';
import { Moon } from 'lucide-react';
import { clsx } from 'clsx';
import { ThemeToggleModes } from '@/types';
import style from '@/styles/theme-toggle.module.css';

const ThemeToggle = ({ initialMode }: { initialMode: ThemeToggleModes | null }) => {
  const [mode, setMode] = useState(initialMode);

  const setThemeMode = (value: ThemeToggleModes) => {
    document.cookie = `theme=${value};`;
    document.querySelector('html')?.setAttribute('data-theme', value);
    setMode(value);
  };

  const toggleMode = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    const nextMode = mode === 'light' ? 'dark' : 'light';
    setThemeMode(nextMode);
    event.stopPropagation();
  };

  const classNames = clsx(style.toggle, {[style.darkMode]: mode === 'dark'});

  // when no cookie value for theme exists, use system preferences
  useEffect(() => {
    if (!mode) {
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setThemeMode(prefersDarkMode ? 'dark' : 'light');
    }
  }, [mode]);

  return (
    <button className={classNames} onClick={toggleMode} data-cy="theme-toggle">
      <Moon size={16} />
      <span>Dark Theme</span>
    </button>
  );
};

export default ThemeToggle;
