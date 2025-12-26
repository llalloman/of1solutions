/**
 * OF1 SOLUTIONS - Corporate Website
 * JavaScript functionality for interactions, animations, and form handling
 */

// ========================================
// 1. SMOOTH SCROLL & NAVIGATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll for anchor links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                const nav = document.getElementById('nav');
                const navToggle = document.getElementById('navToggle');
                if (nav && nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });
    
    // Active link highlighting on scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__link');
    
    function highlightActiveLink() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightActiveLink);
    highlightActiveLink(); // Initial call
    
});

// ========================================
// 2. MOBILE MENU TOGGLE
// ========================================

const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

if (navToggle && nav) {
    navToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (nav.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });
}

// ========================================
// 2.5 CASES CAROUSEL
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.cases__track');
    const prevButton = document.querySelector('.carousel__button--prev');
    const nextButton = document.querySelector('.carousel__button--next');
    const indicators = document.querySelectorAll('.indicator');
    
    if (!track || !prevButton || !nextButton) return;
    
    let currentSlide = 0;
    const cards = document.querySelectorAll('.case-card');
    const totalSlides = cards.length;
    
    function getCardsPerView() {
        if (window.innerWidth < 768) return 1;
        if (window.innerWidth < 1024) return 2;
        return 3;
    }
    
    function updateCarousel() {
        const cardsPerView = getCardsPerView();
        const cardWidth = cards[0].offsetWidth;
        const gap = 24; // var(--spacing-lg)
        const scrollAmount = (cardWidth + gap) * currentSlide;
        
        track.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
        
        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });
        
        // Update buttons state
        prevButton.style.opacity = currentSlide === 0 ? '0.5' : '1';
        prevButton.style.cursor = currentSlide === 0 ? 'not-allowed' : 'pointer';
        nextButton.style.opacity = currentSlide >= totalSlides - cardsPerView ? '0.5' : '1';
        nextButton.style.cursor = currentSlide >= totalSlides - cardsPerView ? 'not-allowed' : 'pointer';
    }
    
    prevButton.addEventListener('click', function() {
        if (currentSlide > 0) {
            currentSlide--;
            updateCarousel();
        }
    });
    
    nextButton.addEventListener('click', function() {
        const cardsPerView = getCardsPerView();
        if (currentSlide < totalSlides - cardsPerView) {
            currentSlide++;
            updateCarousel();
        }
    });
    
    // Indicator clicks
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            currentSlide = index;
            updateCarousel();
        });
    });
    
    // Touch/Swipe support
    let startX = 0;
    let scrollLeft = 0;
    
    track.addEventListener('touchstart', function(e) {
        startX = e.touches[0].pageX;
        scrollLeft = track.scrollLeft;
    });
    
    track.addEventListener('touchmove', function(e) {
        const x = e.touches[0].pageX;
        const walk = (startX - x) * 2;
        track.scrollLeft = scrollLeft + walk;
    });
    
    track.addEventListener('touchend', function() {
        const cardWidth = cards[0].offsetWidth;
        const gap = 24;
        currentSlide = Math.round(track.scrollLeft / (cardWidth + gap));
        updateCarousel();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevButton.click();
        } else if (e.key === 'ArrowRight') {
            nextButton.click();
        }
    });
    
    // Auto-play (optional)
    let autoplayInterval;
    
    function startAutoplay() {
        autoplayInterval = setInterval(function() {
            const cardsPerView = getCardsPerView();
            if (currentSlide < totalSlides - cardsPerView) {
                nextButton.click();
            } else {
                currentSlide = 0;
                updateCarousel();
            }
        }, 5000); // Change slide every 5 seconds
    }
    
    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }
    
    // Start autoplay
    startAutoplay();
    
    // Pause autoplay on hover
    track.addEventListener('mouseenter', stopAutoplay);
    track.addEventListener('mouseleave', startAutoplay);
    prevButton.addEventListener('click', stopAutoplay);
    nextButton.addEventListener('click', stopAutoplay);
    
    // Update on window resize
    window.addEventListener('resize', throttle(function() {
        updateCarousel();
    }, 250));
    
    // Initial update
    updateCarousel();
});

// ========================================
// 3. HEADER SCROLL EFFECT
// ========================================

const header = document.getElementById('header');
let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Add shadow on scroll
    if (scrollTop > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScrollTop = scrollTop;
});

