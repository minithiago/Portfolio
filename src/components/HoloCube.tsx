import React, { useState, useEffect, useRef } from 'react';
import { Home, Code, Cpu, MessageSquare, Award, RotateCw, GripHorizontal } from 'lucide-react';
import { playClick, playSwoosh } from './AudioSynth';

interface HoloCubeProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const HoloCube: React.FC<HoloCubeProps> = ({ activeSection, onSectionChange }) => {
  // Manual Rotation Angles
  const [rotation, setRotation] = useState({ x: -15, y: 35 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const startRotation = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Sync automatic rotation when section changes
  useEffect(() => {
    if (isDragging) return; // Don't override if user is active dragging

    // Specific pre-configured coordinates for each face to look awesome
    let targetX = -15;
    let targetY = 35;

    switch (activeSection) {
      case 'inicio':
        targetX = -15;
        targetY = 25;
        break;
      case 'proyectos':
        targetX = -10;
        targetY = -65; // Right face
        break;
      case 'habilidades':
        targetX = -10;
        targetY = 115; // Left face (from front: rotate right)
        break;
      case 'stats':
        targetX = -80; // Top face
        targetY = 25;
        break;
      case 'contacto':
        targetX = 75; // Bottom face
        targetY = 25;
        break;
      default:
        break;
    }

    setRotation({ x: targetX, y: targetY });
  }, [activeSection, isDragging]);

  // Handle Drag / Touch Rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    startRotation.current = { x: rotation.x, y: rotation.y };
    playClick();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const deltaX = e.clientX - dragStart.current.x;
    const deltaY = e.clientY - dragStart.current.y;

    // Scale down the rotational speed for better control
    const scale = 0.45;
    const newX = startRotation.current.x - deltaY * scale;
    const newY = startRotation.current.y + deltaX * scale;

    // Apply rotation
    setRotation({
      x: Math.max(-90, Math.min(90, newX)), // Prevent flipping completely upside down to keep orientation
      y: newY,
    });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    playSwoosh();

    // Dynamically snap to closest face based on ending coordinates
    const normalizedY = ((rotation.y % 360) + 360) % 360;
    const rx = rotation.x;

    // Determine target based on angle
    if (rx < -45) {
      onSectionChange('stats'); // Top
    } else if (rx > 45) {
      onSectionChange('contacto'); // Bottom
    } else {
      // Y-axis determination
      if (normalizedY >= 315 || normalizedY < 45) {
        onSectionChange('inicio'); // Front
      } else if (normalizedY >= 45 && normalizedY < 135) {
        onSectionChange('habilidades'); // Left / Back-Left
      } else if (normalizedY >= 135 && normalizedY < 225) {
        // Back side - Map back to front or alternate
        onSectionChange('inicio');
      } else if (normalizedY >= 225 && normalizedY < 315) {
        onSectionChange('proyectos'); // Right
      }
    }
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, rotation]);

  // Touch triggers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      setIsDragging(true);
      dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      startRotation.current = { x: rotation.x, y: rotation.y };
      playClick();
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - dragStart.current.x;
    const deltaY = e.touches[0].clientY - dragStart.current.y;

