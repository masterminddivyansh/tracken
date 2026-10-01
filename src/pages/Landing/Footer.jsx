import React from 'react';

export default function Footer({ onNavigate, onContact, onBlog }) {
  return (
    <footer className="landing-footer">
      <div className="nav-brand" style={{fontSize: 24, flexDirection: 'column', gap: 16}}>
        <img src="/tracken-logo.png" alt="Tracken" style={{height: 40}} />
        TRACKEN
      </div>
      <p style={{margin: 0, maxWidth: 300}}>Personal Progress OS.</p>
      
      <div className="footer-links">
        <button onClick={() => document.getElementById('showcase').scrollIntoView({behavior: 'smooth'})}>Features</button>
        <button onClick={() => onNavigate('about')}>About</button>
        <button onClick={onContact}>Contact</button>
        <button onClick={onBlog}>Blog</button>
        <button onClick={() => onNavigate('privacy')}>Privacy</button>
      </div>
      
      <div style={{fontSize: 12, marginTop: 24}}>
        TRACKEN by MMD &copy; {new Date().getFullYear()}
      </div>
    </footer>
  );
}
