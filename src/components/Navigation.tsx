import React from 'react';

const Navigation: React.FC = () => {
  const navItems = [
    { href: '#letter', label: 'Love Letter' },
    { href: '#gallery', label: 'Photo Gallery' },
    { href: '#timeline', label: 'Timeline' },
    { href: '#quotes', label: 'Quotes' },
    { href: '#interests', label: 'Shared Interests' },
    { href: '#future', label: 'Future Plans' },
    { href: '#playlist', label: 'Playlist' },
    { href: '#notes', label: 'Love Notes' },
    { href: '#surprise', label: 'Surprise' },
    { href: '#contact', label: 'Contact' }
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
      <div className="container mx-auto px-4">
        <ul className="flex flex-wrap justify-center items-center py-4 gap-2">
          {navItems.map((item, index) => (
            <li key={index}>
              <button
                onClick={() => scrollToSection(item.href)}
                className="text-white px-4 py-2 rounded-full transition-all duration-300 hover:bg-pink-500 hover:-translate-y-1 hover:shadow-lg hover:shadow-pink-500/40 relative overflow-hidden group"
              >
                <span className="relative z-10">{item.label}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;