import React from 'react';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <div className="text-center max-w-3xl px-4 py-16">
        <Brain className="w-24 h-24 mx-auto mb-8 text-yellow-300" />
        <h1 className="text-5xl font-extrabold mb-6 leading-tight">
          欢迎来到
          <span className="block text-yellow-300 mt-4">小词块学习平台</span>
        </h1>
        <p className="text-2xl mb-10 font-light">
          小词块 —— 微语境快速背单词
        </p>
        <p className="text-xl mb-12 max-w-2xl mx-auto">
          通过情境化学习和智能复习，轻松掌握词汇。让学习更高效，更有趣。
        </p>
        <Link 
          to="/decks" 
          className="inline-block bg-yellow-400 text-blue-900 px-8 py-4 rounded-full text-xl font-semibold hover:bg-yellow-300 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          开始体验
        </Link>
      </div>
    </div>
  );
};

export default HomePage;