import React from 'react';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

const skillCategories = [
    {
        title: "LANGUAGES & DSA",
        skills: [
            { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
            { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
            { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
            { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/c/c-original.svg" },
            { name: "DSA", isLucide: true, icon: <Activity color="#8b5cf6" size={40} strokeWidth={1.5} /> }
        ]
    },
    {
        title: "FRONTEND",
        skills: [
            { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
            { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
            { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
            { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
            { name: "Tailwind", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" }
        ]
    },
    {
        title: "BACKEND & DATABASE",
        skills: [
            { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
            { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg", invert: true },
            { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
            { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg" }
        ]
    },
    {
        title: "TOOLS",
        skills: [
            { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
            { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg", invert: true },
            { name: "VS Code", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" },
            { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
            { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" }
        ]
    }
];

const SkillCard = ({ skill, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="group relative flex flex-col items-center justify-center w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] md:w-[130px] md:h-[130px] rounded-[1rem] border border-white/[0.04] bg-[#0c0c10] hover:bg-[#12121a] hover:border-[#4e5bd1]/60 transition-all duration-300 cursor-none"
        >
            {/* Hover Glow Effect */}
            <div className="absolute inset-0 rounded-[1rem] opacity-0 group-hover:opacity-100 group-hover:shadow-[0_0_25px_0_rgba(78,91,209,0.35)] transition-opacity duration-300 pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-3 md:gap-4 mt-1">
                {skill.isLucide ? (
                    <div className="w-9 h-9 md:w-11 md:h-11 flex items-center justify-center transition-transform duration-300 group-hover:-translate-y-1">
                        {skill.icon}
                    </div>
                ) : (
                    <img 
                        src={skill.icon} 
                        alt={skill.name} 
                        className="w-9 h-9 md:w-11 md:h-11 object-contain transition-transform duration-300 group-hover:-translate-y-1"
                        style={{ filter: skill.invert ? 'invert(1) brightness(2)' : 'none' }}
                    />
                )}
                <span className="text-[#6e6e7a] text-[11px] md:text-xs font-semibold group-hover:text-white transition-colors duration-300">{skill.name}</span>
            </div>
        </motion.div>
    );
};

const Skills = () => {
    return (
        <section id="skills" className="section relative bg-[#07080f] py-32 flex flex-col items-center">
            <div className="w-full flex justify-center px-4">
                <div className="flex flex-col gap-12 md:gap-16 max-w-fit">
                    {skillCategories.map((category, catIdx) => (
                        <div key={catIdx} className="flex flex-col w-full">
                            <motion.h3 
                                initial={{ opacity: 0, x: 0, y: -10 }}
                                whileInView={{ opacity: 1, x: 0, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="text-center text-[#6e6e7a] tracking-[0.2em] font-bold text-[11px] md:text-xs uppercase mb-10 md:mb-14"
                            >
                                {category.title}
                            </motion.h3>
                            <div className="flex flex-wrap gap-4 md:gap-6 justify-center">
                                {category.skills.map((skill, idx) => (
                                    <SkillCard key={idx} skill={skill} index={idx} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
