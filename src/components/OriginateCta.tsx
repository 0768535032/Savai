import { Link } from 'react-router-dom';

export default function OriginateCta() {
  return (
    <section className="dark b">
      <div className="wrap">
        <h2 className="narrow">The market already has a favourite.</h2>
        <h2 className="narrow" style={{ margin: '10px 0 32px' }}>
          What will you give it to remember?
        </h2>
        <Link className="btn" to="/studio/contact" style={{ background: '#fff', color: '#0a0a0a' }}>
          Originate →
        </Link>
      </div>
    </section>
  );
}
