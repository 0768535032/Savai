# Savai

Brand strategy and visual identity site for [Savai Creative](https://savai.co.ke), Nairobi.

This is a Vite + React app. Vercel deploys from `main`.

```bash
npm install
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

Copy `.env.example` to `.env` and set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` for Supabase-backed features, including contact enquiries and the Studio signature wall.

## Studio signatures

Apply `supabase/migrations/20261005001500_create_studio_testimonials.sql` to the linked Supabase project. It creates a private Storage bucket and a testimonials table. Visitors can submit a signature and testimonial, but new submissions remain pending and only approved entries are visible on the public wall. The signature image is capped at 256 KiB and is only served with short-lived signed URLs for approved entries.

Review entries in the Supabase SQL editor:

```sql
select id, name, role, impact, signature_path, created_at
from public.studio_testimonials
where status = 'pending'
order by created_at;
```

Approve an entry:

```sql
update public.studio_testimonials
set status = 'approved', approved_at = now()
where id = 'PASTE-ENTRY-UUID-HERE' and status = 'pending';
```

Reject an entry:

```sql
update public.studio_testimonials
set status = 'rejected'
where id = 'PASTE-ENTRY-UUID-HERE' and status = 'pending';
```

Use the Supabase dashboard/SQL editor for moderation; public clients cannot approve, edit, or delete testimonials.
