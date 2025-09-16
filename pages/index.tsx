import React from 'react';

export default function Home() {
  return (
    <main className="container">
      <header className="hero">
        <h1>John Smith</h1>
        <p>Full-Stack Software Engineer</p>
        <p>Building modern web applications with React, Node.js, and cloud technologies</p>
        <div className="cta-section">
          <button className="btn btn-primary">View Projects</button>
          <button className="btn btn-secondary">Contact Me</button>
        </div>
      </header>
      
      <section className="projects-section">
        <h2>Featured Projects</h2>
        <div className="projects-grid">
          <div className="project-card">
            <h3>E-commerce Platform</h3>
            <p>Full-stack web application built with React and Node.js</p>
            <div className="tech-stack">React • Node.js • MongoDB</div>
          </div>
          <div className="project-card">
            <h3>Task Management App</h3>
            <p>Collaborative productivity tool with real-time updates</p>
            <div className="tech-stack">Next.js • TypeScript • PostgreSQL</div>
          </div>
        </div>
      </section>
      
      <section className="contact-section">
        <h2>Get In Touch</h2>
        <div className="contact-form">
          <input type="text" placeholder="Your Name" className="form-input" />
          <input type="email" placeholder="Your Email" className="form-input" />
          <textarea placeholder="Your Message" className="form-textarea"></textarea>
          <button className="btn btn-primary">Send Message</button>
        </div>
      </section>
    </main>
  );
}