import React, { useState } from 'react';
import './App.css';

import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certificates from './components/Certificates';
import Education from './components/Education';
import Footer from './components/Footer';
import Contact from './components/Contact';
import { Download } from 'lucide-react';

function App() {
  return (
    <div className="app">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Certificates />
        <Education />
        <Contact />
      </main>

      {/* Floating Resume Button */}
      <div className="fixed bottom-8 right-8 md:bottom-12 md:right-12 z-[100] pointer-events-auto">
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative px-10 py-5 md:px-12 md:py-6 rounded-full font-bold flex items-center justify-center gap-3 transition-transform duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] bg-gradient-to-r from-[#6b66ff] to-[#0bd1ff] text-white hover:scale-105 cursor-pointer overflow-hidden border border-white/5"
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          <Download strokeWidth={3} size={26} className="relative z-10 text-white" />
          <span className="relative z-10 text-2xl tracking-wide pt-[2px]">Resume</span>
        </a>
      </div>

      <Footer />
    </div>
  );
}

export default App;
