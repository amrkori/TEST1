import React, { useState } from 'react';
import { Send, Star } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const ContactForm: React.FC = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [message, setMessage] = useState('');
  const [showThankYou, setShowThankYou] = useState(false);

  const scriptURL = "https://script.google.com/macros/s/AKfycbzmDFr27DcPCa6m2wx793coxsOeQtenL6nKAHAfFHUBnb4WW6AJx7udP7huO313vaCD/exec";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // إرسال البيانات إلى Google Sheets
    const formData = new FormData();
    formData.append("Message", message); // لازم يكون عندك عمود اسمه Message في الشيت

    fetch(scriptURL, {
      method: "POST",
      body: formData,
    })
      .then(() => {
        setShowThankYou(true);
        setMessage('');
        setTimeout(() => setShowThankYou(false), 3000);
      })
      .catch((error) => {
        console.error("Error sending wish:", error.message);
      });
  };

  return (
    <section id="contact" className="py-20">
      <div className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} ref={ref}>
        <h2 className="text-4xl font-dancing text-center text-pink-400 mb-12 relative">
          Make a Wish
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-pink-400 to-teal-400 rounded-full"></div>
        </h2>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl">
            <h3 className="text-2xl text-center text-pink-400 mb-8 flex items-center justify-center gap-3">
              <Star className="animate-pulse" size={24} />
              Tell me your wish, Maramy
              <Star className="animate-pulse" size={24} />
            </h3>
            
            {showThankYou ? (
              <div className="text-center p-8 bg-gradient-to-r from-pink-500/20 to-purple-600/20 rounded-2xl border border-pink-400/30">
                <div className="text-6xl mb-4">✨</div>
                <h4 className="text-2xl text-pink-400 mb-4">Wish Received!</h4>
                <p className="text-white/80">Your beautiful wish has been sent to the universe!</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="wish" className="block text-white/80 mb-3 font-medium">
                    Your Message:
                  </label>
                  <textarea
                    id="wish"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:border-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-400/20 transition-all duration-300 backdrop-blur-sm"
                    placeholder="MAKE A WISH MARAMY..."
                    required
                  />
                </div>
                
                <div className="text-center">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl inline-flex items-center gap-3"
                  >
                    <Send size={20} />
                    Send My Wish
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
