import { useState, useEffect } from 'react';
import {
  Terminal as TerminalIcon,
  Cpu,
  Code,
  User,
  MessageSquare,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Volume2,
  VolumeX,
  Sparkles,
  Clock,
  Menu,
  X,
  Smartphone,
  CheckCircle,
  FolderKanban
} from 'lucide-react';
import { SpaceCanvas } from './components/SpaceCanvas';
import { HoloCube } from './components/HoloCube';
import { ProjectsSection } from './components/ProjectsSection';
import { SkillsCore } from './components/SkillsCore';
import { BentoStats } from './components/BentoStats';
import { TerminalContact } from './components/TerminalContact';
import { toggleSound, isSoundEnabled, playSelect, playClick } from './components/AudioSynth';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('inicio');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  
  // España (Europe/Madrid) simulated ticking clock
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format to Spain time timezone (Madrid)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Europe/Madrid',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setTimeStr(now.toLocaleTimeString('es-ES', options));
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    if (soundEnabled) {
      playSelect();
    }
    // Scroll window smoothly to content section if on mobile
    if (window.innerWidth < 1024) {
      const target = document.getElementById('main-content-display');
      target?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSoundToggle = () => {
    const newState = toggleSound();
    setSoundEnabled(newState);
    if (newState) {
      playClick();
    }
  };

  const menuItems = [
    { id: 'inicio', label: 'Inicio', icon: Sparkles, color: 'text-cyan-400' },
    { id: 'proyectos', label: 'Proyectos', icon: Code, color: 'text-fuchsia-400' },
    { id: 'habilidades', label: 'Tecnologías', icon: Cpu, color: 'text-orange-400' },
    { id: 'stats', label: 'Sobre Mí', icon: User, color: 'text-cyan-400' },
    { id: 'contacto', label: 'Contacto', icon: MessageSquare, color: 'text-fuchsia-400' },
  ];

  return (
    <div className="min-h-screen bg-[#080808] text-[#F0F0F0] flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden">
      
      {/* 3D Connecting Nodes canvas background */}
      <SpaceCanvas />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 bg-grid opacity-15 pointer-events-none z-0"></div>

      {/* Giant outline text backdrop */}
      <div className="absolute -top-6 -left-6 text-[150px] md:text-[250px] font-display text-outline leading-none select-none z-0 tracking-tighter uppercase pointer-events-none">
        {activeSection === 'inicio' ? 'WELCOME' : activeSection === 'proyectos' ? 'PROJECTS' : activeSection === 'habilidades' ? 'TECH' : activeSection === 'stats' ? 'ABOUT' : 'TRANSMIT'}
      </div>

      {/* Decorative top ambient glow lines */}
      <div className="absolute -top-20 -left-20 w-80 h-80 bg-cyan-500/10 blur-[120px] rounded-full glow-animation pointer-events-none"></div>
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-fuchsia-500/5 blur-[120px] rounded-full glow-animation pointer-events-none" style={{ animationDelay: '-4s' }}></div>

      {/* MAIN TOP NAVIGATION HEADER */}
      <header className="relative z-30 max-w-7xl w-full mx-auto px-6 pt-8 pb-4 flex flex-col md:flex-row justify-between items-start gap-6">
        <div className="flex flex-col cursor-pointer" onClick={() => handleSectionChange('inicio')}>
          <span className="text-[10px] tracking-[0.4em] text-cyan-400 font-semibold mb-1">PORTFOLIO VOL.01</span>
          <h1 className="text-4xl md:text-5xl font-display uppercase leading-none tracking-tight">IVAN<br/>NARANJO</h1>
        </div>
        
        {/* Right Nav Menu items */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full md:w-auto md:self-end">
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-sans font-bold tracking-widest uppercase">
            {menuItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSectionChange(item.id)}
                  className={`pb-1 transition-all cursor-pointer ${
                    isActive
                      ? 'border-b border-cyan-400 text-cyan-400'
                      : 'text-slate-400 hover:text-white opacity-60 hover:opacity-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 ml-auto sm:ml-0">
            {/* Realtime Local Clock (Spain time) */}
            <div className="flex items-center space-x-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-mono text-slate-400 select-none">
              <Clock size={10} className="text-cyan-400 animate-spin-slow" />
              <span>ALC: {timeStr || '00:00:00'}</span>
            </div>

            {/* Audio Toggle button */}
            <button
              onClick={handleSoundToggle}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                soundEnabled
                  ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20'
                  : 'bg-white/5 border-white/10 text-slate-500 hover:text-slate-300'
              }`}
              title={soundEnabled ? "Silenciar" : "Activar sonido interactivo"}
            >
              {soundEnabled ? <Volume2 size={13} /> : <VolumeX size={13} />}
            </button>

            {/* GitHub Profile */}
            <a
              href="https://github.com/minithiago"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-slate-400 hover:text-slate-100 transition-colors"
              title="GitHub Profile"
            >
              <Github size={13} />
            </a>

            {/* LinkedIn Profile */}
            <a
              href="https://www.linkedin.com/in/ivan-naranjo-14049230a/"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-slate-400 hover:text-slate-100 transition-colors"
              title="LinkedIn Profile"
            >
              <Linkedin size={13} />
            </a>

            {/* Mobile menu trigger */}
            <button
              onClick={() => {
                playClick();
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2 bg-white/5 border border-white/10 text-slate-300 rounded-lg"
            >
              {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE NAVIGATION DROPDOWN */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[135px] left-0 right-0 z-40 bg-[#080808]/95 border-b border-white/10 p-4 space-y-2 backdrop-blur-lg">
          {menuItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`w-full p-3 rounded-xl font-sans text-xs font-bold uppercase flex items-center space-x-3 cursor-pointer ${
                  isActive
                    ? 'bg-white/5 border border-white/10 text-cyan-400'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/2'
                }`}
              >
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* TWO-COLUMN IMMERSIVE PORTFOLIO LAYOUT */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* LEFT COLUMN: The Interactive 3D Cube Controller & Call to action (Persistent) */}
        <section className="lg:col-span-4 lg:sticky lg:top-28 space-y-6 flex flex-col items-center">
          
          {/* Neon Display card detailing current focused system view */}
          <div className="w-full bg-[#111] p-5 rounded-2xl border border-white/10 text-center space-y-3 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-fuchsia-500 opacity-60"></div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[9px] font-sans font-bold tracking-widest bg-white/5 text-cyan-400 border border-white/10 uppercase">
              Holograma de Control
            </span>
            <h2 className="text-xl font-display uppercase tracking-tight text-slate-100">
              Consola del Portfolio
            </h2>
            <p className="text-xs text-white/60 max-w-xs mx-auto leading-relaxed">
              Gira el cubo 3D o usa el menú de navegación superior para teletransportarte instantáneamente entre secciones.
            </p>
          </div>

          {/* Interactive 3D Cube Component */}
          <HoloCube activeSection={activeSection} onSectionChange={handleSectionChange} />

          {/* Contact quick transceiver status */}
          <div className="w-full bg-[#111] border border-white/10 rounded-2xl p-4 flex items-center justify-between text-xs text-white/50">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span>Canal Directo: ACTIVO</span>
            </div>
            <button
              onClick={() => handleSectionChange('contacto')}
              className="text-cyan-400 hover:text-cyan-300 font-bold uppercase tracking-wider text-[10px] cursor-pointer"
            >
              Enviar Mensaje →
            </button>
          </div>

        </section>

        {/* RIGHT COLUMN: The Dynamic Interactive Displays (Main content panel) */}
        <section id="main-content-display" className="lg:col-span-8 min-h-[520px] w-full bg-[#111] rounded-2xl border border-white/20 shadow-[40px_60px_100px_rgba(0,0,0,0.5)] p-6 md:p-8 relative overflow-hidden">
          
          {/* Rainbow header top border like Marcus Klein design */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-orange-500"></div>

          {/* SECTION 1: INICIO (HERO SCREEN) */}
          {activeSection === 'inicio' && (
            <div className="space-y-8">
              <div className="space-y-4 pt-4">
                <div className="flex items-center space-x-2 text-cyan-400">
                  <Sparkles size={14} />
                  <span className="text-[10px] tracking-[0.3em] uppercase font-semibold">DESARROLLADOR DE APLICACIONES</span>
                </div>
                
                <h2 className="text-4xl md:text-6xl font-display uppercase leading-none tracking-tight">
                  FULL-STACK DEVELOPER
                </h2>

                <p className="text-sm md:text-base text-white/60 leading-relaxed max-w-xl">
                  Hola, soy Iván, desarrollador especializado en el desarrollo de aplicaciones móviles nativas, de escritorio y sitios web . Explora mis proyectos y ponte en contacto conmigo.
                </p>
              </div>

              {/* Call to actions */}
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => handleSectionChange('proyectos')}
                  className="px-6 py-3 bg-white text-black font-display text-sm tracking-wider hover:bg-cyan-400 transition-colors uppercase cursor-pointer"
                >
                  VER PROYECTOS
                </button>
                <button
                  onClick={() => handleSectionChange('contacto')}
                  className="px-6 py-3 border border-white/20 font-display text-sm tracking-wider uppercase hover:bg-white/10 transition-colors cursor-pointer"
                >
                  ENVIAR MENSAJE
                </button>
              </div>

              {/* Bento Quick Intro Specs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-white/10">
                <div className="p-6 bg-white/5 rounded-xl border border-white/5">
                  <h4 className="text-[10px] tracking-widest text-cyan-400 uppercase font-semibold">100% SIN PLANTILLAS</h4>
                  <p className="text-xs text-white/50 mt-2 leading-relaxed">
                    Cada componente está hecho a medida con código limpio, TypeScript estricto y animaciones optimizadas para una fluidez absoluta.
                  </p>
                </div>
                <div className="p-6 bg-white/5 rounded-xl border border-white/5">
                  <h4 className="text-[10px] tracking-widest text-fuchsia-400 uppercase font-semibold">INTERACTIVIDAD TOTAL</h4>
                  <p className="text-xs text-white/50 mt-2 leading-relaxed">
                    Sáltate las capturas estáticas. Interactúa directamente con mis proyectos ejecutando simuladores interactivos integrados en tiempo real.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* SECTION 2: PROYECTOS (PROJECTS SHOWCASE) */}
          {activeSection === 'proyectos' && (
            <div className="space-y-6">
              <div className="space-y-2 pt-4">
                <span className="text-[10px] tracking-[0.3em] text-cyan-400 font-semibold uppercase block">Consola de Desarrollo</span>
                <h2 className="text-4xl font-display uppercase tracking-tight leading-none">Laboratorio de Proyectos</h2>
                <p className="text-xs text-white/50 leading-relaxed max-w-2xl">
                  Selecciona uno de los siguientes proyectos para abrir su spec técnica y activar su simulador interactivo de alta fidelidad directamente en la pantalla de la derecha.
                </p>
              </div>
              <ProjectsSection />
            </div>
          )}

          {/* SECTION 3: HABILIDADES (SKILLS CORE) */}
          {activeSection === 'habilidades' && (
            <div className="space-y-6">
              <div className="space-y-2 pt-4">
                <span className="text-[10px] tracking-[0.3em] text-orange-400 font-semibold uppercase block">Arsenal de Ingeniería</span>
                <h2 className="text-4xl font-display uppercase tracking-tight leading-none">Tecnologías Soportadas</h2>
                <p className="text-xs text-white/50 leading-relaxed max-w-2xl">
                  Mi pila tecnológica principal enfocada en la robustez estructural, modularidad tipada y optimización del cliente en entornos de alto rendimiento.
                </p>
              </div>
              <SkillsCore />
            </div>
          )}

          {/* SECTION 4: STATS / SOBRE MÍ (BENTO GRID) */}
          {activeSection === 'stats' && (
            <div className="space-y-6">
              <div className="space-y-2 pt-4">
                <span className="text-[10px] tracking-[0.3em] text-cyan-400 font-semibold uppercase block">Especificaciones Personales</span>
                <h2 className="text-4xl font-display uppercase tracking-tight leading-none">Sobre Mí & Telemetría</h2>
                <p className="text-xs text-white/50 leading-relaxed max-w-2xl">
                  Una vista general interactiva de mis logros, nivel de actividad en compilación de código, ubicación y enfoque de ingeniería de producción.
                </p>
              </div>
              <BentoStats />
            </div>
          )}

          {/* SECTION 5: CONTACTO (TERMINAL TRANSCEIVER) */}
          {activeSection === 'contacto' && (
            <div className="space-y-6">
              <div className="space-y-2 pt-4">
                <span className="text-[10px] tracking-[0.3em] text-fuchsia-400 font-semibold uppercase block">Transceptor Sub-Espacial</span>
                <h2 className="text-4xl font-display uppercase tracking-tight leading-none">Despachar Transmisión</h2>
                <p className="text-xs text-white/50 leading-relaxed max-w-xl">
                  Envía un correo seguro de forma cifrada a través de esta terminal de comandos simulada. Escribe tu nombre, email, asunto y mensaje, luego despáchalo.
                </p>
              </div>
              <TerminalContact />
            </div>
          )}

          {/* Decorative glowing sphere in background like the theme */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none"></div>
        </section>

      </main>

      {/* FOOTER METADATA BAR */}
      <footer className="bg-[#080808] border-t border-white/10 py-8 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-white/40">
          
          <div className="flex items-center space-x-2">
            <TerminalIcon size={12} className="text-cyan-400" />
            <span>Código 100% puro escrito sin constructores visuales estáticos.</span>
          </div>

          <div className="flex items-center space-x-1">
            <span>© {new Date().getFullYear()} Iván</span>
            <span>▪</span>
            <span className="text-white/60">Hecho con React, TypeScript y Tailwind v4</span>
          </div>

          <div className="flex items-center space-x-2 text-[10px]">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
            <span className="text-cyan-400 uppercase font-semibold">Despliegue Órbita Activo</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

