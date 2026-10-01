import React from 'react';
import { motion } from 'framer-motion';

export default function ConnectionVisual() {
  return (
    <section className="landing-section" style={{textAlign: 'center', overflow: 'hidden'}}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Turn activity into progress.
      </motion.h2>
      
      <div className="connection-canvas">
        <motion.div 
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          transition={{ duration: 2 }}
          viewport={{ once: true, margin: "-100px" }}
          style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1 }}
        >
          {/* Abstract SVG line connecting elements */}
          <svg width="100%" height="100%" style={{position: 'absolute', top: 0, left: 0}}>
            <path d="M 100 100 C 300 100, 300 300, 500 300 S 700 100, 900 100" fill="none" stroke="var(--line)" strokeWidth="2" strokeDasharray="8 8"/>
            <motion.path 
              d="M 100 100 C 300 100, 300 300, 500 300 S 700 100, 900 100" 
              fill="none" stroke="var(--accent)" strokeWidth="3"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              viewport={{ once: true }}
            />
          </svg>
        </motion.div>

        {/* Desktop nodes positioned manually along the path */}
        <div style={{position: 'relative', width: '100%', maxWidth: 1000, margin: '0 auto', height: '100%'}}>
          <motion.div className="node" style={{top: 80, left: '5%'}} initial={{scale: 0}} whileInView={{scale: 1}} transition={{delay: 0.2}}>
            <div style={{width: 12, height: 12, background: 'var(--accent)', borderRadius: '50%'}}></div>
            TASK
          </motion.div>
          
          <motion.div className="node" style={{top: 280, left: '40%'}} initial={{scale: 0}} whileInView={{scale: 1}} transition={{delay: 0.8}}>
            <div style={{width: 12, height: 12, background: 'var(--accent)', borderRadius: '50%'}}></div>
            FOCUS SESSION
          </motion.div>

          <motion.div className="node" style={{top: 80, left: '80%'}} initial={{scale: 0}} whileInView={{scale: 1}} transition={{delay: 1.4}}>
            <div style={{width: 12, height: 12, background: 'var(--accent)', borderRadius: '50%'}}></div>
            GOAL PROGRESS
          </motion.div>
        </div>
      </div>
    </section>
  );
}
