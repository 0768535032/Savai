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
          paddingTop: 110,
          background: 'linear-gradient(180deg,#f4f2ee,#efece4 70%,#f4f2ee)',
        }}
      >
        <Skyline />
        <div className="wrap persp-top" style={{ position: 'relative' }}>
          <h1>Design is Nairobi's heartbeat.</h1>
          <div className="persp-copy">
            <p>
              Every matatu wrapped in colour. Every kiosk with a hand-painted sign. Every startup with a pitch deck but
              no positioning. The city is full of brands trying to be seen — and running out of words to say why they
              matter.
            </p>
            <p>Savai is for the ones who are ready to say something.</p>
            <p>
              We are a brand language lab working with emerging leaders and category challengers who have the product
              conviction but not yet the positioning to match it. We find the ownable sentence. We build the campaign
              around it. We make the launch articulate.
            </p>
            <p className="persp-signoff">Not the other way around.</p>
          </div>
          <div className="pulse-wrap">
            <PulseLine />
          </div>
        </div>
      </header>
      <section className="b">
        <div className="wrap" style={{ display: 'grid', gap: 48, paddingTop: 34, paddingBottom: 34 }}>
          <blockquote style={{ maxWidth: 680, margin: '0 0 0 auto', fontSize: 'clamp(24px,4vw,42px)', lineHeight: 1.2 }}>
            “The visual arrived before the voice.”
            <cite className="note" style={{ display: 'block', fontSize: 14, fontStyle: 'normal' }}>
              <a href="https://savaicreative.substack.com/p/voice-before-visuals" target="_blank" rel="noopener noreferrer">
                Voice Before Visuals →
              </a>
            </cite>
          </blockquote>
          <blockquote
            style={{
              maxWidth: 560,
              margin: '0 0 0 min(10%,80px)',
              fontSize: 'clamp(20px,3vw,32px)',
              lineHeight: 1.3,
            }}
          >
            “When a brand built on one promise reaches for another, the question is never whether it can. It’s whether it
            should.”
            <cite className="note" style={{ display: 'block', fontSize: 14, fontStyle: 'normal' }}>
              <a href="https://savaicreative.substack.com/p/finger-lickin-brewed" target="_blank" rel="noopener noreferrer">
                Finger Lickin’ Brewed? →
              </a>
            </cite>
          </blockquote>
          <blockquote
            style={{
              maxWidth: 640,
              margin: '0 auto 0 12%',
              fontSize: 'clamp(22px,3.5vw,36px)',
              lineHeight: 1.25,
            }}
          >
            “The logo was beautiful. Nobody inside the company ever used it.”
            <cite className="note" style={{ display: 'block', fontSize: 14, fontStyle: 'normal' }}>
              <a
                href="https://savaicreative.substack.com/p/why-most-rebrands-fail-before-they"
                target="_blank"
                rel="noopener noreferrer"
              >
                Why most rebrands fail before they launch →
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
