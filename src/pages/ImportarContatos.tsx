
import { useRef } from "react";
import { useStorage } from "@/hooks/useStorage";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function ImportarContatos() {
  const fileInput = useRef<HTMLInputElement>(null);
  const [contatos, setContatos] = useStorage<any[]>("contatos", []);
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleImport(e: React.FormEvent) {
    e.preventDefault();
    const file = fileInput.current?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const data = JSON.parse(ev.target?.result as string);
        if (Array.isArray(data)) {
          setContatos([...data, ...contatos]);
          toast({ title: "Contatos importados!" });
          navigate("/contatos");
        } else {
          toast({ title: "Arquivo inválido", description: "O arquivo deve ser um array JSON", variant: "destructive" });
        }
      } catch {
        toast({ title: "Erro ao importar arquivo", variant: "destructive" });
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="max-w-lg mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">Importar Contatos</h1>
      <form className="flex flex-col gap-3" onSubmit={handleImport}>
        <input type="file" accept="application/json" required ref={fileInput} />
        <button type="submit" className="mt-2 bg-primary text-white py-2 rounded">📥 Importar contatos</button>
      </form>
    </div>
  );
}
