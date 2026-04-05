// ========================================
// JAVASCRIPT QUEST - MAIN APPLICATION
// ========================================

class JavaScriptQuestApp {
    constructor() {
        this.isInitialized = false;
        this.soundEnabled = true;
        this.animationsEnabled = true;
        this.particlesEnabled = true;
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }
    }

    onDOMReady() {
        this.loadSettings();
        this.setupEventListeners();
        this.setupKeyboardShortcuts();
        this.initParticles();
        this.showLoadingScreen();
        this.isInitialized = true;
        console.log('✅ JavaScript Quest Ready!');
    }

    // ========================================
    // EVENT LISTENERS
    // ========================================

    setupEventListeners() {
        // Click outside modal to close
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('active');
            }
        });

        // Keyboard
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));

        // Save before unload
        window.addEventListener('beforeunload', () => {
            if (window.gameEngine) GameUtils.saveGameState();
        });
    }

    // ========================================
    // KEYBOARD SHORTCUTS
    // ========================================

    setupKeyboardShortcuts() {
        this.shortcuts = {
            'Escape': () => {
                const m = document.querySelector('.modal.active');
                if (m) m.classList.remove('active');
            },
            '1': () => window.gameEngine && window.gameEngine.showView('dashboard'),
            '2': () => window.gameEngine && window.gameEngine.showView('learning-map'),
            '3': () => window.gameEngine && window.gameEngine.showView('profile'),
            'h': () => this.showHelp()
        };
    }

    handleKeyboard(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            if (window.gameEngine) {
                GameUtils.saveGameState();
                window.gameEngine.showNotification('Game saved!', 'success');
            }
            return;
        }
        if (this.shortcuts[e.key]) {
            e.preventDefault();
            this.shortcuts[e.key]();
        }
    }

    // ========================================
    // BACKGROUND PARTICLES
    // ========================================

    initParticles() {
        const container = document.getElementById('bg-particles');
        if (!container || !this.particlesEnabled) return;

        for (let i = 0; i < 25; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 6 + 2;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            particle.style.left = `${Math.random() * 100}%`;
            particle.style.animationDuration = `${Math.random() * 20 + 15}s`;
            particle.style.animationDelay = `${Math.random() * 15}s`;
            const colors = ['#667eea', '#764ba2', '#10b981', '#a78bfa', '#3b82f6'];
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            container.appendChild(particle);
        }
    }

    destroyParticles() {
        const container = document.getElementById('bg-particles');
        if (container) container.innerHTML = '';
    }

    // ========================================
    // CONFETTI EFFECT
    // ========================================

    launchConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const pieces = [];
        const colors = ['#667eea', '#764ba2', '#10b981', '#f59e0b', '#ef4444', '#3b82f6', '#a78bfa'];

        for (let i = 0; i < 120; i++) {
            pieces.push({
                x: canvas.width / 2 + (Math.random() - 0.5) * 400,
                y: canvas.height / 2,
                vx: (Math.random() - 0.5) * 16,
                vy: Math.random() * -18 - 4,
                w: Math.random() * 10 + 4,
                h: Math.random() * 6 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                rot: Math.random() * 360,
                rotV: (Math.random() - 0.5) * 15,
                gravity: 0.35 + Math.random() * 0.15,
                opacity: 1
            });
        }

        let frame = 0;
        const maxFrames = 150;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            frame++;

            pieces.forEach(p => {
                p.x += p.vx;
                p.vy += p.gravity;
                p.y += p.vy;
                p.rot += p.rotV;
                p.vx *= 0.99;
                if (frame > maxFrames - 40) p.opacity -= 0.025;

                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate((p.rot * Math.PI) / 180);
                ctx.globalAlpha = Math.max(0, p.opacity);
                ctx.fillStyle = p.color;
                ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
                ctx.restore();
            });

            if (frame < maxFrames) {
                requestAnimationFrame(animate);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        };
        animate();
    }

    // ========================================
    // XP POPUP
    // ========================================

    showXPPopup(amount, x, y) {
        const popup = document.createElement('div');
        popup.className = 'xp-popup';
        popup.textContent = `+${amount} XP`;
        popup.style.left = `${x || window.innerWidth / 2}px`;
        popup.style.top = `${y || 120}px`;
        document.body.appendChild(popup);
        setTimeout(() => popup.remove(), 1000);
    }

    // ========================================
    // SETTINGS
    // ========================================

    loadSettings() {
        try {
            const settings = JSON.parse(localStorage.getItem('javascriptQuestSettings') || '{}');
            this.soundEnabled = settings.soundEnabled !== false;
            this.animationsEnabled = settings.animationsEnabled !== false;
            this.particlesEnabled = settings.particlesEnabled !== false;

            // Sync checkboxes
            const syncCheckbox = (id, val) => {
                const el = document.getElementById(id);
                if (el) el.checked = val;
            };
            syncCheckbox('setting-sound', this.soundEnabled);
            syncCheckbox('setting-animations', this.animationsEnabled);
            syncCheckbox('setting-particles', this.particlesEnabled);

            // Sync name
            const nameInput = document.getElementById('setting-name');
            if (nameInput && typeof GameData !== 'undefined') {
                nameInput.value = GameData.player.name;
            }
        } catch (e) {
            // defaults are fine
        }
    }

    saveSettings() {
        localStorage.setItem('javascriptQuestSettings', JSON.stringify({
            soundEnabled: this.soundEnabled,
            animationsEnabled: this.animationsEnabled,
            particlesEnabled: this.particlesEnabled
        }));
    }

    // ========================================
    // SOUND EFFECTS
    // ========================================

    playSound(type) {
        if (!this.soundEnabled) return;
        try {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            const osc = this.audioContext.createOscillator();
            const gain = this.audioContext.createGain();
            osc.connect(gain);
            gain.connect(this.audioContext.destination);
            gain.gain.value = 0.08;

            const sounds = {
                click:      { freq: 800,  dur: 0.05 },
                navigate:   { freq: 600,  dur: 0.1  },
                success:    { freq: 1000, dur: 0.15 },
                error:      { freq: 300,  dur: 0.15 },
                levelup:    { freq: 1200, dur: 0.3  }
            };
            const s = sounds[type] || sounds.click;
            osc.frequency.value = s.freq;
            osc.start();
            osc.stop(this.audioContext.currentTime + s.dur);
        } catch (e) { /* audio not available */ }
    }

    // ========================================
    // LOADING SCREEN
    // ========================================

    showLoadingScreen() {
        const ls = document.createElement('div');
        ls.id = 'loading-screen';
        ls.style.cssText = 'position:fixed;inset:0;background:#0f0e17;display:flex;justify-content:center;align-items:center;z-index:4000;transition:opacity 0.5s';
        ls.innerHTML = `
            <div style="text-align:center;">
                <div style="width:50px;height:50px;border:3px solid rgba(102,126,234,0.2);border-top-color:#667eea;border-radius:50%;animation:spin 1s linear infinite;margin:0 auto 1rem;"></div>
                <div style="color:#667eea;font-weight:700;font-size:1.1rem;font-family:Inter,sans-serif;">Loading JavaScript Quest...</div>
            </div>
        `;
        const spinStyle = document.createElement('style');
        spinStyle.textContent = '@keyframes spin{to{transform:rotate(360deg)}}';
        document.head.appendChild(spinStyle);
        document.body.appendChild(ls);
        setTimeout(() => {
            ls.style.opacity = '0';
            setTimeout(() => ls.remove(), 500);
        }, 800);
    }

    // ========================================
    // HELP MODAL
    // ========================================

    showHelp() {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
        modal.innerHTML = `
            <div class="modal-content modal-lg">
                <div class="modal-header">
                    <h2><i class="fas fa-keyboard"></i> Help & Shortcuts</h2>
                    <button class="close-btn" onclick="this.closest('.modal').remove()"><i class="fas fa-times"></i></button>
                </div>
                <div class="modal-body">
                    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:0.6rem;margin-bottom:1.5rem;">
                        ${[['1','Dashboard'],['2','Learning Map'],['3','Profile'],['Esc','Close Modal'],['H','Help'],['Ctrl+S','Save Game']].map(([k,v]) =>
                            `<div style="display:flex;align-items:center;gap:0.6rem;"><kbd style="background:rgba(102,126,234,0.15);padding:0.25rem 0.6rem;border-radius:6px;font-family:'JetBrains Mono',monospace;font-weight:600;font-size:0.8rem;">${k}</kbd><span style="font-size:0.9rem;">${v}</span></div>`
                        ).join('')}
                    </div>
                    <h4 style="color:var(--primary-color);margin-bottom:0.75rem;">How to Play</h4>
                    <ul style="margin-left:1.25rem;color:var(--text-secondary);font-size:0.9rem;line-height:1.8;">
                        <li>Complete lessons to earn XP and points</li>
                        <li>Unlock new lessons by completing previous ones</li>
                        <li>Earn achievements for special accomplishments</li>
                        <li>Complete daily challenges for bonus rewards</li>
                        <li>Maintain a daily streak for extra motivation</li>
                    </ul>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
}

// Initialize
const app = new JavaScriptQuestApp();
window.app = app;

// ========================================
// GLOBAL FUNCTIONS (for HTML onclick)
// ========================================

function toggleSettings() {
    const modal = document.getElementById('settings-modal');
    if (modal) {
        modal.classList.toggle('active');
        // Sync current values
        const nameInput = document.getElementById('setting-name');
        if (nameInput) nameInput.value = GameData.player.name;
    }
}

function toggleSetting(key) {
    switch (key) {
        case 'sound':
            app.soundEnabled = document.getElementById('setting-sound').checked;
            break;
        case 'animations':
            app.animationsEnabled = document.getElementById('setting-animations').checked;
            break;
        case 'particles':
            app.particlesEnabled = document.getElementById('setting-particles').checked;
            if (app.particlesEnabled) {
                app.initParticles();
            } else {
                app.destroyParticles();
            }
            break;
    }
    app.saveSettings();
}

function updatePlayerName(name) {
    if (!name || !name.trim()) return;
    GameData.player.name = name.trim();
    GameUtils.saveGameState();
    if (window.gameEngine) {
        window.gameEngine.updateProfile();
        window.gameEngine.updateDashboard();
    }
}

function resetAllProgress() {
    if (confirm('Are you sure you want to reset ALL progress? This cannot be undone!')) {
        localStorage.removeItem('javascriptQuestGameState');
        localStorage.removeItem('javascriptQuestSettings');
        location.reload();
    }
}

function filterLessons(query) {
    const q = query.toLowerCase().trim();
    document.querySelectorAll('.world').forEach(world => {
        const lessons = world.querySelectorAll('.lesson');
        let hasVisible = false;
        lessons.forEach(lesson => {
            const text = lesson.textContent.toLowerCase();
            const hidden = q && !text.includes(q);
            lesson.classList.toggle('search-hidden', hidden);
            if (!hidden) hasVisible = true;
        });
        world.classList.toggle('search-hidden', q && !hasVisible);
    });
}

console.log('🎮 JavaScript Quest App Loaded!');
