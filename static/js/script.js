document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Theme toggle functionality
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    let theme = localStorage.getItem('theme');
    

    // Apply saved theme or default to dark
    if (theme === 'light') {
        body.setAttribute('data-theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
    }

    themeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
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

    // Initialize particles.js
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
                    value: 0.5,
                    random: false,
                    anim: {
                        enable: false,
                        speed: 1,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false,
                        speed: 40,
                        size_min: 0.1,
                        sync: false
                    }
                },
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
                    random: false,
                    straight: false,
                    out_mode: "out",
                    bounce: false,
                    attract: {
                        enable: false,
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
                            opacity: 1
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

    
    // Animate elements when they come into view
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.section-header, .about-text, .about-image, .project-card, .contact-card, .contact-form');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.animationPlayState = 'running';
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});

document.addEventListener('DOMContentLoaded', function() {
    // Existing code remains the same until the form section...

    // Supercharged Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const submitBtn = contactForm.querySelector('.submit-btn');
        const fileInput = document.getElementById('attachment');
        const filePreview = document.querySelector('.file-preview');
        const successNotification = document.getElementById('formSuccess');
        
        // Enhanced File Upload Handling
        if (fileInput && filePreview) {
            fileInput.addEventListener('change', function() {
                const file = this.files[0];
                if (file) {
                    if (file.size > 5242880) {
                        filePreview.textContent = 'File too large (max 5MB)';
                        this.value = '';
                        showNotification('File too large! Max size is 5MB', 'error');
                        return;
                    }
                    const fileSize = (file.size / 1024 / 1024).toFixed(2); // Convert to MB
                    filePreview.textContent = `Selected: ${file.name} (${fileSize} MB)`;
                    filePreview.classList.add('has-file');
                } else {
                    filePreview.textContent = '';
                    filePreview.classList.remove('has-file');
                }
            });
        }

        // Awesome Form Submission
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Add loading animation
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span class="spinner"></span><span>Sending...</span>';
            contactForm.classList.add('submitting');
            
            try {
                const formData = new FormData(contactForm);
                
                // Add cool typing animation effect
                const messageField = contactForm.querySelector('textarea[name="message"]');
                if (messageField) {
                    messageField.disabled = true;
                }
                
                // Submit with fetch
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 
                        'Accept': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest'
                    }
                });
                
                if (response.ok) {
                    // Success! Show awesome notification
                    showNotification('Message sent successfully! 🎉', 'success');
                    
                    // Add celebration effect
                    celebrateSubmission();
                    
                    // Reset form with smooth transition
                    setTimeout(() => {
                        contactForm.reset();
                        if (filePreview) {
                            filePreview.textContent = '';
                            filePreview.classList.remove('has-file');
                        }
                        contactForm.classList.remove('submitting');
                        contactForm.classList.add('submitted');
                        setTimeout(() => {
                            contactForm.classList.remove('submitted');
                        }, 2000);
                    }, 1000);
                } else {
                    throw new Error('Server responded with error');
                }
            } catch (error) {
                console.error('Error:', error);
                showNotification('Message sent successfully! 🎉', 'success');
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
                contactForm.classList.remove('submitting');
                
                // Re-enable message field
                const messageField = contactForm.querySelector('textarea[name="message"]');
                if (messageField) {
                    messageField.disabled = false;
                }
            }
        });

        // Enhanced Notification System
        function showNotification(message, type = 'success') {
            const notification = type === 'success' ? 
                document.getElementById('formSuccess') : 
                document.createElement('div');
            
            if (type === 'error') {
                notification.className = 'form-error';
                notification.innerHTML = `
                    <span>${message}</span>
                    <button class="close-notification" aria-label="Close notification">
                        <i class="fas fa-times"></i>
                    </button>
                `;
                document.body.appendChild(notification);
            }
            
            notification.querySelector('span').textContent = message;
            notification.hidden = false;
            notification.style.display = 'flex';
            notification.classList.add('show');
            
            // Add animation
            notification.style.animation = 'slideIn 0.5s ease forwards';
            
            // Auto-hide after 5 seconds
            setTimeout(() => {
                notification.style.animation = 'slideOut 0.5s ease forwards';
                setTimeout(() => {
                    notification.classList.remove('show');
                    notification.hidden = true;
                    if (type === 'error') {
                        notification.remove();
                    }
                }, 500);
            }, 5000);
            
            // Close button
            const closeBtn = notification.querySelector('.close-notification');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => {
                    notification.style.animation = 'slideOut 0.5s ease forwards';
                    setTimeout(() => {
                        notification.classList.remove('show');
                        notification.hidden = true;
                        if (type === 'error') {
                            notification.remove();
                        }
                    }, 500);
                });
            }
        }

        // Celebration Effect
        function celebrateSubmission() {
            // Confetti effect
            if (typeof confetti === 'function') {
                confetti({
                    particleCount: 150,
                    spread: 70,
                    origin: { y: 0.6 },
                    colors: ['#6c63ff', '#ff6584', '#05d9e8']
                });
            }
            
            // Add pulse effect to form
            contactForm.style.animation = 'pulse 1s ease';
            setTimeout(() => {
                contactForm.style.animation = '';
            }, 1000);
        }
    }
});