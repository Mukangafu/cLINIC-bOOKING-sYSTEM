const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const { createDoctor } = require('../controllers/doctorsController');

router.post('/doctors', auth, role(['admin']), createDoctor); // only admin can create doctor
router.get('/appointments', auth, role(['doctor', 'admin']), getAppointments); // doctors & admins

module.exports = router;
