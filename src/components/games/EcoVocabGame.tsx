import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const EcoVocabGame = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-green-600 mb-4">Eco Vocab Game</h1>
        <p className="text-xl text-gray-700 mb-8">
          This game is under construction. Come back soon to test your environmental science vocabulary!
        </p>
        <Link
          to="/interactive"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          <ArrowLeft className="mr-2 -ml-1 h-5 w-5" />
          Back to Lessons
        </Link>
      </div>
    </div>
  );
};

export default EcoVocabGame;
