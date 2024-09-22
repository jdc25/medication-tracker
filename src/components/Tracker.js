import React, { useState, useEffect } from 'react';
import MedicationItem from './MedicationItem';
import { firestore } from './firebaseConfig';
import { useAuth } from './AuthContext'; 

function Tracker() {
  const [medications, setMedications] = useState([]);
  const [input, setInput] = useState('');
  const { currentUser } = useAuth(); 

  useEffect(() => {
    if (currentUser) {
      const fetchMedications = async () => {
        try {
          const userMedications = await firestore
            .collection('medications')
            .doc(currentUser.uid)
            .collection('userMedications')
            .get();

          setMedications(userMedications.docs.map(doc => doc.data().medication));
        } catch (error) {
          console.error("Error fetching medications: ", error);
        }
      };
      fetchMedications();
    }
  }, [currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() && currentUser) {
      const newMedication = input;
      setMedications([...medications, newMedication]);

      try {
        await firestore
          .collection('medications')
          .doc(currentUser.uid)
          .collection('userMedications')
          .add({
            medication: newMedication,
            timestamp: new Date(),
          });

        setInput('');
      } catch (error) {
        console.error("Error adding medication: ", error);
      }
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
        <button type="submit">Save</button>
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