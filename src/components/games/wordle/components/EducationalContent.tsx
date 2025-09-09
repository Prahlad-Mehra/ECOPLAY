import React from 'react';
import { BookOpen, Lightbulb, Globe, Link } from 'lucide-react';
import { WordData } from '../data/words';

interface EducationalContentProps {
  wordData: WordData;
  isVisible: boolean;
}

export function EducationalContent({ wordData, isVisible }: EducationalContentProps) {
  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-lg shadow-lg p-6 mt-6 border border-green-200">
      <div className="flex items-center gap-3 mb-4">
        <BookOpen className="w-6 h-6 text-green-600" />
        <h3 className="text-2xl font-bold text-green-800">
          Learn About: {wordData.word}
        </h3>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-start gap-3 mb-2">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <BookOpen className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Definition</h4>
              <p className="text-gray-700 leading-relaxed">{wordData.definition}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-start gap-3 mb-2">
            <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Lightbulb className="w-4 h-4 text-yellow-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Real-World Applications</h4>
              <p className="text-gray-700 leading-relaxed">{wordData.applications}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-start gap-3 mb-2">
            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Globe className="w-4 h-4 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Environmental Significance</h4>
              <p className="text-gray-700 leading-relaxed">{wordData.significance}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex items-start gap-3 mb-2">
            <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Link className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Related Concepts</h4>
              <div className="flex flex-wrap gap-2">
                {wordData.relatedConcepts.map((concept, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                  >
                    {concept}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
        <p className="text-blue-800 text-sm">
          <strong>Study Tip:</strong> Understanding environmental science terminology helps you better comprehend 
          the complex relationships between human activities and natural systems. Each term represents 
          a key concept in sustainability and conservation.
        </p>
      </div>
    </div>
  );
}