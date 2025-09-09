import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Star, Clock, Award } from 'lucide-react';
import { useGame } from '../contexts/GameContext';

const Quizzes = () => {
  const { state } = useGame();

  const quizCategories = [
    {
      id: 'climate',
      title: 'Climate Change',
      description: 'Test your knowledge about global warming and climate science',
      difficulty: 'Medium',
      questions: 10,
      time: '5 mins',
      points: 50,
      color: 'blue',
      emoji: '🌡️',
    },
    {
      id: 'water',
      title: 'Water Conservation',
      description: 'Learn about water cycles, pollution, and conservation',
      difficulty: 'Easy',
      questions: 8,
      time: '4 mins',
      points: 40,
      color: 'cyan',
      emoji: '💧',
    },
    {
      id: 'waste',
      title: 'Waste Management',
      description: 'Discover recycling, composting, and waste reduction',
      difficulty: 'Easy',
      questions: 8,
      time: '4 mins',
      points: 40,
      color: 'emerald',
      emoji: '♻️',
    },
    {
      id: 'energy',
      title: 'Renewable Energy',
      description: 'Explore solar, wind, and sustainable energy sources',
      difficulty: 'Hard',
      questions: 12,
      time: '6 mins',
      points: 60,
      color: 'yellow',
      emoji: '⚡',
    },
    {
      id: 'biodiversity',
      title: 'Biodiversity',
      description: 'Understanding ecosystems and species conservation',
      difficulty: 'Medium',
      questions: 10,
      time: '5 mins',
      points: 50,
      color: 'green',
      emoji: '🌿',
    },
    {
      id: 'general',
      title: 'Environmental Quiz',
      description: 'Mixed questions covering all environmental topics',
      difficulty: 'Mixed',
      questions: 15,
      time: '8 mins',
      points: 75,
      color: 'purple',
      emoji: '🌍',
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'green';
      case 'Medium': return 'yellow';
      case 'Hard': return 'red';
      default: return 'purple';
    }
  };

  const getCompletedScore = (categoryId: string) => {
    return state.user.quizScores[categoryId] || 0;
  };

  const hasCompleted = (categoryId: string) => {
    return state.user.quizScores[categoryId] !== undefined;
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Environmental Quizzes
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Test your environmental knowledge and earn eco-points! Choose from different topics and difficulty levels.
          </p>
        </motion.div>

        {/* User Progress */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Progress</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <Brain className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-600">
                {Object.keys(state.user.quizScores).length}
              </div>
              <div className="text-blue-700">Quizzes Completed</div>
            </div>
            
            <div className="text-center p-4 bg-emerald-50 rounded-xl">
              <Star className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-emerald-600">
                {Object.values(state.user.quizScores).reduce((sum, score) => sum + score, 0)}
              </div>
              <div className="text-emerald-700">Total Points</div>
            </div>
            
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-600">
                {Object.values(state.user.quizScores).length > 0 
                  ? Math.round(Object.values(state.user.quizScores).reduce((sum, score) => sum + score, 0) / Object.keys(state.user.quizScores).length)
                  : 0}
              </div>
              <div className="text-purple-700">Average Score</div>
            </div>
            
            <div className="text-center p-4 bg-orange-50 rounded-xl">
              <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-600">
                {Math.round((Object.keys(state.user.quizScores).length / quizCategories.length) * 100)}%
              </div>
              <div className="text-orange-700">Completion Rate</div>
            </div>
          </div>
        </motion.div>

        {/* Quiz Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {quizCategories.map((quiz, index) => {
            const completed = hasCompleted(quiz.id);
            const score = getCompletedScore(quiz.id);
            
            return (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden"
              >
                <div className={`h-32 bg-gradient-to-br from-${quiz.color}-400 to-${quiz.color}-600 flex items-center justify-center relative`}>
                  <div className="text-6xl">{quiz.emoji}</div>
                  {completed && (
                    <div className="absolute top-4 right-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2">
                      <Star className="w-6 h-6 text-white fill-current" />
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-800">
                      {quiz.title}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full bg-${getDifficultyColor(quiz.difficulty)}-100 text-${getDifficultyColor(quiz.difficulty)}-700 font-medium`}>
                      {quiz.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-gray-600 mb-4 text-sm">
                    {quiz.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span>{quiz.questions} questions</span>
                      <span>{quiz.time}</span>
                    </div>
                    <div className="flex items-center space-x-1 text-emerald-600">
                      <span className="font-semibold">+{quiz.points}</span>
                      <span>🌱</span>
                    </div>
                  </div>
                  
                  {completed && (
                    <div className="mb-4 p-3 bg-emerald-50 rounded-lg">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-emerald-700">Best Score:</span>
                        <span className="font-bold text-emerald-600">{score} points</span>
                      </div>
                    </div>
                  )}
                  
                  <Link to={`/quiz/${quiz.id}`}>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 px-4 rounded-xl font-semibold transition-colors ${
                        completed
                          ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                          : `bg-${quiz.color}-500 text-white hover:bg-${quiz.color}-600`
                      }`}
                    >
                      {completed ? 'Retake Quiz' : 'Start Quiz'}
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Motivation Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Challenge Yourself!</h2>
          <p className="text-xl mb-6 opacity-90">
            Complete all quizzes to earn the "Knowledge Master" badge and unlock special achievements!
          </p>
          <div className="flex justify-center">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-6 py-3">
              <span className="font-bold">
                {Object.keys(state.user.quizScores).length} / {quizCategories.length} Completed
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Quizzes;