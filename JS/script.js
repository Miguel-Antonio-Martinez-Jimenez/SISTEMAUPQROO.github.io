// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDktB5BvLZNCmKsdU3LO3d4tbpnDY5my0g",
    databaseURL: "https://esp32-firebase-36bc2-default-rtdb.firebaseio.com/",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Reference to the database
var database = firebase.database();
var casaRef = database.ref('CASA');

// Function to update HTML elements
function updateUI(data) {
    document.getElementById('Sistema').value = data.Sistema;
    document.getElementById('Distancia').value = `${data.Distancia} cm`;
    document.getElementById('Movimiento').value = data.Movimiento;

    // Update alert based on movement detection and system status
    const alertContainer = document.getElementById('alert-container');
    alertContainer.innerHTML = ''; // Clear previous alert

    if (data.Sistema === "Desactivado") {
        alertContainer.innerHTML = `
            <div class="alert alert-warning text-center" role="alert">
            El sistema de seguridad está apagado. Actívalo para garantizar la protección de tu hogar.
            </div>
        `;
    } else if (data.Movimiento === "Detectado") {
        alertContainer.innerHTML = `
            <div class="alert alert-danger text-center" role="alert">
            El sistema de seguridad ha detectado movimiento. Toma medidas de seguridad.
            </div>
        `;
    } else {
        alertContainer.innerHTML = `
            <div class="alert alert-success text-center" role="alert">
            El sistema de seguridad está funcionando correctamente. Tu hogar está seguro.
            </div>
        `;
    }
}

// Listen for changes in the database
casaRef.on('value', (snapshot) => {
    const data = snapshot.val();
    updateUI(data);
});
