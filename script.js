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
    });
}

/* ==================== HERO SLIDESHOW ==================== */

// Initialize slideshow if it exists on the page
const heroSlideshow = document.querySelector('.hero-slideshow');

if (heroSlideshow) {
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    // Function to show the next slide
    function nextSlide() {
        // Remove active class from current slide
        slides[currentSlide].classList.remove('active');

        // Move to next slide (loop back to 0 if at the end)
        currentSlide = (currentSlide + 1) % slides.length;

        // Add active class to new current slide
        slides[currentSlide].classList.add('active');
    }

    // Make first slide visible immediately
    if (slides.length > 0) {
        slides[0].classList.add('active');
    }

    // Auto-advance slides every 5 seconds
    if (slides.length > 1) {
        setInterval(nextSlide, 5000);
    }
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
