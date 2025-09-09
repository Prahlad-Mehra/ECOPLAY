import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star, TrendingUp } from 'lucide-react';
import { useGame } from '../contexts/GameContext';

const Leaderboard = () => {
  const { state } = useGame();

  // Mock leaderboard data for demo
  const leaderboardData = [
    { rank: 1, name: 'EcoChampion', points: 1250, badges: 12, level: 8 },
    { rank: 2, name: 'GreenWarrior', points: 1180, badges: 10, level: 7 },
    { rank: 3, name: 'EarthSaver', points: 1050, badges: 9, level: 6 },
    { rank: 4, name: state.user.name, points: state.user.ecoPoints, badges: state.user.badges.filter(b => b.earned).length, level: state.user.level },
    { rank: 5, name: 'NatureLover', points: 850, badges: 7, level: 5 },
    { rank: 6, name: 'ClimateHero', points: 780, badges: 6, level: 4 },
    { rank: 7, name: 'WaterGuard', points: 650, badges: 5, level: 4 },
    { rank: 8, name: 'RecycleKing', points: 520, badges: 4, level: 3 },
  ].sort((a, b) => b.points - a.points).map((player, index) => ({ ...player, rank: index + 1 }));

  const userRank = leaderboardData.find(player => player.name === state.user.name)?.rank || 4;

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return { icon: Trophy, color: 'text-yellow-500', bg: 'bg-yellow-50' };
      case 2: return { icon: Medal, color: 'text-gray-400', bg: 'bg-gray-50' };
      case 3: return { icon: Medal, color: 'text-amber-600', bg: 'bg-amber-50' };
      default: return { icon: Star, color: 'text-blue-500', bg: 'bg-blue-50' };
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            🏆 Leaderboard
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See how you rank against other eco-learners around the world!
          </p>
        </motion.div>

        {/* User's Current Rank */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-r from-emerald-500 to-blue-500 rounded-2xl p-6 text-white mb-8"
        >
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Your Current Rank</h2>
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">#{userRank}</div>
                <div className="text-white opacity-90">Global Rank</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{state.user.ecoPoints}</div>
                <div className="text-white opacity-90">Eco Points</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">{state.user.level}</div>
                <div className="text-white opacity-90">Level</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Top Performers</h2>
          <div className="flex justify-center items-end space-x-4">
            {/* 2nd Place */}
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gray-100 rounded-xl p-4 mb-4 h-32 flex flex-col justify-end"
              >
                <Medal className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <div className="font-bold text-gray-800">{leaderboardData[1]?.name}</div>
                <div className="text-sm text-gray-600">{leaderboardData[1]?.points} points</div>
              </motion.div>
              <div className="text-2xl font-bold text-gray-400">#2</div>
            </div>

            {/* 1st Place */}
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-t from-yellow-200 to-yellow-100 rounded-xl p-4 mb-4 h-40 flex flex-col justify-end"
              >
                <Trophy className="w-10 h-10 text-yellow-500 mx-auto mb-2" />
                <div className="font-bold text-gray-800">{leaderboardData[0]?.name}</div>
                <div className="text-sm text-gray-600">{leaderboardData[0]?.points} points</div>
              </motion.div>
              <div className="text-3xl font-bold text-yellow-500">#1</div>
            </div>

            {/* 3rd Place */}
            <div className="text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-amber-100 rounded-xl p-4 mb-4 h-28 flex flex-col justify-end"
              >
                <Medal className="w-8 h-8 text-amber-600 mx-auto mb-2" />
                <div className="font-bold text-gray-800">{leaderboardData[2]?.name}</div>
                <div className="text-sm text-gray-600">{leaderboardData[2]?.points} points</div>
              </motion.div>
              <div className="text-2xl font-bold text-amber-600">#3</div>
            </div>
          </div>
        </motion.div>

        {/* Full Leaderboard */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-6 bg-gradient-to-r from-emerald-50 to-blue-50">
            <h2 className="text-2xl font-bold text-gray-800">Global Rankings</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {leaderboardData.map((player, index) => {
              const rankIcon = getRankIcon(player.rank);
              const isCurrentUser = player.name === state.user.name;
              
              return (
                <motion.div
                  key={player.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`p-4 flex items-center space-x-4 hover:bg-gray-50 transition-colors ${
                    isCurrentUser ? 'bg-emerald-50 border-l-4 border-emerald-500' : ''
                  }`}
                >
                  <div className={`w-12 h-12 ${rankIcon.bg} rounded-full flex items-center justify-center`}>
                    <rankIcon.icon className={`w-6 h-6 ${rankIcon.color}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-gray-800">
                        #{player.rank}
                      </span>
                      <span className={`font-medium ${isCurrentUser ? 'text-emerald-700' : 'text-gray-700'}`}>
                        {player.name}
                        {isCurrentUser && (
                          <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full">
                            You
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="font-bold text-emerald-600">{player.points}</div>
                      <div className="text-xs text-gray-500">Points</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-blue-600">{player.badges}</div>
                      <div className="text-xs text-gray-500">Badges</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-purple-600">{player.level}</div>
                      <div className="text-xs text-gray-500">Level</div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Achievement Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-8 bg-white rounded-2xl shadow-lg p-6"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {state.user.badges.slice(0, 8).map((badge, index) => (
              <div
                key={badge.id}
                className={`p-4 rounded-xl text-center transition-all ${
                  badge.earned 
                    ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-200' 
                    : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                }`}
              >
                <div className="text-2xl mb-2">{badge.icon}</div>
                <div className="font-medium text-sm">{badge.name}</div>
                {badge.earned && (
                  <div className="text-xs mt-1 opacity-75">Earned!</div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;