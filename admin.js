// ==========================================
// AEVORA - DOCTOR DASHBOARD
// ==========================================


// ==========================================
// GET SAVED PATIENTS
// ==========================================

let patients =
    JSON.parse(localStorage.getItem("patients")) || [];


// Medicines being added to current prescription

let currentMedicines = [];


// ==========================================
// GET SELECTED DEPARTMENT
// ==========================================

function getSelectedDepartment() {

    const department =
        document.getElementById("doctorDepartment");

    return department ? department.value : "";

}


// ==========================================
// CURRENT PATIENT
// ==========================================

function getCurrentPatient() {

    const selectedDepartment =
        getSelectedDepartment();

    return patients.find(function(patient) {

        return (
            patient.status === "With Doctor" &&
            patient.department === selectedDepartment
        );

    });

}


// ==========================================
// UPDATE DASHBOARD
// ==========================================

function updateDashboard() {

    const currentPatient =
        getCurrentPatient();


    const queueNumber =
        document.getElementById("doctorQueueNumber");

    const patientName =
        document.getElementById("doctorPatientName");

    const patientAge =
        document.getElementById("doctorPatientAge");

    const priority =
        document.getElementById("doctorPriority");

    const status =
        document.getElementById("doctorStatus");

    const completeButton =
        document.getElementById("completeButton");


    if (!currentPatient) {

        queueNumber.textContent = "A-000";

        patientName.textContent = "—";

        patientAge.textContent = "—";

        priority.textContent = "—";

        status.textContent = "No Patient";

        completeButton.disabled = true;

        hidePrescriptionSection();

    }

    else {

        queueNumber.textContent =
            currentPatient.queueNumber;

        patientName.textContent =
            currentPatient.name;

        patientAge.textContent =
            currentPatient.age;

        priority.textContent =
            currentPatient.priority;

        status.textContent =
            "With Doctor";

        completeButton.disabled = false;

        showPrescriptionSection();

    }


    updateUpcomingPatients();

}


// ==========================================
// UPCOMING PATIENTS
// ==========================================

function updateUpcomingPatients() {

    const container =
        document.getElementById("upcomingPatients");

    const count =
        document.getElementById("adminWaitingCount");

    const selectedDepartment =
        getSelectedDepartment();


    let waitingPatients =
        patients.filter(function(patient) {

            return (
                patient.status === "Waiting" &&
                patient.department === selectedDepartment
            );

        });


    count.textContent =
        waitingPatients.length + " waiting";


    container.innerHTML = "";


    if (waitingPatients.length === 0) {

        container.innerHTML = `

            <p class="empty-message">

                No patients waiting in
                ${selectedDepartment}.

            </p>

        `;

        return;

    }


    // Emergency patients first

    waitingPatients.sort(function(a, b) {

        if (
            a.priority === "Emergency" &&
            b.priority !== "Emergency"
        ) {
            return -1;
        }

        if (
            a.priority !== "Emergency" &&
            b.priority === "Emergency"
        ) {
            return 1;
        }

        return 0;

    });


    waitingPatients.forEach(function(patient) {

        const patientElement =
            document.createElement("div");

        patientElement.className =
            "upcoming-patient";


        patientElement.innerHTML = `

            <div class="upcoming-patient-left">

                <div class="upcoming-number">
                    ${patient.queueNumber}
                </div>

                <div>

                    <div class="upcoming-name">
                        ${patient.name}
                    </div>

                    <div class="upcoming-department">
                        ${patient.department}
                    </div>

                </div>

            </div>


            <span class="${
                patient.priority === "Emergency"
                    ? "priority-emergency"
                    : "priority-normal"
            }">

                ${patient.priority}

            </span>

        `;


        container.appendChild(patientElement);

    });

}


// ==========================================
// CALL NEXT PATIENT
// ==========================================

function callNextPatient() {

    const selectedDepartment =
        getSelectedDepartment();


    const currentPatient =
        getCurrentPatient();


    if (currentPatient) {

        alert(
            "Please complete the current patient first."
        );

        return;

    }


    let waitingPatients =
        patients.filter(function(patient) {

            return (
                patient.status === "Waiting" &&
                patient.department === selectedDepartment
            );

        });


    if (waitingPatients.length === 0) {

        alert(
            `There are no patients waiting in ${selectedDepartment}.`
        );

        return;

    }


    // Emergency first

    waitingPatients.sort(function(a, b) {

        if (
            a.priority === "Emergency" &&
            b.priority !== "Emergency"
        ) {
            return -1;
        }

        if (
            a.priority !== "Emergency" &&
            b.priority === "Emergency"
        ) {
            return 1;
        }

        return 0;

    });


    const nextPatient =
        waitingPatients[0];


    nextPatient.status =
        "With Doctor";


    // Make sure prescription array exists

    if (!nextPatient.prescriptions) {

        nextPatient.prescriptions = [];

    }


    currentMedicines = [];


    localStorage.setItem(
        "patients",
        JSON.stringify(patients)
    );


    updateDashboard();

}


