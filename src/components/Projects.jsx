import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, ArrowUpRight } from 'lucide-react';

const projectsData = [
    {
        id: "01",
        title: "PromptEnhancer",
        subtitle: "Smart Prompt Builder Platform",
        duration: "Aug 2025 - Sep 2025",
        tech: ["Next.js", "Hygraph", "Clerk", "Gemini API"],
        points: [
            "Designed a smart website that turns raw inputs into better prompts. This significantly improves the quality and accuracy of AI responses.",
            "Developed core enhancement logic in JavaScript, including automatic prompt restructuring for clearer and more accurate AI responses.",
            "Implemented a scalable backend using modern APIs and content pipelines to handle fast, high-quality prompt processing."
        ],
        github: "https://github.com/deepun7/promptenhancer",
        liveUrl: "https://promptenhancer-chi.vercel.app",
        colorClass: "group-hover:text-orange-400",
        borderClass: "group-hover:border-cyan-400/50 group-hover:shadow-[inset_0_0_40px_rgba(34,211,238,0.05)]"
    },
    {
        id: "02",
        title: "FoodieApp",
        subtitle: "Fast & Easy Online Food Ordering Platform",
        duration: "Sep 2025 - Nov 2025",
        tech: ["Next.js", "Hygraph", "Clerk"],
        points: [
            "Developed a full-stack food ordering platform allowing users to browse menus, view item details, and place real-time orders.",
            "Implemented secure user authentication, order management, and role-based dashboards for customers and restaurant admins.",
            "Integrated dynamic cart functionality with smooth UI interactions and responsive design for mobile and desktop users."
        ],
        github: "https://github.com/deepun7/foodieapp",
        liveUrl: "https://foodieapp.vercel.app",
        colorClass: "group-hover:text-orange-400",
        borderClass: "group-hover:border-violet-500/50 group-hover:shadow-[inset_0_0_40px_rgba(168,85,247,0.05)]"
    },
    {
        id: "03",
        title: "ATM Flask",
        subtitle: "Virtual Banking Simulation & Transaction Logic",
        duration: "Mar 2026 - Present",
        tech: ["Python", "Flask", "HTML", "CSS", "SQLite"],
        points: [
            "Developed an interactive Python Flask application simulating core ATM banking functionalities securely over the web.",
            "Implemented user authentication, PIN verification, real-time balance inquiries, and detailed transaction history management.",
            "Designed a clean frontend interface seamlessly integrated with robust backend routing logic for state transitions."
        ],
        github: "https://github.com/deepun7/ATM_Flask",
        liveUrl: "https://atm-flask.onrender.com", 
        colorClass: "group-hover:text-emerald-400",
        borderClass: "group-hover:border-emerald-500/50 group-hover:shadow-[inset_0_0_40px_rgba(52,211,153,0.05)]"
    }
];

const Projects = () => {
    const [selectedProject, setSelectedProject] = useState(null);

    return (
        <section id="projects" className="section relative py-20 px-6">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter font-serif">Selected Works</h2>
                    <div className="w-24 h-1 bg-orange-400 mt-4" />
                </motion.div>

                <div className="flex flex-col">
                    {projectsData.map((project, idx) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.6 }}
                            onClick={() => setSelectedProject(project)}
                            className={`group cursor-pointer relative flex flex-col md:flex-row items-baseline md:items-center gap-6 justify-between border-t border-white/10 last:border-b py-10 transition-all duration-500 ease-out bg-transparent hover:bg-white/[0.02] ${project.borderClass} hover:px-6 -mx-6 rounded-lg`}
                        >
                            <div className="flex flex-col md:flex-row items-baseline gap-4 md:gap-12 w-full">
                                <span className={`text-3xl md:text-5xl font-black text-white/20 transition-colors duration-500 ${project.colorClass}`}>{project.id}</span>
                                <div>
                                    <h3 className={`text-4xl md:text-6xl font-black text-white uppercase tracking-tighter transition-colors duration-500 ${project.colorClass}`}>{project.title}</h3>
                                    <p className="text-gray-400 text-lg mt-2 font-light">{project.subtitle}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end mt-4 md:mt-0">
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="text-xs font-mono text-gray-500 group-hover:text-gray-300 px-2 py-1 rounded bg-white/5 border border-white/10 transition-colors">{t}</span>
                                    ))}
                                </div>
                                <div className="w-12 h-12 min-w-[48px] rounded-full border border-white/20 flex items-center justify-center group-hover:bg-orange-400 group-hover:border-orange-400 transition-all duration-500 group-hover:rotate-45">
                                    <ArrowUpRight size={24} className="text-white group-hover:text-black transition-colors" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Project Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                        onClick={() => setSelectedProject(null)}
                    >
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="relative w-full max-w-2xl bg-[#030305] border-t-2 border-orange-400 rounded-2xl p-10 md:p-14 shadow-[0_0_50px_rgba(251,146,60,0.15)] overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            <button 
                                className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                                onClick={() => setSelectedProject(null)}
                            >
                                <X size={24} />
                            </button>

                            <h2 className="text-4xl font-black text-white uppercase tracking-tighter mb-2">{selectedProject.title}</h2>
                            <p className="text-orange-400 font-medium mb-6">{selectedProject.subtitle}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-8">
                                {selectedProject.tech.map((t, i) => (
                                    <span key={i} className="text-[13px] font-mono px-5 py-2 rounded-full bg-white/5 border border-white/10 text-cyan-400 shadow-sm">
                                        {t}
                                    </span>
                                ))}
                            </div>

                            <div className="space-y-5 mb-10">
                                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest border-b border-white/10 pb-4">Technical Execution</h4>
                                <ul className="space-y-5 pt-6">
                                    {selectedProject.points.map((point, i) => (
                                        <li key={i} className="flex gap-4 text-gray-300 text-sm leading-relaxed">
                                            <span className="text-orange-400 font-bold mt-0.5">/</span>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="flex flex-wrap gap-6 border-t border-white/10 pt-8 mt-6">
                                {selectedProject.liveUrl && (
                                    <a 
                                        href={selectedProject.liveUrl} 
                                        target="_blank" 
                                        rel="noopener" 
                                        className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white hover:text-cyan-400 transition-colors"
                                    >
                                        <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-cyan-400 group-hover:border-cyan-400 group-hover:text-black transition-all">
                                            <ExternalLink size={16} />
                                        </span>
                                        Live Website
                                    </a>
                                )}
                                {selectedProject.github && (
                                    <a 
                                        href={selectedProject.github} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-white hover:text-orange-400 transition-colors"
                                    >
                                        <span className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-orange-400 group-hover:border-orange-400 group-hover:text-black transition-all">
                                            <ArrowUpRight size={16} />
                                        </span>
                                        Source Code
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Projects;
