import React, { useState } from 'react';
import { Code, ExternalLink, Play, Sparkles, Smartphone, Monitor, Gamepad2, ArrowRight, Maximize2, Image as ImageIcon, X } from 'lucide-react';
import { Project } from '../types';
import { playClick } from './AudioSynth';

// Import generated mockup images
import gameGuessDuelImg from '../assets/images/game.jpeg';
import opp72Img from '../assets/images/opp72.png';
import gameHubImg from '../assets/images/gameh.png';
import lumina3dImg from '../assets/images/lumina.png';
import gestioImg from '../assets/images/gestio.jpeg';

const PROJECTS: Project[] = [
  {
    id: 'duelo',
    title: '"Game Guess Duel" Juego multijugador',
    category: 'Game',
    description: 'Un videojuego multijugador 1v1 interactivo que consiste en adivinar el nombre del videojuego a partir de una serie de pistas.',
    longDescription: 'GameGuess Duel es un juego competitivo para dos jugadores donde pondrás a prueba tus conocimientos sobre videojuegos. Ambos jugadores se enfrentan para adivinar un videojuego mientras las pistas van apareciendo con el paso del tiempo. ¡El primero que lo acierte gana la ronda!. Ofrece un bucle competitivo y divertido idóneo para amantes de la cultura gamer.',
    tags: ['TypeScript', 'CSS', 'Firebase'],
    color: '#22d3ee',
    features: ['Partidas multijugador competitivas 1v1', 'Pistas dinámicas con peticiones a la api de IGDB', 'Sincronización en tiempo real con Firebase'],
    githubUrl: 'https://github.com/minithiago/GameGuessDuel',
    webUrl: 'https://studio--studio-6736863778-80f8a.us-central1.hosted.app',
    imageUrl: gameGuessDuelImg
  },
  {
    id: 'opp72',
    title: '"Opp72" App móvil y de escritorio',
    category: 'Web',
    description: 'Aplicación para subastas en lonjas de pescado con información en tiempo real, gestión de usuarios y sistema de trazabilidad completa.',
    longDescription: 'Un software robusto orientado a entornos portuarios de nivel industrial. Implementa subastas en vivo del pescado capturado, un canal de pujas ultraveloz, control de usuarios del sector y un sistema de trazabilidad de punta a punta.',
    tags: ['Delphi', 'SQL Server', 'Pascal'],
    color: '#06b6d4',
    features: ['Canalización de subastas de pescado rápidas', 'Gestión integral de usuarios y seguridad local/remota', 'Firme trazabilidad alimentaria de lotes capturados'],
    githubUrl: 'https://github.com/minithiago/APP-en-delphi',
    imageUrl: opp72Img
  },
  {
    id: 'gamehub',
    title: '"GameHub" App Móvil',
    category: 'Mobile',
    description: 'Aplicación para móviles que cuenta con un diseño de UI moderno, integración de datos de IGDB y funciones sociales completas.',
    longDescription: 'Una completísima biblioteca móvil interactiva desarrollada en estrecho contacto con el API de IGDB. Cuenta con un diseño centrado en el usuario, permitiendo la búsqueda, guardado en listas personalizadas, reviews, perfiles e integración de imágenes en Firebase.',
    tags: ['Dart', 'Flutter', 'Firebase', 'C++'],
    color: '#d946ef',
    features: ['Conexión de datos directa con el ecosistema de IGDB', 'Autenticación, Storage y perfiles dinámicos con Firebase', 'Arquitectura móvil nativa optimizada en Dart/Flutter'],
    githubUrl: 'https://github.com/minithiago/GameHub',
    imageUrl: gameHubImg
  },
  {
    id: 'lumina3d',
    title: '"Lumina-3D" Web interactiva',
    category: 'Web',
    description: 'Entorno 3D interactivo que cuenta con un diseño de UI moderno, renderizado de escenas en tiempo real y funcionalidades integradas de IA.',
    longDescription: 'Lumina-3D es un entorno 3D interactivo diseñado para ofrecer una experiencia inmersiva y dinámica al explorar escenas virtuales. Desarrollado con un enfoque en el rendimiento, la modularidad y la extensibilidad, el proyecto sirve como base para crear aplicaciones, simulaciones y visualizaciones 3D interactivas.',
    tags: ['TypeScript', 'HTML', 'CSS'],
    color: '#d946ef',
    features: ['Entorno 3D interactivo', 'Renderizado de escenas en tiempo real', 'Iluminación dinámica y efectos visuales'],
    githubUrl: 'https://github.com/minithiago/Lumina-3D_Web',
    webUrl: 'https://lumina-3d-ai-aesthetic-lab-394742169195.europe-west2.run.app',
    imageUrl: lumina3dImg
  },
  {
    id: 'gestio',
    title: '"Gestio" App Gestor de suscripciones ',
    category: 'Mobile',
    description: 'App móvil para gestionar tus suscripciones a plataformas digitales.',
    longDescription: 'Gestio es una aplicación para Android desarrollada en Kotlin que te ayuda a organizar, realizar un seguimiento y gestionar todas tus suscripciones digitales en un solo lugar. No vuelvas a pasar por alto una fecha de renovación ni a perder la cuenta de tus gastos mensuales.',
    tags: ['Kotlin'],
    color: '#06b6d4',
    features: ['Gestiona todas tus suscripciones en un solo lugar', 'Consulta las próximas fechas de renovación', 'Recordatorios y notificaciones de renovación'],
    githubUrl: 'https://github.com/minithiago/Gestio_App',
    imageUrl: gestioImg
  }
];

