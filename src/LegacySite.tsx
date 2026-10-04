import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';

const scriptPaths = Array.from({ length: 8 }, (_, index) => `/legacy/js/${String(index + 1).padStart(2, '0')}.js`);

export default function LegacySite() {
  const [loadError, setLoadError] = useState<string>();

  useEffect(() => {
    let cancelled = false;

    const onContactSubmit = async (event: SubmitEvent) => {
      const form = event.target;
      if (!(form instanceof HTMLFormElement) || form.id !== 'contact-form') return;

      event.preventDefault();
      const button = form.querySelector<HTMLButtonElement>('#send');
      const status = form.querySelector<HTMLParagraphElement>('#ok');
      const setStatus = (message: string, className: 'ok' | 'err') => {
        if (status) {
          status.className = className;
          status.textContent = message;
        }
      };

      if (!supabase) {
        setStatus('The enquiry service is not configured. Please email info@savai.co.ke directly.', 'err');
        return;
      }

      const formData = new FormData(form);
      const payload = {
        name: String(formData.get('name') ?? '').trim(),
        email: String(formData.get('email') ?? '').trim(),
        message: String(formData.get('message') ?? '').trim(),
        service: 'Website enquiry',
      };

      if (!payload.name || !payload.email || !payload.message) {
        setStatus('Please complete your name, email, and message.', 'err');
        return;
      }

      if (button) {
        button.disabled = true;
        button.textContent = 'Sending…';
      }
      setStatus('Sending your enquiry…', 'ok');

      try {
        const { data, error } = await supabase.functions.invoke('send-inquiry-email', { body: payload });
        if (error) throw error;
        if (data?.success !== true) throw new Error('The enquiry email was not accepted.');

        form.reset();
        setStatus('Thanks. Your enquiry has been sent. We’ll be in touch within 3 working days.', 'ok');
      } catch (error) {
        console.error('Unable to send website enquiry.', error);
        setStatus('We couldn’t send your enquiry. Please try again or email info@savai.co.ke directly.', 'err');
      } finally {
        if (button) {
          button.disabled = false;
          button.textContent = 'Start the conversation →';
        }
      }
    };

    document.addEventListener('submit', onContactSubmit, true);

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
      document.removeEventListener('submit', onContactSubmit, true);
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
