/**
 * Main JavaScript file for Nischal Pandey's portfolio
 * Contains all interactive functionality
 */

// Preloader
window.addEventListener("load", function () {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader.classList.add("loaded");
    setTimeout(() => {
      preloader.style.display = "none";
    }, 500);
  }, 1000);
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuBtn?.addEventListener("click", () => {
  mobileMenu?.classList.toggle("hidden");
  const icon = mobileMenuBtn.querySelector("i");
  icon?.classList.toggle("fa-bars");
  icon?.classList.toggle("fa-times");
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      mobileMenu?.classList.add("hidden");
      const icon = mobileMenuBtn?.querySelector("i");
      icon?.classList.add("fa-bars");
      icon?.classList.remove("fa-times");
    }
  });
});

// Navbar background scroll effect
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(15, 23, 42, 0.95)";
    navbar.style.backdropFilter = "blur(20px)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.1)";
    navbar.style.backdropFilter = "blur(10px)";
  }
});

// Contact form animation
const contactForm = document.getElementById("contactForm");
contactForm?.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  const name = formData.get("name");
  const email = formData.get("email");
  const subject = formData.get("subject");
  const message = formData.get("message");
  const submitBtn = this.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;

  if (name && email && subject && message) {
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      submitBtn.classList.remove("from-primary", "to-secondary");
      submitBtn.classList.add("from-green-500", "to-green-600");
      this.reset();
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.classList.remove("from-green-500", "to-green-600");
        submitBtn.classList.add("from-primary", "to-secondary");
      }, 3000);
    }, 2000);
  }
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      entry.target.style.transition = "all 0.8s ease-out";
    }
  });
}, observerOptions);

document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  observer.observe(section);
});

// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Back to top button functionality
const backToTopBtn = document.getElementById("back-to-top");
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("visible");
    backToTopBtn.classList.remove("invisible");
    backToTopBtn.classList.remove("opacity-0");
  } else {
    backToTopBtn.classList.remove("visible");
    backToTopBtn.classList.add("invisible");
    backToTopBtn.classList.add("opacity-0");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Typed.js initialization for hero section
document.addEventListener("DOMContentLoaded", function () {
  const typed = new Typed("#typed-text", {
    strings: [
      "Web Developer^1000",
      "MERN Stack Developer^1000",
      "Junior Full Stack Developer^1000",
      "JavaScript Developer^1000",
    ],

    typeSpeed: 80,
    backSpeed: 40,
    backDelay: 1500,
    startDelay: 500,
    loop: true,
    showCursor: true,
    cursorChar: "|",
    smartBackspace: true,
    fadeOut: false,
    fadeOutClass: "typed-fade-out",
    fadeOutDelay: 500,

    // Enhanced callbacks for better effects
    onBegin: function (self) {
      // Add entrance animation
      document.getElementById("typed-text").style.transform =
        "translateY(10px)";
      document.getElementById("typed-text").style.opacity = "0";
      setTimeout(() => {
        document.getElementById("typed-text").style.transform = "translateY(0)";
        document.getElementById("typed-text").style.opacity = "1";
        document.getElementById("typed-text").style.transition =
          "all 0.3s ease";
      }, 100);
    },

    onStringTyped: function (arrayPos, self) {
      // Add a subtle pulse effect when string is complete
      const element = document.getElementById("typed-text");
      element.style.transform = "scale(1.05)";
      setTimeout(() => {
        element.style.transform = "scale(1)";
        element.style.transition = "transform 0.2s ease";
      }, 150);
    },

    preStringTyped: function (arrayPos, self) {
      // Add anticipation effect before typing
      const element = document.getElementById("typed-text");
      element.style.filter = "brightness(1.2)";
      setTimeout(() => {
        element.style.filter = "brightness(1)";
        element.style.transition = "filter 0.3s ease";
      }, 200);
    },
  });

  // Add hover effect to the typed text container
  const heroDesc = document.querySelector(".hero-description");
  heroDesc.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px)";
    this.style.transition = "transform 0.3s ease";
    document.getElementById("typed-text").style.filter =
      "brightness(1.3) saturate(1.2)";
  });

  heroDesc.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
    document.getElementById("typed-text").style.filter =
      "brightness(1) saturate(1)";
  });
});
// Custom cursor functionality
const cursor = document.querySelector(".cursor");
const trails = [];
const trailLength = 8;

// Create cursor trails
for (let i = 0; i < trailLength; i++) {
  const trail = document.createElement("div");
  trail.className = "cursor-trail";
  document.body.appendChild(trail);
  trails.push(trail);
}

let mouseX = 0,
  mouseY = 0;
let cursorX = 0,
  cursorY = 0;

document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animateCursor() {
  cursorX += (mouseX - cursorX) * 0.1;
  cursorY += (mouseY - cursorY) * 0.1;

  cursor.style.left = cursorX - 10 + "px";
  cursor.style.top = cursorY - 10 + "px";

  // Animate trails
  trails.forEach((trail, index) => {
    const delay = (index + 1) * 0.05;
    const trailX = cursorX + (mouseX - cursorX) * (1 - delay);
    const trailY = cursorY + (mouseY - cursorY) * (1 - delay);

    trail.style.left = trailX - 3 + "px";
    trail.style.top = trailY - 3 + "px";
    trail.style.opacity = 1 - index / trailLength;
  });

  requestAnimationFrame(animateCursor);
}
animateCursor();

// 3D Background with Three.js
let scene, camera, renderer, particles;

function initThree() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("three-canvas"),
    alpha: true,
    antialias: true,
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0);

  // Create particle system
  const particleCount = 2000;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 200;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 200;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 200;

    const color = new THREE.Color();
    color.setHSL(Math.random() * 0.3 + 0.7, 0.8, 0.6);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 2,
    vertexColors: true,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
  });

  particles = new THREE.Points(geometry, material);
  scene.add(particles);

  camera.position.z = 50;

  animate();
}

function animate() {
  requestAnimationFrame(animate);

  particles.rotation.x += 0.0005;
  particles.rotation.y += 0.001;

  renderer.render(scene, camera);
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  initThree();
});

// Handle window resize
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Parallax effect for orbs
document.addEventListener("mousemove", (e) => {
  const mouseX = e.clientX / window.innerWidth;
  const mouseY = e.clientY / window.innerHeight;

  document.querySelectorAll(".orb").forEach((orb, index) => {
    const speed = (index + 1) * 0.02;
    const x = (mouseX - 0.5) * speed * 100;
    const y = (mouseY - 0.5) * speed * 100;
    orb.style.transform = `translate(${x}px, ${y}px)`;
  });
});

// Button hover effects for cursor
document.querySelectorAll(".btn").forEach((btn) => {
  btn.addEventListener("mouseenter", () => {
    cursor.style.transform = "scale(2)";
    cursor.style.opacity = "0.5";
  });

  btn.addEventListener("mouseleave", () => {
    cursor.style.transform = "scale(1)";
    cursor.style.opacity = "1";
  });
});
