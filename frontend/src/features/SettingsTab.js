import React, { useState, useEffect } from 'react';

function SettingsTab() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'en';
  });

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
    <div className="p-4 rounded-2xl shadow-lg bg-white dark:bg-gray-900 text-black dark:text-white">
      <h2 className="text-xl font-bold mb-4">Settings</h2>

      <div className="mb-4">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={toggleDarkMode}
            className="accent-blue-500"
          />
          <span>Enable Dark Mode</span>
        </label>
      </div>

      <div className="mb-4">
        <label className="block mb-1">Language</label>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="p-2 rounded bg-gray-200 dark:bg-gray-800 dark:text-white"
        >
          <option value="en">English</option>
          <option value="fr">Français</option>
          <option value="ar">العربية</option>
        </select>
      </div>
    </div>
  );
}

export default SettingsTab;
