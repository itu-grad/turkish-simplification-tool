"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Features from "@/components/Features";
import Video from "@/components/Video";
import Footer from "@/components/Footer";
import { useRef } from "react";

export default function Home() {
  const featuresRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-15">
      <Header />
      <Hero scrollToFeatures={() => scrollToSection(featuresRef)} scrollToVideo={() => scrollToSection(videoRef)} />
      <About />
      <div ref={featuresRef}>
        <Features />
      </div>
      <div ref={videoRef}>
        <Video />
      </div>
      <Footer />
    </div>
  );
}
