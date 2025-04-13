// Wait for the DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');
    const materialCards = document.querySelectorAll('.material-card');

    
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!hamburger?.contains(event.target) && !navLinks?.contains(event.target) && navLinks?.classList.contains('active')) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
    
    // Mobile dropdown handling
    function handleDropdownToggle(event) {
        if (window.innerWidth <= 768) {
            event.preventDefault();
            const dropdown = this.closest('.dropdown');
            dropdowns.forEach(item => {
                if (item !== dropdown) {
                    item.classList.remove('active');
                }
            });
            dropdown.classList.toggle('active');
        }
    }
    
    // Add event listeners to dropdown buttons for mobile
    dropdowns.forEach(dropdown => {
        const dropBtn = dropdown.querySelector('.dropbtn');
        if (dropBtn) {
            dropBtn.addEventListener('click', handleDropdownToggle);
        }
    });
    
    // Add animation to material cards
    materialCards.forEach(card => {
        card.addEventListener('click', function() {
            const materialType = this.getAttribute('data-material');
            console.log(`Selected material: ${materialType}`);
            
            // Add click effect
            this.classList.add('clicked');
            setTimeout(() => {
                this.classList.remove('clicked');
            }, 300);
            
            // Here you could add code to show more details about the material
            // For example, open a modal or navigate to a detail page
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        const faqItems = document.querySelectorAll('.faq-item');
    
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
    
            question.addEventListener('click', () => {
                item.classList.toggle('active');
            });
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks?.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                }
                
                // Scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for the fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to current navigation item based on scroll position
    function updateActiveNavItem() {
        const scrollPosition = window.scrollY;
        
        // Get all sections
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav items
                document.querySelectorAll('.nav-links a').forEach(item => {
                    item.classList.remove('active');
                });
                
                // Add active class to corresponding nav item
                const correspondingNavItem = document.querySelector(`.nav-links a[href*="${sectionId}"]`);
                if (correspondingNavItem) {
                    correspondingNavItem.classList.add('active');
                }
            }
        });
    }
    
    // Listen for scroll events to update active nav item
    window.addEventListener('scroll', updateActiveNavItem);
    
    // Initialize active nav item on page load
    updateActiveNavItem();
    
    // Add parallax effect to hero section
    const hero = document.getElementById('hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });
    }
    
    // Add animation when elements come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.material-card, .featured-content, .address-content');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Call animation function on scroll and on load
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);

});