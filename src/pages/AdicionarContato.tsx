
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStorage } from "@/hooks/useStorage";
import { useToast } from "@/hooks/use-toast";

export default function AdicionarContato() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [contatos, setContatos] = useStorage<any[]>("contatos", []);
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setContatos([{ id: Math.random().toString(36).substring(2,10), nome, telefone }, ...contatos]);
    toast({ title: "Contato adicionado!" });
    navigate("/contatos");
  }

  return (
    <div className="max-w-lg mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Adicionar Contato</h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input className="border p-2 rounded" required placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
        <input className="border p-2 rounded" required placeholder="Telefone (só números)" value={telefone} onChange={e => setTelefone(e.target.value)} />
        <button type="submit" className="mt-2 bg-primary text-white py-2 rounded">Salvar</button>
      </form>
    </div>
  );
}
