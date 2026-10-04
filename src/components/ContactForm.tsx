import { FormEvent, useState } from 'react';
import { supabase, type Inquiry } from '../lib/supabase';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload: Inquiry = {
      name: String(data.get('name') || '').trim(),
      email: String(data.get('email') || '').trim(),
      message: String(data.get('message') || '').trim(),
      service: 'Website enquiry',
    };

    try {
      if (supabase) {
        const { data: emailData, error: emailError } = await supabase.functions.invoke('send-inquiry-email', {
          body: payload,
        });
        if (emailError || !emailData?.success) {
          throw emailError || new Error('Unable to send enquiry email.');
        }
        const { error } = await supabase.from('inquiries').insert(payload);
        if (error) throw error;
      }
      setStatus('sent');
      form.reset();
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <form className="formcard" onSubmit={onSubmit}>
      <p className="lead">Tell us about your brand and we'll reply within 3 working days.</p>
      <label htmlFor="n">Name</label>
      <input id="n" name="name" autoComplete="name" required />
      <label htmlFor="e">Email</label>
      <input id="e" name="email" type="email" autoComplete="email" required />
      <label htmlFor="m">What's going on?</label>
      <textarea id="m" name="message" rows={4} placeholder="Dreaming is legal here." required />
      <button className="btn" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Start the conversation →'}
      </button>
      {status === 'sent' && <p className="ok" role="status">Thanks. We’ll be in touch within 3 working days.</p>}
      {status === 'error' && <p className="err" role="status">Something went wrong. Please try again.</p>}
    </form>
  );
}
