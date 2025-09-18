// server.js
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const patientsRoutes = require('./routes/patients');
const appointmentsRoutes = require('./routes/appointments');

const app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use('/api/patients', patientsRoutes);
app.use('/api/appointments', appointmentsRoutes);

app.get('/', (req, res) => res.send('Clinic Booking API is running'));

// basic error handler
app.use((err, req, res, next) => {
  console.error(err);
  if (!res.headersSent) {
    res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
