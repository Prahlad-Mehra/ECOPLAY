import React from 'react';

interface GameBoardProps {
  word: string;
  guessedLetters: string[];
  currentGuess: string;
  isRevealed: boolean;
}

export function GameBoard({ word, guessedLetters, currentGuess, isRevealed }: GameBoardProps) {
  const getLetterClass = (letter: string, index: number) => {
    if (isRevealed) return 'bg-green-500 text-white border-green-500';
    
    if (!guessedLetters.includes(letter)) {
      return 'bg-gray-100 border-gray-300 text-gray-400';
    }
    
    // Check if the letter is in the correct position
    if (currentGuess.length > index && currentGuess[index] === letter) {
      return 'bg-green-500 text-white border-green-500';
    }
    
    // Check if the letter exists in the word but in wrong position
    if (word.includes(letter)) {
      return 'bg-yellow-400 text-white border-yellow-400';
    }
    
    // Letter was guessed but not in word
    return 'bg-gray-400 text-white border-gray-400';
  };

  const getDisplayLetter = (letter: string, index: number) => {
    if (isRevealed) return letter;
    if (guessedLetters.includes(letter)) return letter;
    return '';
  };

  return (
    <div className="flex justify-center mb-8">
      <div className="flex gap-2 flex-wrap justify-center">
        {word.split('').map((letter, index) => (
          letter === ' ' ? (
            <div key={index} className="w-4"></div>
          ) : (
            <div
              key={index}
              className={`w-12 h-12 border-2 rounded-lg flex items-center justify-center text-xl font-bold transition-all duration-300 ${getLetterClass(letter, index)}`}
            >
              {getDisplayLetter(letter, index)}
            </div>
          )
        ))}
      </div>
    </div>
  );
}