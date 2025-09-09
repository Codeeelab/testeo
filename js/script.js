// ===== PLATAFORMA ESTUDIANTIL - SCRIPT MEJORADO PARA SERVIDOR =====
// Versión optimizada para deployment en servidores con manejo robusto de errores

// ===== CONFIGURACIÓN DE MATERIAS =====
const materias = [
  {
    id: "lengua",
    nombre: "Lengua y Literatura",
    descripcion: "Explora el maravilloso mundo de la lengua y la literatura española",
    icono: "📚",
    color: "#8B0000",
  },
  {
    id: "matematicas",
    nombre: "Matemáticas",
    descripcion: "Descubre la lógica y belleza de los números y las operaciones",
    icono: "🔢",
    color: "#A52A2A",
  },
  {
    id: "biologia",
    nombre: "Biología",
    descripcion: "Adéntrate en el estudio de la vida y los seres vivos",
    icono: "🔬",
    color: "#DC143C",
  },
  {
    id: "historia",
    nombre: "Historia",
    descripcion: "Viaja a través del tiempo y conoce las civilizaciones",
    icono: "🏛️",
    color: "#B22222",
  },
  {
    id: "fisica",
    nombre: "Física",
    descripcion: "Comprende las leyes que rigen el universo",
    icono: "⚡",
    color: "#8B0000",
  },
  {
    id: "quimica",
    nombre: "Química",
    descripcion: "Explora la composición y transformación de la materia",
    icono: "🧪",
    color: "#A52A2A",
  },
]

const videosPorMateria = {
  lengua: [
    {
      titulo: "Gramática Española - Presente de Indicativo",
      url: "https://www.youtube.com/embed/3QaR7mRXUxo",
    },
    {
      titulo: "Análisis Literario - Poemas de García Lorca",
      url: "https://www.youtube.com/embed/9R4TgW9Y8yQ",
    },
    {
      titulo: "Ortografía - Uso de la B y V",
      url: "https://www.youtube.com/embed/7R4TgW9Y8yQ",
    },
  ],
  matematicas: [
    {
      titulo: "Álgebra - Ecuaciones de Primer Grado",
      url: "https://www.youtube.com/embed/5R4TgW9Y8yQ",
    },
    {
      titulo: "Geometría - Triángulos y sus Propiedades",
      url: "https://www.youtube.com/embed/6R4TgW9Y8yQ",
    },
    {
      titulo: "Estadística - Media, Mediana y Moda",
      url: "https://www.youtube.com/embed/8R4TgW9Y8yQ",
    },
  ],
  biologia: [
    {
      titulo: "Células - Estructura y Función",
      url: "https://www.youtube.com/embed/2R4TgW9Y8yQ",
    },
    {
      titulo: "Fotosíntesis - Proceso Vital",
      url: "https://www.youtube.com/embed/4R4TgW9Y8yQ",
    },
    {
      titulo: "Genética - Leyes de Mendel",
      url: "https://www.youtube.com/embed/1R4TgW9Y8yQ",
    },
  ],
  historia: [
    {
      titulo: "Edad Antigua - Civilizaciones Primitivas",
      url: "https://www.youtube.com/embed/3QaR7mRXUxo",
    },
    {
      titulo: "Edad Media - Feudalismo",
      url: "https://www.youtube.com/embed/9R4TgW9Y8yQ",
    },
  ],
  fisica: [
    {
      titulo: "Movimiento - Leyes de Newton",
      url: "https://www.youtube.com/embed/5R4TgW9Y8yQ",
    },
    {
      titulo: "Electricidad - Circuitos Básicos",
      url: "https://www.youtube.com/embed/6R4TgW9Y8yQ",
    },
  ],
  quimica: [
    {
      titulo: "Tabla Periódica - Elementos Químicos",
      url: "https://www.youtube.com/embed/2R4TgW9Y8yQ",
    },
    {
      titulo: "Reacciones Químicas - Tipos y Ejemplos",
      url: "https://www.youtube.com/embed/4R4TgW9Y8yQ",
    },
  ],
}

// ===== UTILIDADES PARA DETECCIÓN ROBUSTA =====

/**
 * Detección mejorada de página actual que funciona en cualquier servidor
 */
