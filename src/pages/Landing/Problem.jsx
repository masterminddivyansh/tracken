import React from 'react';
import { motion } from 'framer-motion';

export default function Problem() {
  return (
    <section id="problem" className="landing-section" style={{textAlign: 'center'}}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <h2 style={{fontSize: 48, marginBottom: 16}}>Your progress is scattered.</h2>
        <h2 style={{fontSize: 48, color: 'var(--muted)'}}>Bring it together.</h2>
      </motion.div>

      <div className="problem-canvas">
        {['TASKS (Notes)', 'STUDY (Timer)', 'HABITS (App)', 'FOCUS (Clock)', 'MONEY (Sheet)'].map((label, i) => (
          <motion.div
            key={label}
            className="scattered-node"
            initial={{ opacity: 0, x: (Math.random() - 0.5) * 800, y: (Math.random() - 0.5) * 400, scale: 0.8 }}
            whileInView={{ opacity: 1, x: 0, y: 0, scale: 0 }}
            viewport={{ once: true, margin: "-200px" }}
            transition={{ duration: 1.5, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {label}
          </motion.div>
        ))}
        
        <motion.div 
          className="problem-center"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-200px" }}
          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
        >
          <img src="/tracken-logo.png" alt="Tracken" style={{height: 48}} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.5 }}
        style={{marginTop: 40}}
      >
        <h3 style={{fontSize: 32}}>TRACKEN</h3>
        <p style={{margin: '8px auto 0', maxWidth: 400}}>Everything connects. One system. Every important signal.</p>
      </motion.div>
    </section>
  );
}
