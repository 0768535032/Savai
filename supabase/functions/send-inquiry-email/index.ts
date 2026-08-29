import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    const name = String(payload?.name ?? '').trim();
    const email = String(payload?.email ?? '').trim();
    const company = String(payload?.company ?? '').trim();
    const service = String(payload?.service ?? '').trim();
    const message = String(payload?.message ?? '').trim();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, error: 'Name, email, and message are required.' }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
        }
      );
    }

    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    const senderEmail = Deno.env.get('EMAIL_FROM') ?? 'noreply@savai.co.ke';
    const recipientEmail = 'sales@savai.co.ke';

    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY is not configured.');
    }

    const emailBody = `
      <h2>New enquiry from ${name}</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || 'Not provided'}</p>
      <p><strong>Service:</strong> ${service || 'Not provided'}</p>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br/>')}</p>
    `;

    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Savai Website <${senderEmail}>`,
        to: [recipientEmail],
        reply_to: email,
        subject: `New enquiry from ${name}${company ? ` - ${company}` : ''}`,
        html: emailBody,
      }),
    });

    const responseBody = await response.json();

    if (!response.ok) {
      throw new Error(responseBody?.message || 'Email delivery failed.');
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Inquiry email sent successfully.' }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('send-inquiry-email failed:', error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Something went wrong.',
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
      }
    );
  }
});
