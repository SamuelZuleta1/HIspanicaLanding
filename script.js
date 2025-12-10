// ==========================================
// CONFIGURACIÓN INICIAL
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    initNavbar();
    initThemeToggle();
    initMobileMenu();
    initScrollReveal();
    initCounters();
    initTestimonialSlider();
    initFavorites();
    initFilters();
    initForms(); // ahora definido abajo
    initScrollTop();
    initCurrentYear();
    initSmoothScroll(); // ahora definido abajo
    initProyectoModal(); // Nueva función para el modal
});

// Reemplaza lógica duplicada/suplementaria por estas funciones (unificadas, defensivas):

function initSmoothScroll() {
    const smoothScrollTo = (selector) => {
        const el = document.querySelector(selector);
        if (!el) {
            console.log('Elemento no encontrado:', selector);
            return;
        }
        // prefer CSS: add scroll-margin-top to sections in CSS (recomendado)
        const yOffset = -80; // compensa navbar height si no usas scroll-margin-top
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
    };

    // Enlaces con href="#..."
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const hash = a.getAttribute('href');
            if (!hash || hash === '#') return;
            e.preventDefault();
            smoothScrollTo(hash);
            document.getElementById('navMenu')?.classList.remove('active');
            const mobileToggle = document.getElementById('mobileToggle');
            if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
        });
    });

    // Botones con data-target (incluye botones del Hero)
    document.querySelectorAll('[data-target]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const target = btn.getAttribute('data-target');
            console.log('Botón clickeado, target:', target);
            if (!target) return;
            smoothScrollTo(target);
            // Cerrar menú móvil si está abierto
            document.getElementById('navMenu')?.classList.remove('active');
            const mobileToggle = document.getElementById('mobileToggle');
            if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (!themeToggle) return;
    themeToggle.addEventListener('click', () => {
        const current = html.getAttribute('data-theme') || 'light';
        const next = current === 'light' ? 'dark' : 'light';
        html.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
        updateThemeIcon(next);
    });
}

function initMobileMenu() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    if (!mobileToggle || !navMenu) return;

    mobileToggle.setAttribute('aria-controls', 'navMenu');
    mobileToggle.setAttribute('aria-expanded', 'false');

    mobileToggle.addEventListener('click', function() {
        const isOpen = navMenu.classList.toggle('active');
        this.setAttribute('aria-expanded', String(isOpen));
        const icon = this.querySelector('i');
        if (icon) {
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileToggle.setAttribute('aria-expanded', 'false');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });
}

// Básico initForms (reemplaza alert por UI futura/integración)
function initForms() {
    const contactoForm = document.getElementById('contactoForm');
    if (contactoForm) {
        contactoForm.addEventListener('submit', e => {
            e.preventDefault();
            // Validación simple
            const nombre = contactoForm.nombre?.value?.trim();
            const email = contactoForm.email?.value?.trim();
            if (!nombre || !email) {
                alert('Por favor completa nombre y correo.');
                return;
            }
            // TODO: enviar a API / servicio
            // Mostrar feedback accesible
            alert('Gracias — su mensaje ha sido recibido. Nos pondremos en contacto pronto.');
            contactoForm.reset();
        });
    }

    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', e => {
            e.preventDefault();
            // TODO: integrar servicio de suscripción
            alert('Gracias por suscribirte.');
            newsletterForm.reset();
        });
    }
}

// ==========================================
// NAVBAR STICKY Y EFECTOS
// ==========================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ==========================================
// TEMA OSCURO/CLARO
// ==========================================
function updateThemeIcon(theme) {
    const icon = document.querySelector('#themeToggle i');
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ==========================================
// MENÚ MÓVIL
// ==========================================
// ==========================================
// ANIMACIONES AL HACER SCROLL
// ==========================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.proyecto-card, .propiedad-card, .servicio-card, .plan-card, .noticia-card, .testimonio-card');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const revealPoint = 100;
            
            if (elementTop < windowHeight - revealPoint) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll();
}

// ==========================================
// CONTADORES ANIMADOS
// ==========================================
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let hasAnimated = false;
    
    const animateCounters = () => {
        const statsSection = document.querySelector('.stats-container');
        if (!statsSection) return;
        
        const sectionTop = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100 && !hasAnimated) {
            hasAnimated = true;
            
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                const duration = 2000;
                const increment = target / (duration / 16);
                let current = 0;
                
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.textContent = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target + '+';
                    }
                };
                
                updateCounter();
            });
        }
    };
    
    window.addEventListener('scroll', animateCounters);
    animateCounters();
}

