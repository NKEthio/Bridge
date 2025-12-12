import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const { user } = useApp();

  const features = [
    {
      icon: '📊',
      title: 'Evaluate',
      description: 'Take a comprehensive test to identify your current level'
    },
    {
      icon: '📚',
      title: 'Learn',
      description: 'Access personalized course materials tailored to your needs'
    },
    {
      icon: '🎯',
      title: 'Progress',
      description: 'Track your improvement with achievements and streaks'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
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
        <motion.header 
          className="header"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1>🌉 Bridge</h1>
          <p className="tagline">Fill your knowledge gap and reach your potential</p>
          {user.level && (
            <motion.div 
              className="user-stats"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              <span className="stat">
                <strong>Level:</strong> {user.level}
              </span>
              <span className="stat">
                <strong>Points:</strong> {user.totalPoints}
              </span>
              <span className="stat">
                <strong>🔥 Streak:</strong> {user.streak} days
              </span>
            </motion.div>
          )}
        </motion.header>

        <main className="main">
          <motion.section 
            className="welcome"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h2 variants={itemVariants}>Welcome to Bridge</motion.h2>
            <motion.p variants={itemVariants}>
              Bridge helps students with weak academic performance catch up and excel. 
              We evaluate your current level, fill knowledge gaps, and guide you through 
              continuous improvement.
            </motion.p>
            
            <motion.div className="features" variants={containerVariants}>
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="feature"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)'
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="feature-icon">{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.section>

          <motion.section 
            className="start-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <h2>Start Your Learning Journey</h2>
            <p>
              Begin by assessing your English language skills. Our test will evaluate 
              your grammar, vocabulary, and comprehension abilities.
            </p>
            
            <div className="action-buttons">
              {user.level ? (
                <>
                  <motion.button 
                    className="btn-primary"
                    onClick={() => navigate(`/course/${user.level.toLowerCase()}`)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Continue Learning
                  </motion.button>
                  <motion.button 
                    className="btn-secondary"
                    onClick={() => navigate('/assessment')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Retake Assessment
                  </motion.button>
                  <motion.button 
                    className="btn-secondary"
                    onClick={() => navigate('/progress')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Progress
                  </motion.button>
                </>
              ) : (
                <motion.button 
                  className="btn-primary"
                  onClick={() => navigate('/assessment')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start English Assessment
                </motion.button>
              )}
            </div>
          </motion.section>
        </main>

        <footer className="footer">
          <p>&copy; 2024 Bridge - Empowering learners to bridge their knowledge gaps</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
