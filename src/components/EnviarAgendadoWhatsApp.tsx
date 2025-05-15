
import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";

type Contato = {
  id: string;
  nome: string;
  telefone: string;
};

type AnuncioAgendado = {
  id: string;
  produto: string;
  preco: string;
  mensagem: string;
  contatos_agendados: Contato[];
  contatos_enviados: string[]; // Armazena ids dos contatos enviados
  hora_envio: string; // apenas ilustrativo
};

function buildWaUrl(contato: Contato, anuncio: AnuncioAgendado) {
  const mensagem = `Hoje tem: ${anuncio.produto} por ${anuncio.preco}\n${anuncio.mensagem}`;
  return `https://wa.me/${contato.telefone.replace(/\D/g, "")}?text=${encodeURIComponent(mensagem)}`;
}

export default function EnviarAgendadoWhatsApp({
  anuncio,
  onEnviar,
}: {
  anuncio: AnuncioAgendado;
  onEnviar?: (contatoId: string) => void;
}) {
  const [enviando, setEnviando] = useState<string | null>(null);

  function handleEnviar(contato: Contato) {
    setEnviando(contato.id);
    // marca como enviado (callback do pai deve atualizar no storage)
    onEnviar && onEnviar(contato.id);
    // opcional: abrir whatsapp
    window.open(buildWaUrl(contato, anuncio), "_blank");
    toast({ title: `Anúncio pronto para ${contato.nome}`, description: "Finalize o envio no WhatsApp." });
    setTimeout(() => setEnviando(null), 500); // libera estado do botão, se necessário
  }

  // filtra quem ainda não recebeu
  const contatosNaoEnviados = anuncio.contatos_agendados.filter(
    (c) => !anuncio.contatos_enviados.includes(c.id)
  );

  if (contatosNaoEnviados.length === 0) {
    return <div className="text-green-600">Todos os envios foram realizados para este anúncio.</div>;
  }

  return (
    <div>
      <h3 className="font-semibold mb-2">Envie este anúncio para:</h3>
      <div className="flex flex-col gap-2">
        {contatosNaoEnviados.map((contato) => (
          <Button
            key={contato.id}
            onClick={() => handleEnviar(contato)}
            disabled={!!enviando}
          >
            Enviar para {contato.nome} ({contato.telefone})
          </Button>
        ))}
      </div>
    </div>
  );
}
