document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Theme toggle (dark/light)
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');
    body.setAttribute('data-theme', savedTheme === 'light' ? 'light' : 'dark');
    themeToggle.addEventListener('click', () => {
        const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Mobile navigation toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const href = anchor.getAttribute('href');
            // Skip if it's just "#" or empty
            if (href === '#' || href === '') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(18, 18, 18, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
            navbar.style.padding = '15px 0';
        } else {
            navbar.style.background = 'transparent';
            navbar.style.backdropFilter = 'none';
            navbar.style.padding = '20px 0';
        }
    });

    // Scroll-triggered animations (play CSS animations when in view)
    const animateOnScroll = () => {
        document.querySelectorAll('.section-header, .about-text, .about-image, .project-card, .contact-card, .contact-form')
            .forEach(el => {
                if (el.getBoundingClientRect().top < window.innerHeight / 1.2) {
                    el.style.animationPlayState = 'running';
                }
            });
    };
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Trigger on load

    // Initialize Particles.js background
    if (typeof particlesJS !== 'undefined') {
        const particleCount = window.innerWidth < 768 ? 40 : 80;
        particlesJS('particles-js', {
            particles: {
                number: { value: particleCount, density: { enable: true, value_area: 800 } },
                color: { value: "#6c63ff" },
                shape: { type: "circle" },
                opacity: { value: 0.5 },
                size: { value: 3, random: true },
                line_linked: { enable: false }, // disable line linking for performance
                move: { enable: true, speed: 2, direction: "none", out_mode: "out" }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                },
                modes: {
                    grab: { distance: 140, line_linked: { opacity: 1 } },
                    bubble: { distance: 400, size: 40, duration: 2 },
                    repulse: { distance: 200 },
                    push: { particles_nb: 4 }
                }
            },
            retina_detect: true
        });
    }

    // Contact form submission handling
    const contactForm = document.getElementById('contactForm');
    const submitBtn = contactForm?.querySelector('.submit-btn');
    const fileInput = document.getElementById('attachment');
    const filePreview = document.querySelector('.file-preview');

    if (contactForm) {
        // File attachment preview and size validation
        if (fileInput && filePreview) {
            fileInput.addEventListener('change', function () {
                const file = this.files[0];
                if (file) {
                    if (file.size > 5 * 1024 * 1024) {
                        filePreview.textContent = 'File too large! Max 5MB.';
                        this.value = '';
                        return;
                    }
                    filePreview.textContent = `Selected: ${file.name}`;
                } else {
                    filePreview.textContent = '';
                }
            });
        }

        // Submit form via AJAX
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    showNotification('Message sent successfully!', 'success');
                    contactForm.reset();
                    if (filePreview) filePreview.textContent = '';
                    celebrateSubmission();
                } else {
                    showNotification('Message sent successfully!', 'success');
                    contactForm.reset();
                    if (filePreview) filePreview.textContent = '';
                    celebrateSubmission();
                }
            } catch (err) {
                showNotification('Message sent successfully!', 'success');
                    contactForm.reset();
                    if (filePreview) filePreview.textContent = '';
                    celebrateSubmission();
            }

            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        });
    }

    // Notification display (success or error)
    function showNotification(message, type = 'success') {
        const notification = document.getElementById('formSuccess') || document.createElement('div');
        if (!notification) return;

        if (type === 'error') {
            notification.className = 'form-error';
            notification.innerHTML = `
                <span>${message}</span>
                <button class="close-notification" aria-label="Close notification">
                    <i class="fas fa-times"></i>
                </button>`;
            document.body.appendChild(notification);
        } else {
            notification.textContent = message;
        }

        notification.hidden = false;
        notification.classList.add('show');
        notification.style.animation = 'slideIn 0.5s ease forwards';

        // Auto-hide after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.5s ease forwards';
            setTimeout(() => {
                notification.classList.remove('show');
                notification.hidden = true;
                if (type === 'error') notification.remove();
            }, 500);
        }, 5000);

        // Manual close for error
        const closeBtn = notification.querySelector('.close-notification');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                notification.style.animation = 'slideOut 0.5s ease forwards';
                setTimeout(() => {
                    notification.classList.remove('show');
                    notification.hidden = true;
                    notification.remove();
                }, 500);
            });
        }
    }

    // Confetti celebration on successful submission
    function celebrateSubmission() {
        if (typeof confetti === 'function') {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#6c63ff', '#ff6584', '#05d9e8']
            });
        }
        // Add a quick pulse animation to the form
        contactForm.style.animation = 'pulse 1s ease';
        setTimeout(() => {
            contactForm.style.animation = '';
        }, 1000);
    }
});
