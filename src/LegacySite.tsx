import { useEffect, useState } from 'react';

const scriptPaths = Array.from({ length: 8 }, (_, index) => `/legacy/js/${String(index + 1).padStart(2, '0')}.js`);

export default function LegacySite() {
  const [loadError, setLoadError] = useState<string>();

  useEffect(() => {
    let cancelled = false;

    const loadScript = (src: string) =>
      new Promise<void>((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = false;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Unable to load ${src}`));
        document.body.appendChild(script);
      });

    const start = async () => {
      try {
        await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js');
        // The original enhancements run in order after the page renderer creates their target elements.
        for (const path of scriptPaths) {
          if (cancelled) return;
          await loadScript(path);
        }
      } catch (error) {
        console.error('Unable to start the Savai site.', error);
        if (!cancelled) {
          setLoadError(error instanceof Error ? error.message : String(error));
        }
      }
    };

    void start();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      <div id="app" />
      {loadError && (
        <div role="alert" style={{ position: 'fixed', inset: 'auto 16px 16px', zIndex: 10000, padding: 16, background: '#fff', color: '#900' }}>
          The site could not finish loading: {loadError}
        </div>
      )}
    </>
  );
}
