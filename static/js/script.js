/**
 * Modern Portfolio Website Script - v2
 *
 * This script handles:
 * 1. Theme (dark/light) toggling and persistence.
 * 2. Mobile navigation menu functionality.
 * 3. Header styling changes on scroll.
 * 4. Smooth scrolling for anchor links.
 * 5. Active navigation link highlighting on scroll.
 * 6. Setting the current year in the footer.
 * 7. Fade-in animations for sections on scroll.
 */
document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Element Selectors ---
    const body = document.body;
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');
    const themeToggle = document.querySelector('.theme-toggle');
    const yearSpan = document.getElementById('year');
    const sections = document.querySelectorAll('main section');
    const form = document.getElementById('contactForm');


    // --- 1. THEME TOGGLE ---
    const currentTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Set initial theme based on local storage or system preference
    if (currentTheme) {
        body.setAttribute('data-theme', currentTheme);
    } else {
        body.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }

    themeToggle.addEventListener('click', () => {
        const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });


    // --- 2. MOBILE NAVIGATION ---
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        body.style.overflow = !isExpanded ? 'hidden' : '';
    });

    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksContainer.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
            }
        });
    });


    // --- 3. SCROLL-BASED FUNCTIONALITY ---
    const handleScroll = () => {
        // Header background on scroll
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Active nav link highlighting
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.scrollY >= sectionTop - 150) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', handleScroll);
    

    // --- 4. SMOOTH SCROLLING ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // --- 5. FADE-IN ANIMATIONS ON SCROLL (using Intersection Observer) ---
    const animatedElements = document.querySelectorAll('.section-header, .about-container, .project-card, .resume-content, .contact-container');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = `fadeInUp 0.8s ease-out forwards`;
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(el => {
        el.style.opacity = '0'; // Hide elements initially
        observer.observe(el);
    });

    // Add keyframes for the animation dynamically
    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(40px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(styleSheet);


    // --- 6. FOOTER YEAR ---
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- 7. Initial call for scroll handlers ---
    handleScroll();
});
