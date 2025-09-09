import React from 'react';
import { CheckCircle, XCircle, Trophy, Target } from 'lucide-react';

interface GameResultProps {
  won: boolean;
  word: string;
  attemptsUsed: number;
  totalAttempts: number;
}

export function GameResult({ won, word, attemptsUsed, totalAttempts }: GameResultProps) {
  return (
    <div className={`text-center p-6 rounded-lg mb-6 ${
      won 
        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
        : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
    }`}>
      <div className="flex items-center justify-center mb-4">
        {won ? (
          <div className="flex items-center gap-3">
            <Trophy className="w-8 h-8" />
            <CheckCircle className="w-8 h-8" />
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Target className="w-8 h-8" />
            <XCircle className="w-8 h-8" />
          </div>
        )}
      </div>
      
      <h2 className="text-2xl font-bold mb-2">
        {won ? 'Congratulations!' : 'Word Revealed!'}
      </h2>
      
      <p className="text-lg mb-2">
        The word was: <span className="font-bold text-yellow-200">{word}</span>
      </p>
      
      {won ? (
        <p className="text-sm opacity-90">
          You solved it in {attemptsUsed} out of {totalAttempts} attempts!
        </p>
      ) : (
        <p className="text-sm opacity-90">
          Don't worry! Learning happens through exploration. 
          Check out the educational content below to master this term.
        </p>
      )}
    </div>
  );
}