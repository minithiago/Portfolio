import React, { useState, useEffect } from 'react';
import { Award, Zap, GitBranch, Terminal, MapPin, Coffee, Activity, ArrowUpRight, User,AppWindow } from 'lucide-react';
import { playClick, playSuccess } from './AudioSynth';

export const BentoStats: React.FC = () => {
  // Activity calendar hover state
  const [selectedDay, setSelectedDay] = useState<{ index: number; commits: number } | null>(null);
  
  // Heartbeat signal
  const [heartbeat, setHeartbeat] = useState<number[]>([30, 28, 35, 42, 38, 30, 28, 45, 55, 30, 28, 32]);
  const [ping, setPing] = useState(14);

  // Generate continuous heartbeat pulse
  useEffect(() => {
    const interval = setInterval(() => {
      setHeartbeat((prev) => {
        const next = [...prev.slice(1)];
        // Create organic peaks
        const rand = Math.random();
        let value = 30;
        if (rand > 0.85) value = 75; // high heartbeat peak
        else if (rand > 0.6) value = 50;
        else value = 25 + Math.floor(Math.random() * 10);
        next.push(value);
        return next;
      });
      setPing(12 + Math.floor(Math.random() * 5));
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  // Generate mock contribution data for calendar grid
  const days = Array.from({ length: 42 }).map((_, idx) => {
    // create pseudo-random organic clusters
    const seed = Math.sin(idx * 0.15) * Math.cos(idx * 0.3);
    const commits = seed > 0.5 ? Math.floor(seed * 12) : seed > 0 ? Math.floor(seed * 5) : 0;
    return { index: idx, commits };
  });

  const handleDaySelect = (day: { index: number; commits: number }) => {
    playClick();
    setSelectedDay(day);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[160px]">
      
      {/* 1. Large Bio card (Span 2x2) */}
      <div className="md:col-span-3 md:row-span-2 bg-gradient-to-tr from-[#151515] to-[#0f0f0f] p-6 rounded-2xl border border-white/10 flex flex-col justify-between relative overflow-hidden backdrop-blur-md">
        {/* Subtle decorative grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        <div className="space-y-4 relative z-10">
          <div className="flex items-center space-x-2 text-slate-400">
            <MapPin size={14} className="text-cyan-400" />
            <span className="text-[10px] font-mono tracking-wider uppercase">Localización: Alicante, España</span>
          </div>
          
          <h2 className="text-2xl font-sans font-bold text-slate-100 leading-tight">
            Soy un desarrollador con conocimientos para construir <span className="text-cyan-400 underline decoration-cyan-500/30 underline-offset-4">aplicaciones web, de escritorio y móviles</span> <span className="text-2xl font-sans font-bold text-slate-100 leading-tight">modernas y fáciles de usar</span>.
          </h2>

          <p className="text-xs text-white/60 leading-relaxed max-w-xl">
            Tengo varios años de experiencia escribiendo código limpio para webs, plataformas móviles y de escritorio. Me especializo en el desarrollo multiplataforma, rendimiento del lado del cliente e integraciones de bases de datos seguras. Soy una persona trabajadora, comunicativa y comprometida.
          </p>
        </div>

        <div className="flex flex-wrap gap-15 pt-4 border-t border-white/10 text-xs font-mono text-white/50 relative z-10">
          <div>
            <span className="block text-xl font-bold text-slate-200">+5</span>
            <span className="text-[10px] uppercase text-white/40">Webs</span>
          </div>
          <div>
            <span className="block text-xl font-bold text-slate-200">+3</span>
            <span className="text-[10px] uppercase text-white/40">Apps Móviles</span>
          </div>
          <div>
            <span className="block text-xl font-bold text-slate-200">+10</span>
            <span className="text-[10px] uppercase text-white/40">Proyectos creados</span>
          </div>
        </div>
      </div>

      

      {/* 4. Edad y experiencia stat (Span 1x1) */}
      <div className="bg-[#151515] p-5 rounded-2xl border border-white/10 flex justify-between items-center backdrop-blur-md">
        <div className="space-y-2">
          <div>
            <span className="text-[9px] font-sans text-white/40 uppercase tracking-widest block">Edad</span>
            <span className="text-2xl font-bold font-mono text-slate-100">22</span>
          </div>
          <div>
            <span className="text-[9px] font-sans text-white/40 uppercase tracking-widest block">Experiencia</span>
            <span className="text-lg font-bold font-mono text-slate-100">+5</span>
            <span className="text-[10px] font-sans text-white/60"> años en el sector</span>
          </div>
        </div>
        <div className="w-12 h-12 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center">
          <User className="text-fuchsia-400" size={20} />
        </div>
      </div>

      {/* 5. Proyectos reales stat (Span 1x1) */}
      <div className="bg-[#151515] p-5 rounded-2xl border border-white/10 flex justify-between items-center backdrop-blur-md">
        <div className="space-y-1">
          <span className="text-[9px] font-sans text-white/40 uppercase tracking-widest block">Proyectos Reales</span>
          <span className="text-2xl font-bold font-mono text-slate-100">+11</span>
          <span className="text-[10px] font-sans text-white/60 block">Desde 2022</span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
          <AppWindow className="text-cyan-400" size={20} />
        </div>
      </div>

      {/* 2. Heartbeat Ping widget (Span 1x1) */}
      <div className="bg-[#151515] p-5 rounded-2xl border border-white/10 flex flex-col justify-between backdrop-blur-md">
        <div className="flex justify-between items-center text-slate-400">
          <span className="text-[10px] font-mono uppercase tracking-widest flex items-center space-x-1.5">
            <Activity size={12} className="text-cyan-400 animate-pulse" />
            <span>Telemetry Link</span>
          </span>
          <span className="text-[10px] font-mono text-cyan-400 font-bold">{ping}ms</span>
        </div>

        {/* Mini SVG Heartbeat path */}
        <div className="h-10 w-full flex items-end">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 100 30" preserveAspectRatio="none">
            <path
              d={heartbeat
                .map((val, idx) => {
                  const x = (idx / (heartbeat.length - 1)) * 100;
                  const y = 30 - val * 0.35;
                  return `${idx === 0 ? 'M' : 'L'} ${x},${y}`;
                })
                .join(' ')}
              fill="none"
              stroke="#22d3ee"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <div className="text-[10px] font-mono text-white/40 flex justify-between">
          <span>Server Status: ONLINE</span>
          <span>EST. 2021</span>
        </div>
      </div>
    </div>
  );
};
