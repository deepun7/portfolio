import React from 'react';
import { motion } from 'framer-motion';

const educationData = [
    {
        institution: "Lovely Professional University",
        degree: "B.Tech - Computer Science & Engineering",
        score: "CGPA: 6.8",
        duration: "Aug 2023 - Present",
        location: "Punjab, India"
    },
    {
        institution: "Sri Chaitanya Junior College",
        degree: "Intermediate",
        score: "CGPA: 6.6",
        duration: "Jun 2021 - Mar 2023",
        location: "Palakollu, AP"
    },
    {
        institution: "MMKNM High School",
        degree: "Matriculation",
        score: "Score: 68%",
        duration: "Mar 2021",
        location: "Palakollu, AP"
    }
];

const achievementsData = [
    {
        title: "Code-A-Haunt Hackathon",
        desc: "Participated in an intensive rapid problem-solving hackathon, developing real-time software solutions under strict deadlines.",
        date: "March 2024"
    },
    {
        title: "Infosys Springboard",
        desc: "Actively engaged in advanced modules covering Computational Theory and Generative AI to master emerging technologies.",
        date: "Ongoing"
    }
];

const Education = () => {
    return (
        <section id="education" className="section relative py-32 bg-[#030305]">
            <div className="container mx-auto px-6 max-w-6xl">
                
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
                    
                    {/* Education Timeline */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="mb-16 md:mb-20"
                        >
                            <h2 className="text-4xl md:text-5xl font-black text-white flex items-center gap-4 tracking-tighter uppercase font-serif">
                                Education
                            </h2>
                            <div className="w-24 h-1 bg-indigo-500 mt-6" />
                        </motion.div>

                        <div className="relative border-l-2 border-white/10 ml-4 md:ml-8 flex flex-col gap-16 pb-4">
                            {educationData.map((edu, idx) => (
                                <motion.div 
                                    key={idx} 
                                    className="relative pl-12 md:pl-16"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.15, duration: 0.5 }}
                                >
                                    {/* Timeline Dot */}
                                    <div className="absolute w-5 h-5 bg-[#030305] border-[3px] border-indigo-500 rounded-full left-[-36px] md:left-[-48px] top-8 shadow-[0_0_15px_rgba(99,102,241,0.6)] z-10" />
                                    
                                    <div className="group bg-[#0a0a0f] border border-white/[0.04] p-8 md:p-10 rounded-[1.5rem] hover:border-indigo-500/50 hover:bg-[#111118] transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_40px_-10px_rgba(99,102,241,0.2)] cursor-none">
                                        
                                        <div className="flex flex-col gap-1 mb-6">
                                            <h3 className="text-2xl font-black text-gray-100 group-hover:text-indigo-400 transition-colors tracking-tight">{edu.institution}</h3>
                                            <p className="text-indigo-300 font-semibold text-sm md:text-base tracking-wide">{edu.degree}</p>
                                        </div>
                                        
                                        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                                            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-300 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 group-hover:border-cyan-500/30 transition-colors">
                                                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                                                {edu.score}
                                            </span>
                                            <span className="font-mono text-[11px] text-gray-400 border border-white/5 px-3 py-1.5 rounded-full bg-black/40">
                                                {edu.duration}
                                            </span>
                                        </div>
                                        
                                        <p className="text-[11px] font-bold text-gray-500 uppercase tracking-[0.2em]">{edu.location}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Highlights */}
                    <div className="w-full lg:w-1/2">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="mb-16 md:mb-20"
                        >
                            <h2 className="text-4xl md:text-5xl font-black text-white flex items-center gap-4 tracking-tighter uppercase font-serif">
                                Highlights
                            </h2>
                            <div className="w-24 h-1 bg-cyan-400 mt-6" />
                        </motion.div>

                        <div className="flex flex-col gap-12">
                            {achievementsData.map((ach, idx) => (
                                <motion.div 
                                    key={idx} 
                                    className="group relative bg-[#0a0a0f] border border-white/[0.04] p-8 md:p-10 rounded-[1.5rem] hover:border-cyan-400/50 transition-all duration-300 overflow-hidden cursor-none hover:-translate-y-2 hover:shadow-[0_15px_40px_-10px_rgba(34,211,238,0.2)]"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.15, duration: 0.5 }}
                                >
                                    <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/5 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:bg-cyan-500/15 transition-all duration-500" />
                                    
                                    <div className="relative z-10 w-full flex flex-col h-full">
                                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6 relative z-30">
                                            <h3 className="text-xl md:text-2xl font-black text-gray-100 group-hover:text-cyan-400 transition-colors tracking-tight leading-tight flex-1">{ach.title}</h3>
                                            <span className="font-mono text-[11px] md:text-xs font-bold uppercase tracking-wider text-cyan-300 bg-cyan-400/10 px-4 py-2 rounded-full border-[2px] border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)] whitespace-nowrap lg:mt-1 self-start shrink-0">
                                                {ach.date}
                                            </span>
                                        </div>
                                        <p className="text-gray-400 text-sm leading-relaxed font-medium">{ach.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default Education;
