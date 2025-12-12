import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import confetti from 'canvas-confetti';
import './InteractiveLesson.css';

const DraggableWord = ({ word, index }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'word',
    item: { word, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <motion.div
      ref={drag}
      className={`draggable-word ${isDragging ? 'dragging' : ''}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {word}
    </motion.div>
  );
};

const DropZone = ({ onDrop, droppedWord, index }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'word',
    drop: (item) => onDrop(item.word, index),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop}
      className={`drop-zone ${isOver ? 'over' : ''} ${droppedWord ? 'filled' : ''}`}
    >
      {droppedWord || '___'}
    </div>
  );
};

const InteractiveLesson = ({ practice, onComplete, onBack }) => {
  const [answers, setAnswers] = useState({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleDrop = (word, index) => {
    setAnswers({ ...answers, [index]: word });
  };

  const handleTextAnswer = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const checkAnswers = () => {
    let correct = true;
    
    if (practice.type === 'fill-blank') {
      practice.blanks.forEach((blank, idx) => {
        if (answers[idx]?.toLowerCase().trim() !== blank.answer.toLowerCase().trim()) {
          correct = false;
        }
      });
    } else if (practice.type === 'drag-drop') {
      practice.slots.forEach((slot, idx) => {
        if (answers[idx]?.toLowerCase().trim() !== slot.answer.toLowerCase().trim()) {
          correct = false;
        }
      });
    } else if (practice.type === 'multiple-choice') {
      practice.questions.forEach((q, idx) => {
        if (answers[idx] !== q.correct) {
          correct = false;
        }
      });
    }

    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  };

  const resetExercise = () => {
    setAnswers({});
    setShowFeedback(false);
    setIsCorrect(false);
  };

  if (practice.type === 'fill-blank') {
    return (
      <motion.div 
        className="interactive-lesson"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="interactive-header">
          <h3>✏️ Fill in the Blanks</h3>
          <p>{practice.instruction}</p>
        </div>

        <div className="exercise-content">
          {practice.blanks.map((blank, idx) => (
            <div key={idx} className="fill-blank-item">
              <p className="blank-sentence">
                {blank.sentence.split('___').map((part, i) => (
                  <span key={i}>
                    {part}
                    {i < blank.sentence.split('___').length - 1 && (
                      <input
                        type="text"
                        className="blank-input"
                        value={answers[idx] || ''}
                        onChange={(e) => handleTextAnswer(idx, e.target.value)}
                        placeholder="___"
                        disabled={showFeedback && isCorrect}
                      />
                    )}
                  </span>
                ))}
              </p>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {showFeedback && (
            <motion.div 
              className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {isCorrect ? (
                <>
                  <span className="feedback-icon">✓</span>
                  <span>Excellent! You got it right!</span>
                </>
              ) : (
                <>
                  <span className="feedback-icon">✗</span>
                  <span>Not quite right. Try again!</span>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="interactive-actions">
          <button className="btn-secondary" onClick={onBack}>
            Back to Lesson
          </button>
          {!showFeedback ? (
            <button className="btn-primary" onClick={checkAnswers}>
              Check Answers
            </button>
          ) : !isCorrect && (
            <button className="btn-primary" onClick={resetExercise}>
              Try Again
            </button>
          )}
        </div>
      </motion.div>
    );
  }

  if (practice.type === 'drag-drop') {
    return (
      <DndProvider backend={HTML5Backend}>
        <motion.div 
          className="interactive-lesson"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="interactive-header">
            <h3>🎯 Drag and Drop</h3>
            <p>{practice.instruction}</p>
          </div>

          <div className="exercise-content">
            <div className="words-bank">
              <h4>Word Bank:</h4>
              <div className="words-container">
                {practice.words.map((word, idx) => (
                  <DraggableWord key={idx} word={word} index={idx} />
                ))}
              </div>
            </div>

            <div className="drop-zones">
              {practice.slots.map((slot, idx) => (
                <div key={idx} className="drop-zone-item">
                  <p className="slot-label">{slot.label}:</p>
                  <DropZone
                    onDrop={handleDrop}
                    droppedWord={answers[idx]}
                    index={idx}
                  />
                </div>
              ))}
            </div>
          </div>

          <AnimatePresence>
            {showFeedback && (
              <motion.div 
                className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                {isCorrect ? (
                  <>
                    <span className="feedback-icon">✓</span>
                    <span>Perfect! All words are in the right place!</span>
                  </>
                ) : (
                  <>
                    <span className="feedback-icon">✗</span>
                    <span>Some words are in the wrong place. Try again!</span>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="interactive-actions">
            <button className="btn-secondary" onClick={onBack}>
              Back to Lesson
            </button>
            {!showFeedback ? (
              <button className="btn-primary" onClick={checkAnswers}>
                Check Answers
              </button>
            ) : !isCorrect && (
              <button className="btn-primary" onClick={resetExercise}>
                Try Again
              </button>
            )}
          </div>
        </motion.div>
      </DndProvider>
    );
  }

  if (practice.type === 'multiple-choice') {
    return (
      <motion.div 
        className="interactive-lesson"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="interactive-header">
          <h3>📝 Multiple Choice Quiz</h3>
          <p>{practice.instruction}</p>
        </div>

        <div className="exercise-content">
          {practice.questions.map((q, qIdx) => (
            <div key={qIdx} className="quiz-question">
              <p className="question-text">{q.question}</p>
              <div className="quiz-options">
                {q.options.map((option, oIdx) => (
                  <button
                    key={oIdx}
                    className={`quiz-option ${answers[qIdx] === oIdx ? 'selected' : ''}`}
                    onClick={() => handleTextAnswer(qIdx, oIdx)}
                    disabled={showFeedback && isCorrect}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {showFeedback && (
            <motion.div 
              className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {isCorrect ? (
                <>
                  <span className="feedback-icon">✓</span>
                  <span>Excellent work! All answers are correct!</span>
                </>
              ) : (
                <>
                  <span className="feedback-icon">✗</span>
                  <span>Some answers are incorrect. Try again!</span>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="interactive-actions">
          <button className="btn-secondary" onClick={onBack}>
            Back to Lesson
          </button>
          {!showFeedback ? (
            <button className="btn-primary" onClick={checkAnswers}>
              Check Answers
            </button>
          ) : !isCorrect && (
            <button className="btn-primary" onClick={resetExercise}>
              Try Again
            </button>
          )}
        </div>
      </motion.div>
    );
  }

  return <div>Exercise type not supported</div>;
};

export default InteractiveLesson;
