// ==========================================
// AEVORA - CLINIC MANAGEMENT SYSTEM
// ==========================================


// ==========================================
// GET SAVED PATIENTS
// ==========================================

let patients = JSON.parse(localStorage.getItem("patients")) || [];


// ==========================================
// PATIENT REGISTRATION
// ==========================================

const patientForm = document.getElementById("patientForm");

if (patientForm) {

    patientForm.addEventListener("submit", function(event) {

        // Prevent page refresh
        event.preventDefault();


        // Get information from form
        const name =
            document.getElementById("patientName").value.trim();

        const age =
            document.getElementById("patientAge").value;

        const gender =
            document.getElementById("patientGender").value;

        const department =
            document.getElementById("department").value;

        const reason =
            document.getElementById("reason").value.trim();

        const priority =
            document.getElementById("priority").value;


        // Check required information
        if (
            name === "" ||
            age === "" ||
            gender === "" ||
            department === "" ||
            reason === "" ||
            priority === ""
        ) {

            alert("Please fill in all fields.");
            return;

        }


        // Create queue number
        const queueNumber =
            "A-" + String(patients.length + 1).padStart(3, "0");


        // Create patient object
        const patient = {

    // Permanent patient ID
    patientId:
        "AEV-" +
        String(patients.length + 1).padStart(4, "0"),

    // Queue number for this visit
    queueNumber: queueNumber,

    // Patient information
    name: name,

    age: age,

    gender: gender,

    // Current visit
    department: department,

    reason: reason,

    priority: priority,

    // Registration date
    registrationDate:
        new Date().toISOString().split("T")[0],

    // Current queue status
    status: "Waiting",

    // Prescription history
    prescriptions: []

};


        // Add patient
        patients.push(patient);


        // Save patients
        localStorage.setItem(
            "patients",
            JSON.stringify(patients)
        );


        // Show success message
        showSuccess(patient);

    });

}


// ==========================================
// SUCCESS MESSAGE
// ==========================================

function showSuccess(patient) {

    const container =
        document.querySelector(".registration-container");

    if (!container) {
        return;
    }


    container.innerHTML = `

        <div class="success-message">

            <div class="success-icon">
                ✓
            </div>

            <p class="small-heading">
                REGISTRATION SUCCESSFUL
            </p>

            <h1>
                You're in the Queue!
            </h1>

            <p>
                Please remember your queue number.
            </p>


            <div class="queue-number-box">

    <span>
        Your Queue Number
    </span>

    <strong>
        ${patient.queueNumber}
    </strong>

</div>


<div class="queue-number-box">

    <span>
        Your Aevora Patient ID
    </span>

    <strong>
        ${patient.patientId}
    </strong>

</div>


            <div class="patient-summary">

                <p>
                    <strong>Patient:</strong>
                    ${patient.name}
                </p>

                <p>
                    <strong>Department:</strong>
                    ${patient.department}
                </p>

                <p>
                    <strong>Priority:</strong>
                    ${patient.priority}
                </p>

            </div>


            <div class="success-buttons">

                <a href="queue.html" class="primary-button">
                    View Queue
                </a>

                <a href="index.html" class="secondary-button">
                    Back Home
                </a>

            </div>

        </div>

    `;

}


// ==========================================
// QUEUE TABLE
// ==========================================

const queueTable =
    document.getElementById("queueTable");


// ==========================================
// DISPLAY QUEUE
// ==========================================

function displayQueue() {

    if (!queueTable) {
        return;
    }


    // Get selected department
    const departmentSelector =
        document.getElementById("queueDepartment");


    const selectedDepartment =
        departmentSelector
            ? departmentSelector.value
            : "All";


    // Clear table
    queueTable.innerHTML = "";


    // Filter patients
    let filteredPatients = patients;


    if (selectedDepartment !== "All") {

        filteredPatients = patients.filter(function(patient) {

            return (
                patient.department &&
                patient.department.trim().toLowerCase() ===
                selectedDepartment.trim().toLowerCase()
            );

        });

    }


    // No patients
    if (filteredPatients.length === 0) {

        queueTable.innerHTML = `

            <tr>

                <td colspan="6" class="empty-message">

                    No patients currently registered
                    in ${selectedDepartment}.

                </td>

            </tr>

        `;

        updateWaitingCount();

        return;

    }


    // Display patients
    filteredPatients.forEach(function(patient) {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                <strong>
                    ${patient.queueNumber}
                </strong>
            </td>

            <td>
                ${patient.name}
            </td>

            <td>
                ${patient.age}
            </td>

            <td>
                ${patient.department}
            </td>

            <td>

                <span class="${
                    patient.priority === "Emergency"
                        ? "priority-emergency"
                        : "priority-normal"
                }">

                    ${patient.priority}

                </span>

            </td>

            <td>

                <span class="status-badge ${
                    patient.status === "Waiting"
                        ? "status-waiting"
                        : patient.status === "With Doctor"
                        ? "status-serving"
                        : "status-completed"
                }">

                    ${patient.status}

                </span>

            </td>

        `;


        queueTable.appendChild(row);

    });


    updateWaitingCount();

}


// ==========================================
// DEPARTMENT FILTER
// ==========================================

const queueDepartment =
    document.getElementById("queueDepartment");


if (queueDepartment) {

    queueDepartment.addEventListener(
        "change",
        function() {

            displayQueue();

        }
    );

}


// ==========================================
// WAITING PATIENT COUNT
// ==========================================

function updateWaitingCount() {

    const waitingCount =
        document.getElementById("waitingCount");


    if (!waitingCount) {
        return;
    }


    const waitingPatients =
        patients.filter(function(patient) {

            return patient.status === "Waiting";

        });


    waitingCount.textContent =
        waitingPatients.length;

}


// ==========================================
// CURRENT PATIENT
// ==========================================

function updateCurrentPatient() {

    const currentPatientElement =
        document.getElementById("currentPatient");


    if (!currentPatientElement) {
        return;
    }


    const currentPatient =
        patients.find(function(patient) {

            return patient.status === "With Doctor";

        });


    if (currentPatient) {

        currentPatientElement.textContent =
            currentPatient.queueNumber;

    }

    else {

        currentPatientElement.textContent =
            "A-000";

    }

}


// ==========================================
// INITIALIZE QUEUE PAGE
// ==========================================

if (queueTable) {

    displayQueue();

    updateCurrentPatient();

}