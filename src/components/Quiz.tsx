import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useGame } from '../contexts/GameContext';

interface Question {
  id: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const quizQuestions: { [key: string]: Question[] } = {
  climate: [
    {
      id: 'c1',
      question: 'What is the main cause of climate change?',
      options: ['Natural weather patterns', 'Solar flares', 'Greenhouse gas emissions', 'Ocean currents'],
      correct: 2,
      explanation: 'Greenhouse gas emissions from human activities are the primary driver of climate change.'
    },
    {
      id: 'c2',
      question: 'Which gas contributes most to global warming?',
      options: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Hydrogen'],
      correct: 1,
      explanation: 'Carbon dioxide (CO₂) is the most significant greenhouse gas contributing to global warming.'
    },
    // Add more climate questions...
  ],
  water: [
    {
      id: 'w1',
      question: 'What percentage of Earth\'s water is fresh water?',
      options: ['Less than 3%', '25%', '50%', '75%'],
      correct: 0,
      explanation: 'Less than 3% of Earth\'s water is fresh water, making it a precious resource.'
    },
    {
      id: 'w2',
      question: 'Which activity uses the most water globally?',
      options: ['Industry', 'Domestic use', 'Agriculture', 'Energy production'],
      correct: 2,
      explanation: 'Agriculture uses about 70% of the world\'s fresh water supply.'
    },
    // Add more water questions...
  ],
  // Add more categories...
};

const Quiz = () => {
  const { category } = useParams<{ category: string }>();
  const navigate = useNavigate();
  const { dispatch } = useGame();
  
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ show: boolean; correct: boolean; explanation: string }>({
    show: false,
    correct: false,
    explanation: '',
  });

  useEffect(() => {
    if (category && quizQuestions[category]) {
      setQuestions(quizQuestions[category]);
    }
  }, [category]);

  useEffect(() => {
    if (timeLeft > 0 && !quizCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !quizCompleted) {
      completeQuiz();
    }
  }, [timeLeft, quizCompleted]);

  const handleAnswer = (answerIndex: number) => {
    if (selectedAnswer !== null || feedback.show) return;
    
    setSelectedAnswer(answerIndex);
    const isCorrect = answerIndex === questions[currentQuestion].correct;
    
    if (isCorrect) {
      setScore(score + 10);
    }
    
    setFeedback({
      show: true,
      correct: isCorrect,
      explanation: questions[currentQuestion].explanation,
    });

    setTimeout(() => {
      setFeedback({ show: false, correct: false, explanation: '' });
      setSelectedAnswer(null);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        completeQuiz();
      }
    }, 3000);
  };

  const completeQuiz = () => {
    setQuizCompleted(true);
    const finalScore = score + (selectedAnswer === questions[currentQuestion]?.correct ? 10 : 0);
    dispatch({ type: 'ADD_ECO_POINTS', payload: finalScore });
    dispatch({ type: 'COMPLETE_QUIZ', payload: { category: category!, score: finalScore } });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!category || !questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Quiz not found</h2>
          <button
            onClick={() => navigate('/quizzes')}
            className="bg-emerald-500 text-white px-6 py-3 rounded-xl"
          >
            Back to Quizzes
          </button>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    const percentage = Math.round((score / (questions.length * 10)) * 100);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center"
          >
            <div className="text-6xl mb-4">
              {percentage >= 80 ? '🏆' : percentage >= 60 ? '🥈' : '🥉'}
            </div>
            
            <h2 className="text-3xl font-bold text-gray-800 mb-4">
              Quiz Completed!
            </h2>
            
            <div className="mb-6">
              <div className="text-4xl font-bold text-emerald-600 mb-2">
                {score} / {questions.length * 10}
              </div>
              <div className="text-lg text-gray-600">
                {percentage}% Correct
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="text-lg font-bold text-blue-600">
                  {Math.floor(score / 10)}
                </div>
                <div className="text-sm text-blue-700">Correct</div>
              </div>
              <div className="p-3 bg-red-50 rounded-lg">
                <div className="text-lg font-bold text-red-600">
                  {questions.length - Math.floor(score / 10)}
                </div>
                <div className="text-sm text-red-700">Incorrect</div>
              </div>
              <div className="p-3 bg-emerald-50 rounded-lg">
                <div className="text-lg font-bold text-emerald-600">
                  +{score}
                </div>
                <div className="text-sm text-emerald-700">Eco Points</div>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => window.location.reload()}
                className="bg-emerald-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-600 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate('/quizzes')}
                className="bg-white text-emerald-600 border-2 border-emerald-500 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors"
              >
                More Quizzes
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-blue-50 py-4">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/quizzes')}
            className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Quizzes</span>
          </button>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-md">
              <Clock className="w-5 h-5 text-gray-600" />
              <span className="font-bold text-gray-800">{formatTime(timeLeft)}</span>
            </div>
            <div className="bg-white rounded-full px-4 py-2 shadow-md">
              <span className="text-emerald-600 font-bold">Score: {score}</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">Progress</span>
            <span className="text-sm font-medium text-gray-600">
              {currentQuestion + 1} / {questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
            />
          </div>
        </div>

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {currentQ.question}
            </h2>
            
            <div className="space-y-3">
              {currentQ.options.map((option, index) => {
                let buttonClass = "w-full p-4 rounded-xl text-left transition-all border-2 ";
                
                if (feedback.show) {
                  if (index === currentQ.correct) {
                    buttonClass += "bg-emerald-100 border-emerald-500 text-emerald-800";
                  } else if (index === selectedAnswer && selectedAnswer !== currentQ.correct) {
                    buttonClass += "bg-red-100 border-red-500 text-red-800";
                  } else {
                    buttonClass += "bg-gray-50 border-gray-200 text-gray-600";
                  }
                } else if (selectedAnswer === index) {
                  buttonClass += "bg-blue-100 border-blue-500 text-blue-800";
                } else {
                  buttonClass += "bg-gray-50 border-transparent hover:bg-gray-100 hover:border-gray-300";
                }
                
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={feedback.show}
                    className={buttonClass}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-8 h-8 bg-white rounded-full flex items-center justify-center font-bold text-sm">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="font-medium">{option}</span>
                      {feedback.show && index === currentQ.correct && (
                        <CheckCircle className="w-5 h-5 text-emerald-600 ml-auto" />
                      )}
                      {feedback.show && index === selectedAnswer && selectedAnswer !== currentQ.correct && (
                        <XCircle className="w-5 h-5 text-red-600 ml-auto" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
            
            {/* Feedback */}
            <AnimatePresence>
              {feedback.show && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-6 p-4 rounded-xl ${
                    feedback.correct ? 'bg-emerald-50 border border-emerald-200' : 'bg-red-50 border border-red-200'
                  }`}
                >
                  <div className={`flex items-center space-x-2 mb-2 ${
                    feedback.correct ? 'text-emerald-700' : 'text-red-700'
                  }`}>
                    {feedback.correct ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                    <span className="font-bold">
                      {feedback.correct ? 'Correct!' : 'Incorrect'}
                    </span>
                  </div>
                  <p className={feedback.correct ? 'text-emerald-600' : 'text-red-600'}>
                    {feedback.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Quiz;