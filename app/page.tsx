"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {

  const [input, setinput] = useState("");
  const [searchResults, setSearchResults] = useState<{ 
    results: string[] 
    duration: number
}>();

useEffect(() => {
  const fetchData = async () => {
    if(!input) return setSearchResults(undefined);

    //api call
    const res = await fetch(`/api/search?query=${input}`
    );

    

  };

  fetchData();
}, [input]);

  return (
   <div>
     <input value={input} onChange={(e) => {
      setinput(e.target.value)
     }} type="text" />
   </div>
  );
}
