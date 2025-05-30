// Función para cargar pacientes desde el backend
function loadPatients() {
    // Aquí iría tu lógica para fetchear datos del backend
    // Ejemplo simulación:
    setTimeout(() => {
        const patients = [
            { id: 1, name: "María Gómez", phone: "123-456-7890", age: 32 },
            { id: 2, name: "Carlos Pérez", phone: "987-654-3210", age: 28 },
            { id: 3, name: "Ana López", phone: "555-123-4567", age: 41 },
            { id: 4, name: "Juan Martínez", phone: "333-987-6543", age: 37 },
        ];

        const tbody = document.querySelector("#patientsTable tbody");
        tbody.innerHTML = "";

        patients.forEach(patient => {
            const row = document.createElement("tr");
            row.className = "patient-row";
            row.dataset.id = patient.id;

            row.innerHTML = `
                <td>${patient.id}</td>
                <td>${patient.name}</td>
                <td>${patient.phone}</td>
                <td>${patient.age}</td>
            `;

            // Evento para navegar al historial
            row.addEventListener("click", () => {
                window.location.href = `/historial/${patient.id}`;
            });

            tbody.appendChild(row);
        });
    }, 500); // Simulación de delay de red
}

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
    loadPatients();
});