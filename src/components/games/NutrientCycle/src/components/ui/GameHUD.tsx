import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Zap } from 'lucide-react';

interface GameHUDProps {
  score: number;
  ecoPoints: number;
  streak: number;
  hearts: number;
  currentStep: number;
  totalSteps: number;
}

export const GameHUD: React.FC<GameHUDProps> = ({
  score,
  ecoPoints,
  streak,
  hearts,
  currentStep,
  totalSteps
}) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-green-200">
      <div className="flex flex-wrap items-center gap-6 text-sm">
        {/* Progress */}
        <div className="flex items-center gap-2">
          <span className="text-gray-600 font-medium">Progress:</span>
          <div className="flex items-center gap-1">
            <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600"
                initial={{ width: 0 }}
                animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <span className="text-gray-700 font-semibold">
              {currentStep}/{totalSteps}
            </span>
          </div>
        </div>

        {/* Score */}
        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 text-yellow-500" />
          <span className="text-gray-600 font-medium">Score:</span>
          <motion.span 
            className="text-yellow-600 font-bold"
            key={score}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.3 }}
          >
            {score}
          </motion.span>
        </div>

        {/* Eco Points */}
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-emerald-500" />
          <span className="text-gray-600 font-medium">Eco Points:</span>
          <motion.span 
            className="text-emerald-600 font-bold"
            key={ecoPoints}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.3 }}
          >
            {ecoPoints}
          </motion.span>
        </div>

        {/* Streak */}
        {streak > 0 && (
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              🔥
            </motion.div>
            <span className="text-gray-600 font-medium">Streak:</span>
            <span className="text-orange-600 font-bold">{streak}</span>
          </div>
        )}

        {/* Hearts */}
        <div className="flex items-center gap-1">
          <span className="text-gray-600 font-medium mr-2">Lives:</span>
          {Array.from({ length: 3 }).map((_, i) => (
            <motion.div
              key={i}
              animate={i < hearts ? { scale: [1, 1.1, 1] } : { opacity: 0.3 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <Heart
                className={`w-5 h-5 ${
                  i < hearts ? 'text-red-500 fill-red-500' : 'text-gray-300'
                }`}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};