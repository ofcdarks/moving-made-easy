-- Add hero stats to hero_content table
ALTER TABLE public.hero_content 
ADD COLUMN IF NOT EXISTS stat_deliveries text DEFAULT '500+',
ADD COLUMN IF NOT EXISTS stat_deliveries_label text DEFAULT 'Entregas',
ADD COLUMN IF NOT EXISTS stat_punctuality text DEFAULT '99%',
ADD COLUMN IF NOT EXISTS stat_punctuality_label text DEFAULT 'Pontualidade',
ADD COLUMN IF NOT EXISTS stat_security text DEFAULT '100%',
ADD COLUMN IF NOT EXISTS stat_security_label text DEFAULT 'Segurança';

-- Add clients satisfied to about_content if not exists
ALTER TABLE public.about_content
ADD COLUMN IF NOT EXISTS clients_satisfied text DEFAULT '1000+';