// Ejemplo de cómo podría interactuar con el formulario de búsqueda
document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const query = document.getElementById('searchInput').value;
    // Aquí puedes integrar tu lógica existente para enviar la consulta al backend
    console.log('Buscando:', query);
});

// Función para limpiar el campo de búsqueda
document.querySelector('.clear-icon').addEventListener('click', function() {
    document.getElementById('searchInput').value = '';
});