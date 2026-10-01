import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

export default function Navbar({ theme, toggleTheme, onLogin, onRegister, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      className={`landing-nav ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="nav-brand" onClick={() => onNavigate('home')}>
        <img src="/tracken-logo.png" alt="Tracken" />
        TRACKEN
      </div>
      
      <div className="nav-center">
        <button onClick={() => document.getElementById('problem').scrollIntoView({behavior: 'smooth'})}>System</button>
        <button onClick={() => document.getElementById('showcase').scrollIntoView({behavior: 'smooth'})}>Modules</button>
        <button onClick={() => document.getElementById('insights').scrollIntoView({behavior: 'smooth'})}>Insights</button>
      </div>

      <div className="nav-right">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "light" ? <Moon size={18}/> : <Sun size={18}/>}
        </button>
        <button className="btn-login" onClick={onLogin}>Log in</button>
        <button className="btn-primary" onClick={onRegister}>
          Start Free
        </button>
      </div>
    </motion.nav>
  );
}
