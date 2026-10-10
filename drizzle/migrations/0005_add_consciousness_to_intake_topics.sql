ALTER TABLE public.salon_intakes DROP CONSTRAINT IF EXISTS salon_intakes_topics_check;

ALTER TABLE public.salon_intakes ADD CONSTRAINT salon_intakes_topics_check CHECK (topics <@ ARRAY['Frontier AI','Systems','Media','Urban Geography','Design & Architecture','History of Science','Mathematics','Consciousness & Mind']::text[]);