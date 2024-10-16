import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DecksPage from './pages/DecksPage';
import AuthPage from './pages/AuthPage';
import DeckDetailPage from './pages/DeckDetailPage';
import LearningPage from './pages/LearningPage';
import { FavoriteProvider } from './contexts/FavoriteContext';

function App() {
  return (
    <FavoriteProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow flex">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/decks" element={<DecksPage />} />
              <Route path="/decks/:id" element={<DeckDetailPage />} />
              <Route path="/decks/:id/learn/:mode" element={<LearningPage />} />
              <Route path="/auth" element={<AuthPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </FavoriteProvider>
  );
}

export default App;