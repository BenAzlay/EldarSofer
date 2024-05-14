"use client"; // This is a client component
import { useRef } from "react";
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown } from "react-feather";

export default function Home() {
  const myRef = useRef(null);

  const executeScroll = () => myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const firstPane = () => (
      <div className="flex min-h-screen flex-col text-center items-center justify-center p-24 relative text-white">
        <h1 className="font-bold text-5xl">
          Wisdom for the 21st century{" "}
        </h1>
        <h2 className="mt-4">Tales by Eldar Sofer</h2>
        <div onClick={executeScroll} className="scrollWidget absolute bottom-6 cursor-pointer flex flex-col items-center">
          <p>Dive in</p>
          <ArrowDown className="arrow" />
        </div>
      </div>
  );

  const secondPane = () => (
      <div ref={myRef} className="min-h-screen text-start p-24">
        <h2 className="font-bold text-2xl">
          <span>Crafting Wisdom adapted to{" "}</span>
          <TypeAnimation
            sequence={[
              'the Information Age',
              1000,
              'Artificial Intelligence',
              1000,
              'Blockchain',
              1000,
              'Mass Media',
              1000
            ]}
            wrapper="span"
            speed={50}
            style={{}}
            repeat={Infinity}
          />
        </h2>
        <p>We live in an age full of intelligence: artificial intelligence, smart phones, smart cars, smart homes etc. But where is the <span className="italic">wisdom</span>?</p>
        <p>Technology evolved too fast, and wisdom didn't catch up yet. It's about time it does. Why?</p>
        <p>Tools like internet, AI or blockchain can bring us together, make us smart, safeguard our freedoms, but they can just as well create a dystopic future</p>
        <p>It will all depend what we, the humans, make of them. Our intelligence creates the tools, and our wisdom should dictate how we use them.</p>

        <p>
          Around the 5th century BCE, something major happened: most of the world wisdom was written down. Everywhere, and all at once.
          In Greece, Socrates and Plato gave birth to Western philosophy; in Babylon, the exiled Judeans wrote the Torah; in Iran, Zarathustra was teaching the Avesta;
          In India, the great Hindu epics were written; in China, Confucius and Laozi shaped Chinese thought for milennia to come...
          This 5th century wisdom explosion event is called the Axial Period.
          What Socrates, Zarathustra or Laozi wrote still applies today, but they didn't have the internet, or AI, or globalization.
          So now is the time for the Axial Period 2.0! We should not replace ancient wisdom, but update it.
          Through my tales, I hope to contribute to this Axial Period 2.0.
          
        </p>
      </div>
  );

  return (
    <main className="bg-gradient-to-tr from-purple-600 to-blue-500">
      {firstPane()}
      {secondPane()}
    </main>
  );
}
