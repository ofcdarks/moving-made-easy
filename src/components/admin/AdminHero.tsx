import { useState, useEffect } from "react";
import { Save } from "lucide-react";
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
}

const AdminHero = () => {
  const [content, setContent] = useState<HeroContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data } = await supabase.from("hero_content").select("*").eq("is_active", true).maybeSingle();
    setContent(data);
    setIsLoading(false);
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
