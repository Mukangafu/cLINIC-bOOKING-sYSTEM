// controllers/patientsController.js
const db = require('../db');
const { sendReminder } = require('../utils/email'); // import email utility

// Create a new patient and send email reminder
exports.createPatient = async (req, res) => {
  try {
    const { first_name, last_name, date_of_birth, phone, email } = req.body;

    const [result] = await db.execute(
      `INSERT INTO patients (first_name, last_name, date_of_birth, phone, email)
       VALUES (?, ?, ?, ?, ?)`,
      [first_name, last_name, date_of_birth || null, phone || null, email || null]
    );

    const insertedId = result.insertId;
    const [rows] = await db.execute(
      'SELECT * FROM patients WHERE patient_id = ?',
      [insertedId]
    );

    // Send email reminder if email is provided
    if (email) {
      await sendReminder(
        email,
        'Welcome to Our Clinic',
        `Hello ${first_name},\n\nYour patient profile has been successfully created at our clinic.`
      );
    }

    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get all patients
exports.getAllPatients = async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM patients ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get patient by ID
exports.getPatientById = async (req, res) => {
  try {
    const id = req.params.id;
    const [rows] = await db.execute('SELECT * FROM patients WHERE patient_id = ?', [id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Patient not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
