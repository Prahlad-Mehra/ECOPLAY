import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, BookOpen, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface TopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  topic: {
    id: string;
    title: string;
    description: string;
    detailedContent: string;
    keyPoints: string[];
    quizCategory: string;
    icon: React.ComponentType<any>;
    color: string;
  } | null;
}

const TopicModal: React.FC<TopicModalProps> = ({ isOpen, onClose, topic }) => {
  if (!topic) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className={`bg-gradient-to-r from-${topic.color}-400 to-${topic.color}-600 p-6 text-white relative`}>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                  <topic.icon className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold">{topic.title}</h2>
                  <p className="text-white/90 text-lg">{topic.description}</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <BookOpen className="w-5 h-5 text-gray-600" />
                <h3 className="text-xl font-bold text-gray-800">Learn More</h3>
              </div>
              
              <div className="prose prose-gray max-w-none mb-6">
                <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {topic.detailedContent}
                </div>
              </div>

              {/* Key Points */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-800 mb-3">Key Points to Remember:</h4>
                <ul className="space-y-2">
                  {topic.keyPoints.map((point, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start space-x-3"
                    >
                      <span className={`w-2 h-2 bg-${topic.color}-500 rounded-full mt-2 flex-shrink-0`} />
                      <span className="text-gray-700">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={`/quiz/${topic.quizCategory}`}
                  className="flex-1"
                  onClick={onClose}
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full bg-gradient-to-r from-${topic.color}-500 to-${topic.color}-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-${topic.color}-600 hover:to-${topic.color}-700 transition-all flex items-center justify-center space-x-2 shadow-lg`}
                  >
                    <span>Take Quiz</span>
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                
                <button
                  onClick={onClose}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                >
                  Continue Reading
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TopicModal;