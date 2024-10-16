import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain } from 'lucide-react';

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 模拟登录/登出功能
  const toggleAuth = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <header className="bg-gradient-to-r from-blue-900 to-purple-900 text-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center text-xl font-bold text-yellow-300 hover:text-yellow-200 transition-colors duration-300">
          <Brain className="mr-2" />
          小词块
        </Link>
        <ul className="flex space-x-6">
          <li><Link to="/" className="hover:text-yellow-300 transition-colors duration-300">首页</Link></li>
          <li><Link to="/decks" className="hover:text-yellow-300 transition-colors duration-300">卡包</Link></li>
          <li>
            <Link 
              to="/auth" 
              className="hover:text-yellow-300 transition-colors duration-300"
              onClick={toggleAuth}
            >
              {isLoggedIn ? '登出' : '注册 / 登录'}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;