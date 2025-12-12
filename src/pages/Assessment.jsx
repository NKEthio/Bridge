import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useApp } from '../context/AppContext';
import './Assessment.css';

const questions = [
  {
    id: 1,
    question: 'Choose the correct form of the verb: "She ___ to school every day."',
    options: ['go', 'goes', 'going', 'went'],
    correct: 1
  },
  {
    id: 2,
    question: 'What is the meaning of "diligent"?',
    options: ['Lazy', 'Hardworking and careful', 'Angry', 'Sad'],
    correct: 1
  },
  {
    id: 3,
    question: 'Fill in the blank: "The book is ___ the table."',
    options: ['in', 'on', 'at', 'by'],
    correct: 1
  },
  {
    id: 4,
    question: 'Which sentence is in the past continuous tense?',
    options: ['I eat breakfast.', 'I was eating breakfast.', 'I have eaten breakfast.', 'I will eat breakfast.'],
    correct: 1
  },
  {
    id: 5,
    question: 'Choose the word that best completes the sentence: "Her argument was so ___ that everyone was convinced."',
    options: ['weak', 'persuasive', 'boring', 'confusing'],
    correct: 1
  },
  {
    id: 6,
    question: 'Identify the correct sentence:',
    options: ["He don't like coffee.", "He doesn't likes coffee.", "He doesn't like coffee.", "He not like coffee."],
    correct: 2
  },
  {
    id: 7,
    question: 'Choose the correct article: "___ European country has its own culture."',
    options: ['A', 'An', 'The', 'No article needed'],
    correct: 0
  },
  {
    id: 8,
    question: 'Read: "Despite the heavy rain, the team continued to play." What does "despite" mean?',
    options: ['Because of', 'In spite of', 'Before', 'After'],
    correct: 1
  },
  {
    id: 9,
    question: 'Complete the conditional sentence: "If I ___ rich, I would travel the world."',
    options: ['am', 'was', 'were', 'will be'],
    correct: 2
  },
  {
    id: 10,
    question: 'Choose the sentence with correct subject-verb agreement:',
    options: ['The team are playing well.', 'The team is playing well.', 'The team were playing well.', 'The team have playing well.'],
    correct: 1
  }
];

const Assessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const navigate = useNavigate();
  const { updateAssessmentResult, addPoints, unlockAchievement } = useApp();

  const handleOptionSelect = (optionIndex) => {
    setSelectedOption(optionIndex);
  };

  const handleNext = () => {
    if (selectedOption !== null) {
      setAnswers({ ...answers, [currentQuestion]: selectedOption });
      setSelectedOption(null);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        calculateResults({ ...answers, [currentQuestion]: selectedOption });
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1] ?? null);
    }
  };

  const calculateResults = (finalAnswers) => {
    let score = 0;
    questions.forEach((q, index) => {
      if (finalAnswers[index] === q.correct) {
        score++;
      }
    });

    let level = '';
    if (score >= 8) {
      level = 'Advanced';
      addPoints(100);
      unlockAchievement('advanced_scorer');
    } else if (score >= 5) {
      level = 'Intermediate';
      addPoints(75);
      unlockAchievement('intermediate_scorer');
    } else {
      level = 'Beginner';
      addPoints(50);
      unlockAchievement('first_assessment');
    }

    updateAssessmentResult(score, level);
    setShowResults(true);

    // Celebration effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correct) {
        score++;
      }
    });
    return score;
  };

  const getLevel = (score) => {
    if (score >= 8) return 'Advanced';
    if (score >= 5) return 'Intermediate';
    return 'Beginner';
  };

  const getLevelDescription = (level) => {
    const descriptions = {
      'Advanced': {
        text: 'Excellent work! You have a strong grasp of English fundamentals.',
        points: [
          'Focus on advanced grammar structures',
          'Expand vocabulary with academic and professional terms',
          'Practice advanced writing and communication skills',
          'Study idiomatic expressions and nuanced language use'
        ]
      },
      'Intermediate': {
        text: 'Good job! You have a solid foundation in English.',
        points: [
          'Strengthen your grammar with complex sentence structures',
          'Build vocabulary for everyday and academic contexts',
          'Improve reading comprehension skills',
          'Practice writing coherent paragraphs and essays'
        ]
      },
      'Beginner': {
        text: "Great start! Let's build a strong foundation in English.",
        points: [
          'Master basic grammar rules and sentence structure',
          'Learn essential vocabulary for daily communication',
          'Practice simple reading and writing exercises',
          'Build confidence with basic conversation skills'
        ]
      }
    };
    return descriptions[level];
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (showResults) {
    const score = calculateScore();
    const level = getLevel(score);
    const description = getLevelDescription(level);

    return (
      <div className="page-wrapper">
        <div className="container">
          <header className="header">
            <h1>🌉 Bridge</h1>
            <p className="tagline">Assessment Results</p>
          </header>

          <main className="main">
            <motion.div 
              className="results"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', duration: 0.5 }}
            >
              <h2>🎉 Assessment Complete!</h2>
              
              <motion.div 
                className="score-display"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, type: 'spring' }}
              >
                <div className="score-number">{score}/10</div>
                <div className="level-badge">{level}</div>
              </motion.div>

              <div className="recommendation">
                <h3>📚 Your Learning Path</h3>
                <p>{description.text}</p>
                <ul>
                  {description.points.map((point, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + idx * 0.1 }}
                    >
                      {point}
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="action-buttons">
                <motion.button 
                  className="btn-primary"
                  onClick={() => navigate(`/course/${level.toLowerCase()}`)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Your Course
                </motion.button>
                <motion.button 
                  className="btn-secondary"
                  onClick={() => navigate('/')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Back to Home
                </motion.button>
              </div>
            </motion.div>
          </main>

          <footer className="footer">
            <p>&copy; 2024 Bridge - Empowering learners to bridge their knowledge gaps</p>
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <div className="container">
        <header className="header">
          <h1>🌉 Bridge</h1>
          <p className="tagline">English Language Assessment</p>
        </header>

        <main className="main">
          <div className="assessment-container">
            <div className="progress-bar">
              <motion.div 
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            <div className="question-counter">
              Question {currentQuestion + 1} of {questions.length}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion}
                className="question-card"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <h3>Question {currentQuestion + 1}</h3>
                <p className="question-text">{questions[currentQuestion].question}</p>

                <div className="options">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      className={`option ${selectedOption === index ? 'selected' : ''}`}
                      onClick={() => handleOptionSelect(index)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                      <span className="option-text">{option}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="navigation-buttons">
              <button 
                className="btn-secondary"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
              >
                ← Previous
              </button>
              <button 
                className="btn-primary"
                onClick={handleNext}
                disabled={selectedOption === null}
              >
                {currentQuestion === questions.length - 1 ? 'Finish' : 'Next →'}
              </button>
            </div>
          </div>
        </main>

        <footer className="footer">
          <p>&copy; 2024 Bridge - Empowering learners to bridge their knowledge gaps</p>
        </footer>
      </div>
    </div>
  );
};

export default Assessment;
