-- Adicionar configurações do Google My Business
INSERT INTO public.site_settings (key, label, value, type, category, sort_order) VALUES
  ('gmb_place_id', 'Google Place ID', '', 'text', 'google_business', 1),
  ('gmb_review_url', 'Link para Avaliações Google', '', 'url', 'google_business', 2),
  ('gmb_maps_embed', 'Código Embed do Google Maps', '', 'textarea', 'google_business', 3),
  ('gmb_profile_url', 'URL do Perfil Google Business', '', 'url', 'google_business', 4),
  ('gmb_cid', 'Google CID (Customer ID)', '', 'text', 'google_business', 5)
ON CONFLICT (key) DO NOTHING;