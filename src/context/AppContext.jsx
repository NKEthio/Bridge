import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('bridgeUser');
    return saved ? JSON.parse(saved) : {
      level: null,
      score: 0,
      totalPoints: 0,
      streak: 0,
      lastVisit: null,
      achievements: [],
      completedLessons: [],
      assessmentHistory: []
    };
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('bridgeSettings');
    return saved ? JSON.parse(saved) : {
      soundEnabled: true,
      animationsEnabled: true,
      theme: 'default'
    };
  });

  useEffect(() => {
    localStorage.setItem('bridgeUser', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('bridgeSettings', JSON.stringify(settings));
  }, [settings]);

  // Calculate streak - run only once on mount
  useEffect(() => {
    const today = new Date().toDateString();
    const lastVisit = user.lastVisit ? new Date(user.lastVisit).toDateString() : null;
    
    if (!lastVisit) {
      // First visit
      setUser(prev => ({ ...prev, streak: 1, lastVisit: today }));
    } else if (lastVisit !== today) {
      // Different day
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      if (lastVisit === yesterday) {
        // Consecutive day, increment streak
        setUser(prev => ({ ...prev, streak: prev.streak + 1, lastVisit: today }));
      } else {
        // Streak broken
        setUser(prev => ({ ...prev, streak: 1, lastVisit: today }));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addPoints = (points) => {
    setUser(prev => ({
      ...prev,
      totalPoints: prev.totalPoints + points
    }));
  };

  const unlockAchievement = (achievement) => {
    setUser(prev => {
      if (!prev.achievements.includes(achievement)) {
        return {
          ...prev,
          achievements: [...prev.achievements, achievement]
        };
      }
      return prev;
    });
  };

  const completeLesson = (lessonId) => {
    setUser(prev => {
      if (!prev.completedLessons.includes(lessonId)) {
        return {
          ...prev,
          completedLessons: [...prev.completedLessons, lessonId]
        };
      }
      return prev;
    });
  };

  const updateAssessmentResult = (score, level) => {
    setUser(prev => ({
      ...prev,
      score,
      level,
      assessmentHistory: [...prev.assessmentHistory, { score, level, date: new Date().toISOString() }]
    }));
  };

  const value = {
    user,
    setUser,
    settings,
    setSettings,
    addPoints,
    unlockAchievement,
    completeLesson,
    updateAssessmentResult
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
