// ==========================================
// 1. DOBLE SELECCIÓN DE MÚSICA (Tu código original)
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
    selectCancion.innerHTML = '<option value="">-- Elige una canción --</option>';
    
    if (artista) {
        selectCancion.disabled = false;
        musicaDB[artista].forEach(cancion => {
            const option = document.createElement('option');
            option.value = cancion.titulo;
            option.textContent = cancion.titulo; // Seguro (TextContent)
            option.dataset.anio = cancion.anio;
            selectCancion.appendChild(option);
        });
        infoCancion.style.display = 'none';
    } else {
        selectCancion.disabled = true;
        infoCancion.style.display = 'none';
    }
});

selectCancion.addEventListener('change', (e) => {
    const titulo = e.target.value;
    if (titulo) {
        const anio = e.target.options[e.target.selectedIndex].dataset.anio;
        const artistaNombre = selectArtista.options[selectArtista.selectedIndex].text;
        
        // RÚBRICA: Sanitización con .text() en lugar de innerHTML
        infoCancion.textContent = `▶ ${titulo} - ${artistaNombre} (${anio})`;
        infoCancion.style.display = 'block';
    } else {
        infoCancion.style.display = 'none';
    }
});


// ==========================================
// 2. FILTRO DE JUEGOS (Tu código original)
// ==========================================
const juegosData = [
    { nombre: "World of Warcraft", cat: "mmorpg", desc: "MMORPG de fantasía épica" },
    { nombre: "League of Legends", cat: "moba", desc: "MOBA 5v5 competitivo" },
    { nombre: "PES 2026", cat: "deportes", desc: "Simulador de fútbol" }
];

const contenedorJuegos = document.getElementById('contenedor-juegos');
const botonesFiltro = document.querySelectorAll('.filter-btn');

function renderizarJuegos(filtro) {
    contenedorJuegos.innerHTML = ''; 
    const filtrados = filtro === 'todos' ? juegosData : juegosData.filter(j => j.cat === filtro);
    
    filtrados.forEach(juego => {
        const div = document.createElement('div');
        div.className = 'p-2 border-start border-2';
        div.style.borderColor = 'var(--gengar-purple)';
        
        // Se construye de forma segura
        const h6 = document.createElement('h6');
        h6.className = 'text-white mb-0 fw-bold';
        h6.textContent = juego.nombre;
        
        const small = document.createElement('small');
        small.className = 'text-light-muted';
        small.textContent = juego.desc;

        div.appendChild(h6);
        div.appendChild(small);
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
// 3. VALIDACIÓN DEL FORMULARIO (Tu código original)
// ==========================================
const form = document.getElementById('contact-form');
const mensajeExito = document.getElementById('mensaje-exito');

function mostrarError(id, msj) {
    document.getElementById(`error-${id}`).textContent = msj;
    document.getElementById(`error-${id}`).style.display = 'block';
    document.getElementById(id).classList.add('input-error');
}
function limpiarError(id) {
    document.getElementById(`error-${id}`).style.display = 'none';
    document.getElementById(id).classList.remove('input-error');
}

form.addEventListener('submit', (e) => {
    e.preventDefault(); 
    let valido = true;
    const nombre = document.getElementById('nombre').value.trim();
    if (nombre.length < 3) { mostrarError('nombre', 'Mínimo 3 letras.'); valido = false; } else { limpiarError('nombre'); }
    const email = document.getElementById('email').value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { mostrarError('email', 'Correo no válido.'); valido = false; } else { limpiarError('email'); }

    if (valido) {
        mensajeExito.style.display = 'block';
        form.reset();
        setTimeout(() => { mensajeExito.style.display = 'none'; }, 4000);
    }
});


// ==========================================
// 4. AGREGADOS DE LOS PDFs (Modo Oscuro, PWA, Red y Event Bubbling)
// ==========================================
$(document).ready(function() {

    // A. MODO OSCURO / HIDRATACIÓN (Del PDF de Hidratación)
    $('#themeBtn').off('click').on('click', function() {
        document.body.classList.toggle('modo-oscuro');
        let esOscuro = document.body.classList.contains('modo-oscuro');
        $(this).text(esOscuro ? '☀️ Modo' : '🌙 Modo');
    });

    // B. DETECTOR DE RED (Del PDF de Offline-First)
    function actualizarEstadoRed() {
        if (navigator.onLine) {
            $('#estadoRed').text('En Línea').css({'background':'#198754', 'color':'white'});
        } else {
            $('#estadoRed').text('Modo Offline').css({'background':'#ffc107', 'color':'black'});
        }
    }
    $(window).on('online offline', actualizarEstadoRed);
    actualizarEstadoRed();

    // C. REGISTRO DEL SERVICE WORKER
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('sw.js')
                .then(reg => console.log('Service Worker Registrado:', reg.scope))
                .catch(err => console.error('Fallo SW:', err));
        });
    }
});
