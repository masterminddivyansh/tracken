import React from 'react';
import { LayoutDashboard, ListChecks, BookOpen, Target, Flame, Timer } from 'lucide-react';

export default function ProductShowcase() {
  return (
    <section id="product" className="product-showcase animate-on-scroll">
      <div className="showcase-header">
        <h2>Not a concept.<br/>A system you can use.</h2>
        <p>A real dashboard designed to give you instant clarity on your day, without the clutter.</p>
      </div>
      
      <div className="showcase-mockup">
        <aside className="mockup-sidebar">
          <div className="nav-brand" style={{marginBottom: 20}}>
            TRACKEN<span>.</span>
          </div>
          <div className="mockup-nav-item active"><LayoutDashboard size={18}/> Overview</div>
          <div className="mockup-nav-item"><ListChecks size={18}/> Tasks</div>
          <div className="mockup-nav-item"><BookOpen size={18}/> Study</div>
          <div className="mockup-nav-item"><Target size={18}/> Goals</div>
          <div className="mockup-nav-item"><Flame size={18}/> Habits</div>
          <div className="mockup-nav-item"><Timer size={18}/> Focus</div>
        </aside>
        
        <div className="mockup-main">
          <h3>Good morning.</h3>
          <p>Everything important, in context.</p>
          
          <div className="mockup-grid">
            <div className="dash-card">
              <span>Today's Progress</span>
              <strong>84/100</strong>
            </div>
            <div className="dash-card">
              <span>Tasks</span>
              <strong>7/9</strong>
            </div>
            <div className="dash-card">
              <span>Habits</span>
              <strong>5/6</strong>
            </div>
            <div className="dash-card" style={{gridColumn: '1 / -1', marginTop: 20}}>
              <span>Next Best Action</span>
              <strong style={{color: 'var(--accent)'}}>Complete Quant practice</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
