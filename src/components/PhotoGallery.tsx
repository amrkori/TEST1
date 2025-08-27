import React from 'react';
import { Camera } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const PhotoGallery: React.FC = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  return (
    <section id="gallery" className="py-20">
      <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} ref={ref}>
        <h2 className="text-4xl font-dancing text-center text-pink-400 mb-12 relative">
          I wish I could put our Photo Gallery and your beautiful eyes here
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-pink-400 to-teal-400 rounded-full"></div>
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 border border-white/20 shadow-2xl text-center">
            <div className="inline-block p-6 bg-pink-500/20 rounded-full mb-6">
              <Camera size={64} className="text-pink-400 animate-pulse" />
            </div>
            <p className="text-xl text-white/80 mb-8">Our beautiful memories will be displayed here soon...</p>
            
            {/* Placeholder gallery grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div key={item} className="aspect-square bg-white/5 rounded-xl border border-white/10 flex items-center justify-center group hover:bg-white/10 transition-all duration-300">
                  <Camera size={32} className="text-white/40 group-hover:text-pink-400 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;