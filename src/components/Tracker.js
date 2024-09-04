// src/components/Tracker.js
import React, { useState } from 'react';
import MedicationItem from './MedicationItem';

function Tracker() {
  const [medications, setMedications] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMedications([...medications, input]);
      setInput(''); // Clear the input field
    }
  };

  return (
    <div>
      <h1>Medication Tracker</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter medication"
        />
        <button type="submit">Add Medication</button>
      </form>
      <ul>
        {medications.map((medication, index) => (
          <MedicationItem key={index} medication={medication} />
        ))}
      </ul>
    </div>
  );
}

export default Tracker;