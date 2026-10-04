import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import OriginateCta from '../components/OriginateCta';
import { steps } from '../content';

export default function Home() {
  return (
    <>
      <Hero />
      <div className="checker-strip" />
      <div className="nairobi-band">
        <div className="nai">
          NAI<span className="heart">♥</span>ROBI
        </div>
        <div className="frame">FRAME 01 / DREAMS ARE NOT ILLEGAL HERE • POSITION IS MEMORY • HOLD TO REMEMBER</div>
      </div>
      <section className="epic-reveal">
        <div className="marquee">POSITION • MEMORY • POSITION • MEMORY • POSITION • MEMORY</div>
        <div className="epic-reveal-inner">
          <div
            style={{
              display: 'inline-block',
              background: '#0a0a0a',
              color: '#fff',
              padding: '6px 12px',
              borderRadius: 999,
              font: '500 10px Syne,sans-serif',
              letterSpacing: '0.2em',
              marginBottom: 24,
            }}
          >
            THE PROBLEM
          </div>
          <h2>
            Good products don't guarantee <em>good positions.</em>
          </h2>
          <p className="sub">
            The business exists. The city can see it. But nobody has a <strong>clear view</strong> of why it should be
            chosen.
            <br />
            <br />
            That's not a design problem. That's a memory problem. If they can't place you in their story, they can't
            choose you.
          </p>
        </div>
      </section>
      <div className="checker-strip" style={{ height: 14 }} />
      <section className="alt b">
        <div className="wrap">
          <h2 className="narrow">We don't start with how you should look.</h2>
          <p style={{ fontSize: 24, margin: '16px 0 40px' }} className="brand">
            We start with what you should mean.
          </p>
          <div className="grid">
            {steps.map((s) => (
              <div className="card" key={s[0]}>
                <h3>{s[0]}</h3>
                <p>{s[1]}</p>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 36 }}>
            <Link className="btn" to="/approach">
              Explore the approach →
            </Link>
          </p>
        </div>
      </section>
      <section className="b">
        <div className="wrap">
          <h2>Selected work</h2>
          <p className="narrow" style={{ marginTop: 16, color: 'var(--mut)' }}>
            Case studies are on the way — for now, here’s where they’ll live.
          </p>
          <p style={{ marginTop: 20 }}>
            <Link className="btn ghost" to="/work">
              Visit the work page →
            </Link>
          </p>
        </div>
      </section>
      <section className="b alt">
        <div className="wrap">
          <h2 className="narrow">Three ways to work with us.</h2>
          <p className="narrow" style={{ margin: '16px 0 30px' }}>
            Each has a defined scope, a clear list of what you get, and a fixed price. Start where your brand is today.
          </p>
          <Link className="btn" to="/create">
            See pricing →
          </Link>
        </div>
      </section>
      <OriginateCta />
    </>
  );
}
