import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { PlayerState, GameSession, LeaderboardEntry } from '../types';

interface GameStore {
  // Player state
  playerName: string;
  currentSession: GameSession | null;
  playerState: PlayerState;
  
  // Leaderboard
  leaderboard: LeaderboardEntry[];
  
  // Actions
  setPlayerName: (name: string) => void;
  startLesson: (lessonId: string) => void;
  answerQuestion: (stepId: string, isCorrect: boolean, attempts: number) => void;
  nextStep: () => void;
  completeLesson: (badge?: string) => void;
  resetLesson: () => void;
  addToLeaderboard: (entry: LeaderboardEntry) => void;
  resetPlayerState: () => void;
}

const initialPlayerState: PlayerState = {
  currentStep: 0,
  score: 0,
  ecoPoints: 0,
  streak: 0,
  hearts: 3,
  answeredQuestions: {},
  completedLessons: [],
  badges: []
};

export const useGameStore = create<GameStore>()(
  persist(
    (set, get) => ({
      playerName: '',
      currentSession: null,
      playerState: initialPlayerState,
      leaderboard: [],

      setPlayerName: (name: string) => set({ playerName: name }),

      startLesson: (lessonId: string) => set((state) => ({
        currentSession: {
          lessonId,
          playerName: state.playerName,
          score: 0,
          timeStarted: new Date()
        },
        playerState: { ...initialPlayerState }
      })),

      answerQuestion: (stepId: string, isCorrect: boolean, attempts: number) => 
        set((state) => {
          let points = 0;
          let streakBonus = 0;
          
          // Calculate points based on attempts
          if (isCorrect) {
            points = attempts === 1 ? 10 : attempts === 2 ? 5 : 0;
            
            // Check for streak bonus
            const currentStreak = state.playerState.streak;
            if (attempts === 1 && currentStreak >= 2) {
              streakBonus = 2;
            }
          }

          const newStreak = isCorrect && attempts === 1 ? 
            state.playerState.streak + 1 : 0;

          const newHearts = !isCorrect ? 
            Math.max(0, state.playerState.hearts - 1) : state.playerState.hearts;

          return {
            playerState: {
              ...state.playerState,
              score: state.playerState.score + points + streakBonus,
              ecoPoints: state.playerState.ecoPoints + points + streakBonus,
              streak: newStreak,
              hearts: newHearts,
              answeredQuestions: {
                ...state.playerState.answeredQuestions,
                [stepId]: { correct: isCorrect, attempts }
              }
            }
          };
        }),

      nextStep: () => set((state) => ({
        playerState: {
          ...state.playerState,
          currentStep: state.playerState.currentStep + 1
        }
      })),

      completeLesson: (badge?: string) => set((state) => {
        const completedSession = {
          ...state.currentSession!,
          score: state.playerState.score,
          timeCompleted: new Date(),
          badge
        };

        const newEntry: LeaderboardEntry = {
          playerName: state.playerName,
          lessonId: completedSession.lessonId,
          score: state.playerState.score,
          ecoPoints: state.playerState.ecoPoints,
          completedAt: completedSession.timeCompleted!,
          badge: badge || ''
        };

        return {
          playerState: {
            ...state.playerState,
            completedLessons: [...state.playerState.completedLessons, completedSession.lessonId],
            badges: badge ? [...state.playerState.badges, badge] : state.playerState.badges
          },
          leaderboard: [...state.leaderboard, newEntry].sort((a, b) => b.score - a.score).slice(0, 10)
        };
      }),

      resetLesson: () => set((state) => ({
        playerState: initialPlayerState,
        currentSession: state.currentSession ? {
          ...state.currentSession,
          score: 0,
          timeStarted: new Date()
        } : null
      })),

      addToLeaderboard: (entry: LeaderboardEntry) => set((state) => ({
        leaderboard: [...state.leaderboard, entry].sort((a, b) => b.score - a.score).slice(0, 10)
      })),

      resetPlayerState: () => set({
        playerState: initialPlayerState,
        currentSession: null
      })
    }),
    {
      name: 'ecoquest-game-store'
    }
  )
);