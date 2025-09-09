import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Droplets, Leaf, Trophy, HelpCircle, Play, Users } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export const Landing: React.FC = () => {
  const [showNameModal, setShowNameModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<string>('');
  const [tempName, setTempName] = useState('');
  const { playerName, setPlayerName } = useGameStore();

  const handleStartLesson = (lessonId: string) => {
    setSelectedLesson(lessonId);
    if (!playerName) {
      setShowNameModal(true);
    } else {
      // Navigate directly if name is already set
      window.location.href = `/lesson/${lessonId}`;
    }
  };

  const handleNameSubmit = () => {
    if (tempName.trim()) {
      setPlayerName(tempName.trim());
      setShowNameModal(false);
      window.location.href = `/lesson/${selectedLesson}`;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-green-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            className="flex items-center justify-center gap-3 mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <div className="relative">
              <Leaf className="w-12 h-12 text-emerald-600" />
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              EcoQuest
            </h1>
          </motion.div>

          <motion.p
            className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Embark on an interactive journey through nature's most important cycles. 
            Learn, explore, and become a guardian of our planet's ecosystems!
          </motion.p>

          {playerName && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full font-medium mb-8"
            >
              <Users className="w-4 h-4" />
              Welcome back, {playerName}!
            </motion.div>
          )}
        </motion.div>

        {/* Lesson Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="group"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-blue-100">
              <div className="bg-gradient-to-r from-blue-400 to-blue-600 p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <Droplets className="w-10 h-10" />
                  <h2 className="text-2xl font-bold">Water Cycle Adventure</h2>
                </div>
                <p className="text-blue-100 leading-relaxed">
                  Discover how water moves through our planet in an endless cycle of 
                  transformation - from ocean to sky and back again.
                </p>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                  <span className="flex items-center gap-1">
                    <Play className="w-4 h-4" />
                    5 Interactive Steps
                  </span>
                  <span className="flex items-center gap-1">
                    <Trophy className="w-4 h-4" />
                    Water Guardian Badge
                  </span>
                </div>
                
                <button
                  onClick={() => handleStartLesson('water-cycle')}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                >
                  Start Water Cycle Lesson
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="group"
          >
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 border border-green-100">
              <div className="bg-gradient-to-r from-emerald-400 to-green-600 p-8 text-white">
                <div className="flex items-center gap-4 mb-4">
                  <Leaf className="w-10 h-10" />
                  <h2 className="text-2xl font-bold">Nitrogen Cycle Explorer</h2>
                </div>
                <p className="text-green-100 leading-relaxed">
                  Learn how nitrogen moves through ecosystems, supporting all life on Earth 
                  through bacteria, plants, and animals.
                </p>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                  <span className="flex items-center gap-1">
                    <Play className="w-4 h-4" />
                    5 Interactive Steps
                  </span>
                  <span className="flex items-center gap-1">
                    <Trophy className="w-4 h-4" />
                    Nitrogen Master Badge
                  </span>
                </div>
                
                <button
                  onClick={() => handleStartLesson('nitrogen-cycle')}
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                >
                  Start Nitrogen Cycle Lesson
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          <Link
            to="/leaderboard"
            className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            <Trophy className="w-5 h-5" />
            View Leaderboard
          </Link>

          <button
            onClick={() => setShowHelpModal(true)}
            className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
          >
            <HelpCircle className="w-5 h-5" />
            How It Works
          </button>
        </motion.div>
      </div>

      {/* Name Input Modal */}
      <AnimatePresence>
        {showNameModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={(e) => e.target === e.currentTarget && setShowNameModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                What's your name, explorer?
              </h3>
              <p className="text-gray-600 mb-6">
                We'll use this to track your progress and add you to the leaderboard!
              </p>
              
              <input
                type="text"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Enter your name"
                className="w-full p-3 border-2 border-gray-300 rounded-lg mb-6 text-lg focus:border-emerald-500 focus:outline-none"
                autoFocus
                onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
              />
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowNameModal(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-3 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleNameSubmit}
                  disabled={!tempName.trim()}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:bg-gray-300 disabled:text-gray-500 text-white font-bold py-3 rounded-lg transition-colors"
                >
                  Start Learning!
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelpModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={(e) => e.target === e.currentTarget && setShowHelpModal(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[80vh] overflow-y-auto"
            >
              <h3 className="text-3xl font-bold text-gray-800 mb-6">How EcoQuest Works</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Play className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">Interactive Lessons</h4>
                    <p className="text-gray-600">
                      Each lesson has 5 steps with beautiful animations and explanations. 
                      Watch environmental processes come to life!
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <HelpCircle className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">Knowledge Check</h4>
                    <p className="text-gray-600">
                      Answer questions to test your understanding. Get it right on the first 
                      try for maximum points!
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Trophy className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">Earn Rewards</h4>
                    <p className="text-gray-600">
                      Collect eco-points, maintain streaks, and unlock badges. Complete 
                      lessons with 60%+ score to earn certificates!
                    </p>
                  </div>
                </div>

                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                  <h5 className="font-bold text-emerald-800 mb-2">Scoring System:</h5>
                  <ul className="text-sm text-emerald-700 space-y-1">
                    <li>• First try correct: <strong>10 points</strong></li>
                    <li>• Second try correct: <strong>5 points</strong></li>
                    <li>• Streak bonus (3+ in a row): <strong>+2 points</strong></li>
                    <li>• Three hearts per lesson - don't lose them all!</li>
                  </ul>
                </div>
              </div>

              <button
                onClick={() => setShowHelpModal(false)}
                className="w-full mt-6 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg transition-colors"
              >
                Got it, let's learn!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};