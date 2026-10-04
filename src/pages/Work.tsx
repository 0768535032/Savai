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
      <section className="b">
        <div className="wrap" style={{ textAlign: 'center', padding: '60px 0' }}>
          <h2>Coming soon.</h2>
          <p className="narrow" style={{ margin: '16px auto 0' }}>
            We’re only just getting started — case studies will land here as soon as the work does.
          </p>
        </div>
      </section>
      <OriginateCta />
    </>
  );
}
