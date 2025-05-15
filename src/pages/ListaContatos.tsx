
import { useStorage } from "@/hooks/useStorage";
import ContatoCard from "@/components/ContatoCard";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function ListaContatos() {
  const [contatos] = useStorage<any[]>("contatos", []);
  const navigate = useNavigate();

  return (
    <div className="max-w-lg mx-auto py-7 px-4">
      <button
        className="mb-4 flex items-center text-blue-600"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={18} className="mr-1" /> Voltar
      </button>
      <h1 className="text-2xl font-bold mb-4">Seus Contatos</h1>
      <button
        className="mb-4 bg-primary text-white rounded px-4 py-2"
        onClick={() => navigate("/adicionar-contato")}
      >+ Novo Contato</button>
      {contatos.length === 0 ? (
        <p className="text-gray-400">Nenhum contato cadastrado.</p>
      ) : (
        contatos.map((c: any) => (
          <ContatoCard key={c.id} contato={c} />
        ))
      )}
    </div>
  );
}
