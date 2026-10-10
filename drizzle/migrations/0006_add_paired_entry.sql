ALTER TABLE public.salon_intakes ADD COLUMN partner_email text NOT NULL DEFAULT '';

CREATE OR REPLACE FUNCTION public.submit_salon_intake(p_kind text, p_name text, p_email text, p_topics text[], p_details text, p_contact text, p_partner_email text)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  recent_count INT;
BEGIN
  PERFORM pg_advisory_xact_lock(hashtext('submit_salon_intake'));
  SELECT COUNT(*) INTO recent_count FROM public.salon_intakes WHERE created_at > now() - interval '1 minute';
  IF recent_count >= 60 THEN
    RAISE EXCEPTION 'Too many submissions. Please try again shortly.';
  END IF;
  INSERT INTO public.salon_intakes (kind, name, email, topics, details, contact, partner_email)
  VALUES (p_kind, p_name, lower(p_email), p_topics, p_details, p_contact, lower(p_partner_email))
  ON CONFLICT (kind, email) DO NOTHING;
END;
$function$;

COMMENT ON FUNCTION public.submit_salon_intake(text, text, text, text[], text, text) IS 'DEPRECATED: superseded by the 7-argument overload with p_partner_email.';