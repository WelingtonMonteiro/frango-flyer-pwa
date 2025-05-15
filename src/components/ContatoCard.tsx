
import { Edit, Trash2 } from "lucide-react";
type Contato = { id: string, nome: string, telefone: string };

export default function ContatoCard({
  contato,
  onEdit,
  onDelete
}: {
  contato: Contato;
  onEdit?: () => void;
  onDelete?: () => void;
}) {
  return (
    <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow mb-2">
      <div>
        <p className="font-semibold">{contato.nome}</p>
        <p className="text-gray-500">{contato.telefone}</p>
      </div>
      <div className="flex gap-2">
        {onEdit && (
          <button
            title="Editar"
            className="p-1 rounded hover:bg-primary/10"
            onClick={onEdit}
          >
            <Edit size={18} />
          </button>
        )}
        {onDelete && (
          <button
            title="Remover"
            className="bg-red-500 text-white rounded px-2 py-1 flex items-center hover:bg-red-600"
            onClick={onDelete}
          >
            <Trash2 size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
