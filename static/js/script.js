/**
 * Modern Portfolio Website Script - Elegant Redesign
 * 
 * Features:
 * 1. Theme toggling with localStorage persistence
 * 2. Mobile navigation menu
 * 3. Header scroll effects
 * 4. Smooth scrolling
 * 5. Active nav link highlighting
 * 6. Current year in footer
 * 7. GSAP animations
 * 8. Particle.js background
 * 9. Contact form file handling
 * 10. Scroll-triggered animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const body = document.body;
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');
    const themeToggle = document.querySelector('.theme-toggle');
    const yearSpan = document.getElementById('year');
    const sections = document.querySelectorAll('main section');
    const form = document.getElementById('contactForm');
    const fileInput = document.getElementById('attachment');
    const fileNameSpan = document.getElementById('file-name');
    const filePreview = document.getElementById('file-preview');
    
    // --- 1. THEME TOGGLE ---
    const currentTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Set initial theme
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
    
    // Close mobile menu when link clicked
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
    
    // --- 3. SCROLL FUNCTIONALITY ---
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
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
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
    
    // --- 5. GSAP ANIMATIONS ---
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate elements on scroll
    gsap.utils.toArray('.gsap-fade-in').forEach(element => {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 80%",
                toggleActions: "play none none none"
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out"
        });
    });
    
    // Hero text animation
    gsap.from('.hero-title', {
        duration: 1,
        opacity: 0,
        y: 50,
        ease: "power3.out",
        delay: 0.3
    });
    
    gsap.from('.hero-subtitle', {
        duration: 1,
        opacity: 0,
        y: 50,
        ease: "power3.out",
        delay: 0.6
    });
    
    gsap.from('.hero-buttons', {
        duration: 1,
        opacity: 0,
        y: 50,
        ease: "power3.out",
        delay: 0.9
    });
    
    // --- 6. PARTICLE.JS BACKGROUND ---
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#6c63ff"
                },
                shape: {
                    type: "circle",
                    stroke: {
                        width: 0,
                        color: "#000000"
                    },
                    polygon: {
                        nb_sides: 5
                    }
                },
                opacity: {
                    value: 0.3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.1,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#6c63ff",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.5
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }
    
    // --- 7. FILE ATTACHMENT HANDLING ---
    fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        filePreview.innerHTML = '';
        
        if (files.length > 0) {
            const file = files[0];
            
            // Validate file size (5MB max)
            if (file.size > 5 * 1024 * 1024) {
                alert('File size exceeds 5MB limit');
                fileInput.value = '';
                fileNameSpan.textContent = 'Attach file (optional)';
                return;
            }
            
            // Validate file type
            const validTypes = ['application/pdf', 'application/msword', 
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
                'image/jpeg', 'image/png'];
            
            if (!validTypes.includes(file.type)) {
                alert('Only PDF, DOC, JPG, and PNG files are allowed');
                fileInput.value = '';
                fileNameSpan.textContent = 'Attach file (optional)';
                return;
            }
            
            // Update UI
            fileNameSpan.textContent = file.name;
            
            // Create preview item
            const previewItem = document.createElement('div');
            previewItem.className = 'file-preview-item';
            previewItem.innerHTML = `
                <i class="fas ${getFileIcon(file.type)}"></i>
                <span>${file.name}</span>
                <span class="remove-file"><i class="fas fa-times"></i></span>
            `;
            
            // Add remove functionality
            const removeBtn = previewItem.querySelector('.remove-file');
            removeBtn.addEventListener('click', () => {
                fileInput.value = '';
                fileNameSpan.textContent = 'Attach file (optional)';
                filePreview.removeChild(previewItem);
            });
            
            filePreview.appendChild(previewItem);
        } else {
            fileNameSpan.textContent = 'Attach file (optional)';
        }
    });
    
    function getFileIcon(fileType) {
        if (fileType.includes('pdf')) return 'fa-file-pdf';
        if (fileType.includes('word')) return 'fa-file-word';
        if (fileType.includes('image')) return 'fa-file-image';
        return 'fa-file';
    }
    
    // --- 8. FOOTER YEAR ---
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // --- 9. Initial call for scroll handlers ---
    handleScroll();
});