/* Custom Cursor
const cursor = document.querySelector('.cursor');
const trails = [];

// Create cursor trails
for(let i = 0; i < 10; i++) {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    document.body.appendChild(trail);
    trails.push({element: trail, x: 0, y: 0});
}

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    trails.forEach((trail, index) => {
        setTimeout(() => {
            trail.x = e.clientX;
            trail.y = e.clientY;
            trail.element.style.left = trail.x + 'px';
            trail.element.style.top = trail.y + 'px';
        }, index * 50);
    });
}); */

// Tilt Effect
document.querySelectorAll('.tilt').forEach(element => {
    element.addEventListener('mousemove', (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        const tiltX = (y / rect.height) * 10;
        const tiltY = -(x / rect.width) * 10;
        
        element.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.05, 1.05, 1.05)`;
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// Scroll Progress
window.addEventListener('scroll', () => {
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

/* Interactive cursor hover effects
document.querySelectorAll('a, button, .interactive').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        cursor.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.backgroundColor = '#fff';
    });
}); */

// Parallax effect for floating shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.1;
        shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
    });
});

// Glitch effect on scroll
let glitchTimeout;
window.addEventListener('scroll', () => {
    const glitchElement = document.querySelector('.glitch');
    glitchElement.style.animation = 'none';
    
    clearTimeout(glitchTimeout);
    glitchTimeout = setTimeout(() => {
        glitchElement.style.animation = 'glitch 2s infinite';
    }, 100);
});

// Dynamic background on mouse move
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;
    
    const bgAnimation = document.querySelector('.bg-animation');
    bgAnimation.style.background = `
        radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,0.05) 0%, transparent 50%),
        radial-gradient(circle at ${(1-x) * 100}% ${(1-y) * 100}%, rgba(255,255,255,0.02) 0%, transparent 50%),
        radial-gradient(circle at 50% 50%, #000 0%, transparent 50%)
    `;
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    element.textContent = '';
    let i = 0;
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initialize typing effect after page load
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero h1');
    const originalText = heroTitle.textContent;
    setTimeout(() => {
        typeWriter(heroTitle, originalText, 100);
    }, 500);
});

// Add magnetic effect to buttons
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// Particle system for background
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.life = Math.random() * 100;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
        
        if (this.x < 0 || this.x > this.canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > this.canvas.height) this.vy *= -1;
        
        if (this.life <= 0) {
            this.x = Math.random() * this.canvas.width;
            this.y = Math.random() * this.canvas.height;
            this.life = Math.random() * 100;
        }
    }
    
    draw() {
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
        this.ctx.fillStyle = `rgba(255, 255, 255, ${this.life / 100 * 0.1})`;
        this.ctx.fill();
    }
}

// Create particle canvas
const particleCanvas = document.createElement('canvas');
particleCanvas.style.position = 'fixed';
particleCanvas.style.top = '0';
particleCanvas.style.left = '0';
particleCanvas.style.width = '100%';
particleCanvas.style.height = '100%';
particleCanvas.style.pointerEvents = 'none';
particleCanvas.style.zIndex = '-1';
document.body.appendChild(particleCanvas);

function resizeCanvas() {
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const particles = [];
for (let i = 0; i < 50; i++) {
    particles.push(new Particle(particleCanvas));
}

function animateParticles() {
    const ctx = particleCanvas.getContext('2d');
    ctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
    
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    
    requestAnimationFrame(animateParticles);
}

animateParticles();

// Add scan line effect
const scanLine = document.createElement('div');
scanLine.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
    z-index: 9999;
    pointer-events: none;
    animation: scan 3s linear infinite;
`;

const scanKeyframes = `
    @keyframes scan {
        0% { top: -2px; }
        100% { top: 100vh; }
    }
`;

const scanStyle = document.createElement('style');
scanStyle.textContent = scanKeyframes;
document.head.appendChild(scanStyle);
document.body.appendChild(scanLine);