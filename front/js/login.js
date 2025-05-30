// Evento de submit del formulario
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Aquí iría tu lógica para enviar los datos al backend
    console.log('Login:', {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value
    });
});