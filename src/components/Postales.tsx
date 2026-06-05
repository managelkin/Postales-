import React, { useState } from 'react';
import { POSTALES } from '../data/postalesData';
import { Postal } from '../types';
import { useCMS } from '../context/CMSContext';

// Utility helper to convert any shared Google Drive file URL into direct viewable image stream
export function cleanDriveUrl(url: string): string {
  if (!url) return '';
  // Check for Google Drive files (/file/d/ID/view)
  const matchD = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (matchD && matchD[1]) {
    return `https://lh3.googleusercontent.com/d/${matchD[1]}`;
  }
  // Check for general shared URL format with id query param (?id=ID)
  const matchId = url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (matchId && matchId[1]) {
    return `https://lh3.googleusercontent.com/d/${matchId[1]}`;
  }
  return url;
}

function getInitials(name: string) {
  if (!name) return 'P';
  return name.split(' ').slice(0, 2).map(w => w ? w[0] : '').join('').toUpperCase();
}

const COLORS = ['#B84A25', '#9A7535', '#5A3E2B', '#8B3A3A', '#4A6741', '#3A5C7A', '#7A4A6A', '#5A5A2A'];

interface PostalCardProps {
  key?: string;
  postal: Postal;
  colorBg: string;
  onEdit: (postal: Postal) => void;
}

