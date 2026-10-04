import OriginateCta from '../components/OriginateCta';
import PulseLine from '../components/PulseLine';
import Skyline from '../components/Skyline';

export default function Perspective() {
  return (
    <>
      <header
        className="head plain"
        style={{
          position: 'relative',
          overflow: 'hidden',
          minHeight: '88svh',
          paddingTop: 72,
          background: 'linear-gradient(180deg,#f4f2ee,#efece4 70%,#f4f2ee)',
        }}
      >
        <Skyline />
        <div className="wrap persp-top" style={{ position: 'relative' }}>
          <p className="persp-eyebrow">NAIROBI, WITH SOMETHING TO SAY</p>
          <h1>Design is Nairobi's heartbeat.</h1>
          <div className="persp-copy">
            <p>
              Every matatu wrapped in colour. Every kiosk with a hand-painted sign. Every startup with a pitch deck but
              no positioning. The city is full of brands trying to be seen — and running out of words to say why they
              matter.
            </p>
          </div>
          <div className="pulse-wrap">
            <PulseLine />
          </div>
        </div>
      </header>
      <section className="b persp-quote-section">
        <div className="wrap">
          <blockquote className="persp-quote persp-quote-feature">
            “The visual arrived before the voice.”
            <cite>
              <a
                href="https://savaicreative.substack.com/p/voice-before-visuals"
                target="_blank"
                rel="noopener noreferrer"
              >
                Voice Before Visuals <span aria-hidden="true">↗</span>
              </a>
            </cite>
          </blockquote>
        </div>
      </section>
      <section className="b alt persp-manifesto">
        <div className="wrap">
          <div className="manifesto-head">
            <p className="persp-eyebrow">WHO WE'RE FOR</p>
            <h2>
              Savai is for teams ready to say something, <em>to mean something.</em>
            </h2>
          </div>
          <div className="manifesto-body">
            <p>
              We are a brand language lab working with emerging leaders and category challengers who have the product
              conviction but not yet the positioning to match it.
            </p>
            <div className="brand-steps">
              <div>
                <span>01 / FIND</span>
                <strong>the ownable sentence.</strong>
              </div>
              <div>
                <span>02 / BUILD</span>
                <strong>the campaign around it.</strong>
              </div>
              <div>
                <span>03 / MAKE</span>
                <strong>the launch articulate.</strong>
              </div>
            </div>
            <p className="persp-signoff">Not the other way around.</p>
          </div>
          <div className="persp-route" aria-hidden="true">
            <svg viewBox="0 0 800 84" preserveAspectRatio="none">
              <path className="route-base" pathLength="1" d="M4 58H144L174 27L198 69L224 45H394C438 45 438 18 484 18H620L650 56L676 34H796" />
              <path className="route-trace" pathLength="1" d="M4 58H144L174 27L198 69L224 45H394C438 45 438 18 484 18H620L650 56L676 34H796" />
              <circle cx="4" cy="58" r="5" />
              <circle cx="394" cy="45" r="5" />
              <circle cx="796" cy="34" r="5" />
            </svg>
          </div>
        </div>
      </section>
      <section className="b persp-quote-section">
        <div className="wrap persp-quote-pair">
          <blockquote className="persp-quote">
            <span>
              “When a brand built on one promise reaches for another, the question is never whether it can. It’s whether
              it should.”
            </span>
            <cite>
              <a href="https://savaicreative.substack.com/p/finger-lickin-brewed" target="_blank" rel="noopener noreferrer">
                Finger Lickin’ Brewed? <span aria-hidden="true">↗</span>
              </a>
            </cite>
          </blockquote>
          <blockquote className="persp-quote">
            <span>“The logo was beautiful. Nobody inside the company ever used it.”</span>
            <cite>
              <a
                href="https://savaicreative.substack.com/p/why-most-rebrands-fail-before-they"
                target="_blank"
                rel="noopener noreferrer"
              >
                Why most rebrands fail before they launch <span aria-hidden="true">↗</span>
              </a>
            </cite>
          </blockquote>
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
              <a
                className="btn ghost"
                href="https://savaicreative.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ marginTop: 14, display: 'inline-block' }}
              >
                Read Buni →
              </a>
            </div>
          </div>
        </div>
      </section>
      <OriginateCta />
    </>
  );
}
