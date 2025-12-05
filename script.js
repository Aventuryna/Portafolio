// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate toggle button
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe project cards
document.querySelectorAll('.project-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(card);
});

// Observe process steps
document.querySelectorAll('.process-step').forEach((step, index) => {
    step.style.transitionDelay = `${index * 0.1}s`;
    observer.observe(step);
});

// Nav background on scroll
let lastScroll = 0;
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Add parallax effect to hero grid
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroGrid = document.querySelector('.hero-grid');
    if (heroGrid) {
        heroGrid.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Animate stats on scroll
const statsSection = document.querySelector('.hero-stats');
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;
    
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = stat.textContent;
        const isNumber = target.match(/\d+/);
        
        if (isNumber) {
            const number = parseInt(isNumber[0]);
            const suffix = target.replace(number, '');
            let current = 0;
            const increment = number / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    stat.textContent = number + suffix;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) + suffix;
                }
            }, 30);
        }
    });
    
    statsAnimated = true;
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
        }
    });
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Add hover effect to expertise items
document.querySelectorAll('.expertise-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) rotate(1deg)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Add stagger animation to tech tags
document.querySelectorAll('.project-tech').forEach(techContainer => {
    const tags = techContainer.querySelectorAll('.tech-tag');
    tags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            tag.style.transition = 'all 0.3s ease-out';
            tag.style.opacity = '1';
            tag.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Smooth reveal for section headers
const sectionHeaders = document.querySelectorAll('.section-header');
const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.3 });

sectionHeaders.forEach(header => {
    header.style.opacity = '0';
    header.style.transform = 'translateY(20px)';
    header.style.transition = 'all 0.8s ease-out';
    headerObserver.observe(header);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-out';
        document.body.style.opacity = '1';
    }, 100);
});

// Email protection (simple obfuscation)
document.addEventListener('DOMContentLoaded', () => {
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // You can add analytics tracking here if needed
            console.log('Email link clicked');
        });
    });
});

console.log('Portfolio loaded successfully! 🚀');

// ============================================
// LIGHTBOX FUNCTIONALITY FOR GALLERY
// ============================================

function openLightbox(imageSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightboxImg.src = imageSrc;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Close lightbox with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Prevent closing when clicking on the image itself
document.getElementById('lightbox-img').addEventListener('click', (e) => {
    e.stopPropagation();
});

console.log('Gallery and Lightbox loaded successfully! 🎨');
