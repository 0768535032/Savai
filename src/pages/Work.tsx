import { Link } from 'react-router-dom';
import OriginateCta from '../components/OriginateCta';
import PageHead from '../components/PageHead';
import { images } from '../content';

export default function Work() {
  return (
    <>
      <PageHead
        src={images.milkyway}
        alt="A lone tree under the Milky Way"
        title="Work"
        subtitle="Proof that a clear position changes the outcome."
        minHeight="78svh"
      />
      <section className="b work-note">
        <div className="wrap work-note-inner">
          <p className="home-kicker">FROM THE STUDIO</p>
          <h2>Good work deserves a clear point of view.</h2>
          <p className="work-note-copy">
            We’re preparing a considered selection of our work. In the meantime, explore the thinking behind it or tell
            us what you’re building.
          </p>
          <div className="work-note-actions">
            <Link className="btn ghost" to="/approach">
              Explore our approach →
            </Link>
            <Link className="text-link" to="/studio/contact">
              Talk about your brand <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
      <OriginateCta />
    </>
  );
}
