-- Add image columns to hero_content and about_content tables
ALTER TABLE public.hero_content 
ADD COLUMN IF NOT EXISTS background_image_url text;

ALTER TABLE public.about_content 
ADD COLUMN IF NOT EXISTS image_url text;