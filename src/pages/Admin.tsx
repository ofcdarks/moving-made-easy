import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Settings,
  Image,
  Users,
  FileText,
  Home,
  Info,
  LogOut,
  Menu,
  HelpCircle,
  Truck,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import logoFull from "@/assets/logo-full.png";

import AdminSettings from "@/components/admin/AdminSettings";
import AdminServices from "@/components/admin/AdminServices";
import AdminTestimonials from "@/components/admin/AdminTestimonials";
import AdminGallery from "@/components/admin/AdminGallery";
import AdminFAQs from "@/components/admin/AdminFAQs";
import AdminHero from "@/components/admin/AdminHero";
import AdminAbout from "@/components/admin/AdminAbout";
import AdminQuotes from "@/components/admin/AdminQuotes";
import AdminAnalytics from "@/components/admin/AdminAnalytics";

type AdminTab = "quotes" | "analytics" | "settings" | "services" | "testimonials" | "gallery" | "faqs" | "hero" | "about";

const Admin = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>("quotes");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/admin/login");
        return;
      }

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .maybeSingle();

      if (roles?.role !== "admin") {
        navigate("/admin/login");
        return;
      }

      setIsLoading(false);
    };

    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkAuth();
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Logout realizado", description: "Até logo!" });
    navigate("/admin/login");
  };

  const menuItems = [
    { id: "quotes" as AdminTab, label: "Orçamentos", icon: FileText },
    { id: "analytics" as AdminTab, label: "Analytics", icon: BarChart3 },
    { id: "settings" as AdminTab, label: "Configurações", icon: Settings },
    { id: "hero" as AdminTab, label: "Banner Principal", icon: Home },
    { id: "about" as AdminTab, label: "Sobre Nós", icon: Info },
    { id: "services" as AdminTab, label: "Serviços", icon: Truck },
    { id: "gallery" as AdminTab, label: "Galeria", icon: Image },
    { id: "testimonials" as AdminTab, label: "Depoimentos", icon: Users },
    { id: "faqs" as AdminTab, label: "Perguntas Frequentes", icon: HelpCircle },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar */}
      <aside
        className={`${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-card border-r border-border transition-all duration-300 flex flex-col fixed h-full z-40`}
      >
        <div className="p-4 border-b border-border flex items-center justify-between">
          {isSidebarOpen && (
            <img src={logoFull} alt="LF Fretes" className="h-8" />
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                activeTab === item.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {isSidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="p-2 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isSidebarOpen && <span className="text-sm font-medium">Sair</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ${isSidebarOpen ? "ml-64" : "ml-16"} transition-all duration-300`}>
        <div className="p-6 md:p-8">
          {activeTab === "quotes" && <AdminQuotes />}
          {activeTab === "analytics" && <AdminAnalytics />}
          {activeTab === "settings" && <AdminSettings />}
          {activeTab === "services" && <AdminServices />}
          {activeTab === "testimonials" && <AdminTestimonials />}
          {activeTab === "gallery" && <AdminGallery />}
          {activeTab === "faqs" && <AdminFAQs />}
          {activeTab === "hero" && <AdminHero />}
          {activeTab === "about" && <AdminAbout />}
        </div>
      </main>
    </div>
  );
};

export default Admin;
