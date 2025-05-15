
import { useStorage } from "@/hooks/useStorage";
import ContatoCard from "@/components/ContatoCard";

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

  return (
    <div className="max-w-lg mx-auto p-6">
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
