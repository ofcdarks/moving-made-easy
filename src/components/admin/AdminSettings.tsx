import { useState, useEffect } from "react";
import { Save, MapPin, ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Setting {
  id: string;
  key: string;
  value: string | null;
  label: string;
  type: string;
  category: string;
}

const AdminSettings = () => {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .order("sort_order");
    
    if (error) {
      toast({ variant: "destructive", title: "Erro", description: "Não foi possível carregar as configurações." });
    } else {
      setSettings(data || []);
    }
    setIsLoading(false);
  };

  const handleChange = (key: string, value: string) => {
    setSettings((prev) =>
      prev.map((s) => (s.key === key ? { ...s, value } : s))
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      for (const setting of settings) {
        await supabase
          .from("site_settings")
          .update({ value: setting.value })
          .eq("key", setting.key);
      }
      toast({ title: "Configurações salvas!", description: "As alterações foram aplicadas." });
    } catch (error) {
      toast({ variant: "destructive", title: "Erro", description: "Não foi possível salvar." });
    }
    setIsSaving(false);
  };

  const groupedSettings = settings.reduce((acc, setting) => {
    if (!acc[setting.category]) acc[setting.category] = [];
    acc[setting.category].push(setting);
    return acc;
  }, {} as Record<string, Setting[]>);

  const categoryLabels: Record<string, string> = {
    general: "Informações Gerais",
    contact: "Contato",
    social: "Redes Sociais",
    analytics: "Analytics e Rastreamento",
    google_business: "Google Meu Negócio",
  };

  const categoryIcons: Record<string, React.ReactNode> = {
    google_business: <MapPin className="w-5 h-5 text-primary" />,
  };

  const categoryDescriptions: Record<string, string> = {
    google_business: "Configure seu perfil do Google Meu Negócio para melhorar sua presença local e aparecer no Google Maps.",
  };

  // Ordenação das categorias
  const categoryOrder = ["general", "contact", "google_business", "social", "analytics"];
  const sortedCategories = Object.keys(groupedSettings).sort(
    (a, b) => categoryOrder.indexOf(a) - categoryOrder.indexOf(b)
  );

  if (isLoading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold">Configurações do Site</h2>
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </div>

      <div className="space-y-8">
        {sortedCategories.map((category) => {
          const items = groupedSettings[category];
          return (
            <div key={category} className="bg-card rounded-xl border p-6">
              <div className="flex items-center gap-2 mb-2">
                {categoryIcons[category]}
                <h3 className="text-lg font-semibold">{categoryLabels[category] || category}</h3>
              </div>
              
              {categoryDescriptions[category] && (
                <p className="text-sm text-muted-foreground mb-4">
                  {categoryDescriptions[category]}
                </p>
              )}

              {category === "google_business" && (
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                    <Star className="w-4 h-4 text-primary" />
                    Como configurar
                  </h4>
                  <ol className="text-xs text-muted-foreground space-y-1 list-decimal list-inside">
                    <li>Acesse <a href="https://business.google.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">business.google.com</a> e crie/reivindique seu perfil</li>
                    <li>Copie o Place ID do seu negócio em <a href="https://developers.google.com/maps/documentation/places/web-service/place-id" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Place ID Finder</a></li>
                    <li>Para o link de avaliações, use: g.page/[seu-negócio]/review</li>
                    <li>No Google Maps, clique em "Compartilhar" e copie o código Embed</li>
                  </ol>
                </div>
              )}

              <div className="grid gap-4">
                {items.map((setting) => (
                  <div key={setting.key}>
                    <Label htmlFor={setting.key} className="flex items-center gap-2">
                      {setting.label}
                      {setting.key === "gmb_profile_url" && setting.value && (
                        <a href={setting.value} target="_blank" rel="noopener noreferrer" className="text-primary">
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </Label>
                    {setting.type === "textarea" ? (
                      <Textarea
                        id={setting.key}
                        value={setting.value || ""}
                        onChange={(e) => handleChange(setting.key, e.target.value)}
                        className="mt-1 font-mono text-xs"
                        rows={4}
                        placeholder={setting.key === "gmb_maps_embed" ? '<iframe src="https://www.google.com/maps/embed?..." ...></iframe>' : ""}
                      />
                    ) : (
                      <Input
                        id={setting.key}
                        type={setting.type === "email" ? "email" : setting.type === "url" ? "url" : "text"}
                        value={setting.value || ""}
                        onChange={(e) => handleChange(setting.key, e.target.value)}
                        className="mt-1"
                        placeholder={
                          setting.key === "gmb_place_id" ? "ChIJ..." :
                          setting.key === "gmb_review_url" ? "https://g.page/seu-negocio/review" :
                          setting.key === "gmb_cid" ? "1234567890" :
                          ""
                        }
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminSettings;
