'use client';

import { useState } from 'react';

export default function HomePage() {
  const [name, setName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setError(null);

    const res = await fetch('/api/domains', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message);
      return;
    }

    window.location.href = `https://${name}.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`;
  };

  return (
    <main className="flex h-screen items-center justify-center">
      <div className="space-y-3 w-[360px]">
        <h1 className="text-xl font-bold">Create subdomain</h1>

        <input
          className="border px-3 py-2 w-full"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          className="bg-black text-white w-full py-2"
          onClick={submit}
        >
          Create
        </button>
      </div>
    </main>
  );
}
