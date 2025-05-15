
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

export default function AnuncioCard({ anuncio, onClick } : { anuncio: Anuncio, onClick?: () => void }) {
  return (
    <div
      className="bg-white rounded-lg shadow p-4 mb-4 hover:ring-2 hover:ring-primary cursor-pointer transition"
      onClick={onClick}
    >
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
