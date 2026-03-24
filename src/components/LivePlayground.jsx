import React, { useRef, useEffect, useState, useCallback } from 'react';

/**
 * LivePlayground component rendering an interactive HTML5 canvas.
 * Features animated cars, bikes, particles, and meteors with interactive events.
 */
export default function LivePlayground() {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const animRef = useRef(null);

    // Single ref state to hold all mutable canvas animation data without triggering re-renders
    const stateRef = useRef({
        width: 0,
        height: 420,
        cars: [],
        bikes: [],
        particles: [],
        meteors: [],
        mouse: { x: -1000, y: -1000, tx: -1000, ty: -1000, isHovering: false },
        explosions: [],
        mode: 'all',
        lastTime: 0,
        frameCount: 0,
        fpsSamples: [],
        hoveredVehicle: null
    });

    const [mode, setMode] = useState('all');
    const [fps, setFps] = useState(60);
    const [isVisible, setIsVisible] = useState(false);

    // Configuration settings
    const config = {
        carPalette: ['#6366f1', '#ff6a00', '#f43f5e', '#a855f7', '#3b82f6', '#10b981'],
        bikePalette: ['#00e5ff', '#39ff14', '#ff6a00'],
        lanesCount: 3,
        roadHeightPerc: 0.35,
        maxParticles: 80,
        maxMeteors: 1, // at a time
        cursorFollowLerp: 0.12,
    };

    /**
     * Initializes all the animated objects in the scene.
     */
    const initObjects = useCallback(() => {
        const s = stateRef.current;
        if (s.width === 0) return;

        const roadTop = s.height * (1 - config.roadHeightPerc);
        const laneHeight = (s.height * config.roadHeightPerc) / config.lanesCount;

        // Y-positions for each lane center
        const laneYs = Array.from({ length: config.lanesCount }).map((_, i) => roadTop + (i * laneHeight) + (laneHeight / 2));

        // Initialize Cars (left to right)
        s.cars = Array.from({ length: 6 }).map(() => {
            const lane = Math.floor(Math.random() * config.lanesCount);
            return {
                id: Math.random().toString(36).substring(7),
                x: Math.random() * (s.width + 200) - 200,
                y: laneYs[lane] - 5, // slightly offset to leave room for bikes
                w: 60,
                h: 24,
                speed: 2 + Math.random() * 4,
                color: config.carPalette[Math.floor(Math.random() * config.carPalette.length)],
                lane: lane,
                direction: 1,
                flashTimer: 0
            };
        });

        // Initialize Bikes (right to left)
        s.bikes = Array.from({ length: 4 }).map(() => {
            const lane = Math.floor(Math.random() * config.lanesCount);
            return {
                id: Math.random().toString(36).substring(7),
                x: Math.random() * (s.width + 200),
                y: laneYs[lane] + 10,
                w: 40,
                h: 12,
                speed: -(4 + Math.random() * 4),
                color: config.bikePalette[Math.floor(Math.random() * config.bikePalette.length)],
                lane: lane,
                direction: -1,
                flashTimer: 0
            };
        });

        // Initialize Particles
        s.particles = Array.from({ length: config.maxParticles }).map(() => ({
            x: Math.random() * s.width,
            y: Math.random() * (s.height * 0.65), // keep largely in upper part
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            r: 1.5 + Math.random() * 1.5,
            opacity: 0.3 + Math.random() * 0.5
        }));

        s.meteors = [];
        s.explosions = [];
    }, [config]);

    /**
     * Spawns a new meteor randomly if conditions are met
     */
    const trySpawnMeteor = useCallback(() => {
        const s = stateRef.current;
        if ((s.mode === 'all' || s.mode === 'space') && s.meteors.length < config.maxMeteors && Math.random() < 0.005) {
            s.meteors.push({
                x: Math.random() * (s.width * 0.8),
                y: -50,
                vx: 8 + Math.random() * 6,
                vy: 4 + Math.random() * 4,
                length: 8,
                life: 1.0,
                decay: 0.01 + Math.random() * 0.02
            });
        }
    }, [config.maxMeteors]);

    /**
     * Spawns particle explosion at (x,y)
     */
    const spawnExplosion = useCallback((x, y) => {
        const s = stateRef.current;
        const pieces = Array.from({ length: 20 }).map(() => {
            const angle = Math.random() * Math.PI * 2;
            const speed = 2 + Math.random() * 4;
            return {
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 40,
                maxLife: 40,
                size: 1 + Math.random() * 3,
                color: Math.random() > 0.5 ? '#6366f1' : '#ff6a00'
            };
        });
        s.explosions.push(...pieces);
    }, []);

    /**
     * Core draw function called every frame
     */
    const draw = useCallback((ctx, time) => {
        const s = stateRef.current;
        if (!ctx || s.width === 0) return;

        // --- 1. Background (Sky Gradient) ---
        const bgGrad = ctx.createLinearGradient(0, 0, 0, s.height);
        bgGrad.addColorStop(0, '#04050a');
        bgGrad.addColorStop(1, '#0f0f2a');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, s.width, s.height);

        // --- 2. Static Star Field ---
        if (s.mode === 'all' || s.mode === 'space') {
            ctx.fillStyle = '#ffffff';
            // Deterministic pseudo-random stars based on width to avoid recalculation
            for (let i = 0; i < 50; i++) {
                const sx = ((i * 73) % s.width);
                const sy = ((i * 127) % (s.height * 0.6));
                const sopacity = 0.1 + (i % 5) / 10;
                ctx.globalAlpha = sopacity;
                ctx.beginPath();
                ctx.arc(sx, sy, 1, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1.0;
        }

        // --- 3. Meteors ---
        if (s.mode === 'all' || s.mode === 'space') {
            trySpawnMeteor();
            for (let i = s.meteors.length - 1; i >= 0; i--) {
                const m = s.meteors[i];
                m.x += m.vx;
                m.y += m.vy;
                m.life -= m.decay;

                ctx.beginPath();
                ctx.moveTo(m.x, m.y);
                ctx.lineTo(m.x - (m.vx * m.length), m.y - (m.vy * m.length));
                ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0, m.life)})`;
                ctx.lineWidth = 2;
                ctx.stroke();

                if (m.life <= 0 || m.x > s.width + 100 || m.y > s.height) {
                    s.meteors.splice(i, 1);
                }
            }
        }

        // --- 4. Particles Network ---
        if (s.mode === 'all' || s.mode === 'particles') {
            const topHeight = s.height * 0.65;
            for (let i = 0; i < s.particles.length; i++) {
                const p = s.particles[i];
                p.x += p.vx;
                p.y += p.vy;

                // Bounce
                if (p.x < 0 || p.x > s.width) p.vx *= -1;
                if (p.y < 0 || p.y > topHeight) p.vy *= -1;

                // Draw Dot
                ctx.fillStyle = `rgba(99, 102, 241, ${p.opacity})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                ctx.fill();

                // Draw Lines
                for (let j = i + 1; j < s.particles.length; j++) {
                    const p2 = s.particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const distSq = dx * dx + dy * dy;
                    if (distSq < 6400) { // 80px squared
                        const dist = Math.sqrt(distSq);
                        ctx.strokeStyle = `rgba(99, 102, 241, ${0.2 * (1 - dist / 80)})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
        }

        // --- 5. Road Section ---
        const roadTop = s.height * (1 - config.roadHeightPerc);

        // Grass/horizon strip
        ctx.fillStyle = '#061313';
        ctx.fillRect(0, roadTop - 20, s.width, 20);
        ctx.fillStyle = '#0a2e20';
        ctx.fillRect(0, roadTop - 5, s.width, 5);

        // Main road
        ctx.fillStyle = '#111116';
        ctx.fillRect(0, roadTop, s.width, s.height - roadTop);

        // Top & bottom glowing border
        ctx.strokeStyle = 'rgba(255, 106, 0, 0.4)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, roadTop); ctx.lineTo(s.width, roadTop);
        ctx.moveTo(0, s.height - 2); ctx.lineTo(s.width, s.height - 2);
        ctx.stroke();

        // Dashed lanes
        const laneHeight = (s.height - roadTop) / config.lanesCount;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 2;
        ctx.setLineDash([30, 40]);
        // Animate dashes moving left
        ctx.lineDashOffset = -(time * 0.05) % 70;

        for (let i = 1; i < config.lanesCount; i++) {
            ctx.beginPath();
            ctx.moveTo(0, roadTop + i * laneHeight);
            ctx.lineTo(s.width, roadTop + i * laneHeight);
            ctx.stroke();
        }
        ctx.setLineDash([]); // reset

        // Object hover logic
        s.hoveredVehicle = null;

        // --- 6. Vehicles (Traffic) ---
        if (s.mode === 'all' || s.mode === 'traffic') {

            const drawVehicle = (v, isCar) => {
                // Move
                v.x += v.speed;

                // Wrap
                if (v.direction === 1 && v.x > s.width + 100) v.x = -100;
                if (v.direction === -1 && v.x < -100) v.x = s.width + 100;

                // Hover Check
                if (s.mouse.tx >= v.x && s.mouse.tx <= v.x + v.w &&
                    s.mouse.ty >= v.y && s.mouse.ty <= v.y + v.h) {
                    s.hoveredVehicle = v;
                    v.flashTimer = 1.0; // max flash
                }

                // Decay flash
                if (v.flashTimer > 0) v.flashTimer -= 0.05;

                ctx.save();
                ctx.translate(v.x, v.y);

                if (isCar) {
                    // Car Draw
                    // Body
                    ctx.fillStyle = v.color;
                    // Filter to make flashing white
                    if (v.flashTimer > 0) ctx.fillStyle = '#ffffff';
                    ctx.beginPath();
                    ctx.roundRect(0, 0, v.w, v.h, 6);
                    ctx.fill();

                    // Windows
                    ctx.fillStyle = '#0f0f2a';
                    ctx.beginPath();
                    ctx.roundRect(10, 3, v.w - 20, v.h - 6, 2);
                    ctx.fill();

                    // Headlights/Taillights
                    ctx.fillStyle = '#ff0000'; // tail
                    ctx.fillRect(2, 4, 3, 4);
                    ctx.fillRect(2, v.h - 8, 3, 4);

                    ctx.fillStyle = '#ffffaa'; // head
                    ctx.fillRect(v.w - 5, 4, 4, 4);
                    ctx.fillRect(v.w - 5, v.h - 8, 4, 4);

                    // Headlight glow
                    const grad = ctx.createLinearGradient(v.w, 0, v.w + 60, 0);
                    grad.addColorStop(0, 'rgba(255, 255, 170, 0.4)');
                    grad.addColorStop(1, 'rgba(255, 255, 170, 0)');
                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    ctx.moveTo(v.w, 4); ctx.lineTo(v.w + 60, -10); ctx.lineTo(v.w + 60, v.h + 10); ctx.lineTo(v.w, v.h - 4);
                    ctx.fill();

                } else {
                    // Bike Draw
                    ctx.fillStyle = v.flashTimer > 0 ? '#ffffff' : v.color;

                    // Body
                    ctx.fillRect(10, 4, v.w - 20, v.h - 8);
                    // Wheels
                    ctx.beginPath(); ctx.ellipse(8, v.h / 2, 8, 4, 0, 0, Math.PI * 2); ctx.fill();
                    ctx.beginPath(); ctx.ellipse(v.w - 8, v.h / 2, 8, 4, 0, 0, Math.PI * 2); ctx.fill();

                    // Headlight glow (left side since direction -1)
                    const grad = ctx.createLinearGradient(0, 0, -50, 0);
                    grad.addColorStop(0, `rgba(${hexToRgb(v.color)}, 0.6)`);
                    grad.addColorStop(1, `rgba(${hexToRgb(v.color)}, 0)`);
                    ctx.fillStyle = grad;
                    ctx.beginPath();
                    ctx.moveTo(0, v.h / 2 - 2); ctx.lineTo(-50, -10); ctx.lineTo(-50, v.h + 10); ctx.lineTo(0, v.h / 2 + 2);
                    ctx.fill();
                }

                // Draw tooltip if hovered recently
                if (v.flashTimer > 0.8) {
                    ctx.fillStyle = 'white';
                    ctx.font = '10px "Orbitron", sans-serif'; // fallback to monospace if Orbitron not loaded yet
                    ctx.textAlign = 'center';
                    const speedText = Math.floor(Math.abs(v.speed) * 45) + ' km/h';
                    ctx.fillText(speedText, v.w / 2, -10);
                }

                ctx.restore();
            };

            // Draw bikes then cars to maintain perspective
            s.bikes.forEach(b => drawVehicle(b, false));
            s.cars.forEach(c => drawVehicle(c, true));
        }

        // --- 7. Explosions ---
        for (let i = s.explosions.length - 1; i >= 0; i--) {
            const p = s.explosions[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.95; // friction
            p.vy *= 0.95;
            p.life--;

            ctx.fillStyle = p.color;
            ctx.globalAlpha = p.life / p.maxLife;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            if (p.life <= 0) s.explosions.splice(i, 1);
        }
        ctx.globalAlpha = 1.0;

        // --- 8. Cursor Following Ring ---
        if (s.mouse.isHovering) {
            s.mouse.x += (s.mouse.tx - s.mouse.x) * config.cursorFollowLerp;
            s.mouse.y += (s.mouse.ty - s.mouse.y) * config.cursorFollowLerp;

            ctx.strokeStyle = `rgba(99, 102, 241, 0.8)`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(s.mouse.x, s.mouse.y, 30, 0, Math.PI * 2);
            ctx.stroke();

            // inner dot
            ctx.fillStyle = `rgba(99, 102, 241, 0.5)`;
            ctx.beginPath();
            ctx.arc(s.mouse.x, s.mouse.y, 4, 0, Math.PI * 2);
            ctx.fill();
        }

    }, [config, trySpawnMeteor]);

    /**
     * Main game loop using requestAnimationFrame
     */
    const tick = useCallback((time) => {
        const s = stateRef.current;
        if (!canvasRef.current) return;
        const ctx = canvasRef.current.getContext('2d');

        // Calculate FPS
        const delta = time - s.lastTime;
        s.lastTime = time;
        if (delta > 0) {
            const currentFps = 1000 / delta;
            s.fpsSamples.push(currentFps);
            if (s.fpsSamples.length > 30) s.fpsSamples.shift();
        }

        // Only setState for FPS every 30 frames
        s.frameCount++;
        if (s.frameCount % 30 === 0 && s.fpsSamples.length > 0) {
            const avg = s.fpsSamples.reduce((a, b) => a + b) / s.fpsSamples.length;
            setFps(Math.round(avg));
        }

        // Sync mode from React state to mutable ref safely
        s.mode = mode;

        draw(ctx, time);
        animRef.current = requestAnimationFrame(tick);
    }, [draw, mode]);

    // --- External Effects & Handlers ---

    // Handle Resize observation
    useEffect(() => {
        if (!containerRef.current || !canvasRef.current) return;

        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                const { width } = entry.contentRect;
                stateRef.current.width = width;
                canvasRef.current.width = width;
                canvasRef.current.height = stateRef.current.height;
                initObjects();
            }
        });

        observer.observe(containerRef.current);

        return () => observer.disconnect();
    }, [initObjects]);

    // Handle intersection observer for fade-in
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const io = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) setIsVisible(true);
        }, { threshold: 0.2 });

        io.observe(el);
        return () => io.disconnect();
    }, []);

    // Handle animation loop start/stop
    useEffect(() => {
        animRef.current = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(animRef.current);
    }, [tick]);

    // Mouse handlers
    const handleMouseMove = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        stateRef.current.mouse.tx = e.clientX - rect.left;
        stateRef.current.mouse.ty = e.clientY - rect.top;

        // Jump instantly to position on first hover
        if (!stateRef.current.mouse.isHovering) {
            stateRef.current.mouse.x = stateRef.current.mouse.tx;
            stateRef.current.mouse.y = stateRef.current.mouse.ty;
            stateRef.current.mouse.isHovering = true;
        }
    };

    const handleMouseLeave = () => {
        stateRef.current.mouse.isHovering = false;
    };

    const handleClick = (e) => {
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        spawnExplosion(x, y);
    };

    // Helper to convert hex to rgb string for templates
    const hexToRgb = (hex) => {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
    };

    const modes = ['all', 'traffic', 'particles', 'space'];

    return (
        <section
            id="playground"
            ref={containerRef}
            className={`relative py-20 overflow-hidden bg-[#07080f] transition-all duration-700 ease-out transform
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
            <div className="max-w-6xl mx-auto px-4">

                {/* Header content matching Tailwind specification */}
                <span className="font-mono text-xs tracking-widest text-indigo-500 uppercase">
          // Interactive Lab
                </span>
                <h2 className="text-4xl font-black text-white mt-2 mb-2">
                    Live <span className="text-orange-500">Playground</span>
                </h2>
                <p className="text-sm text-gray-500 font-mono mb-6">
                    Click anywhere · Hover vehicles · Switch layers
                </p>

                {/* Top bar with buttons and FPS */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex flex-wrap gap-2">
                        {modes.map(m => (
                            <button
                                key={m}
                                onClick={() => setMode(m)}
                                className={`px-4 py-1.5 rounded-full font-mono text-xs uppercase tracking-widest border transition-all duration-200 focus:outline-none
                  ${mode === m
                                        ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300'
                                        : 'border-white/10 text-gray-500 hover:border-white/25 hover:text-white'
                                    }`}
                            >
                                {m}
                            </button>
                        ))}
                    </div>

                    <div className="font-mono text-[10px] text-green-400 bg-green-400/10 px-2 py-1 rounded border border-green-400/20">
                        {fps} FPS
                    </div>
                </div>

            </div>

            {/* Full width Canvas wrapper */}
            <div className="w-full relative shadow-[0_0_50px_rgba(99,102,241,0.1)]">
                <canvas
                    ref={canvasRef}
                    onMouseMove={handleMouseMove}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleClick}
                    className="block w-full cursor-none"
                    style={{ height: '420px' }}
                />

                {/* Subtle top/bottom overlays to blend into section */}
                <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-[#07080f] to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-[#07080f] to-transparent pointer-events-none" />
            </div>
        </section>
    );
}