// ==========================================
// SLIDER DE TESTIMONIOS
// ==========================================
function initTestimonialSlider() {
    const slider = document.getElementById('testimoniosSlider');
    const dotsContainer = document.getElementById('sliderDots');
    
    if (!slider || !dotsContainer) return;
    
    const testimonials = slider.querySelectorAll('.testimonio-card');
    let currentIndex = 0;
    
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = dotsContainer.querySelectorAll('.slider-dot');
    
    function goToSlide(index) {
        currentIndex = index;
        updateSlider();
    }
    
    function updateSlider() {
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        updateSlider();
    }, 5000);
}

// ==========================================
// SISTEMA DE FAVORITOS
// ==========================================
function initFavorites() {
    const favButtons = document.querySelectorAll('.btn-favorito');
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    favButtons.forEach((button, index) => {
        const propertyId = 'prop-' + index;
        button.dataset.id = propertyId;
        
        if (favorites.includes(propertyId)) {
            button.classList.add('active');
        }
        
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            e.preventDefault();
            
            this.classList.toggle('active');
            
            const id = this.dataset.id;
            const favIndex = favorites.indexOf(id);
            
            if (favIndex > -1) {
                favorites.splice(favIndex, 1);
            } else {
                favorites.push(id);
            }
            
            localStorage.setItem('favorites', JSON.stringify(favorites));
            
            this.style.transform = 'scale(1.3)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 300);
        });
    });
}

// ==========================================
// FILTROS DE PROPIEDADES
// ==========================================
function initFilters() {
    const tipoSelect = document.getElementById('tipoPropiedad');
    const ciudadSelect = document.getElementById('ciudad');
    const precioSelect = document.getElementById('precio');
    const buscador = document.getElementById('buscador');
    const propiedades = document.querySelectorAll('.propiedad-card');
    
    if (!tipoSelect || !propiedades.length) return;
    
    function filterProperties() {
        const tipo = tipoSelect.value.toLowerCase();
        const ciudad = ciudadSelect.value.toLowerCase();
        const precio = precioSelect.value;
        const searchTerm = buscador.value.toLowerCase();
        
        propiedades.forEach(propiedad => {
            const propTipo = propiedad.dataset.tipo || '';
            const propTexto = propiedad.textContent.toLowerCase();
            
            let showProperty = true;
            
            if (tipo && !propTipo.includes(tipo)) {
                showProperty = false;
            }
            
            if (ciudad && !propTexto.includes(ciudad)) {
                showProperty = false;
            }
            
            if (searchTerm && !propTexto.includes(searchTerm)) {
                showProperty = false;
            }
            
            if (showProperty) {
                propiedad.style.display = 'block';
                setTimeout(() => {
                    propiedad.style.opacity = '1';
                    propiedad.style.transform = 'scale(1)';
                }, 10);
            } else {
                propiedad.style.opacity = '0';
                propiedad.style.transform = 'scale(0.9)';
                setTimeout(() => {
                    propiedad.style.display = 'none';
                }, 300);
            }
        });
    }
    
    tipoSelect.addEventListener('change', filterProperties);
    ciudadSelect.addEventListener('change', filterProperties);
    precioSelect.addEventListener('change', filterProperties);
    buscador.addEventListener('input', filterProperties);
}

