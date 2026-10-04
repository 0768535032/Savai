import { Link } from 'react-router-dom';
import PageHead from '../components/PageHead';
import TierAccordion from '../components/TierAccordion';
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
          <h3 style={{ marginTop: 56 }}>Full detail, tier by tier</h3>
          <TierAccordion tiers={tiers} />
          <h3 style={{ marginTop: 56 }}>Terms of engagement</h3>
          <p className="note" style={{ marginTop: 6 }}>
            These apply across all three tiers unless stated otherwise.
          </p>
          <div className="grid" style={{ marginTop: 20 }}>
            <div className="card">
              <h3 style={{ fontSize: 17 }}>Feedback and timelines</h3>
              <p>
                Feedback is due within 3 working days of each delivery. Delays on the client side pause the project
                clock. One consolidated set of feedback per round keeps revisions clean and on time.
              </p>
            </div>
            <div className="card">
              <h3 style={{ fontSize: 17 }}>Ownership and rights</h3>
              <p>
                You own the final approved deliverables and source files once the final payment has cleared. Savai keeps
                unused concepts and the right to show finished work in its portfolio. Typeface licences and other
                third-party costs are paid by the client.
              </p>
            </div>
            <div className="card">
              <h3 style={{ fontSize: 17 }}>Scope</h3>
              <p>Anything outside the deliverables listed for a tier is scoped and quoted separately before work begins.</p>
            </div>
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
