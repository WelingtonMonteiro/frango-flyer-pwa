
import { useStorage } from "@/hooks/useStorage";
import ContatoCard from "@/components/ContatoCard";
import { useNavigate } from "react-router-dom";

type Contato = { id: string, nome: string, telefone: string };

export default function ListaContatos() {
  const [contatos, setContatos] = useStorage<Contato[]>("contatos", []);
  const navigate = useNavigate();

  function handleDelete(id: string) {
    setContatos(contatos.filter(c => c.id !== id));
  }

  return (
    <div className="max-w-lg mx-auto py-6 px-3">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Contatos</h1>
        <button className="bg-primary text-white px-4 py-2 rounded" onClick={() => navigate("/adicionar-contato")}>+ Adicionar</button>
      </div>
      {contatos.length === 0 ?
        <p className="text-gray-400">Nenhum contato cadastrado.</p> :
        contatos.map((contato) => (
          <ContatoCard key={contato.id} contato={contato} onDelete={() => handleDelete(contato.id)} />
        ))
      }
      <div className="mt-6 flex gap-2">
        <button onClick={() => navigate("/exportar-contatos")} className="bg-blue-500 text-white rounded px-4 py-2">Exportar contatos</button>
        <button onClick={() => navigate("/importar-contatos")} className="bg-green-500 text-white rounded px-4 py-2">Importar contatos</button>
      </div>
    </div>
  );
}
