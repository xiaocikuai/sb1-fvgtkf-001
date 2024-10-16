import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Settings,
  XCircle,
  Filter,
  Calendar,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Star,
} from 'lucide-react';
import { useFavoriteContext } from '../contexts/FavoriteContext';

interface LearningCard {
  id: number;
  question: string;
  answer: string;
  isFavorite: boolean;
}

const LearningPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentMode, setCurrentMode] = useState<'learning' | 'fillBlank'>('learning');
  const [showAnswer, setShowAnswer] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const { favoriteCards, toggleFavorite } = useFavoriteContext();

  // Sample learning cards data
  const [learningCards, setLearningCards] = useState<LearningCard[]>([
    { id: 1, question: 'an exchange student', answer: '一名交换生', isFavorite: false },
    { id: 2, question: 'a round-trip ticket', answer: '往返票', isFavorite: false },
    { id: 3, question: 'to make a reservation', answer: '预订', isFavorite: false },
    { id: 4, question: 'to check in', answer: '登记入住', isFavorite: false },
    { id: 5, question: 'luggage', answer: '行李', isFavorite: false },
  ]);

  const handleBack = () => {
    navigate(`/decks/${id}`);
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  const handleModeChange = (mode: 'learning' | 'fillBlank') => {
    setCurrentMode(mode);
    setShowAnswer(false);
  };

  const handlePrevCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
    setShowAnswer(false);
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex < learningCards.length - 1 ? prevIndex + 1 : prevIndex));
    setShowAnswer(false);
  };

  const handleToggleFavorite = (card: LearningCard) => {
    toggleFavorite(card);
    setLearningCards(prevCards =>
      prevCards.map(c =>
        c.id === card.id ? { ...c, isFavorite: !c.isFavorite } : c
      )
    );
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowDown') {
        setShowAnswer((prevState) => !prevState);
      } else if (event.key === 'ArrowLeft') {
        handlePrevCard();
      } else if (event.key === 'ArrowRight') {
        handleNextCard();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const currentCard = learningCards[currentCardIndex];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100 flex flex-col overflow-hidden">
      <div className="flex-grow flex flex-col w-full">
        <div className="pt-8 pb-4 px-20 flex justify-between items-center">
          <button
            onClick={handleBack}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回</span>
          </button>

          <div className="flex border border-blue-300 rounded-lg overflow-hidden">
            <button
              onClick={() => handleModeChange('learning')}
              className={`px-2 py-1 ${
                currentMode === 'learning'
                  ? 'bg-blue-600 text-white'
                  : 'text-blue-600 hover:bg-blue-100'
              } transition-colors duration-300`}
            >
              学习模式
            </button>
            <button
              onClick={() => handleModeChange('fillBlank')}
              className={`px-2 py-1 ${
                currentMode === 'fillBlank'
                  ? 'bg-blue-600 text-white'
                  : 'text-blue-600 hover:bg-blue-100'
              } transition-colors duration-300`}
            >
              填空模式
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition duration-300">
              <Calendar className="w-5 h-5" />
              <span>学习计划</span>
            </button>
            <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition duration-300">
              <Filter className="w-5 h-5" />
              <span>筛选</span>
            </button>
            <button className="flex items-center space-x-1 text-red-600 hover:text-red-800 transition duration-300">
              <XCircle className="w-5 h-5" />
              <span>错题本</span>
            </button>
            <button className="flex items-center space-x-1 text-blue-600 hover:text-red-800 transition duration-300">
              <RotateCcw className="w-5 h-5" />
              <span>重新学</span>
            </button>
            <button className="flex items-center space-x-1 text-blue-600 hover:text-blue-800 transition duration-300">
              <Settings className="w-5 h-5" />
              <span>设置</span>
            </button>
          </div>
        </div>

        <div className="flex-grow flex justify-center items-center px-8 pb-4">
          <button
            onClick={handlePrevCard}
            className="text-blue-600 hover:text-blue-800 transition duration-300 mr-4"
            disabled={currentCardIndex === 0}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div
            className="w-full h-full bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transition-all duration-300 ease-in-out hover:shadow-2xl flex flex-col relative"
            onClick={toggleAnswer}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleToggleFavorite(currentCard);
              }}
              className="absolute top-4 left-4 text-yellow-500 hover:text-yellow-600 transition duration-300"
            >
              <Star className={`w-6 h-6 ${currentCard.isFavorite ? 'fill-current' : ''}`} />
            </button>

            {/* 这是 question 区域 */}
            <div className="flex-1 flex items-center justify-center p-8 text-4xl font-bold text-gray-800">
              {currentMode === 'learning'
                ? currentCard.question
                : currentCard.answer}
            </div>


             {/* 这是中线区域 */}
            <div className="border-t border-gray-200 w-[95%] mx-auto"></div>

            
             {/* 这是 answer 区域 */}
            <div className="flex-1 flex items-center justify-center p-8 text-4xl font-bold text-gray-800">
              {showAnswer ? (
                currentMode === 'learning' ? currentCard.answer : currentCard.question
              ) : (
                <span className="text-gray-200">
                  press ↓ to toggle {currentMode === 'learning' ? 'answer' : 'question'}
                </span>
              )}
            </div>

            
            <div className="pb-4 text-center text-gray-600">
              {currentCardIndex + 1} / {learningCards.length}
            </div>
          </div>

          <button
            onClick={handleNextCard}
            className="text-blue-600 hover:text-blue-800 transition duration-300 ml-4"
            disabled={currentCardIndex === learningCards.length - 1}
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LearningPage;