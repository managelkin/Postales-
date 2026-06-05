import React, { useState } from 'react';
import { RUTAS } from '../data/routesData';
import { Parada } from '../types';

export default function RoutesTabs() {
  const [activeTab, setActiveTab] = useState<string>("1");

  const activeRoute = RUTAS[activeTab];

  return (
    <section className="bg-white border-b-2 border-ink py-20 md:py-24 px-8 md:px-16 lg:px-24" id="ruta">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-12">
          <div>
            <div className="border-t border-ink pt-3 flex items-center gap-4 mb-4">
              <span className="font-cond text-[12px] md:text-[13px] font-bold tracking-[0.2em] uppercase text-terracota whitespace-nowrap">
                La Ruta de León
              </span>
              <span className="flex-1 max-w-[40px] h-[1px] bg-terracota"></span>
            </div>
            
            <h2 className="font-display text-[34px] md:text-[46px] font-light leading-[1.15] text-ink">
              27 puntos.<br />
              <span className="italic text-terracota font-medium">14 semanas.</span>
            </h2>
            
            <p className="font-serif text-[19px] md:text-[21px] font-light text-ink/90 leading-relaxed max-w-[600px] mt-4">
              La campaña recorre Lambayeque de norte a sur activando sus grandes sitios patrimoniales, religiosos y culturales. Cada fin de semana se activa un punto el viernes para turistas y visitantes, y un punto el sábado para la comunidad local.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-[1px] bg-arena2 border border-arena2 rounded-sm overflow-hidden self-center shadow-sm">
            <div className="bg-white p-6 flex flex-col justify-center">
              <div className="font-display text-[38px] md:text-[44px] font-black text-ink leading-none">
                27<span className="text-terracota text-[24px] font-semibold pl-1">pts</span>
              </div>
              <p className="font-cond text-[13px] md:text-[14px] font-bold tracking-[0.12em] uppercase text-gris mt-2">
                Puntos turísticos
              </p>
            </div>
            <div className="bg-white p-6 flex flex-col justify-center">
              <div className="font-display text-[38px] md:text-[44px] font-black text-ink leading-none">
                4<span className="text-terracota text-[24px] font-semibold pl-1">rutas</span>
              </div>
              <p className="font-cond text-[13px] md:text-[14px] font-bold tracking-[0.12em] uppercase text-gris mt-2">
                Ejes temáticos
              </p>
            </div>
            <div className="bg-white p-6 flex flex-col justify-center">
              <div className="font-display text-[38px] md:text-[44px] font-black text-ink leading-none">
                14<span className="text-terracota text-[24px] font-semibold pl-1">FS</span>
              </div>
              <p className="font-cond text-[13px] md:text-[14px] font-bold tracking-[0.12em] uppercase text-gris mt-2">
                Fines de semana
              </p>
            </div>
            <div className="bg-white p-6 flex flex-col justify-center">
              <div className="font-display text-[38px] md:text-[44px] font-black text-ink leading-none">
                500<span className="text-terracota text-[24px] font-semibold pl-1">p</span>
              </div>
              <p className="font-cond text-[13px] md:text-[14px] font-bold tracking-[0.12em] uppercase text-gris mt-2">
                Postales meta
              </p>
            </div>
          </div>
        </div>

        {/* Tabs Selector */}
        <div className="flex flex-col sm:flex-row border border-arena2 rounded-sm overflow-hidden mb-10 shadow-sm">
          {Object.entries(RUTAS).map(([key, r]) => {
            const isActive = activeTab === key;
            const romanNumerals = ["I", "II", "III", "IV"];
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex-1 text-center py-5 px-3 border-r last:border-r-0 border-arena2 cursor-pointer transition-all duration-300 font-cond text-[12px] md:text-[13px] font-bold tracking-widest uppercase ${
                  isActive 
                    ? 'bg-ink text-white' 
                    : 'bg-white text-gris hover:bg-crema/70 hover:text-ink'
                }`}
              >
                <span className={`block font-display text-[24px] md:text-[26px] font-black leading-none mb-1 transition-colors ${
                  isActive ? 'text-terracota' : 'text-terracota'
                }`}>
                  {romanNumerals[parseInt(key) - 1]}
                </span>
                {r.nombre}
              </button>
            );
          })}
        </div>

        {/* List of stops */}
        <div className="transition-all duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeRoute.paradas.map((parada, idx) => (
              <div 
                key={idx}
                className="bg-white border border-arena2 p-6 rounded-xs flex gap-5 items-start shadow-xs hover:border-gris2 transition-colors"
               >
                {/* Calendar Style Date Block */}
                <div className="text-center min-w-[60px] bg-arena/80 border border-arena2 rounded-xs py-2.5 px-1 shrink-0">
                  <p className="font-cond text-[10px] md:text-[11px] font-bold tracking-wider uppercase text-terracota">
                    {parada.mes}
                  </p>
                  <p className="font-display text-[26px] md:text-[28px] font-extrabold leading-none text-ink mt-0.5 animate-fade-in">
                    {parada.dia}
                  </p>
                </div>

                {/* Information Block */}
                <div className="flex-1">
                  <p className="font-cond text-[10px] md:text-[11px] font-bold tracking-[0.12em] uppercase text-gris2 mb-1">
                    {parada.t}
                  </p>
                  <h3 className="font-display text-[16px] md:text-[17px] font-bold text-ink leading-snug">
                    {parada.n}
                  </h3>
                  <p className="font-serif text-[13px] md:text-[14px] text-gris mt-1 leading-normal">
                    {parada.l}
                  </p>
                  
                  {/* Custom badges per Friday / Saturday / Special */}
                  <span className={`inline-block mt-3.5 font-cond text-[10px] md:text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-xs ${
                    parada.b === 'vie' 
                      ? 'bg-terracota text-white' 
                      : parada.b === 'sab' 
                      ? 'bg-olive text-white' 
                      : 'border border-ink text-ink bg-transparent'
                  }`}>
                    {parada.b === 'vie' ? 'Viernes' : parada.b === 'sab' ? 'Sábado' : 'Especial'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
