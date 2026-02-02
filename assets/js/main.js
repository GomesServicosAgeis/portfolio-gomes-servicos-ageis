/**
 * Gomes Serviços Ágeis - Portfolio
 * Main JavaScript File
 * @author Danilo Gomes
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide Icons
    lucide.createIcons();
    
    // Initialize all modules
    initNavigation();
    initScrollEffects();
    initCounters();
    initTechBars();
    initSmoothScroll();
});

/**
 * Navigation Module
 */
function initNavigation() {
    const header = document.getElementById('header');
    const nav = document.getElementById('nav');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            nav.classList.toggle('active');
        });
    }
    
    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navToggle) {
                navToggle.classList.remove('active');
            }
            if (nav) {
                nav.classList.remove('active');
            }
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollPos = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}

/**
 * Scroll Effects Module
 */
function initScrollEffects() {
    const revealElements = document.querySelectorAll(
        '.servico-card, .projeto-card, .contato-item, .tech-category, .highlight'
    );
    
    const revealOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });
}

/**
 * Counter Animation Module
 */
function initCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const counterOptions = {
        threshold: 0.5
    };
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-count'));
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, counterOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

function animateCounter(element, target) {
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

/**
 * Tech Progress Bars Module
 */
function initTechBars() {
    const techBars = document.querySelectorAll('.tech-progress');
    
    const barOptions = {
        threshold: 0.5
    };
    
    const barObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.style.getPropertyValue('--progress');
                barObserver.unobserve(entry.target);
            }
        });
    }, barOptions);
    
    techBars.forEach(bar => {
        const progress = bar.style.getPropertyValue('--progress');
        bar.style.width = '0';
        bar.style.setProperty('--progress', progress);
        barObserver.observe(bar);
    });
}

/**
 * Smooth Scroll Module
 * Calcula offset manualmente para garantir consistência cross-browser
 */
function initSmoothScroll() {
    const HEADER_HEIGHT = 72; // Altura do header fixo
    const EXTRA_OFFSET = 20; // Margem de respiro adicional
    const TOTAL_OFFSET = HEADER_HEIGHT + EXTRA_OFFSET;
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignora se for apenas "#"
            if (href === '#') return;
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                
                // Calcula a posição exata considerando o header
                const targetPosition = target.getBoundingClientRect().top;
                const offsetPosition = targetPosition + window.pageYOffset - TOTAL_OFFSET;
                
                // Scroll suave com posição calculada
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Atualiza o hash na URL sem pular
                history.pushState(null, null, href);
            }
        });
    });
    
    // Corrige scroll ao carregar página com hash na URL
    if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
            // Pequeno delay para garantir que a página carregou
            setTimeout(() => {
                const targetPosition = target.getBoundingClientRect().top;
                const offsetPosition = targetPosition + window.pageYOffset - TOTAL_OFFSET;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }, 100);
        }
    }
}