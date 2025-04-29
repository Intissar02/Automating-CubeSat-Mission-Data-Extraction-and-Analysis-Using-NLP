import React, { useState, useEffect } from 'react';

function SettingsTab() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en');

  const toggleDarkMode = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.body.className = newTheme ? 'dark-theme' : 'light-theme';
  };

  const handleLanguageChange = (e) => {
    const selectedLang = e.target.value;
    setLanguage(selectedLang);
    localStorage.setItem('language', selectedLang);
  };

  useEffect(() => {
    document.body.className = darkMode ? 'dark-theme' : 'light-theme';
  }, [darkMode]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="stars"></div>
        <div className="twinkling"></div>
      </div>

      <div className="z-10 backdrop-blur-md bg-white/10 border border-white/20 p-8 rounded-3xl shadow-2xl max-w-sm text-white">
        <h2 className="text-3xl font-bold mb-6 text-center tracking-wide">🌌 Settings</h2>

        <div className="mb-6 flex justify-between items-center text-lg">
          <span>Dark Mode</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-400 rounded-full peer peer-checked:bg-purple-500 transition-all"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md peer-checked:translate-x-5 transition-transform"></div>
          </label>
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-lg">Language</label>
          <select
            value={language}
            onChange={handleLanguageChange}
            className="w-full p-3 rounded-xl bg-gray-800 text-white border border-gray-600 focus:ring-2 focus:ring-purple-500"
          >
            <option value="en">English</option>
            <option value="fr">Français</option>
            <option value="ar">العربية</option>
          </select>
        </div>
      </div>

      <style jsx="true">{`
        .stars, .twinkling {
          position: absolute;
          top: 0;
          left: 0;
          width: 200%;
          height: 200%;
          display: block;
          background: transparent url('https://raw.githubusercontent.com/AllThingsSmitty/css-protips/master/media/starfield.png') repeat;
          animation: moveStars 100s linear infinite;
        }
        .twinkling {
          background: transparent url('https://raw.githubusercontent.com/AllThingsSmitty/css-protips/master/media/twinkling.png') repeat;
          animation: moveTwinkling 200s linear infinite;
        }
        @keyframes moveStars {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes moveTwinkling {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        body.dark-theme {
          background: radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%);
          color: white;
        }
        body.light-theme {
          background: #f9f9f9;
          color: black;
        }
      `}</style>
    </div>
  );
}

export default SettingsTab;
