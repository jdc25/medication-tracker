// src/components/UserLogOut.js
import React from 'react';
import { auth } from './firebaseConfig';
import { useNavigate } from 'react-router-dom';

function UserLogOut() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      alert('Logged out successfully');
      navigate('/'); // Redirect to login page after logout
    } catch (error) {
      console.error('Error logging out: ', error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
}

export default UserLogOut;