// 1. Mobile Menu Toggle
const btn = document.getElementById("mobile-menu-btn");
const menu = document.getElementById("mobile-menu");

btn.addEventListener("click", () => {
  menu.classList.toggle("hidden");
});

// Close menu when clicking a link
menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.add("hidden");
  });
});

// 2. Navbar Glass Effect on Scroll
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    navbar.classList.add("glass-nav");
    navbar.classList.remove("py-4");
    navbar.classList.add("py-2");
  } else {
    navbar.classList.remove("glass-nav");
    navbar.classList.remove("py-2");
    navbar.classList.add("py-4");
  }
});

// 3. Simple Typing Effect (No library needed)
const texts = [
  "Web Developer",
  "MERN Stack Developer",
  "Python Developer",
  "JavaScript Developer",
];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {
  if (count === texts.length) {
    count = 0;
  }
  currentText = texts[count];
  letter = currentText.slice(0, ++index);

  document.getElementById("typing-text").textContent = letter;

  if (letter.length === currentText.length) {
    count++;
    index = 0;
    setTimeout(type, 2000); // Wait before clearing
  } else {
    setTimeout(type, 100); // Typing speed
  }
})();

// 4. Scroll Reveal Animation
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target); // Only animate once
      }
    });
  },
  { threshold: 0.1 }
);

revealElements.forEach((el) => revealObserver.observe(el));

// 5. Dynamic Year
document.getElementById("year").textContent = new Date().getFullYear();
