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
 
 // Add this to your existing script.js file
 
 // Enhanced Form Submission
 document.getElementById('contactForm').addEventListener('submit', function(e) {
     e.preventDefault();
     const form = this;
     const submitBtn = form.querySelector('.submit-btn');
     const successNotification = document.getElementById('formSuccess');
     
     // Show loading state
     submitBtn.disabled = true;
     submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
     
     // Create a new FormData object each time
     const formData = new FormData(form);
     
     // Submit the form data using fetch
     fetch(form.action, {
         method: 'POST',
         body: formData,
         headers: {
             'Accept': 'application/json'
         }
     })
     .then(response => {
         if (response.ok) {
             // Show success notification
             successNotification.hidden = false;
             successNotification.classList.add('show');
             
             // Reset form
             form.reset();
             
             // Hide notification after 5 seconds
             setTimeout(() => {
                 successNotification.classList.remove('show');
                 setTimeout(() => {
                     successNotification.hidden = true;
                 }, 300);
             }, 5000);
         } else {
             throw new Error('Network response was not ok');
         }
     })
     .catch(error => {
         console.error('Error:', error);
         // You could add error notification here if desired
     })
     .finally(() => {
         // Reset button state
         submitBtn.disabled = false;
         submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
     });
 });

    // Form Handling
    const form = document.getElementById('contactForm');
    const submitBtn = form.querySelector('.submit-btn');
    const fileInput = document.getElementById('attachment');
    const filePreview = document.querySelector('.file-preview');
    const successNotification = document.getElementById('formSuccess');
    const errorNotification = document.getElementById('formError');

    // File Upload Handling
    fileInput.addEventListener('change', function() {
        const file = this.files[0];
        if (file) {
            if (file.size > 5242880) {
                filePreview.textContent = 'File too large (max 5MB)';
                this.value = '';
                return;
            }
            filePreview.textContent = `Selected: ${file.name}`;
        } else {
            filePreview.textContent = '';
        }
    });

    // Form Submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                showNotification(successNotification);
                form.reset();
                filePreview.textContent = '';
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            showNotification(errorNotification);
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
        }
    });

    // Notification Handling
    function showNotification(notification) {
        notification.hidden = false;
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.hidden = true;
            }, 300);
        }, 5000);
    }

    // Close Notifications
    document.querySelectorAll('.close-notification').forEach(btn => {
        btn.addEventListener('click', function() {
            const notification = this.closest('.form-success, .form-error');
            notification.classList.remove('show');
            setTimeout(() => {
                notification.hidden = true;
            }, 300);
        });
    });