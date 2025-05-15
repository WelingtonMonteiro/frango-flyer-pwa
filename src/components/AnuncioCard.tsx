
import { Edit, Trash2 } from "lucide-react";

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

export default function AnuncioCard({
  anuncio,
  onClick,
  onEdit,
  onDelete,
}: {
  anuncio: Anuncio;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  return (
    <div
      className="bg-white rounded-lg shadow p-4 mb-4 hover:ring-2 hover:ring-primary cursor-pointer transition group relative"
      onClick={onClick}
    >
      <div className="absolute top-2 right-2 flex gap-2 opacity-80 group-hover:opacity-100">
        {onEdit && (
          <button
            title="Editar"
            onClick={e => { e.stopPropagation(); onEdit(); }}
            className="p-1 rounded hover:bg-primary/10"
          >
            <Edit size={18} />
          </button>
        )}
        {onDelete && (
          <button
            title="Remover"
            onClick={e => { e.stopPropagation(); onDelete(); }}
            className="p-1 rounded hover:bg-red-50 text-red-500"
          >
            <Trash2 size={18} />
          </button>
        )}
      </div>
      <div className="flex items-center">
        {anuncio.imagem &&
          <img src={anuncio.imagem} className="w-20 h-20 object-cover rounded-lg mr-4" alt={anuncio.produto} />
        }
        <div>
          <h2 className="text-lg font-semibold">{anuncio.produto}</h2>
          <span className="text-primary font-bold">{anuncio.preco}</span>
          <div className="text-xs mt-1 text-gray-400 mb-1">
            {anuncio.data} das {anuncio.hora_inicio} às {anuncio.hora_fim}
          </div>
        </div>
      </div>
    </div>
  );
}
