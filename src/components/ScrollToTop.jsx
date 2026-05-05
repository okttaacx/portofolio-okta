import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);

    const timeout = setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'smooth';
      document.body.style.scrollBehavior = 'smooth';
    }, 100);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
}
