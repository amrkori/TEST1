import React from 'react';
import { Heart } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const Timeline: React.FC = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const timelineEvents = [
    {
      date: '2 June 2021',
      title: 'Having Feelings for You',
      description: 'At first, I didn\'t notice, but as time went by, I started falling for you.',
      side: 'left'
    },
    {
      date: 'October 2024',
      title: 'Confessing My Feelings',
      description: 'This is when I confessed my feelings, and you said I was joking hahaha.',
      side: 'right'
    },
    {
      date: 'December 2024',
      title: 'First "I Love You" and You Became My GF',
      description: 'It\'s when you said we\'re officially together and told me "I love you" for the first time hahaha.',
      side: 'left'
    },
    {
      date: 'To Infinity',
      title: 'Forever Us',
      description: 'Because this story doesn\'t end. It\'s just beginning…',
      side: 'right'
    }
  ];

  return (
    <section id="timeline" className="py-20">
      <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} ref={ref}>
        <h2 className="text-4xl font-dancing text-center text-pink-400 mb-12 relative">
          Our Journey Together
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-pink-400 to-teal-400 rounded-full"></div>
        </h2>
        
        <div className="max-w-4xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-pink-400 to-teal-400 rounded-full hidden md:block"></div>
          
          {timelineEvents.map((event, index) => (
            <div key={index} className={`relative flex items-center mb-12 ${event.side === 'left' ? 'md:flex-row-reverse' : ''}`}>
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-pink-400 rounded-full border-4 border-white shadow-lg z-10 hidden md:block">
                <div className="absolute inset-0 bg-pink-400 rounded-full animate-ping opacity-75"></div>
              </div>
              
              {/* Content */}
              <div className={`w-full md:w-5/12 ${event.side === 'left' ? 'md:pr-8' : 'md:pl-8'}`}>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl hover:scale-105 transition-all duration-300">
                  <div className="text-pink-400 font-semibold mb-2">{event.date}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{event.title}</h3>
                  <p className="text-white/80">{event.description}</p>
                  
                  {/* Mobile dot */}
                  <div className="md:hidden w-6 h-6 bg-pink-400 rounded-full flex items-center justify-center mt-4">
                    <Heart size={12} className="text-white" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;