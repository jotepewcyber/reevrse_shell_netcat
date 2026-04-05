

'use client';
import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function CTFContent() {
  const searchParams = useSearchParams();
  const cmd = searchParams.get('cmd');

  useEffect(() => {
    if (!cmd || cmd.length === 0) return;

    const run = async () => {
      try {
        const res = await fetch(`/api/connect?cmd=${encodeURIComponent(cmd)}`);
        const text = await res.text();
        if (text.length === 0) alert('No output returned');
        else alert(`\n\nOutput:\n${text}`);
      } catch (error) {
        alert('Error executing command');
      }
    };

    run();
  }, [cmd]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#031023] text-green-400 font-mono">
      <p className="text-lg tracking-widest">
        {cmd ? "Executing..." : "Waiting for command..."}
      </p>
    </div>
  );
}

export default function CTFPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#031023] text-green-400 font-mono">
        <p className="text-lg tracking-widest">Loading...</p>
      </div>
    }>
      <CTFContent />
    </Suspense>
  );
}