import { Link } from 'react-router-dom';

type Props = { className?: string; showWord?: boolean };

export default function Logo({ className = '', showWord = true }: Props) {
  return (
    <span className={`brand ${className}`.trim()}>
      <svg viewBox="0 0 100 84" aria-hidden="true" fill="none" strokeLinecap="round">
        <path d="M50 14H28a14 14 0 0 0 0 28H68a14 14 0 0 1 0 28H46" stroke="currentColor" strokeWidth="15" />
        <path d="M60 8A26 26 0 0 1 87 32" stroke="#6fa5bd" strokeWidth="9" />
      </svg>
      {showWord && (
        <span>
          Savai<i>.</i>
        </span>
      )}
    </span>
  );
}

export function BrandLink({ className = '' }: { className?: string }) {
  return (
    <Link className={`brand ${className}`.trim()} to="/" aria-label="Savai home">
      <svg viewBox="0 0 100 84" aria-hidden="true" fill="none" strokeLinecap="round">
        <path d="M50 14H28a14 14 0 0 0 0 28H68a14 14 0 0 1 0 28H46" stroke="currentColor" strokeWidth="15" />
        <path d="M60 8A26 26 0 0 1 87 32" stroke="#6fa5bd" strokeWidth="9" />
      </svg>
      <span>
        Savai<i>.</i>
      </span>
    </Link>
  );
}
