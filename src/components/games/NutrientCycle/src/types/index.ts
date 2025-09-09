export interface MCQOption {
  id: string;
  text: string;
}

export interface MCQ {
  question: string;
  options: MCQOption[];
  correctOptionId: string;
  explanationOnCorrect: string;
  explanationOnWrong: string;
}

export interface LessonStep {
  id: string;
  title: string;
  explainer: string;
  mcq: MCQ;
  visibleLayers: string[];
  animationCues: string[];
}

export interface Lesson {
  id: 'water-cycle' | 'nitrogen-cycle';
  title: string;
  description: string;
  badge: string;
  steps: LessonStep[];
  availableLayers: { id: string; name: string }[];
}

export interface PlayerState {
  currentStep: number;
  score: number;
  ecoPoints: number;
  streak: number;
  hearts: number;
  answeredQuestions: { [stepId: string]: { correct: boolean; attempts: number } };
  completedLessons: string[];
  badges: string[];
}

export interface GameSession {
  lessonId: string;
  playerName: string;
  score: number;
  timeStarted: Date;
  timeCompleted?: Date;
  badge?: string;
}

export interface LeaderboardEntry {
  playerName: string;
  lessonId: string;
  score: number;
  ecoPoints: number;
  completedAt: Date;
  badge: string;
}