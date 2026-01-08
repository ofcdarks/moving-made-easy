-- Create table to cache Google reviews
CREATE TABLE public.google_reviews_cache (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  place_id text NOT NULL UNIQUE,
  business_name text,
  rating numeric(2,1),
  total_reviews integer DEFAULT 0,
  reviews jsonb DEFAULT '[]'::jsonb,
  cached_at timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.google_reviews_cache ENABLE ROW LEVEL SECURITY;

-- Anyone can view cached reviews (public data)
CREATE POLICY "Anyone can view cached reviews"
ON public.google_reviews_cache
FOR SELECT
USING (true);

-- Only service role can insert/update (via edge function)
CREATE POLICY "Service role can manage cache"
ON public.google_reviews_cache
FOR ALL
USING (auth.role() = 'service_role')
WITH CHECK (auth.role() = 'service_role');

-- Trigger for updated_at
CREATE TRIGGER update_google_reviews_cache_updated_at
BEFORE UPDATE ON public.google_reviews_cache
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create index for faster lookups
CREATE INDEX idx_google_reviews_cache_place_id ON public.google_reviews_cache(place_id);
CREATE INDEX idx_google_reviews_cache_cached_at ON public.google_reviews_cache(cached_at);