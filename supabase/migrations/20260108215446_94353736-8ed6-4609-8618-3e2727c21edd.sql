-- Create page_views table for tracking real analytics
CREATE TABLE public.page_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_path text NOT NULL,
  visitor_id text NOT NULL,
  user_agent text,
  referrer text,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert page views (for tracking)
CREATE POLICY "Anyone can insert page views" 
ON public.page_views 
FOR INSERT 
WITH CHECK (true);

-- Only admins can view page views
CREATE POLICY "Admins can view page views" 
ON public.page_views 
FOR SELECT 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create index for faster queries
CREATE INDEX idx_page_views_created_at ON public.page_views(created_at DESC);
CREATE INDEX idx_page_views_visitor_id ON public.page_views(visitor_id);