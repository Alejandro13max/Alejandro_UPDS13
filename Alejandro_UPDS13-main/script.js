// ==========================================
// VARIABLES GLOBALES
// ==========================================
let hidratado = false;

// ==========================================
// 1. FUNCIÓN DE HIDRATACIÓN PRINCIPAL
// ==========================================
function hidratarPagina() {
    if (hidratado) {
        console.log("La página ya está hidratada.");
        return;
    }

    console.log("Iniciando hidratación...");

    const btnHidratar = document.getElementById('btnHidratar');
    btnHidratar.innerHTML = '<i class="fas fa-check-circle me-2"></i> Página Hidratada';
    btnHidratar.classList.remove('btn-outline-light');
    btnHidratar.classList.add('btn-gengar', 'hidratado');
    btnHidratar.disabled = true;

    // Habilitar todos los inputs y botones
    document.querySelectorAll('input, select, textarea, button').forEach(el => {
        if (el.id !== 'btnHidratar') {
            el.disabled = false;
        }
    });

    // --- 1. Lógica de Música ---
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
        selectCancion.innerHTML = '<option value="">-- Elige una canción --</option>';
        
        if (artista) {
            selectCancion.disabled = false;
            musicaDB[artista].forEach(cancion => {
                const option = document.createElement('option');
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

    // --- 2. Filtro de Juegos ---
    const juegosData = [
        { nombre: "World of Warcraft", cat: "mmorpg", desc: "MMORPG de fantasía épica" },
        { nombre: "League of Legends", cat: "moba", desc: "MOBA 5v5 competitivo" },
        { nombre: "PES 2026", cat: "deportes", desc: "Simulador de fútbol" }
    ];

    const contenedorJuegos = document.getElementById('contenedor-juegos');
    const botonesFiltro = document.querySelectorAll('.filter-btn');

    function renderizarJuegos(filtro) {
        if(!contenedorJuegos) return;
        contenedorJuegos.innerHTML = ''; 
        
        const filtrados = filtro === 'todos' ? juegosData : juegosData.filter(j => j.cat === filtro);
        
        filtrados.forEach(juego => {
            const div = document.createElement('div');
            div.className = 'p-3 rounded-3 mb-2';
            div.style.backgroundColor = '#1a1b23';
            div.style.borderLeft = '3px solid var(--gengar-purple)';
            div.innerHTML = `
                <h6 class="text-white mb-0 fw-bold" style="font-size: 0.9rem;">${juego.nombre}</h6>
                <small class="text-muted" style="font-size: 0.8rem;">${juego.desc}</small>
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
    document.querySelector('.filter-btn[data-cat="todos"]').classList.add('active');

    // --- 3. Validación del Formulario ---
    const form = document.getElementById('contact-form');
    const mensajeExito = document.getElementById('mensaje-exito');

    function mostrarError(id, msj) {
        const el = document.getElementById(`error-${id}`);
        if(el) {
            el.textContent = msj;
            el.style.display = 'block';
            document.getElementById(id).classList.add('input-error');
        }
    }

    function limpiarError(id) {
        const el = document.getElementById(`error-${id}`);
        if(el) {
            el.style.display = 'none';
            document.getElementById(id).classList.remove('input-error');
        }
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
        if (mensaje.length < 5) { 
            mostrarError('mensaje', 'Mínimo 5 caracteres.');
            valido = false;
        } else { limpiarError('mensaje'); }

        const terminos = document.getElementById('terminos').checked;
        if (!terminos) {
            mostrarError('terminos', 'Acepta términos.');
            valido = false;
        } else { limpiarError('terminos'); }

        if (valido) {
            mensajeExito.style.display = 'block';
            form.reset();
            setTimeout(() => { mensajeExito.style.display = 'none'; }, 3000);
        }
    });

    ['nombre', 'email', 'mensaje', 'terminos'].forEach(id => {
        document.getElementById(id).addEventListener('input', () => limpiarError(id));
    });

    // --- 4. Navegación por Pestañas ---
    const navItems = document.querySelectorAll('.nav-item');
    const tabs = document.querySelectorAll('.tab-pane');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            tabs.forEach(tab => tab.classList.remove('active'));

            item.classList.add('active');
            const targetId = item.dataset.target;
            document.getElementById(targetId).classList.add('active');
        });
    });

    hidratado = true;
    document.getElementById('contenedorMenu').setAttribute('data-hidratado', 'true');
    console.log("¡Página hidratada correctamente!");
}

// ==========================================
// 2. EVENTO DEL BOTÓN DE HIDRATACIÓN
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const btnHidratar = document.getElementById('btnHidratar');
    if (btnHidratar) {
        btnHidratar.addEventListener('click', hidratarPagina);
    }
});