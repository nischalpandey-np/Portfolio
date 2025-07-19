// script.js
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const body = document.body;
    const header = document.querySelector('.header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');
    const themeToggle = document.querySelector('.theme-toggle');
    const yearSpan = document.getElementById('year');
    const sections = document.querySelectorAll('main section');
    const form = document.getElementById('contactForm');
    const fileInput = document.getElementById('attachment');
    const fileNameSpan = document.getElementById('file-name');
    const filePreview = document.getElementById('file-preview');
    
    // Theme Toggle
    const currentTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (currentTheme) {
        body.setAttribute('data-theme', currentTheme);
    } else {
        body.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
    
    themeToggle.addEventListener('click', () => {
        const newTheme = body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    });
    
    // Mobile Navigation
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.classList.toggle('active');
        navLinksContainer.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        body.style.overflow = !isExpanded ? 'hidden' : '';
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksContainer.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinksContainer.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                body.style.overflow = '';
            }
        });
    });
    
    // Scroll Functionality
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
                currentSection = section.getAttribute('id');
            }
        });
    
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = header.offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Footer Year
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
    
    // File Attachment Handling
    fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        filePreview.innerHTML = '';
        
        if (files.length > 0) {
            const file = files[0];
            
            if (file.size > 5 * 1024 * 1024) {
                alert('File size exceeds 5MB limit');
                fileInput.value = '';
                fileNameSpan.textContent = 'Attach file (optional)';
                return;
            }
            
            const validTypes = ['application/pdf', 'application/msword', 
                'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 
                'image/jpeg', 'image/png'];
            
            if (!validTypes.includes(file.type)) {
                alert('Only PDF, DOC, JPG, and PNG files are allowed');
                fileInput.value = '';
                fileNameSpan.textContent = 'Attach file (optional)';
                return;
            }
            
            fileNameSpan.textContent = file.name;
            
            const previewItem = document.createElement('div');
            previewItem.className = 'file-preview-item';
            previewItem.innerHTML = `
                <i class="fas ${getFileIcon(file.type)}"></i>
                <span>${file.name}</span>
                <span class="remove-file"><i class="fas fa-times"></i></span>
            `;
            
            const removeBtn = previewItem.querySelector('.remove-file');
            removeBtn.addEventListener('click', () => {
                fileInput.value = '';
                fileNameSpan.textContent = 'Attach file (optional)';
                filePreview.removeChild(previewItem);
            });
            
            filePreview.appendChild(previewItem);
        } else {
            fileNameSpan.textContent = 'Attach file (optional)';
        }
    });
    
    function getFileIcon(fileType) {
        if (fileType.includes('pdf')) return 'fa-file-pdf';
        if (fileType.includes('word')) return 'fa-file-word';
        if (fileType.includes('image')) return 'fa-file-image';
        return 'fa-file';
    }
    
    // Initial scroll handlers
    handleScroll();
    
    // Simple animations
    document.querySelectorAll('section').forEach((section, index) => {
        setTimeout(() => {
            section.style.opacity = '1';
        }, 300 * index);
    });
    
    // Hero image hover effect
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        heroImage.addEventListener('mouseenter', () => {
            heroImage.style.transform = 'scale(1.05)';
        });
        
        heroImage.addEventListener('mouseleave', () => {
            heroImage.style.transform = 'scale(1)';
        });
    }
});