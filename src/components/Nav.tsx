import { NavLink } from 'react-router-dom';
import { pages } from '../content';
import { BrandLink } from './Logo';

export default function Nav({ solid }: { solid: boolean }) {
  return (
    <nav className={`site${solid ? ' solid' : ''}`}>
      <BrandLink />
      <ul>
        {pages.map((p) => (
          <li key={p.href}>
            <NavLink to={p.href} className={({ isActive }) => (isActive ? 'on' : undefined)}>
              {p.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
