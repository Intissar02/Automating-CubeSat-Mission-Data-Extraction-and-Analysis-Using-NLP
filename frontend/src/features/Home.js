import React from 'react';

function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 p-6">
      <div className="bg-gray-950 bg-opacity-80 p-10 rounded-2xl shadow-2xl max-w-3xl text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
          Welcome to <span className="text-indigo-400">CubeSat Central</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mb-4 leading-relaxed">
          Your centralized hub for CubeSat missions — designed for researchers, professionals, and space enthusiasts.
        </p>
        <p className="text-md md:text-lg text-gray-400 mb-8 leading-relaxed">
          Discover mission overviews, explore advanced technology data, and break down components — all in one clean, accessible platform.
        </p>
        <div className="text-indigo-300 text-xl font-semibold mb-4">
          🚀 Empowering space exploration through open and structured data.
        </div>
        <div className="flex justify-center gap-4 mt-6">
          <a 
            href="/dashboard"
            className="bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-3 rounded-full transition shadow-lg"
          >
            Explore Dashboard
          </a>
          <a 
            href="/about"
            className="border border-indigo-400 hover:bg-indigo-500 hover:text-white text-indigo-300 px-6 py-3 rounded-full transition"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;
