import React, { useState } from 'react';
import { Cpu, Terminal, Layout, Shield, Server, Sparkles, Layers, CheckCircle2 } from 'lucide-react';
import { playClick, playSuccess } from './AudioSynth';

interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'mobile' | 'tools';
  level: number; // percentage
  color: string;
  description: string;
}

const ALL_SKILLS: Skill[] = [
  { name: 'Java & JS', category: 'frontend', level: 90, color: '#f59e0b', description: 'Desarrollo robusto con Java en backend y JavaScript para dinamizar e interconectar sistemas modernos en el frontend.' },
  { name: 'Flutter / Dart', category: 'mobile', level: 92, color: '#22d3ee', description: 'Creación de aplicaciones móviles fluidas y optimizadas para múltiples plataformas utilizando Dart y el ecosistema de Flutter.' },
  { name: 'HTML & CSS', category: 'frontend', level: 95, color: '#ec4899', description: 'Maquetación web semántica de alta fidelidad con estilos limpios, adaptables y estructuras de diseño modernas.' },
  { name: 'Delphi', category: 'backend', level: 88, color: '#a855f7', description: 'Desarrollo de aplicaciones empresariales de gran escala con Delphi, garantizando rendimiento y estabilidad.' },
  { name: 'C#', category: 'backend', level: 85, color: '#3b82f6', description: 'Programación orientada a objetos en ecosistemas .NET, enfocada en la eficiencia, APIs y seguridad.' },
  { name: 'Python', category: 'backend', level: 80, color: '#10b981', description: 'Automatización, scripts ágiles, procesamiento de datos y lógicas de backend dinámicas.' },
  { name: 'MySQL', category: 'backend', level: 88, color: '#06b6d4', description: 'Diseño, administración y optimización de bases de datos relacionales estructuradas.' },
  { name: 'SQL Server', category: 'backend', level: 90, color: '#e11d48', description: 'Gestión empresarial de datos a gran escala con Microsoft SQL Server, procedimientos almacenados y consultas complejas.' },
  { name: 'MongoDB', category: 'backend', level: 82, color: '#10b981', description: 'Modelado NoSQL escalable para almacenamiento flexible de documentos y rapidez en aplicaciones modernas.' },
  { name: 'Docker', category: 'tools', level: 80, color: '#0ea5e9', description: 'Contenerización de aplicaciones para garantizar despliegues y entornos de producción consistentes.' },
];

