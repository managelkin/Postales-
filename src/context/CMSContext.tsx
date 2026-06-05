import React, { createContext, useContext, useState, useEffect } from 'react';
import { Postal } from '../types';
import { POSTALES } from '../data/postalesData';

interface CMSContextType {
  isAdmin: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  postales: Postal[];
  setPostales: React.Dispatch<React.SetStateAction<Postal[]>>;
  updatePostal: (num: string, updatedFields: Partial<Postal>) => void;
  addPostal: (newPostal: Postal) => void;
  deletePostal: (num: string) => void;
}

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export function CMSProvider({ children }: { children: React.ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('chiclayo_admin_active') === 'true';
    }
    return false;
  });

  const [postales, setPostales] = useState<Postal[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('chiclayo_user_postales');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            // Automatically upgrade the postals to the newly requested Google Drive image links
            return parsed.map(p => {
              const original = POSTALES.find(o => o.num === p.num);
              if (original && (p.foto.includes('postal_') || p.foto === '')) {
                return { ...p, foto: original.foto };
              }
              return p;
            });
          }
          return parsed;
        } catch (e) {
          console.error('Error loading saved postales', e);
        }
      }
      // Fallback to wordpress live data or hardcoded mock data
      if ((window as any).wordpressPostalesData) {
        return (window as any).wordpressPostalesData;
      }
    }
    return POSTALES;
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('chiclayo_user_postales', JSON.stringify(postales));
      } catch (e) {
        console.warn('Unable to save postales to localStorage (quota exceeded or storage disabled):', e);
      }
    }
  }, [postales]);

  const login = (email: string, pass: string): boolean => {
    if (email.trim().toLowerCase() === 'managelkin@gmail.com' && pass === 'Desarrollo25%') {
      setIsAdmin(true);
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('chiclayo_admin_active', 'true');
        } catch (e) {
          console.warn('Unable to save admin status in localStorage:', e);
        }
      }
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('chiclayo_admin_active');
    }
  };

  const updatePostal = (num: string, updatedFields: Partial<Postal>) => {
    setPostales((prev) =>
      prev.map((p) => {
        if (p.num === num) {
          return { ...p, ...updatedFields };
        }
        return p;
      })
    );
  };

  const addPostal = (newPostal: Postal) => {
    setPostales((prev) => {
      // Avoid duplicate sequence numbers by ensuring they are unique or sequentially next
      if (prev.some((p) => p.num === newPostal.num)) {
        // If already exists, find next max number
        const nums = prev.map((p) => parseInt(p.num, 10)).filter((n) => !isNaN(n));
        const nextNumVal = nums.length > 0 ? Math.max(...nums) + 1 : prev.length + 1;
        const formatted = String(nextNumVal).padStart(3, '0');
        return [...prev, { ...newPostal, num: formatted }];
      }
      return [...prev, newPostal];
    });
  };

  const deletePostal = (num: string) => {
    setPostales((prev) => prev.filter((p) => p.num !== num));
  };

  return (
    <CMSContext.Provider
      value={{
        isAdmin,
        login,
        logout,
        postales,
        setPostales,
        updatePostal,
        addPostal,
        deletePostal,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
}
