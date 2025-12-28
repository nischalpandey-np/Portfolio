document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initNavbarEffect();
    initTypingEffect();
    initScrollReveal();
    initActiveScrollSpy();
    initContactForm();
    updateYear();
});

// 1. Mobile Menu Toggle
const initMobileMenu = () => {
    const btn = document.getElementById("mobile-menu-btn");
    const menu = document.getElementById("mobile-menu");
    const links = menu.querySelectorAll("a");

    if (!btn || !menu) return;

    const toggleMenu = () => {
        menu.classList.toggle("hidden");
        const isExpanded = !menu.classList.contains("hidden");
        btn.setAttribute("aria-expanded", isExpanded);
    };

    btn.addEventListener("click", toggleMenu);

    links.forEach((link) => {
        link.addEventListener("click", () => menu.classList.add("hidden"));
    });
};

// 2. Navbar Glass Effect
const initNavbarEffect = () => {
    const navbar = document.getElementById("navbar");
    if (!navbar) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 20) {
            navbar.classList.add("glass-nav");
        } else {
            navbar.classList.remove("glass-nav");
        }
    });
};
// 3. Professional Typing Effect
const initTypingEffect = () => {
    const element = document.getElementById("typing-text");
    if (!element) return;

    // High-impact professional titles
    const texts = [
        "MERN Stack Developer",
        "Python Backend Developer (Django)",
        "Programmer",
        "Web developer",
        "Coder",
        "Freelancer"
        
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80; // Snappier typing speed

    const type = () => {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 40; // Faster deleting (standard UX practice)
        } else {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 80;
        }

        // Logic for pausing at the end of a word or switching words
        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typeSpeed = 2500; // Hold the completed title for 2.5s so recruiters can read it
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 300; // Small pause before starting the next word
        }

        setTimeout(type, typeSpeed);
    };

    type();
};

// 4. Scroll Reveal
const initScrollReveal = () => {
    const revealElements = document.querySelectorAll(".reveal");
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("active");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach((el) => revealObserver.observe(el));
};

// 5. Active Scroll Spy
const initActiveScrollSpy = () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-desktop a");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reset all links
                navLinks.forEach(link => link.classList.remove("active"));
                
                // Set active link
                const activeLink = document.querySelector(`.nav-desktop a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }
        });
    }, { threshold: 0.5 });

    sections.forEach(section => observer.observe(section));
};

// 6. Dynamic Year
const updateYear = () => {
    const yearSpan = document.getElementById("year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
};

// 7. AJAX Form Submission
const initContactForm = () => {
    const form = document.querySelector("form");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const btn = form.querySelector("button");
        const originalBtnText = btn.innerHTML;

        // Loading State
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                // Success State
                form.reset();
                btn.innerHTML = '<i class="fas fa-check"></i> Sent Successfully!';
                btn.classList.add("btn--success");
                
                setTimeout(() => {
                    btn.innerHTML = originalBtnText;
                    btn.disabled = false;
                    btn.classList.remove("btn--success");
                }, 3000);
            } else {
                throw new Error("Failed to send");
            }
        } catch (error) {
            btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error. Try again.';
            btn.classList.add("btn--error");
            setTimeout(() => {
                btn.innerHTML = originalBtnText;
                btn.disabled = false;
                btn.classList.remove("btn--error");
            }, 3000);
        }
    });
};