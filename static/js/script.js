document.addEventListener('DOMContentLoaded', function () {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Theme toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    const savedTheme = localStorage.getItem('theme');

    body.setAttribute('data-theme', savedTheme === 'light' ? 'light' : 'dark');

    themeToggle.addEventListener('click', () => {
        const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Mobile menu toggle
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

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
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

    // Particles.js
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#6c63ff" },
                shape: { type: "circle" },
                opacity: { value: 0.5 },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#6c63ff",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    out_mode: "out"
                }
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

    // Scroll animations
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.section-header, .about-text, .about-image, .project-card, .contact-card, .contact-form');
        elements.forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight / 1.2) {
                el.style.animationPlayState = 'running';
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    document.addEventListener('DOMContentLoaded', () => {
        const contactForm = document.getElementById('contactForm');
        const submitBtn = contactForm?.querySelector('.submit-btn');
        const fileInput = document.getElementById('attachment');
        const filePreview = document.querySelector('.file-preview');
        const successMessage = document.getElementById('formSuccess'); // Make sure this exists
    
        if (!contactForm) return;
    
        // File preview (optional)
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
    
        // Form submission
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
                    if (successMessage) {
                        successMessage.textContent = 'Message sent successfully!';
                        successMessage.style.display = 'block';
                    }
                    contactForm.reset();
                    if (filePreview) filePreview.textContent = '';
                } else {
                    if (successMessage) {
                        successMessage.textContent = 'Something went wrong. Please try again.';
                        successMessage.style.display = 'block';
                    }
                }
            } catch (err) {
                console.error(err);
                if (successMessage) {
                    successMessage.textContent = 'Network error. Please try again.';
                    successMessage.style.display = 'block';
                }
            }
    
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        });
    });
    

        function showNotification(message, type = 'success') {
            const notification = type === 'success'
                ? document.getElementById('formSuccess')
                : document.createElement('div');

            if (type === 'error') {
                notification.className = 'form-error';
                notification.innerHTML = `
                    <span>${message}</span>
                    <button class="close-notification" aria-label="Close notification">
                        <i class="fas fa-times"></i>
                    </button>`;
                document.body.appendChild(notification);
            }

            notification.querySelector('span').textContent = message;
            notification.hidden = false;
            notification.style.display = 'flex';
            notification.classList.add('show');
            notification.style.animation = 'slideIn 0.5s ease forwards';

            setTimeout(() => {
                notification.style.animation = 'slideOut 0.5s ease forwards';
                setTimeout(() => {
                    notification.classList.remove('show');
                    notification.hidden = true;
                    if (type === 'error') notification.remove();
                }, 500);
            }, 5000);

            const closeBtn = notification.querySelector('.close-notification');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    notification.style.animation = 'slideOut 0.5s ease forwards';
                    setTimeout(() => {
                        notification.classList.remove('show');
                        notification.hidden = true;
                        if (type === 'error') notification.remove();
                    }, 500);
                });
            }
        }

        function celebrateSubmission() {
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#6c63ff', '#ff6584', '#05d9e8']
                });
            }
            contactForm.style.animation = 'pulse 1s ease';
            setTimeout(() => {
                contactForm.style.animation = '';
            }, 1000);
        }
    }
);
