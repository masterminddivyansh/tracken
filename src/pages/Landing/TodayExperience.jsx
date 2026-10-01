import React from 'react';
import { motion } from 'framer-motion';

export default function TodayExperience() {
  return (
    <section className="landing-section" style={{display: 'flex', justifyContent: 'center'}}>
      <motion.div 
        className="today-card"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        style={{maxWidth: 600, width: '100%', position: 'relative', overflow: 'hidden'}}
      >
        <div style={{position: 'absolute', top: -100, right: -100, width: 300, height: 300, background: 'radial-gradient(circle, var(--glow-accent), transparent 70%)'}}></div>
        
        <h3 style={{fontSize: 16, letterSpacing: '0.1em', color: 'var(--muted)', textTransform: 'uppercase'}}>Tracken Score</h3>
        
        <div style={{position: 'relative', width: 200, height: 200, margin: '40px auto'}}>
          <svg width="200" height="200" viewBox="0 0 200 200" style={{transform: 'rotate(-90deg)'}}>
            <circle cx="100" cy="100" r="90" fill="none" stroke="var(--surface)" strokeWidth="12" />
            <motion.circle 
              cx="100" cy="100" r="90" fill="none" stroke="var(--text)" strokeWidth="12" strokeLinecap="round"
              initial={{pathLength: 0}}
              whileInView={{pathLength: 0.84}}
              transition={{duration: 2, ease: "easeOut", delay: 0.2}}
              strokeDasharray="0 1"
            />
          </svg>
          <div style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
            <span style={{fontSize: 56, fontWeight: 800, lineHeight: 1}}>84</span>
            <span style={{color: 'var(--muted)', fontWeight: 600}}>/ 100</span>
          </div>
        </div>

        <div style={{display: 'flex', gap: 24, justifyContent: 'center', marginTop: 40}}>
          <div style={{textAlign: 'left'}}>
            <div style={{fontSize: 14, color: 'var(--muted)'}}>Execution</div>
            <div style={{fontWeight: 700}}>78%</div>
          </div>
          <div style={{textAlign: 'left'}}>
            <div style={{fontSize: 14, color: 'var(--muted)'}}>Study</div>
            <div style={{fontWeight: 700}}>92%</div>
          </div>
          <div style={{textAlign: 'left'}}>
            <div style={{fontSize: 14, color: 'var(--muted)'}}>Consistency</div>
            <div style={{fontWeight: 700}}>83%</div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
