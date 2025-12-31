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

// 8. Projects dynamically

const projects = [
    {
        title: "Digi Bistro",
        desc: "Full-stack restaurant ordering system with authentication, menu browsing, and order tracking.",
        img: "static/img/project1.webp",
        github: "https://github.com/nischalpandey-np/Digi-Bistro",
        demo: "https://nischalpandey07.pythonanywhere.com/",
        tags: ["Python", "Flask", "MySQL"],
        tagColors: ["tag--primary", "tag--secondary", "tag--blue"]
    },
    {
        title: "Automated Chat Bot",
        desc: "Desktop automation bot that reads chat text, sends it to Gemini AI, and replies automatically. Includes loop prevention and hotkeys.",
        img: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?q=80&w=800&auto=format&fit=crop",
        github: "https://github.com/nischalpandey-np/chatBot.git",
        demo: null,
        tags: ["Python", "Gemini API", "PyAutoGUI"],
        tagColors: ["tag--green", "tag--blue", "tag--purple"]
    },
    {
        title: "Flowpad",
        desc: "A Kanban-style task board built with Vanilla JavaScript featuring drag-and-drop, localStorage persistence, and clean UI interactions.",
        img: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        github: "https://github.com/nischalpandey-np/flowpad",
        demo: "https://todobynischal.netlify.app/",
        tags: ["Vanilla JS", "DOM", "localStorage"],
        tagColors: ["tag--yellow", "tag--pink", "tag--blue"]
    },
    {
        title: "Weather App",
        desc: "A lightweight weather application built using Vanilla JavaScript that fetches real-time weather data from the OpenWeatherMap API. It leverages the Fetch API with async/await, dynamically updates the DOM, handles invalid city errors, and displays condition-based weather icons with a clean, responsive UI.",
        img: "https://images.unsplash.com/photo-1705077296278-d82dd5c8662f?q=80&w=809&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        github: "https://github.com/nischalpandey-np/Weather",
        demo: "https://weatherbynischal.netlify.app/",
        tags: ["Vanilla JavaScript", "Fetch API", "Async / Await", "DOM Manipulation"],
        tagColors: ["tag--yellow", "tag--pink", "tag--blue", "tag--green"]
    },
    {
        title: "Basic Calculator",
        desc: "A lightweight calculator application built using Vanilla JavaScript that performs simple calculation using (DMAS) and supports chain calculation.",
        img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        github: "https://github.com/nischalpandey-np/7basicProject",
        demo: "https://calculatorbynischal.netlify.app/",
        tags: ["Vanilla JavaScript", "REGEX", "DOM Manipulation"],
        tagColors: ["tag--yellow", "tag--pink", "tag--blue", "tag--green"]
    }
];

const projectsGrid = document.getElementById("projects-grid");
projects.forEach(project => {
  const article = document.createElement("article");
  article.className = "reveal glass-card project-card group";

  article.innerHTML = `
    <div class="project-image-wrapper">
      <img src="${project.img}" loading="lazy" alt="${project.title}" class="project-image"/>
      <div class="project-overlay">
        <a href="${project.github}" target="_blank" rel="noopener noreferrer" aria-label="View Code" class="overlay-btn">
          <i class="fab fa-github"></i>
        </a>
        ${project.demo ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer" aria-label="Live Demo" class="overlay-btn">
          <i class="fas fa-external-link-alt"></i>
        </a>` : ""}
      </div>
    </div>
    <div class="project-content">
      <h3 class="project-title">${project.title}</h3>
      <p class="project-desc">${project.desc}</p>
      <div class="tags">
        ${project.tags.map((tag, i) => `<span class="tag ${project.tagColors[i]}">${tag}</span>`).join("")}
      </div>
    </div>
  `;

  projectsGrid.appendChild(article);
});
