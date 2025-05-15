import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ListaAnuncios from "./pages/ListaAnuncios";
import CriarAnuncio from "./pages/CriarAnuncio";
import VisualizarAnuncio from "./pages/VisualizarAnuncio";
import ListaContatos from "./pages/ListaContatos";
import AdicionarContato from "./pages/AdicionarContato";
import ExportarContatos from "./pages/ExportarContatos";
import ImportarContatos from "./pages/ImportarContatos";
import EditarAnuncio from "./pages/EditarAnuncio";
import EditarContato from "./pages/EditarContato";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <PWAInstallPrompt />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/anuncios" element={<ListaAnuncios />} />
          <Route path="/criar-anuncio" element={<CriarAnuncio />} />
          <Route path="/anuncio/:id" element={<VisualizarAnuncio />} />
          <Route path="/contatos" element={<ListaContatos />} />
          <Route path="/adicionar-contato" element={<AdicionarContato />} />
          <Route path="/exportar-contatos" element={<ExportarContatos />} />
          <Route path="/importar-contatos" element={<ImportarContatos />} />
          <Route path="/editar-anuncio/:id" element={<EditarAnuncio />} />
          <Route path="/editar-contato/:id" element={<EditarContato />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
