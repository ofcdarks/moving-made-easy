import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Service {
  id: string;
  title: string;
  short_description: string | null;
  full_description: string | null;
  icon: string | null;
  image_url: string | null;
  is_active: boolean;
  sort_order: number;
}

const AdminServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data } = await supabase.from("services").select("*").order("sort_order");
    setServices(data || []);
    setIsLoading(false);
  };

  const handleSave = async () => {
    if (!editingService) return;
    
    const isNew = !editingService.id;
    const { error } = isNew
      ? await supabase.from("services").insert({ ...editingService, id: undefined })
      : await supabase.from("services").update(editingService).eq("id", editingService.id);

    if (!error) {
      toast({ title: isNew ? "Serviço criado!" : "Serviço atualizado!" });
      fetchServices();
      setIsDialogOpen(false);
      setEditingService(null);
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from("services").delete().eq("id", id);
    toast({ title: "Serviço excluído!" });
    fetchServices();
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    await supabase.from("services").update({ is_active: isActive }).eq("id", id);
    setServices((prev) => prev.map((s) => (s.id === id ? { ...s, is_active: isActive } : s)));
  };

  const openNew = () => {
    setEditingService({
      id: "",
      title: "",
      short_description: "",
      full_description: "",
      icon: "Truck",
      image_url: "",
      is_active: true,
      sort_order: services.length,
    });
    setIsDialogOpen(true);
  };

  if (isLoading) {
    return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold">Serviços</h2>
        <Button onClick={openNew}><Plus className="w-4 h-4 mr-2" />Novo Serviço</Button>
      </div>

      <div className="bg-card rounded-xl border divide-y">
        {services.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">Nenhum serviço cadastrado.</div>
        ) : services.map((service) => (
          <div key={service.id} className="p-4 flex items-center gap-4">
            <GripVertical className="w-5 h-5 text-muted-foreground cursor-grab" />
            <div className="flex-1">
              <h3 className="font-medium">{service.title}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">{service.short_description}</p>
            </div>
            <Switch checked={service.is_active} onCheckedChange={(checked) => handleToggleActive(service.id, checked)} />
            <Button variant="ghost" size="sm" onClick={() => { setEditingService(service); setIsDialogOpen(true); }}><Edit className="w-4 h-4" /></Button>
            <AlertDialog>
              <AlertDialogTrigger asChild><Button variant="ghost" size="sm"><Trash2 className="w-4 h-4 text-destructive" /></Button></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader><AlertDialogTitle>Excluir serviço?</AlertDialogTitle><AlertDialogDescription>Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
                <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={() => handleDelete(service.id)} className="bg-destructive">Excluir</AlertDialogAction></AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editingService?.id ? "Editar Serviço" : "Novo Serviço"}</DialogTitle></DialogHeader>
          {editingService && (
            <div className="space-y-4">
              <div><Label>Título</Label><Input value={editingService.title} onChange={(e) => setEditingService({ ...editingService, title: e.target.value })} /></div>
              <div><Label>Descrição Curta</Label><Input value={editingService.short_description || ""} onChange={(e) => setEditingService({ ...editingService, short_description: e.target.value })} /></div>
              <div><Label>Descrição Completa</Label><Textarea value={editingService.full_description || ""} onChange={(e) => setEditingService({ ...editingService, full_description: e.target.value })} rows={4} /></div>
              <div><Label>Nome do Ícone (Lucide)</Label><Input value={editingService.icon || ""} onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })} placeholder="Ex: Truck, Home, Package" /></div>
              <div><Label>URL da Imagem</Label><Input value={editingService.image_url || ""} onChange={(e) => setEditingService({ ...editingService, image_url: e.target.value })} /></div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}><X className="w-4 h-4 mr-2" />Cancelar</Button>
                <Button onClick={handleSave}><Save className="w-4 h-4 mr-2" />Salvar</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminServices;
