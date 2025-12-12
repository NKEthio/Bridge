import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import './Progress.css';

const achievements = {
  'first_assessment': { icon: '🎯', name: 'First Steps', description: 'Completed your first assessment' },
  'beginner_scorer': { icon: '📚', name: 'Beginner', description: 'Achieved Beginner level' },
  'intermediate_scorer': { icon: '📖', name: 'Intermediate', description: 'Achieved Intermediate level' },
  'advanced_scorer': { icon: '🏆', name: 'Advanced', description: 'Achieved Advanced level' },
  'completed_module_0': { icon: '🌟', name: 'Module Master', description: 'Completed first module' },
  'completed_module_1': { icon: '⭐', name: 'Module Expert', description: 'Completed second module' },
  'completed_module_2': { icon: '💫', name: 'Module Champion', description: 'Completed third module' },
  'completed_beginner_course': { icon: '🎓', name: 'Beginner Graduate', description: 'Completed Beginner course' },
  'completed_intermediate_course': { icon: '🏅', name: 'Intermediate Graduate', description: 'Completed Intermediate course' },
  'completed_advanced_course': { icon: '👑', name: 'Advanced Graduate', description: 'Completed Advanced course' },
};

const Progress = () => {
  const navigate = useNavigate();
  const { user } = useApp();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="page-wrapper">
      <div className="container">
        <header className="header">
          <h1>🌉 Bridge</h1>
          <p className="tagline">Your Learning Progress</p>
        </header>

        <main className="main">
          <motion.div 
            className="progress-overview"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-value">{user.level || 'Not assessed'}</div>
              <div className="stat-label">Current Level</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">⭐</div>
              <div className="stat-value">{user.totalPoints}</div>
              <div className="stat-label">Total Points</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">🔥</div>
              <div className="stat-value">{user.streak}</div>
              <div className="stat-label">Day Streak</div>
            </div>

            <div className="stat-card">
              <div className="stat-icon">📚</div>
              <div className="stat-value">{user.completedLessons.length}</div>
              <div className="stat-label">Lessons Completed</div>
            </div>
          </motion.div>

          {user.assessmentHistory && user.assessmentHistory.length > 0 && (
            <motion.section
              className="assessment-history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2>📈 Assessment History</h2>
              <div className="history-timeline">
                {user.assessmentHistory.slice().reverse().map((assessment, idx) => (
                  <motion.div 
                    key={idx}
                    className="history-item"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.4 + idx * 0.1 }}
                  >
                    <div className="history-date">
                      {new Date(assessment.date).toLocaleDateString()}
                    </div>
                    <div className="history-score">
                      <span className="score">{assessment.score}/10</span>
                      <span className={`level level-${assessment.level.toLowerCase()}`}>
                        {assessment.level}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}

          <motion.section
            className="achievements-section"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h2>🏆 Achievements</h2>
            <div className="achievements-grid">
              {Object.entries(achievements).map(([key, achievement]) => {
                const isUnlocked = user.achievements.includes(key);
                return (
                  <motion.div 
                    key={key}
                    className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}
                    variants={itemVariants}
                    whileHover={isUnlocked ? { scale: 1.05 } : {}}
                  >
                    <div className="achievement-icon">{achievement.icon}</div>
                    <div className="achievement-name">{achievement.name}</div>
                    <div className="achievement-description">{achievement.description}</div>
                    {isUnlocked && <div className="unlocked-badge">✓ Unlocked</div>}
                  </motion.div>
                );
              })}
            </div>
          </motion.section>

          <div className="action-section">
            {user.level ? (
              <motion.button 
                className="btn-primary"
                onClick={() => navigate(`/course/${user.level.toLowerCase()}`)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue Learning
              </motion.button>
            ) : (
              <motion.button 
                className="btn-primary"
                onClick={() => navigate('/assessment')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Take Assessment
              </motion.button>
            )}
            <motion.button 
              className="btn-secondary"
              onClick={() => navigate('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Back to Home
            </motion.button>
          </div>
        </main>

        <footer className="footer">
          <p>&copy; 2024 Bridge - Empowering learners to bridge their knowledge gaps</p>
        </footer>
      </div>
    </div>
  );
};

export default Progress;
