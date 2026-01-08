import { useState, useEffect } from "react";
import { BarChart3, Eye, TrendingUp, Users, Calendar, RefreshCw } from "lucide-react";
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

interface AnalyticsStats {
  visitors_today: number;
  visitors_week: number;
  visitors_month: number;
  page_views: number;
}

interface TopPage {
  page_path: string;
  views: number;
}

const AdminAnalytics = () => {
  const [settings, setSettings] = useState<AnalyticsSetting[]>([]);
  const [stats, setStats] = useState<AnalyticsStats>({
    visitors_today: 0,
    visitors_week: 0,
    visitors_month: 0,
    page_views: 0,
  });
  const [topPages, setTopPages] = useState<TopPage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchSettings();
    fetchStats();
    fetchTopPages();
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

  const fetchStats = async () => {
    setIsRefreshing(true);
    try {
      const now = new Date();
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const startOfWeek = new Date(startOfToday);
      startOfWeek.setDate(startOfWeek.getDate() - 7);
      const startOfMonth = new Date(startOfToday);
      startOfMonth.setDate(startOfMonth.getDate() - 30);

      // Fetch unique visitors today
      const { data: todayData } = await supabase
        .from("page_views")
        .select("visitor_id")
        .gte("created_at", startOfToday.toISOString());
      
      const uniqueVisitorsToday = new Set(todayData?.map(v => v.visitor_id) || []).size;

      // Fetch unique visitors this week
      const { data: weekData } = await supabase
        .from("page_views")
        .select("visitor_id")
        .gte("created_at", startOfWeek.toISOString());
      
      const uniqueVisitorsWeek = new Set(weekData?.map(v => v.visitor_id) || []).size;

      // Fetch unique visitors this month
      const { data: monthData } = await supabase
        .from("page_views")
        .select("visitor_id")
        .gte("created_at", startOfMonth.toISOString());
      
      const uniqueVisitorsMonth = new Set(monthData?.map(v => v.visitor_id) || []).size;

      // Fetch total page views this month
      const { count: pageViewsCount } = await supabase
        .from("page_views")
        .select("id", { count: "exact", head: true })
        .gte("created_at", startOfMonth.toISOString());

      setStats({
        visitors_today: uniqueVisitorsToday,
        visitors_week: uniqueVisitorsWeek,
        visitors_month: uniqueVisitorsMonth,
        page_views: pageViewsCount || 0,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  const fetchTopPages = async () => {
    try {
      const startOfMonth = new Date();
      startOfMonth.setDate(startOfMonth.getDate() - 30);

      const { data } = await supabase
        .from("page_views")
        .select("page_path")
        .gte("created_at", startOfMonth.toISOString());

      if (data) {
        // Count views per page
        const pageCounts: Record<string, number> = {};
        data.forEach((view) => {
          pageCounts[view.page_path] = (pageCounts[view.page_path] || 0) + 1;
        });

        // Convert to array and sort
        const sortedPages = Object.entries(pageCounts)
          .map(([page_path, views]) => ({ page_path, views }))
          .sort((a, b) => b.views - a.views)
          .slice(0, 10);

        setTopPages(sortedPages);
      }
    } catch (error) {
      console.error("Error fetching top pages:", error);
    }
  };

  const refreshAll = () => {
    fetchStats();
    fetchTopPages();
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
        <Button variant="outline" size="sm" onClick={refreshAll} disabled={isRefreshing}>
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`} />
          Atualizar
        </Button>
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
            <p className="text-xs text-muted-foreground">Visitantes únicos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Últimos 7 Dias</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.visitors_week}</div>
            <p className="text-xs text-muted-foreground">Visitantes únicos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Últimos 30 Dias</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.visitors_month.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Visitantes únicos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Páginas Vistas</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.page_views.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
          </CardContent>
        </Card>
      </div>

      {/* Top Pages */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            <CardTitle>Páginas Mais Visitadas</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">Últimos 30 dias</p>
        </CardHeader>
        <CardContent>
          {topPages.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhuma visualização registrada ainda.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {topPages.map((page, index) => {
                const maxViews = topPages[0]?.views || 1;
                const percentage = (page.views / maxViews) * 100;
                return (
                  <div key={page.page_path} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium flex items-center gap-2">
                        <span className="text-muted-foreground w-5">{index + 1}.</span>
                        {getPageName(page.page_path)}
                      </span>
                      <span className="text-muted-foreground">{page.views} visualizações</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

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

const getPageName = (path: string): string => {
  const pageNames: Record<string, string> = {
    "/": "Página Inicial",
    "/servicos": "Serviços",
    "/sobre": "Sobre Nós",
    "/galeria": "Galeria",
    "/contato": "Contato",
    "/orcamento": "Orçamento",
    "/politica-privacidade": "Política de Privacidade",
    "/politica-cookies": "Política de Cookies",
    "/admin": "Admin",
    "/admin/login": "Login Admin",
  };
  return pageNames[path] || path;
};

export default AdminAnalytics;
