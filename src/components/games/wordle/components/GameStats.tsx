import React from 'react';
import { Target, Clock, Award, RotateCcw } from 'lucide-react';

interface GameStatsProps {
  attemptsLeft: number;
  totalAttempts: number;
  difficulty: string;
  onNewGame: () => void;
  gameOver: boolean;
}

export function GameStats({ attemptsLeft, totalAttempts, difficulty, onNewGame, gameOver }: GameStatsProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getAttemptsColor = () => {
    const ratio = attemptsLeft / totalAttempts;
    if (ratio > 0.6) return 'text-green-600';
    if (ratio > 0.3) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Award className="w-6 h-6 text-blue-500" />
          Environmental Science Challenge
        </h2>
        <button
          onClick={onNewGame}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
        >
          <RotateCcw className="w-4 h-4" />
          New Word
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-500" />
          <span className="text-gray-600">Attempts:</span>
          <span className={`font-bold ${getAttemptsColor()}`}>
            {attemptsLeft}/{totalAttempts}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-500" />
          <span className="text-gray-600">Difficulty:</span>
          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(difficulty)}`}>
            {difficulty.toUpperCase()}
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${gameOver ? 'bg-gray-400' : 'bg-green-400 animate-pulse'}`}></div>
          <span className="text-gray-600 text-sm">
            {gameOver ? 'Game Complete' : 'In Progress'}
          </span>
        </div>
      </div>
    </div>
  );
}