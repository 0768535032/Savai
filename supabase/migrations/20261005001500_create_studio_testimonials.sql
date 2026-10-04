CREATE TABLE IF NOT EXISTS public.studio_testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(btrim(name)) BETWEEN 1 AND 120),
  role text NOT NULL CHECK (char_length(btrim(role)) BETWEEN 1 AND 160),
  impact text NOT NULL CHECK (char_length(btrim(impact)) BETWEEN 10 AND 1000),
  signature_path text NOT NULL UNIQUE,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz NOT NULL DEFAULT now(),
  approved_at timestamptz,
  CONSTRAINT studio_testimonials_signature_path_matches_id
    CHECK (signature_path = id::text || '.png')
);

ALTER TABLE public.studio_testimonials ENABLE ROW LEVEL SECURITY;

REVOKE ALL ON public.studio_testimonials FROM anon, authenticated;
GRANT SELECT (id, name, role, impact, signature_path, status, created_at)
  ON public.studio_testimonials TO anon, authenticated;
GRANT INSERT (id, name, role, impact, signature_path, status)
  ON public.studio_testimonials TO anon, authenticated;

DROP POLICY IF EXISTS "Public can read approved studio testimonials" ON public.studio_testimonials;
CREATE POLICY "Public can read approved studio testimonials"
  ON public.studio_testimonials
  FOR SELECT
  TO anon, authenticated
  USING (status = 'approved');

DROP POLICY IF EXISTS "Public can submit pending studio testimonials" ON public.studio_testimonials;
CREATE POLICY "Public can submit pending studio testimonials"
  ON public.studio_testimonials
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (status = 'pending');

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES ('studio-signatures', 'studio-signatures', false, 262144, ARRAY['image/png'])
ON CONFLICT (id) DO UPDATE
SET public = false,
    file_size_limit = 262144,
    allowed_mime_types = ARRAY['image/png'];

DROP POLICY IF EXISTS "Public can upload studio signature images" ON storage.objects;
CREATE POLICY "Public can upload studio signature images"
  ON storage.objects
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    bucket_id = 'studio-signatures'
    AND name ~ '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}[.]png$'
  );

DROP POLICY IF EXISTS "Public can view approved studio signature images" ON storage.objects;
CREATE POLICY "Public can view approved studio signature images"
  ON storage.objects
  FOR SELECT
  TO anon, authenticated
  USING (
    bucket_id = 'studio-signatures'
    AND EXISTS (
      SELECT 1
      FROM public.studio_testimonials AS testimonial
      WHERE testimonial.signature_path = storage.objects.name
        AND testimonial.status = 'approved'
    )
  );
