CREATE TABLE public.salon_intakes (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 created_at timestamptz NOT NULL DEFAULT now(),
 kind text NOT NULL CHECK (kind IN ('ballot','host','talk')),
 name text NOT NULL CHECK (char_length(trim(name)) BETWEEN 1 AND 100),
 email text NOT NULL CHECK (char_length(email) <= 255 AND email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
 topics text[] NOT NULL DEFAULT '{}' CHECK (topics <@ ARRAY['Frontier AI','Systems','Media','Urban Geography']::text[]),
 details text NOT NULL DEFAULT '' CHECK (char_length(details) <= 2000),
 CHECK (kind <> 'ballot' OR cardinality(topics) BETWEEN 1 AND 4),
 CHECK (kind = 'ballot' OR char_length(trim(details)) >= 10),
 UNIQUE(email,kind)
);
GRANT INSERT ON public.salon_intakes TO anon, authenticated;
GRANT ALL ON public.salon_intakes TO service_role;
ALTER TABLE public.salon_intakes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors may submit intakes only" ON public.salon_intakes FOR INSERT TO anon, authenticated WITH CHECK (true);