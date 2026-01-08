import { useState, useEffect, useRef } from "react";
import { Save, Upload, X, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
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
  rotating_phrases: string[] | null;
  typing_speed: number | null;
  delete_speed: number | null;
  background_images: string[] | null;
  stat_deliveries: string | null;
  stat_deliveries_label: string | null;
  stat_punctuality: string | null;
  stat_punctuality_label: string | null;
  stat_security: string | null;
  stat_security_label: string | null;
}

const AdminHero = () => {
  const [content, setContent] = useState<HeroContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [newPhrase, setNewPhrase] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const additionalImageInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data } = await supabase.from("hero_content").select("*").eq("is_active", true).maybeSingle();
    setContent(data);
    setIsLoading(false);
  };

  const handleImageUpload = async (file: File, isAdditional = false) => {
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

      if (isAdditional) {
        const currentImages = content.background_images || [];
        setContent({ ...content, background_images: [...currentImages, urlData.publicUrl] });
      } else {
        setContent({ ...content, background_image_url: urlData.publicUrl });
      }
      toast({ title: "Imagem enviada!" });
    } catch (error) {
      console.error("Upload error:", error);
      toast({ variant: "destructive", title: "Erro no upload" });
    } finally {
      setIsUploading(false);
    }
  };

  const removeAdditionalImage = (index: number) => {
    if (!content) return;
    const images = [...(content.background_images || [])];
    images.splice(index, 1);
    setContent({ ...content, background_images: images });
  };

  const addPhrase = () => {
    if (!content || !newPhrase.trim()) return;
    const phrases = [...(content.rotating_phrases || []), newPhrase.trim()];
    setContent({ ...content, rotating_phrases: phrases });
    setNewPhrase("");
  };

  const removePhrase = (index: number) => {
    if (!content) return;
    const phrases = [...(content.rotating_phrases || [])];
    phrases.splice(index, 1);
    setContent({ ...content, rotating_phrases: phrases });
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

      <div className="space-y-6">
        {/* Image Upload Section */}
        <div className="bg-card rounded-xl border p-6 space-y-4">
          <h3 className="font-semibold text-lg">Imagens de Fundo</h3>
          <p className="text-sm text-muted-foreground">A imagem principal e as adicionais vão alternar automaticamente.</p>
          
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], false)}
          />
          <input
            type="file"
            ref={additionalImageInputRef}
            className="hidden"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0], true)}
          />
          
          <div className="space-y-2">
            <Label>Imagem Principal</Label>
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

          {/* Additional Images */}
          <div className="space-y-2">
            <Label>Imagens Adicionais (Rotação)</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {(content.background_images || []).map((img, index) => (
                <div key={index} className="relative group">
                  <img src={img} alt={`Imagem ${index + 1}`} className="w-full h-24 object-cover rounded-lg border" />
                  <button
                    type="button"
                    onClick={() => removeAdditionalImage(index)}
                    className="absolute top-1 right-1 bg-destructive text-destructive-foreground rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => additionalImageInputRef.current?.click()}
                disabled={isUploading}
                className="h-24 border-2 border-dashed border-muted-foreground/25 rounded-lg flex flex-col items-center justify-center gap-1 hover:border-primary/50 hover:bg-muted/50 transition-colors"
              >
                <Plus className="w-5 h-5 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Adicionar</span>
              </button>
            </div>
          </div>
        </div>

        {/* Rotating Phrases */}
        <div className="bg-card rounded-xl border p-6 space-y-4">
          <h3 className="font-semibold text-lg">Frases Rotativas (Typewriter)</h3>
          <p className="text-sm text-muted-foreground">Essas frases aparecem com efeito de digitação no título.</p>
          
          <div className="space-y-2">
            {(content.rotating_phrases || []).map((phrase, index) => (
              <div key={index} className="flex items-center gap-2 bg-muted/50 rounded-lg px-3 py-2">
                <span className="flex-1 text-sm">{phrase}</span>
                <button
                  type="button"
                  onClick={() => removePhrase(index)}
                  className="text-destructive hover:text-destructive/80"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input
              value={newPhrase}
              onChange={(e) => setNewPhrase(e.target.value)}
              placeholder="Nova frase..."
              onKeyDown={(e) => e.key === "Enter" && addPhrase()}
            />
            <Button type="button" onClick={addPhrase} variant="secondary">
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          {/* Speed Controls */}
          <div className="grid md:grid-cols-2 gap-6 pt-4">
            <div className="space-y-3">
              <Label>Velocidade de Digitação: {content.typing_speed || 80}ms</Label>
              <Slider
                value={[content.typing_speed || 80]}
                onValueChange={([value]) => setContent({ ...content, typing_speed: value })}
                min={20}
                max={200}
                step={10}
              />
              <p className="text-xs text-muted-foreground">Menor = mais rápido</p>
            </div>
            <div className="space-y-3">
              <Label>Velocidade de Apagar: {content.delete_speed || 30}ms</Label>
              <Slider
                value={[content.delete_speed || 30]}
                onValueChange={([value]) => setContent({ ...content, delete_speed: value })}
                min={10}
                max={100}
                step={5}
              />
              <p className="text-xs text-muted-foreground">Menor = mais rápido</p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-card rounded-xl border p-6 space-y-4">
          <h3 className="font-semibold text-lg">Estatísticas da Hero</h3>
          <p className="text-sm text-muted-foreground">Esses números aparecem na parte inferior do banner.</p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
              <Label className="font-medium">Estatística 1</Label>
              <Input 
                value={content.stat_deliveries || ""} 
                onChange={(e) => setContent({ ...content, stat_deliveries: e.target.value })} 
                placeholder="Ex: 500+"
              />
              <Input 
                value={content.stat_deliveries_label || ""} 
                onChange={(e) => setContent({ ...content, stat_deliveries_label: e.target.value })} 
                placeholder="Entregas"
              />
            </div>
            <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
              <Label className="font-medium">Estatística 2</Label>
              <Input 
                value={content.stat_punctuality || ""} 
                onChange={(e) => setContent({ ...content, stat_punctuality: e.target.value })} 
                placeholder="Ex: 99%"
              />
              <Input 
                value={content.stat_punctuality_label || ""} 
                onChange={(e) => setContent({ ...content, stat_punctuality_label: e.target.value })} 
                placeholder="Pontualidade"
              />
            </div>
            <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
              <Label className="font-medium">Estatística 3</Label>
              <Input 
                value={content.stat_security || ""} 
                onChange={(e) => setContent({ ...content, stat_security: e.target.value })} 
                placeholder="Ex: 100%"
              />
              <Input 
                value={content.stat_security_label || ""} 
                onChange={(e) => setContent({ ...content, stat_security_label: e.target.value })} 
                placeholder="Segurança"
              />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="bg-card rounded-xl border p-6 space-y-4">
          <h3 className="font-semibold text-lg">Textos</h3>
          
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
    </div>
  );
};

export default AdminHero;