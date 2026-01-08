import { useState, useEffect } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  };

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
        {Object.entries(groupedSettings).map(([category, items]) => (
          <div key={category} className="bg-card rounded-xl border p-6">
            <h3 className="text-lg font-semibold mb-4">{categoryLabels[category] || category}</h3>
            <div className="grid gap-4">
              {items.map((setting) => (
                <div key={setting.key}>
                  <Label htmlFor={setting.key}>{setting.label}</Label>
                  <Input
                    id={setting.key}
                    type={setting.type === "email" ? "email" : setting.type === "url" ? "url" : "text"}
                    value={setting.value || ""}
                    onChange={(e) => handleChange(setting.key, e.target.value)}
                    className="mt-1"
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminSettings;
