import React, { useState, useEffect } from 'react';
import { useCMS } from '../context/CMSContext';

// WMO weather code dictionary to human readable spanish & emojis
function getWeatherDescription(code: number): { text: string; icon: string } {
  switch (code) {
    case 0:
      return { text: 'Despejado', icon: '☀️' };
    case 1:
    case 2:
    case 3:
      return { text: 'Parcialmente nublado', icon: '⛅' };
    case 45:
    case 48:
      return { text: 'Niebla', icon: '🌫️' };
    case 51:
    case 53:
    case 55:
      return { text: 'Llovizna', icon: '🌧️' };
    case 61:
    case 63:
    case 65:
      return { text: 'Lluvia', icon: '🌧️' };
    case 80:
    case 81:
    case 82:
      return { text: 'Chubascos', icon: '🌦️' };
    default:
      return { text: 'Templado', icon: '☁️' };
  }
}

export default function Navigation() {
  const [time, setTime] = useState<Date>(new Date());
  const [weather, setWeather] = useState<{ temp: number; text: string; icon: string } | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { isAdmin, login, logout } = useCMS();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(loginEmail, loginPassword);
    if (success) {
      setShowLoginModal(false);
      setLoginError('');
      setLoginEmail('');
      setLoginPassword('');
    } else {
      setLoginError('Usuario o contraseña incorrectos.');
    }
  };

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch real-time weather for Chiclayo, Peru (Lat: -6.7714, Lon: -79.8441)
  useEffect(() => {
    async function fetchWeather() {
      try {
        const res = await fetch(
          'https://api.open-meteo.com/v1/forecast?latitude=-6.7714&longitude=-79.8441&current_weather=true'
        );
        if (res.ok) {
          const data = await res.json();
          const temp = Math.round(data.current_weather.temperature);
          const info = getWeatherDescription(data.current_weather.weathercode);
          setWeather({ temp, text: info.text, icon: info.icon });
        } else {
          // Soft default for Chiclayo (known for persistent warm pleasant breeze)
          setWeather({ temp: 21, text: 'Algo nublado', icon: '☁️' });
        }
      } catch (e) {
        console.warn('Weather connection skipped, loading standard default:', e);
        setWeather({ temp: 21, text: 'Algo nublado', icon: '☁️' });
      }
    }
    fetchWeather();
    
    // Refresh weather every 10 minutes
    const weatherTimer = setInterval(fetchWeather, 600000);
    return () => clearInterval(weatherTimer);
  }, []);

  // Format date and time
  const optionsDate: Intl.DateTimeFormatOptions = { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric' 
  };
  const formattedDate = time.toLocaleDateString('es-PE', optionsDate).replace('.', '').toLowerCase();
  const formattedTime = time.toLocaleTimeString('es-PE', { hour12: true });

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetEl = document.getElementById(targetId);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.history.pushState(null, '', `#${targetId}`);
    }
  };

  const handleMobileNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    // Slight delay to allow drawer closing animation
    setTimeout(() => {
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        window.history.pushState(null, '', `#${targetId}`);
      }
    }, 150);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b-2 border-ink">
      {/* Top Editorial Bar */}
      <div className="bg-ink text-crema text-[10px] uppercase tracking-widest px-4 md:px-8 lg:px-10 py-1.5 flex justify-between items-center font-cond border-b border-white/10 select-none">
        <span className="flex items-center gap-1.5 font-mono text-[9px] text-[#FAF9F5] tracking-widest">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
          <span>{formattedDate} &middot; {formattedTime}</span>
        </span>
        <span className="text-white/60 hidden lg:inline text-[9px] font-cond">
          {weather ? (
            <span className="flex items-center gap-1">
              Chiclayo: <strong className="text-white">{weather.temp}°C</strong> {weather.icon} <span className="opacity-75">({weather.text})</span>
            </span>
          ) : (
            <span>Obteniendo clima de Chiclayo...</span>
          )}
        </span>
        
        <div className="flex items-center gap-4">
          {isAdmin ? (
            <div className="flex items-center gap-2">
              <span className="text-[9px] text-emerald-400 font-mono uppercase bg-emerald-950/40 border border-emerald-500/20 px-1.5 py-0.2 rounded-xs select-none">
                🔑 CMS ACTIVO
              </span>
              <button 
                onClick={logout} 
                className="text-[#ff9b9b] hover:text-[#ffb3b3] hover:underline font-mono text-[9px] uppercase tracking-wider cursor-pointer"
              >
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <span className="text-[9px] font-mono text-white/30 hidden sm:inline">06°46′S &rarr; 41°54′N</span>
          )}
          {isAdmin && <span className="text-[9px] font-mono text-white/30 hidden sm:inline">&nbsp;| &nbsp;06°46′S &rarr; 41°54′N</span>}
        </div>
      </div>
      
      {/* Main Navigation Bar */}
      <div className="flex items-center justify-between px-4 md:px-8 lg:px-10 h-[52px]">
        <a 
          href="#" 
          onClick={(e) => {
            e.preventDefault();
            window.history.pushState(null, '', '#');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display text-[15px] xs:text-[17px] sm:text-[20px] md:text-[22px] font-black text-ink tracking-tight hover:opacity-90 transition-opacity"
        >
          Postales al <span className="text-terracota italic font-semibold">Papa León XIV</span>
        </a>
        
        <ul className="hidden md:flex items-center gap-7 list-none">
          <li>
            <a 
              href="#proyecto" 
              onClick={(e) => handleNavClick(e, 'proyecto')}
              className="font-cond text-[12px] font-semibold tracking-wider uppercase text-ink2 hover:text-terracota transition-colors"
            >
              El proyecto
            </a>
          </li>
          <li>
            <a 
              href="#postales" 
              onClick={(e) => handleNavClick(e, 'postales')}
              className="font-cond text-[12px] font-semibold tracking-wider uppercase text-ink2 hover:text-terracota transition-colors"
            >
              21 postales
            </a>
          </li>
          <li>
            <a 
              href="#ruta" 
              onClick={(e) => handleNavClick(e, 'ruta')}
              className="font-cond text-[12px] font-semibold tracking-wider uppercase text-ink2 hover:text-terracota transition-colors"
            >
              La ruta
            </a>
          </li>
          <li>
            <a 
              href="#patrocinios" 
              onClick={(e) => handleNavClick(e, 'patrocinios')}
              className="font-cond text-[12px] font-semibold tracking-wider uppercase text-ink2 hover:text-terracota transition-colors border-b border-dashed border-terracota/30 pb-0.5"
            >
              Patrocina
            </a>
          </li>

          <li>
            <a 
              href="#inscripcion" 
              onClick={(e) => handleNavClick(e, 'inscripcion')}
              className="bg-terracota text-white hover:bg-ink hover:text-white px-4 py-1.5 rounded-sm font-cond text-[11px] font-semibold tracking-wider uppercase transition-colors"
            >
              Participar
            </a>
          </li>
        </ul>

        {/* Mobile menu CTA and Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <a 
            href="#inscripcion" 
            onClick={(e) => handleNavClick(e, 'inscripcion')}
            className="bg-terracota text-white hover:bg-ink px-3 py-1.5 rounded-sm font-cond text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase transition-colors"
          >
            Participar
          </a>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 bg-crema border border-ink text-ink font-bold text-sm cursor-pointer select-none rounded-xs flex items-center justify-center w-8 h-8"
            aria-label="Abrir menú"
          >
            {isMobileMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Premium Full-Screen Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-[84px] inset-x-0 bottom-0 bg-ink/95 backdrop-blur-md z-40 flex flex-col justify-start p-8 animate-fade-in pb-12 overflow-y-auto">
          <ul className="flex flex-col gap-6 list-none text-center">
            <li>
              <a 
                href="#proyecto" 
                onClick={(e) => handleMobileNavClick(e, 'proyecto')}
                className="block font-display text-[22px] font-light text-crema hover:text-terracota transition-colors py-1"
              >
                El proyecto
              </a>
            </li>
            <li>
              <a 
                href="#postales" 
                onClick={(e) => handleMobileNavClick(e, 'postales')}
                className="block font-display text-[22px] font-light text-crema hover:text-terracota transition-colors py-1"
              >
                21 postales
              </a>
            </li>
            <li>
              <a 
                href="#ruta" 
                onClick={(e) => handleMobileNavClick(e, 'ruta')}
                className="block font-display text-[22px] font-light text-crema hover:text-terracota transition-colors py-1"
              >
                La ruta
              </a>
            </li>
            <li>
              <a 
                href="#patrocinios" 
                onClick={(e) => handleMobileNavClick(e, 'patrocinios')}
                className="block font-display text-[22px] font-light text-crema hover:text-terracota transition-colors py-1 text-terracota"
              >
                Patrocina un punto
              </a>
            </li>
            <li className="pt-4 border-t border-white/10 mt-2">
              <a 
                href="#inscripcion" 
                onClick={(e) => handleMobileNavClick(e, 'inscripcion')}
                className="inline-block bg-terracota hover:bg-white hover:text-ink text-white font-cond text-[13px] font-bold tracking-widest uppercase px-8 py-3.5 w-full rounded-sm shadow-sm transition-all"
              >
                Inscribirme gratis
              </a>
            </li>

            {/* Mobile login indicators */}
            {isAdmin && (
              <li className="pt-4 border-t border-white/10 flex flex-col items-center gap-2">
                <span className="font-mono text-[10px] text-emerald-400 uppercase tracking-widest bg-emerald-950/40 border border-emerald-500/20 px-2.5 py-1 rounded-2xs">
                  🔑 CMS ACTIVO
                </span>
                <button 
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-red-400 hover:text-red-300 font-mono text-[12px] uppercase tracking-wider underline py-1 cursor-pointer"
                >
                  Cerrar Sesión Admin
                </button>
              </li>
            )}
          </ul>

          <div className="mt-auto pt-8 text-center font-mono text-[9px] text-white/40 tracking-wider">
            LAMBAYEQUE DE CARA AL CENTENARIO &middot; 2026
          </div>
        </div>
      )}

      {/* High-Fidelity Design Editorial Login Modal */}
      {showLoginModal && (
        <div 
          className="fixed inset-0 bg-ink/75 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in"
          onClick={() => setShowLoginModal(false)}
        >
          <div 
            className="bg-white border-2 border-ink max-w-sm w-full p-6 relative rounded-xs shadow-[0_12px_45px_rgba(0,0,0,0.2)]" 
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center border-b border-ink/10 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-terracota animate-pulse"></span>
                <span className="font-display text-[15px] font-bold text-ink uppercase tracking-wide">
                  Acceso Administrativo CMS
                </span>
              </div>
              <button 
                onClick={() => setShowLoginModal(false)}
                className="text-ink/60 hover:text-ink hover:scale-110 transition-transform font-bold text-lg cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Description */}
            <p className="font-serif text-[11px] text-gris mb-4 leading-relaxed">
              Ingrese sus credenciales de administrador para activar las herramientas de edición de contenidos, fotos, portadas y catalogación de postales.
            </p>

            {/* Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block font-cond text-[10px] font-bold text-ink/70 uppercase tracking-wider mb-1">
                  Usuario o Correo Electrónico:
                </label>
                <input
                  type="email"
                  required
                  placeholder="ejemplo@correo.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full border border-ink/20 px-3 py-2 text-xs bg-white rounded-2xs focus:border-[#1a3b68] outline-none transition-colors font-mono"
                />
              </div>

              <div>
                <label className="block font-cond text-[10px] font-bold text-ink/70 uppercase tracking-wider mb-1">
                  Contraseña de Seguridad:
                </label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full border border-ink/20 px-3 py-2 text-xs bg-white rounded-2xs focus:border-[#1a3b68] outline-none transition-colors font-mono"
                />
              </div>

              {loginError && (
                <div className="p-2 border border-red-200 bg-red-50 text-red-700 font-mono text-[9.5px] leading-relaxed rounded-2xs">
                  ❌ {loginError}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex justify-end gap-3.5">
                <button
                  type="button"
                  onClick={() => setShowLoginModal(false)}
                  className="px-3.5 py-1.5 border border-ink/10 hover:border-ink/60 text-[9px] font-bold uppercase tracking-widest rounded-3xs transition-colors cursor-pointer text-ink/70"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-ink text-white hover:bg-terracota text-[9px] font-bold uppercase tracking-widest rounded-3xs transition-colors cursor-pointer"
                >
                  Iniciar Sesión
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
}
