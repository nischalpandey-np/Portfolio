document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initNavbarEffect();
    initTypingEffect();
    initScrollReveal();
    initActiveScrollSpy(); // New Feature: Highlights nav based on scroll
    initContactForm();     // New Feature: AJAX Form submission
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
            navbar.classList.add("glass-nav", "py-2");
            navbar.classList.remove("py-4");
        } else {
            navbar.classList.remove("glass-nav", "py-2");
            navbar.classList.add("py-4");
        }
    });
};

// 3. Typing Effect
const initTypingEffect = () => {
    const element = document.getElementById("typing-text");
    if (!element) return;

    const texts = [
        "Full Stack Developer",
        "Python Enthusiast",
        "Problem Solver",
        "Tech Explorer"
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    const type = () => {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            element.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Delete faster
        } else {
            element.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100; // Type normal
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Pause before new word
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

// 5. Active Scroll Spy (Senior Dev Feature)
const initActiveScrollSpy = () => {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("#navbar a[href^='#']"); // Select desktop links

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove("text-primary", "font-bold"));
                navLinks.forEach(link => link.classList.add("text-slate-300")); // Reset color

                // Add active class to current link
                const activeLink = document.querySelector(`#navbar a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.remove("text-slate-300");
                    activeLink.classList.add("text-primary", "font-bold");
                }
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% of section is visible

    sections.forEach(section => observer.observe(section));
};

// 6. Dynamic Year
const updateYear = () => {
    const yearSpan = document.getElementById("year");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
};

// 7. AJAX Form Submission (Better UX)
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
                btn.classList.remove("from-primary", "to-secondary");
                btn.classList.add("bg-green-500");
                
                setTimeout(() => {
                    btn.innerHTML = originalBtnText;
                    btn.disabled = false;
                    btn.classList.add("from-primary", "to-secondary");
                    btn.classList.remove("bg-green-500");
                }, 3000);
            } else {
                throw new Error("Failed to send");
            }
        } catch (error) {
            btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error. Try again.';
            btn.classList.remove("from-primary", "to-secondary");
            btn.classList.add("bg-red-500");
            setTimeout(() => {
                btn.innerHTML = originalBtnText;
                btn.disabled = false;
                btn.classList.add("from-primary", "to-secondary");
                btn.classList.remove("bg-red-500");
            }, 3000);
        }
    });
};