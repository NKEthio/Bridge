import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

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

  // Calculate streak
  useEffect(() => {
    const today = new Date().toDateString();
    if (user.lastVisit) {
      const lastVisit = new Date(user.lastVisit).toDateString();
      const yesterday = new Date(Date.now() - 86400000).toDateString();
      
      if (lastVisit === today) {
        // Same day, no change
        return;
      } else if (lastVisit === yesterday) {
        // Consecutive day, increment streak
        setUser(prev => ({ ...prev, streak: prev.streak + 1, lastVisit: today }));
      } else {
        // Streak broken
        setUser(prev => ({ ...prev, streak: 1, lastVisit: today }));
      }
    } else {
      setUser(prev => ({ ...prev, streak: 1, lastVisit: today }));
    }
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
