"use client"; // This is a client component
import { useRef } from "react";
import { ArrowDown } from "react-feather";

export default function Home() {
  const myRef = useRef(null);

  const executeScroll = () => myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

  return (
    <main>
      <div className="flex min-h-screen flex-col text-center items-center justify-center p-24 bg-gradient-to-r from-purple-600 to-blue-400 relative">
        <h1 className="font-bold text-5xl">Wisdom for the 21st century</h1>
        <h2 className="mt-4">Tales by Eldar Sofer</h2>
        <div onClick={executeScroll} className="scrollWidget absolute bottom-6 cursor-pointer flex flex-col items-center">
          <p>Dive in</p>
          <ArrowDown className="arrow" />
        </div>
      </div>
      <div ref={myRef} className="flex min-h-screen flex-col items-center justify-between p-24">
        And more!
      </div>
    </main>
  );
}
