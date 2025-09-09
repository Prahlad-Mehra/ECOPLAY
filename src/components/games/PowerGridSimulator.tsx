import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, RotateCcw, Zap, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';
import { useGame } from '../../contexts/GameContext';

interface PowerSource {
  id: string;
  name: string;
  capacity: number;
  cost: number;
  emissions: number;
  renewable: boolean;
  emoji: string;
  active: boolean;
}

interface GameStats {
  demand: number;
  supply: number;
  cost: number;
  emissions: number;
  stability: number;
  score: number;
  level: number;
}

const powerSources: PowerSource[] = [
  { id: 'solar', name: 'Solar Panel', capacity: 20, cost: 15, emissions: 0, renewable: true, emoji: '☀️', active: false },
  { id: 'wind', name: 'Wind Turbine', capacity: 25, cost: 20, emissions: 0, renewable: true, emoji: '💨', active: false },
  { id: 'hydro', name: 'Hydroelectric', capacity: 40, cost: 30, emissions: 5, renewable: true, emoji: '💧', active: false },
  { id: 'coal', name: 'Coal Plant', capacity: 60, cost: 25, emissions: 80, renewable: false, emoji: '🏭', active: false },
  { id: 'gas', name: 'Natural Gas', capacity: 45, cost: 20, emissions: 40, renewable: false, emoji: '🔥', active: false },
  { id: 'nuclear', name: 'Nuclear Plant', capacity: 80, cost: 50, emissions: 10, renewable: false, emoji: '⚛️', active: false },
];

