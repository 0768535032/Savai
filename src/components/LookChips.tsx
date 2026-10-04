import { useState } from 'react';
import { looks } from '../content';

export default function LookChips() {
  const keys = Object.keys(looks);
  const [active, setActive] = useState(keys[0]);

  return (
    <>
      <div className="row" id="chips">
        {keys.map((k) => (
          <button
            key={k}
            className="chip"
            type="button"
            aria-pressed={k === active}
            onClick={() => setActive(k)}
          >
            {k}
          </button>
        ))}
      </div>
      <p className="panel">{looks[active]}</p>
      <div className="markers">
        {keys.map((k) => (
          <div className="mk" key={k}>
            <span>{k.toUpperCase()}</span>
          </div>
        ))}
      </div>
    </>
  );
}
