import React, { createContext, useContext, useReducer, useEffect } from 'react';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: Date;
}

interface UserProgress {
  name: string;
  ecoPoints: number;
  level: number;
  badges: Badge[];
  completedLessons: string[];
  quizScores: { [key: string]: number };
  streak: number;
  lastActivity: Date;
}

interface GameState {
  user: UserProgress;
  language: 'en' | 'es';
}

type GameAction =
  | { type: 'ADD_ECO_POINTS'; payload: number }
  | { type: 'COMPLETE_LESSON'; payload: string }
  | { type: 'COMPLETE_QUIZ'; payload: { category: string; score: number } }
  | { type: 'EARN_BADGE'; payload: string }
  | { type: 'TOGGLE_LANGUAGE' }
  | { type: 'LOAD_PROGRESS'; payload: UserProgress }
  | { type: 'SET_USER_NAME'; payload: string };

const initialBadges: Badge[] = [
  { id: 'first-quiz', name: 'Quiz Master', description: 'Complete your first quiz', icon: '🏆', earned: false },
  { id: 'eco-warrior', name: 'Eco Warrior', description: 'Earn 500 eco-points', icon: '🌱', earned: false },
  { id: 'water-cycle-master', name: 'Water Expert', description: 'Complete water cycle lesson', icon: '💧', earned: false },
  { id: 'trash-sorter', name: 'Waste Expert', description: 'Complete trash sorting game', icon: '♻️', earned: false },
  { id: 'energy-manager', name: 'Energy Manager', description: 'Complete power grid simulator', icon: '⚡', earned: false },
  { id: 'streak-7', name: '7-Day Streak', description: 'Learn for 7 consecutive days', icon: '🔥', earned: false },
];

const initialState: GameState = {
  user: {
    name: 'EcoLearner',
    ecoPoints: 0,
    level: 1,
    badges: initialBadges,
    completedLessons: [],
    quizScores: {},
    streak: 0,
    lastActivity: new Date(),
  },
  language: 'en',
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'ADD_ECO_POINTS': {
      const newPoints = state.user.ecoPoints + action.payload;
      const newLevel = Math.floor(newPoints / 100) + 1;
      
      return {
        ...state,
        user: {
          ...state.user,
          ecoPoints: newPoints,
          level: newLevel,
          lastActivity: new Date(),
        },
      };
    }
    
    case 'COMPLETE_LESSON': {
      const isNewLesson = !state.user.completedLessons.includes(action.payload);
      return {
        ...state,
        user: {
          ...state.user,
          completedLessons: isNewLesson 
            ? [...state.user.completedLessons, action.payload]
            : state.user.completedLessons,
          lastActivity: new Date(),
        },
      };
    }
    
    case 'COMPLETE_QUIZ': {
      return {
        ...state,
        user: {
          ...state.user,
          quizScores: {
            ...state.user.quizScores,
            [action.payload.category]: action.payload.score,
          },
          lastActivity: new Date(),
        },
      };
    }
    
    case 'EARN_BADGE': {
      const updatedBadges = state.user.badges.map(badge =>
        badge.id === action.payload 
          ? { ...badge, earned: true, earnedAt: new Date() }
          : badge
      );
      
      return {
        ...state,
        user: {
          ...state.user,
          badges: updatedBadges,
          lastActivity: new Date(),
        },
      };
    }
    
    case 'TOGGLE_LANGUAGE':
      return {
        ...state,
        language: state.language === 'en' ? 'es' : 'en',
      };
    
    case 'LOAD_PROGRESS':
      return {
        ...state,
        user: action.payload,
      };
    
    case 'SET_USER_NAME':
      return {
        ...state,
        user: {
          ...state.user,
          name: action.payload,
        },
      };
    
    default:
      return state;
  }
}

const GameContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('ecoplay-progress');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        dispatch({ type: 'LOAD_PROGRESS', payload: progress });
      } catch (error) {
        console.error('Failed to load saved progress:', error);
      }
    }
  }, []);

  // Save progress to localStorage when state changes
  useEffect(() => {
    localStorage.setItem('ecoplay-progress', JSON.stringify(state.user));
  }, [state.user]);

  // Check for badge achievements
  useEffect(() => {
    const { user } = state;
    
    // First quiz badge
    if (Object.keys(user.quizScores).length > 0 && !user.badges.find(b => b.id === 'first-quiz')?.earned) {
      dispatch({ type: 'EARN_BADGE', payload: 'first-quiz' });
    }
    
    // Eco warrior badge
    if (user.ecoPoints >= 500 && !user.badges.find(b => b.id === 'eco-warrior')?.earned) {
      dispatch({ type: 'EARN_BADGE', payload: 'eco-warrior' });
    }
    
    // Lesson completion badges
    const lessonBadges = [
      { lesson: 'water-cycle', badge: 'water-cycle-master' },
      { lesson: 'trash-sorting', badge: 'trash-sorter' },
      { lesson: 'power-grid', badge: 'energy-manager' },
    ];
    
    lessonBadges.forEach(({ lesson, badge }) => {
      if (user.completedLessons.includes(lesson) && !user.badges.find(b => b.id === badge)?.earned) {
        dispatch({ type: 'EARN_BADGE', payload: badge });
      }
    });
  }, [state.user.ecoPoints, state.user.completedLessons, state.user.quizScores]);

  return (
    <GameContext.Provider value={{ state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
}