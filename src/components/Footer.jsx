import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <motion.footer 
            className="relative bg-[#050508] border-t border-white/10 py-12 px-6 overflow-hidden mt-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
            
            <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
                <div className="flex flex-col items-center md:items-start">
                    <a href="#" className="font-black text-2xl tracking-tighter text-white mb-2 cursor-none pointer-events-auto">
                        NBP<span className="text-indigo-500">.</span>
                    </a>
                    <p className="text-gray-500 text-sm md:text-left text-center">
                        &copy; {new Date().getFullYear()} Narendrapurapu Bharghav Pradeep. 
                        <br className="hidden md:block" /> All rights reserved.
                    </p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center gap-6">
                    <a 
                        href="mailto:narendrapurapubharghavpradeep@gmail.com" 
                        className="flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors text-sm cursor-none pointer-events-auto"
                    >
                        <Mail size={16} /> Email
                    </a>
                    <a 
                        href="tel:+918919829211" 
                        className="flex items-center gap-2 text-gray-400 hover:text-cyan-400 transition-colors text-sm cursor-none pointer-events-auto"
                    >
                        <Phone size={16} /> +91-8919829211
                    </a>
                </div>
            </div>
            
            {/* Ambient Background Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
        </motion.footer>
    );
};

export default Footer;
