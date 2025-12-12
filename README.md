# Bridge 🌉

Fill your knowledge gap and reach your potential.

## About

Bridge is a modern, interactive learning platform built with React that helps students with weak academic performance catch up and excel. We evaluate your current level, fill knowledge gaps, and guide you through continuous improvement with gamification and engaging interactive exercises.

## ✨ Key Features

### 📊 Smart Assessment
- Interactive 10-question English proficiency test
- Instant results with detailed feedback
- Personalized learning path recommendations
- Progress tracking across multiple attempts

### 📚 Interactive Learning
- Three difficulty levels: Beginner, Intermediate, and Advanced
- **Interactive Exercises**:
  - 🎯 Drag-and-drop word matching
  - ✏️ Fill-in-the-blank exercises
  - 📝 Multiple choice quizzes
- Real-time feedback with visual indicators
- Lesson progress tracking

### 🎮 Gamification & Engagement
- **Points System**: Earn points for completing lessons and assessments
- **Achievements**: Unlock badges for milestones
- **Daily Streaks**: Build learning habits with streak tracking
- **Celebration Effects**: Confetti animations for achievements
- **Progress Dashboard**: Visual tracking of your learning journey

### 📱 Mobile-First Design
- **Progressive Web App (PWA)**: Install as a mobile app
- **Responsive Design**: Works perfectly on all devices
- **Touch-Optimized**: Large, easy-to-tap buttons
- **Offline Support**: Service worker for offline access
- **Fast Performance**: Built with Vite for optimal loading

### 🎨 Modern UI/UX
- Smooth animations with Framer Motion
- Beautiful gradient backgrounds
- Interactive hover effects
- Intuitive navigation
- Persistent progress with localStorage

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/NKEthio/Bridge.git
cd Bridge
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📁 Project Structure

```
Bridge/
├── src/
│   ├── components/         # Reusable React components
│   │   └── InteractiveLesson.jsx
│   ├── pages/             # Page components
│   │   ├── Home.jsx
│   │   ├── Assessment.jsx
│   │   ├── Course.jsx
│   │   └── Progress.jsx
│   ├── context/           # React Context for state management
│   │   └── AppContext.jsx
│   ├── utils/             # Utility functions and data
│   │   └── courseData.js
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
├── public/
│   ├── manifest.json      # PWA manifest
│   └── sw.js              # Service worker
└── index.html             # HTML template
```

## 🎓 Assessment Levels

- **Beginner** (0-4 correct answers): Focus on fundamental grammar and basic vocabulary
- **Intermediate** (5-7 correct answers): Build complex structures and expand vocabulary
- **Advanced** (8-10 correct answers): Master sophisticated language and academic skills

## 🛠️ Technologies Used

- **React 19** - UI framework
- **React Router** - Navigation
- **Framer Motion** - Animations
- **React DnD** - Drag and drop functionality
- **Canvas Confetti** - Celebration effects
- **Vite** - Build tool and dev server
- **Progressive Web App** - Mobile app capabilities

## 📱 Mobile App Installation

On mobile devices:
1. Open Bridge in your mobile browser
2. Tap the "Add to Home Screen" option
3. The app will be installed and can be opened like a native app

## 🎯 Future Enhancements

- Additional subjects (Mathematics, Science, etc.)
- User accounts with cloud sync
- More interactive exercise types
- Social features (compete with friends)
- Audio pronunciation guides
- Spaced repetition system
- Custom learning paths

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or feedback, please open an issue on GitHub.
