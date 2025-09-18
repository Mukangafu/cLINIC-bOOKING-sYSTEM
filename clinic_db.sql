-- clinic_db.sql
CREATE DATABASE IF NOT EXISTS clinic_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE clinic_db;

-- Patients
CREATE TABLE IF NOT EXISTS patients (
  patient_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  date_of_birth DATE,
  phone VARCHAR(20) UNIQUE,
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Doctors
CREATE TABLE IF NOT EXISTS doctors (
  doctor_id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Specialties
CREATE TABLE IF NOT EXISTS specialties (
  specialty_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

-- doctor_specialties (many-to-many)
CREATE TABLE IF NOT EXISTS doctor_specialties (
  doctor_id INT NOT NULL,
  specialty_id INT NOT NULL,
  PRIMARY KEY (doctor_id, specialty_id),
  FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) ON DELETE CASCADE,
  FOREIGN KEY (specialty_id) REFERENCES specialties(specialty_id) ON DELETE CASCADE
);

-- Appointments
CREATE TABLE IF NOT EXISTS appointments (
  appointment_id INT AUTO_INCREMENT PRIMARY KEY,
  patient_id INT NOT NULL,
  doctor_id INT NOT NULL,
  appointment_datetime DATETIME NOT NULL,
  reason VARCHAR(500),
  status ENUM('scheduled','completed','cancelled') DEFAULT 'scheduled',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_appt_patient FOREIGN KEY (patient_id) REFERENCES patients(patient_id) ON DELETE CASCADE,
  CONSTRAINT fk_appt_doctor FOREIGN KEY (doctor_id) REFERENCES doctors(doctor_id) ON DELETE CASCADE,
  CONSTRAINT uc_doctor_datetime UNIQUE (doctor_id, appointment_datetime)
);

-- Indexes
CREATE INDEX idx_appt_patient ON appointments(patient_id);
CREATE INDEX idx_appt_doctor ON appointments(doctor_id);

-- Seed specialties & sample doctor/patient
INSERT IGNORE INTO specialties (name) VALUES ('General Practice'), ('Pediatrics'), ('Cardiology'), ('Dermatology');

INSERT IGNORE INTO doctors (first_name, last_name, phone, email) VALUES
('Alice','Kamau','+254700000001','alice.kamau@example.com'),
('Brian','Otieno','+254700000002','brian.otieno@example.com');

INSERT IGNORE INTO patients (first_name, last_name, date_of_birth, phone, email) VALUES
('Grace','Wanjiru','1990-05-12','+254711000001','grace.wanjiru@example.com'),
('John','Ombogo','1985-10-03','+254711000002','john.ombogo@example.com');

-- Link doctors to General Practice
INSERT IGNORE INTO doctor_specialties (doctor_id, specialty_id)
SELECT d.doctor_id, s.specialty_id
FROM doctors d
JOIN specialties s ON s.name = 'General Practice'
WHERE d.email IN ('alice.kamau@example.com','brian.otieno@example.com');
