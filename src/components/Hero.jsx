import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, FileText, X, Download } from 'lucide-react';
import TerminalModal from './TerminalModal';

const GithubIcon = ({ size }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.4 5.4 0 0 0-1.5-3.8 5.4 5.4 0 0 0-.1-3.8s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0C6.2 1.4 5 1.8 5 1.8a5.4 5.4 0 0 0-.1 3.8A5.4 5.4 0 0 0 3.4 9.4c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
    </svg>
);

const LinkedinIcon = ({ size }) => (
    <svg viewBox="0 0 24 24" width={size} height={size} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
    </svg>
);

const useTypewriter = (words, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000) => {
    const [index, setIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [reverse, setReverse] = useState(false);
    const [text, setText] = useState('');

    useEffect(() => {
        if (index >= words.length) {
            setIndex(0);
            return;
        }
        
        const currentWord = words[index];
        let timeout;

        if (!reverse) {
            if (subIndex < currentWord.length) {
                timeout = setTimeout(() => {
                    setText(prev => prev + currentWord[subIndex]);
                    setSubIndex(prev => prev + 1);
                }, typingSpeed);
            } else {
                timeout = setTimeout(() => setReverse(true), pauseTime);
            }
        } else {
            if (subIndex > 0) {
                timeout = setTimeout(() => {
                    setText(prev => prev.slice(0, -1));
                    setSubIndex(prev => prev - 1);
                }, deletingSpeed);
            } else {
                setReverse(false);
                setIndex(prev => prev + 1);
            }
        }

        return () => clearTimeout(timeout);
    }, [subIndex, index, reverse, words, typingSpeed, deletingSpeed, pauseTime]);

    return `${text}${subIndex === words[index]?.length && !reverse ? '' : '|'}`;
};

const MagneticButton = ({ children, className, href, onClick }) => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouse = (e) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = e.currentTarget.getBoundingClientRect();
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
        setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
    };

    const reset = () => setPosition({ x: 0, y: 0 });

    return (
        <motion.a
            href={href}
            onClick={onClick}
            target="_blank"
            rel="noreferrer"
            className={className}
            onMouseMove={handleMouse}
            onMouseLeave={reset}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.a>
    );
};

const Hero = () => {
    const roles = ["Software Engineer", "Full-Stack Developer", "Next.js Enthusiast", "Problem Solver"];
    const typingText = useTypewriter(roles);
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);

    return (
        <section id="about" className="section relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-12 cursor-none">
            
            {/* Ambient Nebula */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[800px] h-[600px] md:h-[800px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen" />

            <div className="container relative z-10 mx-auto px-6 text-center flex flex-col items-center justify-center flex-1">
                
                {/* Status Pill (Lovenish Style) */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="flex items-center gap-3 px-4 py-2 border border-white/10 rounded-full bg-white/5 backdrop-blur-md mb-8 shadow-[0_0_20px_rgba(255,255,255,0.05)]"
                >
                    <div className="relative flex items-center justify-center w-2.5 h-2.5">
                        <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping"></span>
                        <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    </div>
                    <span className="text-xs md:text-sm font-medium tracking-wide text-gray-300 uppercase">Open to Opportunities</span>
                </motion.div>

                {/* Massive Typography (Tushar Style) */}
                <motion.h1 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    className="text-4xl sm:text-6xl md:text-[8rem] font-black text-white tracking-tighter uppercase leading-[0.85] mb-6 font-sans max-w-7xl mx-auto"
                >
                    Narendrapurapu <br className="hidden md:block" /> Bharghav Pradeep
                </motion.h1>

                {/* Dynamic Typing & Roles (Gagan Style) */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-xl md:text-3xl font-light text-gray-400 mb-10 h-10"
                >
                    I am a <span className="text-cyan-400 font-medium">{typingText}</span>
                </motion.div>

                {/* CTAs */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-wrap items-center justify-center gap-6 mt-4"
                >
                    <MagneticButton href="#projects" className="px-10 py-5 bg-[#5b6cf9] hover:bg-[#4a5ce8] hover:shadow-[0_0_40px_rgba(91,108,249,0.5)] text-white text-lg rounded-full font-bold transition-all duration-300 cursor-pointer pointer-events-auto">
                        View Projects
                    </MagneticButton>

                    <MagneticButton 
                        href="#terminal" 
                        onClick={(e) => { e.preventDefault(); setIsTerminalOpen(true); }}
                        className="group flex gap-3 items-center px-10 py-5 text-white bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 rounded-full font-mono text-base font-bold transition-all duration-300 pointer-events-auto cursor-pointer"
                    >
                        <span className="text-gray-400 font-normal group-hover:text-cyan-400 transition-colors">{`>_`}</span> OS Mode
                    </MagneticButton>
                </motion.div>
            </div>

            {/* Marquee Tech Stack (Tushar Style) */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden border-t border-white/10 bg-black/50 backdrop-blur-sm py-4">
                <motion.div 
                    className="flex w-fit whitespace-nowrap opacity-50 font-mono text-sm tracking-[0.3em] text-orange-400"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                >
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex shrink-0">
                            {["REACT", "NEXT.JS", "TAILWIND CSS", "FRAMER MOTION", "NODE.JS", "PYTHON", "JAVA", "MONGODB", "MYSQL", "HTML", "CSS", "GIT"].map((tech, idx) => (
                                <div key={idx} className="flex items-center">
                                    <span className="px-12 font-bold">{tech}</span>
                                    <span className="text-white/20">•</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* OS Terminal Modal */}
            <TerminalModal isOpen={isTerminalOpen} onClose={() => setIsTerminalOpen(false)} />

        </section>
    );
};

export default Hero;
