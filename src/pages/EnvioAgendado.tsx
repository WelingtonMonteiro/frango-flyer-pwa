
import React, { useState } from "react";
import { useStorage } from "@/hooks/useStorage";
import EnviarAgendadoWhatsApp from "@/components/EnviarAgendadoWhatsApp";
import { useParams } from "react-router-dom";

// Simula uma lista de contatos cadastrados
const DUMMY_CONTATOS = [
  { id: "1", nome: "João", telefone: "5561988887777" },
  { id: "2", nome: "Maria", telefone: "5561977778888" },
];

export default function EnvioAgendado() {
  const { id } = useParams();
  const [anuncios, setAnuncios] = useStorage<any[]>("anuncios", []);
  // busca anúncio. Supõe estrutura nova, para demo.
  const anuncio = anuncios.find((a) => a.id === id);

  // Adapta para demo: se anúncio não tem o campo novo ainda, adiciona
  if (anuncio && (!anuncio.contatos_agendados || !anuncio.contatos_enviados)) {
    anuncio.contatos_agendados = DUMMY_CONTATOS;
    anuncio.contatos_enviados = [];
    setAnuncios(
      anuncios.map((a) => (a.id === id ? anuncio : a))
    );
  }

  if (!anuncio) return <p>Anúncio não encontrado.</p>;

  function marcarComoEnviado(contatoId: string) {
    const atualizado = {
      ...anuncio,
      contatos_enviados: [...(anuncio.contatos_enviados || []), contatoId],
    };
    setAnuncios(anuncios.map((a) => (a.id === id ? atualizado : a)));
  }

  return (
    <div className="max-w-lg mx-auto py-7 px-4">
      <h1 className="text-2xl font-bold mb-4">Agendamento de Envio</h1>
      <EnviarAgendadoWhatsApp
        anuncio={anuncio}
        onEnviar={marcarComoEnviado}
      />
    </div>
  );
}
