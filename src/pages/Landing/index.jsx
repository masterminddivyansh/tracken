import React from 'react';
import './Landing.css';
import Navbar from './Navbar';
import Hero from './Hero';
import Problem from './Problem';
import ModuleShowcase from './ModuleShowcase';
import ConnectionVisual from './ConnectionVisual';
import TodayExperience from './TodayExperience';
import Insights from './Insights';
import Trust from './Trust';
import FAQ from './FAQ';
import FinalCTA from './FinalCTA';
import Footer from './Footer';

export default function LandingPage({ theme, toggleTheme, onLogin, onRegister, onBlog, onContact, onNavigate }) {
  return (
    <div className="landing-v2-container">
      <div className="ambient-glow"></div>
      <Navbar theme={theme} toggleTheme={toggleTheme} onLogin={onLogin} onRegister={onRegister} onNavigate={onNavigate} />
      <main className="landing-main">
        <Hero onRegister={onRegister} />
        <Problem />
        <ModuleShowcase />
        <ConnectionVisual />
        <TodayExperience />
        <Insights />
        <Trust />
        <FAQ />
        <FinalCTA onRegister={onRegister} />
      </main>
      <Footer onNavigate={onNavigate} onContact={onContact} onBlog={onBlog} />
    </div>
  );
}
