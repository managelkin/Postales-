import React from 'react';

export default function Manifesto() {
  const wpPageData = typeof window !== 'undefined' && (window as any).wordpressPageData;
  const mtTitle = wpPageData?.manifesto_title || "Una postal.\nUn viaje.";
  const mtBlockquote = wpPageData?.manifesto_blockquote || "“Un pueblo que lo vio llegar, que lo vio servir, y que hoy decide escribirle de vuelta.”";
  const mtP1 = wpPageData?.manifesto_p1 || "En mayo de 2025, el cardenal Robert Francis Prevost fue elegido Obispo de Roma. Para el mundo, se convirtió en León XIV. Para Chiclayo y Lambayeque, siempre tuvo nombre, historia y presencia.";
  const mtP2 = wpPageData?.manifesto_p2 || "Este proyecto convierte un acto cotidiano — tomarse una foto, escribirle al Papa — en un objeto físico sellado, numerado y custodiado. Cuando el archivo esté completo, viajará a Roma o será entregado al Santo Padre durante su visita a Chiclayo en noviembre de 2026.";
  const mtP3 = wpPageData?.manifesto_p3 || "No es un evento. No es marketing. Es una crónica colectiva construida postal a postal, voz a voz, desde los territorios que el Papa León XIV conoció antes que el mundo.";

  const steps = [
    {
      num: '01',
      time: '45 seg · Captura',
      title: 'La foto.',
      desc: 'Retrato profesional con cámara, flash de estudio y fondo neutro. Una sola toma honesta — sin filtros, sin pose forzada.'
    },
    {
      num: '02',
      time: '47 seg · Impresión',
      title: 'La impresión.',
      desc: 'Postal 10 × 15 cm en papel fotográfico mate, lista al instante. Un objeto real que el participante se lleva consigo.'
    },
    {
      num: '03',
      time: 'A mano · Sin pauta',
      title: 'El mensaje.',
      desc: 'Cada persona escribe lo que quiera en el reverso: una bendición, un recuerdo, una pregunta. Sin censura. Sin guión.'
    },
    {
      num: '04',
      time: 'Sellada · Oficial',
      title: 'La urna.',
      desc: 'La postal se deposita en un archivo numerado y custodiado. Viaja a Roma o se entrega al Papa en Chiclayo, noviembre 2026.'
    }
  ];

  return (
    <>
      {/* Manifesto Section */}
      <section className="bg-ink text-white border-b-3 border-terracota py-20 md:py-24 px-8 md:px-16 lg:px-24" id="proyecto">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="w-full">
            <div className="border-t border-white/15 pt-3 flex items-center gap-4 mb-6">
              <span className="font-cond text-[10px] font-bold tracking-[0.18em] uppercase text-white/40 whitespace-nowrap">
                El proyecto
              </span>
              <span className="flex-1 max-w-[40px] h-[1px] bg-white/20"></span>
            </div>
            
            <h2 className="font-display text-[34px] md:text-[44px] font-light leading-[1.15] text-white whitespace-pre-line">
              {mtTitle}
            </h2>
            
            <div className="border-l-2 border-terracota pl-6 py-2.5 mt-6">
              <blockquote className="font-display text-[18px] md:text-[20px] font-light italic text-white/90 leading-relaxed">
                {mtBlockquote}
              </blockquote>
            </div>
          </div>
          
          <div className="space-y-6 text-[18px] md:text-[20px] font-normal text-white/85 leading-relaxed pt-2 w-full">
            <p>
              {mtP1}
            </p>
            <p>
              {mtP2}
            </p>
            <p>
              {mtP3}
            </p>
            <div className="flex items-center gap-4.5 border-t border-white/10 pt-5 mt-8 group/author relative">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-display text-[17px] md:text-[18px] font-bold text-white leading-tight">Elkin Cabarcas Mora</p>
                </div>
                <p className="font-cond text-[12px] tracking-widest uppercase text-white/60 mt-1.5">Dirección Editorial &middot; Periodista y Fotógrafo</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Steps Section */}
      <section className="bg-white border-b border-arena2 py-20 px-6 lg:px-12" id="como-funciona">
        <div className="border-t border-ink pt-3 flex items-center gap-4 mb-4">
          <span className="font-cond text-[12px] md:text-[13px] font-bold tracking-[0.2em] uppercase text-terracota whitespace-nowrap">
            Cómo funciona
          </span>
          <span className="flex-1 max-w-[40px] h-[1px] bg-terracota"></span>
        </div>
        
        <h2 className="font-display text-[34px] md:text-[46px] font-light leading-[1.15] text-ink mb-12">
          Cuatro pasos. <span className="italic text-terracota font-medium">Noventa segundos.</span>
        </h2>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-arena2 border border-arena2 rounded-sm overflow-hidden mt-8 shadow-sm">
          {steps.map((step, idx) => (
            <div 
              key={idx}
              className="group bg-white p-8 cursor-default hover:bg-ink transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <p className="font-display text-[52px] font-black text-arena2 group-hover:text-terracota leading-none mb-4 transition-colors duration-300">
                  {step.num}
                </p>
                <p className="font-cond text-[12px] md:text-[13px] font-bold tracking-[0.14em] uppercase text-gris2 mb-2 group-hover:text-white/50 transition-colors duration-300">
                  {step.time}
                </p>
                <h3 className="font-display text-[22px] md:text-[24px] font-bold text-ink mb-3 group-hover:text-white transition-colors duration-300 font-medium">
                  {step.title}
                </h3>
              </div>
              <p className="font-serif text-[16px] md:text-[17px] text-ink leading-[1.65] group-hover:text-white/80 transition-colors duration-300 mt-3">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
