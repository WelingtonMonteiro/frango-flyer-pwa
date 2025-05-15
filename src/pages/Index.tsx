
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary to-purple-300">
      <div className="bg-white/90 p-8 rounded-xl shadow-lg flex flex-col gap-7 max-w-md w-full text-center">
        <img src="https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=400&q=80" alt="Frango Assado" className="w-32 mx-auto rounded-2xl mb-2 shadow" />
        <h1 className="text-3xl font-bold mb-1">VendeJá</h1>
        <p className="mb-4 text-[#7E69AB] font-medium">Anuncie produtos perecíveis e promoções para sua base de clientes de forma fácil e rápida!</p>
        <button className="bg-primary text-white rounded px-6 py-3 mb-1 text-lg font-semibold" onClick={() => navigate("/anuncios")}>
          📣 Meus Anúncios
        </button>
        <button className="bg-green-600 text-white rounded px-6 py-3 mb-1 text-lg font-semibold" onClick={() => navigate("/contatos")}>
          👥 Meus Contatos
        </button>
      </div>
    </div>
  );
};

export default Index;
