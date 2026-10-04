import LookChips from '../components/LookChips';
import OriginateCta from '../components/OriginateCta';
import PageHead from '../components/PageHead';
import { images, steps } from '../content';

export default function Approach() {
  return (
    <>
      <PageHead src={images.shore} alt="Sunlit water meeting a rocky shore" title="Approach" subtitle="Find, position, express, activate." />
      <section className="alt b">
        <div className="wrap">
          <div className="grid">
            {steps.map((s, i) => (
              <div className="card" key={s[0]}>
                <h3>
                  {i + 1}. {s[0]}
                </h3>
                <p>{s[1]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="b" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="wash" style={{ left: '-6%', top: '10%', width: 280, height: 280, background: '#6fa5bd' }} />
        <div className="wash" style={{ right: '-6%', bottom: 0, width: 220, height: 220, background: '#c0563a' }} />
        <div className="wrap" style={{ position: 'relative' }}>
          <h2 className="narrow">The brand is never the whole story.</h2>
          <LookChips />
        </div>
      </section>
      <OriginateCta />
    </>
  );
}