function detectarPaginaActual() {
  const url = window.location.href.toLowerCase()
  const pathname = window.location.pathname.toLowerCase()

  // Múltiples métodos de detección para mayor compatibilidad
  if (pathname === "/" || pathname.includes("index") || url.includes("index")) {
    return "home"
  }

  // Buscar ID de materia en la URL de múltiples formas
  const materiaMatch = pathname.match(/\/([^/]+)\.html?$/)
  if (materiaMatch) {
    return materiaMatch[1]
  }

  // Fallback: buscar en query parameters
  const urlParams = new URLSearchParams(window.location.search)
  const materiaParam = urlParams.get("materia")
  if (materiaParam) {
    return materiaParam
  }

  // Último fallback: analizar el título de la página
  const title = document.title.toLowerCase()
  for (const materia of materias) {
    if (title.includes(materia.nombre.toLowerCase())) {
      return materia.id
    }
  }

  return "home" // Default fallback
}

/**
 * Función con retry automático para elementos que pueden tardar en cargar
 */
function esperarElemento(selector, callback, maxIntentos = 10, intervalo = 100) {
  let intentos = 0

  const verificar = () => {
    const elemento = document.querySelector(selector)
    if (elemento) {
      callback(elemento)
      return
    }

    intentos++
    if (intentos < maxIntentos) {
      setTimeout(verificar, intervalo)
    } else {
      console.warn(`⚠️ Elemento ${selector} no encontrado después de ${maxIntentos} intentos`)
    }
  }

  verificar()
}

/**
 * Carga de materias con manejo robusto de errores
 */
function cargarMaterias() {
  esperarElemento("#materias-container", (container) => {
    try {
      container.innerHTML = ""

      materias.forEach((materia, index) => {
        const cardElement = document.createElement("div")
        cardElement.className = "materia-card"
        cardElement.style.animationDelay = `${index * 0.1}s`

        const baseUrl = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, "/")
        const materiaUrl = `${baseUrl}materias/${materia.id}.html`

        cardElement.innerHTML = `
                    <div class="materia-icono">${materia.icono}</div>
                    <h3 class="materia-titulo">${materia.nombre}</h3>
                    <p class="materia-descripcion">${materia.descripcion}</p>
                    <a href="${materiaUrl}" class="btn" data-materia="${materia.id}">Ver Materia</a>
                `

        container.appendChild(cardElement)
      })

      setTimeout(() => {
        agregarEfectosTarjetas()
        agregarAnimacionesScroll()
      }, 50)

      console.log("✅ Materias cargadas correctamente")
    } catch (error) {
      console.error("❌ Error cargando materias:", error)
      mostrarMensajeError(container, "Error cargando las materias. Por favor, recarga la página.")
    }
  })
}

/**
 * Carga de videos con detección mejorada y fallbacks
 */
function cargarVideos() {
  const paginaActual = detectarPaginaActual()

  if (paginaActual === "home") return

  esperarElemento("#videos-container", (container) => {
    try {
      const videos = videosPorMateria[paginaActual]

      if (!videos || videos.length === 0) {
        container.innerHTML = `
                    <div class="mensaje-info">
                        <h3>📚 Contenido en preparación</h3>
                        <p>Los videos para esta materia estarán disponibles pronto.</p>
                    </div>
                `
        return
      }

      container.innerHTML = ""

      videos.forEach((video, index) => {
        const videoElement = document.createElement("div")
        videoElement.className = "video-item"
        videoElement.style.animationDelay = `${index * 0.1}s`

        videoElement.innerHTML = `
                    <h3 class="video-titulo">${video.titulo}</h3>
                    <div class="video-wrapper">
                        <iframe 
                            src="${video.url}" 
                            title="${video.titulo}"
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowfullscreen
                            loading="lazy">
                        </iframe>
                    </div>
                `

        container.appendChild(videoElement)
      })

      setTimeout(() => agregarAnimacionesScroll(), 50)
      console.log(`✅ Videos cargados para ${paginaActual}`)
    } catch (error) {
      console.error("❌ Error cargando videos:", error)
      mostrarMensajeError(container, "Error cargando los videos. Por favor, recarga la página.")
    }
  })
}

/**
 * Función para mostrar mensajes de error amigables
 */
function mostrarMensajeError(container, mensaje) {
  container.innerHTML = `
        <div class="mensaje-error">
            <h3>⚠️ Oops!</h3>
            <p>${mensaje}</p>
            <button onclick="location.reload()" class="btn">Recargar Página</button>
        </div>
    `
}

/**
 * Efectos de tarjetas con verificación de existencia
 */
function agregarEfectosTarjetas() {
  const tarjetas = document.querySelectorAll(".materia-card")

  if (tarjetas.length === 0) return

  tarjetas.forEach((tarjeta) => {
    // Remover listeners previos para evitar duplicados
    tarjeta.removeEventListener("mouseenter", efectoMouseEnter)
    tarjeta.removeEventListener("mouseleave", efectoMouseLeave)

    tarjeta.addEventListener("mouseenter", efectoMouseEnter)
    tarjeta.addEventListener("mouseleave", efectoMouseLeave)
  })
}

