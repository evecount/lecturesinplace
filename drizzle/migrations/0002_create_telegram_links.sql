CREATE TABLE public.telegram_links (
  chat_id BIGINT PRIMARY KEY,
  email TEXT NOT NULL DEFAULT '',
  username TEXT NOT NULL DEFAULT '',
  first_name TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

GRANT ALL ON public.telegram_links TO service_role;

ALTER TABLE public.telegram_links ENABLE ROW LEVEL SECURITY;

-- No anon/authenticated policies: the list of opted-in guests is private.
-- All access goes through the service role (webhook receiver and reminder sender).