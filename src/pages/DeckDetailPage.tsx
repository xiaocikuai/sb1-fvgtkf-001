import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Book, 
  Brain, 
  Lightbulb, 
  Zap, 
  Target, 
  Trophy, 
  BarChart2, 
  Settings, 
  ArrowLeft,
  PlayCircle,
  ClipboardList,
  Calendar,
  Play,
  XCircle,
  Star,
  Shuffle
} from 'lucide-react';
import { useFavoriteContext } from '../contexts/FavoriteContext';

const navItems = [
  { icon: Book, label: '小词快读', mode: 'quick-read', description: '快速掌握音标（元音、辅音和字母组合）的发音规则，以及单词的拼读技巧，旨在帮助你更快速、更有效地记忆单词。' },
  { icon: Brain, label: '小词快记', mode: 'quick-memorize', description: '通过多种记忆技巧和方法，如联想记忆、图像记忆等，帮助你快速记忆单词的拼写和含义。' },
  { icon: Lightbulb, label: '小词快译', mode: 'quick-translate', description: '训练你快速理解和翻译单词在不同语境中的含义，提高词汇应用能力和语言转换能力。' },
  { icon: Zap, label: '小词快选', mode: 'quick-choose', description: '通过多选题形式，快速测试和巩固你对单词的理解和记忆，提高词汇辨识能力。' },
  { icon: Target, label: '小词快变', mode: 'quick-change', description: '学习单词的各种变化形式，如时态、词性转换等，增强对单词灵活运用的能力。' },
  { icon: Trophy, label: '小词快同', mode: 'quick-synonym', description: '学习和练习同义词，扩大词汇量，提高语言表达的丰富性和准确性。' },
  { icon: BarChart2, label: '小词快反', mode: 'quick-antonym', description: '学习和练习反义词，加深对词义的理解，提高语言表达的对比性和精确性。' },
  { icon: Settings, label: '小词快写', mode: 'quick-write', description: '通过写作练习，将所学单词应用到实际语境中，提高词汇的实际运用能力。' },
];

const learningModes = [
  { title: '免费试学', content: '好不好，体验了才知道', mode: 'free-trial', icon: PlayCircle },
  { title: '学前测', content: '测一下，才知道自己几斤几两', mode: 'pre-test', icon: ClipboardList },
  { title: '学习计划设置', content: '学习也要量力而行', mode: 'learning-plan', icon: Calendar },
  { title: '开始学习', content: '我就是热爱学习，别拦着我', mode: 'start-learning', icon: Play },
  { title: '错题本', content: '有错就改，才是好同志', mode: 'error-book', icon: XCircle },
  { title: '收藏夹', content: '收藏的都是精华', mode: 'favorites', icon: Star },
  { title: '随便刷刷', content: '你想刷啥？我随便刷刷', mode: 'random-review', icon: Shuffle }
];

const DeckDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [selectedMode, setSelectedMode] = useState(navItems[0].mode);
  const { favoriteCards } = useFavoriteContext();

  const handleBack = () => {
    navigate('/decks');
  };

  const handleModeSelect = (mode: string) => {
    setSelectedMode(mode);
  };

  const handleLearningModeSelect = (mode: string) => {
    navigate(`/decks/${id}/learn/${mode}`);
  };

  const selectedNavItem = navItems.find(item => item.mode === selectedMode);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex">
          {/* Left Sidebar Navigation */}
          <div className="w-64 bg-gray-100 p-6 space-y-4">
            {/* Back Button */}
            <button
              onClick={handleBack}
              className="flex items-center space-x-3 w-full px-4 py-2 text-left text-blue-600 hover:text-blue-800 hover:bg-gray-200 rounded-full transition duration-300 ease-in-out mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>返回卡包</span>
            </button>
            {navItems.map((item, index) => (
              <button 
                key={index} 
                className={`flex items-center space-x-3 w-full px-4 py-2 text-left ${
                  selectedMode === item.mode 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                } rounded-full transition duration-150 ease-in-out`}
                onClick={() => handleModeSelect(item.mode)}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-6">
            {/* Mode Introduction */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{selectedNavItem?.label}</h1>
              <p className="text-gray-600">
                {selectedNavItem?.description}
              </p>
            </div>

            {/* Learning Modes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {learningModes.map((item, index) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-br from-blue-100 to-indigo-100 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out cursor-pointer"
                  onClick={() => handleLearningModeSelect(`${selectedMode}-${item.mode}`)}
                >
                  <div className="flex items-center mb-2">
                    <item.icon className="w-6 h-6 mr-2 text-blue-600" />
                    <h3 className="text-xl font-semibold text-gray-800">{item.title}</h3>
                  </div>
                  <p className="text-gray-600">{item.content}</p>
                  {item.mode === 'favorites' && (
                    <p className="text-sm text-blue-600 mt-2">
                      {favoriteCards.length} 张卡片
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeckDetailPage;