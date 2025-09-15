import React from 'react';

export default function Home() {
  return (
    <main className="container">
      <header className="hero">
        <h1>UCLA Club</h1>
        <p>Welcome to our amazing UCLA club! Join us for events and stay updated with our newsletter.</p>
        <div className="cta-section">
          <button className="btn btn-primary">Join Events</button>
          <button className="btn btn-secondary">Sign Up for Newsletter</button>
        </div>
      </header>
      
      <section className="events-section">
        <h2>Upcoming Events</h2>
        <div className="events-grid">
          <div className="event-card">
            <h3>Club Meeting</h3>
            <p>Join us for our weekly club meeting</p>
            <span className="event-date">Next Friday, 6:00 PM</span>
          </div>
          <div className="event-card">
            <h3>Social Event</h3>
            <p>Fun social gathering with food and games</p>
            <span className="event-date">Next Saturday, 2:00 PM</span>
          </div>
        </div>
      </section>
    </main>
  );
}