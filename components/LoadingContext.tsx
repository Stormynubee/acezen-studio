'use client';

import { createContext, useContext, useState, ReactNode, useMemo } from 'react';

interface LoadingContextType {
    progress: number;
    incrementLoaded: () => void;
    setTotal: (count: number) => void;
    isComplete: boolean;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
    const [loadedCount, setLoadedCount] = useState(0);
    const [totalAssets, setTotalAssets] = useState(1);

    const progress = useMemo(() => {
        if (totalAssets === 0) return 0;
        return Math.min(Math.round((loadedCount / totalAssets) * 100), 100);
    }, [loadedCount, totalAssets]);

    const incrementLoaded = () => setLoadedCount(prev => prev + 1);

    const value = useMemo(() => ({
        progress,
        incrementLoaded,
        setTotal: setTotalAssets,
        isComplete: progress >= 100
    }), [progress]);

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    const context = useContext(LoadingContext);
    if (!context) return { progress: 0, incrementLoaded: () => { }, setTotal: () => { }, isComplete: false };
    return context;
}
