import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Loader2, Mail, Phone } from 'lucide-react';

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

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({
                    access_key: '53034d9c-c72c-4695-92c3-4846d1d964c1',
                    ...formData,
                    subject: 'New Submission from Portfolio'
                })
            });

            const result = await response.json();
            if (result.success) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus('idle'), 5000);
            } else {
                setErrorMessage(result.message || 'Something went wrong');
                setStatus('error');
                setTimeout(() => setStatus('idle'), 5000);
            }
        } catch (error) {
            setErrorMessage('Network error occurred. Please try again.');
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <section id="contact" className="section relative py-20 px-6 bg-[#030305]">
            <div className="container mx-auto max-w-6xl">
                
                {/* Header Title */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h4 className="text-cyan-400 font-mono text-sm tracking-widest font-bold uppercase mb-4">07. What's Next?</h4>
                    <h2 className="text-5xl md:text-7xl font-black text-gray-100 tracking-tighter">Get In Touch</h2>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                    
                    {/* Left Column: Info & Cards */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 font-sans leading-tight tracking-tight">Let's talk about everything!</h3>
                            <p className="text-gray-400 font-medium mb-10 leading-relaxed text-base md:text-lg max-w-lg">
                                Although I'm currently focused on my studies at LPU, my inbox is always open. Whether you have a question, a project idea, or just want to say hi, I'll try my best to get back to you!
                            </p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Email */}
                                <div className="bg-[#0a0a0f] border border-white/5 p-6 rounded-2xl hover:border-emerald-400/30 hover:bg-[#111118] transition-all duration-300 group hover:-translate-y-1">
                                    <Mail size={24} className="text-emerald-400 mb-4" />
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Email</p>
                                    <p className="text-gray-200 font-bold group-hover:text-emerald-400 transition-colors text-xs xl:text-sm break-all">narendrapurapubharghavpradeep@gmail.com</p>
                                </div>
                                {/* Phone */}
                                <div className="bg-[#0a0a0f] border border-white/5 p-6 rounded-2xl hover:border-cyan-400/30 hover:bg-[#111118] transition-all duration-300 group hover:-translate-y-1">
                                    <Phone size={24} className="text-cyan-400 mb-4" />
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Phone</p>
                                    <p className="text-gray-200 font-bold group-hover:text-cyan-400 transition-colors text-sm">+91-8919829211</p>
                                </div>
                                {/* Github */}
                                <a href="https://github.com/deepun7" target="_blank" rel="noreferrer" className="block bg-[#0a0a0f] border border-white/5 p-6 rounded-2xl hover:border-emerald-400/30 hover:bg-[#111118] transition-all duration-300 group hover:-translate-y-1 cursor-pointer pointer-events-auto">
                                    <GithubIcon size={24} className="text-emerald-400 mb-4" />
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">Github</p>
                                    <p className="text-gray-200 font-bold group-hover:text-emerald-400 transition-colors text-sm">deepun7</p>
                                </a>
                                {/* LinkedIn */}
                                <a href="https://www.linkedin.com/in/bhargav-pradeep-5202712a1/" target="_blank" rel="noreferrer" className="block bg-[#0a0a0f] border border-white/5 p-6 rounded-2xl hover:border-cyan-400/30 hover:bg-[#111118] transition-all duration-300 group hover:-translate-y-1 cursor-pointer pointer-events-auto">
                                    <LinkedinIcon size={24} className="text-cyan-400 mb-4" />
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">LinkedIn</p>
                                    <p className="text-gray-200 font-bold group-hover:text-cyan-400 transition-colors text-sm">Bhargav Pradeep</p>
                                </a>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Form */}
                    <div className="w-full lg:w-1/2 relative mt-8 lg:mt-0">
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="bg-[#0a0a0f] border border-white/5 p-8 md:p-12 rounded-[2rem] relative flex flex-col shadow-2xl"
                        >
                            {/* Ambient Glows safely contained inside its own clipping boundary */}
                            <div className="absolute inset-0 overflow-hidden rounded-[2rem] pointer-events-none border border-transparent">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3" />
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/3" />
                            </div>
                            
                            <div className="relative z-10 flex-1 flex flex-col">
                                <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
                                    <div className="flex flex-col gap-6">
                                        <div className="flex flex-col gap-2 relative group mt-2">
                                            <label htmlFor="name" className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-2 cursor-none transition-colors group-focus-within:text-emerald-400">Your Name</label>
                                            <input 
                                                type="text" 
                                                id="name" 
                                                name="name" 
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                                className="bg-white/[0.02] border border-white/10 rounded-xl px-4 py-4 text-white hover:bg-white/[0.04] focus:outline-none focus:border-emerald-400 focus:bg-white/[0.04] transition-colors cursor-none pointer-events-auto font-medium"
                                            />
                                        </div>
                                        <div className="flex flex-col gap-2 relative group">
                                            <label htmlFor="email" className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-2 cursor-none transition-colors group-focus-within:text-cyan-400">Your Email</label>
                                            <input 
                                                type="email" 
                                                id="email" 
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required 
                                                className="bg-white/[0.02] border border-white/10 rounded-xl px-4 py-4 text-white hover:bg-white/[0.04] focus:outline-none focus:border-cyan-400 focus:bg-white/[0.04] transition-colors cursor-none pointer-events-auto font-medium"
                                            />
                                        </div>
                                        
                                        <div className="flex flex-col gap-2 relative group flex-1">
                                            <label htmlFor="message" className="text-[11px] font-bold text-gray-400 uppercase tracking-[0.2em] ml-2 cursor-none transition-colors group-focus-within:text-emerald-400">Message</label>
                                            <textarea 
                                                id="message" 
                                                name="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                required
                                                className="bg-white/[0.02] border border-white/10 rounded-xl px-4 py-4 text-white hover:bg-white/[0.04] focus:outline-none focus:border-emerald-400 focus:bg-white/[0.04] transition-colors resize-none flex-1 min-h-[160px] cursor-none pointer-events-auto font-medium"
                                            ></textarea>
                                        </div>
                                    </div>

                                    <div className="mb-2">
                                        <button 
                                            type="submit" 
                                            disabled={status === 'loading' || status === 'success'}
                                            className={`group relative px-10 py-5 w-fit rounded-2xl font-bold flex items-center justify-center gap-3 transition-all duration-300 pointer-events-auto shadow-xl ${
                                                status === 'success' ? 'bg-emerald-500 text-black' : 
                                                status === 'error' ? 'bg-red-500 text-white' : 
                                                'bg-gradient-to-r from-emerald-500 to-cyan-500 text-black hover:shadow-[0_0_40px_rgba(52,211,153,0.5)] disabled:opacity-70'
                                            }`}
                                        >
                                            {status === 'idle' && (
                                                <>
                                                    <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out" />
                                                    <span className="relative z-10 text-base tracking-widest uppercase">Send Message</span>
                                                </>
                                            )}
                                            {status === 'loading' && (
                                                <>
                                                    <Loader2 size={18} className="animate-spin" />
                                                    <span className="text-sm tracking-wide">Sending...</span>
                                                </>
                                            )}
                                            {status === 'success' && (
                                                <>
                                                    <CheckCircle size={18} />
                                                    <span className="text-sm tracking-wide">Sent!</span>
                                                </>
                                            )}
                                            {status === 'error' && (
                                                <>
                                                    <AlertCircle size={18} />
                                                    <span className="text-sm tracking-wide">Failed</span>
                                                </>
                                            )}
                                        </button>
                                        {status === 'error' && <p className="text-red-400 text-left text-xs font-bold mt-3">{errorMessage}</p>}
                                    </div>
                                </form>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;
