import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, LockKeyhole, UserCheck } from 'lucide-react';

export default function Trust() {
  const items = [
    { icon: <ShieldCheck size={24} style={{color: 'var(--accent)'}} />, title: 'Privacy First', desc: 'Your personal progress belongs to you. We don\'t sell your data.' },
    { icon: <UserCheck size={24} style={{color: 'var(--accent)'}} />, title: 'Data Control', desc: 'Export or delete your data at any time from your account settings.' },
    { icon: <LockKeyhole size={24} style={{color: 'var(--accent)'}} />, title: 'Account Security', desc: 'Built securely on Supabase with industry-standard authentication.' }
  ];

  return (
    <section className="landing-section" style={{textAlign: 'center', maxWidth: 900}}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Your data is yours.
      </motion.h2>
      
      <div className="trust-grid">
        {items.map((item, index) => (
          <motion.div 
            key={index}
            className="trust-item"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div style={{marginBottom: 16}}>{item.icon}</div>
            <h4>{item.title}</h4>
            <p style={{fontSize: 14}}>{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
