import React from 'react';

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `#${targetId}`);
    }
  };

  return (
    <footer className="bg-[#0D0B09] border-t-2 border-terracota py-12 px-6 lg:px-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
      <div>
        <p className="font-display text-[24px] font-black text-white leading-tight">
          <em>Postales</em> al Papa León XIV
        </p>
        <p className="font-cond text-[13px] text-white/60 tracking-wider mt-2.5">
          postalesalpapa.com · Chiclayo · Lambayeque · Perú · 2026
        </p>
        <p className="font-cond text-[13px] text-white/60 tracking-wider mt-1">
          Dirección editorial: Elkin Cabarcas Mora &middot; editor@postalesalpapa.com &middot; +51 957 802 000
        </p>
      </div>
      
      <div className="flex gap-6 md:gap-10 flex-wrap items-center">
        <a 
          href="#proyecto" 
          onClick={(e) => handleNavClick(e, 'proyecto')}
          className="font-cond text-[13px] font-bold tracking-widest uppercase text-white/70 hover:text-terracota transition-colors"
        >
          El proyecto
        </a>
        <a 
          href="#postales" 
          onClick={(e) => handleNavClick(e, 'postales')}
          className="font-cond text-[13px] font-bold tracking-widest uppercase text-white/70 hover:text-terracota transition-colors"
        >
          Postales
        </a>
        <a 
          href="#ruta" 
          onClick={(e) => handleNavClick(e, 'ruta')}
          className="font-cond text-[13px] font-bold tracking-widest uppercase text-white/70 hover:text-terracota transition-colors"
        >
          La ruta
        </a>
        <a 
          href="#inscripcion" 
          onClick={(e) => handleNavClick(e, 'inscripcion')}
          className="font-cond text-[13px] font-bold tracking-widest uppercase text-white/70 hover:text-terracota transition-colors"
        >
          Participar
        </a>
      </div>

      <div className="text-left md:text-right font-cond flex flex-col items-start md:items-end gap-2.5">
        <a 
          href="https://www.tiktok.com/@postalesalpapa" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-white/80 hover:text-white transition-all bg-white/5 hover:bg-white/10 px-3.5 py-1.5 border border-white/10 hover:border-white/30 rounded-none transition-all duration-200 shadow-sm"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-3.5 h-3.5"
          >
            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 15.69a6.34 6.34 0 0 0 10.86 4.43v-8a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.15z"/>
          </svg>
          <span className="font-mono text-[11px] font-bold tracking-widest uppercase">TIKTOK @postalesalpapa</span>
        </a>
        <p className="text-[12px] text-white/40 tracking-wider">
          © 2026 Postales al Papa León XIV · Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}
