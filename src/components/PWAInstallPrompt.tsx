
import React, { useEffect, useState } from "react";
import { Smartphone, Download } from "lucide-react";

const isMobile = () =>
  typeof window !== "undefined" &&
  /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

const PWAInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };
    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  if (!showPrompt || !isMobile()) return null;

  const onClick = async () => {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    setShowPrompt(false);
  };

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-white rounded-xl px-4 py-3 shadow-lg flex items-center gap-2 border z-[10000] animate-in fade-in">
      <Smartphone className="text-primary" size={24} />
      <span className="font-medium">Instale o app na tela inicial</span>
      <button
        className="ml-3 flex items-center gap-1 bg-primary text-white px-3 py-1.5 rounded-md hover:bg-primary/90 transition"
        onClick={onClick}
      >
        <Download size={18} />
        Instalar
      </button>
    </div>
  );
};

export default PWAInstallPrompt;