// ==========================================
// SHOW PRESCRIPTION SECTION
// ==========================================

function showPrescriptionSection() {

    const section =
        document.getElementById(
            "prescriptionSection"
        );

    if (section) {

        section.style.display = "block";

    }

}


// ==========================================
// HIDE PRESCRIPTION SECTION
// ==========================================

function hidePrescriptionSection() {

    const section =
        document.getElementById(
            "prescriptionSection"
        );

    if (section) {

        section.style.display = "none";

    }

}


// ==========================================
// ADD MEDICINE
// ==========================================

function addMedicine() {

    const name =
        document.getElementById(
            "medicineName"
        ).value.trim();


    const dosage =
        document.getElementById(
            "medicineDosage"
        ).value.trim();


    const frequency =
        document.getElementById(
            "medicineFrequency"
        ).value;


    if (
        name === "" ||
        dosage === "" ||
        frequency === ""
    ) {

        alert(
            "Please enter medicine name, dosage and frequency."
        );

        return;

    }


    const medicine = {

        name: name,

        dosage: dosage,

        frequency: frequency

    };


    currentMedicines.push(medicine);


    displayMedicines();


    // Clear fields

    document.getElementById(
        "medicineName"
    ).value = "";


    document.getElementById(
        "medicineDosage"
    ).value = "";


    document.getElementById(
        "medicineFrequency"
    ).value = "";

}


// ==========================================
// DISPLAY MEDICINES
// ==========================================

function displayMedicines() {

    const container =
        document.getElementById(
            "medicineList"
        );


    container.innerHTML = "";


    currentMedicines.forEach(
        function(medicine, index) {

            const item =
                document.createElement("div");


            item.className =
                "medicine-item";


            item.innerHTML = `

                <div>

                    <strong>
                        ${medicine.name}
                    </strong>

                    <span>
                        ${medicine.dosage}
                        •
                        ${medicine.frequency}
                    </span>

                </div>


                <button
                    type="button"
                    onclick="removeMedicine(${index})"
                >
                    ✕
                </button>

            `;


            container.appendChild(item);

        }
    );

}


// ==========================================
// REMOVE MEDICINE
// ==========================================

function removeMedicine(index) {

    currentMedicines.splice(index, 1);

    displayMedicines();

}


// ==========================================
// SAVE PRESCRIPTION
// ==========================================

function savePrescription() {

    const currentPatient =
        getCurrentPatient();


    if (!currentPatient) {

        alert(
            "There is no patient currently being treated."
        );

        return;

    }


    if (currentMedicines.length === 0) {

        alert(
            "Please add at least one medicine."
        );

        return;

    }


    // Make sure array exists

    if (!currentPatient.prescriptions) {

        currentPatient.prescriptions = [];

    }


    // Create prescription

    const prescription = {

        date:
            new Date()
                .toISOString()
                .split("T")[0],

        medicines:
            [...currentMedicines]

    };


    // Add prescription

    currentPatient.prescriptions.push(
        prescription
    );


    // Save

    localStorage.setItem(
        "patients",
        JSON.stringify(patients)
    );


    alert(
        "Prescription saved successfully."
    );


    // Clear current prescription

    currentMedicines = [];

    displayMedicines();

}


// ==========================================
// COMPLETE PATIENT
// ==========================================

function completePatient() {

    const currentPatient =
        getCurrentPatient();


    if (!currentPatient) {

        alert(
            "There is no patient currently being treated."
        );

        return;

    }


    currentPatient.status =
        "Completed";


    localStorage.setItem(
        "patients",
        JSON.stringify(patients)
    );


    currentMedicines = [];


    updateDashboard();

}


// ==========================================
// DEPARTMENT CHANGE
// ==========================================

const departmentSelector =
    document.getElementById(
        "doctorDepartment"
    );


if (departmentSelector) {

    departmentSelector.addEventListener(
        "change",
        function() {

            currentMedicines = [];

            updateDashboard();

        }
    );

}


// ==========================================
// BUTTON EVENTS
// ==========================================

const callNextButton =
    document.getElementById(
        "callNextButton"
    );


if (callNextButton) {

    callNextButton.addEventListener(
        "click",
        callNextPatient
    );

}


const completeButton =
    document.getElementById(
        "completeButton"
    );


if (completeButton) {

    completeButton.addEventListener(
        "click",
        completePatient
    );

}


const addMedicineButton =
    document.getElementById(
        "addMedicineButton"
    );


if (addMedicineButton) {

    addMedicineButton.addEventListener(
        "click",
        addMedicine
    );

}


const savePrescriptionButton =
    document.getElementById(
        "savePrescriptionButton"
    );


if (savePrescriptionButton) {

    savePrescriptionButton.addEventListener(
        "click",
        savePrescription
    );

}


// ==========================================
// LOAD DASHBOARD
// ==========================================

updateDashboard();