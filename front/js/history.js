// Evento de submit del formulario
document.getElementById('medicalForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Aquí iría tu lógica para enviar los datos al backend
    console.log('Formulario enviado:', {
        name: document.getElementById('name').value,
        dateOfBirth: document.getElementById('dateOfBirth').value,
        gender: document.getElementById('gender').value,
        address: document.getElementById('address').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        allergies: document.getElementById('allergies').value,
        currentMedications: document.getElementById('currentMedications').value,
        pastSurgeries: document.getElementById('pastSurgeries').value,
        chronicConditions: document.getElementById('chronicConditions').value,
        insuranceCompany: document.getElementById('insuranceCompany').value,
        policyNumber: document.getElementById('policyNumber').value,
        groupNumber: document.getElementById('groupNumber').value,
        consent: document.getElementById('consent').checked
    });
});