import { Link } from 'react-router-dom';
import PageHead from '../components/PageHead';
import { images, tiers } from '../content';

export default function Create() {
  return (
    <>
      <PageHead
        src={images.student}
        alt="A client, thrilled to get their brand moving"
        title="Let’s create."
        subtitle="Three ways to work with us. Each has a defined scope, a clear list of what you get, and a fixed price. Start where your brand is today. Most brands move through all three, in whatever order they need."
        minHeight="48svh"
      />
      <section className="b">
        <div className="wrap">
          <div className="tiers">
            {tiers.map((t) => (
              <div className={`tier${t.mid ? ' mid' : ''}`} key={t.name}>
                <div className="tn">{t.tag}</div>
                <h3>{t.name}</h3>
                <p className="best">{t.best}</p>
                <p style={{ marginTop: 10, fontSize: 15 }}>{t.line}</p>
                <ul>
                  {t.deliver.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
                <div className="meta">
                  <div>
                    <span>Format</span>
                    <span>{t.format}</span>
                  </div>
                  <div>
                    <span>Timeline</span>
                    <span style={{ textAlign: 'right', maxWidth: '60%' }}>{t.timeline}</span>
                  </div>
                  <div>
                    <span>Payment</span>
                    <span style={{ textAlign: 'right', maxWidth: '60%' }}>{t.payment}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p style={{ marginTop: 40 }}>
            <Link className="btn" to="/studio/contact">
              Start with Bearings →
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
