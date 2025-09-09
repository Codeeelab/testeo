// ===== PLATAFORMA ESTUDIANTIL - SCRIPT PRINCIPAL =====
// Este archivo contiene toda la lógica para cargar materias y videos dinámicamente
// Es fácilmente escalable siguiendo las instrucciones en los comentarios

// ===== CONFIGURACIÓN DE MATERIAS =====
// Para agregar una nueva materia:
// 1. Agrega un nuevo objeto al array 'materias'
// 2. Crea el archivo HTML correspondiente en la carpeta /materias/
// 3. ¡Listo! La plataforma se actualizará automáticamente

const materias = [
    {
        id: 'lengua',
        nombre: 'Lengua y Literatura',
        descripcion: 'Explora el maravilloso mundo de la lengua y la literatura española',
        icono: '📚',
        color: '#8B0000'
    },
    {
        id: 'matematicas',
        nombre: 'Matemáticas',
        descripcion: 'Descubre la lógica y belleza de los números y las operaciones',
        icono: '🔢',
        color: '#A52A2A'
    },
    {
        id: 'biologia',
        nombre: 'Biología',
        descripcion: 'Adéntrate en el estudio de la vida y los seres vivos',
        icono: '🔬',
        color: '#DC143C'
    },
    {
        id: 'historia',
        nombre: 'Historia',
        descripcion: 'Viaja a través del tiempo y conoce las civilizaciones',
        icono: '🏛️',
        color: '#B22222'
    },
    {
        id: 'fisica',
        nombre: 'Física',
        descripcion: 'Comprende las leyes que rigen el universo',
        icono: '⚡',
        color: '#8B0000'
    },
    {
        id: 'quimica',
        nombre: 'Química',
        descripcion: 'Explora la composición y transformación de la materia',
        icono: '🧪',
        color: '#A52A2A'
    }
];

// ===== CONFIGURACIÓN DE VIDEOS POR MATERIA =====
// Para agregar nuevos videos a una materia:
// 1. Localiza la materia en el objeto 'videosPorMateria'
// 2. Agrega un nuevo objeto con 'titulo' y 'url' del video de YouTube
// 3. El video se mostrará automáticamente en la página de la materia

const videosPorMateria = {
    lengua: [
        {
            titulo: 'Gramática Española - Presente de Indicativo',
            url: 'https://www.youtube.com/embed/3QaR7mRXUxo'
        },
        {
            titulo: 'Análisis Literario - Poemas de García Lorca',
            url: 'https://www.youtube.com/embed/9R4TgW9Y8yQ'
        },
        {
            titulo: 'Ortografía - Uso de la B y V',
            url: 'https://www.youtube.com/embed/7R4TgW9Y8yQ'
        }
    ],
    matematicas: [
        {
            titulo: 'Álgebra - Ecuaciones de Primer Grado',
            url: 'https://www.youtube.com/embed/5R4TgW9Y8yQ'
        },
        {
            titulo: 'Geometría - Triángulos y sus Propiedades',
            url: 'https://www.youtube.com/embed/6R4TgW9Y8yQ'
        },
        {
            titulo: 'Estadística - Media, Mediana y Moda',
            url: 'https://www.youtube.com/embed/8R4TgW9Y8yQ'
        }
    ],
    biologia: [
        {
            titulo: 'Células - Estructura y Función',
            url: 'https://www.youtube.com/embed/2R4TgW9Y8yQ'
        },
        {
            titulo: 'Fotosíntesis - Proceso Vital',
            url: 'https://www.youtube.com/embed/4R4TgW9Y8yQ'
        },
        {
            titulo: 'Genética - Leyes de Mendel',
            url: 'https://www.youtube.com/embed/1R4TgW9Y8yQ'
        }
    ],
    historia: [
        {
            titulo: 'Edad Antigua - Civilizaciones Primitivas',
            url: 'https://www.youtube.com/embed/3QaR7mRXUxo'
        },
        {
            titulo: 'Edad Media - Feudalismo',
            url: 'https://www.youtube.com/embed/9R4TgW9Y8yQ'
        }
    ],
    fisica: [
        {
            titulo: 'Movimiento - Leyes de Newton',
            url: 'https://www.youtube.com/embed/5R4TgW9Y8yQ'
        },
        {
            titulo: 'Electricidad - Circuitos Básicos',
            url: 'https://www.youtube.com/embed/6R4TgW9Y8yQ'
        }
    ],
    quimica: [
        {
            titulo: 'Tabla Periódica - Elementos Químicos',
            url: 'https://www.youtube.com/embed/2R4TgW9Y8yQ'
        },
        {
            titulo: 'Reacciones Químicas - Tipos y Ejemplos',
            url: 'https://www.youtube.com/embed/4R4TgW9Y8yQ'
        }
    ]
};

