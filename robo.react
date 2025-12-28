import React, { useState, useEffect, useCallback } from 'react';
import { 
  Briefcase, 
  Lock, 
  Siren, 
  RefreshCw, 
  Trophy, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  XCircle,
  Play
} from 'lucide-react';

// --- DATA & ASSETS ---
const LOOT_ITEMS = [
  { id: 'diamond', name: 'Diamante', icon: '💎', color: 'text-blue-400' },
  { id: 'money', name: 'Fajo de Billetes', icon: '💵', color: 'text-green-500' },
  { id: 'gold', name: 'Lingote de Oro', icon: '⚱️', color: 'text-yellow-500' },
  { id: 'watch', name: 'Reloj de Lujo', icon: '⌚', color: 'text-gray-400' },
  { id: 'ring', name: 'Anillo de Rubí', icon: '💍', color: 'text-red-400' },
  { id: 'phone', name: 'Smartphone', icon: '📱', color: 'text-blue-300' },
  { id: 'laptop', name: 'Laptop Encriptada', icon: '💻', color: 'text-gray-300' },
  { id: 'camera', name: 'Cámara Pro', icon: '📷', color: 'text-gray-800' },
  { id: 'necklace', name: 'Collar de Perlas', icon: '📿', color: 'text-pink-200' },
  { id: 'passport', name: 'Pasaporte Falso', icon: '🛂', color: 'text-green-700' },
  { id: 'key', name: 'Llave Maestra', icon: '🗝️', color: 'text-yellow-700' },
  { id: 'card', name: 'Tarjeta Negra', icon: '💳', color: 'text-slate-500' },
  { id: 'painting', name: 'Obra de Arte', icon: '🖼️', color: 'text-orange-400' },
  { id: 'crown', name: 'Corona Real', icon: '👑', color: 'text-yellow-400' },
  { id: 'gem', name: 'Esmeralda', icon: '🟢', color: 'text-green-600' },
];

// --- UTILS ---
const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// --- COMPONENTS ---

const Card = ({ item, onClick, isSelected, isRevealed, status }) => {
  let borderClass = "border-slate-700 hover:border-slate-500";
  let bgClass = "bg-slate-800";
  
  if (status === 'correct') {
    borderClass = "border-green-500 bg-green-900/30";
  } else if (status === 'wrong') {
    borderClass = "border-red-500 bg-red-900/30";
  } else if (isSelected) {
    borderClass = "border-yellow-400 bg-slate-700";
  }

  return (
    <button
      onClick={() => onClick(item)}
      className={`relative p-4 rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-300 transform hover:scale-105 active:scale-95 ${borderClass} ${bgClass} shadow-lg h-24 sm:h-32`}
      disabled={status !== 'neutral'}
    >
      <div className="text-3xl sm:text-5xl mb-2 filter drop-shadow-md">
        {item.icon}
      </div>
      <span className="text-xs sm:text-sm font-bold text-slate-300 text-center leading-tight">
        {item.name}
      </span>
      {status === 'correct' && (
        <div className="absolute top-1 right-1 text-green-400">
          <CheckCircle size={16} />
        </div>
      )}
    </button>
  );
};

