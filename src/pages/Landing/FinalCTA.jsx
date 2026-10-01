import React from 'react';
import { motion } from 'framer-motion';

export default function FinalCTA({ onRegister }) {
  return (
    <section className="landing-section" style={{textAlign: 'center', padding: '160px 20px', position: 'relative'}}>
      <div style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', height: '100%', background: 'radial-gradient(circle, var(--glow-accent), transparent 50%)', opacity: 0.5, zIndex: 0, pointerEvents: 'none'}}></div>
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{position: 'relative', zIndex: 1}}
      >
        <img src="/tracken-logo.png" alt="Tracken Logo" style={{height: 64, marginBottom: 32}} />
        <h2 style={{fontSize: 'clamp(36px, 5vw, 56px)', marginBottom: 40}}>Ready to see your progress differently?</h2>
        
        <button className="btn-primary" style={{margin: '0 auto', fontSize: 18, padding: '16px 32px'}} onClick={onRegister}>
          Start Free &rarr;
        </button>
        <div style={{marginTop: 24, color: 'var(--muted)', fontSize: 14}}>
          Already have an account? <span style={{color: 'var(--text)', cursor: 'pointer', fontWeight: 600}} onClick={() => document.querySelector('.btn-login').click()}>Log in</span>
        </div>
      </motion.div>
    </section>
  );
}


