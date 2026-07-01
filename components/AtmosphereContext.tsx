'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';

type AtmosphereState = {
  vfxDensity: number; // 0 to 1
  mood: number; // 0 (Cold Blue) to 1 (Warm Gold)
  motionFidelity: number; // 0 (Brutal) to 1 (Liquid)
  isActive: boolean;
};

type AtmosphereContextType = AtmosphereState & {
  setVfxDensity: (val: number) => void;
  setMood: (val: number) => void;
  setMotionFidelity: (val: number) => void;
  setIsActive: (val: boolean) => void;
  reset: () => void;
};

const defaultState: AtmosphereState = {
  vfxDensity: 0.4,
  mood: 0.5,
  motionFidelity: 0.6,
  isActive: false,
};

const AtmosphereContext = createContext<AtmosphereContextType | undefined>(undefined);

export function AtmosphereProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AtmosphereState>(defaultState);

  const setVfxDensity = useCallback((vfxDensity: number) => setState(s => ({ ...s, vfxDensity })), []);
  const setMood = useCallback((mood: number) => setState(s => ({ ...s, mood })), []);
  const setMotionFidelity = useCallback((motionFidelity: number) => setState(s => ({ ...s, motionFidelity })), []);
  const setIsActive = useCallback((isActive: boolean) => setState(s => ({ ...s, isActive })), []);
  const reset = useCallback(() => setState(defaultState), []);

  // Sync state to CSS Variables
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--vfx-density', state.vfxDensity.toString());
    root.style.setProperty('--atmosphere-mood', state.mood.toString());
    root.style.setProperty('--motion-fidelity', state.motionFidelity.toString());
    
    // Interpolate accent color
    const gold = { r: 200, g: 169, b: 126 };
    const blue = { r: 74, g: 127, b: 212 };
    const r = Math.round(blue.r + (gold.r - blue.r) * state.mood);
    const g = Math.round(blue.g + (gold.g - blue.g) * state.mood);
    const b = Math.round(blue.b + (gold.b - blue.b) * state.mood);
    root.style.setProperty('--az-accent', `rgb(${r}, ${g}, ${b})`);
  }, [state.vfxDensity, state.mood, state.motionFidelity]);

  const value = useMemo(() => ({
    ...state,
    setVfxDensity,
    setMood,
    setMotionFidelity,
    setIsActive,
    reset,
  }), [state, setVfxDensity, setMood, setMotionFidelity, setIsActive, reset]);

  return (
    <AtmosphereContext.Provider value={value}>
      {children}
    </AtmosphereContext.Provider>
  );
}

export function useAtmosphere() {
  const context = useContext(AtmosphereContext);
  if (!context) throw new Error('useAtmosphere must be used within AtmosphereProvider');
  return context;
}