export default function LootGame() {
  // Game State
  const [level, setLevel] = useState(1);
  const [gameState, setGameState] = useState('menu'); // Cambiado a 'menu' para mostrar pantalla de inicio
  const [targetItems, setTargetItems] = useState([]);
  const [options, setOptions] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [score, setScore] = useState(0);
  const [message, setMessage] = useState('');

  // Configuración de dificultad
  const getLevelConfig = (lvl) => {
    // Nivel 1: 2 items (pool 4)
    // Nivel 2: 3 items (pool 6)
    // Nivel 3: 4 items (pool 9)
    // Nivel 4: 5 items (pool 12)
    const itemCount = Math.min(2 + Math.floor((lvl - 1) / 1), 6); 
    const poolSize = Math.min(4 + (lvl - 1) * 2, 15);
    const previewTime = Math.max(2000, 3500 - (lvl * 200) + (itemCount * 800)); // Dynamic time
    
    return { itemCount, poolSize, previewTime };
  };

  const startLevel = useCallback((currentLevel) => {
    const config = getLevelConfig(currentLevel);
    
    // Seleccionar items objetivo
    const shuffledAll = shuffleArray(LOOT_ITEMS);
    const targets = shuffledAll.slice(0, config.itemCount);
    
    // Crear pool de opciones (targets + distractors)
    const remaining = shuffledAll.slice(config.itemCount);
    const distractors = remaining.slice(0, config.poolSize - config.itemCount);
    const levelOptions = shuffleArray([...targets, ...distractors]);

    setTargetItems(targets);
    setOptions(levelOptions);
    setSelectedItems([]);
    setGameState('preview');
    setTimeLeft(config.previewTime);
    setMessage(`¡Memoriza los ${targets.length} objetos de la bolsa!`);
  }, []);

  // Timer effect for preview phase
  useEffect(() => {
    if (gameState !== 'preview') return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 100) {
          clearInterval(interval);
          setGameState('playing');
          setMessage('¿Qué había en la bolsa? Selecciónalos.');
          return 0;
        }
        return prev - 100;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [gameState]);

  const handleStartGame = () => {
    setLevel(1);
    setScore(0);
    startLevel(1);
  };

  const handleNextLevel = () => {
    const nextLvl = level + 1;
    setLevel(nextLvl);
    startLevel(nextLvl);
  };

  const handleCardClick = (item) => {
    if (gameState !== 'playing') return;

    // Toggle selection
    const isAlreadySelected = selectedItems.find(i => i.id === item.id);
    let newSelection;

    if (isAlreadySelected) {
      newSelection = selectedItems.filter(i => i.id !== item.id);
    } else {
      // Check limits
      if (selectedItems.length >= targetItems.length) return;
      newSelection = [...selectedItems, item];
    }
    
    setSelectedItems(newSelection);

    // Check win condition immediately if full selection made
    if (newSelection.length === targetItems.length) {
      checkResult(newSelection);
    }
  };

  const checkResult = (selection) => {
    const targetIds = targetItems.map(t => t.id).sort();
    const selectedIds = selection.map(s => s.id).sort();
    
    const isWin = JSON.stringify(targetIds) === JSON.stringify(selectedIds);

    if (isWin) {
      setGameState('success');
      setScore(s => s + (level * 100));
      setMessage('¡Excelente! Has recuperado el botín.');
    } else {
      setGameState('gameover');
      setMessage('¡Oh no! Has identificado los objetos equivocados. La policía te atrapó.');
    }
  };

  // --- RENDERS ---

  if (gameState === 'menu') {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 font-sans flex flex-col items-center justify-center p-4">
        <div className="flex flex-col items-center gap-6 animate-in zoom-in duration-500">
          <div className="bg-slate-800 p-6 rounded-full shadow-2xl shadow-yellow-500/20 mb-4">
            <Briefcase size={64} className="text-yellow-500" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-center">
            EL BOTÍN <span className="text-yellow-500">OCULTO</span>
          </h1>
          <button 
            onClick={handleStartGame}
            className="mt-8 bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-black text-2xl py-6 px-16 rounded-2xl shadow-[0_0_20px_rgba(234,179,8,0.4)] transform transition-all hover:scale-105 active:scale-95 flex items-center gap-3"
          >
            <Play size={32} fill="currentColor" /> START
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-yellow-500/30">
      {/* Header */}
      <header className="p-4 border-b border-slate-800 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Briefcase size={20} className="text-yellow-500" />
            <span className="font-bold tracking-wider">NIVEL {level}</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
               <Trophy size={16} className="text-yellow-400" />
               <span className="font-mono text-yellow-400">{score}</span>
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 flex flex-col items-center min-h-[80vh] justify-center">
        
        {/* Status Message */}
        <div className="mb-6 text-center animate-fade-in">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 flex items-center justify-center gap-2">
            {gameState === 'preview' && <Eye className="text-blue-400 animate-pulse" />}
            {gameState === 'playing' && <Lock className="text-yellow-400" />}
            {gameState === 'success' && <CheckCircle className="text-green-400" />}
            {gameState === 'gameover' && <Siren className="text-red-500 animate-bounce" />}
            {message}
          </h2>
          {gameState === 'playing' && (
            <p className="text-slate-400 text-sm">
              Seleccionados: <span className="text-white font-bold">{selectedItems.length}</span> / {targetItems.length}
            </p>
          )}
        </div>

        {/* GAME AREA */}
        
        {/* PHASE 1: PREVIEW (THE BAG) */}
        {gameState === 'preview' && (
          <div className="relative w-full max-w-md aspect-square bg-slate-900 rounded-3xl border-4 border-slate-800 flex items-center justify-center p-8 shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] overflow-hidden group">
             {/* Progress Bar */}
             <div className="absolute top-0 left-0 h-2 bg-blue-500 z-20 transition-all duration-100 ease-linear" style={{ width: `${(timeLeft / getLevelConfig(level).previewTime) * 100}%` }}></div>
             
             {/* Spotlight Effect */}
             <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 pointer-events-none z-10"></div>
             
             <div className="grid grid-cols-2 gap-6 relative z-0 animate-in fade-in zoom-in duration-500">
                {targetItems.map((item) => (
                  <div key={item.id} className="flex flex-col items-center animate-bounce-slow">
                    <div className="text-7xl drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] filter brightness-110">
                      {item.icon}
                    </div>
                    <span className="mt-2 font-bold text-slate-300 bg-slate-900/80 px-2 rounded">
                      {item.name}
                    </span>
                  </div>
                ))}
             </div>
          </div>
        )}

        {/* PHASE 2: GUESSING GRID */}
        {(gameState === 'playing' || gameState === 'success' || gameState === 'gameover') && (
          <div className="w-full animate-in slide-in-from-bottom-10 duration-500">
             <div className={`grid grid-cols-2 sm:grid-cols-3 gap-3 w-full ${options.length > 9 ? 'md:grid-cols-4' : ''}`}>
               {options.map((item) => {
                 const isSelected = selectedItems.find(i => i.id === item.id);
                 let status = 'neutral';
                 
                 if (gameState !== 'playing') {
                   const isTarget = targetItems.find(t => t.id === item.id);
                   if (isTarget && isSelected) status = 'correct'; // Found it
                   if (!isTarget && isSelected) status = 'wrong'; // Clicked wrong one
                   if (isTarget && !isSelected) status = 'wrong'; // Missed it (optional: make it subtle)
                 }

                 return (
                   <Card 
                    key={item.id} 
                    item={item} 
                    onClick={handleCardClick}
                    isSelected={isSelected}
                    status={status}
                   />
                 );
               })}
             </div>
          </div>
        )}

        {/* CONTROLS FOR END OF LEVEL */}
        {gameState === 'success' && (
           <div className="mt-8 animate-in zoom-in duration-300">
             <button 
               onClick={handleNextLevel}
               className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-green-900/50 flex items-center gap-2 transform hover:scale-105 transition-all"
             >
               Siguiente Nivel <Play size={18} fill="currentColor" />
             </button>
           </div>
        )}

        {gameState === 'gameover' && (
           <div className="mt-8 animate-in zoom-in duration-300 flex flex-col items-center gap-4">
             <div className="p-4 bg-slate-800 rounded-lg text-left w-full max-w-sm border border-slate-700">
                <p className="text-slate-400 text-sm mb-2">Lo que había realmente:</p>
                <div className="flex gap-2 justify-center flex-wrap">
                  {targetItems.map(t => (
                    <div key={t.id} title={t.name} className="bg-slate-900 p-2 rounded text-2xl border border-slate-600">
                      {t.icon}
                    </div>
                  ))}
                </div>
             </div>
             
             <button 
               onClick={handleStartGame}
               className="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-full shadow-lg flex items-center gap-2 transform hover:scale-105 transition-all"
             >
               <RefreshCw size={18} /> Intentar de Nuevo
             </button>
           </div>
        )}

      </main>
    </div>
  );
}