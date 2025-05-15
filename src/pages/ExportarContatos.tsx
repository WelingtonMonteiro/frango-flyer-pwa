
import { useStorage } from "@/hooks/useStorage";
import ContatoCard from "@/components/ContatoCard";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function exportarJSON(contatos: any[]) {
  const blob = new Blob([JSON.stringify(contatos)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "contatos.json";
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 500);
}

export default function ExportarContatos() {
  const [contatos] = useStorage<any[]>("contatos", []);
  const navigate = useNavigate();

  return (
    <div className="max-w-lg mx-auto p-6">
      <button
        className="mb-4 flex items-center text-blue-600"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={18} className="mr-1" /> Voltar
      </button>
      <h1 className="text-2xl font-bold mb-3">Exportar Contatos</h1>
      <div>
        {contatos.map((c: any) => <ContatoCard key={c.id} contato={c} />)}
      </div>
      <button className="mt-4 bg-primary text-white px-4 py-2 rounded"
        onClick={() => exportarJSON(contatos)}
      >📤 Exportar JSON</button>
    </div>
  );
}