const PowerGridSimulator = () => {
  const navigate = useNavigate();
  const { dispatch } = useGame();
  const [sources, setSources] = useState<PowerSource[]>(powerSources);
  const [gameStats, setGameStats] = useState<GameStats>({
    demand: 100,
    supply: 0,
    cost: 0,
    emissions: 0,
    stability: 100,
    score: 0,
    level: 1,
  });
  const [gameTime, setGameTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isRunning && !gameOver) {
      const timer = setInterval(() => {
        setGameTime(prev => prev + 1);
        updateDemand();
        calculateStats();
        checkGameStatus();
      }, 2000);

      return () => clearInterval(timer);
    }
  }, [isRunning, gameOver, sources]);

  const updateDemand = () => {
    setGameStats(prev => ({
      ...prev,
      demand: Math.max(50, prev.demand + (Math.random() - 0.5) * 20),
    }));
  };

  const calculateStats = () => {
    const activeSources = sources.filter(s => s.active);
    const totalSupply = activeSources.reduce((sum, s) => sum + s.capacity, 0);
    const totalCost = activeSources.reduce((sum, s) => sum + s.cost, 0);
    const totalEmissions = activeSources.reduce((sum, s) => sum + s.emissions, 0);
    
    const supplyDemandRatio = totalSupply / gameStats.demand;
    const stability = Math.min(100, Math.max(0, supplyDemandRatio * 100));
    
    let scoreChange = 0;
    if (stability > 80) scoreChange += 10;
    if (totalEmissions < 50) scoreChange += 5;
    if (supplyDemandRatio > 0.9 && supplyDemandRatio < 1.1) scoreChange += 5;

    setGameStats(prev => ({
      ...prev,
      supply: totalSupply,
      cost: totalCost,
      emissions: totalEmissions,
      stability,
      score: prev.score + scoreChange,
    }));
  };

  const checkGameStatus = () => {
    if (gameStats.stability < 20) {
      setGameOver(true);
      setMessage('Grid collapsed! The power went out.');
    } else if (gameTime >= 60 && gameStats.score > 200) {
      setGameOver(true);
      setMessage('Congratulations! You successfully managed the power grid!');
      dispatch({ type: 'ADD_ECO_POINTS', payload: 75 });
      dispatch({ type: 'COMPLETE_LESSON', payload: 'power-grid' });
    }
  };

  const togglePowerSource = (id: string) => {
    setSources(sources.map(source => 
      source.id === id ? { ...source, active: !source.active } : source
    ));
  };

  const resetGame = () => {
    setSources(powerSources.map(s => ({ ...s, active: false })));
    setGameStats({
      demand: 100,
      supply: 0,
      cost: 0,
      emissions: 0,
      stability: 100,
      score: 0,
      level: 1,
    });
    setGameTime(0);
    setIsRunning(false);
    setGameOver(false);
    setMessage('');
  };

  const getStabilityColor = () => {
    if (gameStats.stability > 70) return 'emerald';
    if (gameStats.stability > 40) return 'yellow';
    return 'red';
  };

  if (gameOver) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 py-4">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="text-8xl mb-4">⚡</div>
            <h2 className="text-4xl font-bold text-yellow-600 mb-4">
              {gameStats.score > 200 ? 'Grid Master!' : 'Game Over'}
            </h2>
            <p className="text-xl text-gray-600 mb-6">
              {message} Final Score: {gameStats.score}
            </p>
            
            <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Final Stats:</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-xl font-bold text-blue-600">{Math.round(gameStats.supply)}</div>
                  <div className="text-sm text-blue-700">Supply (MW)</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-xl font-bold text-green-600">{Math.round(gameStats.emissions)}</div>
                  <div className="text-sm text-green-700">Emissions</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <div className="text-xl font-bold text-purple-600">${gameStats.cost}</div>
                  <div className="text-sm text-purple-700">Cost</div>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <div className="text-xl font-bold text-orange-600">{Math.round(gameStats.stability)}%</div>
                  <div className="text-sm text-orange-700">Stability</div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={resetGame}
                className="bg-yellow-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-yellow-600 transition-colors"
              >
                Play Again
              </button>
              <button
                onClick={() => navigate('/interactive')}
                className="bg-white text-yellow-600 border-2 border-yellow-500 px-6 py-3 rounded-xl font-semibold hover:bg-yellow-50 transition-colors"
              >
                More Lessons
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-orange-50 py-4">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/interactive')}
            className="flex items-center space-x-2 text-gray-600 hover:text-yellow-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Lessons</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="bg-white rounded-full px-4 py-2 shadow-md">
              <span className="text-yellow-600 font-bold">Score: {gameStats.score}</span>
            </div>
            <div className="bg-white rounded-full px-4 py-2 shadow-md">
              <span className="text-gray-600">Time: {gameTime}s</span>
            </div>
            <button
              onClick={resetGame}
              className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
            >
              <RotateCcw className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            ⚡ Power Grid Simulator
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            Balance energy supply and demand while minimizing emissions!
          </p>
          
          {!isRunning && (
            <button
              onClick={() => setIsRunning(true)}
              className="bg-yellow-500 text-white px-8 py-3 rounded-xl font-semibold hover:bg-yellow-600 transition-colors"
            >
              Start Simulation
            </button>
          )}
        </motion.div>

        {isRunning && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stats Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Grid Status</h2>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-600">Demand</span>
                      <span className="text-sm font-bold text-gray-800">{Math.round(gameStats.demand)} MW</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(gameStats.demand / 200) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-600">Supply</span>
                      <span className="text-sm font-bold text-gray-800">{Math.round(gameStats.supply)} MW</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${(gameStats.supply / 200) * 100}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-gray-600">Stability</span>
                      <span className={`text-sm font-bold text-${getStabilityColor()}-600`}>
                        {Math.round(gameStats.stability)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-${getStabilityColor()}-500 h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${gameStats.stability}%` }}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-3 bg-red-50 rounded-lg">
                    <div className="text-lg font-bold text-red-600">{Math.round(gameStats.emissions)}</div>
                    <div className="text-xs text-red-700">Emissions</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">${gameStats.cost}</div>
                    <div className="text-xs text-green-700">Cost/hour</div>
                  </div>
                </div>
                
                {gameStats.stability < 50 && (
                  <div className="flex items-center space-x-2 mt-4 p-3 bg-red-100 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                    <span className="text-sm text-red-700 font-medium">
                      Grid becoming unstable!
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Power Sources */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Power Sources</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sources.map((source) => (
                    <motion.div
                      key={source.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => togglePowerSource(source.id)}
                      className={`p-4 rounded-xl cursor-pointer transition-all border-2 ${
                        source.active
                          ? 'bg-emerald-50 border-emerald-500'
                          : 'bg-gray-50 border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">{source.emoji}</span>
                          <span className="font-medium text-gray-800">{source.name}</span>
                        </div>
                        {source.renewable && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            Renewable
                          </span>
                        )}
                      </div>
                      
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex justify-between">
                          <span>Capacity:</span>
                          <span className="font-medium">{source.capacity} MW</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Cost:</span>
                          <span className="font-medium">${source.cost}/hr</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Emissions:</span>
                          <span className="font-medium">{source.emissions} CO²</span>
                        </div>
                      </div>
                      
                      <div className="mt-3">
                        <div className={`w-full h-2 rounded-full ${
                          source.active ? 'bg-emerald-500' : 'bg-gray-300'
                        }`} />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PowerGridSimulator;