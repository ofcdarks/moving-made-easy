-- Create storage bucket for site images
INSERT INTO storage.buckets (id, name, public) VALUES ('site-images', 'site-images', true);

-- Storage policies for site images
CREATE POLICY "Anyone can view site images" ON storage.objects FOR SELECT USING (bucket_id = 'site-images');
CREATE POLICY "Admins can upload site images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'site-images' AND has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update site images" ON storage.objects FOR UPDATE USING (bucket_id = 'site-images' AND has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete site images" ON storage.objects FOR DELETE USING (bucket_id = 'site-images' AND has_role(auth.uid(), 'admin'));