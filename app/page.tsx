"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState<{
    results: string[];
    duration: number;
  }>();

  useEffect(() => {
    const fetchData = async () => {
      if (!input) return setSearchResults(undefined);

      // api call
      const res = await fetch(`/api/search?query=${input}`);
      // handle response
    };

    fetchData();
  }, [input]);

  return (
    <main className="h-screen w-screen grainy">
      <div className="flex flex-col gap-6 items-center pt-32 duration-500 animate-in animate fade-in-5 slide-in-from-bottom-2.5">
        <h1 className="text-5xl tracking-tight font-bold">
          Rocket 🚀
        </h1>
        <p className="text-zinc-600 text-lg max-w-prose text-center">
          A high-performance, lightning-fast API bulit with Hono, Next.js and Clouldflare.
        </p>
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          type="text"
          className="text-zinc-700"
        />
      </div>
    </main>
  );
}
