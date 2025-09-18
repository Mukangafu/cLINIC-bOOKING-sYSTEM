// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');


const patientsRoutes = require('./routes/patients');
const appointmentsRoutes = require('./routes/appointments');


const app = express();
app.use(bodyParser.json());


app.use('/api/patients', patientsRoutes);
app.use('/api/appointments', appointmentsRoutes);


app.get('/', (req, res) => res.send('Clinic Booking API is running'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
