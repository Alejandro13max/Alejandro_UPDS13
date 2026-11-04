// ==========================================
// 1. DOBLE SELECCIÓN DE MÚSICA (DOM)
// ==========================================
const selectArtista = document.getElementById('artista');
const selectCancion = document.getElementById('cancion');
const infoCancion = document.getElementById('info-cancion');

const musicaDB = {
    duki: [
        { titulo: "Goteo", anio: 2019 },
        { titulo: "Rockstar", anio: 2018 },
        { titulo: "Tumbando la Puerta", anio: 2020 }
    ],
    cro: [
        { titulo: "Ella", anio: 2021 },
        { titulo: "Trap Life", anio: 2019 },
        { titulo: "C.R.O", anio: 2022 }
    ]
};

selectArtista.addEventListener('change', (e) => {
    const artista = e.target.value;
    selectCancion.innerHTML = '<option class="bg-dark" value="">-- Elige una canción --</option>';
    
    if (artista) {
        selectCancion.disabled = false;
        musicaDB[artista].forEach(cancion => {
            const option = document.createElement('option');
            option.className = 'bg-dark';
            option.value = cancion.titulo;
            option.textContent = cancion.titulo;
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
        infoCancion.innerHTML = `<i class="fas fa-play"></i> ${titulo} - ${artistaNombre} (${anio})`;
        infoCancion.style.display = 'block';
    } else {
        infoCancion.style.display = 'none';
    }
});


// ==========================================
// 2. FILTRO DE JUEGOS (DOM)
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
        div.innerHTML = `
            <h6 class="text-white mb-0 fw-bold" style="font-size: 0.9rem;">${juego.nombre}</h6>
            <small class="text-light-muted" style="font-size: 0.8rem;">${juego.desc}</small>
        `;
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
// 3. VALIDACIÓN DEL FORMULARIO (DOM)
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
    if (nombre.length < 3) {
        mostrarError('nombre', 'Mínimo 3 letras.');
        valido = false;
    } else { limpiarError('nombre'); }

    const email = document.getElementById('email').value.trim();
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regexEmail.test(email)) {
        mostrarError('email', 'Correo no válido.');
        valido = false;
    } else { limpiarError('email'); }

    const mensaje = document.getElementById('mensaje').value.trim();
    if (mensaje.length < 10) {
        mostrarError('mensaje', 'Mínimo 10 caracteres.');
        valido = false;
    } else { limpiarError('mensaje'); }

    const terminos = document.getElementById('terminos').checked;
    if (!terminos) {
        mostrarError('terminos', 'Debes aceptar los términos.');
        valido = false;
    } else { limpiarError('terminos'); }

    if (valido) {
        mensajeExito.style.display = 'block';
        form.reset();
        setTimeout(() => { mensajeExito.style.display = 'none'; }, 4000);
    }
});

['nombre', 'email', 'mensaje', 'terminos'].forEach(id => {
    document.getElementById(id).addEventListener('input', () => limpiarError(id));
});