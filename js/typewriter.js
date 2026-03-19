// Typewriter Effect

class Typewriter {
    constructor(element, options = {}) {
        this.element = element;
        this.text = element.textContent;
        this.speed = options.speed || 50;
        this.delay = options.delay || 0;
        this.cursor = options.cursor !== false;
        this.loop = options.loop || false;
        this.onComplete = options.onComplete || null;
        
        this.element.textContent = '';
        this.currentIndex = 0;
        this.isTyping = false;
    }
    
    start() {
        if (this.isTyping) return;
        
        setTimeout(() => {
            this.type();
        }, this.delay);
    }
    
    type() {
        if (this.currentIndex < this.text.length) {
            this.isTyping = true;
            this.element.textContent += this.text[this.currentIndex];
            this.currentIndex++;
            
            setTimeout(() => this.type(), this.speed);
        } else {
            this.isTyping = false;
            
            if (this.onComplete) {
                this.onComplete();
            }
            
            if (this.loop) {
                setTimeout(() => {
                    this.reset();
                    this.start();
                }, 2000);
            }
        }
    }
    
    reset() {
        this.element.textContent = '';
        this.currentIndex = 0;
    }
}

// Auto-initialize typewriter on elements with data-typewriter
document.addEventListener('DOMContentLoaded', () => {
    const typewriterElements = document.querySelectorAll('[data-typewriter]');
    
    typewriterElements.forEach(element => {
        const speed = parseInt(element.dataset.typewriterSpeed) || 50;
        const delay = parseInt(element.dataset.typewriterDelay) || 0;
        const loop = element.dataset.typewriterLoop === 'true';
        
        const typewriter = new Typewriter(element, {
            speed: speed,
            delay: delay,
            loop: loop
        });
        
        typewriter.start();
    });
});

// Multi-line typewriter
class MultiLineTypewriter {
    constructor(element, lines, options = {}) {
        this.element = element;
        this.lines = lines;
        this.speed = options.speed || 50;
        this.lineDelay = options.lineDelay || 500;
        this.currentLine = 0;
    }
    
    start() {
        this.typeLine();
    }
    
    typeLine() {
        if (this.currentLine >= this.lines.length) return;
        
        const lineElement = document.createElement('div');
        this.element.appendChild(lineElement);
        
        const typewriter = new Typewriter(lineElement, {
            speed: this.speed,
            cursor: false,
            onComplete: () => {
                this.currentLine++;
                setTimeout(() => this.typeLine(), this.lineDelay);
            }
        });
        
        lineElement.textContent = this.lines[this.currentLine];
        typewriter.start();
    }
}