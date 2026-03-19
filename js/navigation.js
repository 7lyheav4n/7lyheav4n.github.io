// Navigation Logic

// Active page highlighting
function setActivePage() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-link');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (href === currentPage || 
            (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const menuButton = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.navbar-menu');
    
    if (menuButton && navMenu) {
        menuButton.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuButton.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!menuButton.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                menuButton.classList.remove('active');
            }
        });
    }
}

// Smooth page transitions
function initPageTransitions() {
    const links = document.querySelectorAll('a[href$=".html"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip external links and anchors
            if (href.startsWith('http') || href.startsWith('#')) {
                return;
            }
            
            e.preventDefault();
            
            // Fade out
            document.body.style.opacity = '0';
            document.body.style.transition = 'opacity 0.3s';
            
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });
}

// Fade in on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

// Initialize navigation
document.addEventListener('DOMContentLoaded', () => {
    setActivePage();
    initMobileMenu();
    initPageTransitions();
});

// Scroll to top button
function initScrollToTop() {
    const scrollButton = document.createElement('button');
    scrollButton.innerHTML = '▲';
    scrollButton.className = 'scroll-to-top pixel-button';
    scrollButton.style.position = 'fixed';
    scrollButton.style.bottom = '20px';
    scrollButton.style.right = '20px';
    scrollButton.style.display = 'none';
    scrollButton.style.zIndex = '1000';
    
    document.body.appendChild(scrollButton);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollButton.style.display = 'block';
        } else {
            scrollButton.style.display = 'none';
        }
    });
    
    scrollButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initScrollToTop();
});