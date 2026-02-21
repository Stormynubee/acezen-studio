'use client';

import { useEffect } from 'react';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error("CAUGHT FATAL APP CRASH:", error);
    }, [error]);

    return (
        <div className="min-h-screen bg-black text-red-500 p-8 flex flex-col items-start justify-center font-mono z-[99999] relative">
            <h2 className="text-4xl font-bold mb-4">CRITICAL PRODUCTION CRASH</h2>
            <p className="text-xl mb-8">Next.js failed to render the page on the client.</p>

            <div className="bg-zinc-900 p-6 rounded-lg w-full max-w-4xl overflow-auto border border-red-500/30">
                <h3 className="text-white text-lg font-bold mb-2">Error Message:</h3>
                <p className="text-red-400 mb-6">{error.message || "Unknown error message"}</p>

                <h3 className="text-white text-lg font-bold mb-2">Stack Trace:</h3>
                <pre className="text-zinc-400 text-sm whitespace-pre-wrap leading-relaxed">
                    {error.stack || "No stack trace available"}
                </pre>

                {error.digest && (
                    <div className="mt-4 pt-4 border-t border-red-500/20">
                        <h3 className="text-white text-sm font-bold">Digest ID:</h3>
                        <p className="text-zinc-400 text-xs">{error.digest}</p>
                    </div>
                )}
            </div>

            <button
                onClick={() => reset()}
                className="mt-8 px-6 py-3 bg-red-600 text-white rounded font-bold hover:bg-red-500 transition-colors"
            >
                Attempt Recovery
            </button>
        </div>
    );
}
