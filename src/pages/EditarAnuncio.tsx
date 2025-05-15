
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useStorage } from "@/hooks/useStorage";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

export default function EditarAnuncio() {
  const { id } = useParams();
  const [anuncios, setAnuncios] = useStorage<any[]>("anuncios", []);
  const anuncio = anuncios.find(a => a.id === id);
  const [produto, setProduto] = useState(anuncio?.produto || "");
  const [preco, setPreco] = useState(anuncio?.preco || "");
  const [data, setData] = useState(anuncio?.data || "");
  const [hora_inicio, setHoraInicio] = useState(anuncio?.hora_inicio || "");
  const [hora_fim, setHoraFim] = useState(anuncio?.hora_fim || "");
  const [mensagem, setMensagem] = useState(anuncio?.mensagem || "");
  const [imagem, setImagem] = useState<string | undefined>(anuncio?.imagem);
  const navigate = useNavigate();
  const { toast } = useToast();

  if (!anuncio) return <p>Anúncio não encontrado.</p>;

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImagem(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAnuncios(anuncios.map((a: any) =>
      a.id === id
        ? { ...a, produto, preco, data, hora_inicio, hora_fim, imagem, mensagem }
        : a
    ));
    toast({ title: "Anúncio atualizado!" });
    navigate("/anuncios");
  }

  return (
    <div className="max-w-lg mx-auto py-7 px-4">
      <button
        className="mb-4 flex items-center text-blue-600"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={18} className="mr-1" /> Voltar
      </button>
      <h1 className="text-2xl font-bold mb-4">Editar Anúncio</h1>
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
        <button type="submit" className="mt-4 bg-primary text-white py-2 rounded">Salvar Alterações</button>
      </form>
    </div>
  );
}
