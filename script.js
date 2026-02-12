// ============================================
// Mobile Menu Toggle
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            const icon = this.querySelector('i');
            if (mainNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (mainNav && mobileMenuToggle && 
            !mainNav.contains(event.target) && 
            !mobileMenuToggle.contains(event.target) &&
            mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});

// ============================================
// Courses Carousel
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const coursesSlider = document.querySelector('.courses-slider');
    const prevBtn = document.querySelector('.carousel-prev');
    const nextBtn = document.querySelector('.carousel-next');
    
    if (coursesSlider && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', function() {
            coursesSlider.scrollBy({
                left: -380,
                behavior: 'smooth'
            });
        });
        
        nextBtn.addEventListener('click', function() {
            coursesSlider.scrollBy({
                left: 380,
                behavior: 'smooth'
            });
        });
    }
});

// ============================================
// Contact Form Handling
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // In Kajabi, you would integrate with Kajabi's form submission
            // For now, we'll show a success message
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
            
            // In Kajabi, you would use:
            // Kajabi.form.submit(formData);
        });
    }
});

// ============================================
// Newsletter Form Handling
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            if (email) {
                // In Kajabi, integrate with email list
                console.log('Newsletter subscription:', email);
                alert('Thank you for subscribing!');
                emailInput.value = '';
            }
        });
    });
});

// ============================================
// Smooth Scrolling
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});

// ============================================
// Sticky Header on Scroll
// ============================================
window.addEventListener('scroll', function() {
    const header = document.querySelector('.main-header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ============================================
// Image Lazy Loading (if needed)
// ============================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// Form Validation Helper
// ============================================
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePhone(phone) {
    const re = /^[\d\s\-\+\(\)]+$/;
    return re.test(phone);
}

// ============================================
// Utility Functions
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add mobile menu styles dynamically if needed
const style = document.createElement('style');
style.textContent = `
    @media (max-width: 768px) {
        .main-nav.active {
            display: block;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: var(--primary-green);
            padding: 20px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }
        
        .main-nav.active ul {
            flex-direction: column;
            gap: 15px;
        }
        
        .main-nav.active a {
            display: block;
            padding: 10px 0;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
    }
`;
document.head.appendChild(style);
