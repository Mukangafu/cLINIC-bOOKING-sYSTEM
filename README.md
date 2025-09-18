# Clinic Booking System — README

## Overview

The **Clinic Booking System** is a full-stack application designed to manage **patients, doctors, specialties, and appointments** in a clinic. It is built with **Node.js (Express)** for the backend and **MySQL** for the database, and it supports **Docker** for easy deployment.

This README provides a step-by-step guide to set up, run, and use the system effectively.

---

## Features

* **Patient Management**: Create, read, update, and delete patients.
* **Doctor & Specialties**: Manage doctors and their medical specialties.
* **Appointments**: Schedule, view, update, and cancel appointments.
* **Relational Database**: Enforces foreign keys, unique constraints, and relationships.
* **Docker Support**: Simplified deployment using Docker Compose.
* **Postman Collection**: Ready-to-use API requests for testing.

---

## Technologies Used

* **Backend**: Node.js (Express)
* **Database**: MySQL
* **ORM/Query**: mysql2 with async/await
* **Deployment**: Docker, Docker Compose
* **Documentation & Testing**: Postman

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

* Docker & Docker Compose
* Node.js (if running without Docker)
* MySQL (if running without Docker)

### Project Setup

1. **Clone the Repository**

```bash
git clone https://github.com/yourusername/clinic-booking-system.git
cd clinic-booking-system
```

2. **Copy Environment File**

```bash
cp .env.example .env
```

Edit `.env` to set your database credentials if needed.

3. **Start with Docker**

```bash
docker-compose up -d
```

4. **Initialize Database**

```bash
docker exec -i clinic_db mysql -uroot -prootpass clinic_db < clinic_db.sql
```

5. **Access API**
   API runs on: [http://localhost:3000](http://localhost:3000)

---

## API Endpoints

### Patients

| Method | Endpoint           | Description            |
| ------ | ------------------ | ---------------------- |
| POST   | /api/patients      | Create a new patient   |
| GET    | /api/patients      | List all patients      |
| GET    | /api/patients/\:id | Get patient by ID      |
| PUT    | /api/patients/\:id | Update patient details |
| DELETE | /api/patients/\:id | Delete a patient       |

### Appointments

| Method | Endpoint               | Description                |
| ------ | ---------------------- | -------------------------- |
| POST   | /api/appointments      | Schedule an appointment    |
| GET    | /api/appointments      | List all appointments      |
| GET    | /api/appointments/\:id | Get appointment by ID      |
| PUT    | /api/appointments/\:id | Update appointment details |
| DELETE | /api/appointments/\:id | Cancel an appointment      |

---

## Postman Collection

A ready-to-import Postman collection file `Clinic_Booking_API.postman_collection.json` is provided for testing all endpoints.

1. Open Postman → Import Collection
2. Set `{{base_url}}` = `http://localhost:3000`

---

## Environment Variables

The `.env.example` file provides a template for required variables:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=clinic_db
PORT=3000
```

Copy it to `.env` and set real values.

---

## Running Without Docker

1. Install MySQL & Node.js locally.
2. Create database using `clinic_db.sql`.
3. Install dependencies:

```bash
npm install
```

4. Start server:

```bash
npm run dev
```

---

## Security & Production Notes

* Use strong database passwords in `.env`
* Configure SSL for production deployments
* Add authentication (e.g., JWT) for protected endpoints
* Use a reverse proxy like Nginx for better performance

---

## License

This project is licensed under the MIT License.
Dan Muturi