    const scale = 0.5;
    setRotation({
      x: Math.max(-90, Math.min(90, startRotation.current.x - deltaY * scale)),
      y: startRotation.current.y + deltaX * scale,
    });
  };

  const handleFaceClick = (section: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering drag
    playClick();
    onSectionChange(section);
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-6 select-none py-4">
      {/* 3D Scene Wrapper with high perspective depth */}
      <div 
        ref={containerRef}
        style={{ perspective: '900px' }}
        className="w-64 h-64 flex items-center justify-center cursor-grab active:cursor-grabbing relative"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {/* Hologram Core glow */}
        <div className="absolute w-28 h-28 bg-emerald-500/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>

        {/* CSS 3D Cube Container */}
        <div
          style={{
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transformStyle: 'preserve-3d',
            transition: isDragging ? 'none' : 'transform 0.8s cubic-bezier(0.19, 1, 0.22, 1)',
          }}
          className="w-36 h-36 relative transition-transform"
        >
          {/* FACE 1: FRONT (Inicio) */}
          <div
            onClick={(e) => handleFaceClick('inicio', e)}
            style={{
              transform: 'rotateY(0deg) translateZ(72px)',
              backfaceVisibility: 'hidden',
            }}
            className={`absolute inset-0 bg-[#111]/90 border-2 rounded-xl flex flex-col justify-center items-center text-center p-3 backdrop-blur-md transition-colors duration-300 ${
              activeSection === 'inicio' 
                ? 'border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/20' 
                : 'border-white/10 text-white/50 hover:border-white/25'
            }`}
          >
            <div className="absolute top-2 right-2 text-[8px] font-mono opacity-50">NODE_01</div>
            <Home size={28} className={activeSection === 'inicio' ? 'animate-bounce text-cyan-400' : ''} />
            <span className="text-xs font-sans font-bold tracking-wider mt-3">INICIO</span>
            <span className="text-[9px] font-mono opacity-40 mt-1 uppercase">Main Core</span>
          </div>

          {/* FACE 2: RIGHT (Proyectos) */}
          <div
            onClick={(e) => handleFaceClick('proyectos', e)}
            style={{
              transform: 'rotateY(90deg) translateZ(72px)',
              backfaceVisibility: 'hidden',
            }}
            className={`absolute inset-0 bg-[#111]/90 border-2 rounded-xl flex flex-col justify-center items-center text-center p-3 backdrop-blur-md transition-colors duration-300 ${
              activeSection === 'proyectos' 
                ? 'border-fuchsia-400 text-fuchsia-300 shadow-lg shadow-fuchsia-500/20' 
                : 'border-white/10 text-white/50 hover:border-white/25'
            }`}
          >
            <div className="absolute top-2 right-2 text-[8px] font-mono opacity-50">NODE_02</div>
            <Code size={28} className={activeSection === 'proyectos' ? 'animate-pulse text-fuchsia-400' : ''} />
            <span className="text-xs font-sans font-bold tracking-wider mt-3">PROYECTOS</span>
            <span className="text-[9px] font-mono opacity-40 mt-1 uppercase">Showcase</span>
          </div>

          {/* FACE 3: BACK (Alternativo / Stats duplicated or customized) */}
          <div
            onClick={(e) => handleFaceClick('inicio', e)}
            style={{
              transform: 'rotateY(180deg) translateZ(72px)',
              backfaceVisibility: 'hidden',
            }}
            className="absolute inset-0 bg-[#111]/90 border-2 border-white/10 rounded-xl flex flex-col justify-center items-center text-center p-3 backdrop-blur-sm hover:border-white/25 text-white/40"
          >
            <RotateCw size={24} className="opacity-30 text-white/50" />
            <span className="text-[10px] font-sans tracking-wider mt-2">ROTAR</span>
            <span className="text-[8px] font-mono opacity-30 mt-1 uppercase">Girar Cubo</span>
          </div>

          {/* FACE 4: LEFT (Habilidades) */}
          <div
            onClick={(e) => handleFaceClick('habilidades', e)}
            style={{
              transform: 'rotateY(-90deg) translateZ(72px)',
              backfaceVisibility: 'hidden',
            }}
            className={`absolute inset-0 bg-[#111]/90 border-2 rounded-xl flex flex-col justify-center items-center text-center p-3 backdrop-blur-md transition-colors duration-300 ${
              activeSection === 'habilidades' 
                ? 'border-orange-400 text-orange-300 shadow-lg shadow-orange-500/20' 
                : 'border-white/10 text-white/50 hover:border-white/25'
            }`}
          >
            <div className="absolute top-2 right-2 text-[8px] font-mono opacity-50">NODE_03</div>
            <Cpu size={28} className={activeSection === 'habilidades' ? 'animate-pulse text-orange-400' : ''} />
            <span className="text-xs font-sans font-bold tracking-wider mt-3">TECNOLOGÍAS</span>
            <span className="text-[9px] font-mono opacity-40 mt-1 uppercase">Skills</span>
          </div>

          {/* FACE 5: TOP (Stats/Sobre mí) */}
          <div
            onClick={(e) => handleFaceClick('stats', e)}
            style={{
              transform: 'rotateX(90deg) translateZ(72px)',
              backfaceVisibility: 'hidden',
            }}
            className={`absolute inset-0 bg-[#111]/90 border-2 rounded-xl flex flex-col justify-center items-center text-center p-3 backdrop-blur-md transition-colors duration-300 ${
              activeSection === 'stats' 
                ? 'border-cyan-400 text-cyan-300 shadow-lg shadow-cyan-500/20' 
                : 'border-white/10 text-white/50 hover:border-white/25'
            }`}
          >
            <div className="absolute top-2 right-2 text-[8px] font-mono opacity-50">NODE_04</div>
            <Award size={28} className={activeSection === 'stats' ? 'animate-bounce text-cyan-400' : ''} />
            <span className="text-xs font-sans font-bold tracking-wider mt-3">SOBRE MÍ</span>
            <span className="text-[9px] font-mono opacity-40 mt-1 uppercase">Bento Grid</span>
          </div>

          {/* FACE 6: BOTTOM (Contacto) */}
          <div
            onClick={(e) => handleFaceClick('contacto', e)}
            style={{
              transform: 'rotateX(-90deg) translateZ(72px)',
              backfaceVisibility: 'hidden',
            }}
            className={`absolute inset-0 bg-[#111]/90 border-2 rounded-xl flex flex-col justify-center items-center text-center p-3 backdrop-blur-md transition-colors duration-300 ${
              activeSection === 'contacto' 
                ? 'border-fuchsia-500 text-fuchsia-400 shadow-lg shadow-fuchsia-500/20' 
                : 'border-white/10 text-white/50 hover:border-white/25'
            }`}
          >
            <div className="absolute top-2 right-2 text-[8px] font-mono opacity-50">NODE_05</div>
            <MessageSquare size={28} className={activeSection === 'contacto' ? 'animate-pulse text-fuchsia-500' : ''} />
            <span className="text-xs font-sans font-bold tracking-wider mt-3">CONTACTO</span>
            <span className="text-[9px] font-mono opacity-40 mt-1 uppercase">Transmit</span>
          </div>
        </div>
      </div>

      {/* Helper text display for users to drag/move */}
      <div className="flex items-center space-x-2 text-white/30 text-[11px] font-mono">
        <GripHorizontal size={14} className="animate-pulse" />
        <span>Arrastra para girar el cubo 3D o haz clic en una cara</span>
      </div>
    </div>
  );
};
