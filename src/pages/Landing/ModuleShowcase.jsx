import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ModuleShowcase() {
  const [active, setActive] = useState('tasks');
  
  const modules = [
    { id: 'tasks', title: 'Smart Queue', desc: 'Stop writing endless lists. See what actually needs to be done today, prioritized.' },
    { id: 'study', title: 'Study Intelligence', desc: 'Track focus time, questions completed, and lecture hours visually.' },
    { id: 'goals', title: 'Goal Milestones', desc: 'Connect every daily action directly to a long-term goal trajectory.' },
    { id: 'habits', title: 'Consistency Grid', desc: 'See your true patterns, not just a generic streak counter.' },
    { id: 'focus', title: 'Deep Focus', desc: 'Protect your time with a built-in session timer that feeds into your analytics.' }
  ];

  return (
    <section id="showcase" className="landing-section">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{textAlign: 'center', marginBottom: 16}}
      >
        See what you're actually doing.
      </motion.h2>

      <div className="module-interactive">
        <div className="module-tabs">
          {modules.map(mod => (
            <button 
              key={mod.id} 
              className={`module-tab ${active === mod.id ? 'active' : ''}`}
              onClick={() => setActive(mod.id)}
            >
              <h4>{mod.title}</h4>
              <p>{mod.desc}</p>
            </button>
          ))}
        </div>
        
        <div className="module-display-area">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              style={{height: '100%'}}
            >
              {active === 'tasks' && <TasksMockup />}
              {active === 'study' && <StudyMockup />}
              {active === 'goals' && <GoalsMockup />}
              {active === 'habits' && <HabitsMockup />}
              {active === 'focus' && <FocusMockup />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// Internal mockups for the showcase
function TasksMockup() {
  return (
    <div className="mockup-tasks">
      <div style={{color: 'var(--muted)', fontWeight: 600, fontSize: 14}}>TODAY'S QUEUE</div>
      <motion.div className="task-row" initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{delay: 0.1}}>
        <div style={{width: 20, height: 20, borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
           <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--bg)" strokeWidth="3"><path d="M20 6L9 17l-5-5"/></svg>
        </div>
        <span style={{textDecoration: 'line-through', color: 'var(--muted)'}}>Complete project proposal</span>
      </motion.div>
      <motion.div className="task-row" initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{delay: 0.2}}>
        <div style={{width: 20, height: 20, borderRadius: '50%', border: '2px solid var(--line)'}}></div>
        <span style={{fontWeight: 600}}>Quant practice (2h)</span>
        <span style={{marginLeft: 'auto', fontSize: 12, color: 'var(--accent)', background: 'var(--accent-soft)', padding: '2px 8px', borderRadius: 4}}>HIGH PRIORITY</span>
      </motion.div>
      <motion.div className="task-row" initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} transition={{delay: 0.3}}>
        <div style={{width: 20, height: 20, borderRadius: '50%', border: '2px solid var(--line)'}}></div>
        <span>Plan tomorrow</span>
      </motion.div>
    </div>
  );
}

function StudyMockup() {
  return (
    <div className="mockup-study">
      <div style={{color: 'var(--muted)', fontWeight: 600, fontSize: 14}}>STUDY INTELLIGENCE</div>
      <div style={{fontSize: 48, fontWeight: 800, marginTop: 16}}>3h 42m</div>
      <div style={{color: 'var(--accent)'}}>Focus time today</div>
      
      <div className="study-stats">
        <div className="stat-box">
          <div style={{fontSize: 24, fontWeight: 700}}>1h 50m</div>
          <div style={{fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase'}}>Lectures</div>
        </div>
        <div className="stat-box">
          <div style={{fontSize: 24, fontWeight: 700}}>80</div>
          <div style={{fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase'}}>Questions</div>
        </div>
        <div className="stat-box">
          <div style={{fontSize: 24, fontWeight: 700}}>32</div>
          <div style={{fontSize: 12, color: 'var(--muted)', textTransform: 'uppercase'}}>Pages read</div>
        </div>
      </div>
    </div>
  );
}

function GoalsMockup() {
  return (
    <div style={{padding: 40}}>
      <div style={{color: 'var(--muted)', fontWeight: 600, fontSize: 14}}>CURRENT GOAL</div>
      <div style={{fontSize: 32, fontWeight: 700, marginTop: 16}}>SSC Preparation</div>
      <div style={{fontSize: 24, color: 'var(--accent)', fontWeight: 700, marginBottom: 40}}>72%</div>
      
      {['Foundation', 'Practice', 'Mock Tests'].map((ms, i) => (
        <div key={ms} style={{marginBottom: 20}}>
          <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 8}}>
            <span style={{fontWeight: 600}}>{ms}</span>
            <span style={{color: 'var(--muted)'}}>{[100, 70, 0][i]}%</span>
          </div>
          <div style={{height: 8, background: 'var(--surface)', borderRadius: 4, overflow: 'hidden'}}>
            <motion.div 
              initial={{width: 0}}
              animate={{width: `${[100, 70, 0][i]}%`}}
              transition={{duration: 1, delay: i * 0.2}}
              style={{height: '100%', background: i === 0 ? '#10b981' : 'var(--accent)'}}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function HabitsMockup() {
  return (
    <div style={{padding: 40}}>
      <div style={{color: 'var(--muted)', fontWeight: 600, fontSize: 14}}>CONSISTENCY GRID</div>
      <div style={{marginTop: 40, display: 'flex', gap: 24}}>
        <div style={{display: 'flex', flexDirection: 'column', gap: 16, color: 'var(--muted)', fontWeight: 500}}>
          <div>Exercise</div>
          <div>Study</div>
          <div>Reading</div>
        </div>
        <div style={{display: 'flex', gap: 8}}>
          {/* Mock days */}
          {[1,2,3,4,5,6,7].map(col => (
            <div key={col} style={{display: 'flex', flexDirection: 'column', gap: 16}}>
              <div style={{width: 24, height: 24, borderRadius: 6, background: col < 6 ? '#10b981' : 'var(--surface)'}}></div>
              <div style={{width: 24, height: 24, borderRadius: 6, background: col < 7 ? 'var(--accent)' : 'var(--surface)'}}></div>
              <div style={{width: 24, height: 24, borderRadius: 6, background: col % 2 === 0 ? 'var(--surface)' : 'var(--text)'}}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FocusMockup() {
  return (
    <div style={{padding: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
      <div style={{color: 'var(--muted)', fontWeight: 600, fontSize: 14, letterSpacing: '0.1em'}}>FOCUS SESSION</div>
      <div style={{position: 'relative', width: 240, height: 240, display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 40}}>
        <svg width="240" height="240" viewBox="0 0 240 240" style={{position: 'absolute', top: 0, left: 0, transform: 'rotate(-90deg)'}}>
          <circle cx="120" cy="120" r="110" fill="none" stroke="var(--surface)" strokeWidth="4" />
          <motion.circle 
            cx="120" cy="120" r="110" fill="none" stroke="var(--accent)" strokeWidth="8" strokeLinecap="round"
            initial={{pathLength: 0}}
            animate={{pathLength: 0.6}}
            transition={{duration: 2, ease: "easeOut"}}
            style={{strokeDasharray: '0 1'}}
          />
        </svg>
        <div style={{textAlign: 'center'}}>
          <div style={{fontSize: 48, fontWeight: 800, fontFamily: 'monospace'}}>25:00</div>
          <div style={{color: 'var(--muted)', fontSize: 14}}>Quant Practice</div>
        </div>
      </div>
    </div>
  );
}
