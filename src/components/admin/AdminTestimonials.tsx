import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Testimonial {
  id: string;
  name: string;
  location: string | null;
  rating: number;
  content: string;
  is_active: boolean;
  sort_order: number;
}

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editing, setEditing] = useState<Testimonial | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("sort_order");
    setTestimonials(data || []);
    setIsLoading(false);
  };

  const handleSave = async () => {
    if (!editing) return;
    const isNew = !editing.id;
    const { error } = isNew
      ? await supabase.from("testimonials").insert({ ...editing, id: undefined })
      : await supabase.from("testimonials").update(editing).eq("id", editing.id);
    if (!error) {
      toast({ title: isNew ? "Depoimento criado!" : "Depoimento atualizado!" });
      fetchTestimonials();
      setIsDialogOpen(false);
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from("testimonials").delete().eq("id", id);
    toast({ title: "Depoimento excluído!" });
    fetchTestimonials();
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    await supabase.from("testimonials").update({ is_active: isActive }).eq("id", id);
    setTestimonials((prev) => prev.map((t) => (t.id === id ? { ...t, is_active: isActive } : t)));
  };

  const openNew = () => {
    setEditing({ id: "", name: "", location: "", rating: 5, content: "", is_active: true, sort_order: testimonials.length });
    setIsDialogOpen(true);
  };

  if (isLoading) return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold">Depoimentos</h2>
        <Button onClick={openNew}><Plus className="w-4 h-4 mr-2" />Novo Depoimento</Button>
      </div>

      <div className="grid gap-4">
        {testimonials.length === 0 ? (
          <div className="bg-card rounded-xl border p-8 text-center text-muted-foreground">Nenhum depoimento cadastrado.</div>
        ) : testimonials.map((t) => (
          <div key={t.id} className="bg-card rounded-xl border p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-medium">{t.name}</h3>
                  {t.location && <span className="text-sm text-muted-foreground">• {t.location}</span>}
                </div>
                <div className="flex gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < t.rating ? "text-yellow-500 fill-yellow-500" : "text-muted"}`} />)}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{t.content}</p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Switch checked={t.is_active} onCheckedChange={(checked) => handleToggleActive(t.id, checked)} />
                <Button variant="ghost" size="sm" onClick={() => { setEditing(t); setIsDialogOpen(true); }}><Edit className="w-4 h-4" /></Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild><Button variant="ghost" size="sm"><Trash2 className="w-4 h-4 text-destructive" /></Button></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader><AlertDialogTitle>Excluir depoimento?</AlertDialogTitle><AlertDialogDescription>Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
                    <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={() => handleDelete(t.id)} className="bg-destructive">Excluir</AlertDialogAction></AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing?.id ? "Editar Depoimento" : "Novo Depoimento"}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div><Label>Nome</Label><Input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></div>
              <div><Label>Localização</Label><Input value={editing.location || ""} onChange={(e) => setEditing({ ...editing, location: e.target.value })} placeholder="Ex: Bauru/SP" /></div>
              <div><Label>Avaliação (1-5)</Label><Input type="number" min={1} max={5} value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: parseInt(e.target.value) || 5 })} /></div>
              <div><Label>Depoimento</Label><Textarea value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} rows={4} /></div>
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

export default AdminTestimonials;
