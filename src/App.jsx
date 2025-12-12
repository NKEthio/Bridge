import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Home from './pages/Home';
import Assessment from './pages/Assessment';
import Course from './pages/Course';
import Progress from './pages/Progress';
import './App.css';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/assessment" element={<Assessment />} />
          <Route path="/course/:level" element={<Course />} />
          <Route path="/progress" element={<Progress />} />
        </Routes>
      </Router>
    </AppProvider>
  );
}

export default App;
