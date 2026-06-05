import React from 'react';

export default function Ticker() {
  const tickerItems = [
    "19 jun 2026 — Catedral de Chiclayo · Reapertura",
    "500 postales ciudadanas · Meta",
    "27 puntos en Lambayeque",
    "4 rutas · La Ruta de León",
    "14 fines de semana consecutivos",
    "Entrega al Papa León XIV · Nov 2026",
    "Patrocina: San Roque · Chiclayo"
  ];

  // Duplicate items twice to ensure smooth infinite loop scroll
  const scrollItems = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <div className="bg-terracota h-9 overflow-hidden flex items-center mt-0">
      <span className="font-cond text-[10px] font-bold tracking-widest uppercase bg-ink text-crema px-4 h-full flex items-center whitespace-nowrap shrink-0 z-10">
        Últimas jornadas
      </span>
      <div className="overflow-hidden relative w-full flex items-center">
        <div className="flex animate-ticker whitespace-nowrap">
          {scrollItems.map((item, index) => (
            <span
              key={index}
              className="font-cond text-[11px] font-semibold tracking-wider uppercase text-white/90 px-7 border-r border-white/20"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
