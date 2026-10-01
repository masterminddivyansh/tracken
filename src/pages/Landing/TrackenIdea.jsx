import React from 'react';

export default function TrackenIdea() {
  return (
    <section className="idea-section animate-on-scroll">
      <h3>Track what matters. See yourself moving.</h3>
      <div className="idea-grid">
        <div className="idea-card">
          <b>Tasks connect to goals.</b>
          <p>Stop writing lists that go nowhere. See how today's execution moves the needle on the big picture.</p>
        </div>
        <div className="idea-card">
          <b>Study contributes to progress.</b>
          <p>Track focused learning sessions and turn unstructured studying into measurable momentum.</p>
        </div>
        <div className="idea-card">
          <b>Focus supports execution.</b>
          <p>Protect your deep work time and ensure your most important tasks actually get done.</p>
        </div>
        <div className="idea-card">
          <b>Reviews show what happened.</b>
          <p>Gain insights from your activity to understand your actual patterns instead of guessing.</p>
        </div>
      </div>
    </section>
  );
}
