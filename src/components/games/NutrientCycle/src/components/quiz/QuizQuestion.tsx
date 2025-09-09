import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';
import { MCQ } from '../../types';

interface QuizQuestionProps {
  mcq: MCQ;
  onAnswer: (isCorrect: boolean, attempts: number) => void;
  disabled?: boolean;
}

export const QuizQuestion: React.FC<QuizQuestionProps> = ({
  mcq,
  onAnswer,
  disabled = false
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSubmit = () => {
    if (!selectedOption || disabled) return;

    const correct = selectedOption === mcq.correctOptionId;
    const newAttempts = attempts + 1;
    
    setAttempts(newAttempts);
    setIsCorrect(correct);
    setShowResult(true);

    setTimeout(() => {
      onAnswer(correct, newAttempts);
    }, 2000);
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-100"
      >
        <div className={`flex items-start gap-3 mb-4 ${
          isCorrect ? 'text-emerald-600' : 'text-red-600'
        }`}>
          {isCorrect ? (
            <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
          ) : (
            <XCircle className="w-6 h-6 flex-shrink-0 mt-1" />
          )}
          <div>
            <h3 className="font-bold text-lg mb-2">
              {isCorrect ? 'Correct!' : 'Not quite right'}
            </h3>
            <p className="text-gray-700 leading-relaxed">
              {isCorrect ? mcq.explanationOnCorrect : mcq.explanationOnWrong}
            </p>
          </div>
        </div>

        {!isCorrect && attempts < 2 && (
          <motion.button
            onClick={handleRetry}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Try Again
          </motion.button>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-lg border-2 border-gray-100"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-6">
        {mcq.question}
      </h3>

      <div className="space-y-3 mb-6">
        {mcq.options.map((option) => (
          <motion.button
            key={option.id}
            onClick={() => !disabled && setSelectedOption(option.id)}
            disabled={disabled}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
              selectedOption === option.id
                ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                : 'border-gray-200 bg-gray-50 text-gray-700 hover:border-emerald-300'
            } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            whileHover={!disabled ? { scale: 1.01 } : {}}
            whileTap={!disabled ? { scale: 0.99 } : {}}
            aria-pressed={selectedOption === option.id}
          >
            <div className="flex items-center gap-3">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedOption === option.id
                  ? 'border-emerald-500 bg-emerald-500'
                  : 'border-gray-300'
              }`}>
                {selectedOption === option.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 bg-white rounded-full"
                  />
                )}
              </div>
              <span className="font-medium">{option.text}</span>
            </div>
          </motion.button>
        ))}
      </div>

      <motion.button
        onClick={handleSubmit}
        disabled={!selectedOption || disabled}
        className={`w-full py-3 px-6 rounded-lg font-bold text-lg transition-all ${
          selectedOption && !disabled
            ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-md'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
        }`}
        whileHover={selectedOption && !disabled ? { scale: 1.02 } : {}}
        whileTap={selectedOption && !disabled ? { scale: 0.98 } : {}}
      >
        Submit Answer
      </motion.button>

      {attempts > 0 && (
        <p className="text-sm text-gray-600 mt-2 text-center">
          Attempt {attempts} of 2
        </p>
      )}
    </motion.div>
  );
};