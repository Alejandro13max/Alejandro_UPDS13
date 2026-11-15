// ==========================================
// 1. NAVEGACIÓN TIPO APP
// ==========================================
function cambiarSeccion(idSeccion, elementoBoton = null) {
    document.querySelectorAll('.app-seccion').forEach(sec => sec.classList.remove('activa'));
    document.getElementById('sec-' + idSeccion).classList.add('activa');
    
    if (elementoBoton) {
        document.querySelectorAll('.bottom-nav .nav-item').forEach(nav => nav.classList.remove('active'));
        elementoBoton.classList.add('active');
    }

    $('#menuDesplegable').removeClass('show');
    $('#overlay').fadeOut(200);
}

// ==========================================
// 2. LÓGICA DE MODALES (Sobre Mí)
// ==========================================
const dataModales = {
    'futsal': {
        titulo: '⚽ Mi Pasión: El Futsal',
        contenido: 'Juego futsal a nivel semiprofesional. Actualmente entreno con mi club todas las tardes. He participado en campeonatos locales de La Paz, destacando en la posición de ala. Me encanta la disciplina, la velocidad del juego y el trabajo en equipo. Mi meta este año es ganar el torneo de la asociación.'
    },
    'gaming': {
        titulo: '🎮 Mi Mundo Gamer',
        contenido: 'Soy un jugador estratégico. Mis juegos favoritos son World of Warcraft (MMORPG) donde exploro mazmorras con amigos; League of Legends (MOBA) para partidas competitivas; y PES 2026, porque el fútbol siempre está presente en mi vida. Suelo jugar en PC durante las noches después de estudiar.'
    },
    'estudio': {
        titulo: '💻 Mi Formación Académica',
        contenido: 'Soy estudiante de Ingeniería de Sistemas en la UPDS (Sede La Paz). Me apasiona el Desarrollo Web y la creación de interfaces. Actualmente me encuentro aprendiendo HTML, CSS, JavaScript, jQuery y arquitecturas PWA. Mi objetivo es convertirme en un Desarrollador Full-Stack.'
    },
    'hardware': {
        titulo: '🔧 Hardware y PCs',
        contenido: 'Me encanta armar computadoras de cero. Sé cómo elegir componentes (procesador, tarjeta madre, RAM, GPU) según el presupuesto y el uso. Sé cómo elegir componentes (procesador, tarjeta madre, RAM, GPU) según el presupuesto y el uso. Me gusta optimizar sistemas operativos y hacer mantenimiento para que las PCs rindan al máximo.'
    }
};

function abrirModal(tipo) {
    const data = dataModales[tipo];
    if (data) {
        document.getElementById('modalTitulo').innerText = data.titulo;
        // Sanitización para el modal usando textContent para evitar XSS
        document.getElementById('modalContenido').innerText = data.contenido;
        
        // Abrir modal con Bootstrap
        const modal = new bootstrap.Modal(document.getElementById('modalInfo'));
        modal.show();
    }
}

// ==========================================
// 3. MENÚ HAMBURGUESA Y HIDRATACIÓN
// ==========================================
$(document).ready(function() {
    $('#btnMenu').on('click', function() {
        let estaAbierto = $('#menuDesplegable').hasClass('show');
        if (!estaAbierto) {
            $('#menuDesplegable').addClass('show');
            $('#overlay').fadeIn(200);
            
            $('#textoHidratacion').text('Cargando eventos...');
            setTimeout(() => {
                $('#textoHidratacion').text('✅ Menú Hidratado').css('color', '#198754');
            }, 500);
        } else {
            $('#menuDesplegable').removeClass('show');
            $('#overlay').fadeOut(200);
            $('#textoHidratacion').text('').css('color', 'inherit'); 
        }
    });

    $('#overlay').on('click', function() {
        $('#menuDesplegable').removeClass('show');
        $(this).fadeOut(200);
    });
});

// ==========================================
// 4. MODO OSCURO CON MEMORIA
// ==========================================
$(document).ready(function() {
    let modoGuardado = localStorage.getItem('modoOscuroActivo');
    if (modoGuardado === 'true') {
        document.body.classList.add('modo-oscuro');
        $('#themeBtn').text('☀️');
    }

    $('#themeBtn').off('click').on('click', function() {
        document.body.classList.toggle('modo-oscuro');
        let esOscuro = document.body.classList.contains('modo-oscuro');
        $(this).text(esOscuro ? '☀️' : '🌙');
        localStorage.setItem('modoOscuroActivo', esOscuro);
    });
});

