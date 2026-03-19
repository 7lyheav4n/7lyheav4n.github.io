// Pixel Art Specific Animations

// Sprite Animation Handler
class SpriteAnimator {
    constructor(element, frames, frameRate = 100) {
        this.element = element;
        this.frames = frames;
        this.frameRate = frameRate;
        this.currentFrame = 0;
        this.isPlaying = false;
    }
    
    play() {
        if (this.isPlaying) return;
        this.isPlaying = true;
        this.animate();
    }
    
    stop() {
        this.isPlaying = false;
    }
    
    animate() {
        if (!this.isPlaying) return;
        
        this.currentFrame = (this.currentFrame + 1) % this.frames.length;
        this.element.style.backgroundPosition = this.frames[this.currentFrame];
        
        setTimeout(() => this.animate(), this.frameRate);
    }
}

// Glitch Effect
function glitchEffect(element, duration = 300) {
    element.classList.add('animate-glitch');
    setTimeout(() => {
        element.classList.remove('animate-glitch');
    }, duration);
}

// Pixel Explosion Effect
function pixelExplosion(x, y) {
    const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3'];
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        createPixelParticle(x, y, colors[Math.floor(Math.random() * colors.length)]);
    }
}

function createPixelParticle(x, y, color) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.width = '8px';
    particle.style.height = '8px';
    particle.style.backgroundColor = color;
    particle.style.pointerEvents = 'none';
    particle.style.zIndex = '9999';
    
    document.body.appendChild(particle);
    
    const angle = Math.random() * Math.PI * 2;
    const velocity = 2 + Math.random() * 4;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;
    
    let px = x;
    let py = y;
    let life = 1;
    
    function animate() {
        px += vx;
        py += vy;
        life -= 0.02;
        
        particle.style.left = px + 'px';
        particle.style.top = py + 'px';
        particle.style.opacity = life;
        
        if (life > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    }
    
    animate();
}

// Click effect on buttons
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.pixel-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX;
            const y = e.clientY;
            pixelExplosion(x, y);
        });
    });
});

// Parallax Background Effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.parallax || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initParallax();
});