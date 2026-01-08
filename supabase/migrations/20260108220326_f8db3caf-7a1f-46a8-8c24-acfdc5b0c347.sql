-- Add rotating phrases and typing speed to hero_content
ALTER TABLE public.hero_content 
ADD COLUMN IF NOT EXISTS rotating_phrases text[] DEFAULT ARRAY['Segurança e Pontualidade', 'Cuidado e Profissionalismo', 'Confiança e Qualidade'],
ADD COLUMN IF NOT EXISTS typing_speed integer DEFAULT 80,
ADD COLUMN IF NOT EXISTS delete_speed integer DEFAULT 30,
ADD COLUMN IF NOT EXISTS background_images text[] DEFAULT ARRAY[]::text[];