import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const allowedOrigins = new Set([
  'https://savai.co.ke',
  'https://www.savai.co.ke',
  'http://localhost:5173',
]);

function corsHeaders(origin: string | null) {
  return {
    ...(origin && allowedOrigins.has(origin) ? { 'Access-Control-Allow-Origin': origin } : {}),
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    Vary: 'Origin',
  };
}

function jsonResponse(body: Record<string, unknown>, status: number, origin: string | null) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(origin), 'Content-Type': 'application/json' },
  });
}

serve(async (req) => {
  const origin = req.headers.get('Origin');

  if (req.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }

  if (req.method !== 'POST') {
    return jsonResponse({ success: false, error: 'Method not allowed.' }, 405, origin);
  }

  if (origin && !allowedOrigins.has(origin)) {
    return jsonResponse({ success: false, error: 'Origin not allowed.' }, 403, origin);
  }

  if (!req.headers.get('content-type')?.toLowerCase().startsWith('application/json')) {
    return jsonResponse({ success: false, error: 'Expected a JSON request.' }, 415, origin);
  }

  try {
    const payload = await req.json();
    const name = String(payload?.name ?? '').trim();
    const email = String(payload?.email ?? '').trim();
    const service = String(payload?.service ?? '').trim();
    const message = String(payload?.message ?? '').trim();

    if (!name || name.length > 120 || !email || email.length > 254 || !message || message.length > 5000) {
      return jsonResponse({ success: false, error: 'Please check the name, email, and message fields.' }, 400, origin);
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ success: false, error: 'Enter a valid email address.' }, 400, origin);
    }

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const senderEmail = Deno.env.get('EMAIL_FROM') ?? 'Savai Website <noreply@savai.co.ke>';
    const recipientEmail = 'info@savai.co.ke';

    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY is not configured.');
    }

    const escapeHtml = (value: string) =>
      value.replace(/[&<>"']/g, (character) => {
        const entities: Record<string, string> = {
          '&': '&amp;',
          '<': '&lt;',
          '>': '&gt;',
          '"': '&quot;',
          "'": '&#39;',
        };
        return entities[character];
      });
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeService = escapeHtml(service || 'Not provided');
    const safeMessage = escapeHtml(message).replace(/\r?\n/g, '<br/>');
    const emailBody = `
      <h2>New website enquiry</h2>
      <p><strong>Name:</strong> ${safeName}</p>
      <p><strong>Email:</strong> ${safeEmail}</p>
      <p><strong>Service:</strong> ${safeService}</p>
      <p><strong>Message:</strong><br/>${safeMessage}</p>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: senderEmail,
        to: [recipientEmail],
        reply_to: email,
        subject: `New Savai website enquiry from ${name}`,
        html: emailBody,
      }),
    });

    const responseBody = await response.json().catch(() => null);
    if (!response.ok) {
      console.error('Resend rejected website enquiry.', response.status, responseBody?.message);
      return jsonResponse({ success: false, error: 'Email delivery failed.' }, 502, origin);
    }

    return jsonResponse({ success: true, message: 'Inquiry email sent successfully.' }, 200, origin);
  } catch (error) {
    console.error('send-inquiry-email failed:', error);
    return jsonResponse({ success: false, error: 'Unable to send the enquiry right now.' }, 500, origin);
  }
});
