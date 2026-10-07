import { useEffect, useState } from 'react';

const KEY = 'mb-theme';
const EVENT = 'mb:themechange';

export function getTheme() {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
}

function apply(next) {
  document.documentElement.dataset.theme = next;
  try {
    localStorage.setItem(KEY, next);
  } catch {
    // storage can be unavailable (private mode); the theme still applies for this visit
  }
  window.dispatchEvent(new Event(EVENT));
}

/** Toggle the theme, revealing the new one as a circle growing from `origin`. */
export function toggleTheme(origin) {
  const next = getTheme() === 'dark' ? 'light' : 'dark';
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!document.startViewTransition || reduce) {
    apply(next);
    return;
  }
  const x = origin?.x ?? window.innerWidth - 48;
  const y = origin?.y ?? 32;
  const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
  const transition = document.startViewTransition(() => apply(next));
  transition.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
      { duration: 650, easing: 'cubic-bezier(0.16, 1, 0.3, 1)', pseudoElement: '::view-transition-new(root)' },
    );
  });
}

export function useTheme() {
  const [theme, setTheme] = useState(getTheme);
  useEffect(() => {
    const sync = () => setTheme(getTheme());
    window.addEventListener(EVENT, sync);
    return () => window.removeEventListener(EVENT, sync);
  }, []);
  return theme;
}
