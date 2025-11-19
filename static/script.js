

// Lean, professional site script

// Preloader: hide when fully loaded
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  if (!preloader) return;
  // short delay for perceived smoothness
  setTimeout(() => {
    preloader.classList.add("loaded");
    setTimeout(() => preloader.remove(), 400);
  }, 600);
});

// Mobile menu toggle (minimal)
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu?.classList.toggle("hidden");
    const icon = mobileMenuBtn.querySelector("i");
    if (icon) icon.classList.toggle("fa-times");
  });
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (!href || href === "#") return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      mobileMenu?.classList.add("hidden");
    }
  });
});

// Navbar background on scroll (simple and accessible)
const navbar = document.getElementById("navbar");
function updateNavbar() {
  if (!navbar) return;
  if (window.scrollY > 80) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}
window.addEventListener("scroll", updateNavbar);
updateNavbar();

// Simple contact form feedback (no external calls)
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const submitBtn = this.querySelector('button[type="submit"]');
    if (!submitBtn) return;
    const original = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent';
    // Reset and restore button after short delay
    this.reset();
    setTimeout(() => {
      submitBtn.innerHTML = original;
      submitBtn.disabled = false;
    }, 2000);
  });
}

// Fade-in on scroll using IntersectionObserver (kept simple)
const observerOptions = { threshold: 0.12 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);
document.querySelectorAll("section").forEach((s) => observer.observe(s));

// Footer year
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Back to top
const backToTopBtn = document.getElementById("back-to-top");
if (backToTopBtn) {
  const toggle = () => backToTopBtn.classList.toggle("visible", window.scrollY > 300);
  window.addEventListener("scroll", toggle);
  toggle();
  backToTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

// Typed.js — small, graceful fallback if not available
document.addEventListener("DOMContentLoaded", () => {
  if (typeof Typed !== "undefined") {
    const el = document.getElementById("typed-text");
    if (el) {
      new Typed("#typed-text", {
        strings: ["Web Developer", "Full Stack Developer", "JavaScript Enthusiast"],
        typeSpeed: 60,
        backSpeed: 30,
        backDelay: 1400,
        startDelay: 300,
        loop: true,
        showCursor: true,
        cursorChar: "|",
      });
    }
  }
});
