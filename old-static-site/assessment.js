// Correct answers for the assessment
const correctAnswers = {
    q1: 'b',  // goes
    q2: 'b',  // Hardworking and careful
    q3: 'b',  // on
    q4: 'b',  // I was eating breakfast
    q5: 'b',  // persuasive
    q6: 'c',  // He doesn't like coffee
    q7: 'a',  // A European
    q8: 'b',  // In spite of
    q9: 'c',  // were
    q10: 'b'  // The team is playing well
};

// Level thresholds
const levels = {
    beginner: { min: 0, max: 4, name: 'Beginner' },
    intermediate: { min: 5, max: 7, name: 'Intermediate' },
    advanced: { min: 8, max: 10, name: 'Advanced' }
};

// Form submission handler
document.getElementById('assessment-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Calculate score
    let score = 0;
    const formData = new FormData(this);
    
    for (let [question, answer] of formData.entries()) {
        if (correctAnswers[question] === answer) {
            score++;
        }
    }
    
    // Determine level
    let level = '';
    let courseFile = '';
    let recommendations = '';
    
    if (score >= levels.advanced.min && score <= levels.advanced.max) {
        level = levels.advanced.name;
        courseFile = 'course-advanced.html';
        recommendations = `
            <p>Excellent work! You have a strong grasp of English fundamentals.</p>
            <ul>
                <li>Focus on advanced grammar structures</li>
                <li>Expand vocabulary with academic and professional terms</li>
                <li>Practice advanced writing and communication skills</li>
                <li>Study idiomatic expressions and nuanced language use</li>
            </ul>
        `;
    } else if (score >= levels.intermediate.min && score <= levels.intermediate.max) {
        level = levels.intermediate.name;
        courseFile = 'course-intermediate.html';
        recommendations = `
            <p>Good job! You have a solid foundation in English.</p>
            <ul>
                <li>Strengthen your grammar with complex sentence structures</li>
                <li>Build vocabulary for everyday and academic contexts</li>
                <li>Improve reading comprehension skills</li>
                <li>Practice writing coherent paragraphs and essays</li>
            </ul>
        `;
    } else {
        level = levels.beginner.name;
        courseFile = 'course-beginner.html';
        recommendations = `
            <p>Great start! Let's build a strong foundation in English.</p>
            <ul>
                <li>Master basic grammar rules and sentence structure</li>
                <li>Learn essential vocabulary for daily communication</li>
                <li>Practice simple reading and writing exercises</li>
                <li>Build confidence with basic conversation skills</li>
            </ul>
        `;
    }
    
    // Display results
    document.getElementById('score-display').textContent = score + '/10';
    document.getElementById('level-display').textContent = level;
    document.getElementById('recommendation-text').innerHTML = recommendations;
    document.getElementById('course-link').href = courseFile;
    
    // Hide test, show results
    document.getElementById('test-section').classList.add('hidden');
    document.getElementById('results-section').classList.remove('hidden');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