function PostalCard({ postal, colorBg, onEdit }: PostalCardProps) {
  const [flipped, setFlipped] = useState(false);
  const { isAdmin } = useCMS();

  // If the image is a Google Drive URL, convert it dynamically
  const resolvedFoto = cleanDriveUrl(postal.foto);

  return (
    <div 
      className="card-wrapper perspective-900 w-full h-[320px] sm:h-[300px] md:h-[285px] cursor-pointer relative group"
      onClick={() => setFlipped(!flipped)}
      title="Haz clic para voltear la postal"
    >
      <div className={`card-inner transform-style-3d transition-transform duration-500 relative w-full h-full ${flipped ? 'rotate-y-180' : ''}`}>
        
        {/* Front Face: High-contrast vintage cardstock with physical portrait photo pasted */}
        <div className="card-face card-front backface-hidden absolute inset-0 bg-white border-2 border-ink flex flex-col justify-between p-3 rounded-xs select-none shadow-[0_4px_12px_rgba(0,0,0,0.04)]">
          {/* Decorative frame outline */}
          <div className="absolute inset-1 border border-ink/5 pointer-events-none rounded-2xs"></div>
          
          {/* Image Container with portrait cropped nicely */}
          <div className="relative w-full h-[65%] bg-[#F5F4EF] overflow-hidden border border-ink/10 rounded-2xs shadow-sm">
            <img 
              src={resolvedFoto} 
              alt={postal.nombre} 
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              referrerPolicy="no-referrer"
            />
            
            {/* Action buttons overlay at top */}
            <div className="absolute top-2 left-2 right-2 flex justify-between items-center z-20">
              {/* Stamp label on top of the image */}
              <div className="bg-ink text-crema font-mono text-[7px] sm:text-[8px] px-1.5 py-0.5 uppercase tracking-widest rounded-2xs border border-white/10 shadow-sm opacity-95">
                POSTAL N.° {postal.num}
              </div>

              {/* Edit button in front page - Only visible if CMS Admin is logged in */}
              {isAdmin && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(postal);
                  }}
                  className="bg-white hover:bg-terracota border border-ink text-ink hover:text-white p-1.5 rounded-full shadow-md hover:scale-110 transition-all cursor-pointer flex items-center justify-center pointer-events-auto"
                  title="Editar esta postal (Cambiar foto/texto)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                </button>
              )}
            </div>
            
            {/* Small circular monogram badge on top right of the image as a physical seal stamp */}
            <div 
              className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full flex items-center justify-center font-display text-[11px] font-bold text-white shadow-md border-2 border-white/95 rotate-12 transition-transform duration-300 hover:scale-110"
              style={{ backgroundColor: colorBg }}
            >
              {getInitials(postal.nombre)}
            </div>
          </div>

          {/* Exhibition details below the photo */}
          <div className="flex flex-col flex-grow justify-center px-1 pt-2 pb-1 text-center">
            <h3 className="font-display text-[13px] sm:text-[14px] font-bold text-ink leading-tight tracking-tight truncate">
              {postal.nombre || "Ciudadano Anónimo"}
            </h3>
          </div>
          
          <div className="mt-auto border-t border-ink/10 pt-1.5 pb-0.5">
            <p className="font-cond text-[8px] tracking-[0.15em] uppercase text-ink/40 font-bold text-center flex items-center justify-center gap-1">
              <span>VOLTEAR PARA LEER</span> 
              <span className="text-xs">⟳</span>
            </p>
          </div>
        </div>

        {/* Back Face: Real divided back postcard design */}
        <div className="card-face card-back rotate-y-180 backface-hidden absolute inset-0 bg-[#FAF9F5] p-3 sm:p-4 flex flex-row justify-between rounded-xs border-2 border-ink shadow-[0_4px_12px_rgba(0,0,0,0.04)] select-none">
          {/* Decorative frame outline */}
          <div className="absolute inset-1 border border-ink/5 pointer-events-none rounded-2xs"></div>

          {/* Left Column: Hand-written message */}
          <div className="w-[55%] pr-2.5 flex flex-col justify-between h-full z-10 border-r border-ink/10">
            <div className="flex justify-between items-center pb-1 border-b border-ink/10 mb-1">
              <span className="font-cond text-[7px] tracking-[0.14em] uppercase text-ink/40">
                Chiclayo, Perú
              </span>
              <div className="flex items-center gap-1.5">
                <span className="font-mono text-[7px] text-ink/40 leading-none">
                  N.° {postal.num}
                </span>
                
                {/* Edit Button inside back page - Only visible if CMS Admin is logged in */}
                {isAdmin && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(postal);
                    }}
                    className="bg-white hover:bg-[#1a3b68] border border-ink/20 text-ink hover:text-white p-0.5 rounded-2xs hover:scale-105 transition-all cursor-pointer pointer-events-auto animate-fade-in"
                    title="Editar esta postal"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>
                  </button>
                )}
              </div>
            </div>
            
            {/* Scrollable message text styled as a beautiful manuscript */}
            <div 
              className="flex-1 overflow-y-auto pr-1 select-text scrollbar-thin scrollbar-thumb-ink/10 cursor-text"
              onClick={(e) => e.stopPropagation()}
            >
              <p className="font-serif text-[10.5px] sm:text-[11.5px] leading-relaxed text-[#2A2820] italic font-light">
                "{postal.msg}"
              </p>
            </div>
            
            <p className="font-cond text-[7px] tracking-wider text-terracota font-semibold mt-1">
              &larr; Clic para voltear
            </p>
          </div>

          {/* Right Column: Postage Stamp & Address Lines */}
          <div className="w-[45%] pl-2.5 flex flex-col justify-between h-full z-10 relative">
            
            {/* Realistic decorative postage stamp in top-right with citizen portrait */}
            <div className="flex justify-end">
              <div 
                className="w-10 h-12 border border-dashed border-terracota/80 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)] flex flex-col items-center justify-between p-0.5 select-none rotate-3 transition-transform duration-300 hover:rotate-0"
              >
                <div className="w-full h-full border border-ink/5 bg-gradient-to-br from-white to-arena/30 flex flex-col items-center justify-between p-0.5">
                  <div className="text-[4px] font-mono tracking-tighter text-ink/65 uppercase text-center leading-none">
                    CORREOS<br />PERÚ
                  </div>
                  <img 
                    src={resolvedFoto} 
                    alt="" 
                    className="w-[18px] h-[18px] rounded-full object-cover border border-white/20 shadow-xs" 
                    referrerPolicy="no-referrer"
                  />
                  <div className="text-[4px] font-mono tracking-tighter text-terracota font-bold text-center leading-none">
                    S/. 1.00
                  </div>
                </div>
              </div>
            </div>

            {/* Address lines mimicking real stationery */}
            <div className="space-y-1.5 mt-auto" onClick={(e) => e.stopPropagation()}>
              <div className="border-b border-ink/15 pb-0.5 flex justify-between items-end">
                <span className="font-cond text-[7px] text-ink/40 uppercase leading-none">A:</span>
                <span className="font-serif text-[9px] italic text-ink/80 truncate pl-1 leading-none">
                  S.S. León XIV
                </span>
              </div>
              <div className="border-b border-ink/15 pb-0.5 flex justify-between items-end">
                <span className="font-cond text-[7px] text-ink/40 uppercase leading-none">Direc:</span>
                <span className="font-serif text-[9px] italic text-ink/80 truncate pl-1 leading-none">
                  Città del Vaticano
                </span>
              </div>
              <div className="border-b border-ink/15 pb-0.5 flex justify-between items-end">
                <span className="font-cond text-[7px] text-ink/40 uppercase leading-none">Ciudad:</span>
                <span className="font-mono text-[8px] text-ink/80 font-semibold tracking-wider uppercase pl-1 leading-none">
                  00120 ROMA
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default function Postales() {
  const { 
    isAdmin, 
    postales, 
    setPostales, 
    updatePostal, 
    addPostal, 
    deletePostal 
  } = useCMS();

  const [editingPostal, setEditingPostal] = useState<Postal | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [editFields, setEditFields] = useState({
    num: '',
    nombre: '',
    edad: '',
    msg: '',
    foto: ''
  });

  const [showExporter, setShowExporter] = useState(false);

  const handleEditClick = (postal: Postal) => {
    setIsCreatingNew(false);
    setEditingPostal(postal);
    setEditFields({
      num: postal.num,
      nombre: postal.nombre,
      edad: postal.edad || '',
      msg: postal.msg,
      foto: postal.foto
    });
  };

  const handleCreateNewPostalClick = () => {
    setIsCreatingNew(true);
    // Find next sequence automatically
    const nums = postales.map((p) => parseInt(p.num, 10)).filter((n) => !isNaN(n));
    const nextNumVal = nums.length > 0 ? Math.max(...nums) + 1 : postales.length + 1;
    const formattedNum = String(nextNumVal).padStart(3, '0');

    setEditFields({
      num: formattedNum,
      nombre: '',
      edad: '',
      msg: '',
      foto: ''
    });
    setEditingPostal({
      num: formattedNum,
      nombre: '',
      edad: '',
      msg: '',
      foto: ''
    });
  };

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPostal) return;

    // Direct clean drive URL parsing instantly on submit
    const processedFoto = cleanDriveUrl(editFields.foto);

    if (isCreatingNew) {
      const newPostalObj: Postal = {
        num: editFields.num.trim() || editingPostal.num,
        nombre: editFields.nombre.trim() || "Ciudadano",
        edad: editFields.edad.trim(),
        msg: editFields.msg.trim() || "Un saludo fraternal.",
        foto: processedFoto || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400'
      };
      addPostal(newPostalObj);
    } else {
      updatePostal(editingPostal.num, {
        nombre: editFields.nombre,
        edad: editFields.edad,
        msg: editFields.msg,
        foto: processedFoto
      });
    }

    setEditingPostal(null);
    setIsCreatingNew(false);
  };

  const handleResetData = () => {
    if (confirm('¿Deseas restaurar todas las postales a sus valores de fábrica? Se borrarán tus cambios locales.')) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('chiclayo_user_postales');
        const defaultData = (window as any).wordpressPostalesData || POSTALES;
        setPostales(defaultData);
      }
    }
  };

  return (
    <section className="bg-white border-b-2 border-ink py-16 px-6 lg:px-12" id="postales">
      
      {/* Title block */}
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between lg:items-center mb-12 gap-8 border-b border-ink/10 pb-8">
        <div className="max-w-xl animate-fade-in">
          <div className="flex items-center gap-4 mb-3">
            <span className="font-cond text-[10px] font-bold tracking-[0.18em] uppercase text-terracota whitespace-nowrap">
              Archivo abierto
            </span>
            <span className="flex-1 max-w-[60px] h-[1px] bg-terracota"></span>
          </div>
          <h2 className="font-display text-[30px] md:text-[44px] font-light leading-[1.12] text-ink tracking-tight">
            Las primeras <em>{postales.length}</em><br />ya están escritas.
          </h2>
        </div>

        {/* Premium Compact Horizontal documentary banner */}
        <div className="w-full lg:max-w-4xl bg-white border border-[#e2e8f0] overflow-hidden relative shadow-[0_4px_15px_rgba(0,0,0,0.06)] hover:shadow-md transition-all duration-300 md:h-[220px] flex flex-col md:flex-row rounded-xs">
          <div className="absolute inset-0 bg-[#faf9f6] opacity-98 pointer-events-none z-0">
            {/* Elegant Envelope-style Border Details with low opacity */}
            <div 
              className="absolute inset-0 opacity-12"
              style={{
                border: '12px solid transparent',
                borderImage: 'repeating-linear-gradient(-45deg, #d9383a, #d9383a 10px, transparent 10px, transparent 20px, #1a3b68 20px, #1a3b68 30px, transparent 30px, transparent 40px) 12'
              }}
            ></div>
          </div>

          <div className="relative z-10 flex flex-col md:flex-row w-full items-stretch">
            {/* Left Column: Documentary description */}
            <div className="w-full md:w-[58%] flex flex-col justify-center p-5 sm:p-6 lg:p-7 text-left">
              <div className="mb-2 flex items-center gap-2.5">
                <span className="font-cond text-[9px] font-extrabold text-gris tracking-[0.12em] uppercase leading-none">
                  PROYECTO PATROCINADO POR
                </span>
                <div className="flex flex-col ml-1 shrink-0">
                  <a 
                    href="https://sanroque.com.pe/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex flex-col group select-none"
                    aria-label="San Roque"
                  >
                    <div className="flex items-center gap-1">
                      <span className="font-sans font-black text-[14px] tracking-tighter text-[#1a3b68] group-hover:text-[#d9383a] transition-colors leading-none uppercase">
                        SAN
                      </span>
                      <div className="flex flex-col justify-between h-[9px] w-[26px] py-[0.5px]">
                        <div className="h-[1px] bg-[#1a3b68] group-hover:bg-[#d9383a] transition-colors"></div>
                        <div className="h-[1px] bg-[#1a3b68] group-hover:bg-[#d9383a] transition-colors"></div>
                        <div className="h-[1px] bg-[#1a3b68] group-hover:bg-[#d9383a] transition-colors"></div>
                        <div className="h-[1px] bg-[#1a3b68] group-hover:bg-[#d9383a] transition-colors"></div>
                        <div className="h-[1px] bg-[#1a3b68] group-hover:bg-[#d9383a] transition-colors"></div>
                      </div>
                    </div>
                    <span className="font-sans font-black text-[14px] tracking-[0.04em] text-[#1a3b68] group-hover:text-[#d9383a] transition-colors leading-[0.8] uppercase mt-[1.5px]">
                      ROQUE
                    </span>
                  </a>
                </div>
              </div>

              <h3 className="font-serif text-[18px] sm:text-[20px] font-normal leading-[1.3] text-[#1a202c] mb-2 tracking-tight">
                Porque León XIV no es una figura lejana en Roma... en Chiclayo le decimos <strong className="text-[#1a3b68] font-bold border-b border-dashed border-[#d9383a] pb-0.5">Robert</strong>.
              </h3>
              
              <p className="font-serif text-[11px] sm:text-[11.5px] leading-relaxed text-[#4a5568] mb-4">
                Descubre las cartas manuscritas de Lambayeque que viajarán directo al Vaticano en este emotivo proyecto documental.
              </p>
            </div>

            {/* Right Column: Stylized compact mockup (42% width) */}
            <div className="w-full md:w-[42%] bg-[#1a3b68] relative overflow-hidden flex items-center justify-center p-4 min-h-[160px] md:min-h-full">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a3b68]/95 to-[#0f2340]/98 pointer-events-none z-0"></div>
              
              <div className="relative z-10 w-full max-w-[95%] md:max-w-full">
                <div 
                  className="bg-white text-[#2d3748] w-full p-3.5 shadow-[0px_8px_20px_rgba(0,0,0,0.2)] relative transition-all hover:scale-[1.02] duration-300 origin-center select-none"
                  style={{ transform: 'rotate(1.2deg)' }}
                >
                  <div className="absolute top-3 right-3 w-[36px] h-[44px] bg-[#edf2f7] border border-dashed border-[#a0aec0] flex flex-col justify-center items-center p-0.5 leading-none select-none">
                    <span className="font-cond text-[5px] text-center text-[#718096] uppercase font-bold">Papa</span>
                    <span className="font-display text-[7px] text-center text-[#1a3b68] font-bold uppercase leading-none mt-0.5 whitespace-nowrap">León XIV</span>
                  </div>

                  <div className="font-serif text-[12px] font-bold text-[#1a3b68] mb-0.5 leading-none">
                    Postal N° {postales.length > 0 ? postales[postales.length - 1].num : "21"}
                  </div>
                  
                  <div className="font-mono text-[7.5px] text-[#718096] mb-2 pb-1 border-[#e2e8f0] border-b leading-none truncate max-w-[130px]">
                    De: {postales.length > 0 ? postales[postales.length - 1].nombre : "Marisol Eca"}
                  </div>

                  <div className="font-serif italic text-[10.5px] leading-relaxed text-[#2d3748] line-clamp-3">
                    "{postales.length > 0 ? postales[postales.length - 1].msg : "Un abrazo y cariño infinito..."}"
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Elegant CMS Action Panel above the postcards grid - ONLY shown to logged-in Admins */}
      {isAdmin && (
        <div className="max-w-7xl mx-auto mb-10 p-[18px] bg-emerald-50 border-2 border-emerald-600 rounded-sm shadow-md flex flex-wrap items-center justify-between gap-4 animate-fade-in relative z-20">
          <div className="flex items-center gap-3">
            <span className="text-xl">🛠️</span>
            <div>
              <h4 className="font-display text-[14px] font-semibold text-emerald-900 uppercase tracking-wide">
                Panel de Control CMS de Postales
              </h4>
              <p className="font-serif text-[11px] text-emerald-800 leading-tight">
                Estás autenticado como <strong className="font-mono">managelkin@gmail.com</strong>. Tienes acceso completo para agregar, modificar y catalogar postales en tiempo real.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2.5">
            <button
              onClick={handleCreateNewPostalClick}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-cond text-[11px] font-bold uppercase tracking-wider rounded-2xs shadow-sm cursor-pointer transition-colors flex items-center gap-1.5"
            >
              <span>＋</span> Añadir Nueva Postal
            </button>
            <button
              onClick={handleResetData}
              className="px-3.5 py-2 border border-emerald-600/30 hover:border-emerald-700 text-[11px] font-bold text-emerald-800 font-cond uppercase tracking-wider rounded-2xs cursor-pointer transition-all hover:bg-emerald-100/50 bg-white"
            >
              Restaurar Valores de Fábrica
            </button>
            <button
              onClick={() => setShowExporter(!showExporter)}
              className="px-3.5 py-2 bg-[#1a3b68] hover:bg-terracota text-white text-[11px] font-bold uppercase tracking-wider font-cond rounded-2xs transition-colors cursor-pointer"
            >
              {showExporter ? 'Ocultar Guía' : 'Guía de WordPress'}
            </button>
          </div>
        </div>
      )}

      {/* Guide to passing to WordPress */}
      {showExporter && (
        <div className="max-w-7xl mx-auto mb-10 p-5 bg-[#faf9f6] border-2 border-[#1a3b68] rounded-xs animate-fade-in relative z-20">
          <div className="flex justify-between items-start mb-3">
            <h4 className="font-display text-[16px] font-bold text-[#1a3b68] uppercase tracking-wide">
              📋 Guia de Integración para poner tus fotos en el WordPress Real
            </h4>
            <button 
              onClick={() => setShowExporter(false)} 
              className="text-ink font-bold cursor-pointer hover:text-terracota"
            >
              Ocultar
            </button>
          </div>
          <div className="text-[12px] md:text-[13px] text-gris space-y-3 font-serif">
            <p>
              ¡Hemos programado tu archivo descargable de WordPress para que haga exactamente lo mismo! Todo cambio que hagas aquí lo puedes replicar en tu panel de WordPress con estos sencillos pasos:
            </p>
            <ol className="list-decimal pl-6 space-y-1.5 font-sans font-medium text-[12px]">
              <li>
                Sube la foto original de tu ciudadano/a a tu <strong className="text-ink">Google Drive</strong>.
              </li>
              <li>
                Haz clic derecho sobre el archivo, selecciona <strong className="text-ink">Compartir &gt; Cualquier persona con el enlace (Lector)</strong> y copia el link generado.
              </li>
              <li>
                En tu panel de administración de WordPress, ve al menú lateral <strong className="text-terracota">"Postales del Papa" &gt; "Añadir nueva"</strong> (o edita una existente).
              </li>
              <li>
                En la caja inferior llamada <strong className="text-ink">"Datos Clave de la Postal"</strong>, verás el nuevo campo que hemos creado para ti: <strong className="text-terracota">"Enlace de la Foto o Google Drive"</strong>.
              </li>
              <li>
                Pega el enlace de Google Drive tal cual ahí, escribe el mensaje, asigna el número de postal correlativa, y haz clic en <strong className="text-ink">Publicar/Actualizar</strong>.
              </li>
              <li>
                <strong>¡Y listo!</strong> Google Drive actúa como el servidor de imágenes más rápido y gratuito. El tema de WordPress lo procesará y mostrará directamente en el sitio web sin problemas de carga.
              </li>
            </ol>
          </div>
        </div>
      )}

      {/* Centered responsive grid of Postales */}
      <div className="max-w-7xl mx-auto px-1 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {postales.map((postal: Postal, i: number) => (
            <PostalCard 
              key={postal.num} 
              postal={postal} 
              colorBg={COLORS[i % COLORS.length]} 
              onEdit={handleEditClick}
            />
          ))}
        </div>
      </div>

      {/* Beautiful High-Fidelity Design Centered Modal to Edit / Create */}
      {editingPostal && (
        <div 
          className="fixed inset-0 bg-ink/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in"
          onClick={() => {
            setEditingPostal(null);
            setIsCreatingNew(false);
          }}
        >
          <div 
            className="bg-white border-2 border-ink max-w-md w-full p-6 relative rounded-xs shadow-[0_12px_40px_rgba(0,0,0,0.18)] max-h-[92vh] overflow-y-auto" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b border-ink/10 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-terracota animate-pulse"></span>
                <span className="font-display text-[16px] font-bold text-ink uppercase tracking-wide">
                  {isCreatingNew ? `Nueva Postal N.° ${editFields.num}` : `Editar Postal N.° ${editingPostal.num}`}
                </span>
              </div>
              <button 
                onClick={() => {
                  setEditingPostal(null);
                  setIsCreatingNew(false);
                }}
                className="text-ink/65 hover:text-ink hover:scale-115 transition-transform font-bold text-xl cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSaveSubmit} className="space-y-4">
              <div>
                <label className="block font-cond text-[10px] font-bold text-ink/75 uppercase tracking-wider mb-1">
                  Número identificador de Postal (Correlativo):
                </label>
                <input
                  type="text"
                  required
                  disabled={!isCreatingNew}
                  value={editFields.num}
                  onChange={(e) => setEditFields({...editFields, num: e.target.value})}
                  className="w-full border border-ink/20 px-3 py-2 text-sm bg-white rounded-2xs focus:border-[#1a3b68] outline-none transition-colors font-mono disabled:opacity-50"
                  placeholder="Ej. 022"
                />
              </div>

              <div>
                <label className="block font-cond text-[10px] font-bold text-ink/75 uppercase tracking-wider mb-1">
                  Nombre del Ciudadano/a:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej. Juan de Dios Meléndez"
                  value={editFields.nombre}
                  onChange={(e) => setEditFields({...editFields, nombre: e.target.value})}
                  className="w-full border border-ink/20 px-3 py-2 text-sm bg-white rounded-2xs focus:border-[#1a3b68] outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-cond text-[10px] font-bold text-ink/75 uppercase tracking-wider mb-1">
                  Edad / Procedencia:
                </label>
                <input
                  type="text"
                  placeholder="Ej. 71 años o Caleta de Santa Rosa"
                  value={editFields.edad}
                  onChange={(e) => setEditFields({...editFields, edad: e.target.value})}
                  className="w-full border border-ink/20 px-3 py-2 text-sm bg-white rounded-2xs focus:border-[#1a3b68] outline-none transition-colors"
                />
              </div>

              <div>
                <label className="block font-cond text-[10px] font-bold text-ink/75 uppercase tracking-wider mb-1">
                  Escribe el Mensaje al Papa:
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Mensaje o dedicatoria manuscrita..."
                  value={editFields.msg}
                  onChange={(e) => setEditFields({...editFields, msg: e.target.value})}
                  className="w-full border border-ink/20 px-3 py-2 text-sm bg-white rounded-2xs focus:border-[#1a3b68] outline-none transition-colors font-serif italic"
                />
              </div>

              <div>
                <label className="block font-cond text-[10px] font-bold text-ink/75 uppercase tracking-wider mb-1">
                  Enlace de Foto (Soporta Google Drive o URL Directa):
                </label>
                <input
                  type="text"
                  placeholder="Pega enlace de compartir de Google Drive aquí o URL de imagen"
                  value={editFields.foto}
                  onChange={(e) => setEditFields({...editFields, foto: e.target.value})}
                  className="w-full border border-ink/20 px-3 py-2 text-xs bg-[#fbfbfa] rounded-2xs focus:border-[#1a3b68] outline-none transition-colors font-mono"
                />
                <div className="mt-1.5 p-2 bg-[#f0f4f8] rounded-2xs border border-[#1a3b68]/15 text-[10.5px] text-[#2c3e50] leading-relaxed">
                  💡 <strong>Detector Inteligente de Google Drive:</strong> Puedes pegar el enlace de compartir directamente de Google Drive. El sistema lo convertirá al instante en una dirección web con transmisión compatible.
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-ink/10 flex justify-between items-center">
                <div>
                  {!isCreatingNew && (
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`¿Estás seguro de que deseas eliminar permanentemente la postal N.° ${editingPostal.num}?`)) {
                          deletePostal(editingPostal.num);
                          setEditingPostal(null);
                        }
                      }}
                      className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-[10px] font-bold uppercase tracking-widest rounded-3xs transition-colors cursor-pointer"
                    >
                      🗑️ Eliminar
                    </button>
                  )}
                </div>
                <div className="flex gap-3.5">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingPostal(null);
                      setIsCreatingNew(false);
                    }}
                    className="px-4 py-2 border border-ink/20 hover:border-ink/80 text-[10px] font-bold uppercase tracking-widest rounded-3xs transition-colors cursor-pointer text-ink/80"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1a3b68] text-white hover:bg-terracota text-[10px] font-bold uppercase tracking-widest rounded-3xs transition-colors cursor-pointer"
                  >
                    {isCreatingNew ? 'Añadir Postal' : 'Guardar Cambios'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
