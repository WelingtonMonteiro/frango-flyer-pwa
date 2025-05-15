
import { useState } from "react";
import { useStorage } from "@/hooks/useStorage";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function ImportarContatos() {
  const [contatos, setContatos] = useStorage<any[]>("contatos", []);
  const [arquivo, setArquivo] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleImport = async () => {
    if (!arquivo) return;
    const text = await arquivo.text();
    try {
      const data = JSON.parse(text);
      if (Array.isArray(data)) {
        setContatos([...contatos, ...data]);
        alert("Contatos importados com sucesso!");
      } else {
        alert("Arquivo inválido.");
      }
    } catch {
      alert("Erro ao importar o arquivo.");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <button
        className="mb-4 flex items-center text-blue-600"
        onClick={() => navigate("/")}
      >
        <ArrowLeft size={18} className="mr-1" /> Voltar
      </button>
      <h1 className="text-2xl font-bold mb-3">Importar Contatos</h1>
      <input
        type="file"
        accept="application/json"
        onChange={e => setArquivo(e.target.files?.[0] ?? null)}
        className="mb-4"
      />
      <button
        className="bg-primary text-white px-4 py-2 rounded"
        onClick={handleImport}
        disabled={!arquivo}
      >📥 Importar contatos</button>
    </div>
  );
}
