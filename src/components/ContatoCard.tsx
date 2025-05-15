
type Contato = { id: string, nome: string, telefone: string };

export default function ContatoCard({ contato, onDelete }: { contato: Contato, onDelete?: () => void }) {
  return (
    <div className="flex items-center justify-between bg-white rounded-lg p-4 shadow mb-2">
      <div>
        <p className="font-semibold">{contato.nome}</p>
        <p className="text-gray-500">{contato.telefone}</p>
      </div>
      {onDelete && (
        <button
          className="bg-red-500 text-white rounded px-3 py-1"
          onClick={onDelete}
        >Remover</button>
      )}
    </div>
  );
}
