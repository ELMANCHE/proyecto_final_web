// Función para generar el calendario dinámicamente
function generateCalendar(year = 2024, month = 3) { // Por defecto: Marzo 2024
    const calendarGrid = document.querySelector('.calendar-grid');
    const calendarHeader = document.querySelector('.calendar-header');
    calendarGrid.innerHTML = '';
    
    // Días de la semana
    const daysOfWeek = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];
    
    // Generar encabezados
    calendarHeader.innerHTML = daysOfWeek.map(day => 
        `<div class="day">${day}</div>`
    ).join('');

    // Obtener información de fechas
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay(); // 0 = Domingo, 6 = Sábado
    
    // Agregar celdas vacías antes del primer día
    for (let i = 0; i < startingDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'date-cell';
        calendarGrid.appendChild(emptyCell);
    }

    // Agregar días del mes
    for (let day = 1; day <= daysInMonth; day++) {
        const cell = document.createElement('div');
        cell.className = 'date-cell';
        cell.innerHTML = `<div class="date-number">${day}</div>`;
        cell.addEventListener('click', openEventModal);
        calendarGrid.appendChild(cell);
    }
}

// Inicialización del calendario
document.addEventListener('DOMContentLoaded', () => {
    generateCalendar(); // Generar calendario al cargar la página
    
    // Selector de temas
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.body.classList.remove('pink-theme');
            if (btn.dataset.theme === 'pink') {
                document.body.classList.add('pink-theme');
            }
        });
    });
});

// Función para abrir el modal de eventos
function openEventModal(e) {
    document.querySelector('.event-modal').classList.remove('hidden');
}

// Cerrar modal al hacer clic en "X"
document.querySelector('.close-btn').addEventListener('click', () => {
    document.querySelector('.event-modal').classList.add('hidden');
});