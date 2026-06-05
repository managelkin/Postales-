import React, { useState } from 'react';
import { RUTAS } from '../data/routesData';

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    phone: '',
    jornada: '',
    mensaje: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Collect all stops dynamically
  const allStops = Object.entries(RUTAS).flatMap(([routeId, route]) => 
    route.paradas.map(p => ({
      routeId,
      code: p.fs,
      dayType: p.b === 'vie' ? 'Vie' : p.b === 'sab' ? 'Sáb' : 'Esp',
      dateStr: `${p.dia} ${p.mes}`,
      name: p.n
    }))
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const response = await fetch("https://formsubmit.co/ajax/editor@postalesalpapa.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          "Nombre": formData.nombre,
          "Email": formData.email,
          "Teléfono/WhatsApp": formData.phone || "No especificado",
          "Jornada de Preferencia": formData.jornada,
          "Mensaje al Papa": formData.mensaje || "Sin mensaje",
          "_subject": `Inscripción León XIV - ${formData.nombre}`,
          "_template": "table"
        })
      });

      if (!response.ok) {
        throw new Error("Respuesta no satisfactoria del servidor");
      }

      setSubmitted(true);
    } catch (err: any) {
      console.error("Error al enviar el formulario:", err);
      setErrorMsg("Ocurrió un inconveniente al enviar la inscripción automáticamente. Por favor, vuelve a intentarlo o envía los datos por correo convencional.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-ink text-white border-b-3 border-terracota py-20 md:py-24 px-8 md:px-16 lg:px-24" id="inscripcion">
      <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left column info */}
        <div>
          <div className="border-t border-white/15 pt-3 flex items-center gap-4 mb-4">
            <span className="font-cond text-[12px] md:text-[13px] font-bold tracking-[0.2em] uppercase text-white/50 whitespace-nowrap">
              Participa
            </span>
            <span className="flex-1 max-w-[40px] h-[1px] bg-white/20"></span>
          </div>

          <h2 className="font-display text-[34px] md:text-[46px] font-light leading-[1.15] text-white mb-6">
            Tu postal puede <span className="italic text-terracota2 font-medium">llegar a Roma.</span>
          </h2>

          <p className="font-sans text-[18px] md:text-[20px] text-white/80 leading-relaxed max-w-[500px] mb-10 font-light">
            Inscríbete para reservar tu lugar en la jornada más cercana. La participación es gratuita y voluntaria. Recibirás tu postal impresa al instante.
          </p>

          <div className="space-y-6">
            <div className="info-item flex gap-6 border-t border-white/10 pt-6">
              <div className="font-display text-[38px] md:text-[42px] font-light text-terracota leading-none select-none">01</div>
              <div>
                <h3 className="font-display text-[20px] md:text-[22px] font-bold text-white mb-1.5">Elige tu fecha y punto</h3>
                <p className="font-sans text-[15px] md:text-[16px] text-white/70 leading-relaxed">Selecciona el fin de semana y el lugar de la Ruta de León donde quieres participar. Hay opciones en toda la región.</p>
              </div>
            </div>
            
            <div className="info-item flex gap-6 border-t border-white/10 pt-6">
              <div className="font-display text-[38px] md:text-[42px] font-light text-terracota leading-none select-none">02</div>
              <div>
                <h3 className="font-display text-[20px] md:text-[22px] font-bold text-white mb-1.5">Te fotografiamos</h3>
                <p className="font-sans text-[15px] md:text-[16px] text-white/70 leading-relaxed">Retrato profesional en 45 segundos. Recibes tu postal impresa con tu foto en el acto. Sin costo, sin condiciones.</p>
              </div>
            </div>

            <div className="info-item flex gap-6 border-t border-white/10 pt-6">
              <div className="font-display text-[38px] md:text-[42px] font-light text-terracota leading-none select-none">03</div>
              <div>
                <h3 className="font-display text-[20px] md:text-[22px] font-bold text-white mb-1.5">Escribes tu mensaje</h3>
                <p className="font-sans text-[15px] md:text-[16px] text-white/70 leading-relaxed">Tú decides qué decirle al Papa León XIV. Tu postal se archiva con cuidado y se envía con las 500 en noviembre de 2026.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right column form */}
        <div>
          {!submitted ? (
            <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-none border border-arena2 text-ink max-w-[540px] shadow-sm">
              <h4 className="text-sm font-bold uppercase mb-4 tracking-tighter text-ink border-b border-arena2 pb-2 font-cond">
                Formulario de Inscripción Ciudadana
              </h4>
              
              <div className="mb-5">
                <label className="block font-cond text-[10px] font-bold tracking-[0.14em] uppercase text-gris mb-2">
                  Nombre completo
                </label>
                <input 
                  type="text" 
                  required
                  disabled={isSubmitting}
                  placeholder="Tu nombre y apellido"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="w-full bg-white border border-arena2 px-4 py-2.5 text-ink font-sans text-xs rounded-none focus:border-terracota focus:outline-none transition-colors disabled:bg-gray-100 disabled:text-gray-400"
                />
              </div>

              <div className="mb-5">
                <label className="block font-cond text-[10px] font-bold tracking-[0.14em] uppercase text-gris mb-2">
                  Correo electrónico
                </label>
                <input 
                  type="email" 
                  required
                  disabled={isSubmitting}
                  placeholder="tu@correo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-white border border-arena2 px-4 py-2.5 text-ink font-sans text-xs rounded-none focus:border-terracota focus:outline-none transition-colors disabled:bg-gray-100 disabled:text-gray-400"
                />
              </div>

              <div className="mb-5">
                <label className="block font-cond text-[10px] font-bold tracking-[0.14em] uppercase text-gris mb-2">
                  Teléfono / WhatsApp
                </label>
                <input 
                  type="tel" 
                  disabled={isSubmitting}
                  placeholder="+51 ___ ___"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white border border-arena2 px-4 py-2.5 text-ink font-sans text-xs rounded-none focus:border-terracota focus:outline-none transition-colors disabled:bg-gray-100 disabled:text-gray-400"
                />
              </div>

              <div className="mb-5">
                <label className="block font-cond text-[10px] font-bold tracking-[0.14em] uppercase text-gris mb-2">
                  Jornada de preferencia
                </label>
                <select 
                  required
                  disabled={isSubmitting}
                  value={formData.jornada}
                  onChange={(e) => setFormData({ ...formData, jornada: e.target.value })}
                  className="w-full bg-white border border-arena2 px-4 py-2.5 text-ink font-sans text-xs rounded-none focus:border-terracota focus:outline-none transition-colors cursor-pointer disabled:bg-gray-100 disabled:text-gray-400"
                >
                  <option className="bg-white text-ink" value="">— Seleccione una fecha de la ruta —</option>
                  {allStops.map((stop, idx) => (
                    <option key={idx} className="bg-white text-ink p-2" value={`${stop.code} - ${stop.name}`}>
                      {stop.code} &middot; {stop.dayType} {stop.dateStr} — {stop.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label className="block font-cond text-[10px] font-bold tracking-[0.14em] uppercase text-gris mb-2">
                  ¿Qué le escribirías al Papa? (opcional)
                </label>
                <textarea 
                  placeholder="Tu mensaje o bendición para León XIV..."
                  disabled={isSubmitting}
                  value={formData.mensaje}
                  onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
                  className="w-full bg-white border border-arena2 px-4 py-2.5 text-ink font-sans text-xs rounded-none focus:border-terracota focus:outline-none transition-colors min-h-[90px] resize-y disabled:bg-gray-100 disabled:text-gray-400"
                />
              </div>

              {errorMsg && (
                <div id="registration-error-alert" className="mb-5 bg-amber-50 border border-amber-200 p-4 text-ink text-[12px] leading-relaxed">
                  <p className="font-bold text-amber-900 mb-1">⚠️ Error al enviar inscripción automática</p>
                  <p className="mb-3 text-amber-950 font-sans">{errorMsg}</p>
                  <p className="mb-2 text-ink">Para asegurar tu registro, por favor haz clic en el siguiente enlace para enviarlo usando tu correo habitual directamente a <strong className="text-black font-semibold">editor@postalesalpapa.com</strong>:</p>
                  <a
                    href={`mailto:editor@postalesalpapa.com?subject=Inscripcion%20en%20Ruta%20de%20Leon%20-%20${encodeURIComponent(formData.nombre)}&body=Nombre:%20${encodeURIComponent(formData.nombre)}%0AEmail:%20${encodeURIComponent(formData.email)}%0ATelefono:%20${encodeURIComponent(formData.phone)}%0AJornada:%20${encodeURIComponent(formData.jornada)}%0AMensaje:%20${encodeURIComponent(formData.mensaje)}`}
                    className="inline-block bg-amber-800 hover:bg-amber-950 text-white text-[10px] font-bold uppercase tracking-wider px-3.5 py-2 transition-colors cursor-pointer"
                  >
                    Enviar inscripción vía e-mail directo &rarr;
                  </a>
                </div>
              )}

              <button 
                type="submit" 
                disabled={isSubmitting}
                className={`w-full py-3 rounded-none font-cond text-[11px] font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${
                  isSubmitting 
                    ? 'bg-ink/50 text-crema/60 cursor-not-allowed' 
                    : 'bg-ink hover:bg-terracota text-white cursor-pointer'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                    <span>Enviando inscripción...</span>
                  </>
                ) : (
                  <span>Inscribirme en la Ruta de León →</span>
                )}
              </button>

              <p className="font-sans text-[12px] text-gris mt-4 leading-relaxed">
                Al inscribirte aceptas recibir comunicaciones del proyecto y que las fotografías tomadas durante el evento se expongan en el archivo papal. Recibirás tu postal impresa de regalo el día de tu toma.
              </p>
            </form>
          ) : (
            <div className="bg-white border border-terracota rounded-none p-8 text-center max-w-[540px] shadow-sm">
              <span className="font-display text-[48px] text-terracota">✉</span>
              <h3 className="font-display text-[24px] font-bold text-ink mt-4 mb-2">
                ¡Inscripción recibida!
              </h3>
              <p className="font-sans text-[13px] text-gris leading-relaxed max-w-[420px] mx-auto">
                Te confirmaremos los detalles de tu jornada por correo electrónico o WhatsApp.
                <br /><br />
                ¡Muchas gracias por sumarte a este hito! Tu voz, tu retrato y tu mensaje ahora forman parte del legado impreso de Lambayeque para el Papa León XIV.
              </p>
              <button 
                onClick={() => setSubmitted(false)}
                className="mt-6 font-cond text-[10px] font-bold tracking-widest uppercase text-terracota border border-terracota px-5 py-2.5 hover:bg-terracota hover:text-white transition-colors"
              >
                Inscribir otra persona
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
