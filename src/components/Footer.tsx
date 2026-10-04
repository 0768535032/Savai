import { Link } from 'react-router-dom';
import { images } from '../content';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="site">
      <div className="fbg">
        <img src={images.smoke} alt="" />
      </div>
      <div className="wrap">
        <Logo />
        <p className="signoff">ORIGINATE</p>
        <p>
          <Link to="/work">Work</Link> · <Link to="/approach">Approach</Link> ·{' '}
          <Link to="/perspective">Perspective</Link> · <Link to="/create">Let’s create</Link> ·{' '}
          <Link to="/studio">Studio</Link> · <Link to="/studio/contact">Say hello</Link>
        </p>
        <p style={{ marginTop: 14 }}>www.savai.co.ke · Nairobi</p>
      </div>
    </footer>
  );
}
