// controllers/patientsController.js
const db = require('../db');


exports.createPatient = async (req, res) => {
try {
const { first_name, last_name, date_of_birth, phone, email } = req.body;
const [result] = await db.execute(
`INSERT INTO patients (first_name, last_name, date_of_birth, phone, email)
VALUES (?, ?, ?, ?, ?)`,
[first_name, last_name, date_of_birth || null, phone || null, email || null]
);
const insertedId = result.insertId;
const [rows] = await db.execute('SELECT * FROM patients WHERE patient_id = ?', [insertedId]);
res.status(201).json(rows[0]);
} catch (err) {
console.error(err);
res.status(500).json({ error: err.message });
}
};


exports.getAllPatients = async (req, res) => {
try {
const [rows] = await db.execute('SELECT * FROM patients ORDER BY created_at DESC');
res.json(rows);
} catch (err) {
console.error(err);
res.status(500).json({ error: err.message });
}
};


exports.getPatientById = async (req, res) => {
try {
const id = req.params.id;
const [rows] = await db.execute('SELECT * FROM patients WHERE patient_id = ?', [id]);
if (rows.length === 0) return res.status(404).json({ error: 'Patient not found' });
res.json(rows[0]);
};
