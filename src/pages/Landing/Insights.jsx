import React from 'react';
import { motion } from 'framer-motion';

export default function Insights() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const data = [40, 60, 30, 85, 70, 50, 95];

  return (
    <section id="insights" className="landing-section">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{textAlign: 'center', marginBottom: 60}}
      >
        <h2>You don't just track your week.<br/>You understand it.</h2>
      </motion.div>
      
      <div style={{display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'center', justifyContent: 'center'}}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          style={{
            background: 'var(--surface-solid)', padding: 40, borderRadius: 24, 
            border: '1px solid var(--glass-border)', boxShadow: '0 24px 60px rgba(0,0,0,0.05)',
            width: '100%', maxWidth: 500
          }}
        >
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 40}}>
            <div>
              <div style={{color: 'var(--muted)', fontWeight: 600, fontSize: 14}}>COMPLETION</div>
              <div style={{fontSize: 32, fontWeight: 800}}>82%</div>
            </div>
            <div style={{textAlign: 'right'}}>
              <div style={{color: 'var(--muted)', fontWeight: 600, fontSize: 14}}>TREND</div>
              <div style={{color: '#10b981', fontWeight: 700}}>+12%</div>
            </div>
          </div>

          <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: 160, gap: 12}}>
            {data.map((val, i) => (
              <div key={i} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, gap: 8}}>
                <div style={{width: '100%', height: 120, background: 'var(--surface)', borderRadius: 4, position: 'relative', overflow: 'hidden'}}>
                  <motion.div 
                    initial={{ height: 0 }}
                    whileInView={{ height: `${val}%` }}
                    transition={{ duration: 1, delay: i * 0.1, ease: "easeOut" }}
                    viewport={{ once: true }}
                    style={{
                      position: 'absolute', bottom: 0, width: '100%', 
                      background: val > 80 ? 'var(--text)' : 'var(--accent)'
                    }}
                  />
                </div>
                <span style={{fontSize: 12, color: 'var(--muted)', fontWeight: 600}}>{days[i]}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{maxWidth: 300}}
        >
          <h4 style={{fontSize: 24, marginBottom: 16}}>Sunday was your strongest day.</h4>
          <p style={{color: 'var(--muted)'}}>You completed 95% of your planned tasks and exceeded your focus goal by 45 minutes.</p>
        </motion.div>
      </div>
    </section>
  );
}
