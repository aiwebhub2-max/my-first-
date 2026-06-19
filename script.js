/* =============================================
   LivrExpress — JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

    // =============================================
    // Navbar scroll effect
    // =============================================
    const navbar = document.getElementById('navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check on load

    // =============================================
    // Mobile menu toggle
    // =============================================
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    let overlay = null;

    const createOverlay = () => {
        overlay = document.createElement('div');
        overlay.classList.add('nav-overlay');
        document.body.appendChild(overlay);
        overlay.addEventListener('click', closeMobileMenu);
    };

    createOverlay();

    const openMobileMenu = () => {
        mobileToggle.classList.add('active');
        navLinks.classList.add('active');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeMobileMenu = () => {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    mobileToggle.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    });

    // Close mobile menu on nav link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // =============================================
    // Counter animation for hero stats
    // =============================================
    const animateCounter = (element) => {
        const target = parseInt(element.dataset.target);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString('fr-FR');
                return;
            }
            element.textContent = Math.floor(current).toLocaleString('fr-FR');
            requestAnimationFrame(updateCounter);
        };

        updateCounter();
    };

    // =============================================
    // Intersection Observer for animations
    // =============================================
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    // Stat counters observer
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                statNumbers.forEach(num => animateCounter(num));
            }
        });
    }, observerOptions);

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }

    // Reveal animations
    const revealElements = document.querySelectorAll(
        '.step-card, .price-card, .testimonial-card, .section-header'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Stagger step cards animation
    const stepCards = document.querySelectorAll('.step-card');
    stepCards.forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.15}s`;
    });

    // Stagger pricing cards animation
    const priceCards = document.querySelectorAll('.price-card');
    priceCards.forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.15}s`;
    });

    // Stagger testimonial cards animation
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, i) => {
        card.style.transitionDelay = `${i * 0.15}s`;
    });

    // =============================================
    // Contact Modal
    // =============================================
    const contactModal = document.getElementById('contactModal');
    const closeContactModal = document.getElementById('closeContactModal');
    const contactForm = document.getElementById('contactForm');

    const openModal = (e) => {
        if (e) e.preventDefault();
        contactModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        contactModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    document.querySelectorAll('a[href="#contact"]').forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    closeContactModal.addEventListener('click', closeModal);

    contactModal.addEventListener('click', (e) => {
        if (e.target === contactModal) {
            closeModal();
        }
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Votre message a bien été envoyé ! Nous vous contacterons très vite.');
        closeModal();
        contactForm.reset();
    });

    // =============================================
    // Smooth scroll for CTA buttons
    // =============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '#contact') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // =============================================
    // Active nav link highlighting
    // =============================================
    const sections = document.querySelectorAll('section[id]');
    
    const highlightNav = () => {
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);
            if (navLink) {
                if (scrollY >= top && scrollY < top + height) {
                    navLink.style.color = '';
                    navLink.classList.add('active-link');
                } else {
                    navLink.classList.remove('active-link');
                }
            }
        });
    };

    window.addEventListener('scroll', highlightNav, { passive: true });

    // =============================================
    // Tracking dots animation (hero)
    // =============================================
    const dots = document.querySelectorAll('.tracking-dots .dot');
    let dotIndex = 0;

    setInterval(() => {
        dots.forEach(dot => dot.classList.remove('active'));
        
        for (let i = 0; i <= dotIndex; i++) {
            dots[i].classList.add('active');
        }
        
        dotIndex = (dotIndex + 1) % dots.length;
    }, 2000);

    // =============================================
    // Parallax effect for hero shapes
    // =============================================
    let ticking = false;

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.scrollY;
                const shapes = document.querySelectorAll('.shape');
                
                shapes.forEach((shape, i) => {
                    const speed = (i + 1) * 0.03;
                    shape.style.transform = `translateY(${scrolled * speed}px)`;
                });

                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

});
