import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, Star, Zap, Download, Home, RotateCcw } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { lessons } from '../data/lessons';

export const Results: React.FC = () => {
  const { playerName, playerState, currentSession } = useGameStore();

  if (!currentSession) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No session found</h2>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  const lesson = lessons.find(l => l.id === currentSession.lessonId);
  const totalPossibleScore = lesson ? lesson.steps.length * 10 : 50;
  const scorePercentage = Math.round((playerState.score / totalPossibleScore) * 100);
  const earnedBadge = scorePercentage >= 60 ? lesson?.badge : null;

  const getPerformanceMessage = () => {
    if (scorePercentage >= 90) return "Outstanding! You're a true eco-expert!";
    if (scorePercentage >= 75) return "Excellent work! You really understand this cycle!";
    if (scorePercentage >= 60) return "Great job! You've mastered the basics!";
    if (scorePercentage >= 40) return "Good effort! Keep learning to improve!";
    return "Keep trying! Every attempt makes you smarter!";
  };

  const generateCertificate = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#f0f9ff');
    gradient.addColorStop(1, '#ecfdf5');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Border
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 8;
    ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

    // Title
    ctx.fillStyle = '#065f46';
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('EcoQuest Certificate', canvas.width / 2, 100);

    // Subtitle
    ctx.font = '24px Arial';
    ctx.fillText('of Achievement', canvas.width / 2, 140);

    // Player name
    ctx.fillStyle = '#1f2937';
    ctx.font = 'bold 32px Arial';
    ctx.fillText(playerName, canvas.width / 2, 220);

    // Achievement text
    ctx.font = '20px Arial';
    ctx.fillText('has successfully completed the', canvas.width / 2, 260);

    // Lesson title
    ctx.fillStyle = '#059669';
    ctx.font = 'bold 28px Arial';
    ctx.fillText(lesson?.title || '', canvas.width / 2, 300);

    // Score
    ctx.fillStyle = '#1f2937';
    ctx.font = '24px Arial';
    ctx.fillText(`with a score of ${playerState.score} points (${scorePercentage}%)`, canvas.width / 2, 350);

    // Badge
    if (earnedBadge) {
      ctx.fillStyle = '#d97706';
      ctx.font = 'bold 20px Arial';
      ctx.fillText(`🏆 ${earnedBadge} 🏆`, canvas.width / 2, 400);
    }

    // Date
    ctx.fillStyle = '#6b7280';
    ctx.font = '16px Arial';
    const today = new Date().toLocaleDateString();
    ctx.fillText(`Completed on ${today}`, canvas.width / 2, 480);

    // EcoQuest signature
    ctx.fillStyle = '#059669';
    ctx.font = 'italic 18px Arial';
    ctx.fillText('EcoQuest - Learning for our Planet', canvas.width / 2, 520);

    // Download the certificate
    const link = document.createElement('a');
    link.download = `ecoquest-certificate-${playerName.replace(/\s+/g, '-').toLowerCase()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-blue-50 to-green-100 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Trophy className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              Lesson Complete!
            </h1>
            <p className="text-xl text-gray-600">
              {getPerformanceMessage()}
            </p>
          </div>

          {/* Results Card */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className={`p-8 text-white ${
              earnedBadge 
                ? 'bg-gradient-to-r from-emerald-500 to-green-600' 
                : 'bg-gradient-to-r from-blue-500 to-blue-600'
            }`}>
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-2">{lesson?.title}</h2>
                <p className="text-lg opacity-90">Results for {playerName}</p>
              </div>
            </div>

            {/* Stats */}
            <div className="p-8">
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="w-6 h-6 text-yellow-500 mr-2" />
                    <span className="text-2xl font-bold text-gray-800">
                      {playerState.score}
                    </span>
                  </div>
                  <p className="text-gray-600 font-medium">Total Score</p>
                  <p className="text-sm text-gray-500">
                    {scorePercentage}% of {totalPossibleScore} possible
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Zap className="w-6 h-6 text-emerald-500 mr-2" />
                    <span className="text-2xl font-bold text-gray-800">
                      {playerState.ecoPoints}
                    </span>
                  </div>
                  <p className="text-gray-600 font-medium">Eco Points</p>
                  <p className="text-sm text-gray-500">
                    Max streak: {playerState.streak}
                  </p>
                </div>
              </div>

              {/* Badge */}
              {earnedBadge && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                  className="text-center mb-8"
                >
                  <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300 rounded-full px-6 py-3">
                    <Trophy className="w-6 h-6 text-yellow-600" />
                    <span className="font-bold text-yellow-800 text-lg">
                      {earnedBadge} Badge Earned!
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Performance Breakdown */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <h3 className="font-bold text-gray-800 mb-4">Performance Summary</h3>
                <div className="space-y-3">
                  {Object.entries(playerState.answeredQuestions).map(([stepId, result], index) => {
                    const stepData = lesson?.steps.find(s => s.id === stepId);
                    return (
                      <div key={stepId} className="flex items-center justify-between">
                        <span className="text-gray-700">
                          Step {index + 1}: {stepData?.title || stepId}
                        </span>
                        <div className="flex items-center gap-2">
                          {result.correct ? (
                            <span className="text-emerald-600 font-medium">
                              ✓ {result.attempts === 1 ? '10 pts' : result.attempts === 2 ? '5 pts' : '0 pts'}
                            </span>
                          ) : (
                            <span className="text-red-500 font-medium">✗ 0 pts</span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={generateCertificate}
                  className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
                >
                  <Download className="w-5 h-5" />
                  Download Certificate
                </button>

                <Link
                  to={`/lesson/${currentSession.lessonId}`}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Retry Lesson
                </Link>

                <Link
                  to="/"
                  className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center justify-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};