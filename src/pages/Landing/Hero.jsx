import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LayoutDashboard, ListChecks, BookOpen, Target, Flame, Timer, WalletCards } from 'lucide-react';

export default function Hero({ onRegister }) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -40]);
  const y2 = useTransform(scrollY, [0, 500], [0, -80]);
  const y3 = useTransform(scrollY, [0, 500], [0, -120]);

  return (
    <section className="hero-section">
      <motion.div 
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <h1>Your entire progress.<br/>In one place.</h1>
        <p>Tasks. Study. Habits. Goals. Focus.<br/>Connected into one personal progress workspace.</p>
        <div className="hero-ctas">
          <button className="btn-primary" onClick={onRegister}>Start Free &rarr;</button>
          <button className="btn-secondary" onClick={() => document.getElementById('showcase').scrollIntoView({behavior: 'smooth'})}>Explore Tracken</button>
        </div>
      </motion.div>

      <div className="hero-ui-container">
        {/* Main Interface */}
        <motion.div 
          className="ui-layer-main"
          style={{ y: y1 }}
          initial={{ opacity: 0, scale: 0.95, rotateX: 10 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="ui-sidebar">
            <div className="ui-sidebar-brand">
              <img src="/tracken-logo.png" alt="Tracken" /> TRACKEN
            </div>
            <div className="ui-nav-item active"><LayoutDashboard size={16}/> Overview</div>
            <div className="ui-nav-item"><ListChecks size={16}/> Tasks</div>
            <div className="ui-nav-item"><BookOpen size={16}/> Study</div>
            <div className="ui-nav-item"><Target size={16}/> Goals</div>
            <div className="ui-nav-item"><Flame size={16}/> Habits</div>
            <div className="ui-nav-item"><Timer size={16}/> Focus</div>
            <div className="ui-nav-item"><WalletCards size={16}/> Money</div>
          </div>
          <div className="ui-content">
            <h3 style={{marginBottom: 32}}>TODAY</h3>
            <div style={{display: 'flex', gap: 40}}>
              <div>
                <div style={{fontSize: 64, fontWeight: 800, color: 'var(--accent)', lineHeight: 1}}>84</div>
                <div style={{color: 'var(--muted)', fontWeight: 600}}>/ 100 SCORE</div>
              </div>
              <div>
                <div style={{color: 'var(--muted)', fontSize: 14, fontWeight: 600, marginBottom: 8, textTransform: 'uppercase'}}>Next Action</div>
                <div style={{fontSize: 20, fontWeight: 700}}>Complete Quant practice</div>
                <div style={{display: 'flex', gap: 8, marginTop: 12}}>
                  <span style={{background: 'var(--surface)', padding: '4px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600}}>Tasks 7/9</span>
                  <span style={{background: 'var(--surface)', padding: '4px 12px', borderRadius: 999, fontSize: 12, fontWeight: 600}}>Study 3h 42m</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floating Layers */}
        <motion.div 
          className="ui-floating-card"
          style={{ top: '10%', right: '-5%', y: y2 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div style={{color: 'var(--muted)', fontSize: 12, fontWeight: 600, marginBottom: 4}}>WEEKLY PROGRESS</div>
          <div style={{fontSize: 24, fontWeight: 700, color: '#10b981'}}>+12%</div>
        </motion.div>

        <motion.div 
          className="ui-floating-card"
          style={{ bottom: '15%', left: '-10%', y: y3 }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          <div style={{display: 'flex', alignItems: 'center', gap: 12}}>
            <div style={{width: 32, height: 32, borderRadius: '50%', border: '4px solid var(--accent)', borderRightColor: 'transparent', transform: 'rotate(45deg)'}}></div>
            <div>
              <div style={{fontSize: 14, fontWeight: 700}}>Deep Focus</div>
              <div style={{fontSize: 12, color: 'var(--muted)'}}>2h 15m today</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
