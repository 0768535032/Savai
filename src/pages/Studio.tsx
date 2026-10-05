import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import PageHead from '../components/PageHead';
import { images } from '../content';

export default function Studio() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.endsWith('/contact')) {
      document.getElementById('contact')?.scrollIntoView({ block: 'end' });
    }
  }, [pathname]);

  return (
    <>
      <PageHead
        src={images.studioDesk}
        alt="An open notebook and portfolio on a studio desk"
        title="We keep the notebook open."
        subtitle="Real people, real desks, real Nairobi."
      />
      <section className="studio-sec" aria-label="We're in studio">
        <div className="chairbg" aria-hidden="true">
          <img src={images.armchair} alt="" />
        </div>
        <div className="ttl">
          <h2 className="t1">WE'RE IN STUDIO.</h2>
          <h2 className="t2">Take a seat.</h2>
          <p className="t3">(There's plenty of paint to go around.)</p>
        </div>
      </section>
      <section
        className="dark b"
        id="contact"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: `url('${images.smoke}') center/cover`,
        }}
      >
        <div className="wrap" style={{ position: 'relative' }}>
          <h2 style={{ textShadow: '0 2px 16px rgba(0,0,0,.7)' }}>Say hello.</h2>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
