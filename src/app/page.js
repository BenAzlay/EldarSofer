"use client"; // This is a client component
import { useEffect, useMemo, useRef, useState } from "react";
import { TypeAnimation } from 'react-type-animation';
import { ArrowDown } from "react-feather";
import Image from "next/image";
import MasterGuziCover from "@/app/assets/Niu3.png";

export default function Home() {
  const myRef = useRef(null);

  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollWidgetVisible = useMemo(() => scrollPosition <= 20, [scrollPosition]);

  const executeScroll = () => myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });

  const scrollWidget = () => (
    <div
      onClick={executeScroll}
      style={{ visibility: scrollWidgetVisible ? "visible" : "hidden", opacity: scrollWidgetVisible ? 1 : 0 }}
      className="scrollWidget absolute bottom-6 cursor-pointer flex flex-col items-center"
    >
      <p>Dive in</p>
      <ArrowDown className="arrow" />
    </div>
  );

  const firstPane = () => (
    <div className="flex min-h-screen flex-col text-center items-center justify-center p-1 relative text-white">
      <h1 className="font-bold text-5xl">
        Wisdom for the 21st century{" "}
      </h1>
      <h2 className="mt-4">Stories by Eldar Sofer</h2>
      {scrollWidget()}
    </div>
  );

  const secondPane = () => (
    <div ref={myRef} className="text-start p-2 md:p-8 lg:p-12">
      <h2 className="font-bold text-2xl mb-8">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="textBox">
          <h3 id="title">Why?</h3>
          <p>We live in an age full of intelligence: artificial intelligence, smart phones, smart cars, smart homes etc. But where is the <span className="italic">wisdom</span>?</p>
          <p>
            Technology evolved too fast, and wisdom didn't catch up yet. It's about time it does.
            Tools like internet, AI or blockchain can bring us together, make us smart, safeguard our freedoms, but they can just as well create a dystopic future.
            It will all depend what we, the humans, make of them. Our intelligence creates the tools, and our wisdom should dictate how we use them.
          </p>
        </div>
        <div className="textBox">
          <h3 id="title">How?</h3>
          <p>
            I write stories, because they put emotion and soul on otherwise cold ideas.
            They say an image is worth a thousand word; I say a story is worth a thousand maxims.
            From one story, we each can draw our own unique interpretations and lessons that resonate with us.
            If the Ancients crafted myths to vehicule wisdom that was passed down countless generations, it's because stories are so powerful.
            My tales are aimed at being like those myths, drawing new lessons from old times.
          </p>
        </div>
        <div className="textBox">
          <h3 id="title">Time for Axial Age 2.0</h3>
          <p>
            Around the 5th century BCE, something major happened: most of the world wisdom was written down. Everywhere, and all at once.
            In Greece, Socrates and Plato gave birth to Western philosophy; in Babylon, the exiled Judeans wrote the Torah; in Iran, Zarathustra was teaching the Avesta;
            In India, the great Hindu epics were written and the Buddha came; in China, Confucius and Laozi shaped Chinese thought for milennia to come...
            This 5th century wisdom explosion event is called the Axial Age.
            What Socrates, Zarathustra or Laozi wrote still applies today, but they didn't have the internet, or AI, or globalization.
            So now is the time for the Axial Age 2.0! We should not replace ancient wisdom, but update it.
            Through my tales, I hope to contribute to this Axial Age 2.0.
          </p>
        </div>
      </div>

    </div>
  );

  const thirdPane = () => (
    <div className="min-h-screen text-start p-2 md:p-8 lg:p-12">
      <h2 className="font-bold text-2xl mb-1">Read my stories</h2>
      <p className="text-gray-100 mb-8">A few stories I can share. More are on the way...</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="book-container">
          <div className="book">
            <div className="book-front">
              <div className="stitches">
                <Image className="book-img" src={MasterGuziCover} alt="master_guzi_cover" />
                <div>
                  <h1 className="book-title">Master Guzi</h1>
                  <h2 className="book-author">Eldar Sofer</h2>
                </div>
              </div>
            </div>
            <div className="book-back">
              <div className="stitches">
                <p className="book-summary">
                  In Ancient China, renowned master Guzi can give pilgrims anything they desire.
                  A potion to cure any ailment of the body or soul, a sword to cut through steel like flesh, a mirror to reflect one's true self...
                  The old master alchemist could produce it all, never asking for any money in return.
                  Yet he does require something else in return, something seemingly benign, but perhaps more valuable than money, and much more powerful...
                </p>
                <div onClick={() => window.open("/Master_Guzi.pdf", "_blank")} className="read-button">
                  Read Master Guzi
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const footer = () => (
    <div className="bg-blue-600 rounded-t-lg px-12 py-6">
      Copyright © 2024 Eldar Sofer
    </div>
  )

  return (
    <main className="bg-gradient-to-tr from-purple-600 to-blue-500">
      {firstPane()}
      {secondPane()}
      {thirdPane()}
      <div className="min-h-screen text-start p-2 md:p-8 lg:p-12"></div>
      {footer()}
    </main>
  );
}
