import React from 'react';
import { Calendar } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const LoveNotes: React.FC = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const notes = [
    {
      date: 'February 14, 2025',
      content: 'Happy Valentine\'s Day to you my one and only. I will always be here for you in ups and downs. I will never drift away and I assure you that I\'m here to stay.'
    },
    {
      date: 'February 25, 2025',
      content: 'Three months with you feel like both a second and a lifetime. From our jokes to our deep talks, every second is magic. I LOVE YOUUU MAHAL KO!'
    },
    {
      date: 'March 1, 2025',
      content: 'Every sunrise reminds me of your smile, and every sunset makes me grateful for another day with you. You are my everything, Maramy.'
    },
    {
      date: 'Today',
      content: 'Building this website for you reminds me of how lucky I am to have someone worth celebrating every single day. You deserve all the love in the world.'
    }
  ];

  return (
    <section id="notes" className="py-20">
      <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} ref={ref}>
        <h2 className="text-4xl font-dancing text-center text-pink-400 mb-12 relative">
          Love Notes
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-pink-400 to-teal-400 rounded-full"></div>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {notes.map((note, index) => (
            <div key={index} className="group">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl relative">
                {/* Decorative tape effect */}
                <div className="absolute -top-2 left-8 right-8 h-4 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-t-xl"></div>
                
                <div className="flex items-center mb-4">
                  <Calendar size={20} className="text-pink-400 mr-3" />
                  <h3 className="text-lg font-semibold text-pink-400">{note.date}</h3>
                </div>
                
                <p className="text-white/80 leading-relaxed italic">
                  "{note.content}"
                </p>
                
                <div className="absolute bottom-4 right-6 text-pink-400/60 text-2xl font-dancing">
                  ♥
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoveNotes;