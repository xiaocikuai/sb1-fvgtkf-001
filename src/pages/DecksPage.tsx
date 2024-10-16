import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Book, Brain, Lightbulb, Zap, Target, Trophy, BarChart2, Settings } from 'lucide-react';

const navItems = [
  { icon: Book, label: '我的卡包', category: 'my' },
  { icon: Brain, label: '全部卡包', category: 'all' },
  { icon: Lightbulb, label: '小学', category: 'primary' },
  { icon: Zap, label: '初中', category: 'junior' },
  { icon: Target, label: '高中', category: 'senior' },
  { icon: Trophy, label: '成人', category: 'adult' },
  { icon: BarChart2, label: 'KPF', category: 'kpf' },
  { icon: Settings, label: '新概念', category: 'newconcept' },
  { icon: Settings, label: 'Study With Joe', category: 'studywithjoe' },
];

const decks = [
  { id: 1, title: '小学｜同步｜人教版', wordCount: 795, category: 'primary' },
  { id: 2, title: '初中｜同步｜人教版', wordCount: 2294, category: 'junior' },
  { id: 3, title: '初中｜中考｜真题高频词', wordCount: 3000, category: 'junior' },
  { id: 4, title: '高中｜同步｜人教版', wordCount: 2195, category: 'senior' },
  { id: 5, title: '高中｜同步｜外研版', wordCount: 1668, category: 'senior' },
  { id: 6, title: '高中｜同步｜北师大版', wordCount: 1905, category: 'senior' },
  { id: 7, title: '高中｜同步｜译林版', wordCount: 1000, category: 'senior' },
  { id: 8, title: '高中｜高考｜真题高频词', wordCount: 1000, category: 'senior' },
  { id: 9, title: '成人｜四级｜真题高频词', wordCount: 1000, category: 'adult' },
  { id: 10, title: '成人｜六级｜真题高频词', wordCount: 1000, category: 'adult' },
  { id: 11, title: '成人｜考研｜真题高频词', wordCount: 1000, category: 'adult' },
  { id: 12, title: '成人｜托福｜真题高频词', wordCount: 1000, category: 'adult' },
  { id: 13, title: '成人｜雅思｜真题高频词', wordCount: 1000, category: 'adult' },
  { id: 14, title: 'KPF｜KET｜真题高频词', wordCount: 1000, category: 'kpf' },
  { id: 15, title: 'KPF｜PET｜真题高频词', wordCount: 1000, category: 'kpf' },
  { id: 16, title: 'KPF｜FCE｜真题高频词', wordCount: 1000, category: 'kpf' },
  { id: 17, title: '新概念｜第一册', wordCount: 1000, category: 'newconcept' },
  { id: 18, title: '新概念｜第二册', wordCount: 1000, category: 'newconcept' },
  { id: 19, title: '新概念｜第三册', wordCount: 1000, category: 'newconcept' },
  { id: 20, title: '新概念｜第四册', wordCount: 1000, category: 'newconcept' },
  { id: 21, title: 'Study With Joe', wordCount: 1000, category: 'studywithjoe' },
];

const categoryDescriptions = {
  all: "探索我们精心设计的词汇卡包，涵盖从小学到大学各个阶段的英语学习需求。每个卡包都包含精选的词块，帮助你更有效地掌握英语词汇。选择适合你当前学习阶段的卡包，开始你的词汇学习之旅吧！",
  primary: "小学阶段是英语学习的启蒙时期。我们的小学卡包专为小学生设计，包含基础词汇和简单句型，通过有趣的图片和互动练习，激发孩子们的学习兴趣，为今后的英语学习打下坚实基础。",
  junior: "初中阶段是英语学习的关键时期。我们的初中卡包涵盖了初中教材的核心词汇和语法点，同时融入中考真题高频词，帮助学生在掌握课本知识的同时，为中考做好充分准备。",
  senior: "高中阶段是英语学习的深化期。我们的高中卡包不仅包含各版本教材的同步词汇，还特别收录了高考真题高频词。通过系统化的学习，帮助学生构建丰富的词汇体系，为高考和未来的英语应用打下坚实基础。",
  adult: "成人英语学习需求多样化，我们的成人卡包涵盖了从大学四六级到考研、托福、雅思等不同层次的词汇。无论你是为了学业、职场还是个人兴趣学习英语，都能找到适合自己的词汇卡包。",
  kpf: "KPF（剑桥通用五级考试）卡包专为准备剑桥英语考试的学习者设计。从KET到FCE，覆盖不同级别的考试词汇，帮助你逐步提升英语水平，顺利通过剑桥英语认证。",
  newconcept: "新概念英语是广受欢迎的英语学习教材。我们的新概念卡包涵盖了从第一册到第四册的核心词汇，帮助学习者系统地学习和巩固新概念英语中的重点词汇，提高英语综合能力。",
  studywithjoe: "Study With Joe 卡包是基于知名英语教育博主Joe的教学内容设计的。这个卡包包含了Joe课程中的核心词汇和表达，适合那些喜欢Joe教学风格的学习者，帮助你更好地理解和运用Joe课程中的语言点。",
};

const DecksPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredDecks = selectedCategory === 'all' 
    ? decks 
    : decks.filter(deck => deck.category === selectedCategory);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex">
          {/* Left Sidebar Navigation */}
          <div className="w-64 bg-gray-100 p-6 space-y-4">
            {navItems.map((item, index) => (
              <button 
                key={index} 
                className={`flex items-center space-x-3 w-full px-4 py-2 text-left ${
                  selectedCategory === item.category 
                    ? 'bg-blue-500 text-white' 
                    : 'text-gray-700 hover:bg-gray-200'
                } rounded-full transition duration-150 ease-in-out`}
                onClick={() => setSelectedCategory(item.category)}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-6">
            {/* Decks Introduction */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {navItems.find(item => item.category === selectedCategory)?.label || '全部卡包'}
              </h1>
              <p className="text-gray-600">
                {categoryDescriptions[selectedCategory as keyof typeof categoryDescriptions]}
              </p>
            </div>

            {/* Decks Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDecks.map((deck) => (
                <Link to={`/decks/${deck.id}`} key={deck.id} className="bg-gradient-to-br from-blue-100 to-indigo-100 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{deck.title}</h3>
                  <p className="text-gray-600">{deck.wordCount} 个单词</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecksPage;