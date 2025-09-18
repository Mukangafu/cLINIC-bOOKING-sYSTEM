import React, { useEffect, useState } from 'react';
import api from '../api/api';

const Dashboard = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await api.get('/patients');
        setPatients(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPatients();
  }, []);

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {patients.map(p => (
          <li key={p.patient_id}>{p.first_name} {p.last_name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
