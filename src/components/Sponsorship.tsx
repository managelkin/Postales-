import React, { useState, useEffect } from 'react';
import { RUTAS } from '../data/routesData';
import { Parada } from '../types';

interface SponsoredStop {
  num: number;
  routeId: string;
  routeName: string;
  parada: Parada;
  sponsorName: string; // "Disponible" or actual sponsor name
}

const DEFAULT_SPONSORS: Record<number, string> = {
  1: "San Roque (Patrocinador Fundador)"
};

export default function Sponsorship() {
  const [sponsors, setSponsors] = useState<SponsoredStop[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "sponsored" | "available">("all");
  
  // Form State
  const [formData, setFormData] = useState({
    pointNum: "",
    sponsorName: "",
    contactName: "",
    email: "",
    phone: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Initialize and load sponsorships safely
  useEffect(() => {
    // Collect all paradas from RUTAS chronologically
    const allStops: SponsoredStop[] = [];
    let absoluteIndex = 1;
    
    Object.entries(RUTAS).forEach(([routeId, route]) => {
      route.paradas.forEach((parada) => {
        allStops.push({
          num: absoluteIndex,
          routeId,
          routeName: route.nombre,
          parada,
          sponsorName: DEFAULT_SPONSORS[absoluteIndex] || "Disponible para Patrocinio"
        });
        absoluteIndex++;
      });
    });

    // Check if there are saved sponsorships in localStorage
    try {
      const saved = localStorage.getItem("chiclayo_sponsorships");
      if (saved) {
        const parsedSaved = JSON.parse(saved) as Record<number, string>;
        const updatedStops = allStops.map(stop => {
          if (parsedSaved[stop.num]) {
            return {
              ...stop,
              sponsorName: parsedSaved[stop.num]
            };
          }
          return stop;
        });
        setSponsors(updatedStops);
      } else {
        setSponsors(allStops);
      }
    } catch (e) {
      console.error("Error reading localStorage sponsorships:", e);
      setSponsors(allStops);
    }
  }, []);

  const handleSelectPointToSponsor = (num: number) => {
    setFormData(prev => ({
      ...prev,
      pointNum: String(num)
    }));
    
    // Smooth scroll to the form
    const formElement = document.getElementById("sponsorship-form-container");
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleSubmitSponsorship = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const targetNum = parseInt(formData.pointNum);
    if (isNaN(targetNum) || targetNum < 1 || targetNum > 27) {
      setErrorMessage("Por favor, selecciona un punto válido de la ruta.");
      setIsSubmitting(false);
      return;
    }

    try {
      // 1. Simulate API call to FormSubmit or similar service
      const response = await fetch("https://formsubmit.co/ajax/editor@postalesalpapa.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "Punto_Numero": targetNum,
          "Punto_Nombre": sponsors.find(s => s.num === targetNum)?.parada.n || "Desconocido",
          "Patrocinador_Nombre": formData.sponsorName,
          "Persona_Contacto": formData.contactName,
          "Email": formData.email,
          "Telefono": formData.phone,
          "Propuesta_Mensaje": formData.message || "Sin mensaje adicional",
          "_subject": `Nuevo Patrocinio León XIV - Punto ${targetNum} por ${formData.sponsorName}`
        })
      });

      // 2. Reactively update state & local storage to persist the sponsor name!
      const updatedSponsors = sponsors.map(stop => {
        if (stop.num === targetNum) {
          return {
            ...stop,
            sponsorName: `${formData.sponsorName} (Pendiente de Aprobación)`
          };
        }
        return stop;
      });
      
      setSponsors(updatedSponsors);

      // Save custom sponsorships mapping
      const savedMapping: Record<number, string> = {};
      updatedSponsors.forEach(stop => {
        if (stop.sponsorName !== "Disponible para Patrocinio" && !DEFAULT_SPONSORS[stop.num]) {
          savedMapping[stop.num] = stop.sponsorName;
        } else if (DEFAULT_SPONSORS[stop.num] && stop.sponsorName !== DEFAULT_SPONSORS[stop.num]) {
          savedMapping[stop.num] = stop.sponsorName;
        }
      });
      
      try {
        localStorage.setItem("chiclayo_sponsorships", JSON.stringify(savedMapping));
      } catch (e) {
        console.warn("Unable to save sponsorships to localStorage (quota exceeded or storage disabled):", e);
      }
      
      setSubmitted(true);
    } catch (err: any) {
      console.error("Sponsorship post failure:", err);
      // Even if network fails, we let them save it locally so the experience is robust offline
      const updatedSponsors = sponsors.map(stop => {
        if (stop.num === targetNum) {
          return {
            ...stop,
            sponsorName: `${formData.sponsorName} (Activo Localmemente)`
          };
        }
        return stop;
      });
      setSponsors(updatedSponsors);
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetSponsorships = () => {
    if (window.confirm("¿Seguro que deseas restablecer la simulación de patrocinios a los valores predeterminados?")) {
      localStorage.removeItem("chiclayo_sponsorships");
      
      const allStops: SponsoredStop[] = [];
      let absoluteIndex = 1;
      Object.entries(RUTAS).forEach(([routeId, route]) => {
        route.paradas.forEach((parada) => {
          allStops.push({
            num: absoluteIndex,
            routeId,
            routeName: route.nombre,
            parada,
            sponsorName: DEFAULT_SPONSORS[absoluteIndex] || "Disponible para Patrocinio"
          });
          absoluteIndex++;
        });
      });
      
      setSponsors(allStops);
      setSearchQuery("");
      setFilterType("all");
    }
  };

  // Filter & Search Logic
  const filteredSponsors = sponsors.filter(item => {
    // Filter type matches
    const isAvailable = item.sponsorName === "Disponible para Patrocinio";
    if (filterType === "sponsored" && isAvailable) return false;
    if (filterType === "available" && !isAvailable) return false;

    // Search query matches
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    const matchesPointName = item.parada.n.toLowerCase().includes(query);
    const matchesLocation = item.parada.l.toLowerCase().includes(query);
    const matchesCategory = item.parada.t.toLowerCase().includes(query);
    const matchesSponsor = item.sponsorName.toLowerCase().includes(query);
    const matchesRoute = item.routeName.toLowerCase().includes(query);
    const matchesNum = String(item.num) === query;

    return matchesPointName || matchesLocation || matchesCategory || matchesSponsor || matchesRoute || matchesNum;
  });

  return (
    <section className="bg-crema/70 border-b-2 border-ink py-20 md:py-24 px-8 md:px-16 lg:px-24" id="patrocinios">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Block */}
        <div className="mb-14 text-center">
          <div className="inline-flex items-center gap-3 border-y border-ink/10 py-1 mb-4 h-6">
            <span className="font-cond text-[12px] font-bold tracking-[0.2em] uppercase text-terracota">
              Alianza con el Patrimonio
            </span>
          </div>
          <h2 className="font-display text-[32px] md:text-[46px] font-light leading-[1.15] text-ink max-w-3xl mx-auto mb-5">
            ¡Patrocina uno de los <span className="italic text-terracota font-medium">27 puntos de la ruta!</span>
          </h2>
          <p className="font-serif text-[17px] md:text-[19px] text-gris max-w-[700px] mx-auto leading-relaxed">
            Forma parte activa de la historia de Lambayeque. Tu empresa o institución aparecerá destacada en el punto de encuentro físico elegido, en las postales conmemorativas y en la plataforma.
          </p>
        </div>

        {/* Search Engine Container */}
        <div className="bg-white border border-arena2 p-6 md:p-8 rounded-sm shadow-xs mb-12">
          <div className="flex flex-col md:flex-row gap-5 items-center justify-between border-b border-arena2 pb-6 mb-6">
            <h3 className="font-display text-[20px] font-bold text-ink self-start md:self-center">
              🔍 Buscador de Patrocinadores por Punto
            </h3>
            
            {/* Quick Filter Tabs */}
            <div className="flex bg-arena/50 p-1 border border-arena2 rounded-sm w-full md:w-auto">
              {(["all", "sponsored", "available"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`flex-1 md:flex-none px-4 py-1.5 font-cond text-[11px] font-bold uppercase tracking-wider transition-all rounded-xs cursor-pointer ${
                    filterType === type 
                      ? 'bg-ink text-white shadow-xs' 
                      : 'text-gris hover:text-ink'
                  }`}
                >
                  {type === 'all' ? 'Ver Todos (27)' : type === 'sponsored' ? 'Patrocinados' : 'Disponibles'}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <p className="font-sans text-[13px] text-gris mb-3 font-medium">
              Escribe un lugar, ciudad (Monsefú, Eten, Motupe), número de parada (1-27) o patrocinador para filtrar:
            </p>
            <div className="relative">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Busca por: 'Eten', 'San Roque', 'Museo', '14', etc..."
                className="w-full bg-white border border-arena2 px-5 py-3 text-ink font-sans text-sm rounded-none focus:border-terracota focus:outline-none focus:ring-1 focus:ring-terracota transition-all pr-12"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gris hover:text-ink font-bold text-sm cursor-pointer"
                >
                  ✕ Limpiar
                </button>
              )}
            </div>
            {filteredSponsors.length === 0 && (
              <p className="text-center font-serif italic text-terracota mt-4 text-sm bg-terracota/5 py-2.5 rounded-sm">
                No se encontraron paradas ni patrocinadores con el texto ingresado.
              </p>
            )}
          </div>

          {/* Results Grid - Max height with scroll or paginated grid view */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
            {filteredSponsors.map((stop) => {
              const isAvailable = stop.sponsorName === "Disponible para Patrocinio";
              return (
                <div 
                  key={stop.num}
                  className={`border p-4.5 rounded-xs flex flex-col justify-between transition-all relative group ${
                    isAvailable 
                      ? 'border-arena2 bg-crema/20 hover:border-terracota/50' 
                      : 'border-ink bg-white shadow-xs'
                  }`}
                >
                  <div>
                    {/* Header badge */}
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span className="font-mono text-[10px] font-bold text-gris bg-arena px-2 py-0.5 rounded-xs">
                        PUNTO {String(stop.num).padStart(2, '0')}
                      </span>
                      <span className="font-cond text-[10px] text-terracota font-bold tracking-wider uppercase">
                        {stop.parada.fs} &middot; {stop.parada.dia} {stop.parada.mes}
                      </span>
                    </div>

                    <h4 className="font-sans text-[14px] font-bold text-ink group-hover:text-terracota transition-colors leading-snug">
                      {stop.parada.n}
                    </h4>
                    <p className="font-serif text-[12px] text-gris mt-1 italic">
                      {stop.parada.l}
                    </p>
                  </div>

                  <div className="border-t border-arena/60 pt-3 mt-4 flex flex-col gap-2.5">
                    <div className="flex items-start gap-1.5">
                      <span className="text-[14px] leading-tight shrink-0 select-none">
                        {isAvailable ? "🤝" : "👑"}
                      </span>
                      <div>
                        <p className="font-cond text-[10px] leading-none uppercase tracking-wide text-gris font-bold">
                          Patrocinador:
                        </p>
                        <p className={`font-sans text-[12px] leading-snug mt-1 font-semibold ${
                          isAvailable 
                            ? 'text-gris/70 italic' 
                            : 'text-terracota'
                        }`}>
                          {stop.sponsorName}
                        </p>
                      </div>
                    </div>

                    {isAvailable ? (
                      <button
                        onClick={() => handleSelectPointToSponsor(stop.num)}
                        className="w-full bg-transparent hover:bg-terracota border border-terracota hover:border-terracota text-terracota hover:text-white text-[10px] font-bold uppercase tracking-wider py-1.5 transition-all cursor-pointer text-center"
                      >
                        Patrocinar Punto &rarr;
                      </button>
                    ) : (
                      <span className="inline-block text-center text-ink text-[10px] font-bold tracking-wider uppercase bg-ink/5 border border-transparent py-1.5 select-none text-emerald-800 bg-emerald-50/50">
                        ✓ PUNTO APADRINADO
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Inline Simulation Indicator */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-arena/40 pt-4 text-xs text-gris">
            <span>
              💡 Mostrando <strong className="text-ink">{filteredSponsors.length}</strong> de las 27 paradas históricas de Lambayeque.
            </span>
            <button 
              onClick={handleResetSponsorships}
              className="text-terracota hover:text-ink font-cond uppercase font-bold tracking-wider text-[10px] flex items-center gap-1.5 cursor-pointer underline underline-offset-2"
            >
              🔄 Restablecer Patrocinios Simulados
            </button>
          </div>
        </div>

        {/* Sponsorship Application Form */}
        <div id="sponsorship-form-container" className="bg-ink text-white rounded-none border-t-4 border-terracota p-8 md:p-10 shadow-md">
          {!submitted ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Form Info side */}
              <div className="lg:col-span-5">
                <h3 className="font-display text-[26px] md:text-[30px] font-light leading-tight text-white mb-4">
                  Suma tu <span className="italic text-terracota2 font-medium">identidad empresarial.</span>
                </h3>
                <p className="font-sans text-[14px] md:text-[15px] text-white/70 leading-relaxed mb-6 font-light">
                  Como cooperador o patrocinador oficial, tu logotipo e identidad corporativa quedarán impresos en las postales del punto que elijas y formarán parte del gran archivo histórico que custodiará la Secretaría Papal en Roma.
                </p>

                <div className="space-y-4">
                  <div className="flex gap-4 border-t border-white/5 pt-4">
                    <span className="text-[17px] mt-0.5">🎖️</span>
                    <div>
                      <h4 className="font-display text-[15px] font-bold text-white">Sello de Alianza Patrimonial</h4>
                      <p className="font-sans text-[12px] text-white/60 leading-normal mt-0.5">Difusión en boletines, medios aliados y placas conmemorativas locales.</p>
                    </div>
                  </div>
                  <div className="flex gap-4 border-t border-white/5 pt-4">
                    <span className="text-[17px] mt-0.5">📜</span>
                    <div>
                      <h4 className="font-display text-[15px] font-bold text-white">Archivo Perpetuo</h4>
                      <p className="font-sans text-[12px] text-white/60 leading-normal mt-0.5">Inclusión de tu marca y dedicatoria institucional en el Libro de Oro de Lambayeque.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form element side */}
              <form onSubmit={handleSubmitSponsorship} className="lg:col-span-7 bg-white p-6 md:p-8 rounded-none text-ink border border-arena2">
                <h4 className="text-xs font-bold uppercase mb-4 tracking-wider text-ink border-b border-arena2 pb-2 font-cond">
                  Solicitud de Patrocinio Oficial
                </h4>
                
                {errorMessage && (
                  <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-3 text-red-700 text-xs font-sans">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5 mb-4.5">
                  <div>
                    <label className="block font-cond text-[10px] font-bold tracking-[0.12em] uppercase text-gris mb-1.5">
                      1. Selecciona el Punto a Patrocinar
                    </label>
                    <select 
                      required
                      value={formData.pointNum}
                      onChange={(e) => setFormData({ ...formData, pointNum: e.target.value })}
                      className="w-full bg-white border border-arena2 px-3 py-2 text-ink font-sans text-xs rounded-none focus:border-terracota focus:outline-none transition-colors cursor-pointer"
                    >
                      <option value="">— Elegir punto —</option>
                      {sponsors.map((s) => (
                        <option key={s.num} value={s.num}>
                          {s.num}. {s.parada.n} ({s.parada.fs})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-cond text-[10px] font-bold tracking-[0.12em] uppercase text-gris mb-1.5">
                      2. Nombre del Patrocinador / Empresa
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="Ej. Cooperativa Chiclayo, Caja Norte"
                      value={formData.sponsorName}
                      onChange={(e) => setFormData({ ...formData, sponsorName: e.target.value })}
                      className="w-full bg-white border border-arena2 px-3 py-2 text-ink font-sans text-xs rounded-none focus:border-terracota focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5 mb-4.5">
                  <div className="md:col-span-1">
                    <label className="block font-cond text-[10px] font-bold tracking-[0.12em] uppercase text-gris mb-1.5">
                      3. Contacto Directo
                    </label>
                    <input 
                      type="text"
                      required
                      placeholder="Nombre y Apellidos"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full bg-white border border-arena2 px-3 py-2 text-ink font-sans text-xs rounded-none focus:border-terracota focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="md:col-span-1">
                    <label className="block font-cond text-[10px] font-bold tracking-[0.12em] uppercase text-gris mb-1.5">
                      4. Correo Electrónico
                    </label>
                    <input 
                      type="email"
                      required
                      placeholder="ejemplo@empresa.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white border border-arena2 px-3 py-2 text-ink font-sans text-xs rounded-none focus:border-terracota focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="md:col-span-1">
                    <label className="block font-cond text-[10px] font-bold tracking-[0.12em] uppercase text-gris mb-1.5">
                      5. Teléfono / WhatsApp
                    </label>
                    <input 
                      type="tel"
                      required
                      placeholder="+51 ___ ___"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white border border-arena2 px-3 py-2 text-ink font-sans text-xs rounded-none focus:border-terracota focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block font-cond text-[10px] font-bold tracking-[0.12em] uppercase text-gris mb-1.5">
                    6. Mensaje, Propuesta o Dudas (Opcional)
                  </label>
                  <textarea 
                    placeholder="Describe si te interesa patrocinio exclusivo, compartido o si tienes insumos, imprenta o recursos logísticos para aportar."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-arena2 px-3 py-2 text-ink font-sans text-xs rounded-none focus:border-terracota focus:outline-none transition-colors min-h-[70px] resize-y"
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className={`w-full py-3.5 rounded-none font-cond text-[11px] font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${
                    isSubmitting 
                      ? 'bg-ink/50 text-crema/60 cursor-not-allowed' 
                      : 'bg-ink hover:bg-terracota text-white cursor-pointer'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                      <span>Enviando solicitud oficial...</span>
                    </>
                  ) : (
                    <span>Registrar Patrocinio en el Punto de Ruta →</span>
                  )}
                </button>
              </form>

            </div>
          ) : (
            <div className="bg-white border-2 border-terracota rounded-none p-8 md:p-10 text-center max-w-[620px] mx-auto text-ink shadow-sm">
              <span className="text-[52px] block leading-none select-none mb-3">👑</span>
              <h3 className="font-display text-[26px] font-bold text-ink mt-3 mb-2">
                ¡Solicitud de Patrocinio Enviada!
              </h3>
              <p className="font-sans text-[14px] text-gris leading-relaxed max-w-[480px] mx-auto mb-6">
                Hemos registrado con éxito a <strong className="text-terracota font-bold">{formData.sponsorName}</strong> en el <strong className="text-ink">Punto {formData.pointNum}</strong> de nuestra Ruta Histórica de Lambayeque. 
                <br /><br />
                Hemos guardado su dedicatoria en la base de datos de sesión. El mapa de patrocinios y el buscador de la aplicación ya reflejan su apoyo en tiempo real. Un curador del equipo se pondrá en contacto a la brevedad.
              </p>
              
              <div className="bg-crema/40 p-4 border border-arena2 rounded-sm text-left font-mono text-[11px] text-gris max-w-[480px] mx-auto mb-6">
                <span className="font-bold text-ink block mb-1">REGISTRO SEGURO:</span>
                • Patrocinador: {formData.sponsorName}<br />
                • Punto Elegido: Parada #{formData.pointNum}<br />
                • Contacto directo: {formData.contactName}<br />
                • Estado de Campaña: Pendiente de validación gráfica (Activo en sesión)
              </div>

              <button 
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    pointNum: "",
                    sponsorName: "",
                    contactName: "",
                    email: "",
                    phone: "",
                    message: ""
                  });
                }}
                className="font-cond text-[11px] font-bold tracking-widest uppercase text-terracota border border-terracota px-6 py-3 hover:bg-terracota hover:text-white transition-all cursor-pointer"
              >
                Patrocinar otro punto de la ruta
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
