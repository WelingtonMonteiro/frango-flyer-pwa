
import { useParams, useNavigate } from "react-router-dom";
import { useStorage } from "@/hooks/useStorage";
import { ArrowLeft, Share2 } from "lucide-react";

export default function VisualizarAnuncio() {
  const { id } = useParams();
  const [anuncios] = useStorage<any[]>("anuncios", []);
  const navigate = useNavigate();
  const anuncio = anuncios.find((a) => a.id === id);

  if (!anuncio) return <p>Anúncio não encontrado.</p>;

  const txt =
    `Hoje tem: ${anuncio.produto} por ${anuncio.preco}\nDas ${anuncio.hora_inicio} às ${anuncio.hora_fim}\n${anuncio.mensagem}`;
  const waUrl = "https://wa.me/?text=" + encodeURIComponent(txt);

  return (
    <div className="max-w-lg mx-auto py-7 px-4">
      <button className="mb-4 flex items-center text-blue-600" onClick={() => navigate("/anuncios")}><ArrowLeft size={18} className="mr-1" /> Voltar</button>
      <div className="bg-white rounded shadow p-4">
        {anuncio.imagem &&
          <img src={anuncio.imagem} className="w-full max-h-80 rounded-lg object-cover mb-2" alt={anuncio.produto} />
        }
        <h2 className="text-2xl font-bold">{anuncio.produto}</h2>
        <span className="text-primary font-bold text-lg">{anuncio.preco}</span>
        <p className="text-gray-600 my-2">{anuncio.mensagem}</p>
        <span className="inline-block bg-primary text-white rounded-full px-4 py-1 text-sm mb-2">
          {anuncio.data} das {anuncio.hora_inicio} às {anuncio.hora_fim}
        </span>
        <a
          href={waUrl}
          target="_blank"
          className="block bg-green-500 hover:bg-green-600 text-white font-bold py-3 mt-4 rounded flex justify-center items-center gap-2"
        ><Share2 size={20} /> Compartilhar via WhatsApp</a>
      </div>
    </div>
  );
}
