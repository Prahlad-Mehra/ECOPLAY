import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Award, Users, Globe } from 'lucide-react';
import { useGame } from '../contexts/GameContext';

const Home = () => {
  const { state } = useGame();

  const features = [
    {
      icon: Play,
      title: 'Interactive Learning',
      description: 'Engage with fun games and activities',
      color: 'emerald',
    },
    {
      icon: Award,
      title: 'Earn Badges',
      description: 'Collect achievements as you learn',
      color: 'blue',
    },
    {
      icon: Users,
      title: 'Compete & Collaborate',
      description: 'Join the global eco-learning community',
      color: 'purple',
    },
    {
      icon: Globe,
      title: 'Real Impact',
      description: 'Learn actions that help our planet',
      color: 'green',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0] 
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="inline-block text-8xl mb-6"
          >
            🌍
          </motion.div>
          
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-800 mb-6">
            Welcome to{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
              EcoPlay
            </span>
          </h1>
          
          <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Learn about our planet through fun, interactive games and challenges. 
            Become an eco-hero while earning points and badges!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/interactive">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-2"
              >
                <Play className="w-6 h-6" />
                <span>Start Learning</span>
              </motion.button>
            </Link>
            
            {state.user.ecoPoints > 0 && (
              <Link to="/leaderboard">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-emerald-600 border-2 border-emerald-500 px-8 py-4 rounded-full text-xl font-semibold hover:bg-emerald-50 transition-colors flex items-center space-x-2"
                >
                  <Award className="w-6 h-6" />
                  <span>View Progress</span>
                </motion.button>
              </Link>
            )}
          </div>
        </motion.div>
      </section>

      {/* User Stats */}
      {state.user.ecoPoints > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="px-4 py-8"
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Welcome back, {state.user.name}!
              </h2>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-emerald-50 rounded-xl">
                  <div className="text-3xl font-bold text-emerald-600">
                    {state.user.ecoPoints}
                  </div>
                  <div className="text-emerald-700 font-medium">Eco Points</div>
                </div>
                
                <div className="text-center p-4 bg-blue-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600">
                    {state.user.level}
                  </div>
                  <div className="text-blue-700 font-medium">Level</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-xl">
                  <div className="text-3xl font-bold text-purple-600">
                    {state.user.badges.filter(b => b.earned).length}
                  </div>
                  <div className="text-purple-700 font-medium">Badges</div>
                </div>
                
                <div className="text-center p-4 bg-orange-50 rounded-xl">
                  <div className="text-3xl font-bold text-orange-600">
                    {state.user.completedLessons.length}
                  </div>
                  <div className="text-orange-700 font-medium">Lessons</div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      )}

      {/* Features Section */}
      <section className="px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose EcoPlay?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our platform makes environmental education fun and engaging for learners of all ages.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
              >
                <div className={`w-16 h-16 bg-${feature.color}-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <feature.icon className={`w-8 h-8 text-${feature.color}-600`} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="px-4 py-16 bg-gradient-to-r from-emerald-600 to-blue-600 text-white"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Become an Eco-Hero?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of learners making a difference for our planet!
          </p>
          <Link to="/learning">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-emerald-600 px-8 py-4 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Start Your Journey
            </motion.button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;