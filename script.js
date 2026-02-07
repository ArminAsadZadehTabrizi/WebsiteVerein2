/* ==================== MOBILE NAVIGATION TOGGLE ==================== */

// Get DOM elements
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

// Toggle mobile navigation when hamburger is clicked
hamburger.addEventListener('click', () => {
    // Toggle 'active' class on hamburger for animation
    hamburger.classList.toggle('active');

    // Toggle 'active' class on mobile nav to show/hide menu
    mobileNav.classList.toggle('active');
});

// Close mobile nav when a link is clicked (smooth UX)
const mobileNavLinks = document.querySelectorAll('.mobile-nav-list a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('active');
    });
});

/* ==================== NEWS TICKER DISMISS FUNCTIONALITY ==================== */

// Get DOM elements
const tickerClose = document.getElementById('tickerClose');
const newsTicker = document.getElementById('newsTicker');

// Close ticker when X button is clicked (NO localStorage - always shows on page load)
if (tickerClose) {
    tickerClose.addEventListener('click', () => {
        // Add 'hidden' class to hide the ticker
        newsTicker.classList.add('hidden');

        // Remove the white gap by resetting body padding and header margin
        document.body.style.paddingTop = '0';

        // Get the header element and reset its position to fill the gap
        const header = document.querySelector('.site-header');
        if (header) {
            // Reset top position
            header.style.top = '0';
            // CRITICAL: Remove margin-top that was making room for the ticker
            // This makes the blue header slide up instantly to fill the gap
            header.style.marginTop = '0';
        }
    });
}

/* ==================== HERO SLIDESHOW ==================== */

// Initialize slideshow if it exists on the page
const heroSlideshow = document.querySelector('.hero-slideshow');

if (heroSlideshow) {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.dot-indicator');
    let currentSlide = 0;
    let autoAdvanceInterval;

    // Function to show a specific slide
    function goToSlide(slideIndex) {
        // Remove active class from current slide and dot
        slides[currentSlide].classList.remove('active');
        if (dots.length > 0) {
            dots[currentSlide].classList.remove('active');
        }

        // Update current slide index
        currentSlide = slideIndex;

        // Add active class to new slide and dot
        slides[currentSlide].classList.add('active');
        if (dots.length > 0) {
            dots[currentSlide].classList.add('active');
        }
    }

    // Function to show the next slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % slides.length;
        goToSlide(nextIndex);
    }

    // Make first slide visible immediately
    if (slides.length > 0) {
        slides[0].classList.add('active');
        if (dots.length > 0) {
            dots[0].classList.add('active');
        }
    }

    // Add click handlers to dot indicators for manual navigation
    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                goToSlide(index);

                // Reset auto-advance timer when user manually navigates
                if (autoAdvanceInterval) {
                    clearInterval(autoAdvanceInterval);
                    // Restart auto-advance after manual interaction
                    if (slides.length > 1) {
                        autoAdvanceInterval = setInterval(nextSlide, 5500);
                    }
                }
            });
        });
    }

    // Auto-advance slides every 5.5 seconds (5500ms)
    if (slides.length > 1) {
        autoAdvanceInterval = setInterval(nextSlide, 5500);
    }
}

/* ==================== BACK TO TOP BUTTON ==================== */

const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ==================== SMOOTH SCROLL ENHANCEMENT ==================== */

// This is handled by CSS (scroll-behavior: smooth), but we can add
// additional enhancements here if needed, such as offset for sticky header

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        // Don't prevent default for # only links
        if (href === '#') return;

        e.preventDefault();

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            // Calculate offset for sticky header (adjust as needed)
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});
