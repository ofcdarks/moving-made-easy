import { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface GalleryImage {
  id: string;
  title: string | null;
  description: string | null;
  image_url: string;
  category: string | null;
  is_active: boolean;
  sort_order: number;
}

const AdminGallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newImage, setNewImage] = useState({ title: "", category: "geral" });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const { data } = await supabase.from("gallery_images").select("*").order("sort_order");
    setImages(data || []);
    setIsLoading(false);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const fileName = `${Date.now()}-${file.name}`;
    
    const { error: uploadError } = await supabase.storage.from("site-images").upload(fileName, file);
    
    if (uploadError) {
      toast({ variant: "destructive", title: "Erro no upload", description: uploadError.message });
      setIsUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from("site-images").getPublicUrl(fileName);

    const { error } = await supabase.from("gallery_images").insert({
      title: newImage.title || null,
      category: newImage.category,
      image_url: publicUrl,
      is_active: true,
      sort_order: images.length,
    });

    if (!error) {
      toast({ title: "Imagem adicionada!" });
      fetchImages();
      setIsDialogOpen(false);
      setNewImage({ title: "", category: "geral" });
    }
    setIsUploading(false);
  };

  const handleDelete = async (id: string, imageUrl: string) => {
    // Extract file name from URL
    const fileName = imageUrl.split("/").pop();
    if (fileName) {
      await supabase.storage.from("site-images").remove([fileName]);
    }
    await supabase.from("gallery_images").delete().eq("id", id);
    toast({ title: "Imagem excluída!" });
    fetchImages();
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    await supabase.from("gallery_images").update({ is_active: isActive }).eq("id", id);
    setImages((prev) => prev.map((img) => (img.id === id ? { ...img, is_active: isActive } : img)));
  };

  if (isLoading) return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold">Galeria de Fotos</h2>
        <Button onClick={() => setIsDialogOpen(true)}><Plus className="w-4 h-4 mr-2" />Adicionar Foto</Button>
      </div>

      {images.length === 0 ? (
        <div className="bg-card rounded-xl border p-12 text-center">
          <ImageIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
          <p className="text-muted-foreground">Nenhuma imagem na galeria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="relative group bg-card rounded-xl border overflow-hidden">
              <img src={img.image_url} alt={img.title || ""} className="w-full h-40 object-cover" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Switch checked={img.is_active} onCheckedChange={(checked) => handleToggleActive(img.id, checked)} />
                <AlertDialog>
                  <AlertDialogTrigger asChild><Button variant="destructive" size="sm"><Trash2 className="w-4 h-4" /></Button></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader><AlertDialogTitle>Excluir imagem?</AlertDialogTitle><AlertDialogDescription>Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
                    <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={() => handleDelete(img.id, img.image_url)} className="bg-destructive">Excluir</AlertDialogAction></AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
              {img.title && <p className="p-2 text-sm font-medium truncate">{img.title}</p>}
            </div>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Adicionar Foto</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><Label>Título (opcional)</Label><Input value={newImage.title} onChange={(e) => setNewImage({ ...newImage, title: e.target.value })} /></div>
            <div><Label>Categoria</Label><Input value={newImage.category} onChange={(e) => setNewImage({ ...newImage, category: e.target.value })} /></div>
            <div>
              <Label>Imagem</Label>
              <input type="file" ref={fileInputRef} accept="image/*" onChange={handleUpload} className="hidden" />
              <Button variant="outline" className="w-full mt-1" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
                <Upload className="w-4 h-4 mr-2" />{isUploading ? "Enviando..." : "Selecionar Imagem"}
              </Button>
            </div>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="w-full"><X className="w-4 h-4 mr-2" />Cancelar</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminGallery;
