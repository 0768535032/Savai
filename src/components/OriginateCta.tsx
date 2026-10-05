import { Link } from 'react-router-dom';

interface OriginateCtaProps {
  to?: string;
}

export default function OriginateCta({ to = '/studio/contact' }: OriginateCtaProps) {
  return (
    <section className="dark b origin-cta">
      <div className="wrap origin-cta-inner">
        <div className="origin-cta-copy">
          <p className="origin-cta-kicker">
            SAVAI CREATIVE <span>·</span> NAIROBI
          </p>
          <h2>The market already has a favourite.</h2>
          <p className="origin-cta-prompt">Change the narrative</p>
          <p className="origin-cta-note">A clear position changes what people notice, remember and choose.</p>
          <Link className="btn origin-cta-button" to={to}>
            Start a conversation <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="origin-cta-mark" aria-hidden="true">
          S
        </div>
      </div>
    </section>
  );
}
