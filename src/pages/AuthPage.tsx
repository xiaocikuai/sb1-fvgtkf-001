import React, { useState } from 'react';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgetPassword, setIsForgetPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isSendingCode, setIsSendingCode] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isForgetPassword) {
      console.log('Resetting password', { phone, verificationCode, password });
    } else {
      console.log(isLogin ? 'Logging in' : 'Signing up', { phone, password, username, verificationCode });
    }
  };

  const handleSendCode = () => {
    if (isSendingCode) return;
    setIsSendingCode(true);
    setCountdown(60);
    // Here you would typically send the verification code
    console.log('Sending verification code to', phone);

    const timer = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 1) {
          clearInterval(timer);
          setIsSendingCode(false);
          return 0;
        }
        return prevCountdown - 1;
      });
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] w-full bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600 px-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="px-8 py-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {isForgetPassword ? '找回密码' : (isLogin ? '登录' : '注册')}
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && !isForgetPassword && (
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                  用户名
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="username"
                  type="text"
                  placeholder="请输入用户名"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                手机号码
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="phone"
                type="tel"
                placeholder="请输入手机号码"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                pattern="^1[3-9]\d{9}$"
                title="请输入有效的11位手机号码"
              />
            </div>
            {(isForgetPassword || !isLogin) && (
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="verificationCode">
                  验证码
                </label>
                <div className="flex">
                  <input
                    className="appearance-none border rounded-l w-2/3 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="verificationCode"
                    type="text"
                    placeholder="请输入验证码"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={handleSendCode}
                    disabled={isSendingCode}
                    className={`w-1/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline transition duration-300 ${isSendingCode ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isSendingCode ? `${countdown}s` : '发送验证码'}
                  </button>
                </div>
              </div>
            )}
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                {isForgetPassword ? '新密码' : '密码'}
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder={isForgetPassword ? "请输入新密码" : "请输入密码"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <div className="flex flex-col space-y-4 mt-6">
              <button
                className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                type="submit"
              >
                {isForgetPassword ? '重置密码' : (isLogin ? '登录' : '注册')}
              </button>
              <div className="flex justify-between items-center text-sm">
                <button
                  className="text-blue-500 hover:text-blue-800 transition duration-300"
                  type="button"
                  onClick={() => {
                    if (isForgetPassword) {
                      setIsForgetPassword(false);
                      setIsLogin(true);
                    } else {
                      setIsLogin(!isLogin);
                    }
                  }}
                >
                  {isForgetPassword ? '返回登录' : (isLogin ? '没有账号？去注册' : '已有账号？去登录')}
                </button>
                {isLogin && !isForgetPassword && (
                  <button
                    className="text-blue-500 hover:text-blue-800 transition duration-300"
                    type="button"
                    onClick={() => setIsForgetPassword(true)}
                  >
                    忘记密码？
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;