import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Medal, Award, ArrowLeft, Calendar, User } from 'lucide-react';
import { useGameStore } from '../store/gameStore';

export const Leaderboard: React.FC = () => {
  const { leaderboard } = useGameStore();

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 1:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 2:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-gray-500 font-bold">{index + 1}</span>;
    }
  };

  const getLessonName = (lessonId: string) => {
    switch (lessonId) {
      case 'water-cycle':
        return 'Water Cycle Adventure';
      case 'nitrogen-cycle':
        return 'Nitrogen Cycle Explorer';
      default:
        return lessonId;
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-green-100 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                EcoQuest Leaderboard
              </h1>
              <Trophy className="w-8 h-8 text-yellow-500" />
            </div>
            <p className="text-gray-600">
              Top eco-warriors and their achievements
            </p>
          </motion.div>

          <div className="w-20" /> {/* Spacer for centering */}
        </div>

        {/* Leaderboard */}
        <div className="max-w-4xl mx-auto">
          {leaderboard.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <div className="text-8xl mb-6">🌱</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                No entries yet!
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Be the first to complete a lesson and earn your spot on the leaderboard!
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                Start Learning Now
              </Link>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {leaderboard.map((entry, index) => (
                <motion.div
                  key={`${entry.playerName}-${entry.lessonId}-${entry.completedAt}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-all duration-200 hover:shadow-xl ${
                    index === 0
                      ? 'border-yellow-300 bg-gradient-to-r from-yellow-50 to-orange-50'
                      : index === 1
                      ? 'border-gray-300 bg-gradient-to-r from-gray-50 to-blue-50'
                      : index === 2
                      ? 'border-amber-300 bg-gradient-to-r from-amber-50 to-yellow-50'
                      : 'border-gray-200'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      {/* Rank and Player Info */}
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                          {getRankIcon(index)}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <User className="w-4 h-4 text-gray-500" />
                            <h3 className="text-xl font-bold text-gray-800">
                              {entry.playerName}
                            </h3>
                          </div>
                          
                          <p className="text-gray-600 font-medium mb-1">
                            {getLessonName(entry.lessonId)}
                          </p>
                          
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(entry.completedAt)}
                            </span>
                            {entry.badge && (
                              <span className="flex items-center gap-1 text-yellow-600">
                                🏆 {entry.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Score */}
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-800 mb-1">
                          {entry.score}
                        </div>
                        <div className="text-sm text-gray-500">
                          {entry.ecoPoints} eco-points
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Call to Action */}
          {leaderboard.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-12"
            >
              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Think you can do better?
                </h3>
                <p className="text-gray-600 mb-6">
                  Challenge yourself and climb up the leaderboard!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/lesson/water-cycle"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                  >
                    Try Water Cycle
                  </Link>
                  <Link
                    to="/lesson/nitrogen-cycle"
                    className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
                  >
                    Try Nitrogen Cycle
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};