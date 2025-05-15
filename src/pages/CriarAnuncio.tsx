
import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useStorage } from "@/hooks/useStorage";
import { useToast } from "@/hooks/use-toast";

export default function CriarAnuncio() {
  const [anuncios, setAnuncios] = useStorage<any[]>("anuncios", []);
  const [produto, setProduto] = useState("");
  const [preco, setPreco] = useState("");
  const [data, setData] = useState("");
  const [hora_inicio, setHoraInicio] = useState("");
  const [hora_fim, setHoraFim] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [imagem, setImagem] = useState<string | undefined>();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleImage(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagem(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const id = Math.random().toString(36).slice(2,10);
    setAnuncios([
      { id, produto, preco, data, hora_inicio, hora_fim, imagem, mensagem },
      ...anuncios
    ]);
    toast({ title: "Anúncio criado com sucesso!" });
    navigate("/anuncios");
  }

  return (
    <div className="max-w-lg mx-auto py-7 px-4">
      <h1 className="text-2xl font-bold mb-4">Novo Anúncio</h1>
      <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
        <input className="border p-2 rounded" required placeholder="Produto" value={produto} onChange={e => setProduto(e.target.value)} />
        <input className="border p-2 rounded" required placeholder="Preço (ex: R$ 25,00)" value={preco} onChange={e => setPreco(e.target.value)} />
        <input className="border p-2 rounded" required type="date" value={data} onChange={e => setData(e.target.value)} />
        <div className="flex gap-2">
          <input className="border p-2 rounded w-full" required type="time" value={hora_inicio} onChange={e => setHoraInicio(e.target.value)} placeholder="Hora início" />
          <input className="border p-2 rounded w-full" required type="time" value={hora_fim} onChange={e => setHoraFim(e.target.value)} placeholder="Hora fim" />
        </div>
        <textarea className="border p-2 rounded" required placeholder="Mensagem" value={mensagem} onChange={e => setMensagem(e.target.value)} />
        <label className="block text-left mt-2">Imagem:</label>
        <input type="file" accept="image/*" onChange={handleImage} />
        {imagem && <img src={imagem} alt="Preview" className="my-2 rounded" style={{maxHeight:150}} />}
        <button type="submit" className="mt-4 bg-primary text-white py-2 rounded">Salvar Anúncio</button>
      </form>
    </div>
  );
}
