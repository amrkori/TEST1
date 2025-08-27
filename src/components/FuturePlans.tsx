import React from 'react';
import { Plane, Home, Star, Heart } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const FuturePlans: React.FC = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const plans = [
    {
      icon: Plane,
      title: 'Travel Dreams',
      description: 'Japan and Switzerland are on our bucket list.',
      color: 'from-blue-400 to-purple-500'
    },
    {
      icon: Home,
      title: 'Our Home',
      description: 'A cozy place with a garden and space for our hobbies.',
      color: 'from-green-400 to-blue-500'
    },
    {
      icon: Heart,
      title: 'Growing Together',
      description: 'Supporting each other\'s dreams and ambitions.',
      color: 'from-pink-400 to-red-500'
    },
    {
      icon: Star,
      title: 'Adventures',
      description: 'Creating memories and stories to tell for years to come.',
      color: 'from-yellow-400 to-orange-500'
    }
  ];

  return (
    <section id="future" className="py-20">
      <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} ref={ref}>
        <h2 className="text-4xl font-dancing text-center text-pink-400 mb-12 relative">
          Our Future Together
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-pink-400 to-teal-400 rounded-full"></div>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            
            return (
              <div key={index} className="group">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full">
                  <div className="text-center">
                    <div className={`inline-block p-4 bg-gradient-to-r ${plan.color} rounded-full mb-4 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent size={32} className="text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-3">{plan.title}</h3>
                    <p className="text-white/70 leading-relaxed">{plan.description}</p>
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

export default FuturePlans;