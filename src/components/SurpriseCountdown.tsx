import React, { useState, useEffect } from 'react';
import { Gift, Sparkles } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const SurpriseCountdown: React.FC = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [showSurprise, setShowSurprise] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const targetDate = new Date(2025, 8, 22, 0, 0, 0); // September 22, 2025
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const createFloatingHearts = () => {
    for (let i = 0; i < 15; i++) {
      setTimeout(() => {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.fontSize = '20px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        heart.style.animation = 'floatUp 3s ease-out forwards';
        
        document.body.appendChild(heart);
        
        setTimeout(() => {
          heart.remove();
        }, 3000);
      }, i * 200);
    }
  };

  const handleSurpriseClick = () => {
    setShowSurprise(!showSurprise);
    if (!showSurprise) {
      createFloatingHearts();
    }
  };

  return (
    <section id="surprise" className="py-20">
      <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} ref={ref}>
        <h2 className="text-4xl font-dancing text-center text-pink-400 mb-12 relative">
          A Little Surprise
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-pink-400 to-teal-400 rounded-full"></div>
        </h2>
        
        <div className="max-w-2xl mx-auto text-center">
          <button
            onClick={handleSurpriseClick}
            className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full text-xl font-semibold hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-2xl mb-8 inline-flex items-center gap-3"
          >
            <Gift size={24} />
            {showSurprise ? 'Hide Surprise' : 'Click for a Surprise!'}
            <Sparkles size={20} className="animate-pulse" />
          </button>
          
          {showSurprise && (
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl animate-fadeIn">
              <h3 className="text-2xl text-pink-400 mb-6">Special Date Countdown</h3>
              <p className="text-white/80 mb-8 text-lg">Our next special date is in:</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="bg-gradient-to-r from-pink-400 to-teal-400 rounded-2xl p-6 text-white">
                    <div className="text-3xl font-bold mb-2">{value.toString().padStart(2, '0')}</div>
                    <div className="text-sm opacity-90 capitalize">{unit}</div>
                  </div>
                ))}
              </div>
              
              <p className="text-white/60 mt-6 italic">
                "Every second counts when it's with you ❤️"
              </p>
            </div>
          )}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default SurpriseCountdown;