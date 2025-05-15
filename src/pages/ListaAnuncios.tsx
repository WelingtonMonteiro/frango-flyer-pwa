
import { useNavigate } from "react-router-dom";
import { useStorage } from "@/hooks/useStorage";
import AnuncioCard from "@/components/AnuncioCard";
import { ArrowLeft } from "lucide-react";

type Anuncio = {
  id: string,
  produto: string,
  preco: string,
  data: string,
  hora_inicio: string,
  hora_fim: string,
  imagem?: string,
  mensagem: string,
};

export default function ListaAnuncios() {
  const navigate = useNavigate();
  const [anuncios] = useStorage<Anuncio[]>("anuncios", []);

  return (
    <div className="max-w-lg mx-auto py-6 px-2">
      <button
        className="mb-4 flex items-center text-blue-600"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft size={18} className="mr-1" /> Voltar
      </button>
      <h1 className="text-2xl font-bold mb-4">Seus Anúncios</h1>
      <button
        className="mb-4 bg-primary text-white rounded px-4 py-2"
        onClick={() => navigate("/criar-anuncio")}
      >+ Novo Anúncio</button>
      {anuncios.length === 0 ? (
        <p className="text-gray-400">Nenhum anúncio cadastrado.</p>
      ) : (
        anuncios.map(a => (
          <AnuncioCard
            key={a.id}
            anuncio={a}
            onClick={() => navigate(`/anuncio/${a.id}`)}
          />
        ))
      )}
    </div>
  );
}
