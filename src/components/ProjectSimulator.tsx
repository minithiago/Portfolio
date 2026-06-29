import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Shield, ShieldAlert, Award, TrendingUp, DollarSign, Eye, EyeOff, Wind, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { playClick, playSuccess, playKeyboard, playSwoosh } from './AudioSynth';

interface SimulatorProps {
  projectId: string;
}

export const ProjectSimulator: React.FC<SimulatorProps> = ({ projectId }) => {
  // Sound controls
  const [soundOn, setSoundOn] = useState(true);

  // --- SIMULATOR 1: CyberQuest Game State ---
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameover' | 'victory'>('idle');
  const [playerPos, setPlayerPos] = useState({ x: 2, y: 2 });
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gems, setGems] = useState<{ x: number; y: number; active: boolean }[]>([
    { x: 1, y: 1, active: true },
    { x: 3, y: 0, active: true },
    { x: 0, y: 3, active: true },
    { x: 4, y: 1, active: true },
  ]);
  const [obstacles, setObstacles] = useState<{ x: number; y: number }[]>([
    { x: 1, y: 2 },
    { x: 3, y: 2 },
    { x: 2, y: 1 },
    { x: 2, y: 3 },
  ]);

  // --- SIMULATOR 2: HoloFinance State ---
  const [investAmount, setInvestAmount] = useState(5000);
  const [timeframe, setTimeframe] = useState<'7D' | '1M' | '1Y'>('1M');
  const [cryptoTrend, setCryptoTrend] = useState<number[]>([10, 15, 12, 18, 25, 20, 28, 35, 30, 42]);

  // --- SIMULATOR 3: ZenSpace Breathing State ---
  const [breathPhase, setBreathPhase] = useState<'Espera' | 'Inhala' | 'Retén' | 'Exhala'>('Espera');
  const [breathProgress, setBreathProgress] = useState(0); // 0 to 100
  const [breathTimer, setBreathTimer] = useState(4); // seconds left in phase
  const [isBreathing, setIsBreathing] = useState(false);

  // Keyboard navigation for game
  useEffect(() => {
    if (projectId !== 'duelo' || gameState !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      let dx = 0;
      let dy = 0;
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') dy = -1;
      else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') dy = 1;
      else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') dx = -1;
      else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') dx = 1;

      if (dx !== 0 || dy !== 0) {
        e.preventDefault();
        movePlayer(dx, dy);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [playerPos, gameState, projectId]);

  // Game functions
  const startGame = () => {
    if (soundOn) playSuccess();
    setGameState('playing');
    setScore(0);
    setPlayerPos({ x: 2, y: 0 });
    setGems([
      { x: 0, y: 1, active: true },
      { x: 4, y: 1, active: true },
      { x: 1, y: 3, active: true },
      { x: 3, y: 3, active: true },
    ]);
  };

  const movePlayer = (dx: number, dy: number) => {
    if (gameState !== 'playing') return;
    if (soundOn) playKeyboard();

    const newX = Math.max(0, Math.min(4, playerPos.x + dx));
    const newY = Math.max(0, Math.min(4, playerPos.y + dy));

    // Check obstacle
    const hitObstacle = obstacles.some((o) => o.x === newX && o.y === newY);
    if (hitObstacle) {
      if (soundOn) playSwoosh();
      setGameState('gameover');
      return;
    }

    setPlayerPos({ x: newX, y: newY });

    // Check gem collection
    const gemIndex = gems.findIndex((g) => g.x === newX && g.y === newY && g.active);
    if (gemIndex !== -1) {
      if (soundOn) playClick();
      const updatedGems = [...gems];
      updatedGems[gemIndex].active = false;
      setGems(updatedGems);
      const newScore = score + 100;
      setScore(newScore);

      // Check victory
      if (updatedGems.every((g) => !g.active)) {
        if (soundOn) playSuccess();
        setGameState('victory');
        if (newScore > highScore) setHighScore(newScore);
      }
    }
  };

  // HoloFinance updates
  useEffect(() => {
    // Generate organic financial trend curve when timeframe or amount changes
    let baseTrend = [10, 15, 12, 18, 25, 20, 28, 35, 30, 42];
    if (timeframe === '7D') {
      baseTrend = [20, 22, 19, 26, 24, 30, 38];
    } else if (timeframe === '1Y') {
      baseTrend = [5, 15, 10, 25, 20, 45, 35, 60, 55, 75, 70, 95];
    }
    const scaler = investAmount / 5000;
    setCryptoTrend(baseTrend.map((v) => v * scaler));
  }, [investAmount, timeframe]);

  // ZenSpace Guided Breathing Engine
  useEffect(() => {
    if (!isBreathing || projectId !== 'gamehub') return;

    let interval: any = null;
    let elapsed = 0;
    const duration = 4; // 4s per phase

    const runBreathing = () => {
      interval = setInterval(() => {
        elapsed += 0.1;
        const progress = (elapsed / duration) * 100;
        setBreathProgress(progress);

        if (elapsed >= duration) {
          elapsed = 0;
          if (soundOn) playClick();
          setBreathPhase((prev) => {
            switch (prev) {
              case 'Espera': return 'Inhala';
              case 'Inhala': return 'Retén';
              case 'Retén': return 'Exhala';
              case 'Exhala': return 'Inhala'; // Loop back
              default: return 'Inhala';
            }
          });
        }
      }, 100);
    };

    setBreathPhase('Inhala');
    runBreathing();

    return () => {
      clearInterval(interval);
    };
  }, [isBreathing, projectId]);

  const toggleBreathing = () => {
    if (soundOn) playClick();
    if (isBreathing) {
      setIsBreathing(false);
      setBreathPhase('Espera');
      setBreathProgress(0);
    } else {
      setIsBreathing(true);
    }
  };

  return (
    <div id={`sim-${projectId}`} className="w-full bg-[#151515] rounded-2xl border border-white/10 p-5 font-sans relative overflow-hidden backdrop-blur-md">
      
      {/* Sound indicator */}
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={() => setSoundOn(!soundOn)}
          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-cyan-400 transition-colors"
          title={soundOn ? "Desactivar sonidos" : "Activar sonidos"}
        >
          {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
        </button>
      </div>

      {/* RENDER CYBERQUEST ARCADE GAME */}
      {projectId === 'duelo' && (
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-2 mb-3">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-xs font-sans text-white/40 uppercase tracking-widest font-bold">Interactive Game Sandbox</span>
          </div>

          {/* Retro CRT Screen Wrapper */}
          <div className="w-full max-w-[320px] bg-black border-4 border-white/15 rounded-lg p-3 relative shadow-inner overflow-hidden">
            {/* Screen Scanning line overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/2 to-transparent pointer-events-none animate-pulse"></div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%] pointer-events-none"></div>

            {/* Scores Header */}
            <div className="flex justify-between font-mono text-xs text-cyan-400 mb-2">
              <div>SCORE: {score}</div>
              <div>HIGH: {highScore}</div>
            </div>

            {/* Game States screens */}
            {gameState === 'idle' && (
              <div className="h-[200px] flex flex-col justify-center items-center text-center space-y-3">
                <span className="text-3xl animate-bounce">👾</span>
                <p className="text-xs text-cyan-400 font-mono">DUEL-O: ADIVINA EL VIDEOJUEGO</p>
                <button
                  onClick={startGame}
                  className="px-4 py-1.5 bg-cyan-400 hover:bg-cyan-300 text-black font-sans text-xs font-bold rounded-md uppercase transition-transform hover:scale-105 active:scale-95"
                >
                  Insert Coin / Jugar
                </button>
                <p className="text-[10px] text-white/30 font-mono">Usa W, A, S, D, Flechas o los botones de abajo.</p>
              </div>
            )}

            {(gameState === 'playing' || gameState === 'gameover' || gameState === 'victory') && (
              <div className="relative">
                {/* 5x5 Game Grid */}
                <div className="grid grid-cols-5 gap-1 h-[200px]">
                  {Array.from({ length: 25 }).map((_, idx) => {
                    const x = idx % 5;
                    const y = Math.floor(idx / 5);
                    const isPlayer = playerPos.x === x && playerPos.y === y;
                    const isObstacle = obstacles.some((o) => o.x === x && o.y === y);
                    const currentGem = gems.find((g) => g.x === x && g.y === y && g.active);

                    return (
                      <div
                        key={idx}
                        className={`aspect-square flex items-center justify-center rounded transition-all duration-100 ${
                          isPlayer
                            ? 'bg-cyan-500/30 ring-2 ring-cyan-400'
                            : isObstacle
                            ? 'bg-white/5 border border-red-500/20'
                            : currentGem
                            ? 'bg-fuchsia-950/40 border border-fuchsia-500/20'
                            : 'bg-black/80'
                        }`}
                      >
                        {isPlayer && <span className="text-sm select-none">👾</span>}
                        {!isPlayer && currentGem && <span className="text-xs animate-bounce select-none">💎</span>}
                        {!isPlayer && isObstacle && <span className="text-xs select-none">🔥</span>}
                      </div>
                    );
                  })}
                </div>

                {/* GameOver overlay */}
                {gameState === 'gameover' && (
                  <div className="absolute inset-0 bg-black/90 flex flex-col justify-center items-center text-center p-2 z-10">
                    <ShieldAlert className="text-red-500 mb-2 animate-bounce" size={32} />
                    <p className="text-sm text-red-500 font-mono font-bold tracking-wider">MISION FALLIDA</p>
                    <p className="text-xs text-white/40 font-mono mb-3">Chocaste con un obstáculo</p>
                    <button
                      onClick={startGame}
                      className="px-3 py-1 bg-red-600 hover:bg-red-500 text-white text-xs font-sans font-bold rounded flex items-center space-x-1"
                    >
                      <RotateCcw size={12} />
                      <span>REINTENTAR</span>
                    </button>
                  </div>
                )}

                {/* Victory overlay */}
                {gameState === 'victory' && (
                  <div className="absolute inset-0 bg-black/95 flex flex-col justify-center items-center text-center p-2 z-10">
                    <Award className="text-yellow-400 mb-2 animate-pulse" size={32} />
                    <p className="text-sm text-cyan-400 font-mono font-bold tracking-wider">¡COMPLETADO!</p>
                    <p className="text-xs text-white/70 font-mono mb-3">Score: {score}</p>
                    <button
                      onClick={startGame}
                      className="px-3 py-1 bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-sans font-bold rounded flex items-center space-x-1"
                    >
                      <RotateCcw size={12} />
                      <span>JUGAR DE NUEVO</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* D-Pad Controls */}
          {gameState === 'playing' && (
            <div className="flex flex-col items-center mt-4">
              <button
                onClick={() => movePlayer(0, -1)}
                className="w-10 h-10 bg-white/5 hover:bg-white/10 text-white border border-white/10 active:scale-90 rounded-lg flex items-center justify-center font-bold text-lg shadow"
              >
                ▲
              </button>
              <div className="flex space-x-10 my-1">
                <button
                  onClick={() => movePlayer(-1, 0)}
                  className="w-10 h-10 bg-white/5 hover:bg-white/10 text-white border border-white/10 active:scale-90 rounded-lg flex items-center justify-center font-bold text-lg shadow"
                >
                  ◀
                </button>
                <button
                  onClick={() => movePlayer(1, 0)}
                  className="w-10 h-10 bg-white/5 hover:bg-white/10 text-white border border-white/10 active:scale-90 rounded-lg flex items-center justify-center font-bold text-lg shadow"
                >
                  ▶
                </button>
              </div>
              <button
                onClick={() => movePlayer(0, 1)}
                className="w-10 h-10 bg-white/5 hover:bg-white/10 text-white border border-white/10 active:scale-90 rounded-lg flex items-center justify-center font-bold text-lg shadow"
              >
                ▼
              </button>
            </div>
          )}
        </div>
      )}

      {/* RENDER HOLOFINANCE CHART */}
      {projectId === 'opp72' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <TrendingUp className="text-cyan-400" size={16} />
              <span className="text-xs font-sans text-white/40 uppercase tracking-widest font-bold">Opp72 Fish Market Auction</span>
            </div>
            <div className="flex space-x-1 bg-white/5 p-0.5 rounded-lg border border-white/5">
              {(['7D', '1M', '1Y'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => {
                    if (soundOn) playClick();
                    setTimeframe(t);
                  }}
                  className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors ${
                    timeframe === t
                      ? 'bg-cyan-400 text-black font-bold shadow'
                      : 'text-white/40 hover:text-white/85'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Main Visualizer Panel */}
          <div className="bg-[#0a0a0a] rounded-xl p-4 border border-white/10 relative">
            <div className="flex items-baseline space-x-1 mb-2">
              <span className="text-2xl font-mono text-cyan-400 font-bold">
                {cryptoTrend[cryptoTrend.length - 1]?.toFixed(2)}€
              </span>
              <span className="text-xs font-mono text-cyan-300 font-semibold">+14.2%</span>
            </div>

            {/* SVG Line Graph */}
            <div className="h-28 w-full">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                {/* Spline Area Path */}
                <path
                  d={`M 0,40 ${cryptoTrend
                    .map((val, idx) => {
                      const x = (idx / (cryptoTrend.length - 1)) * 100;
                      // map value from min-max into 5-35 range
                      const max = Math.max(...cryptoTrend);
                      const min = Math.min(...cryptoTrend);
                      const norm = max === min ? 0.5 : (val - min) / (max - min);
                      const y = 35 - norm * 30;
                      return `L ${x},${y}`;
                    })
                    .join(' ')} L 100,40 Z`}
                  fill="url(#chartGradient)"
                />
                {/* Line Path */}
                <path
                  d={cryptoTrend
                    .map((val, idx) => {
                      const x = (idx / (cryptoTrend.length - 1)) * 100;
                      const max = Math.max(...cryptoTrend);
                      const min = Math.min(...cryptoTrend);
                      const norm = max === min ? 0.5 : (val - min) / (max - min);
                      const y = 35 - norm * 30;
                      return `${idx === 0 ? 'M' : 'L'} ${x},${y}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#22d3ee"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Dotted Grid lines */}
                <line x1="0" y1="5" x2="100" y2="5" stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="2" />
                <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="2" />
                <line x1="0" y1="35" x2="100" y2="35" stroke="rgba(255, 255, 255, 0.05)" strokeDasharray="2" />
              </svg>
            </div>
          </div>

          {/* Interactive controls */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-sans text-white/50">
              <span>Oferta Activa / Puja:</span>
              <span className="text-cyan-400 font-bold">{investAmount.toLocaleString()}€</span>
            </div>
            <input
              type="range"
              min="1000"
              max="50000"
              step="1000"
              value={investAmount}
              onChange={(e) => {
                if (soundOn && Math.random() < 0.2) playClick();
                setInvestAmount(Number(e.target.value));
              }}
              className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-400"
            />
            <div className="flex justify-between text-[10px] font-mono text-white/30">
              <span>Min: 1,000€</span>
              <span>Max: 50,000€</span>
            </div>
          </div>
        </div>
      )}

      {/* RENDER ZENSPACE BREATHING BLOCK */}
      {projectId === 'gamehub' && (
        <div className="flex flex-col items-center py-2 space-y-4">
          <div className="flex items-center space-x-2">
            <Wind className="text-fuchsia-400 animate-pulse" size={16} />
            <span className="text-xs font-sans text-white/40 uppercase tracking-widest font-bold">GameHub Stress-Reliever</span>
          </div>

          {/* Animated Circle Container */}
          <div className="relative w-36 h-36 flex items-center justify-center">
            {/* Pulsing visual halo */}
            <div
              style={{
                transform: `scale(${
                  breathPhase === 'Inhala'
                    ? 1 + (breathProgress / 100) * 0.4
                    : breathPhase === 'Retén'
                    ? 1.4
                    : breathPhase === 'Exhala'
                    ? 1 + ((100 - breathProgress) / 100) * 0.4
                    : 1
                })`,
                opacity: isBreathing ? 0.35 : 0.15,
                transition: 'transform 0.1s linear',
              }}
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-fuchsia-500 to-cyan-500 blur-md"
            ></div>

            {/* Inner Ring */}
            <div className="absolute inset-2 bg-[#0a0a0a] border border-white/10 rounded-full flex flex-col justify-center items-center text-center p-2 z-10">
              <span className="text-[10px] font-sans text-fuchsia-400 uppercase font-bold">
                {isBreathing ? 'Fase Activa' : 'Reposo'}
              </span>
              <span className="text-base font-bold text-slate-100 font-sans tracking-wide min-h-[24px]">
                {breathPhase}
              </span>
              {isBreathing && (
                <div className="w-12 h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                  <div
                    style={{ width: `${breathProgress}%` }}
                    className="h-full bg-fuchsia-400 transition-all duration-100"
                  ></div>
                </div>
              )}
            </div>
          </div>

          {/* Trigger button */}
          <button
            onClick={toggleBreathing}
            className={`px-6 py-2 rounded-xl text-xs font-sans font-bold tracking-widest transition-all duration-200 cursor-pointer uppercase ${
              isBreathing
                ? 'bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30'
                : 'bg-fuchsia-500 hover:bg-fuchsia-400 text-black shadow-lg hover:shadow-fuchsia-500/20'
            }`}
          >
            {isBreathing ? 'DETENER GUÍA' : 'INICIAR PRÁCTICA'}
          </button>
          
          <p className="text-[10px] font-sans text-white/30 text-center max-w-[220px]">
            {isBreathing ? 'Sigue el pulso e inhala/exhala con la vibración.' : 'Controla tu respiración entre partidas para mantener la calma y el foco.'}
          </p>
        </div>
      )}
    </div>
  );
};
