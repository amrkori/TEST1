import React, { useEffect, useState } from 'react';

const Header: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <header className="relative overflow-hidden bg-gradient-to-r from-pink-500 via-red-500 to-purple-600 text-white py-24 text-center">
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-repeat animate-float" 
             style={{
               backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
               backgroundSize: '50px 50px'
             }}>
        </div>
      </div>
      
      <div className="relative z-10">
        <h1 className={`font-dancing text-6xl md:text-7xl mb-4 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          Maramy
        </h1>
        <p className={`text-xl md:text-2xl opacity-90 transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          Our Story The Best Time Of My Life
        </p>
      </div>
    </header>
  );
};

export default Header;