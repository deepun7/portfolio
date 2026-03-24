import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, ExternalLink, X } from 'lucide-react';

const certsData = [
    {
        id: "01",
        title: "Basics of Data and Algorithms",
        issuer: "LPU",
        date: "July 2025",
        color: "from-cyan-400 to-indigo-500",
        borderGlow: "hover:border-cyan-400/80 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]",
        image: "/certs/cert-1.png", 
        link: "/certs/cert-1.png"
    },
    {
        id: "02",
        title: "Prompt Engineering: Generative AI & LLM",
        issuer: "Independent",
        date: "Aug 2025",
        color: "from-violet-400 to-fuchsia-500",
        borderGlow: "hover:border-violet-400/80 hover:shadow-[0_0_30px_rgba(167,139,250,0.2)]",
        image: "/certs/cert-2.png",
        link: "/certs/cert-2.png"
    },
    {
        id: "03",
        title: "The Bits and Bytes of Computer Networking",
        issuer: "Coursera",
        date: "Sep 2024",
        color: "from-emerald-400 to-teal-500",
        borderGlow: "hover:border-emerald-400/80 hover:shadow-[0_0_30px_rgba(52,211,153,0.2)]",
        image: "/certs/cert-3.png",
        link: "https://coursera.org/verify/HGCYNLFKF25W"
    }
];

const Certificates = () => {
    const [selectedCert, setSelectedCert] = useState(null);

    return (
        <section id="certificates" className="section relative py-20 px-6">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-24 md:mb-32 text-center md:text-left"
                >
                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter font-serif">Achievements</h2>
                    <h3 className="text-gray-400 mt-2 font-light">Certifications built with consistency</h3>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {certsData.map((cert, idx) => (
                        <motion.div 
                            key={cert.id} 
                            onClick={() => setSelectedCert(cert)}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15, duration: 0.5 }}
                            className={`relative flex flex-col justify-between bg-white/[0.03] backdrop-blur-md border border-white/10 p-8 rounded-2xl transition-all duration-500 group ${cert.borderGlow} overflow-hidden cursor-pointer`}
                        >
                            {/* Background Number Watermark */}
                            <span className="absolute -bottom-4 -right-4 text-9xl font-black text-white/[0.02] pointer-events-none group-hover:scale-110 transition-transform duration-700">
                                {cert.id}
                            </span>

                            {/* Top Hero Stat */}
                            <div className="mb-8">
                                <h4 className="text-xs font-mono text-gray-500 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
                                    <Award size={14} className="text-gray-400" /> Certification
                                </h4>
                                <h3 className={`text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r ${cert.color} inline-block filter drop-shadow-lg`}>
                                    #{cert.id}
                                </h3>
                            </div>
                            
                            {/* Glass Content Box */}
                            <div className="relative z-10 w-full rounded-xl bg-black/40 border border-white/5 p-5 mt-auto group-hover:bg-black/60 transition-colors">
                                <h3 className="text-lg font-bold text-white mb-2 leading-tight group-hover:text-white transition-colors">{cert.title}</h3>
                                <div className="flex justify-between items-end mt-4 pt-4 border-t border-white/10">
                                    <p className="text-gray-400 font-medium text-sm">{cert.issuer}</p>
                                    <p className="font-mono text-xs text-gray-500">{cert.date}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Modal Popup */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md cursor-alias"
                        onClick={() => setSelectedCert(null)}
                    >
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="relative w-full max-w-4xl bg-[#030305] border-t-2 border-cyan-400 rounded-2xl p-6 md:p-10 shadow-[0_0_50px_rgba(34,211,238,0.15)] overflow-hidden flex flex-col cursor-auto max-h-[90vh] overflow-y-auto"
                            onClick={e => e.stopPropagation()}
                        >
                            <button 
                                onClick={() => setSelectedCert(null)}
                                className="absolute top-6 right-6 w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-white transition-colors border border-white/10 z-10"
                            >
                                <X size={20} />
                            </button>
                            
                            <div className="mb-8">
                                <h2 className="text-3xl md:text-4xl font-black text-white uppercase tracking-tighter mb-2 pr-12">{selectedCert.title}</h2>
                                <p className={`inline-block text-transparent bg-clip-text bg-gradient-to-r ${selectedCert.color} font-bold text-lg`}>
                                    {selectedCert.issuer} <span className="text-gray-600 mx-2">•</span> <span className="text-gray-400">{selectedCert.date}</span>
                                </p>
                            </div>

                            {/* Certificate Image Area */}
                            <div className="w-full relative rounded-xl border border-white/10 overflow-hidden bg-[#0a0a0f] flex items-center justify-center mb-8 min-h-[300px] md:min-h-[400px]">
                                {selectedCert.image ? (
                                    <img 
                                        src={selectedCert.image} 
                                        alt={selectedCert.title}
                                        className="w-full h-auto max-h-[50vh] object-contain"
                                    />
                                ) : (
                                    <div className="flex flex-col items-center justify-center text-gray-500 p-10 text-center">
                                        <Award size={48} className="mb-4 opacity-50" />
                                        <p className="font-mono text-sm uppercase tracking-widest text-cyan-500">Certificate Image Pending</p>
                                        <p className="text-xs mt-2 opacity-50 text-gray-400 max-w-sm">When you have the certificate images, open Certificates.jsx and paste the file paths into the `image` field in `certsData`.</p>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-6 border-t border-white/10 pt-6 mt-auto">
                                <a 
                                    href={selectedCert.link} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className={`group flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-white hover:text-cyan-400 transition-colors cursor-pointer`}
                                >
                                    <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-cyan-400 group-hover:border-cyan-400 group-hover:text-black transition-all">
                                        <ExternalLink size={18} />
                                    </span>
                                    Open Certificate
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Certificates;
