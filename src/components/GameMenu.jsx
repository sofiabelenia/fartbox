import React from 'react';

export default function GameMenu({ games, onSelectGame }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex flex-col items-center justify-center p-4">
      {/* Header */}
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 mb-4">
          GAME CENTRAL
        </h1>
        <p className="text-gray-300 text-lg md:text-xl">
          Elige tu aventura
        </p>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => onSelectGame(game.id)}
            className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border-2 border-gray-700 hover:border-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/50 text-left overflow-hidden"
          >
            {/* Background gradient effect */}
            <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

            {/* Content */}
            <div className="relative z-10">
              {/* Emoji Icon */}
              <div className="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {game.emoji}
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all">
                {game.title}
              </h2>

              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed">
                {game.description}
              </p>

              {/* Play indicator */}
              <div className="mt-4 flex items-center gap-2 text-purple-400 font-semibold text-sm">
                <span className="group-hover:translate-x-1 transition-transform">Jugar</span>
                <span className="group-hover:translate-x-2 transition-transform">→</span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-gray-500 text-sm">
        <p>Presiona cualquier juego para comenzar</p>
      </div>
    </div>
  );
}
