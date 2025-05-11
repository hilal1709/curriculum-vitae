// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation
    initNavigation();
    
    // Initialize scrolling effects
    initScrollEffects();
    
    // Initialize skills animation
    initSkillsAnimation();
    
    // Initialize project filters
    initProjectFilters();
    
    // Initialize form validation
    initFormValidation();
    
    // Add scroll animations to elements
    addScrollAnimations();
});

// Navigation functionality
function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    
    // Toggle mobile menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = this.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close menu when clicking a nav item
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            if (menuToggle) {
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
            
            // Update active nav item
            navItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Update active nav item based on scroll position
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
}

// Scroll effects
function initScrollEffects() {
    const header = document.querySelector('header');
    const backToTopButton = document.getElementById('backToTop');
    
    // Shrink header on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Show/hide back to top button
        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    // Back to top functionality
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Skills animation
function initSkillsAnimation() {
    const skillsSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skill-progress');
    
    // Animate skill bars when in viewport
    let animated = false;
    
    function checkIfInView() {
        if (animated) return;
        
        const rect = skillsSection.getBoundingClientRect();
        const inView = rect.top <= window.innerHeight && rect.bottom >= 0;
        
        if (inView) {
            animated = true;
            skillBars.forEach(bar => {
                const width = bar.parentElement.parentElement.getAttribute('data-skill');
                bar.style.width = bar.style.width || bar.parentElement.nextElementSibling.textContent;
            });
        }
    }
    
    // Check on scroll
    window.addEventListener('scroll', checkIfInView);
    // Check on load (in case skills are already in view when page loads)
    window.addEventListener('load', checkIfInView);
}

// Project filters
function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                // Hide all first
                card.classList.add('hide');
                card.classList.remove('show');
                
                // Show cards that match the filter
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    setTimeout(() => {
                        card.classList.add('show');
                        card.classList.remove('hide');
                    }, 100);
                }
            });
        });
    });
}

// Form validation and submission
function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Simple validation
            if (name === '' || email === '' || message === '') {
                showFormMessage('Please fill in all required fields.', 'error');
                return;
            }
            
            // Validate email format
            if (!isValidEmail(email)) {
                showFormMessage('Please enter a valid email address.', 'error');
                return;
            }
            
            // If we get here, form is valid
            // In a real application, you would send the form data to a server
            // For now, we'll just simulate success
            showFormMessage('Thank you! Your message has been sent successfully. I will get back to you soon.', 'success');
            contactForm.reset();
            
            // Simulate form submission delay
            setTimeout(() => {
                formStatus.classList.remove('success');
                formStatus.style.display = 'none';
            }, 5000);
        });
    }
    
    // Helper function to display form messages
    function showFormMessage(message, type) {
        formStatus.textContent = message;
        formStatus.className = 'form-status';
        formStatus.classList.add(type);
        formStatus.style.display = 'block';
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(email);
    }
    
    // Download CV button
    const downloadCVBtn = document.getElementById('downloadCV');
    if (downloadCVBtn) {
        downloadCVBtn.addEventListener('click', function(e) {
            e.preventDefault();
            // Simulate download
            alert('CV download would start here. In a real site, this would be linked to an actual file.');
        });
    }
}

// Scroll animations for elements
function addScrollAnimations() {
    // Elements to animate
    const elementsToAnimate = document.querySelectorAll('.section-header, .skill-category, .project-card, .contact-info, .contact-form');
    
    // Observer options
    const options = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    // Create intersection observer
    const observer = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, options);
    
    // Observe each element
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
    
    // Add animation delay to stagger animation
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}