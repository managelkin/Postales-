import React from 'react';
import Navigation from './components/Navigation';
import Ticker from './components/Ticker';
import Hero from './components/Hero';
import SponsorBar from './components/SponsorBar';
import Manifesto from './components/Manifesto';
import Postales from './components/Postales';
import RoutesTabs from './components/RoutesTabs';
import Sponsorship from './components/Sponsorship';
import RegistrationForm from './components/RegistrationForm';
import Footer from './components/Footer';
import { CMSProvider } from './context/CMSContext';

export default function App() {
  React.useEffect(() => {
    // Elegant fallback tracking of both URL path or traditional stable standard hashtags
    const hash = window.location.hash;
    const pathsToIds: Record<string, string> = {
      '#proyecto': 'proyecto',
      '#postales': 'postales',
      '#ruta': 'ruta',
      '#patrocinios': 'patrocinios',
      '#inscripcion': 'inscripcion',
      '/proyecto': 'proyecto',
      '/postales': 'postales',
      '/ruta': 'ruta',
      '/patrocinios': 'patrocinios',
      '/inscripcion': 'inscripcion',
    };
    
    const token = hash || window.location.pathname;
    const targetId = pathsToIds[token] || pathsToIds[token.replace(/\/$/, '')];
    
    if (targetId) {
      const timer = setTimeout(() => {
        const el = document.getElementById(targetId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <CMSProvider>
      <div className="min-h-screen bg-white max-w-[1280px] mx-auto flex flex-col justify-between selection:bg-terracota selection:text-white antialiased border-x border-arena2/80 shadow-[0_0_30px_rgba(0,0,0,0.02)]">
        {/* Editorial Navigation */}
        <Navigation />
        
        {/* Infinite scrolling information ticker */}
        <Ticker />
        
        {/* Main Front Page Hero */}
        <Hero />
        
        {/* Sponsor information bar */}
        <SponsorBar />
        
        {/* Manifesto of the project and 4-step instruction block with hover inversion */}
        <Manifesto />
        
        {/* Interactive exhibition of the 21 PILOT postales */}
        <Postales />
        
        {/* 27 Stops tab navigation router */}
        <RoutesTabs />

        {/* 27 Stops Sponsorship system and search engine */}
        <Sponsorship />
        
        {/* Formal registration in a dark layout */}
        <RegistrationForm />
        
        {/* Editorial Footer */}
        <Footer />
      </div>
    </CMSProvider>
  );
}
