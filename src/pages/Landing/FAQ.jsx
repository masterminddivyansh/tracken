import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const faqs = [
    { q: 'What is Tracken?', a: 'A personal progress workspace that combines tasks, study, habits, goals, focus, and finance tracking in one connected system.' },
    { q: 'Who is Tracken for?', a: 'Anyone who wants to track their daily execution and long-term goals without scattering data across multiple disconnected apps.' },
    { q: 'Is Tracken free?', a: 'Yes, you can start tracking immediately without needing to set up a template or pay for basic features.' },
    { q: 'Is my data private?', a: 'Yes. Your tracking data is yours. We do not sell user data and you can delete your account at any time.' }
  ];

  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="landing-section" style={{maxWidth: 700}}>
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{textAlign: 'center', marginBottom: 40}}
      >
        Questions about Tracken.
      </motion.h2>
      
      <div>
        {faqs.map((faq, index) => (
          <motion.details 
            key={index} 
            className="faq-item" 
            open={index === openIndex}
            onClick={(e) => {
              e.preventDefault();
              setOpenIndex(index === openIndex ? -1 : index);
            }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <summary style={{outline: 'none'}}>
              {faq.q}
              <ChevronDown size={20} style={{transform: index === openIndex ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.3s'}} />
            </summary>
            <motion.p
              initial={false}
              animate={{ height: index === openIndex ? 'auto' : 0, opacity: index === openIndex ? 1 : 0 }}
              style={{ overflow: 'hidden' }}
            >
              {faq.a}
            </motion.p>
          </motion.details>
        ))}
      </div>
    </section>
  );
}
