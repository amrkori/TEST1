import React from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import LoveLetter from './components/LoveLetter';
import PhotoGallery from './components/PhotoGallery';
import Timeline from './components/Timeline';
import Quotes from './components/Quotes';
import SharedInterests from './components/SharedInterests';
import FuturePlans from './components/FuturePlans';
import MusicPlayer from './components/MusicPlayer';
import LoveNotes from './components/LoveNotes';
import SurpriseCountdown from './components/SurpriseCountdown';
import ContactForm from './components/ContactForm';
import FloatingHearts from './components/FloatingHearts';
import { useScrollAnimation } from './hooks/useScrollAnimation';

function App() {
  useScrollAnimation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-purple-800 relative">
      <FloatingHearts />
      <Header />
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 space-y-20">
        <LoveLetter />
        <PhotoGallery />
        <Timeline />
        <Quotes />
        <SharedInterests />
        <FuturePlans />
        <MusicPlayer />
        <LoveNotes />
        <SurpriseCountdown />
        <ContactForm />
      </main>
    </div>
  );
}

export default App;