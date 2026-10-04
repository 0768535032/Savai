import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { images } from '../content';
import Clouds from './Clouds';

const palette = [
  { pct: 0, color: '#FF6B35' },
  { pct: 15, color: '#FF2D55' },
  { pct: 30, color: '#AF52DE' },
  { pct: 50, color: '#FF3B30' },
  { pct: 65, color: '#FF9500' },
  { pct: 80, color: '#FFCC02' },
  { pct: 100, color: '#5AC8FA' },
];

function lerpColor(c1: string, c2: string, t: number) {
  const h1 = parseInt(c1.slice(1, 3), 16);
  const s1 = parseInt(c1.slice(3, 5), 16);
  const l1 = parseInt(c1.slice(5, 7), 16);
  const h2 = parseInt(c2.slice(1, 3), 16);
  const s2 = parseInt(c2.slice(3, 5), 16);
  const l2 = parseInt(c2.slice(5, 7), 16);
  const r = Math.round(h1 + (h2 - h1) * t);
  const g = Math.round(s1 + (s2 - s1) * t);
  const b = Math.round(l1 + (l2 - l1) * t);
  return `rgb(${r},${g},${b})`;
}

function colorAt(pct: number) {
  for (let i = 0; i < palette.length - 1; i++) {
    const a = palette[i];
    const b = palette[i + 1];
    if (pct >= a.pct && pct <= b.pct) {
      const t = (pct - a.pct) / (b.pct - a.pct);
      return lerpColor(a.color, b.color, t);
    }
  }
  return palette[palette.length - 1].color;
}

export default function Hero() {
  const photoRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(12);
  const [dragging, setDragging] = useState(false);
  const [showInd, setShowInd] = useState(false);
  const hideTimer = useRef<number | undefined>(undefined);

  const theme = pct < 50 ? 'night' : 'light';

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.classList.toggle('is-night', theme === 'night');
    document.body.classList.toggle('is-light', theme === 'light');
  }, [theme]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      if (!dragging || !photoRef.current) return;
      const rect = photoRef.current.getBoundingClientRect();
      const next = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
      setPct(next);
    };
    const onUp = () => {
      if (!dragging) return;
      setDragging(false);
      window.clearTimeout(hideTimer.current);
      hideTimer.current = window.setTimeout(() => setShowInd(false), 1400);
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, [dragging]);

  const startDrag = (clientX: number) => {
    if (!photoRef.current) return;
    const rect = photoRef.current.getBoundingClientRect();
    setPct(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
    setDragging(true);
    setShowInd(true);
    window.clearTimeout(hideTimer.current);
  };

  const color = colorAt(pct);
  const shadow = color.replace('rgb', 'rgba').replace(')', ',0.22)');
  const clipPct = pct;
  const isLight = theme === 'light';

  return (
    <>
      <header className="hero2" style={{ background: theme === 'night' ? '#050507' : '#f4f2ee' }}>
        <Clouds />
        <div className="wrap txt">
          <div className="tagline-wrap" ref={wrapRef} id="tagline-wrap">
            <h1
              className="tagline-orange"
              style={{
                color,
                textShadow: `0 2px 0 rgba(0,0,0,0.14), 0 10px 28px rgba(0,0,0,0.28), 0 2px 50px ${shadow}, 0 0 80px ${shadow}`,
              }}
            >
              we know your story....
            </h1>
            <h1
              className="tagline-split"
              style={{
                clipPath: `inset(0 ${100 - clipPct}% 0 0)`,
                color: isLight ? '#0a0a0a' : '#fff',
                textShadow: isLight
                  ? `0 2px 0 rgba(255,255,255,0.5), 0 8px 24px rgba(0,0,0,0.15), 0 0 40px ${shadow}`
                  : `0 2px 8px rgba(0,0,0,0.6), 0 10px 28px rgba(0,0,0,0.5), 0 0 60px ${shadow}`,
              }}
            >
              we know your story....
            </h1>
          </div>
          <Link className="btn cta" to="/studio">
            Take a seat →
          </Link>
        </div>
        <div
          className="photo"
          ref={photoRef}
          onPointerDown={(e) => startDrag(e.clientX)}
        >
          <img
            className="blur"
            src={images.hero}
            alt=""
            style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
          />
          <img
            src={images.hero}
            alt="Nairobi skyline rising above a canopy of trees under a clear morning sky"
            style={{
              clipPath: `inset(0 0 0 ${pct}%)`,
              filter:
                theme === 'night'
                  ? 'brightness(0.85) contrast(1.15) saturate(1.3)'
                  : 'brightness(0.9) contrast(1.05) saturate(1.2) opacity(0.7)',
            }}
          />
          <div
            className="focus-handle"
            id="focus-handle"
            style={{ left: `${pct}%` }}
            onPointerDown={(e) => {
              e.stopPropagation();
              (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
              startDrag(e.clientX);
            }}
          >
            <div className="drag-knob">
              <span>DRAG</span>
              <span>ME</span>
            </div>
          </div>
        </div>
      </header>
      <div id="theme-indicator" className={showInd ? 'is-on' : undefined}>
        <div className="dot" />
        <span className="label">{theme === 'night' ? 'NIGHT MODE ACTIVATED' : 'LIGHT MODE ACTIVATED'}</span>
      </div>
    </>
  );
}
