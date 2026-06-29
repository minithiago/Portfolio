import React, { useState, useEffect } from 'react';
import { Award, Zap, GitBranch, Terminal, MapPin, Coffee, Activity, ArrowUpRight } from 'lucide-react';
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
      <div className="md:col-span-2 md:row-span-2 bg-gradient-to-tr from-[#151515] to-[#0f0f0f] p-6 rounded-2xl border border-white/10 flex flex-col justify-between relative overflow-hidden backdrop-blur-md">
        {/* Subtle decorative grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

        <div className="space-y-4 relative z-10">
          <div className="flex items-center space-x-2 text-slate-400">
            <MapPin size={14} className="text-cyan-400" />
            <span className="text-[10px] font-mono tracking-wider uppercase">Localización: Alicante, España</span>
          </div>
          
          <h2 className="text-2xl font-sans font-bold text-slate-100 leading-tight">
            Diseño interfaces interactivas y construyo <span className="text-cyan-400 underline decoration-cyan-500/30 underline-offset-4">arquitecturas de software robustas</span>.
          </h2>

          <p className="text-xs text-white/60 leading-relaxed max-w-xl">
            Tengo varios años de experiencia esculpiendo código limpio para la web, plataformas móviles y de escritorio. Me especializo en el desarrollo ágil multiplataforma, rendimiento del lado del cliente e integraciones de bases de datos seguras. No me limito a programar: creo sistemas eficientes y experiencias que se sienten vivas.
          </p>
        </div>

        <div className="flex flex-wrap gap-6 pt-4 border-t border-white/10 text-xs font-mono text-white/50 relative z-10">
          <div>
            <span className="block text-xl font-bold text-slate-200">95%</span>
            <span className="text-[10px] uppercase text-white/40">Uptime mental</span>
          </div>
          <div>
            <span className="block text-xl font-bold text-slate-200">+30</span>
            <span className="text-[10px] uppercase text-white/40">Proyectos creados</span>
          </div>
          <div>
            <span className="block text-xl font-bold text-slate-200">100%</span>
            <span className="text-[10px] uppercase text-white/40">Código Libre de IA</span>
          </div>
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

      {/* 3. Github Commits calendar (Span 1x2 - Vertical bento element) */}
      <div className="md:row-span-2 bg-[#151515] p-5 rounded-2xl border border-white/10 flex flex-col justify-between backdrop-blur-md">
        <div>
          <div className="flex items-center space-x-2 text-slate-400 mb-3">
            <GitBranch size={14} className="text-cyan-400" />
            <span className="text-[10px] font-sans tracking-wider uppercase">Frecuencia de Commits</span>
          </div>

          {/* Grid display */}
          <div className="grid grid-cols-7 gap-1 bg-[#0a0a0a] p-3 rounded-xl border border-white/5">
            {days.map((day) => {
              const bg =
                day.commits > 8
                  ? 'bg-cyan-400'
                  : day.commits > 4
                  ? 'bg-cyan-500/60'
                  : day.commits > 0
                  ? 'bg-cyan-950/40'
                  : 'bg-white/5';

              return (
                <div
                  key={day.index}
                  onClick={() => handleDaySelect(day)}
                  className={`aspect-square rounded-[2px] transition-transform duration-100 cursor-pointer ${bg} hover:scale-120 hover:ring-1 hover:ring-cyan-300`}
                  title={`${day.commits} commits`}
                ></div>
              );
            })}
          </div>

          {/* Interactive display feedback */}
          <div className="min-h-[24px] mt-2 text-[10px] font-mono text-white/50 text-center">
            {selectedDay ? (
              <span>Bloque #{selectedDay.index}: <strong className="text-cyan-400">{selectedDay.commits} commits</strong></span>
            ) : (
              <span className="text-white/30">Selecciona un bloque para ver telemetría</span>
            )}
          </div>
        </div>

        <div className="text-[10px] font-sans text-white/40 leading-snug">
          Representación física interactiva de actividades del compilador local.
        </div>
      </div>

      {/* 4. Small Coffee stat (Span 1x1) */}
      <div className="bg-[#151515] p-5 rounded-2xl border border-white/10 flex justify-between items-center backdrop-blur-md">
        <div className="space-y-1">
          <span className="text-[9px] font-sans text-white/40 uppercase tracking-widest block">Consumo de Energía</span>
          <span className="text-2xl font-bold font-mono text-slate-100">842+</span>
          <span className="text-[10px] font-sans text-white/60 block">Tazas de café procesadas</span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center">
          <Coffee className="text-fuchsia-400" size={20} />
        </div>
      </div>

      {/* 5. Framework Stack small stat (Span 1x1) */}
      <div className="bg-[#151515] p-5 rounded-2xl border border-white/10 flex justify-between items-center backdrop-blur-md">
        <div className="space-y-1">
          <span className="text-[9px] font-sans text-white/40 uppercase tracking-widest block">Uptime Garantizado</span>
          <span className="text-2xl font-bold font-mono text-slate-100">99.98%</span>
          <span className="text-[10px] font-sans text-white/60 block">SLA de producción</span>
        </div>
        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
          <Zap className="text-cyan-400" size={20} />
        </div>
      </div>

    </div>
  );
};
