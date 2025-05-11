document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        easing: 'ease-out'
    });

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

    // Initialize project modals
    initProjectModals();

    // Initialize dark mode toggle
    initDarkMode();

    // Initialize typing animation
    initTypingAnimation();

    // Initialize parallax effect
    initParallaxEffect();

    // Initialize particles
    initParticles();

    // Initialize custom cursor
    initCustomCursor();

    // Add scroll animations
    addScrollAnimations();
});

function initNavigation() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');

    if (!menuToggle || !navLinks) return;

    // Toggle menu on click or touch
    ['click', 'touchstart'].forEach(event => {
        menuToggle.addEventListener(event, function(e) {
            e.preventDefault();
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Close menu on nav item click
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');

            navItems.forEach(navItem => navItem.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Close menu on outside click
    document.addEventListener('click', function(e) {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuToggle.classList.remove('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Update active nav item on scroll
    window.addEventListener('scroll', function() {
        let current = '';
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.pageYOffset >= sectionTop) {
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

function initScrollEffects() {
    const header = document.querySelector('header');
    const backToTopButton = document.getElementById('backToTop');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });

    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

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

function initSkillsAnimation() {
    const skillsSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skill-progress');
    let animated = false;

    function checkIfInView() {
        if (animated) return;
        const rect = skillsSection.getBoundingClientRect();
        const inView = rect.top <= window.innerHeight && rect.bottom >= 0;

        if (inView) {
            animated = true;
            skillBars.forEach(bar => {
                const percentage = bar.parentElement.nextElementSibling.textContent;
                bar.style.setProperty('--progress-width', percentage);
                bar.classList.add('pulse');
            });
        }
    }

    window.addEventListener('scroll', checkIfInView);
    window.addEventListener('load', checkIfInView);
}

function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectCards.forEach(card => {
                card.classList.add('hide');
                card.classList.remove('show');

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

function initFormValidation() {
    const contactForm = document.getElementById('contactForm');
    const inputs = contactForm.querySelectorAll('input, textarea');
    const formStatus = document.getElementById('formStatus');

    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.validity.valid) {
                this.classList.remove('error');
                this.nextElementSibling?.remove();
            } else {
                showError(this);
            }
        });
    });

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            inputs.forEach(input => {
                if (!input.validity.valid) {
                    showError(input);
                    isValid = false;
                }
            });

            if (isValid) {
                showFormMessage('Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
                setTimeout(() => {
                    formStatus.classList.remove('success');
                    formStatus.style.display = 'none';
                }, 5000);
            }
        });
    }

    function showError(input) {
        input.classList.add('error');
        if (!input.nextElementSibling?.classList.contains('error-message')) {
            const error = document.createElement('span');
            error.className = 'error-message';
            if (input.validity.valueMissing) {
                error.textContent = `${input.name.charAt(0).toUpperCase() + input.name.slice(1)} is required`;
            } else if (input.validity.typeMismatch) {
                error.textContent = `Invalid ${input.name} format`;
            }
            input.insertAdjacentElement('afterend', error);
        }
    }

    function showFormMessage(message, type) {
        formStatus.textContent = message;
        formStatus.className = 'form-status';
        formStatus.classList.add(type);
        formStatus.style.display = 'block';
    }
}

function initProjectModals() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('click', function(e) {
            if (e.target.closest('.project-links')) return;

            const modal = document.createElement('div');
            modal.className = 'modal';
            const images = this.getAttribute('data-images')?.split(',') || [this.querySelector('img').src];
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('p').textContent;
            const tech = this.querySelector('.project-tech').innerHTML;
            const links = this.querySelector('.project-links').innerHTML;

            modal.innerHTML = `
                <div class="modal-content">
                    <span class="modal-close">×</span>
                    <div class="modal-header">
                        <h3>${title}</h3>
                    </div>
                    <div class="modal-gallery">
                        <img src="${images[0]}" alt="${title}" class="gallery-image">
                        ${images.length > 1 ? `
                            <div class="gallery-nav">
                                <button class="gallery-prev"><i class="fas fa-chevron-left"></i></button>
                                <button class="gallery-next"><i class="fas fa-chevron-right"></i></button>
                            </div>
                            <div class="gallery-indicators">
                                ${images.map((_, i) => `<span class="gallery-indicator ${i === 0 ? 'active' : ''}"></span>`).join('')}
                            </div>
                        ` : ''}
                    </div>
                    <div class="modal-tabs">
                        <div class="modal-tab active" data-tab="description">Description</div>
                        <div class="modal-tab" data-tab="technologies">Technologies</div>
                        <div class="modal-tab" data-tab="links">Links</div>
                    </div>
                    <div class="modal-tab-content active" id="description">
                        <p>${description}</p>
                    </div>
                    <div class="modal-tab-content" id="technologies">
                        <div class="project-tech">${tech}</div>
                    </div>
                    <div class="modal-tab-content" id="links">
                        <div class="project-links">${links}</div>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            setTimeout(() => modal.classList.add('show'), 10);

            modal.querySelector('.modal-close').addEventListener('click', () => {
                modal.classList.remove('show');
                setTimeout(() => modal.remove(), 300);
            });
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('show');
                    setTimeout(() => modal.remove(), 300);
                }
            });

            if (images.length > 1) {
                const galleryImage = modal.querySelector('.gallery-image');
                const indicators = modal.querySelectorAll('.gallery-indicator');
                const prevButton = modal.querySelector('.gallery-prev');
                const nextButton = modal.querySelector('.gallery-next');
                let currentImageIndex = 0;

                function updateGallery() {
                    galleryImage.src = images[currentImageIndex];
                    indicators.forEach((indicator, index) => {
                        indicator.classList.toggle('active', index === currentImageIndex);
                    });
                }

                prevButton.addEventListener('click', () => {
                    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
                    updateGallery();
                });

                nextButton.addEventListener('click', () => {
                    currentImageIndex = (currentImageIndex + 1) % images.length;
                    updateGallery();
                });

                indicators.forEach((indicator, index) => {
                    indicator.addEventListener('click', () => {
                        currentImageIndex = index;
                        updateGallery();
                    });
                });
            }

            const tabs = modal.querySelectorAll('.modal-tab');
            const tabContents = modal.querySelectorAll('.modal-tab-content');

            tabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    tabs.forEach(t => t.classList.remove('active'));
                    tabContents.forEach(c => c.classList.remove('active'));
                    tab.classList.add('active');
                    modal.querySelector(`#${tab.getAttribute('data-tab')}`).classList.add('active');
                });
            });
        });
    });
}

