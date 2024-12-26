import React, { useState } from 'react';
import '../styles/ai.css';

function Ai() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle search logic here
    console.log('Searched for:', searchTerm);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Find Your Solution Here</h1>
      </div>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Which medicine you need but not getting?"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

export default Ai;