// ==========================================
// MODAL DE PROYECTO
// ==========================================
function initProyectoModal() {
    const modal = document.getElementById('proyectoModal');
    const modalClose = document.getElementById('modalClose');
    const proyectoButtons = document.querySelectorAll('.proyecto-card .btn-secondary');
    
    // Datos de ejemplo de los proyectos (puedes expandir esto con más información)
    const proyectosData = {
        'Arrecife': {
            imagenes: [
                'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
                'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
                'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800'
            ],
            ubicacion: 'Entrada 16 el Tigre Vía cerritos',
            status: 'venta',
            statusText: 'En venta',
            descripcion: 'Exclusivas casas campestres en el prestigioso conjunto residencial privado de Cerritos. Este proyecto ofrece un estilo de vida único, rodeado de naturaleza y con todas las comodidades modernas. Cada vivienda ha sido diseñada con los más altos estándares de calidad, espacios amplios y acabados de lujo.',
            caracteristicas: [
                'Casas desde 180m² hasta 250m²',
                'Conjunto cerrado con seguridad 24/7',
                'Clubhouse con salón social',
                'Piscina y zonas verdes',
                'Parque infantil',
                'Senderos ecológicos',
                'Zona BBQ',
                'Portería con citófono'
            ]
        },
        'Bélgica Lux': {
            imagenes: [
                'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
                'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
                'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800',
                'https://images.unsplash.com/photo-1600047509782-20d39509f26d?w=800',
                'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800'
            ],
            ubicacion: 'Cerritos, Pereira',
            status: 'venta',
            statusText: 'En venta',
            descripcion: 'Lotes campestres premium en Cerritos, la zona de mayor lujo y plusvalía de Pereira. Una oportunidad única de construir el hogar de tus sueños en un entorno privilegiado con vistas espectaculares, clima perfecto y acceso a todos los servicios.',
            caracteristicas: [
                'Lotes desde 500m² hasta 2000m²',
                'Servicios públicos completos',
                'Vías pavimentadas',
                'Alumbrado público',
                'Zona de alta plusvalía',
                'Escrituración inmediata',
                'Financiación disponible',
                'Vista panorámica'
            ]
        },
        'Balcones de Segovia': {
            imagenes: [
                'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
                'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
                'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800'
            ],
            ubicacion: 'Cl. 34 #3-37 Calle 34 Nro, Dosquebradas, Risaralda',
            status: 'entregado',
            statusText: 'Entregado',
            descripcion: 'Moderno conjunto residencial en Dosquebradas con excelente ubicación estratégica. Este proyecto ya entregado cuenta con amplias zonas comunes, seguridad 24/7 y espacios diseñados pensando en el bienestar y la comodidad de tu familia.',
            caracteristicas: [
                'Apartamentos de 3 habitaciones',
                'Zonas verdes amplias',
                'Parqueadero cubierto',
                'Salón comunal',
                'Gimnasio',
                'Juegos infantiles',
                'Portería 24 horas',
                'Cerca a centros comerciales'
            ]
        },
        'Arrecife 2': {
            imagenes: [
                'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800',
                'https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=800',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
                'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800'
            ],
            ubicacion: 'Entrada 16 el Tigre Vía cerritos',
            status: 'construccion',
            statusText: 'En construcción',
            descripcion: 'Segunda fase del exclusivo conjunto residencial de Cerritos. Casas campestres de lujo diseñadas con arquitectura moderna, amplios espacios, clubhouse de primer nivel, extensas zonas verdes y todas las comodidades en el sector más privilegiado de la región.',
            caracteristicas: [
                'Casas de 200m² a 300m²',
                'Clubhouse con piscina',
                'Cancha deportiva',
                'Salón de eventos',
                'Gimnasio equipado',
                'Senderos peatonales',
                'Entrega: Diciembre 2025',
                'Apartado con 20%'
            ]
        },
        'Portal de Providencia': {
            imagenes: [
                'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800',
                'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
                'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
                'https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800',
                'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800'
            ],
            ubicacion: 'Calle 21 B # 20-10, barrio Providencia',
            status: 'construccion',
            statusText: 'En construcción',
            descripcion: 'Conjunto residencial con excelente relación calidad-precio ubicado en el tradicional barrio Providencia. Viviendas cómodas, seguras y bien ubicadas, ideales para familias que buscan tranquilidad, accesibilidad y un ambiente familiar.',
            caracteristicas: [
                'Apartamentos de 2 y 3 habitaciones',
                'Parqueaderos privados',
                'Zonas sociales',
                'Seguridad privada',
                'Ubicación central',
                'Cerca a colegios y comercio',
                'Entrega: Junio 2025',
                'Financiación directa'
            ]
        },
        'Pradera Verde': {
            imagenes: [
                'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800',
                'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
                'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
                'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800',
                'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800'
            ],
            ubicacion: 'Dg. 25a #24T-151, Dosquebradas, Risaralda',
            status: 'construccion',
            statusText: 'En construcción',
            descripcion: 'Conjunto residencial con amplias zonas verdes en Dosquebradas. Espacios modernos, seguros y diseñados para disfrutar en familia. Perfecta combinación entre naturaleza, comodidad y ubicación estratégica.',
            caracteristicas: [
                'Casas desde 120m²',
                'Amplias zonas verdes',
                'Parque biosaludable',
                'Salón social',
                'Parqueaderos visitantes',
                'Cerramiento perimetral',
                'Entrega: Agosto 2025',
                'Subsidios disponibles'
            ]
        },
        'San Rafael de Maraya': {
            imagenes: [
                'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=800',
                'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
                'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
                'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800',
                'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800'
            ],
            ubicacion: 'Cra. 11 #44-63, Pereira, Risaralda',
            status: 'construccion',
            statusText: 'En construcción',
            descripcion: 'Edificio de uso mixto en el corazón de Pereira. Modernas unidades residenciales en los pisos superiores con locales comerciales en el primer piso, perfectos para vivir e invertir en el mismo lugar. Excelente ubicación comercial y residencial.',
            caracteristicas: [
                'Apartamentos desde 65m²',
                'Locales comerciales',
                'Ascensor',
                'Parqueaderos en sótano',
                'Zona comercial activa',
                'Excelente valorización',
                'Entrega: Octubre 2025',
                'Uso mixto: vivienda y comercio'
            ]
        }
    };
    
    let currentImageIndex = 0;
    let currentProyecto = null;
    
    // Abrir modal
    proyectoButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const proyectoCard = button.closest('.proyecto-card');
            const proyectoTitulo = proyectoCard.querySelector('h3').textContent.trim();
            
            if (proyectosData[proyectoTitulo]) {
                currentProyecto = proyectosData[proyectoTitulo];
                currentImageIndex = 0;
                openModal(proyectoTitulo, currentProyecto);
            }
        });
    });
    
    // Cerrar modal
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
    
    // Navegación del carrusel
    document.getElementById('galleryPrev').addEventListener('click', () => {
        if (currentProyecto) {
            currentImageIndex = (currentImageIndex - 1 + currentProyecto.imagenes.length) % currentProyecto.imagenes.length;
            updateGallery();
        }
    });
    
    document.getElementById('galleryNext').addEventListener('click', () => {
        if (currentProyecto) {
            currentImageIndex = (currentImageIndex + 1) % currentProyecto.imagenes.length;
            updateGallery();
        }
    });
    
    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('active') && currentProyecto) {
            if (e.key === 'ArrowLeft') {
                currentImageIndex = (currentImageIndex - 1 + currentProyecto.imagenes.length) % currentProyecto.imagenes.length;
                updateGallery();
            } else if (e.key === 'ArrowRight') {
                currentImageIndex = (currentImageIndex + 1) % currentProyecto.imagenes.length;
                updateGallery();
            }
        }
    });
    
    function openModal(titulo, data) {
        document.getElementById('modalTitle').textContent = titulo;
        document.getElementById('modalUbicacion').textContent = data.ubicacion;
        document.getElementById('modalDescripcion').textContent = data.descripcion;
        
        const statusBadge = document.getElementById('modalStatus');
        statusBadge.textContent = data.statusText;
        statusBadge.className = 'modal-status ' + data.status;
        
        // Características
        const caracteristicasList = document.getElementById('modalCaracteristicas');
        caracteristicasList.innerHTML = '';
        data.caracteristicas.forEach(car => {
            const li = document.createElement('li');
            li.innerHTML = `<i class="fas fa-check"></i> ${car}`;
            caracteristicasList.appendChild(li);
        });
        
        // Galería
        renderGallery(data.imagenes);
        updateGallery();
        
        // Mostrar modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function renderGallery(imagenes) {
        const thumbnailsContainer = document.getElementById('galleryThumbnails');
        thumbnailsContainer.innerHTML = '';
        
        imagenes.forEach((img, index) => {
            const thumb = document.createElement('div');
            thumb.className = 'gallery-thumbnail';
            if (index === 0) thumb.classList.add('active');
            
            thumb.innerHTML = `<img src="${img}" alt="Imagen ${index + 1}">`;
            thumb.addEventListener('click', () => {
                currentImageIndex = index;
                updateGallery();
            });
            
            thumbnailsContainer.appendChild(thumb);
        });
    }
    
    function updateGallery() {
        if (!currentProyecto) return;
        
        const mainImage = document.getElementById('modalMainImage');
        mainImage.src = currentProyecto.imagenes[currentImageIndex];
        
        const counter = document.getElementById('galleryCounter');
        counter.textContent = `${currentImageIndex + 1} / ${currentProyecto.imagenes.length}`;
        
        // Update thumbnails
        const thumbnails = document.querySelectorAll('.gallery-thumbnail');
        thumbnails.forEach((thumb, index) => {
            thumb.classList.toggle('active', index === currentImageIndex);
        });
    }
    
    // Botón de contacto en el modal
    const modalContactoBtn = document.getElementById('modalContacto');
    if (modalContactoBtn) {
        modalContactoBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
            // Usar setTimeout para asegurar que el modal se cierre antes de hacer scroll
            setTimeout(() => {
                const contactSection = document.querySelector('#contacto');
                if (contactSection) {
                    const yOffset = -80;
                    const y = contactSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
                    window.scrollTo({ top: y, behavior: 'smooth' });
                }
            }, 300);
        });
    }
}

// ==========================================
// SCROLL TOP BUTTON
// ==========================================
function initScrollTop() {
    const scrollTopBtn = document.getElementById('scrollTop');
    if (!scrollTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==========================================
// CURRENT YEAR
// ==========================================
function initCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ==========================================
// FORMULARIOS
// ==========================================