function initDarkMode() {
    const themeToggle = document.querySelector('.theme-toggle');
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        this.querySelector('i').classList.toggle('fa-moon');
        this.querySelector('i').classList.toggle('fa-sun');
    });
}

function initTypingAnimation() {
    const element = document.querySelector('.typing-effect');
    const phrases = ['Web Developer', 'UI/UX Designer', 'Tech Enthusiast'];
    let currentPhrase = 0;
    let currentChar = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentText = phrases[currentPhrase].substring(0, currentChar);
        element.textContent = currentText;

        if (!isDeleting && currentChar < phrases[currentPhrase].length) {
            currentChar++;
            typingSpeed = 100;
        } else if (isDeleting && currentChar > 0) {
            currentChar--;
            typingSpeed = 50;
        } else if (!isDeleting && currentChar === phrases[currentPhrase].length) {
            isDeleting = true;
            typingSpeed = 2000;
        } else if (isDeleting && currentChar === 0) {
            isDeleting = false;
            currentPhrase = (currentPhrase + 1) % phrases.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

function initParallaxEffect() {
    const heroBackground = document.querySelector('.hero-background');
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        heroBackground.style.transform = `translateY(${scrollPosition * 0.2}px)`;
    });
}

function initParticles() {
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#3a6ea5', '#c0d6df', '#ff6b6b']
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.5,
                    random: true,
                    anim: {
                        enable: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#3a6ea5',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 200,
                        line_linked: {
                            opacity: 1
                        }
                    },
                    push: {
                        particles_nb: 4
                    }
                }
            },
            retina_detect: true
        });
    }
}

function initCustomCursor() {
    const cursor = document.querySelector('.custom-cursor');
    const follower = document.querySelector('.cursor-follower');

    if (!cursor || !follower) {
        console.error('Cursor elements not found');
        return;
    }

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (!isTouchDevice) {
        document.body.classList.add('custom-cursor-active');

        document.addEventListener('mousemove', (e) => {
            const x = e.clientX;
            const y = e.clientY;
            cursor.style.left = `${x}px`;
            cursor.style.top = `${y}px`;
            follower.style.left = `${x}px`;
            follower.style.top = `${y}px`;
        });

        document.querySelectorAll('a, button, .project-card, .social-link, .modal-close').forEach(element => {
            element.addEventListener('mouseenter', () => {
                follower.classList.add('hover');
            });
            element.addEventListener('mouseleave', () => {
                follower.classList.remove('hover');
            });
        });

        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
            follower.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = '1';
            follower.style.opacity = '0.7';
        });
    } else {
        cursor.style.display = 'none';
        follower.style.display = 'none';
    }
}

function addScrollAnimations() {
    const elementsToAnimate = document.querySelectorAll('.section-header, .skill-category, .project-card, .contact-info, .contact-form, .testimonial-card, .about-education, .about-experience, .about-languages');
    const sections = document.querySelectorAll('section');
    const options = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const elementObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('slideIn');
                entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                if (entry.target.classList.contains('section-header')) {
                    entry.target.classList.add('in-view');
                }
                observer.unobserve(entry.target);
            }
        });
    }, options);

    elementsToAnimate.forEach(element => {
        elementObserver.observe(element);
    });

    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            } else {
                entry.target.classList.remove('in-view');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}