import React, { useState, useEffect } from 'react';
import { GameBoard } from './components/GameBoard';
import { LetterGrid } from './components/LetterGrid';
import { GameStats } from './components/GameStats';
import { GameResult } from './components/GameResult';
import { EducationalContent } from './components/EducationalContent';
import { getRandomWord, WordData } from './data/words';
import { Leaf } from 'lucide-react';

function WordleGame() {
  const [currentWord, setCurrentWord] = useState<WordData | null>(null);
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [attemptsLeft, setAttemptsLeft] = useState(8);
  const [gameWon, setGameWon] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [showEducational, setShowEducational] = useState(false);

  const totalAttempts = 8;

  // Initialize game
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const newWord = getRandomWord();
    setCurrentWord(newWord);
    setGuessedLetters([]);
    setAttemptsLeft(totalAttempts);
    setGameWon(false);
    setGameOver(false);
    setShowEducational(false);
  };

  const handleLetterGuess = (letter: string) => {
    if (guessedLetters.includes(letter) || gameOver || !currentWord) return;

    const newGuessedLetters = [...guessedLetters, letter];
    setGuessedLetters(newGuessedLetters);

    // Check if letter is in word
    if (!currentWord.word.includes(letter)) {
      setAttemptsLeft(prev => prev - 1);
    }

    // Check win condition
    const wordLetters = [...new Set(currentWord.word.split('').filter(l => l !== ' '))];
    const hasWon = wordLetters.every(l => newGuessedLetters.includes(l));
    
    if (hasWon) {
      setGameWon(true);
      setGameOver(true);
      setTimeout(() => setShowEducational(true), 1000);
    } else if (attemptsLeft <= 1) {
      setGameOver(true);
      setTimeout(() => setShowEducational(true), 1000);
    }
  };

  // Get current guess for position feedback
  const getCurrentGuess = () => {
    if (!currentWord) return '';
    return currentWord.word.split('').map(letter => 
      guessedLetters.includes(letter) ? letter : '_'
    ).join('');
  };

  if (!currentWord) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Leaf className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
              EcoWord Challenge
            </h1>
            <Leaf className="w-8 h-8 text-green-600" />
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Test your environmental science knowledge! Guess the letters to reveal important ecological terms, 
            then learn about their significance in our natural world.
          </p>
        </div>

        {/* Game Stats */}
        <GameStats
          attemptsLeft={attemptsLeft}
          totalAttempts={totalAttempts}
          difficulty={currentWord.difficulty}
          onNewGame={startNewGame}
          gameOver={gameOver}
        />

        {/* Game Result */}
        {gameOver && (
          <GameResult
            won={gameWon}
            word={currentWord.word}
            attemptsUsed={totalAttempts - attemptsLeft}
            totalAttempts={totalAttempts}
          />
        )}

        {/* Game Board */}
        <GameBoard
          word={currentWord.word}
          guessedLetters={guessedLetters}
          currentGuess={getCurrentGuess()}
          isRevealed={gameOver}
        />

        {/* Letter Grid */}
        <LetterGrid
          guessedLetters={guessedLetters}
          word={currentWord.word}
          onLetterClick={handleLetterGuess}
          disabled={gameOver}
        />

        {/* Instructions */}
        {!gameOver && (
          <div className="text-center mb-8">
            <div className="bg-white rounded-lg p-4 shadow-md max-w-2xl mx-auto">
              <h3 className="font-semibold text-gray-800 mb-2">How to Play:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Click letters to guess if they're in the environmental science term</li>
                <li>• <span className="bg-green-100 px-1 rounded">Green</span> = correct position, 
                    <span className="bg-yellow-100 px-1 rounded mx-1">Yellow</span> = wrong position, 
                    <span className="bg-gray-100 px-1 rounded">Gray</span> = not in word</li>
                <li>• You have {totalAttempts} attempts to solve the word</li>
                <li>• Learn about each term's environmental significance after the game!</li>
              </ul>
            </div>
          </div>
        )}

        {/* Educational Content */}
        <EducationalContent
          wordData={currentWord}
          isVisible={showEducational}
        />
      </div>
    </div>
  );
}

export default WordleGame;