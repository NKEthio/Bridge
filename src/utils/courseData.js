export const courseData = {
  beginner: {
    name: 'Beginner',
    modules: [
      {
        title: '📘 Module 1: Basic Grammar',
        description: 'Learn the fundamental building blocks of English grammar.',
        lessons: [
          {
            title: 'Parts of Speech',
            content: [
              { type: 'heading', text: 'Nouns' },
              { type: 'text', text: 'Words that name people, places, things, or ideas.' },
              { type: 'example', text: ['book', 'teacher', 'school', 'happiness'] },
              { type: 'heading', text: 'Verbs' },
              { type: 'text', text: 'Words that show action or state of being.' },
              { type: 'example', text: ['run', 'eat', 'is', 'have'] },
              { type: 'heading', text: 'Adjectives' },
              { type: 'text', text: 'Words that describe nouns.' },
              { type: 'example', text: ['big', 'beautiful', 'happy', 'red'] },
            ],
            practice: {
              type: 'drag-drop',
              instruction: 'Drag the words to their correct categories.',
              words: ['book', 'run', 'happy', 'teacher', 'beautiful', 'eat'],
              slots: [
                { label: 'Noun', answer: 'book' },
                { label: 'Verb', answer: 'run' },
                { label: 'Adjective', answer: 'happy' },
              ]
            }
          },
          {
            title: 'Present Simple Tense',
            content: [
              { type: 'text', text: 'Use the present simple tense for habits, facts, and general truths.' },
              { type: 'heading', text: 'Structure' },
              { type: 'text', text: 'Subject + Verb (+ s/es for he/she/it)' },
              { type: 'example', text: [
                'I study English every day.',
                'She works at a hospital.',
                'They play soccer on weekends.',
                'The sun rises in the east.'
              ]},
            ],
            practice: {
              type: 'fill-blank',
              instruction: 'Fill in the blanks with the correct form of the verb.',
              blanks: [
                { sentence: 'My sister ___ to school every morning.', answer: 'goes' },
                { sentence: 'We ___ ice cream.', answer: 'like' },
                { sentence: 'He ___ the guitar.', answer: 'plays' },
              ]
            }
          },
          {
            title: 'Articles (a, an, the)',
            content: [
              { type: 'heading', text: 'A' },
              { type: 'text', text: 'Used before consonant sounds.' },
              { type: 'example', text: 'a book, a car, a university' },
              { type: 'heading', text: 'An' },
              { type: 'text', text: 'Used before vowel sounds.' },
              { type: 'example', text: 'an apple, an hour, an umbrella' },
              { type: 'heading', text: 'The' },
              { type: 'text', text: 'Used for specific things.' },
              { type: 'example', text: 'the book on the table, the sun, the first person' },
            ],
            practice: {
              type: 'multiple-choice',
              instruction: 'Choose the correct article for each sentence.',
              questions: [
                {
                  question: 'I saw ___ elephant at the zoo.',
                  options: ['a', 'an', 'the', 'no article'],
                  correct: 1
                },
                {
                  question: '___ sun is very bright today.',
                  options: ['A', 'An', 'The', 'No article'],
                  correct: 2
                },
              ]
            }
          },
        ]
      },
      {
        title: '📗 Module 2: Essential Vocabulary',
        description: 'Learn common words for everyday communication.',
        lessons: [
          {
            title: 'Family and Relationships',
            content: [
              { type: 'heading', text: 'Family Members' },
              { type: 'list', items: [
                'Mother/Mom - Female parent',
                'Father/Dad - Male parent',
                'Sister - Female sibling',
                'Brother - Male sibling',
                'Grandmother - Mother\'s or father\'s mother',
                'Grandfather - Mother\'s or father\'s father',
              ]},
            ],
            practice: {
              type: 'multiple-choice',
              instruction: 'Choose the correct family member.',
              questions: [
                {
                  question: 'Your mother\'s mother is your ___.',
                  options: ['aunt', 'grandmother', 'sister', 'cousin'],
                  correct: 1
                },
                {
                  question: 'Your father\'s son is your ___.',
                  options: ['uncle', 'cousin', 'brother', 'nephew'],
                  correct: 2
                },
              ]
            }
          },
          {
            title: 'Common Verbs',
            content: [
              { type: 'heading', text: 'Everyday Actions' },
              { type: 'list', items: [
                'eat - to consume food',
                'drink - to consume liquid',
                'walk - to move on foot',
                'run - to move quickly',
                'sleep - to rest at night',
                'study - to learn',
                'work - to do a job',
                'play - to have fun',
              ]},
            ],
            practice: {
              type: 'drag-drop',
              instruction: 'Match the verbs to their meanings.',
              words: ['eat', 'sleep', 'study', 'play', 'work', 'walk'],
              slots: [
                { label: 'To consume food', answer: 'eat' },
                { label: 'To learn', answer: 'study' },
                { label: 'To have fun', answer: 'play' },
              ]
            }
          },
        ]
      },
    ]
  },
  intermediate: {
    name: 'Intermediate',
    modules: [
      {
        title: '📙 Module 1: Complex Grammar',
        description: 'Master more advanced grammatical structures.',
        lessons: [
          {
            title: 'Past Perfect Tense',
            content: [
              { type: 'text', text: 'The past perfect tense describes an action that was completed before another past action.' },
              { type: 'heading', text: 'Structure' },
              { type: 'text', text: 'Subject + had + past participle' },
              { type: 'example', text: [
                'She had finished her homework before dinner.',
                'They had left when I arrived.',
                'I had never seen such a beautiful sunset.',
              ]},
            ],
            practice: {
              type: 'fill-blank',
              instruction: 'Complete the sentences using the past perfect tense.',
              blanks: [
                { sentence: 'By the time we arrived, the movie ___ already started.', answer: 'had' },
                { sentence: 'She ___ never traveled abroad before last year.', answer: 'had' },
              ]
            }
          },
          {
            title: 'Passive Voice',
            content: [
              { type: 'text', text: 'The passive voice emphasizes the action rather than the subject performing it.' },
              { type: 'heading', text: 'Structure' },
              { type: 'text', text: 'Object + be + past participle (+ by + subject)' },
              { type: 'example', text: [
                'The book was written by Shakespeare.',
                'The house is being painted.',
                'The project will be completed tomorrow.',
              ]},
            ],
            practice: {
              type: 'multiple-choice',
              instruction: 'Choose the correct passive voice form.',
              questions: [
                {
                  question: 'The letter ___ by Mary yesterday.',
                  options: ['wrote', 'was written', 'is written', 'writes'],
                  correct: 1
                },
                {
                  question: 'The cake ___ right now.',
                  options: ['bakes', 'is baking', 'is being baked', 'baked'],
                  correct: 2
                },
              ]
            }
          },
        ]
      },
      {
        title: '📕 Module 2: Advanced Vocabulary',
        description: 'Expand your vocabulary for academic and professional contexts.',
        lessons: [
          {
            title: 'Academic Words',
            content: [
              { type: 'text', text: 'Important words commonly used in academic settings.' },
              { type: 'list', items: [
                'analyze - examine in detail',
                'evaluate - assess the value or quality',
                'synthesize - combine elements to form a whole',
                'justify - show or prove to be right',
                'interpret - explain the meaning',
              ]},
            ],
            practice: {
              type: 'drag-drop',
              instruction: 'Match the academic words to their definitions.',
              words: ['analyze', 'evaluate', 'synthesize', 'justify', 'interpret'],
              slots: [
                { label: 'Examine in detail', answer: 'analyze' },
                { label: 'Explain the meaning', answer: 'interpret' },
                { label: 'Show to be right', answer: 'justify' },
              ]
            }
          },
        ]
      },
    ]
  },
  advanced: {
    name: 'Advanced',
    modules: [
      {
        title: '📔 Module 1: Sophisticated Grammar',
        description: 'Master the most complex grammatical structures.',
        lessons: [
          {
            title: 'Subjunctive Mood',
            content: [
              { type: 'text', text: 'The subjunctive mood expresses wishes, suggestions, demands, or hypothetical situations.' },
              { type: 'example', text: [
                'It is essential that he be present at the meeting.',
                'I suggest that she study harder.',
                'If I were you, I would accept the offer.',
              ]},
            ],
            practice: {
              type: 'fill-blank',
              instruction: 'Complete the sentences using the subjunctive mood.',
              blanks: [
                { sentence: 'It is important that he ___ on time.', answer: 'be' },
                { sentence: 'I wish I ___ more about this topic.', answer: 'knew' },
              ]
            }
          },
          {
            title: 'Advanced Conditionals',
            content: [
              { type: 'text', text: 'Mixed conditionals and advanced conditional structures for complex hypothetical situations.' },
              { type: 'example', text: [
                'If I had studied harder, I would be successful now.',
                'If she were more organized, she wouldn\'t have missed the deadline.',
                'Had I known about the party, I would have attended.',
              ]},
            ],
            practice: {
              type: 'multiple-choice',
              instruction: 'Choose the correct conditional form.',
              questions: [
                {
                  question: 'If I ___ about the traffic, I would have left earlier.',
                  options: ['know', 'knew', 'had known', 'have known'],
                  correct: 2
                },
                {
                  question: '___ you studied more, you would understand this better.',
                  options: ['If', 'Had', 'Were', 'Should'],
                  correct: 1
                },
              ]
            }
          },
        ]
      },
      {
        title: '📚 Module 2: Professional Communication',
        description: 'Master sophisticated vocabulary and expressions.',
        lessons: [
          {
            title: 'Idiomatic Expressions',
            content: [
              { type: 'text', text: 'Common idioms used in professional and casual English.' },
              { type: 'list', items: [
                'Break the ice - to initiate conversation',
                'Hit the nail on the head - to be exactly right',
                'Speak of the devil - when someone appears just as you mention them',
                'Under the weather - feeling sick',
                'Piece of cake - very easy',
              ]},
            ],
            practice: {
              type: 'drag-drop',
              instruction: 'Match the idioms to their meanings.',
              words: ['break the ice', 'piece of cake', 'under the weather', 'hit the nail', 'speak of'],
              slots: [
                { label: 'Very easy', answer: 'piece of cake' },
                { label: 'Feeling sick', answer: 'under the weather' },
                { label: 'Initiate conversation', answer: 'break the ice' },
              ]
            }
          },
        ]
      },
    ]
  },
};
