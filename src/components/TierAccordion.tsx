import { useState } from 'react';
import type { Tier } from '../content';

export default function TierAccordion({ tiers }: { tiers: Tier[] }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="acc">
      {tiers.map((t) => {
        const d = t.detail;
        const isOpen = open === t.name;
        return (
          <div className="acc-item" key={t.name}>
            <button
              className="acc-h"
              type="button"
              onClick={() => setOpen(isOpen ? null : t.name)}
            >
              <span>{t.name} — full detail</span>
              <span>{isOpen ? '–' : '+'}</span>
            </button>
            <div className={`acc-b${isOpen ? ' open' : ''}`}>
              <div>
                <p>{d.what}</p>
                <p style={{ marginTop: 12 }}>{d.expect}</p>
                {d.timelineTable && (
                  <table>
                    <tbody>
                      {d.timelineTable.map((r) => (
                        <tr key={r[0]}>
                          <td>{r[0]}</td>
                          <td>{r[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {d.phases && (
                  <>
                    <table>
                      <thead>
                        <tr>
                          <th>Phase</th>
                          <th>Weeks</th>
                          <th>Outcome</th>
                        </tr>
                      </thead>
                      <tbody>
                        {d.phases.map((r) => (
                          <tr key={r[0]}>
                            <td>{r[0]}</td>
                            <td>{r[1]}</td>
                            <td>{r[2]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <p style={{ marginTop: 14 }}>
                      <b>Revision rounds</b>
                    </p>
                    <table>
                      <tbody>
                        {d.revisions?.map((r) => (
                          <tr key={r[0]}>
                            <td>{r[0]}</td>
                            <td>{r[1]}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
                {d.rhythm && (
                  <table>
                    <tbody>
                      {d.rhythm.map((r) => (
                        <tr key={r[0]}>
                          <td>{r[0]}</td>
                          <td>{r[1]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
                {d.next && (
                  <p style={{ marginTop: 12 }}>
                    <b>What comes next:</b> {d.next}
                  </p>
                )}
                {d.notIncluded && (
                  <p style={{ marginTop: 12 }}>
                    <b>Not included:</b> {d.notIncluded}
                  </p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
