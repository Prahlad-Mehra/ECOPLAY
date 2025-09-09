import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { lessons } from '../data/lessons';
import { useGameStore } from '../store/gameStore';
import { WaterCycleAnimation } from '../components/animations/WaterCycleAnimation';
import { NitrogenCycleAnimation } from '../components/animations/NitrogenCycleAnimation';
import { LayerToggle } from '../components/ui/LayerToggle';
import { GameHUD } from '../components/ui/GameHUD';
import { QuizQuestion } from '../components/quiz/QuizQuestion';

export const LessonPage: React.FC = () => {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  const {
    playerName,
    playerState,
    startLesson,
    answerQuestion,
    nextStep,
    completeLesson
  } = useGameStore();

  const lesson = lessons.find(l => l.id === lessonId);
  const [visibleLayers, setVisibleLayers] = useState<string[]>([]);
  const [questionAnswered, setQuestionAnswered] = useState(false);

  useEffect(() => {
    if (!lesson) {
      navigate('/');
      return;
    }

    startLesson(lessonId!);
  }, [lessonId, lesson, navigate, startLesson]);

  useEffect(() => {
    if (lesson && playerState.currentStep < lesson.steps.length) {
      const currentStepData = lesson.steps[playerState.currentStep];
      setVisibleLayers(currentStepData.visibleLayers);
      setQuestionAnswered(false);
    }
  }, [playerState.currentStep, lesson]);

  if (!lesson) {
    return <div>Loading...</div>;
  }

  const currentStepData = lesson.steps[playerState.currentStep];
  const isLastStep = playerState.currentStep >= lesson.steps.length - 1;

  const handleLayerToggle = (layerId: string) => {
    setVisibleLayers(prev =>
      prev.includes(layerId)
        ? prev.filter(id => id !== layerId)
        : [...prev, layerId]
    );
  };

  const handleQuestionAnswer = (isCorrect: boolean, attempts: number) => {
    answerQuestion(currentStepData.id, isCorrect, attempts);
    setQuestionAnswered(true);
  };

  const handleNext = () => {
    if (isLastStep) {
      // Calculate final score and check for badge
      const scorePercentage = (playerState.score / (lesson.steps.length * 10)) * 100;
      const earnedBadge = scorePercentage >= 60 ? lesson.badge : undefined;
      
      completeLesson(earnedBadge);
      navigate('/leaderboard');
    } else {
      nextStep();
    }
  };

  const renderAnimation = () => {
    if (lessonId === 'water-cycle') {
      return (
        <WaterCycleAnimation
          currentStep={currentStepData.id}
          visibleLayers={visibleLayers}
          animationCues={currentStepData.animationCues}
        />
      );
    } else if (lessonId === 'nitrogen-cycle') {
      return (
        <NitrogenCycleAnimation
          currentStep={currentStepData.id}
          visibleLayers={visibleLayers}
          animationCues={currentStepData.animationCues}
        />
      );
    }
    return null;
  };

  if (playerState.hearts <= 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-100 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-2xl"
        >
          <div className="text-6xl mb-4">💔</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Out of Lives!</h2>
          <p className="text-gray-600 mb-6">
            Don't worry! Learning takes practice. You can try the lesson again to improve your score.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/')}
              className="flex-1 bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => window.location.reload()}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors"
            >
              Try Again
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-green-100">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>

          <h1 className="text-2xl font-bold text-gray-800 text-center">
            {lesson.title}
          </h1>

          <div className="w-20" /> {/* Spacer for centering */}
        </div>

        {/* Game HUD */}
        <div className="mb-6">
          <GameHUD
            score={playerState.score}
            ecoPoints={playerState.ecoPoints}
            streak={playerState.streak}
            hearts={playerState.hearts}
            currentStep={playerState.currentStep + 1}
            totalSteps={lesson.steps.length}
          />
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Animation and Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step Title and Explanation */}
            <motion.div
              key={currentStepData.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Step {playerState.currentStep + 1}: {currentStepData.title}
              </h2>
              <p className="text-gray-700 leading-relaxed text-lg">
                {currentStepData.explainer}
              </p>
            </motion.div>

            {/* Animation */}
            <motion.div
              key={`animation-${currentStepData.id}`}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-4 shadow-lg border border-gray-100"
            >
              {renderAnimation()}
            </motion.div>

            {/* Layer Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
            >
              <h3 className="text-lg font-bold text-gray-800 mb-4">
                Toggle Environmental Layers
              </h3>
              <div className="flex flex-wrap gap-3">
                {lesson.availableLayers.map(layer => (
                  <LayerToggle
                    key={layer.id}
                    layerId={layer.id}
                    layerName={layer.name}
                    isVisible={visibleLayers.includes(layer.id)}
                    onToggle={handleLayerToggle}
                  />
                ))}
              </div>
            </motion.div>
          </div>

          {/* Question Panel */}
          <div className="space-y-6">
            <motion.div
              key={`question-${currentStepData.id}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <QuizQuestion
                mcq={currentStepData.mcq}
                onAnswer={handleQuestionAnswer}
                disabled={questionAnswered}
              />
            </motion.div>

            {/* Navigation */}
            <AnimatePresence>
              {questionAnswered && (
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
                >
                  {isLastStep ? (
                    <>
                      <Home className="w-5 h-5" />
                      Complete Lesson
                    </>
                  ) : (
                    <>
                      Next Step
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};