# Savai

[![Open in Bolt](https://bolt.new/static/open-in-bolt.svg)](https://bolt.new/~/sb1-xksjqfpp)

## Supabase setup

1. Copy `.env.example` to `.env.local`.
2. In your Supabase dashboard, open the `savai` project.
3. Copy the project URL and anon key into the `.env.local` file.
4. Link the local app to the Supabase project:

```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
```

5. Deploy the enquiry email function:

```bash
supabase secrets set RESEND_API_KEY=your_key EMAIL_FROM=noreply@savai.co.ke
supabase functions deploy send-inquiry-email
```

6. Verify the site is using the same project settings as your Supabase `savai` project.

Your frontend reads the values from the environment variables in [src/lib/supabase.ts](src/lib/supabase.ts), and the enquiry form sends email through the Supabase function in [supabase/functions/send-inquiry-email/index.ts](supabase/functions/send-inquiry-email/index.ts).