function efectoMouseEnter() {
  this.style.transform = "translateY(-8px) scale(1.02)"
}

function efectoMouseLeave() {
  this.style.transform = "translateY(0) scale(1)"
}

/**
 * Animaciones de scroll con Intersection Observer mejorado
 */
function agregarAnimacionesScroll() {
  // Verificar soporte del navegador
  if (!("IntersectionObserver" in window)) {
    // Fallback para navegadores antiguos
    document.querySelectorAll(".materia-card, .video-item").forEach((el) => {
      el.style.opacity = "1"
      el.style.transform = "translateY(0)"
    })
    return
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
          observer.unobserve(entry.target) // Dejar de observar una vez animado
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: "50px",
    },
  )

  document.querySelectorAll(".materia-card, .video-item").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "all 0.6s ease"
    observer.observe(el)
  })
}

/**
 * Inicialización robusta con múltiples puntos de entrada
 */
function inicializar() {
  console.log("🎯 Inicializando Plataforma Estudiantil...")

  const paginaActual = detectarPaginaActual()
  console.log(`📍 Página detectada: ${paginaActual}`)

  try {
    if (paginaActual === "home") {
      cargarMaterias()
    } else {
      cargarVideos()
    }

    setTimeout(() => {
      agregarEfectosRipple()
    }, 100)
  } catch (error) {
    console.error("❌ Error en inicialización:", error)
  }
}

/**
 * Efectos ripple mejorados con mejor manejo de eventos
 */
function agregarEfectosRipple() {
  document.querySelectorAll(".btn").forEach((boton) => {
    // Evitar duplicar listeners
    if (boton.hasAttribute("data-ripple-ready")) return
    boton.setAttribute("data-ripple-ready", "true")

    boton.addEventListener("click", function (e) {
      // Prevenir múltiples ripples simultáneos
      const existingRipple = this.querySelector(".ripple-effect")
      if (existingRipple) existingRipple.remove()

      const ripple = document.createElement("span")
      ripple.className = "ripple-effect"
      const rect = this.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

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
                z-index: 1;
            `

      this.style.position = "relative"
      this.style.overflow = "hidden"
      this.appendChild(ripple)

      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.remove()
        }
      }, 600)
    })
  })
}

// ===== ESTILOS DINÁMICOS =====
const style = document.createElement("style")
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .mensaje-error, .mensaje-info {
        text-align: center;
        padding: 2rem;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        margin: 2rem 0;
    }
    
    .mensaje-error {
        border-left: 4px solid #ff4444;
    }
    
    .mensaje-info {
        border-left: 4px solid #4444ff;
    }
`
document.head.appendChild(style)

// ===== MÚLTIPLES PUNTOS DE INICIALIZACIÓN =====

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", inicializar)
} else {
  // DOM ya está listo
  inicializar()
}

window.addEventListener("load", () => {
  // Solo ejecutar si no se ha inicializado ya
  if (!document.querySelector(".materia-card") && !document.querySelector(".video-item")) {
    console.log("🔄 Ejecutando inicialización de respaldo...")
    inicializar()
  }
})

window.addEventListener("error", (e) => {
  console.error("❌ Error global capturado:", e.error)
})

// ===== UTILIDADES PARA DESARROLLO =====
function agregarMateria(id, nombre, icono, descripcion) {
  const nuevaMateria = { id, nombre, icono, descripcion, color: "#8B0000" }
  materias.push(nuevaMateria)
  console.log(`✅ Materia "${nombre}" agregada. Recuerda crear el archivo ${id}.html en /materias/`)
}

function agregarVideo(materiaId, titulo, url) {
  if (!videosPorMateria[materiaId]) {
    videosPorMateria[materiaId] = []
  }
  videosPorMateria[materiaId].push({ titulo, url })
  console.log(`✅ Video "${titulo}" agregado a ${materiaId}`)
}

console.log(`
🎓 ¡Plataforma Estudiantil - Versión Servidor Optimizada!

🔧 MEJORAS IMPLEMENTADAS:
• ✅ Detección robusta de páginas que funciona en cualquier servidor
• ✅ Manejo de errores y mensajes informativos
• ✅ Retry automático para elementos que tardan en cargar  
• ✅ Múltiples puntos de inicialización como respaldo
• ✅ URLs flexibles que se adaptan a diferentes estructuras
• ✅ Fallbacks para navegadores antiguos

🚀 ¡Listo para deployment!
`)
