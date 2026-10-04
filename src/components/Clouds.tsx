export default function Clouds() {
  return (
    <svg className="clouds" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 100 100">
      <defs>
        <filter id="c" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.03" numOctaves="4" seed="7" />
          <feColorMatrix values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 2.4 -1.05" />
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      <g className="drift">
        <rect x="-10" width="120" height="100" filter="url(#c)" opacity=".85" />
      </g>
    </svg>
  );
}
