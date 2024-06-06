"use client";

import { PostgresIcon } from "@/components/icons/postgres";
import { RedisIcon } from "@/components/icons/redis";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useEffect, useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState<{
    results: string[];
    duration: number;
  }>();
  const [source, setSource] = useState("redis");

  useEffect(() => {
    const fetchData = async () => {
      if (!input) return setSearchResults(undefined);

      // api call
      const res = await fetch(`https://rocket.subudhisuryakant.workers.dev/api/search?query=${input}&source=${source}`);
      // handle response

      //get data
      const data = (await res.json()) as {
        results: string[];
        duration: number;
      };

      setSearchResults(data);
    };

    fetchData();
  }, [input, source]);

  return (
    <main className="h-screen w-screen grainy">
      <div className="flex flex-col gap-6 items-center pt-32 duration-500 animate-in animate fade-in-5 slide-in-from-bottom-2.5">
        <h1 className="text-5xl tracking-tight font-bold">
          Rocket 🚀
        </h1>
        <p className="text-zinc-600 text-lg max-w-prose text-center">
          A high-performance, lightning-fast API bulit with Hono, Next.js and Clouldflare.
        </p>

        <div className="max-w-md w-full">
          <Command>
            <CommandInput 
              value={input}
              onValueChange={setInput}
              placeholder="Search countries...."
              className="placeholder:text-zinc-500"
            />
            <CommandList>
              {searchResults?.results.length === 0 ? (
                <CommandEmpty>No results.</CommandEmpty>
              ) : null}

              {searchResults?.results ? (
                <CommandGroup heading="Results">
                  {searchResults?.results.map((result) => (
                    <CommandItem key={result} value={result} onSelect={setInput}>
                      {result}
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : null}

              {/** display timing */}
              {searchResults?.results ? (
                <>
                  <div className="h-px w-full bg-zinc-200"/>
                  <p className="p-2 text-xs text-zinc-500">
                    Found {searchResults.results.length} results in {searchResults?.duration.toFixed(0)}ms
                  </p>
                </>
              ) : null}
            </CommandList>
          </Command>
        </div>
        {/**icons */}
        <p className="text-zinc-400 font-semibold text-sm ">Change adapter</p>
        <div className="flex gap-x-4">
        <Button 
            variant={source === "redis" ?  "outline" : "secondary" } 
            size="icon" 
            className="outline-none"
            onClick={() => setSource("redis")}
          >
            <RedisIcon width={30} height={30} />
          </Button>
          <Button 
            variant={source === "postgres" ? "outline" : "secondary"} 
            size="icon" 
            className="outline-none"
            onClick={() => setSource("postgres")}
          >
            <PostgresIcon width={30} height={30} />
          </Button>

        </div>
      </div>
    </main>
  );
}

