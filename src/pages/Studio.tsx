import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import PageHead from '../components/PageHead';
import { images } from '../content';

const splatterColors = ['#c0563a', '#e3a26a', '#6fa5bd', '#e8c05a', '#8a5a45', '#d97fa0'];

interface PaintSplat {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  color: string;
}

export default function Studio() {
  const { pathname } = useLocation();
  const studioRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const splatId = useRef(0);
  const [splats, setSplats] = useState<PaintSplat[]>([]);

  const splatterAt = (clientX: number, clientY: number) => {
    const section = studioRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const size = 24 + Math.random() * 80;
    const splat: PaintSplat = {
      id: splatId.current++,
      x: clientX - rect.left + section.scrollLeft,
      y: clientY - rect.top + section.scrollTop,
      width: size,
      height: size * (0.7 + Math.random() * 0.6),
      rotation: Math.random() * 60 - 30,
      color: splatterColors[Math.floor(Math.random() * splatterColors.length)],
    };
    setSplats((current) => [...current, splat]);
  };

  const startSplatter = () => {
    const section = studioRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    for (let i = 0; i < 15; i++) {
      window.setTimeout(() => {
        if (!section.isConnected) return;
        splatterAt(rect.left + Math.random() * rect.width, rect.top + Math.random() * rect.height);
      }, i * 70);
    }
  };

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
      <section
        className="studio-sec gamified"
        aria-label="We're in studio"
        ref={studioRef}
        onPointerEnter={() => {
          if (cursorRef.current) cursorRef.current.style.opacity = '1';
        }}
        onPointerLeave={() => {
          if (cursorRef.current) cursorRef.current.style.opacity = '0';
        }}
        onPointerMove={(event) => {
          if (!cursorRef.current) return;
          cursorRef.current.style.left = `${event.clientX}px`;
          cursorRef.current.style.top = `${event.clientY}px`;
        }}
        onClick={(event) => {
          if (event.target instanceof Element && event.target.closest('#paint-btn')) return;
          splatterAt(event.clientX, event.clientY);
        }}
      >
        <div className="chairbg" aria-hidden="true">
          <img src={images.armchair} alt="" />
        </div>
        {splats.map((splat) => (
          <div
            className="paint-splat is-settled"
            key={splat.id}
            aria-hidden="true"
            style={{
              left: splat.x - splat.width / 2,
              top: splat.y - splat.height / 2,
              width: splat.width,
              height: splat.height,
              background: splat.color,
              transform: `rotate(${splat.rotation}deg)`,
            }}
          />
        ))}
        <div className="ttl">
          <h2 className="t1">WE'RE IN STUDIO.</h2>
          <h2 className="t2">Take a seat.</h2>
          <p className="t3">(There's plenty of paint to go around.)</p>
          <div className="splatter-controls">
            <button className="btn" id="paint-btn" type="button" onClick={startSplatter}>
              Splatter the studio →
            </button>
            <p>Click anywhere in this section to leave paint.</p>
            <div
              className="paint-progress-track"
              role="progressbar"
              aria-label="Studio splatter progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.min(100, Math.round(splats.length / 20 * 100))}
            >
              <div id="paint-progress" style={{ width: `${Math.min(100, Math.round(splats.length / 20 * 100))}%` }} />
            </div>
          </div>
        </div>
        <div id="studio-cursor" ref={cursorRef} aria-hidden="true">●</div>
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
