import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: "About", href: "#about" },
        { name: "Skills", href: "#skills" },
        { name: "Projects", href: "#projects" },
        { name: "Playground", href: "#playground" },
        { name: "Certificates", href: "#certificates" },
        { name: "Education", href: "#education" }
    ];

    return (
        <motion.nav 
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-6'}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className={`mx-auto max-w-7xl px-6 transition-all duration-300 ${scrolled ? '' : 'lg:px-12'}`}>
                <div className={`flex items-center justify-between rounded-full border transition-all duration-300 ${
                    scrolled 
                    ? 'bg-black/40 backdrop-blur-md border-white/10 shadow-lg px-6 py-3' 
                    : 'bg-transparent border-transparent px-2 py-2'
                }`}>
                    
                    {/* Logo */}
                    <a href="#" className="font-black text-2xl tracking-tighter text-white z-10 pointer-events-auto cursor-none">
                        NBP<span className="text-indigo-500">.</span>
                    </a>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-1 xl:gap-2">
                        {navLinks.map((link, idx) => (
                            <a 
                                key={idx} 
                                href={link.href}
                                className="px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all relative group cursor-none pointer-events-auto"
                            >
                                {link.name}
                                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-cyan-400 group-hover:w-1/2 transition-all duration-300" />
                            </a>
                        ))}
                    </div>

                    {/* Contact Button */}
                    <div className="hidden md:block z-10 pointer-events-auto cursor-none">
                        <a href="mailto:narendrapurapubharghavpradeep@gmail.com" className="btn btn-primary !py-2 !px-5 text-sm cursor-none">
                            Contact Me
                        </a>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button 
                        className="md:hidden text-white p-2 z-10 pointer-events-auto cursor-none"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <div className="w-6 flex flex-col gap-1.5">
                            <span className={`block h-0.5 w-full bg-white transition-transform ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                            <span className={`block h-0.5 w-full bg-white transition-opacity ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                            <span className={`block h-0.5 w-full bg-white transition-transform ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-white/10 overflow-hidden"
                    >
                        <div className="px-6 py-8 flex flex-col gap-4">
                            {navLinks.map((link, idx) => (
                                <a 
                                    key={idx} 
                                    href={link.href}
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-lg font-bold text-gray-300 hover:text-white border-b border-white/5 pb-2 pointer-events-auto cursor-none"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <a 
                                href="mailto:narendrapurapubharghavpradeep@gmail.com" 
                                className="mt-4 text-center btn btn-primary pointer-events-auto cursor-none"
                            >
                                Contact Me
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