export const SkillsCore: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'frontend' | 'backend' | 'mobile' | 'tools'>('all');
  const [activeSkill, setActiveSkill] = useState<Skill | null>(ALL_SKILLS[0]);

  const filteredSkills = selectedCategory === 'all' 
    ? ALL_SKILLS 
    : ALL_SKILLS.filter(s => s.category === selectedCategory);

  const handleSkillClick = (skill: Skill) => {
    playClick();
    setActiveSkill(skill);
  };

  const handleCategoryChange = (category: typeof selectedCategory) => {
    playSuccess();
    setSelectedCategory(category);
    const categoryFirstSkill = ALL_SKILLS.find(s => category === 'all' || s.category === category);
    if (categoryFirstSkill) {
      setActiveSkill(categoryFirstSkill);
    }
  };

  // Radar chart computation based on high level categories
  const categories = [
    { name: 'Frontend', score: 95, angle: 0 },
    { name: 'Backend', score: 90, angle: 72 },
    { name: 'Mobile', score: 92, angle: 144 },
    { name: 'Tools', score: 80, angle: 216 },
    { name: 'Uptime', score: 98, angle: 288 },
  ];

  const getCoordinates = (angle: number, value: number) => {
    const radian = (angle - 90) * (Math.PI / 180);
    const radius = (value / 100) * 80;
    const x = 100 + radius * Math.cos(radian);
    const y = 100 + radius * Math.sin(radian);
    return { x, y };
  };

  const radarPoints = categories.map(c => getCoordinates(c.angle, c.score));
  const radarPath = radarPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x},${p.y}`).join(' ') + ' Z';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Dynamic Skill Constellation Visualizer */}
      <div className="lg:col-span-5 bg-[#151515] rounded-2xl border border-white/10 p-6 backdrop-blur-md flex flex-col items-center">
        <div className="flex items-center space-x-2 self-start mb-4">
          <Layers className="text-cyan-400" size={18} />
          <h3 className="font-sans text-xs uppercase tracking-widest text-slate-100 font-bold">Matriz de Habilidades 3D</h3>
        </div>

        {/* Custom SVG Radar Chart */}
        <div className="relative w-full max-w-[240px] aspect-square flex items-center justify-center my-4 select-none">
          <svg className="w-full h-full overflow-visible" viewBox="0 0 200 200">
            {/* Background Grid Rings */}
            {[20, 40, 60, 80].map((r, idx) => (
              <polygon
                key={idx}
                points={categories.map(c => {
                  const p = getCoordinates(c.angle, r);
                  return `${p.x},${p.y}`;
                }).join(' ')}
                fill="none"
                stroke="rgba(255, 255, 255, 0.05)"
                strokeWidth="1"
              />
            ))}

            {/* Ray lines */}
            {categories.map((c, i) => {
              const p = getCoordinates(c.angle, 80);
              const labelPos = getCoordinates(c.angle, 98);
              return (
                <g key={i}>
                  <line
                    x1="100"
                    y1="100"
                    x2={p.x}
                    y2={p.y}
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="1"
                  />
                  <text
                    x={labelPos.x}
                    y={labelPos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="font-sans text-[9px] fill-white/40 font-bold uppercase tracking-widest"
                  >
                    {c.name}
                  </text>
                </g>
              );
            })}

            {/* Radar Filled Shape */}
            <polygon
              points={categories.map(c => {
                const p = getCoordinates(c.angle, c.score);
                return `${p.x},${p.y}`;
              }).join(' ')}
              fill="rgba(34, 211, 238, 0.08)"
              stroke="#22d3ee"
              strokeWidth="1.5"
              className="animate-pulse"
            />

            {/* Data point dots */}
            {radarPoints.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r="3.5"
                fill="#f59e0b"
                stroke="#080808"
                strokeWidth="1"
              />
            ))}
          </svg>
        </div>

        {/* Selected Skill Quick Info */}
        {activeSkill && (
          <div className="w-full mt-4 p-4 rounded-xl bg-[#0a0a0a] border border-white/10 transition-all duration-300">
            <div className="flex justify-between items-center mb-1.5">
              <span className="font-sans font-bold text-slate-100 text-sm flex items-center space-x-1.5">
                <span style={{ backgroundColor: activeSkill.color }} className="w-2.5 h-2.5 rounded-full inline-block animate-pulse"></span>
                <span>{activeSkill.name}</span>
              </span>
              <span className="font-mono text-xs font-bold text-cyan-400">{activeSkill.level}%</span>
            </div>
            {/* Progress bar */}
            <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden mb-3">
              <div
                style={{ width: `${activeSkill.level}%`, backgroundColor: activeSkill.color }}
                className="h-full rounded-full transition-all duration-700 ease-out"
              ></div>
            </div>
            <p className="text-[11px] text-white/50 leading-relaxed">
              {activeSkill.description}
            </p>
          </div>
        )}
      </div>

      {/* Categories & Selector grid */}
      <div className="lg:col-span-7 space-y-6">
        {/* Category Toggles */}
        <div className="flex flex-wrap gap-2 p-1 bg-[#151515] rounded-xl border border-white/10">
          {(['all', 'frontend', 'backend', 'mobile', 'tools'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-white/10 border border-white/20 text-cyan-400 shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat === 'all' ? 'Ver Todos' : cat}
            </button>
          ))}
        </div>

        {/* Skill Node Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {filteredSkills.map((skill) => {
            const isActive = activeSkill?.name === skill.name;
            return (
              <div
                key={skill.name}
                onClick={() => handleSkillClick(skill)}
                className={`group relative p-4 rounded-xl border cursor-pointer select-none transition-all duration-300 flex flex-col justify-between h-[110px] hover:translate-y-[-2px] ${
                  isActive
                    ? 'bg-[#151515] border-cyan-400/60 shadow-lg shadow-cyan-500/10'
                    : 'bg-[#151515]/40 border-white/10 hover:bg-[#151515]/60 hover:border-white/25'
                }`}
              >
                {/* Tech logo background watermarks */}
                <span className="absolute top-3 right-3 text-white/20 text-[10px] font-mono group-hover:text-cyan-400/30 transition-colors">
                  {skill.category.substring(0, 3).toUpperCase()}
                </span>

                <div className="flex flex-col">
                  <span className={`font-sans text-xs font-bold transition-colors leading-tight ${isActive ? 'text-cyan-300' : 'text-slate-300 group-hover:text-slate-100'}`}>
                    {skill.name}
                  </span>
                  <span className="text-[10px] font-mono text-white/40 mt-0.5">Nivel: {skill.level}%</span>
                </div>

                <div className="w-full flex items-center space-x-2 mt-2">
                  <div className="flex-1 h-1 bg-[#0a0a0a] rounded-full overflow-hidden">
                    <div
                      style={{ width: `${skill.level}%`, backgroundColor: skill.color }}
                      className="h-full rounded-full transition-all duration-500"
                    ></div>
                  </div>
                  {isActive && <CheckCircle2 size={12} className="text-cyan-400 animate-pulse" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Practical Experience Bento Grid banner */}
        <div className="p-6 rounded-xl bg-gradient-to-r from-[#151515] to-[#0d0d0d] border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl"></div>
          <div className="flex items-center space-x-3 mb-2">
            <Sparkles className="text-cyan-400" size={16} />
            <h4 className="font-sans text-xs font-bold text-slate-200 uppercase tracking-widest">Enfoque de Ingeniería</h4>
          </div>
          <p className="text-xs text-white/50 leading-relaxed">
            No utilizo plantillas. Escribo código limpio, robusto y modular. Priorizo la accesibilidad, diseño UX centrado en la velocidad de renderizado, y arquitecturas acopladas mediante TypeScript estricto.
          </p>
        </div>
      </div>
    </div>
  );
};
