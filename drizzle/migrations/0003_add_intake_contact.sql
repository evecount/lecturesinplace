ALTER TABLE public.salon_intakes ADD COLUMN contact TEXT NOT NULL DEFAULT '';

CREATE OR REPLACE FUNCTION public.submit_salon_intake(
  p_kind TEXT,
  p_name TEXT,
  p_email TEXT,
  p_topics TEXT[],
  p_details TEXT,
  p_contact TEXT DEFAULT ''
) RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  recent_count INT;
BEGIN
  -- Serialize concurrent submissions so the rate check is exact.
  PERFORM pg_advisory_xact_lock(hashtext('submit_salon_intake'));

  SELECT COUNT(*) INTO recent_count
  FROM public.salon_intakes
  WHERE created_at > now() - interval '1 minute';

  IF recent_count >= 60 THEN
    RAISE EXCEPTION 'Too many submissions. Please try again shortly.';
  END IF;

  INSERT INTO public.salon_intakes (kind, name, email, topics, details, contact)
  VALUES (p_kind, p_name, lower(p_email), p_topics, p_details, p_contact)
  ON CONFLICT (kind, email) DO NOTHING;
END;
$$;

REVOKE ALL ON FUNCTION public.submit_salon_intake(TEXT, TEXT, TEXT, TEXT[], TEXT, TEXT) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_salon_intake(TEXT, TEXT, TEXT, TEXT[], TEXT, TEXT) TO anon, authenticated;