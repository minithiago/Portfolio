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
  FolderKanban,
  Sun,
  Moon
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
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('portfolio-theme');
    return (saved as 'dark' | 'light') || 'dark';
  });
  
  // España (Europe/Madrid) simulated ticking clock
  const [timeStr, setTimeStr] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    playClick();
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

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

  useEffect(() => {
    const target = document.getElementById('main-content-display');
    if (target) {
      target.scrollTop = 0;
    }
  }, [activeSection]);

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
    <div className="min-h-screen bg-theme-app text-theme-primary transition-colors duration-500 flex flex-col font-sans selection:bg-cyan-500/30 selection:text-cyan-200 relative overflow-x-hidden">
      
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
                      : 'text-theme-secondary hover:text-theme-primary opacity-80 hover:opacity-100'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 ml-auto sm:ml-0">
            {/* Realtime Local Clock (Spain time) */}
            <div className="flex items-center space-x-1.5 px-3 py-1 bg-theme-card-alt border border-theme rounded-full text-[9px] font-mono text-theme-secondary select-none">
              <Clock size={10} className="text-cyan-400 animate-spin-slow" />
              <span>ALC: {timeStr || '00:00:00'}</span>
            </div>

            {/* Theme Toggle button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border bg-theme-card-alt border-theme text-theme-secondary hover:text-theme-primary transition-all cursor-pointer"
              title={theme === 'dark' ? "Activar modo claro" : "Activar modo oscuro"}
            >
              {theme === 'dark' ? <Sun size={13} /> : <Moon size={13} />}
            </button>

            {/* Audio Toggle button */}
            <button
              onClick={handleSoundToggle}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                soundEnabled
                  ? 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/20'
                  : 'bg-theme-card-alt border-theme text-theme-secondary hover:text-theme-primary'
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
              className="p-2 bg-theme-card-alt hover:bg-theme-card-dark border border-theme rounded-full text-theme-secondary hover:text-theme-primary transition-colors"
              title="GitHub Profile"
            >
              <Github size={13} />
            </a>

            {/* LinkedIn Profile */}
            <a
              href="https://www.linkedin.com/in/ivan-naranjo-14049230a/"
              target="_blank"
              rel="noreferrer"
              className="p-2 bg-theme-card-alt hover:bg-theme-card-dark border border-theme rounded-full text-theme-secondary hover:text-theme-primary transition-colors"
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
              className="md:hidden p-2 bg-theme-card-alt border border-theme text-theme-secondary hover:text-theme-primary rounded-lg"
            >
              {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE NAVIGATION DROPDOWN */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-[135px] left-0 right-0 z-40 bg-theme-app/95 border-b border-theme p-4 space-y-2 backdrop-blur-lg">
          {menuItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSectionChange(item.id)}
                className={`w-full p-3 rounded-xl font-sans text-xs font-bold uppercase flex items-center space-x-3 cursor-pointer ${
                  isActive
                    ? 'bg-theme-card-alt border border-theme text-cyan-400'
                    : 'text-theme-secondary hover:text-theme-primary hover:bg-theme-card-alt'
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
          <div className="w-full bg-theme-card p-5 rounded-2xl border border-theme text-center space-y-3 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-fuchsia-500 opacity-60"></div>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[9px] font-sans font-bold tracking-widest bg-theme-card-alt text-cyan-400 border border-theme uppercase">
              Holograma de Control
            </span>
            <h2 className="text-xl font-display uppercase tracking-tight text-theme-primary">
              Consola del Portfolio
            </h2>
            <p className="text-xs text-theme-secondary max-w-xs mx-auto leading-relaxed">
              Gira el cubo 3D o usa el menú de navegación superior para teletransportarte instantáneamente entre secciones.
            </p>
          </div>

          {/* Interactive 3D Cube Component */}
          <HoloCube activeSection={activeSection} onSectionChange={handleSectionChange} />

          {/* Contact quick transceiver status */}
          <div className="w-full bg-theme-card border border-theme rounded-2xl p-4 flex items-center justify-between text-xs text-theme-secondary">
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
        <section id="main-content-display" className="lg:col-span-8 min-h-[520px] w-full bg-theme-card rounded-2xl border border-theme-strong shadow-2xl p-6 md:p-8 relative overflow-hidden">
          
          {/* Rainbow header top border like Marcus Klein design */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-orange-500"></div>

          {/* Smooth fade-in container triggered on activeSection change */}
          <div key={activeSection} className="animate-fade-in w-full">
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

                  <p className="text-sm md:text-base text-theme-secondary leading-relaxed max-w-xl">
                    Hola, soy Iván, desarrollador especializado en el desarrollo de aplicaciones móviles nativas, de escritorio y sitios web . Explora mis proyectos y ponte en contacto conmigo.
                  </p>
                </div>

                {/* Call to actions */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <button
                    onClick={() => handleSectionChange('proyectos')}
                    className="px-6 py-3 bg-theme-primary text-theme-app font-display text-sm tracking-wider hover:bg-cyan-400 hover:text-black hover:border-cyan-400 border border-transparent transition-all uppercase cursor-pointer"
                  >
                    VER PROYECTOS
                  </button>
                  <button
                    onClick={() => handleSectionChange('contacto')}
                    className="px-6 py-3 border border-theme-strong text-theme-primary bg-theme-card-alt font-display text-sm tracking-wider uppercase hover:bg-theme-card-dark transition-colors cursor-pointer"
                  >
                    ENVIAR MENSAJE
                  </button>
                </div>

                {/* Bento Quick Intro Specs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-theme">
                  <div className="p-6 bg-theme-card-alt rounded-xl border border-theme flex flex-col justify-center min-h-[110px]">
                    <h4 className="text-[10px] tracking-widest text-cyan-400 uppercase font-semibold">DISPONIBILIDAD / ESTADO ACTUAL</h4>
                    <div className="flex items-center space-x-2.5 mt-3">
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                      </span>
                      <span className="text-sm font-semibold text-theme-primary">Disponible para proyectos</span>
                    </div>
                  </div>
                  <div className="p-6 bg-theme-card-alt rounded-xl border border-theme flex flex-col justify-center min-h-[110px]">
                    <h4 className="text-[10px] tracking-widest text-fuchsia-400 uppercase font-semibold">ÚLTIMA ACTUALIZACIÓN DEL PORTFOLIO</h4>
                    <p className="text-xs text-theme-secondary mt-2 leading-relaxed font-medium">
                      Última actualización: 30 de junio de 2026
                    </p>
                    <span className="text-[10px] font-mono text-fuchsia-400/80 block mt-1">
                      Versión 1.0
                    </span>
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
                  <p className="text-xs text-theme-secondary leading-relaxed max-w-2xl">
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
                  <span className="text-[10px] tracking-[0.3em] text-orange-400 font-semibold uppercase block">Arsenal Tecnológico</span>
                  <h2 className="text-4xl font-display uppercase tracking-tight leading-none">Tecnologías Aprendidas</h2>
                  <p className="text-xs text-theme-secondary leading-relaxed max-w-2xl">
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
                  <h2 className="text-4xl font-display uppercase tracking-tight leading-none">Sobre Mí </h2>
                  <p className="text-xs text-theme-secondary leading-relaxed max-w-2xl">
                    Una vista general interactiva de mis logros, mi trayectoria y mis objetivos.
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
                  <h2 className="text-4xl font-display uppercase tracking-tight leading-none">Enviar Transmisión</h2>
                  <p className="text-xs text-theme-secondary leading-relaxed max-w-xl">
                    Envía un correo seguro de forma cifrada a través de esta terminal de comandos simulada. Escribe tu nombre, email, asunto y mensaje, luego despáchalo.
                  </p>
                </div>
                <TerminalContact />
              </div>
            )}
          </div>

          {/* Decorative glowing sphere in background like the theme */}
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-500/5 blur-[100px] rounded-full pointer-events-none"></div>
        </section>

      </main>

      {/* FOOTER METADATA BAR */}
      <footer className="bg-theme-app border-t border-theme py-8 px-6 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-6 text-xs text-theme-muted">

          <div className="flex items-center space-x-1">
            <span>© {new Date().getFullYear()} Iván</span>
            <span>▪</span>
            <span className="text-theme-secondary">Hecho con React, TypeScript y Tailwind v4</span>
          </div>

        </div>
      </footer>
    </div>
  );
}