// ========================================
// 4. SCROLL ANIMATIONS (Intersection Observer)
// ========================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optionally unobserve after animation
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements with fade-in class
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = [
        '.service-card',
        '.methodology__step',
        '.case-card',
        '.value-item',
        '.contact-info__item'
    ];
    
    animatedElements.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, index) => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    });
});

// ========================================
// 5. CONTACT FORM HANDLING
// ========================================

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Validate form
        if (!validateForm(data)) {
            return;
        }
        
        // Disable submit button to prevent double submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        
        // Send to Formspree
        const formspreeEndpoint = 'https://formspree.io/f/xeeqjbyd';
        
        fetch(formspreeEndpoint, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                showSuccessMessage();
                contactForm.reset();
            } else {
                return response.json().then(data => {
                    throw new Error(data.error || 'Error al enviar el formulario');
                });
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo o contáctanos directamente por email.');
        })
        .finally(() => {
            // Re-enable submit button
            submitButton.disabled = false;
            submitButton.textContent = originalButtonText;
        });
    });
}

function validateForm(data) {
    const { name, email, message } = data;
    
    if (!name || name.trim().length < 2) {
        alert('Por favor, ingresa tu nombre completo.');
        return false;
    }
    
    if (!email || !isValidEmail(email)) {
        alert('Por favor, ingresa un email válido.');
        return false;
    }
    
    if (!message || message.trim().length < 10) {
        alert('Por favor, ingresa un mensaje con al menos 10 caracteres.');
        return false;
    }
    
    return true;
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showSuccessMessage() {
    if (formSuccess) {
        formSuccess.classList.add('show');
        
        // Hide after 5 seconds
        setTimeout(() => {
            formSuccess.classList.remove('show');
        }, 5000);
    }
}

// ========================================
// 6. LAZY LOADING IMAGES
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('loading' in HTMLImageElement.prototype) {
        // Browser supports native lazy loading
        images.forEach(img => {
            img.src = img.src;
        });
    } else {
        // Fallback for browsers that don't support native lazy loading
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => {
            imageObserver.observe(img);
        });
    }
});

// ========================================
// 7. PERFORMANCE OPTIMIZATIONS
// ========================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for resize events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Optimize scroll event
window.addEventListener('scroll', debounce(function() {
    // Additional scroll-based functionality can be added here
}, 100));

// Handle window resize
window.addEventListener('resize', throttle(function() {
    // Close mobile menu on resize if window becomes larger
    if (window.innerWidth > 768) {
        const nav = document.getElementById('nav');
        const navToggle = document.getElementById('navToggle');
        if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
}, 250));

// ========================================
// 8. ACCESSIBILITY ENHANCEMENTS
// ========================================

// Keyboard navigation for mobile menu
if (navToggle) {
    navToggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navToggle.click();
        }
    });
}

// Focus management for modal-like elements
document.addEventListener('keydown', function(e) {
    // Close mobile menu with Escape key
    if (e.key === 'Escape') {
        const nav = document.getElementById('nav');
        const navToggle = document.getElementById('navToggle');
        if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
            navToggle.focus();
        }
        
        // Close success message
        if (formSuccess && formSuccess.classList.contains('show')) {
            formSuccess.classList.remove('show');
        }
    }
});

// ========================================
// 9. ANALYTICS & TRACKING (Optional)
// ========================================

// Track button clicks
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function() {
        const buttonText = this.textContent.trim();
        console.log('Button clicked:', buttonText);
        
        // In production, send to analytics:
        /*
        if (typeof gtag !== 'undefined') {
            gtag('event', 'button_click', {
                'button_text': buttonText
            });
        }
        */
    });
});

// Track form interactions
if (contactForm) {
    const formFields = contactForm.querySelectorAll('input, textarea');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            console.log('Form field focused:', this.name);
        });
    });
}

// ========================================
// 10. UTILITY FUNCTIONS
// ========================================

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Get scroll percentage
function getScrollPercentage() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    return (scrollTop / scrollHeight) * 100;
}

// Scroll to top functionality (if needed)
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ========================================
// 11. CONSOLE BRANDING (Optional)
// ========================================

console.log('%cOF1 SOLUTIONS', 'color: #0078D4; font-size: 24px; font-weight: bold;');
console.log('%cTransformamos tu futuro con tecnología', 'color: #2DCCD3; font-size: 14px;');
console.log('%c¿Interesado en trabajar con nosotros? Visita: contacto@of1solutions.com', 'color: #666; font-size: 12px;');