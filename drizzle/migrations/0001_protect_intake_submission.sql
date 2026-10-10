REVOKE INSERT ON public.salon_intakes FROM anon, authenticated;
CREATE OR REPLACE FUNCTION public.submit_salon_intake(p_kind text, p_name text, p_email text, p_topics text[], p_details text) RETURNS void
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public
AS $$
BEGIN
 PERFORM pg_advisory_xact_lock(730251);
 IF (SELECT count(*) FROM public.salon_intakes WHERE created_at > now() - interval '1 minute') >= 60 THEN
  RAISE EXCEPTION 'Too many entries. Please try again shortly.';
 END IF;
 INSERT INTO public.salon_intakes(kind,name,email,topics,details)
 VALUES (p_kind,trim(p_name),lower(trim(p_email)),p_topics,trim(p_details))
 ON CONFLICT (email,kind) DO NOTHING;
END;
$$;
REVOKE ALL ON FUNCTION public.submit_salon_intake(text,text,text,text[],text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_salon_intake(text,text,text,text[],text) TO anon, authenticated;