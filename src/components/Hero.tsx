import React, { useEffect, useState, useRef } from 'react';
import { useStoredImage, MEDIA_KEYS, defaultPapaImg } from '../lib/mediaStore';
import { compressImageDataURL } from '../lib/imageCompressor';
import { useCMS } from '../context/CMSContext';

// Convierte enlaces de compartir de Google Drive en direcciones web directas visibles en navegador
function cleanDriveUrl(url: string): string {
  if (!url) return '';
  const matchD = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (matchD && matchD[1]) {
    return `https://lh3.googleusercontent.com/d/${matchD[1]}`;
  }
  const matchId = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (matchId && matchId[1]) {
    return `https://lh3.googleusercontent.com/d/${matchId[1]}`;
  }
  return url;
}

export default function Hero() {
  const [progressWidth, setProgressWidth] = useState('0%');
  const [papaSrc, setPapaSrc] = useStoredImage(MEDIA_KEYS.PAPA, defaultPapaImg);
  const { isAdmin } = useCMS();
  const [isHovered, setIsHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Leer datos dinámicos inyectados por WordPress en funciones del tema
  const wpPageData = typeof window !== 'undefined' && (window as any).wordpressPageData;
  const heroTitleAccent = wpPageData?.hero_title_accent || "Lambayeque";
  const heroTitle = wpPageData?.hero_title || "le escribe al\nPapa León XIV.";
  const heroDescription = wpPageData?.hero_description || "Un proyecto documental donde 500 ciudadanos escriben al Papa León XIV — Robert Francis Prevost — desde los lugares donde vivió, rezó y caminó en el norte peruano.";
  const wpPageHeroImage = wpPageData?.hero_image;

  // Si no se ha editado localmente (sigue siendo default) y existe imagen en WordPress, priorizar la de WordPress
  let currentSrc = papaSrc;
  if (papaSrc === defaultPapaImg && wpPageHeroImage) {
    currentSrc = wpPageHeroImage;
  }
  const resolvedPapaSrc = cleanDriveUrl(currentSrc);

  useEffect(() => {
    // Elegant transition of the progress bar when mounting
    const timer = setTimeout(() => {
      setProgressWidth('4.2%'); // 21/500 is exactly 4.2%
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        if (typeof reader.result === 'string') {
          try {
            const compressed = await compressImageDataURL(reader.result, 800, 800, 0.7);
            setPapaSrc(compressed);
          } catch (err) {
            console.error("Compression failed", err);
            setPapaSrc(reader.result);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleUrlPrompt = () => {
    const url = window.prompt("Ingrese la URL o enlace de Google Drive para la foto de portada principal:", currentSrc);
    if (url !== null && url.trim() !== '') {
      // Limpiar al instante si pegó enlace de Drive para previsualizarlo exitosamente
      const cleaned = cleanDriveUrl(url.trim());
      setPapaSrc(cleaned);
    }
  };

  const handleReset = () => {
    if (window.confirm("¿Restaurar la foto de portada al valor de fábrica?")) {
      setPapaSrc(defaultPapaImg);
    }
  };

  return (
    <section className="hero-section grid grid-cols-1 lg:grid-cols-[1fr_480px] border-b-2 border-ink min-h-[88vh]" id="inicio">
      {/* Left Column: News layout, off-white background */}
      <div className="p-6 md:p-10 lg:p-12 border-r-0 lg:border-r border-arena2 flex flex-col justify-between bg-[#FAF9F6]">
        <div className="mb-8 md:mb-12">
          <p className="font-cond text-[13px] md:text-[14px] font-bold tracking-[0.2em] uppercase text-terracota mb-5 flex items-center gap-3">
            Chiclayo · Lambayeque · Perú <span className="flex-1 max-w-[40px] h-[1px] bg-terracota"></span>
          </p>
          
          <h1 className="font-display text-[48px] sm:text-[62px] md:text-[76px] lg:text-[84px] font-black leading-[1.0] text-ink tracking-tight mb-8 whitespace-pre-line">
            <span className="italic text-terracota font-medium">{heroTitleAccent}</span><br />
            {heroTitle}
          </h1>
          
          <p className="font-serif text-[21px] md:text-[23px] font-light text-ink/90 leading-[1.7] max-w-[620px] mb-10 border-l-3 border-terracota pl-5">
            {heroDescription}
          </p>
          
          <p className="font-cond text-[14px] md:text-[15px] font-bold tracking-widest uppercase text-ink border-t border-arena2 pt-5 mb-8">
            Dirección editorial: Elkin Cabarcas Mora &middot; Periodista &middot; Fotógrafo
          </p>
          
          <div className="flex gap-4 items-center flex-wrap">
            <a 
              href="#inscripcion" 
              className="bg-terracota hover:bg-ink text-white text-xs sm:text-sm font-cond font-bold uppercase tracking-widest py-4 px-8 transition-colors duration-200 rounded-none shadow-md cursor-pointer text-center min-w-[210px]"
            >
              Quiero participar →
            </a>
            <a 
              href="#proyecto" 
              className="bg-white hover:bg-ink hover:text-white text-ink text-xs sm:text-sm font-cond font-bold uppercase tracking-widest py-4 px-8 transition-colors duration-200 rounded-none border-2 border-ink text-center min-w-[210px]"
            >
              Conoce el proyecto
            </a>
          </div>
        </div>

        {/* Hero data grid (nested container) */}
        <div>
          <div className="grid grid-cols-2 gap-[1px] bg-arena2 border border-arena2 rounded-sm overflow-hidden">
            <div className="bg-[#FAF9F6] p-4">
              <p className="font-cond text-[10px] font-bold tracking-[0.14em] uppercase text-gris2 mb-1">
                Inicio de campo
              </p>
              <p className="font-display text-[17px] font-bold text-ink">
                19 jun 2026
              </p>
            </div>
            <div className="bg-[#FAF9F6] p-4">
              <p className="font-cond text-[10px] font-bold tracking-[0.14em] uppercase text-gris2 mb-1">
                Cierre de campo
              </p>
              <p className="font-display text-[17px] font-bold text-ink">
                19 sep 2026
              </p>
            </div>
            <div className="bg-[#FAF9F6] p-4">
              <p className="font-cond text-[10px] font-bold tracking-[0.14em] uppercase text-gris2 mb-1">
                Puntos turísticos
              </p>
              <p className="font-display text-[17px] font-bold text-ink">
                27 en 4 rutas
              </p>
            </div>
            <div className="bg-[#FAF9F6] p-4">
              <p className="font-cond text-[10px] font-bold tracking-[0.14em] uppercase text-gris2 mb-1">
                Entrega al Papa
              </p>
              <p className="font-display text-[17px] font-bold text-ink">
                Nov 2026
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Premium white cover-like Pope container */}
      <div 
        className="bg-[#FAF9F6] flex flex-col justify-between overflow-hidden relative md:min-h-[500px] group/hero"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Floating Pope image */}
        <div className="flex-1 relative overflow-hidden flex items-center justify-center min-h-[380px] md:min-h-[460px] bg-[#FAF9F6]">
          <img
            className="absolute inset-0 w-full h-full object-contain object-bottom bg-[#FAF9F6] select-none hover:scale-[1.04] transition-transform duration-700 ease-out"
            src={resolvedPapaSrc}
            alt="Papa León XIV — Robert Francis Prevost saludando"
            referrerPolicy="no-referrer"
          />

          {/* Hidden file input */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />

          {/* Elegant float controller overlay - Only visible if isAdmin is active */}
          {isAdmin && (
            <div className="absolute top-4 right-4 z-20 flex flex-col items-end gap-2 animate-fade-in md:opacity-0 md:group-hover/hero:opacity-100 transition-opacity duration-300">
              <div className="bg-white/95 backdrop-blur-md border border-ink p-3 shadow-xl rounded-xs max-w-[240px] text-left">
                <h4 className="font-display text-[11px] font-bold uppercase tracking-wider text-ink mb-2 pb-1 border-b border-arena2 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-terracota"></span>
                  Editar Portada
                </h4>
                
                <div className="space-y-1.5">
                  <button
                    onClick={triggerUpload}
                    className="w-full text-left font-cond text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-[#1a3b68] hover:bg-terracota text-white transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>📷</span> Subir foto local
                  </button>
                  <button
                    onClick={handleUrlPrompt}
                    className="w-full text-left font-cond text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-white hover:bg-cream-flat text-ink border border-ink/20 hover:border-ink transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>🔗</span> Pegar Enlace / Drive
                  </button>
                  <button
                    onClick={handleReset}
                    className="w-full text-left font-cond text-[9px] font-bold uppercase tracking-wider px-2 py-1 bg-transparent hover:text-terracota text-gris2 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>↺</span> Restaurar original
                  </button>
                </div>

                <p className="font-serif text-[8.5px] leading-relaxed text-gris mt-2 pt-1 border-t border-dashed border-arena2">
                  <strong>En WordPress:</strong> Cambia esta foto cargando una Imagen Destacada o pegando un enlace de Google Drive en la caja superior de tu Página de Inicio.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Dynamic progress bar bottom block */}
        <div className="bg-[#FAF9F6] p-6 md:p-8 flex justify-between items-end border-t border-arena2 z-10">
          <div>
            <div className="font-display text-[48px] md:text-[56px] font-black text-ink leading-none tracking-tight">
              21<span className="text-gris2 text-[24px] md:text-[28px] font-normal">/500</span>
            </div>
            <div className="w-[125px] md:w-[160px] bg-arena2 h-[3px] rounded-sm overflow-hidden mt-3 transition-opacity">
              <div 
                className="h-full bg-terracota transition-all duration-1000 ease-out" 
                style={{ width: progressWidth }}
              ></div>
            </div>
          </div>
          <div className="text-right">
            <span className="font-cond text-[10px] font-bold tracking-[0.14em] uppercase text-terracota block mb-1 font-semibold">
              Postales escritas
            </span>
            <span className="font-cond text-[9px] font-bold tracking-widest uppercase text-gris block">
              8 mayo 2026 · Piloto
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

