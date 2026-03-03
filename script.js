// Current page tracking
let currentPage = 1;
let currentNote = 1;

// Navigate to next page
function nextPage(pageNum) {
    const currentPageEl = document.getElementById(`page${currentPage}`);
    const nextPageEl = document.getElementById(`page${pageNum}`);
    
    if (!nextPageEl) return;
    
    // Add exit animation to current page
    currentPageEl.classList.add('exit');
    currentPageEl.classList.remove('active');
    
    // After animation, show next page
    setTimeout(() => {
        currentPageEl.classList.remove('exit');
        nextPageEl.classList.add('active');
        currentPage = pageNum;
        updateProgressDots();
        
        // Trigger confetti on birthday reveal (page 2)
        if (pageNum === 2) {
            setTimeout(createConfetti, 300);
        }
        
        // Trigger hearts rain on final page
        if (pageNum === 11) {
            setTimeout(createHeartsRain, 500);
            setTimeout(createConfetti, 300);
        }
    }, 300);
}

// Go to specific page (from dots)
function goToPage(pageNum) {
    if (pageNum === currentPage) return;
    nextPage(pageNum);
}

// Navigate notes
function nextNote(noteNum) {
    const currentNoteEl = document.getElementById(`note${currentNote}`);
    const nextNoteEl = document.getElementById(`note${noteNum}`);
    
    if (!nextNoteEl) return;
    
    currentNoteEl.classList.remove('active');
    
    setTimeout(() => {
        nextNoteEl.classList.add('active');
        currentNote = noteNum;
    }, 200);
}

// Restart from beginning
function restart() {
    const currentPageEl = document.getElementById(`page${currentPage}`);
    const firstPageEl = document.getElementById('page1');
    
    currentPageEl.classList.add('exit');
    currentPageEl.classList.remove('active');
    
    // Reset notes
    document.querySelectorAll('.note-slide').forEach((note, index) => {
        note.classList.remove('active');
        if (index === 0) note.classList.add('active');
    });
    currentNote = 1;
    
    setTimeout(() => {
        currentPageEl.classList.remove('exit');
        firstPageEl.classList.add('active');
        currentPage = 1;
        updateProgressDots();
    }, 300);
}

// Update progress dots
function updateProgressDots() {
    document.querySelectorAll('.progress-dots .dot').forEach((dot, index) => {
        dot.classList.remove('active');
        if (index === currentPage - 1) {
            dot.classList.add('active');
        }
    });
}

// Create Floating Hearts
function createFloatingHearts() {
    const heartsContainer = document.getElementById('hearts');
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '💞', '💓', '💘'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.fontSize = (Math.random() * 15 + 12) + 'px';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        heartsContainer.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 20000);
    }, 800);
}

// Create Confetti Burst
function createConfetti() {
    const confettiContainer = document.getElementById('confetti');
    const colors = ['#e89595', '#ffd89b', '#7dd3fc', '#a5b4fc', '#f5b8b8', '#c4b5fd'];
    
    for (let i = 0; i < 80; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            
            if (Math.random() > 0.5) {
                confetti.style.borderRadius = '50%';
            }
            
            confettiContainer.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 30);
    }
}

// Hearts rain for final page
function createHeartsRain() {
    const heartsRain = document.getElementById('heartsRain');
    const hearts = ['❤️', '💕', '💖', '💗', '💝'];
    
    for (let i = 0; i < 40; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.cssText = `
                position: absolute;
                left: ${Math.random() * 100}%;
                top: -50px;
                font-size: ${Math.random() * 25 + 15}px;
                animation: heartRain ${Math.random() * 3 + 2}s linear forwards;
                opacity: 0.8;
            `;
            heartsRain.appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, i * 100);
    }
}

// Add heart rain animation dynamically
function addHeartRainAnimation() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes heartRain {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.8;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Music Toggle
function initMusicToggle() {
    const musicToggle = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    let isPlaying = false;
    
    musicToggle.addEventListener('click', () => {
        if (isPlaying) {
            bgMusic.pause();
            musicToggle.classList.remove('playing');
            musicToggle.innerHTML = '🎵';
        } else {
            bgMusic.play().catch(e => {
                console.log('Music autoplay prevented:', e);
            });
            musicToggle.classList.add('playing');
            musicToggle.innerHTML = '🔊';
        }
        isPlaying = !isPlaying;
    });
}

// Gallery Lightbox
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    
    galleryItems.forEach(img => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            
            const imgClone = img.cloneNode();
            imgClone.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 15px;
                box-shadow: 0 20px 60px rgba(232,149,149,0.35);
            `;
            
            lightbox.appendChild(imgClone);
            document.body.appendChild(lightbox);
            
            lightbox.addEventListener('click', () => {
                lightbox.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => {
                    lightbox.remove();
                }, 300);
            });
        });
    });
}

// Keyboard navigation
function initKeyboardNav() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            if (currentPage < 11) {
                nextPage(currentPage + 1);
            }
        }
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            if (currentPage > 1) {
                nextPage(currentPage - 1);
            }
        }
    });
}

// Touch swipe navigation
function initTouchNav() {
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0 && currentPage < 11) {
                // Swipe left - next page
                nextPage(currentPage + 1);
            } else if (diff < 0 && currentPage > 1) {
                // Swipe right - previous page
                nextPage(currentPage - 1);
            }
        }
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add dynamic animations
    addHeartRainAnimation();
    
    // Create floating hearts
    createFloatingHearts();
    
    // Initialize music toggle
    initMusicToggle();
    
    // Initialize gallery lightbox
    initGalleryLightbox();
    
    // Initialize keyboard navigation
    initKeyboardNav();
    
    // Initialize touch navigation
    initTouchNav();
    
    console.log('🎂 Birthday Website Ready! Use arrow keys or click to navigate 💕');
});

// Easter egg - type "love" for extra confetti
let typedKeys = [];
document.addEventListener('keypress', (e) => {
    typedKeys.push(e.key.toLowerCase());
    typedKeys = typedKeys.slice(-4);
    
    if (typedKeys.join('') === 'love') {
        for (let i = 0; i < 3; i++) {
            setTimeout(createConfetti, i * 500);
        }
    }
});
