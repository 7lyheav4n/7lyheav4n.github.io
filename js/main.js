// Main JavaScript Entry Point

console.log('== Website Loaded! ==');

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
    console.log('--DOM Ready--');
    
    // Initialize navigation
    initNavigation();
    
    // Add page load animation
    animatePageLoad();
    
    // Add scroll effects
    initScrollEffects();
    
    // Initialize pixel cursor (optional)
    // initPixelCursor();
});

// Navigation Initialization
function initNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.navbar-link');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        }
        
        // Add click sound effect (optional)
        link.addEventListener('click', () => {
            playSound('click');
        });
    });
}

// Page Load Animation
function animatePageLoad() {
    const elements = document.querySelectorAll('h1, h2, p, .pixel-card');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.5s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Scroll Effects
function initScrollEffects() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    const elementsToAnimate = document.querySelectorAll('.pixel-card, .skill-bar');
    elementsToAnimate.forEach(el => observer.observe(el));
}

// Play Sound Effect (optional - needs audio files)
function playSound(soundName) {
    // Uncomment when you add audio files
    // const audio = new Audio(`/audio/${soundName}.wav`);
    // audio.volume = 0.3;
    // audio.play();
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add pixel border effect on hover
document.querySelectorAll('.pixel-button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translate(-2px, -2px)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translate(0, 0)';
    });
});



// // Matrix Boot Sequence
// document.addEventListener('DOMContentLoaded', () => {
//     const bootSequence = [
//         ''
//     ];

//     let bootIndex = 0;
//     const bootElement = document.createElement('div');
//     bootElement.style.cssText = `
//         position: fixed;
//         top: 50%;
//         left: 50%;
//         transform: translate(-50%, -50%);
//         color: #00FF41;
//         font-family: monospace;
//         font-size: 14px;
//         z-index: 10000;
//         text-align: center;
//         background: rgba(0, 0, 0, 0.9);
//         padding: 20px;
//         border: 2px solid #00FF41;
//     `;
    
//     document.body.appendChild(bootElement);

//     function showBootText() {
//         if (bootIndex < bootSequence.length) {
//             bootElement.textContent = bootSequence[bootIndex];
//             bootIndex++;
//             setTimeout(showBootText, 800);
//         } else {
//             bootElement.style.opacity = '0';
//             bootElement.style.transition = 'opacity 0.5s';
//             setTimeout(() => bootElement.remove(), 500);
//         }
//     }

//     showBootText();
// });