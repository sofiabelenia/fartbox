import React, { useState } from 'react';
import GameMenu from './components/GameMenu';
import GatoLuz from './games/GatoLuz';
import PerritoGame from './games/PerritoGame';
import RoboGame from './games/RoboGame';

const games = [
  {
    id: 'gato-luz',
    title: 'Gato Travieso',
    description: 'Rasguña el sofá sin que la luz te atrape',
    emoji: '🐱',
    color: 'from-orange-500 to-yellow-500',
    component: GatoLuz,
    type: 'react'
  },
  {
    id: 'perrito-react',
    title: 'La Cena del Perrito',
    description: 'Alimenta al perrito encontrando la comida correcta',
    emoji: '🐶',
    color: 'from-amber-500 to-orange-500',
    component: PerritoGame,
    type: 'react'
  },
  {
    id: 'robo',
    title: 'Robo Perfecto',
    description: 'Memoriza y roba el botín sin ser atrapado',
    emoji: '💎',
    color: 'from-slate-600 to-slate-800',
    component: RoboGame,
    type: 'react'
  },
  {
    id: 'abuela',
    title: 'Propulsor de la Abuela',
    description: '¡Ayuda a la abuela a despegar con su cohete navideño!',
    emoji: '🚀',
    color: 'from-red-500 to-pink-500',
    type: 'html',
    path: '/abuela.html'
  },
  {
    id: 'cohete',
    title: 'Cohete a Gas',
    description: 'Controla el cohete evitando los peligrosos farts',
    emoji: '🚀',
    color: 'from-blue-500 to-purple-500',
    type: 'html',
    path: '/cohete.html'
  },
  {
    id: 'galletas',
    title: 'Galletas Explosivas',
    description: 'La niña debe atrapar galletas antes de que exploten',
    emoji: '🍪',
    color: 'from-pink-500 to-rose-500',
    type: 'html',
    path: '/galletas.html'
  },
  {
    id: 'saltar',
    title: 'Santa Claus Saltarín',
    description: 'Santa salta entre edificios navideños',
    emoji: '🎅',
    color: 'from-green-500 to-red-500',
    type: 'html',
    path: '/saltar.html'
  },
  {
    id: 'fart-box',
    title: 'Fart Box 3x3',
    description: 'Soundboard de efectos de sonido épicos',
    emoji: '💨',
    color: 'from-purple-600 to-pink-600',
    type: 'html',
    path: '/peos.html'
  },
  {
    id: 'dance-battle',
    title: 'Navidad Battle',
    description: 'Santa vs Grinch en batalla de dados épica',
    emoji: '🎲',
    color: 'from-red-600 to-green-600',
    type: 'html',
    path: '/dance-battle.html'
  }
];

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);

  if (selectedGame) {
    const game = games.find(g => g.id === selectedGame);

    if (game.type === 'react' && game.component) {
      const GameComponent = game.component;
      return (
        <div className="min-h-screen bg-gray-900">
          <button
            onClick={() => setSelectedGame(null)}
            className="fixed top-4 left-4 z-50 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg shadow-lg transition-colors flex items-center gap-2"
          >
            ← Volver al Menú
          </button>
          <GameComponent />
        </div>
      );
    } else if (game.type === 'html' && game.path) {
      // Para juegos HTML, construir la ruta correcta
      const basePath = import.meta.env.BASE_URL || '/';
      window.location.href = basePath + game.path.substring(1); // Remove leading slash from path
      return null;
    }
  }

  return <GameMenu games={games} onSelectGame={setSelectedGame} />;
}
