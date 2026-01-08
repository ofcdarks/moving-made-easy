import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Clock, CheckCircle, Eye, Trash2, RefreshCw, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface QuoteRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  service_type: string;
  origin_address: string;
  destination_address: string;
  preferred_date: string | null;
  message: string | null;
  status: string;
  created_at: string;
}

const serviceLabels: Record<string, string> = {
  "mudanca-residencial": "Mudança Residencial",
  "mudanca-comercial": "Mudança Comercial",
  "frete-carga": "Frete e Carga",
  "embalagem": "Embalagem e Proteção",
  "montagem": "Montagem e Desmontagem",
  "eventos": "Eventos e Feiras",
};

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pending: { label: "Pendente", variant: "secondary" },
  contacted: { label: "Contatado", variant: "default" },
  completed: { label: "Concluído", variant: "outline" },
  cancelled: { label: "Cancelado", variant: "destructive" },
};

const AdminQuotes = () => {
  const [quotes, setQuotes] = useState<QuoteRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedQuote, setSelectedQuote] = useState<QuoteRequest | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("quote_requests")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ variant: "destructive", title: "Erro", description: "Não foi possível carregar os orçamentos." });
    } else {
      setQuotes(data || []);
    }
    setIsLoading(false);
  };

  const handleStatusChange = async (quoteId: string, newStatus: string) => {
    const { error } = await supabase.from("quote_requests").update({ status: newStatus }).eq("id", quoteId);
    if (!error) {
      setQuotes((prev) => prev.map((q) => (q.id === quoteId ? { ...q, status: newStatus } : q)));
      toast({ title: "Status atualizado!" });
    }
  };

  const handleDelete = async (quoteId: string) => {
    const { error } = await supabase.from("quote_requests").delete().eq("id", quoteId);
    if (!error) {
      setQuotes((prev) => prev.filter((q) => q.id !== quoteId));
      toast({ title: "Orçamento excluído!" });
    }
  };

  const stats = {
    total: quotes.length,
    pending: quotes.filter((q) => q.status === "pending").length,
    contacted: quotes.filter((q) => q.status === "contacted").length,
    completed: quotes.filter((q) => q.status === "completed").length,
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold">Orçamentos</h2>
        <Button variant="outline" size="sm" onClick={fetchQuotes} disabled={isLoading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
          Atualizar
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card rounded-xl p-4 border"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center"><FileText className="w-5 h-5 text-primary" /></div><div><p className="text-2xl font-bold">{stats.total}</p><p className="text-sm text-muted-foreground">Total</p></div></div></div>
        <div className="bg-card rounded-xl p-4 border"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center"><Clock className="w-5 h-5 text-yellow-600" /></div><div><p className="text-2xl font-bold">{stats.pending}</p><p className="text-sm text-muted-foreground">Pendentes</p></div></div></div>
        <div className="bg-card rounded-xl p-4 border"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center"><Eye className="w-5 h-5 text-blue-600" /></div><div><p className="text-2xl font-bold">{stats.contacted}</p><p className="text-sm text-muted-foreground">Contatados</p></div></div></div>
        <div className="bg-card rounded-xl p-4 border"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center"><CheckCircle className="w-5 h-5 text-green-600" /></div><div><p className="text-2xl font-bold">{stats.completed}</p><p className="text-sm text-muted-foreground">Concluídos</p></div></div></div>
      </div>

      <div className="bg-card rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>Serviço</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {quotes.length === 0 ? (
              <TableRow><TableCell colSpan={6} className="text-center py-8 text-muted-foreground">Nenhum orçamento encontrado.</TableCell></TableRow>
            ) : quotes.map((quote) => (
              <TableRow key={quote.id}>
                <TableCell className="whitespace-nowrap">{format(new Date(quote.created_at), "dd/MM/yyyy", { locale: ptBR })}</TableCell>
                <TableCell className="font-medium">{quote.name}</TableCell>
                <TableCell>{serviceLabels[quote.service_type] || quote.service_type}</TableCell>
                <TableCell>{quote.phone}</TableCell>
                <TableCell>
                  <Select value={quote.status} onValueChange={(value) => handleStatusChange(quote.id, value)}>
                    <SelectTrigger className="w-32 h-8"><Badge variant={statusConfig[quote.status]?.variant}>{statusConfig[quote.status]?.label}</Badge></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pendente</SelectItem>
                      <SelectItem value="contacted">Contatado</SelectItem>
                      <SelectItem value="completed">Concluído</SelectItem>
                      <SelectItem value="cancelled">Cancelado</SelectItem>
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedQuote(quote)}><Eye className="w-4 h-4" /></Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild><Button variant="ghost" size="sm"><Trash2 className="w-4 h-4 text-destructive" /></Button></AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader><AlertDialogTitle>Excluir orçamento?</AlertDialogTitle><AlertDialogDescription>Esta ação não pode ser desfeita.</AlertDialogDescription></AlertDialogHeader>
                        <AlertDialogFooter><AlertDialogCancel>Cancelar</AlertDialogCancel><AlertDialogAction onClick={() => handleDelete(quote.id)} className="bg-destructive">Excluir</AlertDialogAction></AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedQuote} onOpenChange={() => setSelectedQuote(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Detalhes do Orçamento</DialogTitle></DialogHeader>
          {selectedQuote && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-sm text-muted-foreground">Nome</p><p className="font-medium">{selectedQuote.name}</p></div>
                <div><p className="text-sm text-muted-foreground">E-mail</p><p className="font-medium">{selectedQuote.email}</p></div>
                <div><p className="text-sm text-muted-foreground">Telefone</p><p className="font-medium">{selectedQuote.phone}</p></div>
                <div><p className="text-sm text-muted-foreground">Serviço</p><p className="font-medium">{serviceLabels[selectedQuote.service_type] || selectedQuote.service_type}</p></div>
              </div>
              <div><p className="text-sm text-muted-foreground">Origem</p><p className="font-medium">{selectedQuote.origin_address}</p></div>
              <div><p className="text-sm text-muted-foreground">Destino</p><p className="font-medium">{selectedQuote.destination_address}</p></div>
              {selectedQuote.preferred_date && <div><p className="text-sm text-muted-foreground">Data Preferencial</p><p className="font-medium">{format(new Date(selectedQuote.preferred_date), "dd/MM/yyyy", { locale: ptBR })}</p></div>}
              {selectedQuote.message && <div><p className="text-sm text-muted-foreground">Mensagem</p><p className="font-medium">{selectedQuote.message}</p></div>}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminQuotes;
