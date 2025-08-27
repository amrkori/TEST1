import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const Quotes: React.FC = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [currentQuote, setCurrentQuote] = useState(0);

  const quotes = [
    "I love you not only for what you are, but for what I am when I am with you.",
    "In all the world, there is no heart for me like yours. In all the world, there is no love for you like mine.",
    "You don't love someone for their looks, or their clothes, or for their fancy car, but because they sing a song only you can hear.",
    "The best thing to hold onto in life is each other.",
    "You are my today and all of my tomorrows.",
    "I choose you. And I'll choose you over and over and over. Without pause, without a doubt, in a heartbeat. I'll keep choosing you."
  ];

  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isInView, quotes.length]);

  const nextQuote = () => {
    setCurrentQuote((prev) => (prev + 1) % quotes.length);
  };

  const prevQuote = () => {
    setCurrentQuote((prev) => (prev - 1 + quotes.length) % quotes.length);
  };

  return (
    <section id="quotes" className="py-20">
      <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} ref={ref}>
        <h2 className="text-4xl font-dancing text-center text-pink-400 mb-12 relative">
          Quotes That Remind Me of Us
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-pink-400 to-teal-400 rounded-full"></div>
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl relative">
            <Quote size={64} className="text-pink-400/30 absolute top-4 left-4" />
            
            <div className="text-center relative z-10">
              <p className="text-xl md:text-2xl text-white italic leading-relaxed mb-8 min-h-[120px] flex items-center justify-center">
                "{quotes[currentQuote]}"
              </p>
              
              <div className="flex items-center justify-center space-x-4">
                <button
                  onClick={prevQuote}
                  className="p-2 rounded-full bg-pink-500/20 hover:bg-pink-500/40 transition-all duration-300 text-white"
                >
                  <ChevronLeft size={24} />
                </button>
                
                <div className="flex space-x-2">
                  {quotes.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuote(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentQuote ? 'bg-pink-400' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextQuote}
                  className="p-2 rounded-full bg-pink-500/20 hover:bg-pink-500/40 transition-all duration-300 text-white"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quotes;