// routes/patients.js
const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/patientsController');


router.post('/', ctrl.createPatient);
router.get('/', ctrl.getAllPatients);
router.get('/:id', ctrl.getPatientById);
router.put('/:id', ctrl.updatePatient);
router.delete('/:id', ctrl.deletePatient);


module.exports = router;
