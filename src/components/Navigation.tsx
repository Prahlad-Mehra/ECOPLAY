import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Home, 
  BookOpen, 
  Brain, 
  Gamepad2, 
  Users, 
  Trophy,
  Menu,
  X,
  Globe
} from 'lucide-react';
import { useGame } from '../contexts/GameContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { state, dispatch } = useGame();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/learning', icon: BookOpen, label: 'Learning' },
    { path: '/quizzes', icon: Brain, label: 'Quizzes' },
    { path: '/interactive', icon: Gamepad2, label: 'Games' },
    { path: '/teacher', icon: Users, label: 'Teacher' },
    { path: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
  ];

  return (
    <>
      {/* Mobile Navigation */}
      <nav className="bg-white shadow-lg lg:hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">E</span>
              </div>
              <span className="font-bold text-xl text-gray-800">EcoPlay</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-emerald-100 rounded-full px-3 py-1">
                <span className="text-emerald-600 text-sm font-semibold">
                  {state.user.ecoPoints}
                </span>
                <span className="text-emerald-500">🌱</span>
              </div>
              
              <button
                onClick={() => dispatch({ type: 'TOGGLE_LANGUAGE' })}
                className="p-2 text-gray-600 hover:text-emerald-600 transition-colors"
              >
                <Globe className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-600 hover:text-emerald-600 transition-colors"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0 }}
          className="overflow-hidden bg-white border-t border-gray-200"
        >
          <div className="px-4 py-2 space-y-1">
            {navItems.map(({ path, icon: Icon, label }) => {
              const isActive = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{label}</span>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </nav>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">E</span>
              </div>
              <span className="font-bold text-2xl text-gray-800">EcoPlay</span>
            </Link>
            
            <div className="flex items-center space-x-8">
              {navItems.map(({ path, icon: Icon, label }) => {
                const isActive = location.pathname === path;
                return (
                  <Link
                    key={path}
                    to={path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{label}</span>
                  </Link>
                );
              })}
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-emerald-100 rounded-full px-4 py-2">
                <span className="text-emerald-600 font-semibold">
                  {state.user.ecoPoints}
                </span>
                <span className="text-emerald-500">🌱</span>
              </div>
              
              <div className="flex items-center space-x-2 bg-blue-100 rounded-full px-4 py-2">
                <span className="text-blue-600 font-semibold">
                  Level {state.user.level}
                </span>
                <span className="text-blue-500">⭐</span>
              </div>
              
              <button
                onClick={() => dispatch({ type: 'TOGGLE_LANGUAGE' })}
                className="p-2 text-gray-600 hover:text-emerald-600 transition-colors rounded-lg"
              >
                <Globe className="w-5 h-5" />
                <span className="ml-1 text-sm">{state.language.toUpperCase()}</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;