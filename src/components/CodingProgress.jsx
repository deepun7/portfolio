import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Award, Briefcase, Activity } from 'lucide-react';

const HeatmapSquare = ({ intensity }) => {
    // Maps intensity 0-4 to a color
    const colors = [
        'bg-white/5',           // 0: none
        'bg-cyan-900/40',       // 1: low
        'bg-cyan-700/60',       // 2: medium
        'bg-cyan-500/80',       // 3: high
        'bg-cyan-300',          // 4: very high
    ];
    return <div className={`w-3 h-3 rounded-[2px] ${colors[intensity]} transition-colors duration-300 hover:bg-orange-400 cursor-pointer`} />;
};

const CodingProgress = () => {
    // Generate pseudo-random heatmap data for 52 weeks x 7 days
    const heatmapData = useMemo(() => {
        const weeks = [];
        for (let i = 0; i < 52; i++) {
            const days = [];
            for (let j = 0; j < 7; j++) {
                // Higher chance of lower intensity, some random high activity
                const r = Math.random();
                let intensity = 0;
                if (r > 0.9) intensity = 4;
                else if (r > 0.7) intensity = 3;
                else if (r > 0.4) intensity = 2;
                else if (r > 0.2) intensity = 1;
                days.push(intensity);
            }
            weeks.push(days);
        }
        return weeks;
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
    };

    return (
        <section id="progress" className="section relative py-20 px-6">
            <div className="container mx-auto max-w-6xl">
                
                <motion.div 
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={containerVariants}
                    className="flex flex-col gap-12"
                >
                    <div className="text-center md:text-left flex items-center justify-center md:justify-start gap-4">
                        <Terminal size={40} className="text-cyan-400 hidden md:block" />
                        <div>
                            <motion.h2 variants={itemVariants} className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight font-serif">
                                Coding Progress
                            </motion.h2>
                            <motion.h3 variants={itemVariants} className="text-gray-400 mt-2 text-lg font-light">
                                Consistency, problem solving, and architecture.
                            </motion.h3>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Heatmap Card */}
                        <motion.div variants={itemVariants} className="lg:col-span-2 glass-card border border-white/5 hover:border-cyan-500/30 group">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                        <Activity size={20} className="text-orange-400" />
                                        Activity Heatmap
                                    </h3>
                                    <p className="text-sm text-gray-400">742 contributions in the last year</p>
                                </div>
                            </div>
                            
                            {/* Scroll container for mobile */}
                            <div className="flex gap-[3px] overflow-x-auto pb-4 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                                {heatmapData.map((week, wIndex) => (
                                    <div key={wIndex} className="flex flex-col gap-[3px]">
                                        {week.map((intensity, dIndex) => (
                                            <HeatmapSquare key={`${wIndex}-${dIndex}`} intensity={intensity} />
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Stats Cards */}
                        <motion.div variants={itemVariants} className="flex flex-col gap-6">
                            <div className="glass-card border border-white/5 hover:border-violet-500/30 flex-1 flex flex-col justify-center relative overflow-hidden group">
                                <div className="absolute -right-10 -top-10 text-violet-500/10 group-hover:text-violet-500/20 transition-colors duration-500">
                                    <Award size={120} />
                                </div>
                                <h4 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">LeetCode</h4>
                                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 mb-1">
                                    450+
                                </div>
                                <p className="text-sm text-gray-500">Problems Solved</p>
                            </div>

                            <div className="glass-card border border-white/5 hover:border-orange-500/30 flex-1 flex flex-col justify-center relative overflow-hidden group">
                                <div className="absolute -right-10 -top-10 text-orange-500/10 group-hover:text-orange-500/20 transition-colors duration-500">
                                    <Briefcase size={120} />
                                </div>
                                <h4 className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">GitHub</h4>
                                <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 mb-1">
                                    1.2k
                                </div>
                                <p className="text-sm text-gray-500">Commits this year</p>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CodingProgress;
