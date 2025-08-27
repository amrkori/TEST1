import React, { useEffect, useState } from 'react';
import { useInView } from '../hooks/useInView';

const LoveLetter: React.FC = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [typewriterText, setTypewriterText] = useState('');
  
  const fullText = `My Maramy,

From the moment our paths crossed, I knew there was something special about you. Your smile, your laughter, the way your eyes light up when you talk about things you love - everything about you captivates me.

Every day with you is a new adventure, a new chance to fall even deeper in love. You've brought colors into my world that I never knew existed. You've shown me what it means to truly care for someone with all my heart.

I cherish our late-night conversations, our silly inside jokes, our comfortable silences, and even our occasional disagreements that only make our bond stronger. I love how we can be completely ourselves around each other, no pretense, no masks.

Thank you for being my Maramy, my confidant, my best friend. Thank you for being beside me on my best and worst days. I promise to stand by you, support your dreams, and love you more with each passing day.

With all my heart,`;

  useEffect(() => {
    if (isInView && typewriterText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypewriterText(fullText.slice(0, typewriterText.length + 1));
      }, 30);
      return () => clearTimeout(timeout);
    }
  }, [isInView, typewriterText, fullText]);

  return (
    <section id="letter" className="py-20">
      <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} ref={ref}>
        <h2 className="text-4xl font-dancing text-center text-pink-400 mb-12 relative">
          My Love Letter to You
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-pink-400 to-teal-400 rounded-full"></div>
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl transform hover:scale-[1.02] transition-all duration-500 relative">
            {/* Decorative elements */}
            <div className="absolute -top-4 left-8 right-8 h-8 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-t-3xl"></div>
            
            <div className="prose prose-lg text-white max-w-none">
              <pre className="whitespace-pre-wrap font-sans leading-relaxed text-lg">
                {typewriterText}
                {typewriterText.length < fullText.length && (
                  <span className="animate-pulse">|</span>
                )}
              </pre>
              
              {typewriterText.length >= fullText.length && (
                <div className="text-right mt-8 animate-fadeIn">
                  <div className="font-dancing text-3xl text-pink-400">Amr</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoveLetter;