import React, { useState } from 'react';
import { ArrowRight, X, Twitter, Linkedin } from 'lucide-react';

const HomePage = () => {
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

  const [rankedCandidates, setRankedCandidates] = useState([]);
  const [availableCandidates, setAvailableCandidates] = useState([...candidates]);

  const AuthModal = ({ isOpen, onClose, type }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-sunset-dark rounded-lg p-8 max-w-md w-full text-sunset-light shadow-xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{type === 'login' ? 'Login' : 'Sign Up'}</h2>
            <button onClick={onClose} className="text-sunset-secondary hover:text-sunset-accent transition-colors">
              <X size={24} />
            </button>
          </div>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sunset-secondary mb-2">Email</label>
              <input 
                type="email" 
                className="w-full p-2 border rounded bg-gray-800 text-sunset-light border-gray-700 
                         focus:border-sunset-secondary focus:ring-1 focus:ring-sunset-secondary outline-none
                         transition-all duration-200" 
              />
            </div>
            
            {type === 'signup' && (
              <>
                <div>
                  <label className="block text-sunset-secondary mb-2">First Name</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded bg-gray-800 text-sunset-light border-gray-700 
                             focus:border-sunset-secondary focus:ring-1 focus:ring-sunset-secondary outline-none
                             transition-all duration-200" 
                  />
                </div>
                <div>
                  <label className="block text-sunset-secondary mb-2">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded bg-gray-800 text-sunset-light border-gray-700 
                             focus:border-sunset-secondary focus:ring-1 focus:ring-sunset-secondary outline-none
                             transition-all duration-200" 
                  />
                </div>
              </>
            )}
            
            <div>
              <label className="block text-sunset-secondary mb-2">Password</label>
              <input 
                type="password" 
                className="w-full p-2 border rounded bg-gray-800 text-sunset-light border-gray-700 
                         focus:border-sunset-secondary focus:ring-1 focus:ring-sunset-secondary outline-none
                         transition-all duration-200" 
              />
            </div>
            
            <button className="w-full bg-sunset-primary text-sunset-light py-2 rounded hover:bg-opacity-90 
                           transition-all duration-200 transform hover:scale-[1.02]">
              {type === 'login' ? 'Login' : 'Sign Up'}
            </button>
          </form>
        </div>
      </div>
    );
  };

  const CandidateCard = ({ candidate }) => (
    <div className="bg-sunset-dark rounded-lg p-6 space-y-4 transform transition-all duration-200 hover:scale-[1.02]
                  border border-transparent hover:border-sunset-secondary">
      <img
        src={candidate.imageUrl}
        alt={candidate.name}
        className="w-full h-48 object-cover rounded-lg"
      />
      <div>
        <h3 className="text-xl font-bold text-sunset-light">{candidate.name}</h3>
        <p className="text-sunset-secondary">{candidate.party}</p>
        <p className="text-gray-300 mt-2">{candidate.slogan}</p>
      </div>
      <div className="flex space-x-4 pt-4">
        <Twitter className="text-sunset-secondary hover:text-sunset-accent cursor-pointer transition-colors" size={20} />
        <Linkedin className="text-sunset-secondary hover:text-sunset-accent cursor-pointer transition-colors" size={20} />
      </div>
    </div>
  );

  const RankChoiceSection = () => {
    const handleDragStart = (e, candidate) => {
      e.dataTransfer.setData('candidate', JSON.stringify(candidate));
    };

    const handleDragOver = (e) => {
      e.preventDefault();
    };

    const handleDrop = (e, index) => {
      e.preventDefault();
      const candidate = JSON.parse(e.dataTransfer.getData('candidate'));
      
      setRankedCandidates(prev => {
        const newRanked = [...prev];
        // Remove candidate if already ranked
        const existingIndex = newRanked.findIndex(c => c.name === candidate.name);
        if (existingIndex !== -1) {
          newRanked.splice(existingIndex, 1);
        }
        // Insert at new position
        newRanked.splice(index, 0, candidate);
        return newRanked;
      });

      setAvailableCandidates(prev => 
        prev.filter(c => c.name !== candidate.name)
      );
    };

    const handleRemoveRank = (candidateToRemove) => {
      setRankedCandidates(prev => 
        prev.filter(c => c.name !== candidateToRemove.name)
      );
      setAvailableCandidates(prev => [...prev, candidateToRemove]);
    };

    return (
      <div className="py-1">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-sunset-light mb-8 text-center">
            Rank Your Candidates
          </h2>
          
          {/* Available Candidates */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-4 justify-center">
              {availableCandidates.map(candidate => (
                <div
                  key={candidate.name}
                  draggable
                  onDragStart={(e) => handleDragStart(e, candidate)}
                  className="bg-sunset-dark p-4 rounded-lg cursor-move border border-sunset-secondary
                           hover:border-sunset-accent transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <img
                      src={candidate.imageUrl}
                      alt={candidate.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <span className="text-sunset-light">{candidate.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ranking Area */}
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl text-sunset-secondary mb-4">Your Rankings</h3>
            <div className="space-y-3">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  className="border-2 border-dashed border-sunset-secondary rounded-lg p-4
                           min-h-[80px] flex items-center justify-between
                           hover:border-sunset-accent transition-all duration-200"
                >
                  <div className="flex items-center">
                    <span className="text-2xl text-sunset-primary font-bold mr-4">
                      #{index + 1}
                    </span>
                    {rankedCandidates[index] && (
                      <div className="flex items-center space-x-3">
                        <img
                          src={rankedCandidates[index].imageUrl}
                          alt={rankedCandidates[index].name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <span className="text-sunset-light">
                          {rankedCandidates[index].name}
                        </span>
                      </div>
                    )}
                  </div>
                  {rankedCandidates[index] && (
                    <button
                      onClick={() => handleRemoveRank(rankedCandidates[index])}
                      className="text-sunset-secondary hover:text-sunset-accent transition-colors"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-sunset-dark w-full">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-sunset-primary to-sunset-secondary p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex space-x-6">
            <a href="#" className="text-sunset-light font-medium hover:text-sunset-accent transition-colors">Democracy App</a>
            <a href="#candidates" className="text-sunset-light hover:text-sunset-accent transition-colors">Candidates</a>
            <a href="#about" className="text-sunset-light hover:text-sunset-accent transition-colors">About</a>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={() => setIsSignUpOpen(true)}
              className="text-sunset-light hover:bg-sunset-primary/20 px-4 py-2 rounded transition-all duration-200"
            >
              Sign Up
            </button>
            <button 
              onClick={() => setIsLoginOpen(true)}
              className="bg-sunset-light text-sunset-primary px-4 py-2 rounded hover:bg-sunset-accent 
                      transition-all duration-200"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Title "Democracy App" Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-sunset-light mb-6 
                       bg-gradient-to-r from-sunset-primary via-sunset-secondary to-sunset-accent 
                       bg-clip-text text-transparent">
            Democracy App
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            Participate in Democracy through ranked choice voting and meaningful discourse 💡
          </p>
          <button 
            onClick={() => setIsSignUpOpen(true)}
            className="bg-sunset-primary text-sunset-light px-8 py-3 rounded-lg text-lg 
                     hover:bg-sunset-secondary inline-flex items-center transform transition-all 
                     duration-200 hover:scale-[1.02] shadow-lg"
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
        <div id="candidates" className="py-8">
          <h2 className="text-3xl font-bold text-sunset-light mb-8 text-center">Featured Candidates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {candidates.map((candidate, index) => (
              <CandidateCard key={index} candidate={candidate} />
            ))}
          </div>
        </div>
      </div>

      {/* Rank Choice Voting Section */}
      <RankChoiceSection />

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