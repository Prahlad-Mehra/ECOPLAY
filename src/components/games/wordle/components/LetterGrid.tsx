import React from 'react';

interface LetterGridProps {
  guessedLetters: string[];
  word: string;
  onLetterClick: (letter: string) => void;
  disabled: boolean;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function LetterGrid({ guessedLetters, word, onLetterClick, disabled }: LetterGridProps) {
  const getLetterStatus = (letter: string) => {
    if (!guessedLetters.includes(letter)) return 'available';
    if (word.includes(letter)) return 'correct';
    return 'incorrect';
  };

  const getLetterClass = (letter: string) => {
    const status = getLetterStatus(letter);
    const baseClass = 'w-8 h-8 sm:w-10 sm:h-10 border-2 rounded-lg flex items-center justify-center text-sm sm:text-base font-semibold transition-all duration-200 cursor-pointer';
    
    if (disabled || guessedLetters.includes(letter)) {
      return `${baseClass} cursor-not-allowed opacity-50`;
    }

    switch (status) {
      case 'correct':
        return `${baseClass} bg-green-500 text-white border-green-500`;
      case 'incorrect':
        return `${baseClass} bg-gray-500 text-white border-gray-500`;
      default:
        return `${baseClass} bg-white border-gray-300 hover:bg-blue-50 hover:border-blue-300`;
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold mb-4 text-center text-gray-700">
        Click a letter to guess:
      </h3>
      <div className="grid grid-cols-6 sm:grid-cols-9 gap-2 max-w-lg mx-auto">
        {ALPHABET.map((letter) => (
          <button
            key={letter}
            onClick={() => onLetterClick(letter)}
            disabled={disabled || guessedLetters.includes(letter)}
            className={getLetterClass(letter)}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}