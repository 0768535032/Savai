import { Link } from 'react-router-dom';
import OriginateCta from '../components/OriginateCta';
import PulseLine from '../components/PulseLine';
import Skyline from '../components/Skyline';
import { images } from '../content';

export default function Perspective() {
  return (
    <>
      <header
        className="head plain"
        style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: '88svh',
          paddingTop: 110,
          background: 'linear-gradient(180deg,#f4f2ee,#efece4 70%,#f4f2ee)',
        }}
      >
        <Skyline />
        <div className="wrap persp-top" style={{ position: 'relative' }}>
          <h1>Your brand is a heartbeat, and currently it's flatlining.</h1>
          <div className="pulse-wrap">
            <PulseLine />
          </div>
        </div>
      </header>
      <section className="b">
        <div className="wrap">
          <div className="grid" style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))' }}>
            <div>
              <div className="ph tall" style={{ minHeight: 380 }}>
                <img src={images.notebook} alt="An open notebook and pencil, ready for field notes" />
              </div>
              <div style={{ marginTop: 16 }} className="note">
                Nicheness over noise. Good products don't guarantee good positions. Start with what you should mean, not
                how you should look.
              </div>
            </div>
            <div>
              <h3>Notes from the studio</h3>
              <p style={{ marginTop: 10, color: 'var(--mut)' }}>
                Short, working thoughts on positioning, category and voice — the kind we'd scribble in the notebook
                before they become a brief.
              </p>
              <Link className="btn ghost" to="/studio/contact" style={{ marginTop: 20 }}>
                Talk to us about yours →
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section className="b alt">
        <div className="wrap">
          <h2 className="narrow">Check out BUNI.</h2>
          <p className="narrow" style={{ marginTop: 14, color: 'var(--mut)' }}>
            Newsletters and articles from Savai — on positioning, category and voice.
          </p>
          <div className="grid" style={{ marginTop: 36, gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))' }}>
            <div className="card">
              <h3 style={{ fontSize: 17 }}>The BUNI newsletter</h3>
              <p>Short, regular notes on brand and category, sent when we have something worth saying.</p>
              <Link className="btn ghost" to="/studio/contact" style={{ marginTop: 14, display: 'inline-block' }}>
                Get the next issue →
              </Link>
            </div>
            <div className="card">
              <h3 style={{ fontSize: 17 }}>Articles</h3>
              <p>Longer pieces on positioning, voice and the work of building a challenger brand.</p>
              <p className="note" style={{ marginTop: 10 }}>
                Coming soon.
              </p>
            </div>
          </div>
        </div>
      </section>
      <OriginateCta />
    </>
  );
}
