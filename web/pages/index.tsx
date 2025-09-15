import React from 'react';
import '../styles/theme.css';
export default function Home(){
  return (
    <main className="container">
      <header className="hero">
        <h1>AI Dreamer</h1>
        <p>Scaffolded with your selected style tokens.</p>
        <button className="btn">Primary Action</button>
      </header>
    </main>
  );
}