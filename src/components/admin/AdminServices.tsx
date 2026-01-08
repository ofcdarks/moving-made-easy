import { useState, useEffect, useRef } from "react";
import { Plus, Edit, Trash2, Save, X, GripVertical, Upload, Image as ImageIcon } from "lucide-react";
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
  const [isUploading, setIsUploading] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data } = await supabase.from("services").select("*").order("sort_order");
    setServices(data || []);
    setIsLoading(false);
  };

  const handleImageUpload = async (file: File) => {
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      toast({ variant: "destructive", title: "Formato inválido", description: "Use JPG, PNG ou WebP." });
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({ variant: "destructive", title: "Arquivo muito grande", description: "Máximo 5MB." });
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `service-${Date.now()}.${fileExt}`;
      const filePath = `services/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("site-images")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("site-images")
        .getPublicUrl(filePath);

      if (editingService) {
        setEditingService({ ...editingService, image_url: urlData.publicUrl });
      }

      toast({ title: "Imagem enviada!" });
    } catch (error) {
      console.error("Upload error:", error);
      toast({ variant: "destructive", title: "Erro no upload", description: "Tente novamente." });
    } finally {
      setIsUploading(false);
    }
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
            {service.image_url ? (
              <img src={service.image_url} alt={service.title} className="w-12 h-12 rounded-lg object-cover" />
            ) : (
              <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-muted-foreground" />
              </div>
            )}
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
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editingService?.id ? "Editar Serviço" : "Novo Serviço"}</DialogTitle></DialogHeader>
          {editingService && (
            <div className="space-y-4">
              <div><Label>Título</Label><Input value={editingService.title} onChange={(e) => setEditingService({ ...editingService, title: e.target.value })} /></div>
              <div><Label>Descrição Curta</Label><Input value={editingService.short_description || ""} onChange={(e) => setEditingService({ ...editingService, short_description: e.target.value })} /></div>
              <div><Label>Descrição Completa</Label><Textarea value={editingService.full_description || ""} onChange={(e) => setEditingService({ ...editingService, full_description: e.target.value })} rows={4} /></div>
              <div><Label>Nome do Ícone (Lucide)</Label><Input value={editingService.icon || ""} onChange={(e) => setEditingService({ ...editingService, icon: e.target.value })} placeholder="Ex: Truck, Home, Package" /></div>
              
              {/* Image Upload Section */}
              <div className="space-y-2">
                <Label>Imagem do Serviço</Label>
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                />
                
                {editingService.image_url ? (
                  <div className="relative">
                    <img
                      src={editingService.image_url}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-lg border"
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
                        onClick={() => setEditingService({ ...editingService, image_url: "" })}
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
                        <span className="text-xs text-muted-foreground">JPG, PNG ou WebP (máx. 5MB)</span>
                      </>
                    )}
                  </button>
                )}
                
                <p className="text-xs text-muted-foreground">Ou cole uma URL diretamente:</p>
                <Input
                  value={editingService.image_url || ""}
                  onChange={(e) => setEditingService({ ...editingService, image_url: e.target.value })}
                  placeholder="https://exemplo.com/imagem.jpg"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}><X className="w-4 h-4 mr-2" />Cancelar</Button>
                <Button onClick={handleSave} disabled={isUploading}><Save className="w-4 h-4 mr-2" />Salvar</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminServices;
