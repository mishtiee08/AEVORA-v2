# 🏥 AEVORA V2 — Smart Clinic Management System

> A modern, role-based clinic management system designed to simplify patient registration, queue management, doctor consultations, nursing tasks, and patient records — all in one platform.

---

## 🌿 About AEVORA

**AEVORA V2** is a Smart Clinic Management System designed to improve the way patients and healthcare staff interact within a clinic.

The system provides separate portals for different hospital staff, allowing each role to access the features relevant to them.

From registering a patient at reception to managing department queues, consulting patients, creating prescriptions, and assigning nursing tasks, AEVORA brings the entire workflow into one organized system.

---

## ✨ Key Features

### 👩‍💼 Receptionist Portal

- Register new patients
- Generate AEVORA Patient IDs
- Select patient department
- Manage patient queue
- View registered patients
- Search patient records
- Monitor patient status

### 👨‍⚕️ Doctor Portal

- Department-specific patient queue
- View patient information
- Search patients by AEVORA ID
- View symptoms and patient details
- Create prescriptions
- Assign tasks to nurses
- Mark patients as completed
- Access patient records
- Manage doctor profile

### 👩‍⚕️ Nurse Portal

- View patients belonging to the assigned department
- Access patient records
- View patient symptoms and information
- View prescriptions
- View tasks assigned by doctors
- Mark nursing tasks as completed
- Track pending and completed tasks
- Manage nurse profile

### 🚨 Emergency Patient Registration

- Quickly register emergency patients
- Capture essential patient information
- Add emergency cases to the appropriate workflow

### 👨‍💼 Admin Portal

- Staff management
- Role-based access
- Department management
- Manage system users

---

## 🏥 Department-Based Workflow

AEVORA uses departments to organize patients and staff.

For example:

```text
Patient
   │
   ▼
Receptionist
   │
   ├── Cardiology
   ├── Neurology
   ├── Orthopedics
   ├── Pediatrics
   ├── General Medicine
   └── Other Departments
          │
          ▼
   Assigned Doctor / Nurse
