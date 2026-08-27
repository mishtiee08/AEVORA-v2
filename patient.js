// ==========================================
// AEVORA - PATIENT RECORDS
// ==========================================


// Get saved patients

let patients =
    JSON.parse(localStorage.getItem("patients")) || [];


// ==========================================
// ELEMENTS
// ==========================================

const searchInput =
    document.getElementById("patientIdSearch");

const searchButton =
    document.getElementById("searchPatientButton");

const searchMessage =
    document.getElementById("searchMessage");

const patientRecord =
    document.getElementById("patientRecord");


// ==========================================
// SEARCH PATIENT
// ==========================================

function searchPatient() {

    const enteredId =
        searchInput.value.trim().toUpperCase();


    // Empty search

    if (enteredId === "") {

        searchMessage.textContent =
            "Please enter a Patient ID.";

        patientRecord.style.display =
            "none";

        return;

    }


    // Find patient

    const patient =
        patients.find(function(patient) {

            return (
                patient.patientId &&
                patient.patientId.toUpperCase() ===
                enteredId
            );

        });


    // Patient not found

    if (!patient) {

        searchMessage.textContent =
            "❌ Patient not found. Please check the Patient ID.";

        patientRecord.style.display =
            "none";

        return;

    }


    // Patient found

    searchMessage.textContent =
        "✓ Patient record found.";

    patientRecord.style.display =
        "block";


    displayPatient(patient);

}


// ==========================================
// DISPLAY PATIENT
// ==========================================

function displayPatient(patient) {


    document.getElementById(
        "recordPatientName"
    ).textContent =
        patient.name;


    document.getElementById(
        "recordPatientId"
    ).textContent =
        patient.patientId;


    document.getElementById(
        "recordId"
    ).textContent =
        patient.patientId;


    document.getElementById(
        "recordAge"
    ).textContent =
        patient.age;


    document.getElementById(
        "recordGender"
    ).textContent =
        patient.gender;


    document.getElementById(
        "recordDepartment"
    ).textContent =
        patient.department;


    document.getElementById(
        "recordDate"
    ).textContent =
        patient.registrationDate || "—";


    document.getElementById(
        "recordReason"
    ).textContent =
        patient.reason || "—";


    displayPrescriptions(patient);

}


// ==========================================
// PRESCRIPTION HISTORY
// ==========================================

function displayPrescriptions(patient) {

    const container =
        document.getElementById(
            "prescriptionHistory"
        );


    container.innerHTML = "";


    // No prescriptions yet

    if (
        !patient.prescriptions ||
        patient.prescriptions.length === 0
    ) {

        container.innerHTML = `

            <p class="empty-message">

                No prescriptions recorded.

            </p>

        `;

        return;

    }


    // Display prescriptions

    patient.prescriptions.forEach(
        function(prescription) {

            const prescriptionCard =
                document.createElement("div");


            prescriptionCard.className =
                "prescription-card";


            prescriptionCard.innerHTML = `

                <div class="prescription-date">

                    📅 ${prescription.date}

                </div>


                <div class="prescription-medicines">

                    ${prescription.medicines
                        .map(function(medicine) {

                            return `

                                <div class="medicine-item">

                                    <strong>
                                        ${medicine.name}
                                    </strong>

                                    <span>
                                        ${medicine.dosage}
                                        -
                                        ${medicine.frequency}
                                    </span>

                                </div>

                            `;

                        })
                        .join("")}

                </div>

            `;


            container.appendChild(
                prescriptionCard
            );

        }
    );

}


// ==========================================
// SEARCH BUTTON
// ==========================================

searchButton.addEventListener(
    "click",
    searchPatient
);


// ==========================================
// ENTER KEY
// ==========================================

searchInput.addEventListener(
    "keypress",
    function(event) {

        if (event.key === "Enter") {

            searchPatient();

        }

    }
);