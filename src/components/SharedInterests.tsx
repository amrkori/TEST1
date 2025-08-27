import React, { useState } from 'react';
import { Film, Coffee, Music, Heart, Utensils } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const SharedInterests: React.FC = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [activeInterest, setActiveInterest] = useState<string | null>(null);

  const interests = [
    {
      id: 'movies',
      icon: Film,
      title: 'Anime & Movies',
      items: ['Your Name', 'A Silent Voice', 'Attack on Titan', 'Spirited Away', '5 Centimeters per Second']
    },
    {
      id: 'food',
      icon: Utensils,
      title: 'Food Adventures',
      items: ['Pizza', 'Italian Cuisine', 'Sushi', 'Desserts']
    },
    {
      id: 'drinks',
      icon: Coffee,
      title: 'Cozy Drinks',
      items: ['Tea', 'Hot Chocolate', 'Coffee', 'Smoothies']
    },
    {
      id: 'music',
      icon: Music,
      title: 'Music & Songs',
      items: ['Hamaki', 'Amr Diab', 'Romantic Ballads', 'Our Special Songs']
    },
    {
      id: 'things',
      icon: Heart,
      title: 'Things You Love',
      items: ['BMW', 'Red Flowers', 'Sunset Views', 'Cozy Evenings']
    }
  ];

  const toggleInterest = (interestId: string) => {
    setActiveInterest(activeInterest === interestId ? null : interestId);
  };

  return (
    <section id="interests" className="py-20">
      <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} ref={ref}>
        <h2 className="text-4xl font-dancing text-center text-pink-400 mb-12 relative">
          Things We Love Together
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-pink-400 to-teal-400 rounded-full"></div>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {interests.map((interest, index) => {
            const IconComponent = interest.icon;
            const isActive = activeInterest === interest.id;
            
            return (
              <div key={interest.id} className="relative">
                <div
                  className={`bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl cursor-pointer transition-all duration-300 hover:scale-105 ${
                    isActive ? 'bg-white/20' : ''
                  }`}
                  onClick={() => toggleInterest(interest.id)}
                >
                  <div className="text-center">
                    <div className="inline-block p-4 bg-pink-500/20 rounded-full mb-4">
                      <IconComponent size={32} className="text-pink-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">{interest.title}</h3>
                    <p className="text-white/60 text-sm">Click to explore</p>
                  </div>
                </div>
                
                {/* Expandable content */}
                <div className={`absolute top-full left-0 right-0 z-10 mt-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-xl transition-all duration-300 ${
                  isActive ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
                }`}>
                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-pink-400 mb-4">Our Favorites:</h4>
                    <ul className="space-y-2">
                      {interest.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="text-white/80 flex items-center">
                          <Heart size={12} className="text-pink-400 mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SharedInterests;