// ==========================================
// 5. LÓGICA DE MÚSICA Y JUEGOS
// ==========================================
const selectArtista = document.getElementById('artista');
const selectCancion = document.getElementById('cancion');
const infoCancion = document.getElementById('info-cancion');
const musicaDB = {
    duki: [ { titulo: "Goteo", anio: 2019 }, { titulo: "Rockstar", anio: 2018 } ],
    cro: [ { titulo: "Ella", anio: 2021 }, { titulo: "Trap Life", anio: 2019 } ]
};

selectArtista.addEventListener('change', (e) => {
    const artista = e.target.value;
    selectCancion.innerHTML = '<option value="">-- Canción --</option>';
    if (artista) {
        selectCancion.disabled = false;
        musicaDB[artista].forEach(cancion => {
            const option = document.createElement('option');
            option.value = cancion.titulo;
            option.textContent = cancion.titulo; 
            option.dataset.anio = cancion.anio;
            selectCancion.appendChild(option);
        });
    } else { selectCancion.disabled = true; infoCancion.style.display = 'none'; }
});

selectCancion.addEventListener('change', (e) => {
    const titulo = e.target.value;
    if (titulo) {
        const anio = e.target.options[e.target.selectedIndex].dataset.anio;
        infoCancion.textContent = `▶ ${titulo} (${anio})`;
        infoCancion.style.display = 'block';
    } else { infoCancion.style.display = 'none'; }
});

const juegosData = [
    { nombre: "World of Warcraft", cat: "mmorpg" }, 
    { nombre: "League of Legends", cat: "moba" }, 
    { nombre: "PES 2026", cat: "deportes" }
];
const contenedorJuegos = document.getElementById('contenedor-juegos');
const botonesFiltro = document.querySelectorAll('.filter-btn');

function renderizarJuegos(filtro) {
    contenedorJuegos.innerHTML = ''; 
    const filtrados = filtro === 'todos' ? juegosData : juegosData.filter(j => j.cat === filtro);
    filtrados.forEach(juego => {
        const div = document.createElement('div');
        div.className = 'p-2 rounded bg-light mb-2 border-start border-3';
        div.style.borderColor = 'var(--gengar-purple)';
        div.innerHTML = `<h6 class="mb-0 fw-bold text-dark" style="font-size:0.9rem;">${juego.nombre}</h6>`;
        contenedorJuegos.appendChild(div);
    });
}
botonesFiltro.forEach(btn => {
    btn.addEventListener('click', (e) => {
        botonesFiltro.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        renderizarJuegos(e.target.dataset.cat);
    });
});
renderizarJuegos('todos');

// ==========================================
// 6. VALIDACIÓN FORMULARIO Y RED
// ==========================================
const form = document.getElementById('contact-form');
form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    let valido = true;
    if (document.getElementById('nombre').value.trim().length < 3) { 
        document.getElementById('error-nombre').textContent="Mínimo 3 letras"; 
        document.getElementById('error-nombre').style.display='block'; 
        valido=false; 
    } else { document.getElementById('error-nombre').style.display='none'; }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(document.getElementById('email').value)) { 
        document.getElementById('error-email').textContent="Correo inválido"; 
        document.getElementById('error-email').style.display='block'; 
        valido=false; 
    } else { document.getElementById('error-email').style.display='none'; }

    if (valido) {
        document.getElementById('mensaje-exito').style.display = 'block';
        form.reset();
        setTimeout(() => { document.getElementById('mensaje-exito').style.display = 'none'; }, 4000);
    }
});

function actualizarEstadoRed() {
    if (navigator.onLine) { $('#estadoRed').text('En Línea').css({'background':'#198754'}); } 
    else { $('#estadoRed').text('Offline').css({'background':'#ffc107', 'color':'black'}); }
}
$(window).on('online offline', actualizarEstadoRed);
actualizarEstadoRed();

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(err => console.log(err)));
}