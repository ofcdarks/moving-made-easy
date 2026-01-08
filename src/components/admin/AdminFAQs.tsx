import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  is_active: boolean;
  sort_order: number;
}

const AdminFAQs = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editing, setEditing] = useState<FAQ | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    const { data } = await supabase.from("faqs").select("*").order("sort_order");
    setFaqs(data || []);
    setIsLoading(false);
  };

  const handleSave = async () => {
    if (!editing) return;
    const isNew = !editing.id;
    const { error } = isNew
      ? await supabase.from("faqs").insert({ ...editing, id: undefined })
      : await supabase.from("faqs").update(editing).eq("id", editing.id);
    if (!error) {
      toast({ title: isNew ? "FAQ criada!" : "FAQ atualizada!" });
      fetchFaqs();
      setIsDialogOpen(false);
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from("faqs").delete().eq("id", id);
    toast({ title: "FAQ excluída!" });
    fetchFaqs();
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    await supabase.from("faqs").update({ is_active: isActive }).eq("id", id);
    setFaqs((prev) => prev.map((f) => (f.id === id ? { ...f, is_active: isActive } : f)));
  };

  const openNew = () => {
    setEditing({ id: "", question: "", answer: "", is_active: true, sort_order: faqs.length });
    setIsDialogOpen(true);
  };

  if (isLoading) return <div className="flex justify-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold">Perguntas Frequentes</h2>
        <Button onClick={openNew}><Plus className="w-4 h-4 mr-2" />Nova FAQ</Button>
      </div>

      <div className="bg-card rounded-xl border divide-y">
        {faqs.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">Nenhuma FAQ cadastrada.</div>
        ) : faqs.map((faq) => (
          <div key={faq.id} className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium">{faq.question}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{faq.answer}</p>
              </div>
              <div className="flex items-center gap-2 ml-4">
                <Switch checked={faq.is_active} onCheckedChange={(checked) => handleToggleActive(faq.id, checked)} />
                <Button variant="ghost" size="sm" onClick={() => { setEditing(faq); setIsDialogOpen(true); }}><Edit className="w-4 h-4" /></Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild><Button variant="ghost" size="sm"><Trash2 className="w-4 h-4 text-destructive" /></Button></AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader><AlertDialogTitle>Excluir FAQ?</AlertDialogTitle><AlertDialogDescription>Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
                    <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={() => handleDelete(faq.id)} className="bg-destructive">Excluir</AlertDialogAction></AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing?.id ? "Editar FAQ" : "Nova FAQ"}</DialogTitle></DialogHeader>
          {editing && (
            <div className="space-y-4">
              <div><Label>Pergunta</Label><Input value={editing.question} onChange={(e) => setEditing({ ...editing, question: e.target.value })} /></div>
              <div><Label>Resposta</Label><Textarea value={editing.answer} onChange={(e) => setEditing({ ...editing, answer: e.target.value })} rows={4} /></div>
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

export default AdminFAQs;
