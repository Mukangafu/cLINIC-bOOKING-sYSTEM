const auth = require('./middleware/auth');
const role = require('./middleware/role');

app.post('/api/doctors', auth, role(['admin']), createDoctor);
app.get('/api/appointments', auth, role(['doctor','admin']), getAppointments);
