-- Site Settings table for contact info, social links, etc.
CREATE TABLE public.site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text,
  label text NOT NULL,
  type text NOT NULL DEFAULT 'text', -- text, phone, email, url, textarea
  category text NOT NULL DEFAULT 'general', -- general, contact, social
  sort_order integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Services table
CREATE TABLE public.services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  short_description text,
  full_description text,
  icon text, -- lucide icon name
  image_url text,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Testimonials table
CREATE TABLE public.testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text,
  rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  content text NOT NULL,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Gallery images table
CREATE TABLE public.gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text,
  description text,
  image_url text NOT NULL,
  category text DEFAULT 'geral',
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- FAQ table
CREATE TABLE public.faqs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  question text NOT NULL,
  answer text NOT NULL,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Hero/Banner content
CREATE TABLE public.hero_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text,
  highlight_text text,
  cta_text text,
  cta_link text,
  is_active boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- About section content
CREATE TABLE public.about_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  subtitle text,
  description text,
  years_experience text,
  moves_completed text,
  satisfaction_rate text,
  coverage_area text,
  is_active boolean DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_content ENABLE ROW LEVEL SECURITY;

-- Public read policies (everyone can view active content)
CREATE POLICY "Anyone can view site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Anyone can view active services" ON public.services FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view active testimonials" ON public.testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view active gallery images" ON public.gallery_images FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view active faqs" ON public.faqs FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view active hero content" ON public.hero_content FOR SELECT USING (is_active = true);
CREATE POLICY "Anyone can view active about content" ON public.about_content FOR SELECT USING (is_active = true);

-- Admin full access policies
CREATE POLICY "Admins can manage site settings" ON public.site_settings FOR ALL USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage services" ON public.services FOR ALL USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage testimonials" ON public.testimonials FOR ALL USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage gallery images" ON public.gallery_images FOR ALL USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage faqs" ON public.faqs FOR ALL USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage hero content" ON public.hero_content FOR ALL USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage about content" ON public.about_content FOR ALL USING (has_role(auth.uid(), 'admin'));

-- Triggers for updated_at
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_services_updated_at BEFORE UPDATE ON public.services FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_gallery_images_updated_at BEFORE UPDATE ON public.gallery_images FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_faqs_updated_at BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_hero_content_updated_at BEFORE UPDATE ON public.hero_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_about_content_updated_at BEFORE UPDATE ON public.about_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default site settings
INSERT INTO public.site_settings (key, value, label, type, category, sort_order) VALUES
('company_name', 'LF Fretes e Mudanças', 'Nome da Empresa', 'text', 'general', 1),
('slogan', 'Sua mudança em boas mãos', 'Slogan', 'text', 'general', 2),
('whatsapp_link', 'https://wa.link/kpdjsl', 'Link do WhatsApp', 'url', 'contact', 3),
('whatsapp_display', '(14) 98834-0448', 'Número WhatsApp (exibição)', 'phone', 'contact', 4),
('email', 'contato@fretesembauru.com.br', 'E-mail', 'email', 'contact', 5),
('address', 'Bauru, SP - Atendemos toda a região', 'Endereço', 'text', 'contact', 6),
('business_hours', 'Seg - Sáb: 07:00 - 19:00', 'Horário de Funcionamento', 'text', 'contact', 7);

-- Insert default hero content
INSERT INTO public.hero_content (title, subtitle, highlight_text, cta_text, cta_link, is_active) VALUES
('Mudanças e Fretes com Segurança e Pontualidade', 'Cuidamos do seu patrimônio como se fosse nosso. Transporte seguro para residências e empresas em Bauru e região.', 'Bauru e Região', 'Solicitar Orçamento Grátis', '/orcamento', true);

-- Insert default about content
INSERT INTO public.about_content (title, subtitle, description, years_experience, moves_completed, satisfaction_rate, coverage_area, is_active) VALUES
('Sua Mudança em Boas Mãos', 'Conheça Nossa História', 'Com anos de experiência no mercado de mudanças e fretes, a LF Fretes e Mudanças se consolidou como referência em transporte seguro e profissional na região de Bauru. Nossa equipe é treinada para cuidar do seu patrimônio com todo carinho e atenção que ele merece.', '10+', '2500+', '98%', 'Bauru e Região', true);