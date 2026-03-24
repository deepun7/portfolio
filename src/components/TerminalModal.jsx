import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TerminalModal = ({ isOpen, onClose }) => {
    const [history, setHistory] = useState([
        { type: 'system', content: 'Welcome to BhargavOS v1.0.0' },
        { type: 'system', content: "Type 'help' to see available commands." }
    ]);
    const [input, setInput] = useState('');
    const bottomRef = useRef(null);

    useEffect(() => {
        if (bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [history, isOpen]);

    const handleCommand = (e) => {
        e.preventDefault();
        const cmd = input.trim().toLowerCase();
        let output = null;

        if (cmd === '') return;

        const newHistory = [...history, { type: 'user', content: `visitor@portfolio:~$ ${input}` }];

        switch (cmd) {
            case 'help':
                output = (
                    <div>
                        Available commands: <span className="text-emerald-400">whoami, skills, education, achievements, projects, clear, contact</span>
                    </div>
                );
                break;
            case 'whoami':
                output = <div>Narendrapurapu Bharghav Pradeep - Full-Stack Developer & Problem Solver</div>;
                break;
            case 'skills':
                output = <div>C++, JavaScript, React, Node.js, Python, MongoDB, TailwindCSS, SQL</div>;
                break;
            case 'education':
                output = (
                    <div>
                        B.Tech CSE @ LPU (CGPA: 6.8)<br />
                        Intermediate @ Sri Chaitanya Junior College (75%)<br />
                        Matriculation @ MMKNMH School (80%)
                    </div>
                );
                break;
            case 'achievements':
            case 'certifications':
                output = (
                    <div className="leading-loose">
                        1. <strong>Basics of Data and Algorithms</strong> (LPU)<br />
                        2. <strong>Prompt Engineering</strong> (Independent)<br />
                        3. <strong>Computer Networking</strong> (Coursera)<br />
                        <span className="text-emerald-400 mt-2 block">Check the main site's Achievements section to view the actual certificates!</span>
                    </div>
                );
                break;
            case 'projects':
                output = (
                    <div className="leading-loose">
                        1. <strong>Pixel Stream</strong> - A Full-Stack Netflix Clone<br />
                        2. <strong>Shoppy Shop</strong> - E-commerce Store<br />
                        3. <strong>NovaPaths</strong> - Event/Travel Platform<br />
                        4. <strong>ATM Flask App</strong> - Python Banking System<br />
                        <span className="text-emerald-400 mt-2 block">Type 'view projects' on the main site to explore live demos!</span>
                    </div>
                );
                break;
            case 'contact':
                output = <div>Email: narendrapurapubharghavpradeep@gmail.com</div>;
                break;
            case 'clear':
                setHistory([]);
                setInput('');
                return;
            default:
                output = <div>Command not found: {cmd}. Type 'help' for available commands.</div>;
        }

        setHistory([...newHistory, { type: 'system', content: output }]);
        setInput('');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-6 bg-black/80 backdrop-blur-md cursor-alias"
                    onClick={onClose}
                >
                    <motion.div 
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        className="relative w-full max-w-3xl bg-[#0f172a] rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col cursor-auto border border-blue-900/40"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Fake Mac Header */}
                        <div className="flex items-center gap-2 px-4 py-3 bg-[#1e293b]">
                            <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-400 cursor-pointer pointer-events-auto" onClick={onClose} />
                            <div className="w-3 h-3 rounded-full bg-yellow-500" />
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <div className="flex-1 text-center text-xs text-slate-400 font-mono">visitor@portfolio:~</div>
                        </div>

                        {/* Terminal Body */}
                        <div className="flex-1 h-[400px] md:h-[500px] p-4 md:p-6 overflow-y-auto font-mono text-sm sm:text-base text-slate-300 pointer-events-auto">
                            {history.map((line, idx) => (
                                <div key={idx} className={`mb-2 ${line.type === 'user' ? 'text-blue-400' : 'text-slate-200'}`}>
                                    {line.content}
                                </div>
                            ))}
                            <form onSubmit={handleCommand} className="flex flex-col sm:flex-row sm:items-center gap-2 mt-2">
                                <span className="text-emerald-400 whitespace-nowrap">visitor@portfolio:~$</span>
                                <input 
                                    type="text" 
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    className="flex-1 bg-transparent border-none outline-none text-slate-200 font-mono w-full"
                                    autoFocus
                                    spellCheck="false"
                                    autoComplete="off"
                                />
                            </form>
                            <div ref={bottomRef} className="h-4" />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default TerminalModal;