export const ProjectsSection: React.FC = () => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>('duelo');
  const activeProject = PROJECTS.find(p => p.id === selectedProjectId) || PROJECTS[0];
  const [isLightboxOpen, setIsLightboxOpen] = useState<boolean>(false);

  const handleProjectSelect = (id: string) => {
    playClick();
    setSelectedProjectId(id);

    // Scroll smoothly to simulator sandbox
    setTimeout(() => {
      const el = document.getElementById('sandbox-container');
      el?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  };

  return (
    <div className="space-y-8">
      {/* Project selector row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {PROJECTS.map((proj) => {
          const isSelected = selectedProjectId === proj.id;
          return (
            <div
              key={proj.id}
              onClick={() => handleProjectSelect(proj.id)}
              className={`group relative p-5 rounded-2xl border cursor-pointer transition-all duration-300 flex flex-col justify-between h-[180px] overflow-hidden ${
                isSelected
                  ? 'bg-[#151515] border-cyan-400 shadow-xl shadow-cyan-500/10 scale-102'
                  : 'bg-[#151515]/40 border-white/10 hover:bg-[#151515]/60 hover:border-white/25'
              }`}
            >
              {/* Category watermark */}
              <div className="absolute top-4 right-4 flex items-center space-x-1 opacity-60">
                {proj.category === 'Game' && <Gamepad2 size={14} className="text-cyan-400" />}
                {proj.category === 'Web' && <Monitor size={14} className="text-cyan-400" />}
                {proj.category === 'Mobile' && <Smartphone size={14} className="text-fuchsia-400" />}
                <span className="text-[10px] font-sans tracking-widest uppercase">{proj.category}</span>
              </div>

              <div>
                <h3 className={`font-sans text-base font-bold transition-colors ${isSelected ? 'text-cyan-400' : 'text-slate-200'}`}>
                  {proj.title}
                </h3>
                <p className="text-xs text-white/50 mt-2 leading-relaxed line-clamp-3">
                  {proj.description}
                </p>
              </div>

              {/* Tag pills */}
              <div className="flex flex-wrap gap-1.5 mt-4">
                {proj.tags.slice(0, 3).map((t) => (
                  <span key={t} className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-[#0a0a0a] text-white/40 border border-white/10">
                    {t}
                  </span>
                ))}
              </div>

              {/* Decorative dynamic glow card corner */}
              <div style={{ backgroundColor: proj.color }} className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            </div>
          );
        })}
      </div>

      {/* Simulator Sandbox Display Container */}
      <div id="sandbox-container" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-4">
        {/* Project Technical Spec Details */}
        <div className="lg:col-span-5 bg-[#151515] rounded-2xl border border-white/10 p-6 flex flex-col justify-between backdrop-blur-md">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Code className="text-cyan-400" size={16} />
              <span className="text-[11px] font-sans font-bold tracking-widest text-white/40 uppercase">Ficha Técnica</span>
            </div>

            <h3 className="text-xl font-sans font-bold text-slate-100">{activeProject.title}</h3>
            
            <p className="text-xs text-white/50 leading-relaxed">
              {activeProject.longDescription}
            </p>

            <div className="space-y-2 pt-2 pb-2">
              <h4 className="text-[10px] font-sans text-white/40 uppercase tracking-widest font-bold">Características Destacadas</h4>
              <ul className="space-y-1.5">
                {activeProject.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start space-x-2 text-xs text-white/70">
                    <span className="text-cyan-400 mt-0.5">▪</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Project links if present */}
            {(activeProject.githubUrl || activeProject.webUrl) && (
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                {activeProject.githubUrl && (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1 px-3 py-1.5 rounded bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 text-[11px] font-mono transition-colors"
                  >
                    <span>GitHub Repositorio</span>
                    <ExternalLink size={10} />
                  </a>
                )}
                {activeProject.webUrl && (
                  <a
                    href={activeProject.webUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center space-x-1 px-3 py-1.5 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 text-[11px] font-mono transition-colors"
                  >
                    <span>Ver Web en vivo</span>
                    <ExternalLink size={10} />
                  </a>
                )}
              </div>
            )}
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between text-xs text-white/30">
            <span>Repositorio Local: Activo</span>
            <span className="text-cyan-400 flex items-center space-x-1 font-bold text-[10px] tracking-wider uppercase">
              <Sparkles size={12} className="animate-pulse" />
              <span>Ejecución directa</span>
            </span>
          </div>
        </div>

        {/* Project mockup image display with premium floating frames and glow */}
        <div className="lg:col-span-7 flex flex-col justify-center relative">
          {/* Accent glow background */}
          <div 
            style={{ backgroundColor: activeProject.color }}
            className="absolute -inset-10 rounded-full blur-[120px] opacity-15 pointer-events-none transition-all duration-700"
          ></div>

          <div className="relative group/mockup rounded-2xl overflow-hidden border border-white/10 bg-[#0c0c0c]/80 backdrop-blur-md p-1.5 shadow-2xl transition-all duration-300 hover:border-white/20">
            {/* Top glassmorphic header bar */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/5 rounded-t-xl text-[10px] font-mono text-white/40">
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/30"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/30"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/30"></span>
                <span className="pl-2 tracking-wider text-white/30 uppercase">{activeProject.category} SHOWCASE</span>
              </div>
              <div className="flex items-center space-x-1">
                <Sparkles size={10} className="text-cyan-400 animate-pulse" />
                <span className="text-cyan-400/70">CAPTURA EN VIVO</span>
              </div>
            </div>

            {/* Image viewer stage */}
            <div 
              onClick={() => { playClick(); setIsLightboxOpen(true); }}
              className="relative aspect-[16/9] w-full overflow-hidden bg-black/40 cursor-zoom-in rounded-b-xl group"
            >
              {activeProject.imageUrl ? (
                <img
                  src={activeProject.imageUrl}
                  alt={activeProject.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-white/30">
                  <ImageIcon size={48} className="stroke-1 mb-2 animate-pulse" />
                  <span className="text-xs font-mono">Mockup no disponible</span>
                </div>
              )}

              {/* Hover effect overlays */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center space-y-2">
                <div className="p-3 bg-cyan-400/20 rounded-full border border-cyan-400/30 backdrop-blur-md transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <Maximize2 size={18} className="text-cyan-400" />
                </div>
                <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-semibold uppercase">Ampliar captura</span>
              </div>

              {/* Tag overlay */}
              <div className="absolute bottom-4 left-4 px-2.5 py-1 rounded-full bg-[#0a0a0a]/80 border border-white/10 backdrop-blur-md text-[9px] font-mono text-white/60 flex items-center space-x-1.5 shadow-lg">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>GITHUB PREVIEW</span>
              </div>
            </div>
          </div>

          <p className="text-[10px] font-mono text-center text-white/30 mt-3 flex items-center justify-center space-x-1">
            <span>💡</span>
            <span>Haz clic en la imagen para ver el diseño a pantalla completa.</span>
          </p>
        </div>
      </div>

      {/* Immersive Lightbox Modal */}
      {isLightboxOpen && activeProject.imageUrl && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 md:p-8 transition-opacity duration-300"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close button top right */}
          <button
            onClick={() => { playClick(); setIsLightboxOpen(false); }}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-white/5 border border-white/10 text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer z-51 shadow-xl"
            title="Cerrar vista"
          >
            <X size={20} />
          </button>

          {/* Modal Content container */}
          <div 
            className="relative max-w-5xl w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/15 bg-neutral-950 shadow-2xl flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activeProject.imageUrl}
              alt={activeProject.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-contain"
            />
            
            {/* Soft description caption bar on bottom */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 flex flex-col md:flex-row md:items-center justify-between gap-2 border-t border-white/5 backdrop-blur-xs">
              <div>
                <span className="text-[9px] font-mono tracking-widest text-cyan-400 uppercase font-bold">{activeProject.category} / Mockup oficial</span>
                <h4 className="text-base font-sans font-bold text-white mt-0.5">{activeProject.title}</h4>
              </div>
              <div className="flex gap-2">
                {activeProject.githubUrl && (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors border border-white/10"
                  >
                    Ir al repositorio
                  </a>
                )}
                <button
                  onClick={() => setIsLightboxOpen(false)}
                  className="px-3.5 py-1.5 rounded bg-cyan-400 text-black font-semibold text-xs transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
