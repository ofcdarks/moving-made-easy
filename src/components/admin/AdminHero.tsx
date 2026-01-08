import { useState, useEffect, useRef } from "react";
import { Save, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface HeroContent {
  id: string;
  title: string;
  subtitle: string | null;
  highlight_text: string | null;
  cta_text: string | null;
  cta_link: string | null;
  background_image_url: string | null;
}

const AdminHero = () => {
  const [content, setContent] = useState<HeroContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data } = await supabase.from("hero_content").select("*").eq("is_active", true).maybeSingle();
    setContent(data);
    setIsLoading(false);
  };

  const handleImageUpload = async (file: File) => {
    if (!file || !content) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast({ variant: "destructive", title: "Formato inválido", description: "Use JPG, PNG ou WebP." });
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `hero-${Date.now()}.${fileExt}`;
      const filePath = `hero/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("site-images")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("site-images")
        .getPublicUrl(filePath);

      setContent({ ...content, background_image_url: urlData.publicUrl });
      toast({ title: "Imagem enviada!" });
    } catch (error) {
      console.error("Upload error:", error);
      toast({ variant: "destructive", title: "Erro no upload" });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    if (!content) return;
    setIsSaving(true);
    const { error } = await supabase.from("hero_content").update(content).eq("id", content.id);
    if (!error) {
      toast({ title: "Banner atualizado!" });
    }
    setIsSaving(false);
  };

  if (isLoading) return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;

  if (!content) return <div className="bg-card rounded-xl border p-8 text-center text-muted-foreground">Nenhum conteúdo de banner encontrado.</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold">Banner Principal</h2>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="w-4 h-4 mr-2" />{isSaving ? "Salvando..." : "Salvar"}
        </Button>
      </div>

      <div className="bg-card rounded-xl border p-6 space-y-4">
        {/* Image Upload Section */}
        <div className="space-y-2">
          <Label>Imagem de Fundo</Label>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
          />
          
          {content.background_image_url ? (
            <div className="relative">
              <img
                src={content.background_image_url}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg border"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  variant="secondary"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                >
                  <Upload className="w-4 h-4 mr-1" />
                  Trocar
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="destructive"
                  onClick={() => setContent({ ...content, background_image_url: "" })}
                >
                  <X className="w-4 h-4 mr-1" />
                  Remover
                </Button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-muted/50 transition-colors"
            >
              {isUploading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
              ) : (
                <>
                  <Upload className="w-6 h-6 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Clique para enviar imagem de fundo</span>
                </>
              )}
            </button>
          )}
        </div>

        <div>
          <Label>Título Principal</Label>
          <Input value={content.title} onChange={(e) => setContent({ ...content, title: e.target.value })} />
        </div>
        <div>
          <Label>Subtítulo</Label>
          <Textarea value={content.subtitle || ""} onChange={(e) => setContent({ ...content, subtitle: e.target.value })} rows={3} />
        </div>
        <div>
          <Label>Texto em Destaque</Label>
          <Input value={content.highlight_text || ""} onChange={(e) => setContent({ ...content, highlight_text: e.target.value })} placeholder="Ex: Bauru e Região" />
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Texto do Botão</Label>
            <Input value={content.cta_text || ""} onChange={(e) => setContent({ ...content, cta_text: e.target.value })} />
          </div>
          <div>
            <Label>Link do Botão</Label>
            <Input value={content.cta_link || ""} onChange={(e) => setContent({ ...content, cta_link: e.target.value })} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHero;
