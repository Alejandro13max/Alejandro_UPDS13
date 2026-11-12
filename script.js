// ==============================================================================
// PORTAFOLIO MINIMALISTA - JAVASCRIPT PRINCIPAL
// Interacciones habilitadas por defecto con Delegación de Eventos (Event Bubbling)
// ==============================================================================

$(document).ready(function() {

    // ==========================================
    // 1. NAVEGACIÓN ENTRE PESTAÑAS (DELEGACIÓN DE EVENTOS)
    // ==========================================
    const appNav = document.querySelector('.app-nav');
    if (appNav) {
        appNav.addEventListener('click', (e) => {
            const navItem = e.target.closest('.nav-item');
            if (navItem) {
                e.preventDefault();
                document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
                document.querySelectorAll('.tab-pane').forEach(tab => tab.classList.remove('active'));

                navItem.classList.add('active');
                const targetId = navItem.dataset.target;
                const targetTab = document.getElementById(targetId);
                if (targetTab) {
                    targetTab.classList.add('active');
                }
            }
        });
    }

    // ==========================================
    // 2. SELECCIÓN DE TARJETAS (DELEGACIÓN DE EVENTOS OPTIMIZADA)
    // ==========================================
    $(document).off('click', '.tarjeta-item').on('click', '.tarjeta-item', function(e) {
        console.log('Elemento capturado por propagación (Event Bubbling):', e.target);
        $(this).toggleClass('tarjeta-seleccionada');
    });

    // ==========================================
    // 3. SELECTOR DE MÚSICA (HABILITADO POR DEFECTO)
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

    if (selectArtista && selectCancion) {
        selectArtista.addEventListener('change', (e) => {
            const artista = e.target.value;
            selectCancion.innerHTML = '<option value="">-- Elige una canción --</option>';
            
            if (artista && musicaDB[artista]) {
                musicaDB[artista].forEach(cancion => {
                    const option = document.createElement('option');
                    option.value = cancion.titulo;
                    option.textContent = cancion.titulo;
                    option.dataset.anio = cancion.anio;
                    selectCancion.appendChild(option);
                });
                if (infoCancion) infoCancion.style.display = 'none';
            } else {
                selectCancion.innerHTML = '<option value="">Elige artista primero</option>';
                if (infoCancion) infoCancion.style.display = 'none';
            }
        });

        selectCancion.addEventListener('change', (e) => {
            const titulo = e.target.value;
            if (titulo && infoCancion) {
                const anio = e.target.options[e.target.selectedIndex]?.dataset.anio || '';
                const artistaNombre = selectArtista.options[selectArtista.selectedIndex]?.text || '';
                infoCancion.innerHTML = `<i class="fas fa-play"></i> ${titulo} - ${artistaNombre} (${anio})`;
                infoCancion.style.display = 'block';
            } else if (infoCancion) {
                infoCancion.style.display = 'none';
            }
        });
    }

    // ==========================================
    // 4. FILTROS DE JUEGOS (DELEGACIÓN DE EVENTOS EN CONTENEDOR)
    // ==========================================
    const juegosData = [
        { nombre: "World of Warcraft", cat: "mmorpg", desc: "MMORPG de fantasía épica" },
        { nombre: "League of Legends", cat: "moba", desc: "MOBA 5v5 competitivo" },
        { nombre: "PES 2026", cat: "deportes", desc: "Simulador de fútbol" }
    ];

    const contenedorJuegos = document.getElementById('contenedor-juegos');

    function renderizarJuegos(filtro) {
        if (!contenedorJuegos) return;
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

    const contenedorFiltros = document.getElementById('filtros-juegos');
    if (contenedorFiltros) {
        contenedorFiltros.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                renderizarJuegos(e.target.dataset.cat);
            }
        });
        renderizarJuegos('todos');
    }

    // ==========================================
    // 5. VALIDACIÓN DEL FORMULARIO DE CONTACTO
    // ==========================================
    const form = document.getElementById('contact-form');
    const mensajeExito = document.getElementById('mensaje-exito');

    function mostrarError(id, msj) {
        const el = document.getElementById(`error-${id}`);
        if (el) {
            el.textContent = msj;
            el.style.display = 'block';
            const inputEl = document.getElementById(id);
            if (inputEl) inputEl.classList.add('input-error');
        }
    }

    function limpiarError(id) {
        const el = document.getElementById(`error-${id}`);
        if (el) {
            el.style.display = 'none';
            const inputEl = document.getElementById(id);
            if (inputEl) inputEl.classList.remove('input-error');
        }
    }

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); 
            let valido = true;

            const nombre = document.getElementById('nombre')?.value.trim() || '';
            if (nombre.length < 3) {
                mostrarError('nombre', 'Mínimo 3 letras.');
                valido = false;
            } else { limpiarError('nombre'); }

            const email = document.getElementById('email')?.value.trim() || '';
            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(email)) {
                mostrarError('email', 'Correo no válido.');
                valido = false;
            } else { limpiarError('email'); }

            const mensaje = document.getElementById('mensaje')?.value.trim() || '';
            if (mensaje.length < 5) { 
                mostrarError('mensaje', 'Mínimo 5 caracteres.');
                valido = false;
            } else { limpiarError('mensaje'); }

            const terminos = document.getElementById('terminos')?.checked;
            if (!terminos) {
                mostrarError('terminos', 'Acepta los términos.');
                valido = false;
            } else { limpiarError('terminos'); }

            if (valido && mensajeExito) {
                mensajeExito.style.display = 'block';
                form.reset();
                setTimeout(() => { mensajeExito.style.display = 'none'; }, 3000);
            }
        });

        ['nombre', 'email', 'mensaje', 'terminos'].forEach(id => {
            const campo = document.getElementById(id);
            if (campo) {
                campo.addEventListener('input', () => limpiarError(id));
                campo.addEventListener('change', () => limpiarError(id));
            }
        });
    }

    // ==========================================
    // 6. INDICADOR DE ESTADO OFFLINE / ONLINE
    // ==========================================
    function actualizarEstadoRed() {
        const $badge = $('#badgeEstadoRed');
        if (!$badge.length) return;
        if (navigator.onLine) {
            $badge.removeClass('bg-danger').addClass('bg-success').html('<i class="fas fa-wifi me-1"></i> Online');
        } else {
            $badge.removeClass('bg-success').addClass('bg-danger').html('<i class="fas fa-plane me-1"></i> Offline');
        }
    }

    window.addEventListener('online', actualizarEstadoRed);
    window.addEventListener('offline', actualizarEstadoRed);
    actualizarEstadoRed();
});
