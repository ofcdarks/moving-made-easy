import { useState, useEffect } from "react";
import { Save } from "lucide-react";
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
}

const AdminAbout = () => {
  const [content, setContent] = useState<AboutContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    const { data } = await supabase.from("about_content").select("*").eq("is_active", true).maybeSingle();
    setContent(data);
    setIsLoading(false);
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
            <Label>Taxa de Satisfação</Label>
            <Input value={content.satisfaction_rate || ""} onChange={(e) => setContent({ ...content, satisfaction_rate: e.target.value })} placeholder="Ex: 98%" />
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
