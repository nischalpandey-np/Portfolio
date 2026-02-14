document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  initMobileMenu();
  initNavbarEffect();
  initTypingEffect();
  initScrollReveal();
  initActiveScrollSpy();
  initContactForm();
  updateYear();
});

const initMobileMenu = () => {
  const button = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  if (!button || !menu) return;

  const links = menu.querySelectorAll("a");

  const closeMenu = () => {
    menu.classList.add("hidden");
    button.setAttribute("aria-expanded", "false");
  };

  const openMenu = () => {
    menu.classList.remove("hidden");
    button.setAttribute("aria-expanded", "true");
  };

  button.addEventListener("click", () => {
    const isOpen = !menu.classList.contains("hidden");
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  links.forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("click", (event) => {
    if (!menu.contains(event.target) && !button.contains(event.target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      button.focus();
    }
  });
};

const initNavbarEffect = () => {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;

  const onScroll = () => {
    navbar.classList.toggle("glass-nav", window.scrollY > 14);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
};

const initTypingEffect = () => {
  const element = document.getElementById("typing-text");
  if (!element) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const words = [
    "responsive web apps",
    "MERN stack products",
    "clean frontend systems",
    "production-ready interfaces"
  ];

  if (prefersReducedMotion) {
    element.textContent = words[0];
    return;
  }

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  const tick = () => {
    const current = words[wordIndex];

    if (deleting) {
      charIndex -= 1;
      element.textContent = current.slice(0, Math.max(0, charIndex));
    } else {
      charIndex += 1;
      element.textContent = current.slice(0, charIndex);
    }

    let delay = deleting ? 38 : 72;

    if (!deleting && charIndex >= current.length) {
      deleting = true;
      delay = 1600;
    }

    if (deleting && charIndex <= 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 250;
    }

    window.setTimeout(tick, delay);
  };

  tick();
};

const initScrollReveal = () => {
  const elements = document.querySelectorAll(".reveal");
  if (!elements.length) return;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    elements.forEach((el) => el.classList.add("active"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  elements.forEach((el) => observer.observe(el));
};

const initActiveScrollSpy = () => {
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const navLinks = Array.from(document.querySelectorAll(".nav-link"));
  if (!sections.length || !navLinks.length) return;

  const updateActive = (id) => {
    navLinks.forEach((link) => {
      const active = link.getAttribute("href") === `#${id}`;
      link.classList.toggle("active", active);
      if (active) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry) => updateActive(entry.target.id));
    },
    {
      rootMargin: "-42% 0px -42% 0px",
      threshold: 0.01
    }
  );

  sections.forEach((section) => observer.observe(section));
};

const initContactForm = () => {
  const form = document.querySelector(".contact-form");
  if (!form) return;

  const submitButton = form.querySelector("button[type='submit']");
  if (!submitButton) return;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const original = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      });

      if (!response.ok) throw new Error("Request failed");

      form.reset();
      submitButton.innerHTML = '<i class="fas fa-check"></i> Sent Successfully';
      submitButton.classList.add("btn--success");
    } catch {
      submitButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Error. Try again';
      submitButton.classList.add("btn--error");
    } finally {
      window.setTimeout(() => {
        submitButton.disabled = false;
        submitButton.innerHTML = original;
        submitButton.classList.remove("btn--success", "btn--error");
      }, 2400);
    }
  });
};

const updateYear = () => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());
};

const projects = [
  {
    title: "Movie / TV Search and Watchlist App",
    desc: "React application with TMDB API integration, reusable UI components, loading/error states, and persistent watchlist via localStorage.",
    img: "static/img/unnamed.webp",
    github: "https://github.com/nischalpandey-np/movieWatchlist",
    demo: "https://searchmoviesbynischal.netlify.app",
    tags: ["React", "Tailwind CSS", "API Integration", "localStorage"],
    tagColors: ["tag--blue", "tag--primary", "tag--yellow", "tag--green"]
  },
  {
    title: "Flowpad",
    desc: "Kanban-style task manager with drag-and-drop interactions, persistent storage, and responsive interface built with HTML, CSS, and JavaScript.",
    img: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=872&auto=format&fit=crop",
    github: "https://github.com/nischalpandey-np/flowpad",
    demo: "https://todobynischal.netlify.app/",
    tags: ["Vanilla JavaScript", "Kanban", "Drag and Drop", "DOM"],
    tagColors: ["tag--yellow", "tag--pink", "tag--green", "tag--blue"]
  },
  {
    title: "Weather App",
    desc: "Weather dashboard using async/await and Fetch API with dynamic condition states, city-based search, and resilient error handling.",
    img: "https://images.unsplash.com/photo-1705077296278-d82dd5c8662f?q=80&w=809&auto=format&fit=crop",
    github: "https://github.com/nischalpandey-np/Weather",
    demo: "https://weatherbynischal.netlify.app/",
    tags: ["Fetch API", "Async/Await", "Responsive UI"],
    tagColors: ["tag--yellow", "tag--secondary", "tag--blue"]
  }
];

const renderProjects = () => {
  const grid = document.getElementById("projects-grid");
  if (!grid) return;

  grid.innerHTML = "";

  if (!projects.length) {
    grid.innerHTML = "<p class='noscript-note'>No projects available right now.</p>";
    return;
  }

  projects.forEach((project) => {
    const article = document.createElement("article");
    article.className = "reveal glass-card project-card";

    const tagsHtml = project.tags
      .map((tag, index) => `<span class="tag ${project.tagColors[index] || "tag--primary"}">${tag}</span>`)
      .join("");

    article.innerHTML = `
      <div class="project-image-wrapper">
        <img src="${project.img}" loading="lazy" alt="${project.title}" class="project-image" />
        <div class="project-overlay">
          <a href="${project.github}" target="_blank" rel="noopener noreferrer" aria-label="View source code" class="overlay-btn">
            <i class="fab fa-github"></i>
          </a>
          ${project.demo ? `<a href="${project.demo}" target="_blank" rel="noopener noreferrer" aria-label="View live demo" class="overlay-btn"><i class="fas fa-external-link-alt"></i></a>` : ""}
        </div>
      </div>
      <div class="project-content">
        <h3 class="project-title">${project.title}</h3>
        <p class="project-desc">${project.desc}</p>
        <div class="tags">${tagsHtml}</div>
      </div>
    `;

    grid.appendChild(article);
  });
};
