import { useState, useEffect, useRef } from "react";
import { Save, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AboutContent {
  id: string;
  title: string;
  subtitle: string | null;
  description: string | null;
  years_experience: string | null;
  moves_completed: string | null;
  satisfaction_rate: string | null;
  coverage_area: string | null;
  image_url: string | null;
  clients_satisfied: string | null;
}

const AdminAbout = () => {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data } = await supabase.from("about_content").select("*").eq("is_active", true).maybeSingle();
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
      const fileName = `about-${Date.now()}.${fileExt}`;
      const filePath = `about/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("site-images")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("site-images")
        .getPublicUrl(filePath);

      setContent({ ...content, image_url: urlData.publicUrl });
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
    const { error } = await supabase.from("about_content").update(content).eq("id", content.id);
    if (!error) {
      toast({ title: "Seção Sobre atualizada!" });
    }
    setIsSaving(false);
  };

  if (isLoading) return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;

  if (!content) return <div className="bg-card rounded-xl border p-8 text-center text-muted-foreground">Nenhum conteúdo encontrado.</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold">Seção Sobre Nós</h2>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="w-4 h-4 mr-2" />{isSaving ? "Salvando..." : "Salvar"}
        </Button>
      </div>

      <div className="bg-card rounded-xl border p-6 space-y-4">
        {/* Image Upload Section */}
        <div className="space-y-2">
          <Label>Imagem da Seção</Label>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
          />
          
          {content.image_url ? (
            <div className="relative">
              <img
                src={content.image_url}
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
                  onClick={() => setContent({ ...content, image_url: "" })}
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
                  <span className="text-sm text-muted-foreground">Clique para enviar imagem</span>
                </>
              )}
            </button>
          )}
        </div>

        <div>
          <Label>Título</Label>
          <Input value={content.title} onChange={(e) => setContent({ ...content, title: e.target.value })} />
        </div>
        <div>
          <Label>Subtítulo</Label>
          <Input value={content.subtitle || ""} onChange={(e) => setContent({ ...content, subtitle: e.target.value })} />
        </div>
        <div>
          <Label>Descrição</Label>
          <Textarea value={content.description || ""} onChange={(e) => setContent({ ...content, description: e.target.value })} rows={5} />
        </div>

        <h3 className="font-semibold pt-4 border-t">Estatísticas</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>Anos de Experiência</Label>
            <Input value={content.years_experience || ""} onChange={(e) => setContent({ ...content, years_experience: e.target.value })} placeholder="Ex: 10+" />
          </div>
          <div>
            <Label>Mudanças Realizadas</Label>
            <Input value={content.moves_completed || ""} onChange={(e) => setContent({ ...content, moves_completed: e.target.value })} placeholder="Ex: 2500+" />
          </div>
          <div>
            <Label>Clientes Satisfeitos</Label>
            <Input value={content.clients_satisfied || ""} onChange={(e) => setContent({ ...content, clients_satisfied: e.target.value })} placeholder="Ex: 1000+" />
          </div>
          <div>
            <Label>Área de Cobertura</Label>
            <Input value={content.coverage_area || ""} onChange={(e) => setContent({ ...content, coverage_area: e.target.value })} placeholder="Ex: Bauru e Região" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAbout;
