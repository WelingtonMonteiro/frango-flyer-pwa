
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStorage } from "@/hooks/useStorage";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

export default function EditarContato() {
  const { id } = useParams();
  const [contatos, setContatos] = useStorage<any[]>("contatos", []);
  const contato = contatos.find(c => c.id === id);
  const [nome, setNome] = useState(contato?.nome || "");
  const [telefone, setTelefone] = useState(contato?.telefone || "");
  const navigate = useNavigate();
  const { toast } = useToast();

  if (!contato) return <p>Contato não encontrado.</p>;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setContatos(contatos.map((c: any) =>
      c.id === id
        ? { ...c, nome, telefone }
        : c
    ));
    toast({ title: "Contato atualizado!" });
    navigate("/contatos");
  }

  return (
    <div className="max-w-lg mx-auto py-8 px-4">
      <button
        className="mb-4 flex items-center text-blue-600"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={18} className="mr-1" /> Voltar
      </button>
      <h1 className="text-2xl font-bold mb-4">Editar Contato</h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input className="border p-2 rounded" required placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
        <input className="border p-2 rounded" required placeholder="Telefone (só números)" value={telefone} onChange={e => setTelefone(e.target.value)} />
        <button type="submit" className="mt-2 bg-primary text-white py-2 rounded">Salvar Alterações</button>
      </form>
    </div>
  );
}
