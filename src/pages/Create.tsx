import { Link } from 'react-router-dom';
import PageHead from '../components/PageHead';
import { images, tiers } from '../content';

export default function Create() {
  return (
    <>
      <PageHead
        src={images.student}
        alt="A diverse group of people collaborating over a colorful shared canvas"
        title="Let’s create."
        subtitle="Three ways to work with us. Start where your brand is today. Most brands move through all three, in whatever order they need."
        minHeight="clamp(500px, 68svh, 760px)"
        className="create-hero"
      />
      <section className="b">
        <div className="wrap">
          <div className="tiers">
            {tiers.map((t) => (
              <div
                className={`tier${t.mid ? ' mid' : ''}`}
                key={t.name}
                onPointerMove={(event) => {
                  const rect = event.currentTarget.getBoundingClientRect();
                  event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`);
                  event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`);
                  event.currentTarget.classList.add('is-glowing');
                }}
                onPointerLeave={(event) => event.currentTarget.classList.remove('is-glowing')}
              >
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
