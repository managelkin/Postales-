import { useState, useEffect } from 'react';
import rawPapaImg from '../assets/images/papa_leon_xiv_1780606539849.png';
import rawElkinImg from '../assets/images/elkin_cabarcas_mora_1780606554921.png';

// Función para resolver enlaces de assets de forma dinámica en WordPress
function resolveAsset(importedUrl: string): string {
  if (typeof window !== 'undefined' && (window as any).chiclayoThemeUrl) {
    const parts = importedUrl.split('/');
    const filename = parts[parts.length - 1];
    return `${(window as any).chiclayoThemeUrl}/dist/assets/${filename}`;
  }
  return importedUrl;
}

export const defaultPapaImg = "https://drive.google.com/file/d/13mUEwpHSWdYuTgrJzYcgpX8X1w8DdWl6/view?usp=sharing";
export const defaultElkinImg = resolveAsset(rawElkinImg);

export const MEDIA_KEYS = {
  PAPA: 'postales_papa_img',
  ELKIN: 'postales_elkin_img'
};

export function getStoredImage(key: string, fallback: string): string {
  try {
    const saved = localStorage.getItem(key);
    if (key === MEDIA_KEYS.PAPA && saved && (saved.includes('papa_leon_xiv') || saved.startsWith('data:image'))) {
      localStorage.removeItem(key);
      return fallback;
    }
    return saved || fallback;
  } catch (e) {
    return fallback;
  }
}

export function setStoredImage(key: string, dataUrl: string) {
  try {
    localStorage.setItem(key, dataUrl);
    // Dispatch custom event to trigger crosscheck across separate components instantly
    window.dispatchEvent(new CustomEvent('media_store_update', { detail: { key, value: dataUrl } }));
  } catch (e) {
    console.warn('Storage permission issue or quota exceeded', e);
  }
}

export function resetStoredImages() {
  localStorage.removeItem(MEDIA_KEYS.PAPA);
  localStorage.removeItem(MEDIA_KEYS.ELKIN);
  window.dispatchEvent(new CustomEvent('media_store_update', { detail: { reset: true } }));
}

export function useStoredImage(key: string, defaultSrc: string) {
  const [src, setSrc] = useState(() => getStoredImage(key, defaultSrc));

  useEffect(() => {
    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail) {
        if (customEvent.detail.reset) {
          setSrc(defaultSrc);
        } else if (customEvent.detail.key === key) {
          setSrc(customEvent.detail.value);
        }
      }
    };

    window.addEventListener('media_store_update', handleUpdate);
    return () => window.removeEventListener('media_store_update', handleUpdate);
  }, [key, defaultSrc]);

  return [src, (newVal: string) => setStoredImage(key, newVal)] as const;
}

export function isInternalProduction(): boolean {
  try {
    return (
      import.meta.env.DEV || 
      window.location.hostname.includes('localhost') || 
      window.location.hostname.includes('-dev-') || 
      window.location.search.includes('editor=true')
    );
  } catch (e) {
    return false;
  }
}
