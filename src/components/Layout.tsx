import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Nav from './Nav';
import Footer from './Footer';

export default function Layout() {
  const { pathname, hash } = useLocation();
  const solid = pathname !== '/';

  useEffect(() => {
    document.title =
      pathname === '/'
        ? 'Savai. we know your story....'
        : pathname.startsWith('/studio')
          ? 'Savai. Studio'
          : `Savai. ${pathname.replace('/', '').replace(/^\w/, (c) => c.toUpperCase())}`;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return (
    <>
      <Nav solid={solid} />
      <Outlet />
      <Footer />
    </>
  );
}
