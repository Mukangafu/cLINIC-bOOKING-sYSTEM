import React, { useState } from 'react';
import api from '../api/api';

const PatientForm = () => {
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/patients', { first_name, last_name, email });
      alert('Patient created & email sent!');
    } catch (err) {
      alert(err.response?.data?.error || 'Error creating patient');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="First Name" value={first_name} onChange={e => setFirstName(e.target.value)} />
      <input placeholder="Last Name" value={last_name} onChange={e => setLastName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <button type="submit">Add Patient</button>
    </form>
  );
};

export default PatientForm;
