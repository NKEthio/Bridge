import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'; // eslint-disable-line no-unused-vars
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import InteractiveLesson from '../components/InteractiveLesson';
import { courseData } from '../utils/courseData';
import './Course.css';

const Course = () => {
  const { level } = useParams();
  const navigate = useNavigate();
  const { user, completeLesson, addPoints, unlockAchievement } = useApp();
  const [currentModule, setCurrentModule] = useState(0);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [showInteractive, setShowInteractive] = useState(false);

  const course = courseData[level];

  useEffect(() => {
    if (!course) {
      navigate('/');
    }
  }, [course, navigate]);

  if (!course) return null;

  const module = course.modules[currentModule];
  const lesson = module?.lessons[currentLesson];

  const handleLessonComplete = () => {
    const lessonId = `${level}-${currentModule}-${currentLesson}`;
    completeLesson(lessonId);
    addPoints(25);

    // Show celebration
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 }
    });

    // Move to next lesson
    if (currentLesson < module.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    } else if (currentModule < course.modules.length - 1) {
      setCurrentModule(currentModule + 1);
      setCurrentLesson(0);
      unlockAchievement(`completed_module_${currentModule}`);
    } else {
      unlockAchievement(`completed_${level}_course`);
    }
    setShowInteractive(false);
  };

  const handleNextLesson = () => {
    if (currentLesson < module.lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
    } else if (currentModule < course.modules.length - 1) {
      setCurrentModule(currentModule + 1);
      setCurrentLesson(0);
    }
    setShowInteractive(false);
  };

  const handlePreviousLesson = () => {
    if (currentLesson > 0) {
      setCurrentLesson(currentLesson - 1);
    } else if (currentModule > 0) {
      setCurrentModule(currentModule - 1);
      setCurrentLesson(course.modules[currentModule - 1].lessons.length - 1);
    }
    setShowInteractive(false);
  };

  const lessonId = `${level}-${currentModule}-${currentLesson}`;
  const isCompleted = user.completedLessons.includes(lessonId);
  const progress = (user.completedLessons.filter(l => l.startsWith(level)).length / 
    course.modules.reduce((acc, m) => acc + m.lessons.length, 0)) * 100;

  return (
    <div className="page-wrapper">
      <div className="container">
        <header className="header">
          <h1>🌉 Bridge</h1>
          <p className="tagline">English Course - {course.name} Level</p>
          <div className="course-progress">
            <div className="progress-bar">
              <motion.div 
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <span>{Math.round(progress)}% Complete</span>
          </div>
        </header>

        <main className="main">
          <div className="course-header">
            <span className="course-level">{course.name} Level</span>
            <h2>{module.title}</h2>
            <p>{module.description}</p>
          </div>

          <div className="lesson-navigation">
            {module.lessons.map((l, idx) => (
              <button
                key={idx}
                className={`lesson-nav-btn ${idx === currentLesson ? 'active' : ''} ${
                  user.completedLessons.includes(`${level}-${currentModule}-${idx}`) ? 'completed' : ''
                }`}
                onClick={() => {
                  setCurrentLesson(idx);
                  setShowInteractive(false);
                }}
              >
                {idx + 1}. {l.title}
              </button>
            ))}
          </div>

          {!showInteractive ? (
            <motion.div 
              className="lesson-content-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="lesson-header">
                <h3>
                  {isCompleted && <span className="completed-badge">✓ </span>}
                  {lesson.title}
                </h3>
              </div>

              <div className="lesson-body">
                {lesson.content.map((section, idx) => (
                  <div key={idx} className="content-section">
                    {section.type === 'text' && <p>{section.text}</p>}
                    {section.type === 'heading' && <h4>{section.text}</h4>}
                    {section.type === 'example' && (
                      <div className="example-box">
                        <strong>Examples:</strong>
                        {Array.isArray(section.text) ? (
                          <ul>
                            {section.text.map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>{section.text}</p>
                        )}
                      </div>
                    )}
                    {section.type === 'list' && (
                      <ul className="content-list">
                        {section.items.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              {lesson.practice && (
                <div className="practice-section">
                  <h4>📝 Practice Exercise</h4>
                  <p>{lesson.practice.instruction}</p>
                  <motion.button 
                    className="btn-primary"
                    onClick={() => setShowInteractive(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Start Interactive Practice
                  </motion.button>
                </div>
              )}

              <div className="lesson-actions">
                <button 
                  className="btn-secondary"
                  onClick={handlePreviousLesson}
                  disabled={currentModule === 0 && currentLesson === 0}
                >
                  ← Previous Lesson
                </button>
                <button 
                  className="btn-primary"
                  onClick={handleNextLesson}
                  disabled={currentModule === course.modules.length - 1 && 
                    currentLesson === module.lessons.length - 1}
                >
                  Next Lesson →
                </button>
              </div>
            </motion.div>
          ) : (
            <InteractiveLesson 
              practice={lesson.practice}
              onComplete={handleLessonComplete}
              onBack={() => setShowInteractive(false)}
            />
          )}

          <div className="navigation">
            <button className="btn-secondary" onClick={() => navigate('/assessment')}>
              Retake Assessment
            </button>
            <button className="btn-secondary" onClick={() => navigate('/progress')}>
              View Progress
            </button>
            <button className="btn-primary" onClick={() => navigate('/')}>
              Back to Home
            </button>
          </div>
        </main>

        <footer className="footer">
          <p>&copy; 2024 Bridge - Empowering learners to bridge their knowledge gaps</p>
        </footer>
      </div>
    </div>
  );
};

export default Course;
