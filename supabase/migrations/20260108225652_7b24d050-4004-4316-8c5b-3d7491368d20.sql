-- Add image transition time field to hero_content
ALTER TABLE public.hero_content 
ADD COLUMN IF NOT EXISTS image_transition_time integer DEFAULT 8;