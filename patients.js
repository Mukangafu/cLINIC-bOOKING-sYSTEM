const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const role = require('../middleware/role');
const patientsController = require('../controllers/patientsController');

router.post('/', auth, role(['admin']), patientsController.createPatient);
router.get('/', auth, role(['admin', 'doctor']), patientsController.getAllPatients);
router.get('/:id', auth, role(['admin', 'doctor', 'patient']), patientsController.getPatientById);

module.exports = router;
