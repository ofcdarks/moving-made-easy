import { useState, useEffect } from "react";
import { BarChart3, Eye, TrendingUp, Users, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AnalyticsSetting {
  id: string;
  key: string;
  value: string | null;
  label: string;
}

const AdminAnalytics = () => {
  const [settings, setSettings] = useState<AnalyticsSetting[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  // Placeholder stats - em produção seria integrado com Google Analytics API
  const stats = {
    visitors_today: 127,
    visitors_week: 843,
    visitors_month: 3256,
    page_views: 5420,
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    const { data, error } = await supabase
      .from("site_settings")
      .select("id, key, value, label")
      .eq("category", "analytics")
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
      toast({ title: "Configurações salvas!", description: "Os códigos de rastreamento foram atualizados." });
    } catch (error) {
      toast({ variant: "destructive", title: "Erro", description: "Não foi possível salvar." });
    }
    setIsSaving(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-display font-bold">Analytics e Rastreamento</h2>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Visitantes Hoje</CardTitle>
            <Eye className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.visitors_today}</div>
            <p className="text-xs text-muted-foreground">+12% vs ontem</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Visitantes Semana</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.visitors_week}</div>
            <p className="text-xs text-muted-foreground">+8% vs semana passada</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Visitantes Mês</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.visitors_month.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+23% vs mês passado</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Páginas Vistas</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.page_views.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Configuration */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              <CardTitle>Configuração de Rastreamento</CardTitle>
            </div>
            <Button onClick={handleSave} disabled={isSaving} size="sm">
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Salvando..." : "Salvar"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground mb-4">
            Configure os IDs de rastreamento para Google Analytics, Facebook Pixel e Google Tag Manager.
            Esses códigos serão automaticamente adicionados ao site.
          </p>
          
          {settings.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma configuração de analytics encontrada.</p>
              <p className="text-sm">As configurações serão criadas automaticamente.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {settings.map((setting) => (
                <div key={setting.key} className="space-y-2">
                  <Label htmlFor={setting.key}>{setting.label}</Label>
                  <Input
                    id={setting.key}
                    type="text"
                    value={setting.value || ""}
                    onChange={(e) => handleChange(setting.key, e.target.value)}
                    placeholder={getPlaceholder(setting.key)}
                  />
                  <p className="text-xs text-muted-foreground">{getHelpText(setting.key)}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Instructions Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Como obter os IDs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <div>
            <p className="font-medium text-foreground">Google Analytics:</p>
            <p>Acesse analytics.google.com → Admin → Propriedade → Fluxos de dados → Copie o ID de medição (G-XXXXXXXXXX)</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Facebook Pixel:</p>
            <p>Acesse business.facebook.com → Gerenciador de Eventos → Fontes de dados → Copie o ID do Pixel</p>
          </div>
          <div>
            <p className="font-medium text-foreground">Google Tag Manager:</p>
            <p>Acesse tagmanager.google.com → Selecione o container → Copie o ID (GTM-XXXXXXX)</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const getPlaceholder = (key: string): string => {
  switch (key) {
    case "google_analytics_id":
      return "G-XXXXXXXXXX";
    case "facebook_pixel_id":
      return "1234567890123456";
    case "google_tag_manager_id":
      return "GTM-XXXXXXX";
    default:
      return "";
  }
};

const getHelpText = (key: string): string => {
  switch (key) {
    case "google_analytics_id":
      return "ID de medição do Google Analytics 4 (começa com G-)";
    case "facebook_pixel_id":
      return "ID numérico do Facebook Pixel para rastreamento de conversões";
    case "google_tag_manager_id":
      return "ID do container do Google Tag Manager (começa com GTM-)";
    default:
      return "";
  }
};

export default AdminAnalytics;
