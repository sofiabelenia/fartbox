import React, { useState, useEffect, useRef, useCallback } from 'react';

// Constantes del juego
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;
const CAT_RADIUS = 30; // Tamaño de colisión del gato
const LIGHT_RADIUS = 60; // Tamaño de la luz
const SCRATCH_RATE = 0.4; // Progreso por frame al rasguñar

// Colores y Estilos
const COLORS = {
  bg: '#2d2a32', // Color piso oscuro
  furniture: '#8B4513', // Sofá café
  light: 'rgba(255, 255, 200, 0.6)', // Luz amarilla semitransparente
  lightBorder: 'rgba(255, 255, 255, 0.8)',
  progressBg: '#444',
  progressFill: '#ff9f43',
};

export default function App() {
  // Estados de React para la UI
  const [gameState, setGameState] = useState('menu'); // menu, playing, levelComplete, gameOver
  const [level, setLevel] = useState(1);
  const [progress, setProgress] = useState(0);
  const [maxProgress, setMaxProgress] = useState(100);
  
  // Referencias para la lógica del juego (evita re-renders innecesarios)
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const isScratchingRef = useRef(false);
  const lightsRef = useRef([]);
  const progressRef = useRef(0);
  const frameCountRef = useRef(0);
  const scratchParticlesRef = useRef([]);

  // Inicializar nivel
  const startLevel = useCallback((lvl) => {
    const speedMultiplier = 1 + (lvl * 0.2);
    const numLights = lvl; // 1 luz nivel 1, 2 luces nivel 2, etc.
    
    // Configurar luces
    const newLights = [];
    for (let i = 0; i < numLights; i++) {
      newLights.push({
        x: Math.random() < 0.5 ? 50 : GAME_WIDTH - 50, // Empezar en bordes
        y: Math.random() * GAME_HEIGHT,
        vx: (Math.random() > 0.5 ? 2 : -2) * speedMultiplier,
        vy: (Math.random() > 0.5 ? 2 : -2) * speedMultiplier,
        radius: LIGHT_RADIUS,
      });
    }

    lightsRef.current = newLights;
    progressRef.current = 0;
    setProgress(0);
    setMaxProgress(100 + (lvl * 50)); // Más difícil cada nivel
    setGameState('playing');
    setLevel(lvl);
    scratchParticlesRef.current = [];
  }, []);

  const startGame = () => {
    startLevel(1);
  };

  const nextLevel = () => {
    startLevel(level + 1);
  };

  // Manejo de Input (Teclado y Touch)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        if (gameState === 'playing') isScratchingRef.current = true;
        // Reiniciar con espacio si perdió
        if (gameState === 'gameOver' && e.repeat === false) startGame();
        // Siguiente nivel con espacio
        if (gameState === 'levelComplete' && e.repeat === false) nextLevel();
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'Space') isScratchingRef.current = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [gameState, level]);

  // Bucle del juego (Game Loop)
  const update = useCallback(() => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // 1. Limpiar Canvas
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // 2. Dibujar Fondo (Habitación)
    ctx.fillStyle = COLORS.bg;
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // 3. Dibujar Mueble (Centro)
    const centerX = GAME_WIDTH / 2;
    const centerY = GAME_HEIGHT / 2;
    
    // Sombra del mueble
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.ellipse(centerX, centerY + 40, 80, 30, 0, 0, Math.PI * 2);
    ctx.fill();

    // Texto del mueble (Emoji gigante)
    ctx.font = '100px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('🛋️', centerX, centerY);

    // 4. Lógica del Gato
    let catX = centerX;
    let catY = centerY + 10;

    // Efecto de vibración al rasguñar
    if (isScratchingRef.current) {
      const shakeX = (Math.random() - 0.5) * 10;
      const shakeY = (Math.random() - 0.5) * 5;
      catX += shakeX;
      catY += shakeY;

      // Sumar progreso
      progressRef.current += SCRATCH_RATE;
      
      // Partículas de rasguño
      if (frameCountRef.current % 5 === 0) {
         scratchParticlesRef.current.push({
             x: catX + (Math.random() - 0.5) * 60,
             y: catY + (Math.random() - 0.5) * 40,
             life: 20
         });
      }

      // Chequear victoria
      if (progressRef.current >= maxProgress) {
        setGameState('levelComplete');
        isScratchingRef.current = false;
      }
    }

    // Actualizar estado visual de progreso (throttled para performance visual)
    if (frameCountRef.current % 10 === 0) {
        setProgress(progressRef.current);
    }

    // Dibujar Gato
    ctx.font = '60px Arial';
    ctx.fillText('🐱', catX, catY);

    // Dibujar partículas de rasguño
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    scratchParticlesRef.current.forEach((p, index) => {
        p.life--;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + 5, p.y - 5);
        ctx.stroke();
        if(p.life <= 0) scratchParticlesRef.current.splice(index, 1);
    });

    // 5. Lógica de Luces
    let hitDetected = false;

    lightsRef.current.forEach(light => {
      // Mover luz
      light.x += light.vx;
      light.y += light.vy;

      // Rebotar en paredes
      if (light.x < 0 || light.x > GAME_WIDTH) light.vx *= -1;
      if (light.y < 0 || light.y > GAME_HEIGHT) light.vy *= -1;

      // Dibujar Luz
      const gradient = ctx.createRadialGradient(light.x, light.y, 10, light.x, light.y, light.radius);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      gradient.addColorStop(0.5, COLORS.light);
      gradient.addColorStop(1, 'rgba(255, 255, 200, 0)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(light.x, light.y, light.radius, 0, Math.PI * 2);
      ctx.fill();

      // Chequear colisión con el gato
      const dx = light.x - centerX;
      const dy = light.y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Si la luz toca al gato
      if (distance < light.radius + CAT_RADIUS - 20) {
        // Dibujar indicador de peligro
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(light.x, light.y, light.radius, 0, Math.PI * 2);
        ctx.stroke();

        if (isScratchingRef.current) {
          hitDetected = true;
        }
      }
    });

    // Si fue detectado
    if (hitDetected) {
      setGameState('gameOver');
      isScratchingRef.current = false;
    }

    frameCountRef.current++;
    requestRef.current = requestAnimationFrame(update);
  }, [gameState, maxProgress]);

  // Iniciar Loop
  useEffect(() => {
    requestRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(requestRef.current);
  }, [update]);


  // --- UI COMPONENTS ---

  const handleTouchStart = () => { if(gameState === 'playing') isScratchingRef.current = true; };
  const handleTouchEnd = () => { isScratchingRef.current = false; };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 font-sans p-4 select-none">
      
      {/* Header */}
      <div className="mb-4 text-center w-full max-w-[800px]">
        <h1 className="text-3xl font-bold text-white mb-2">Gato Travieso 🐱</h1>
        <div className="flex justify-between items-center bg-gray-800 p-3 rounded-lg border border-gray-700">
          <div className="text-orange-400 font-bold text-xl">Nivel {level}</div>
          
          {/* Barra de Progreso */}
          <div className="flex-1 mx-4 h-6 bg-gray-700 rounded-full overflow-hidden relative border border-gray-600">
            <div 
              className="h-full bg-gradient-to-r from-orange-500 to-yellow-400 transition-all duration-100 ease-linear"
              style={{ width: `${Math.min((progress / maxProgress) * 100, 100)}%` }}
            />
            <div className="absolute inset-0 flex items-center justify-center text-xs text-white font-bold drop-shadow-md">
              Daño al mueble
            </div>
          </div>
        </div>
        <p className="text-gray-400 text-sm mt-2">
          Mantén <span className="bg-gray-700 px-2 py-0.5 rounded text-white">ESPACIO</span> o toca la pantalla para rasguñar. ¡Detente si te toca la luz!
        </p>
      </div>

      {/* Game Container */}
      <div className="relative rounded-xl overflow-hidden shadow-2xl border-4 border-gray-700" style={{ width: '100%', maxWidth: '800px', aspectRatio: '4/3' }}>
        
        {/* El Canvas del Juego */}
        <canvas
          ref={canvasRef}
          width={GAME_WIDTH}
          height={GAME_HEIGHT}
          className="w-full h-full block bg-[#2d2a32]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleTouchStart}
          onMouseUp={handleTouchEnd}
        />

        {/* OVERLAYS UI */}
        
        {/* Menu Principal */}
        {gameState === 'menu' && (
          <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-white z-10 p-6 text-center">
            <div className="text-6xl mb-4">🛋️⚡🐱</div>
            <h2 className="text-4xl font-extrabold text-orange-400 mb-6">¿Listo para destruir?</h2>
            <p className="text-xl mb-8 max-w-md">
              Rasguña el sofá cuando no haya moros en la costa. 
              Si la luz te toca mientras rasguñas... ¡Pierdes!
            </p>
            <button
              onClick={startGame}
              className="bg-orange-600 hover:bg-orange-500 text-white font-bold py-4 px-10 rounded-full text-2xl transform transition hover:scale-105 active:scale-95 shadow-lg touch-auto cursor-pointer"
            >
              Jugar
            </button>
          </div>
        )}

        {/* Game Over - FOME */}
        {gameState === 'gameOver' && (
          <div className="absolute inset-0 bg-red-900/90 flex flex-col items-center justify-center text-white z-20 animate-in fade-in zoom-in duration-300">
            <h2 className="text-[120px] font-black text-white leading-none tracking-tighter drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)]">
              FOME
            </h2>
            <p className="text-2xl mt-4 text-red-200">¡Te pillaron in fraganti!</p>
            <div className="mt-8 flex gap-4">
               <button 
                onClick={startGame}
                className="bg-white text-red-900 font-bold py-3 px-8 rounded-full text-xl hover:bg-gray-200 transition"
              >
                Intentar de nuevo (Espacio)
              </button>
            </div>
          </div>
        )}

        {/* Level Complete */}
        {gameState === 'levelComplete' && (
          <div className="absolute inset-0 bg-green-900/90 flex flex-col items-center justify-center text-white z-20">
            <div className="text-6xl mb-4 animate-bounce">😼</div>
            <h2 className="text-5xl font-bold text-green-300 mb-2">¡Sofá Destruido!</h2>
            <p className="text-xl mb-8">Nivel {level} completado</p>
            <button 
              onClick={nextLevel}
              className="bg-green-500 hover:bg-green-400 text-white font-bold py-3 px-8 rounded-full text-xl transition shadow-lg transform hover:scale-110"
            >
              Siguiente Nivel (Espacio)
            </button>
          </div>
        )}

        {/* Controles Táctiles (Solo visible si no hay teclado o para ayuda visual) */}
        {gameState === 'playing' && (
          <div className="absolute bottom-4 right-4 md:hidden">
            <button
              className={`w-24 h-24 rounded-full border-4 font-bold text-white shadow-lg flex items-center justify-center transition-all ${
                isScratchingRef.current ? 'bg-orange-600 border-orange-300 scale-95' : 'bg-orange-500/50 border-white/50'
              }`}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleTouchStart}
              onMouseUp={handleTouchEnd}
              onMouseLeave={handleTouchEnd}
            >
              ⚡ RASGUÑAR
            </button>
          </div>
        )}

      </div>
      
      {/* Footer Instructions */}
      <div className="mt-4 text-gray-500 text-xs text-center">
        Consejo: Suelta el espacio inmediatamente cuando veas que la luz se acerca.
      </div>
    </div>
  );
}