// ===== FUNCIONES PRINCIPALES =====

/**
 * Función para cargar las materias en la página principal
 * Se ejecuta automáticamente cuando se carga index.html
 */
function cargarMaterias() {
    const container = document.getElementById('materias-container');
    
    // Verificar si estamos en la página principal
    if (!container) return;
    
    // Limpiar contenedor
    container.innerHTML = '';
    
    // Generar HTML para cada materia
    materias.forEach((materia, index) => {
        const cardHTML = `
            <div class="materia-card" style="animation-delay: ${index * 0.1}s">
                <div class="materia-icono">${materia.icono}</div>
                <h3 class="materia-titulo">${materia.nombre}</h3>
                <p class="materia-descripcion">${materia.descripcion}</p>
                <a href="materias/${materia.id}.html" class="btn">Ver Materia</a>
            </div>
        `;
        container.innerHTML += cardHTML;
    });
}

/**
 * Función para cargar videos en las páginas de materias
 * Se ejecuta automáticamente en cada página de materia
 */
function cargarVideos() {
    // Obtener el ID de la materia desde la URL
    const path = window.location.pathname;
    const materiaId = path.split('/').pop().replace('.html', '');
    
    // Verificar si hay videos para esta materia
    const videos = videosPorMateria[materiaId];
    const container = document.getElementById('videos-container');
    
    if (!container || !videos) return;
    
    // Limpiar contenedor
    container.innerHTML = '';
    
    // Generar HTML para cada video
    videos.forEach((video, index) => {
        const videoHTML = `
            <div class="video-item" style="animation-delay: ${index * 0.1}s">
                <h3 class="video-titulo">${video.titulo}</h3>
                <div class="video-wrapper">
                    <iframe 
                        src="${video.url}" 
                        title="${video.titulo}"
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
            </div>
        `;
        container.innerHTML += videoHTML;
    });
}

/**
 * Función para resaltar tarjetas al pasar el mouse
 * Añade efectos visuales interactivos
 */
function agregarEfectosTarjetas() {
    const tarjetas = document.querySelectorAll('.materia-card');
    
    tarjetas.forEach(tarjeta => {
        tarjeta.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        tarjeta.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

/**
 * Función para agregar animación de carga suave
 */
function agregarAnimacionesScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Observar todas las tarjetas y videos
    document.querySelectorAll('.materia-card, .video-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
}

// ===== INICIALIZACIÓN =====

/**
 * Función principal que se ejecuta cuando el DOM está listo
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎯 Plataforma Estudiantil cargada correctamente');
    
    // Cargar contenido según la página actual
    if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
        cargarMaterias();
        agregarEfectosTarjetas();
        agregarAnimacionesScroll();
    } else if (window.location.pathname.includes('/materias/')) {
        cargarVideos();
        agregarAnimacionesScroll();
    }
    
    // Agregar efecto de carga a todos los botones
    document.querySelectorAll('.btn').forEach(boton => {
        boton.addEventListener('click', function(e) {
            // Crear efecto ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
});

// ===== UTILIDADES Y AYUDA =====

/**
 * Función para ayudar a agregar nuevas materias (consola)
 * Uso: agregarMateria('nueva', 'Nueva Materia', '💡', 'Descripción')
 */
function agregarMateria(id, nombre, icono, descripcion) {
    const nuevaMateria = { id, nombre, icono, descripcion, color: '#8B0000' };
    materias.push(nuevaMateria);
    console.log(`✅ Materia "${nombre}" agregada. Recuerda crear el archivo ${id}.html en /materias/`);
}

/**
 * Función para agregar videos a una materia existente (consola)
 * Uso: agregarVideo('lengua', 'Nuevo Video', 'URL_de_YouTube')
 */
function agregarVideo(materiaId, titulo, url) {
    if (!videosPorMateria[materiaId]) {
        videosPorMateria[materiaId] = [];
    }
    videosPorMateria[materiaId].push({ titulo, url });
    console.log(`✅ Video "${titulo}" agregado a ${materiaId}`);
}

// ===== ANIMACIÓN RIPPLE =====
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===== MENSAJE DE BIENVENIDA =====
console.log(`
🎓 ¡Bienvenido a la Plataforma Estudiantil!

📋 INSTRUCCIONES RÁPIDAS:
• Para agregar materias: Edita el array 'materias' en este archivo
• Para agregar videos: Edita el objeto 'videosPorMateria'
• Usa las funciones agregarMateria() y agregarVideo() desde la consola

🔧 CONSEJOS:
• Mantén los nombres de archivos consistentes (id.html)
• Usa URLs de YouTube embebidas (formato: https://www.youtube.com/embed/VIDEO_ID)
• Personaliza los colores y estilos en style.css

¡Happy coding! 🚀
`);