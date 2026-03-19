// Sprite Animation Handler

class Sprite {
    constructor(element, config) {
        this.element = element;
        this.spriteSheet = config.spriteSheet;
        this.frameWidth = config.frameWidth;
        this.frameHeight = config.frameHeight;
        this.animations = config.animations;
        this.currentAnimation = null;
        this.currentFrame = 0;
        this.frameTimer = 0;
        this.isPlaying = false;
        
        this.setupElement();
    }
    
    setupElement() {
        this.element.style.width = this.frameWidth + 'px';
        this.element.style.height = this.frameHeight + 'px';
        this.element.style.backgroundImage = `url(${this.spriteSheet})`;
        this.element.style.backgroundRepeat = 'no-repeat';
        this.element.style.imageRendering = 'pixelated';
    }
    
    play(animationName) {
        if (!this.animations[animationName]) {
            console.warn(`Animation "${animationName}" not found`);
            return;
        }
        
        this.currentAnimation = this.animations[animationName];
        this.currentFrame = 0;
        this.isPlaying = true;
        this.animate();
    }
    
    stop() {
        this.isPlaying = false;
    }
    
    animate() {
        if (!this.isPlaying) return;
        
        const frame = this.currentAnimation.frames[this.currentFrame];
        const x = frame.x || (this.currentFrame * this.frameWidth);
        const y = frame.y || 0;
        
        this.element.style.backgroundPosition = `-${x}px -${y}px`;
        
        this.frameTimer++;
        if (this.frameTimer >= this.currentAnimation.frameRate) {
            this.frameTimer = 0;
            this.currentFrame++;
            
            if (this.currentFrame >= this.currentAnimation.frames.length) {
                if (this.currentAnimation.loop) {
                    this.currentFrame = 0;
                } else {
                    this.isPlaying = false;
                    if (this.currentAnimation.onComplete) {
                        this.currentAnimation.onComplete();
                    }
                    return;
                }
            }
        }
        
        requestAnimationFrame(() => this.animate());
    }
}

// Example sprite configuration
const exampleSpriteConfig = {
    spriteSheet: '/images/sprites/character/walk.png',
    frameWidth: 32,
    frameHeight: 32,
    animations: {
        idle: {
            frames: [
                { x: 0, y: 0 },
                { x: 32, y: 0 }
            ],
            frameRate: 30,
            loop: true
        },
        walk: {
            frames: [
                { x: 0, y: 32 },
                { x: 32, y: 32 },
                { x: 64, y: 32 },
                { x: 96, y: 32 }
            ],
            frameRate: 10,
            loop: true
        }
    }
};

// Auto-initialize sprites
document.addEventListener('DOMContentLoaded', () => {
    const spriteElements = document.querySelectorAll('[data-sprite]');
    
    spriteElements.forEach(element => {
        const configName = element.dataset.sprite;
        // Load sprite config from data attribute or separate file
        // const sprite = new Sprite(element, spriteConfig);
        // sprite.play('idle');
    });
});