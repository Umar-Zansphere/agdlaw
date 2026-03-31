document.addEventListener('DOMContentLoaded', () => {
    // 1. Sticky Header UI
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Intersection Observer for Scroll Reveals
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-fade');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 3. Custom Parallax Controller
    const parallaxElements = document.querySelectorAll('.parallax-element');
    const parallaxBgs = document.querySelectorAll('.parallax-bg');
    
    // Smooth scroll variables
    let scrollY = window.scrollY;
    let targetY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        targetY = window.scrollY;
    });

    function updateParallax() {
        // very basic easing
        scrollY += (targetY - scrollY) * 0.1;

        parallaxElements.forEach(el => {
            const speed = el.getAttribute('data-speed') || 0.1;
            // Get element position relative to viewport center
            const rect = el.getBoundingClientRect();
            const elementCenter = rect.top + rect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            const distance = elementCenter - viewportCenter;
            
            const yPos = distance * speed;
            el.style.transform = `translateY(${yPos}px)`;
        });

        parallaxBgs.forEach(bg => {
            const speed = bg.getAttribute('data-speed') || 0.3;
            const yPos = scrollY * speed;
            bg.style.transform = `translateY(${yPos}px)`;
        });

        requestAnimationFrame(updateParallax);
    }
    
    // Disable parallax on mobile for performance/ux
    if (window.innerWidth > 900) {
        requestAnimationFrame(updateParallax);
    }
});
