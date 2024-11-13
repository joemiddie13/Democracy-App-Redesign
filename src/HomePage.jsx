import React, { useState } from 'react';
import { ArrowRight, X, Twitter, Linkedin } from 'lucide-react';

const HomePage = () => {
  // Added wrapper class fix for full width
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);

  const candidates = [
    {
      name: 'Rocko',
      party: 'Bark Party',
      slogan: 'Pro-fetch!',
      imageUrl: '/public/Rocko.jpeg'
    },
    {
      name: 'Holly',
      party: 'Sniffers Union',
      slogan: 'More parks in neighborhoods!',
      imageUrl: '/public/Holly.jpeg'
    },
    {
      name: 'Bishop',
      party: 'Tail Waggers',
      slogan: 'Free treats for all!',
      imageUrl: '/public/Bishop.png'
    },
    {
      name: 'Arabella',
      party: 'Howl Movement',
      slogan: 'Anti-mailman!',
      imageUrl: '/public/Arabella.png'
    }
  ];

  const AuthModal = ({ isOpen, onClose, type }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-gray-900 rounded-lg p-8 max-w-md w-full text-white">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{type === 'login' ? 'Login' : 'Sign Up'}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          
          <form className="space-y-4">
            <div>
              <label className="block text-gray-300 mb-2">Email</label>
              <input type="email" className="w-full p-2 border rounded bg-gray-800 text-white border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none" />
            </div>
            
            {type === 'signup' && (
              <>
                <div>
                  <label className="block text-gray-300 mb-2">First Name</label>
                  <input type="text" className="w-full p-2 border rounded bg-gray-800 text-white border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none" />
                </div>
                <div>
                  <label className="block text-gray-300 mb-2">Last Name</label>
                  <input type="text" className="w-full p-2 border rounded bg-gray-800 text-white border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none" />
                </div>
              </>
            )}
            
            <div>
              <label className="block text-gray-300 mb-2">Password</label>
              <input type="password" className="w-full p-2 border rounded bg-gray-800 text-white border-gray-700 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none" />
            </div>
            
            <button className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
              {type === 'login' ? 'Login' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    );
  };

  const CandidateCard = ({ candidate }) => (
    <div className="bg-gray-900 rounded-lg p-6 space-y-4">
      <img
        src={candidate.imageUrl}
        alt={candidate.name}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div>
        <h3 className="text-xl font-bold text-white">{candidate.name}</h3>
        <p className="text-purple-400">{candidate.party}</p>
        <p className="text-gray-300 mt-2">{candidate.slogan}</p>
      </div>
      <div className="flex space-x-4 pt-4">
        <Twitter className="text-gray-400 hover:text-white cursor-pointer" size={20} />
        <Linkedin className="text-gray-400 hover:text-white cursor-pointer" size={20} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 w-full">
      {/* Navigation */}
      <nav className="bg-purple-600 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex space-x-6">
            <a href="#" className="text-white font-medium">Democracy App</a>
            <a href="#candidates" className="text-white">Candidates</a>
            <a href="#about" className="text-white">About</a>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={() => setIsSignUpOpen(true)}
              className="text-white hover:bg-purple-700 px-4 py-2 rounded"
            >
              Sign Up
            </button>
            <button 
              onClick={() => setIsLoginOpen(true)}
              className="bg-white text-purple-600 px-4 py-2 rounded hover:bg-gray-100"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-white mb-6">Democracy App</h1>
          <p className="text-xl text-gray-300 mb-8">
            Participate in Democracy through ranked choice voting and meaningful discourse 💡
          </p>
          <button 
            onClick={() => setIsSignUpOpen(true)}
            className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg hover:bg-purple-700 inline-flex items-center"
          >
            Get Started
            <ArrowRight className="ml-2" size={20} />
          </button>
        </div>

        {/* Round Table Illustration */}
        <div className="max-w-3xl mx-auto mb-16">
          <img
            src="/public/Democracy-Table.jpg"
            alt="Democracy illustration"
            className="w-full rounded-lg shadow-2xl"
          />
        </div>

        {/* Candidates Grid */}
        <div id="candidates" className="py-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Candidates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {candidates.map((candidate, index) => (
              <CandidateCard key={index} candidate={candidate} />
            ))}
          </div>
        </div>
      </div>

      {/* Auth Modals */}
      <AuthModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        type="login" 
      />
      <AuthModal 
        isOpen={isSignUpOpen} 
        onClose={() => setIsSignUpOpen(false)} 
        type="signup" 
      />
    </div>
  );
};

export default HomePage;