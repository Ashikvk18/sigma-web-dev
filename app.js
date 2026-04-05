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
            const colors = ['#e4002b', '#8b0000', '#d4af37', '#ff3333', '#b8960c'];
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
        const colors = ['#e4002b', '#8b0000', '#d4af37', '#ff3333', '#b8960c', '#ffcc00', '#cc0022'];

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
        ls.style.cssText = 'position:fixed;inset:0;background:#0a0a0a;display:flex;justify-content:center;align-items:center;z-index:4000;transition:opacity 0.5s';
        ls.innerHTML = `
            <div style="text-align:center;">
                <div style="width:50px;height:50px;border:3px solid rgba(228,0,43,0.2);border-top-color:#e4002b;border-radius:50%;animation:spin 1s linear infinite;margin:0 auto 1rem;"></div>
                <div style="color:#e4002b;font-weight:700;font-size:1.1rem;font-family:Inter,sans-serif;">Loading JavaScript Quest...</div>
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
                            `<div style="display:flex;align-items:center;gap:0.6rem;"><kbd style="background:rgba(228,0,43,0.15);padding:0.25rem 0.6rem;border-radius:6px;font-family:'JetBrains Mono',monospace;font-weight:600;font-size:0.8rem;">${k}</kbd><span style="font-size:0.9rem;">${v}</span></div>`
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

// ========================================
// SHOP SYSTEM
// ========================================

function openShop() {
    const grid = document.getElementById('shop-grid');
    if (!grid) return;

    document.getElementById('shop-coins').textContent = GameData.player.coins;
    document.getElementById('shop-gems').textContent = GameData.player.gems;

    let html = '';
    GameData.shopItems.forEach(item => {
        const owned = GameData.player.ownedCosmetics.includes(item.id);
        const canAfford = item.currency === 'coins'
            ? GameData.player.coins >= item.cost
            : GameData.player.gems >= item.cost;

        html += `
            <div class="shop-item ${owned ? 'owned' : ''}">
                <i class="${item.icon} shop-icon"></i>
                <span class="shop-item-name">${item.name}</span>
                <span class="shop-item-desc">${item.desc}</span>
                <span class="shop-item-cost">
                    <i class="fas ${item.currency === 'coins' ? 'fa-coins coin-icon' : 'fa-gem gem-icon'}"></i>
                    ${item.cost}
                </span>
                ${owned
                    ? '<span style="color:var(--success-color);font-weight:600;font-size:0.85rem;">Owned ✓</span>'
                    : `<button class="shop-buy-btn" ${!canAfford ? 'disabled' : ''} onclick="buyShopItem('${item.id}')">
                        ${canAfford ? 'Buy' : 'Not enough'}
                    </button>`
                }
            </div>
        `;
    });
    grid.innerHTML = html;
    document.getElementById('shop-modal').classList.add('active');
}

function buyShopItem(itemId) {
    const item = GameData.shopItems.find(i => i.id === itemId);
    if (!item) return;
    if (GameData.player.ownedCosmetics.includes(itemId)) return;

    if (item.currency === 'coins') {
        if (GameData.player.coins < item.cost) return;
        GameData.player.coins -= item.cost;
    } else {
        if (GameData.player.gems < item.cost) return;
        GameData.player.gems -= item.cost;
    }

    if (item.type === 'title' || item.type === 'theme') {
        GameData.player.ownedCosmetics.push(itemId);
    }

    // Award bonus: boosts give coins back as XP
    if (item.type === 'boost' || item.type === 'consumable') {
        if (window.gameEngine) window.gameEngine.addXP(20);
    }

    GameUtils.saveGameState();
    if (window.gameEngine) window.gameEngine.updatePlayerStats();
    openShop(); // refresh
    if (window.gameEngine) window.gameEngine.showNotification(`Purchased ${item.name}!`, 'success');
    app.playSound('success');
}

// ========================================
// TYPING CHALLENGE MINI-GAME
// ========================================

let typingState = {
    challenge: null,
    startTime: null,
    timer: null,
    elapsed: 0,
    finished: false,
    correctChars: 0,
    totalTyped: 0,
    combo: 0
};

function openTypingChallenge() {
    document.getElementById('typing-modal').classList.add('active');
    document.getElementById('typing-result').style.display = 'none';
    document.getElementById('typing-input').value = '';
    document.getElementById('typing-input').disabled = true;
    document.getElementById('best-wpm').textContent = GameData.player.typingBestWPM;
    document.getElementById('combo-display').textContent = GameData.player.combo;
    newTypingChallenge();
}

function closeTypingChallenge() {
    if (typingState.timer) clearInterval(typingState.timer);
    document.getElementById('typing-modal').classList.remove('active');
}

function newTypingChallenge() {
    if (typingState.timer) clearInterval(typingState.timer);
    const challenges = GameData.typingChallenges;
    typingState.challenge = challenges[Math.floor(Math.random() * challenges.length)];
    typingState.finished = false;
    typingState.startTime = null;
    typingState.elapsed = 0;
    typingState.correctChars = 0;
    typingState.totalTyped = 0;
    typingState.combo = 0;

    const prompt = document.getElementById('typing-prompt');
    prompt.innerHTML = typingState.challenge.code.split('').map(c =>
        `<span class="char">${c === '\n' ? '↵\n' : (c === ' ' ? '·' : c)}</span>`
    ).join('');

    document.getElementById('typing-input').value = '';
    document.getElementById('typing-input').disabled = true;
    document.getElementById('typing-result').style.display = 'none';
    document.getElementById('typing-timer').textContent = '0s';
    document.getElementById('typing-wpm').textContent = '0';
    document.getElementById('typing-accuracy').textContent = '100%';
    document.getElementById('typing-combo').textContent = '0x';
    document.getElementById('typing-start-btn').style.display = '';
}

function beginTyping() {
    document.getElementById('typing-start-btn').style.display = 'none';
    const input = document.getElementById('typing-input');
    input.disabled = false;
    input.focus();
    typingState.startTime = Date.now();

    typingState.timer = setInterval(() => {
        typingState.elapsed = ((Date.now() - typingState.startTime) / 1000).toFixed(1);
        document.getElementById('typing-timer').textContent = `${typingState.elapsed}s`;

        // WPM calculation
        const wordsTyped = typingState.correctChars / 5;
        const minutes = typingState.elapsed / 60;
        const wpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0;
        document.getElementById('typing-wpm').textContent = wpm;
    }, 100);

    input.oninput = function () {
        if (typingState.finished) return;
        const typed = input.value;
        const target = typingState.challenge.code;
        const chars = document.querySelectorAll('#typing-prompt .char');
        let correct = 0;
        typingState.totalTyped = typed.length;

        for (let i = 0; i < chars.length; i++) {
            chars[i].className = 'char';
            if (i < typed.length) {
                if (typed[i] === target[i]) {
                    chars[i].classList.add('char-correct');
                    correct++;
                } else {
                    chars[i].classList.add('char-wrong');
                }
            }
            if (i === typed.length) {
                chars[i].classList.add('char-cursor');
            }
        }

        typingState.correctChars = correct;
        const accuracy = typingState.totalTyped > 0 ? Math.round((correct / typingState.totalTyped) * 100) : 100;
        document.getElementById('typing-accuracy').textContent = `${accuracy}%`;

        // Combo: consecutive correct chars
        let combo = 0;
        for (let i = typed.length - 1; i >= 0 && typed[i] === target[i]; i--) combo++;
        typingState.combo = combo;
        document.getElementById('typing-combo').textContent = `${combo}x`;

        // Check completion
        if (typed === target) {
            finishTyping();
        }
    };
}

function finishTyping() {
    typingState.finished = true;
    clearInterval(typingState.timer);
    document.getElementById('typing-input').disabled = true;

    const elapsed = parseFloat(typingState.elapsed);
    const wordsTyped = typingState.correctChars / 5;
    const wpm = elapsed > 0 ? Math.round(wordsTyped / (elapsed / 60)) : 0;
    const accuracy = typingState.totalTyped > 0 ? Math.round((typingState.correctChars / typingState.totalTyped) * 100) : 100;

    // Rewards
    const xpEarned = Math.round(wpm * 0.5 + accuracy * 0.2);
    const coinsEarned = Math.round(wpm * 0.1);
    if (window.gameEngine) window.gameEngine.addXP(xpEarned);
    GameData.player.coins += coinsEarned;
    if (wpm > GameData.player.typingBestWPM) GameData.player.typingBestWPM = wpm;

    // Combo bonus
    GameData.player.combo++;
    if (GameData.player.combo > GameData.player.maxCombo) GameData.player.maxCombo = GameData.player.combo;
    showComboIndicator(GameData.player.combo);

    GameUtils.saveGameState();
    if (window.gameEngine) window.gameEngine.updatePlayerStats();

    const result = document.getElementById('typing-result');
    result.style.display = 'block';
    result.innerHTML = `
        <h3>Challenge Complete! 🎉</h3>
        <div class="result-stats">
            <div class="result-stat"><strong>${wpm}</strong><span>WPM</span></div>
            <div class="result-stat"><strong>${accuracy}%</strong><span>Accuracy</span></div>
            <div class="result-stat"><strong>${elapsed}s</strong><span>Time</span></div>
            <div class="result-stat"><strong>+${xpEarned}</strong><span>XP Earned</span></div>
            <div class="result-stat"><strong>+${coinsEarned}</strong><span>Coins</span></div>
        </div>
    `;

    document.getElementById('best-wpm').textContent = GameData.player.typingBestWPM;
    document.getElementById('combo-display').textContent = GameData.player.combo;
    app.playSound('success');
}

// ========================================
// COMBO INDICATOR
// ========================================

function showComboIndicator(combo) {
    const existing = document.querySelector('.combo-indicator');
    if (existing) existing.remove();

    if (combo < 2) return;

    const el = document.createElement('div');
    el.className = 'combo-indicator';
    if (combo >= 10) el.classList.add('blaze');
    else if (combo >= 5) el.classList.add('fire');
    el.textContent = `🔥 ${combo}x Combo!`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 2000);
}

// ========================================
// TIMED QUIZ
// ========================================

let timedQuizState = {
    questions: [],
    current: 0,
    score: 0,
    combo: 0,
    maxCombo: 0,
    timer: null,
    timeLeft: 0,
    totalTime: 15,
    active: false
};

const quizQuestionBank = [
    { q: 'What keyword declares a block-scoped variable?', opts: ['var', 'let', 'const', 'def'], correct: 1, hint: 'It was introduced in ES6 and is reassignable.' },
    { q: 'Which method converts JSON string to object?', opts: ['JSON.stringify()', 'JSON.parse()', 'JSON.convert()', 'JSON.decode()'], correct: 1, hint: 'Think about "parsing" text into data.' },
    { q: 'What does === check?', opts: ['Value only', 'Type only', 'Value and type', 'Reference'], correct: 2, hint: 'It\'s the "strict" equality operator.' },
    { q: 'Which is NOT a primitive type?', opts: ['string', 'number', 'object', 'boolean'], correct: 2, hint: 'Primitives are simple, single values.' },
    { q: 'What does Array.map() return?', opts: ['undefined', 'A new array', 'The same array', 'A boolean'], correct: 1, hint: 'It transforms each element and collects results.' },
    { q: 'Which event fires when DOM is ready?', opts: ['onload', 'DOMContentLoaded', 'onready', 'DOMReady'], correct: 1, hint: 'It fires when HTML is parsed, before images load.' },
    { q: 'What is typeof null?', opts: ['"null"', '"undefined"', '"object"', '"boolean"'], correct: 2, hint: 'This is a famous JavaScript quirk/bug.' },
    { q: 'Which method adds element to end of array?', opts: ['unshift()', 'push()', 'pop()', 'shift()'], correct: 1, hint: 'Think of pushing something onto a stack.' },
    { q: 'What does "use strict" do?', opts: ['Enables ES6', 'Enforces stricter parsing', 'Disables console', 'Enables TypeScript'], correct: 1, hint: 'It catches common coding mistakes.' },
    { q: 'Arrow functions have their own "this"?', opts: ['Yes', 'No', 'Only in classes', 'Only in modules'], correct: 1, hint: 'Arrow functions inherit "this" from their parent.' },
    { q: 'Which operator spreads an array?', opts: ['...', '***', '>>>', '<<<'], correct: 0, hint: 'It looks like three dots.' },
    { q: 'What does Promise.all() do?', opts: ['Runs first promise', 'Waits for all promises', 'Cancels promises', 'Chains promises'], correct: 1, hint: 'The word "all" is a big clue.' },
    { q: 'How to create a class in JS?', opts: ['class {}', 'new Class()', 'function Class()', 'define class'], correct: 0, hint: 'ES6 introduced a dedicated keyword for this.' },
    { q: 'Which loop is best for async iteration?', opts: ['for', 'while', 'for...of with await', 'forEach'], correct: 2, hint: 'forEach doesn\'t await inside its callback.' },
    { q: 'What is NaN === NaN?', opts: ['true', 'false', 'undefined', 'Error'], correct: 1, hint: 'NaN is not equal to anything, even itself.' }
];

function startTimedQuiz() {
    // Pick 10 random questions
    const shuffled = [...quizQuestionBank].sort(() => Math.random() - 0.5);
    timedQuizState.questions = shuffled.slice(0, 10);
    timedQuizState.current = 0;
    timedQuizState.score = 0;
    timedQuizState.combo = 0;
    timedQuizState.maxCombo = 0;
    timedQuizState.active = true;

    document.getElementById('tq-result').style.display = 'none';
    document.getElementById('tq-question-area').style.display = '';
    document.getElementById('timed-quiz-modal').classList.add('active');

    showTimedQuestion();
}

function showTimedQuestion() {
    if (timedQuizState.current >= timedQuizState.questions.length) {
        endTimedQuiz();
        return;
    }

    const q = timedQuizState.questions[timedQuizState.current];
    document.getElementById('tq-score').textContent = timedQuizState.score;
    document.getElementById('tq-combo').textContent = timedQuizState.combo;
    document.getElementById('tq-qnum').textContent = timedQuizState.current + 1;

    const area = document.getElementById('tq-question-area');
    area.innerHTML = `
        <div class="tq-question">
            <p>Q${timedQuizState.current + 1}: ${q.q}</p>
            <button class="hint-btn" onclick="useHint('quiz')"><i class="fas fa-lightbulb"></i> Hint (15 coins)</button>
            <div class="hint-box" id="tq-hint" style="display:none;"></div>
            <div class="tq-options">
                ${q.opts.map((opt, i) => `<button class="tq-option" onclick="answerTimedQuiz(${i})">${opt}</button>`).join('')}
            </div>
        </div>
    `;

    // Start timer
    timedQuizState.timeLeft = timedQuizState.totalTime;
    const fill = document.getElementById('quiz-timer-fill');
    fill.style.width = '100%';
    fill.classList.remove('danger');

    if (timedQuizState.timer) clearInterval(timedQuizState.timer);
    timedQuizState.timer = setInterval(() => {
        timedQuizState.timeLeft -= 0.1;
        const pct = Math.max(0, (timedQuizState.timeLeft / timedQuizState.totalTime) * 100);
        fill.style.width = `${pct}%`;
        if (pct < 30) fill.classList.add('danger');

        if (timedQuizState.timeLeft <= 0) {
            clearInterval(timedQuizState.timer);
            answerTimedQuiz(-1); // timeout
        }
    }, 100);
}

function answerTimedQuiz(selected) {
    if (!timedQuizState.active) return;
    clearInterval(timedQuizState.timer);

    const q = timedQuizState.questions[timedQuizState.current];
    const buttons = document.querySelectorAll('.tq-option');
    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === q.correct) btn.classList.add('correct');
        if (i === selected && i !== q.correct) btn.classList.add('wrong');
    });

    if (selected === q.correct) {
        timedQuizState.combo++;
        if (timedQuizState.combo > timedQuizState.maxCombo) timedQuizState.maxCombo = timedQuizState.combo;
        const multiplier = Math.min(1 + timedQuizState.combo * 0.2, 3);
        const timeBonus = Math.round(timedQuizState.timeLeft);
        const points = Math.round((10 + timeBonus) * multiplier);
        timedQuizState.score += points;
        app.playSound('success');
    } else {
        timedQuizState.combo = 0;
        app.playSound('error');
    }

    timedQuizState.current++;
    setTimeout(() => showTimedQuestion(), 800);
}

function endTimedQuiz() {
    timedQuizState.active = false;
    clearInterval(timedQuizState.timer);

    const xpEarned = Math.round(timedQuizState.score * 0.5);
    const coinsEarned = Math.round(timedQuizState.score * 0.1);

    if (window.gameEngine) window.gameEngine.addXP(xpEarned);
    GameData.player.coins += coinsEarned;
    GameData.player.problemsSolved += timedQuizState.questions.length;
    GameUtils.saveGameState();
    if (window.gameEngine) window.gameEngine.updatePlayerStats();

    document.getElementById('tq-question-area').style.display = 'none';
    const result = document.getElementById('tq-result');
    result.style.display = 'block';
    result.innerHTML = `
        <h3>Quiz Complete! 🏆</h3>
        <div class="tq-result-stats">
            <div class="tq-result-stat"><strong>${timedQuizState.score}</strong><span>Score</span></div>
            <div class="tq-result-stat"><strong>${timedQuizState.maxCombo}x</strong><span>Best Combo</span></div>
            <div class="tq-result-stat"><strong>+${xpEarned}</strong><span>XP Earned</span></div>
            <div class="tq-result-stat"><strong>+${coinsEarned}</strong><span>Coins</span></div>
        </div>
        <button class="btn-primary" style="margin-top:1rem;" onclick="startTimedQuiz()">
            <i class="fas fa-redo"></i> Play Again
        </button>
    `;

    app.launchConfetti();
}

// ========================================
// DAILY LOGIN REWARDS
// ========================================

function checkDailyLogin() {
    const result = GameUtils.processDailyLogin();
    if (result) {
        showLoginRewardModal(result);
    }
}

function showLoginRewardModal(result) {
    const calendar = document.getElementById('login-calendar');
    const display = document.getElementById('login-reward-display');

    const totalLogins = GameData.player.loginDays.length;
    const currentCycleDay = (totalLogins - 1) % 7;

    let html = '';
    GameData.loginRewards.forEach((reward, i) => {
        const claimed = i <= currentCycleDay;
        const isToday = i === currentCycleDay;
        html += `
            <div class="login-day ${claimed ? 'claimed' : ''} ${isToday ? 'today' : ''}">
                <i class="${reward.icon}"></i>
                <span>Day ${i + 1}</span>
                <span style="font-weight:700;font-size:0.7rem;">${reward.reward} ${reward.currency === 'coins' ? '🪙' : '💎'}</span>
            </div>
        `;
    });
    calendar.innerHTML = html;

    const r = result.reward;
    display.innerHTML = `
        <i class="${r.icon}"></i>
        You received <strong>${r.reward} ${r.currency}</strong>!
        <br><span style="font-size:0.85rem;color:var(--text-secondary);">Come back tomorrow for more rewards!</span>
    `;

    document.getElementById('login-reward-modal').classList.add('active');
    app.playSound('success');
}

// ========================================
// ACHIEVEMENT TOAST (enhanced)
// ========================================

function showAchievementToast(achievement) {
    const existing = document.querySelector('.achievement-toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'achievement-toast';
    toast.innerHTML = `
        <i class="${achievement.icon} toast-icon"></i>
        <div class="toast-text">
            <span class="toast-title">🏆 ${achievement.title}</span>
            <span class="toast-desc">${achievement.description} — +${achievement.xpReward} XP</span>
        </div>
    `;
    document.body.appendChild(toast);
    app.playSound('success');
    app.launchConfetti();
    setTimeout(() => {
        toast.style.transition = 'opacity 0.5s';
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 4000);
}

// ========================================
// FLASHCARDS
// ========================================

let fcIndex = 0;
let fcDeck = [];
let fcReviewed = 0;

function openFlashcards() {
    fcDeck = [...GameData.flashcards].sort(() => Math.random() - 0.5);
    fcIndex = 0;
    fcReviewed = 0;
    document.getElementById('flashcard-modal').classList.add('active');
    showFlashcard();
}

function showFlashcard() {
    const card = fcDeck[fcIndex];
    if (!card) return;
    document.getElementById('fc-front').textContent = card.front;
    document.getElementById('fc-back').textContent = card.back;
    document.getElementById('fc-card').classList.remove('flipped');
    document.getElementById('fc-counter').textContent = `${fcIndex + 1} / ${fcDeck.length}`;
    document.getElementById('fc-category').textContent = card.category;
}

function flipFlashcard() {
    document.getElementById('fc-card').classList.toggle('flipped');
}

function nextFlashcard() {
    if (fcIndex < fcDeck.length - 1) {
        fcIndex++;
        showFlashcard();
    }
}

function prevFlashcard() {
    if (fcIndex > 0) {
        fcIndex--;
        showFlashcard();
    }
}

function markFlashcard(type) {
    fcReviewed++;
    document.getElementById('fc-reviewed-count').textContent = fcReviewed;

    if (type === 'know') {
        // Remove from deck (won't see again this session)
        fcDeck.splice(fcIndex, 1);
        if (fcIndex >= fcDeck.length) fcIndex = Math.max(0, fcDeck.length - 1);

        GameData.player.coins += 2;
        if (window.gameEngine) {
            window.gameEngine.addXP(3);
            window.gameEngine.updatePlayerStats();
        }
        GameUtils.saveGameState();
    } else {
        // Move to end of deck for review later
        const card = fcDeck.splice(fcIndex, 1)[0];
        fcDeck.push(card);
        if (fcIndex >= fcDeck.length) fcIndex = 0;
    }

    if (fcDeck.length === 0) {
        // All cards known!
        document.getElementById('fc-front').textContent = '🎉 All cards reviewed!';
        document.getElementById('fc-back').textContent = 'Great job studying!';
        document.getElementById('fc-card').classList.remove('flipped');
        document.getElementById('fc-counter').textContent = 'Done!';
        if (window.gameEngine) window.gameEngine.addXP(10);
        app.playSound('success');
        return;
    }

    showFlashcard();
}

// ========================================
// HINTS SYSTEM
// ========================================

const HINT_COST = 15;

function useHint(mode) {
    if (GameData.player.coins < HINT_COST) {
        if (window.gameEngine) window.gameEngine.showNotification('Not enough coins! You need 15 coins for a hint.', 'warning');
        return;
    }

    if (mode === 'quiz') {
        const hintBox = document.getElementById('tq-hint');
        if (!hintBox || hintBox.style.display !== 'none') return;
        const q = timedQuizState.questions[timedQuizState.current];
        if (!q || !q.hint) return;

        GameData.player.coins -= HINT_COST;
        if (window.gameEngine) window.gameEngine.updatePlayerStats();
        GameUtils.saveGameState();

        hintBox.innerHTML = `<i class="fas fa-lightbulb"></i> ${q.hint}`;
        hintBox.style.display = 'block';
    } else if (mode === 'bug') {
        const hintBox = document.getElementById('bug-hint-box');
        if (!hintBox || hintBox.style.display !== 'none') return;
        if (!currentBug || !currentBug.hint || bugAnswered) return;

        GameData.player.coins -= HINT_COST;
        if (window.gameEngine) window.gameEngine.updatePlayerStats();
        GameUtils.saveGameState();

        hintBox.innerHTML = `<i class="fas fa-lightbulb"></i> ${currentBug.hint}`;
        hintBox.style.display = 'block';
    }

    // Hide the hint button after use
    const btn = document.querySelector(mode === 'quiz' ? '.tq-question .hint-btn' : '#bug-hint-btn');
    if (btn) btn.style.display = 'none';
}

// ========================================
// FIND THE BUG MINI-GAME
// ========================================

let currentBug = null;
let bugAnswered = false;

function openBugChallenge() {
    document.getElementById('bug-modal').classList.add('active');
    document.getElementById('bugs-found').textContent = GameData.player.problemsSolved;
    loadNewBug();
}

function loadNewBug() {
    const challenges = GameData.bugChallenges;
    currentBug = challenges[Math.floor(Math.random() * challenges.length)];
    bugAnswered = false;

    document.getElementById('bug-title').textContent = `🐛 Challenge: ${currentBug.title}`;
    document.getElementById('bug-feedback').style.display = 'none';

    const codeArea = document.getElementById('bug-code');
    codeArea.innerHTML = currentBug.lines.map((line, i) =>
        `<div class="bug-line" onclick="pickBugLine(${i})">
            <span class="line-num">${i + 1}</span>
            <span class="line-code">${line}</span>
        </div>`
    ).join('');

    // Reset hint area
    const hintBox = document.getElementById('bug-feedback');
    hintBox.style.display = 'none';
    hintBox.className = 'bug-feedback';

    // Insert hint button after code area
    const existingHintBtn = document.getElementById('bug-hint-btn');
    if (existingHintBtn) existingHintBtn.remove();
    const existingHintBox = document.getElementById('bug-hint-box');
    if (existingHintBox) existingHintBox.remove();

    const hintBtn = document.createElement('button');
    hintBtn.id = 'bug-hint-btn';
    hintBtn.className = 'hint-btn';
    hintBtn.innerHTML = '<i class="fas fa-lightbulb"></i> Hint (15 coins)';
    hintBtn.onclick = () => useHint('bug');
    codeArea.parentNode.insertBefore(hintBtn, codeArea.nextSibling);

    const hintDisplay = document.createElement('div');
    hintDisplay.id = 'bug-hint-box';
    hintDisplay.className = 'hint-box';
    hintDisplay.style.display = 'none';
    hintBtn.parentNode.insertBefore(hintDisplay, hintBtn.nextSibling);
}

function pickBugLine(lineIndex) {
    if (bugAnswered) return;
    bugAnswered = true;

    const lines = document.querySelectorAll('#bug-code .bug-line');
    const feedback = document.getElementById('bug-feedback');
    feedback.style.display = 'block';

    if (lineIndex === currentBug.bugLine) {
        lines[lineIndex].classList.add('correct-pick');
        feedback.className = 'bug-feedback correct';
        feedback.innerHTML = `<strong>✅ Correct!</strong> ${currentBug.explanation}`;

        GameData.player.problemsSolved++;
        GameData.player.coins += 10;
        if (window.gameEngine) {
            window.gameEngine.addXP(15);
            window.gameEngine.updatePlayerStats();
        }
        GameUtils.saveGameState();
        document.getElementById('bugs-found').textContent = GameData.player.problemsSolved;
        app.playSound('success');
    } else {
        lines[lineIndex].classList.add('wrong-pick');
        lines[currentBug.bugLine].classList.add('reveal-bug');
        feedback.className = 'bug-feedback wrong';
        feedback.innerHTML = `<strong>❌ Not quite.</strong> The bug is on line ${currentBug.bugLine + 1}. ${currentBug.explanation}`;
        app.playSound('error');
    }

    // Disable further clicks
    lines.forEach(l => l.style.pointerEvents = 'none');
}

// ========================================
// CODE FIX MINI-GAME
// ========================================

let currentCodeFix = null;
let codeFixAnswered = false;
let codeFixCount = 0;

function openCodeFix() {
    document.getElementById('codefix-modal').classList.add('active');
    loadNewCodeFix();
}

function loadNewCodeFix() {
    const challenges = GameData.codeFixChallenges;
    currentCodeFix = challenges[Math.floor(Math.random() * challenges.length)];
    codeFixAnswered = false;

    document.getElementById('codefix-title').textContent = `🔧 Fix: ${currentCodeFix.title}`;
    document.getElementById('codefix-feedback').style.display = 'none';
    document.getElementById('codefix-input').value = '';
    document.getElementById('codefix-input').disabled = false;

    const codeArea = document.getElementById('codefix-code');
    const lines = currentCodeFix.code.split('\n');
    codeArea.innerHTML = lines.map((line, i) => {
        const isBug = i === currentCodeFix.bugLineIndex;
        return `<div class="codefix-line${isBug ? ' bug-highlight' : ''}">
            <span class="line-num">${i + 1}</span>
            <span class="line-code">${line}</span>
        </div>`;
    }).join('');

    document.getElementById('codefix-input').focus();
}

function submitCodeFix() {
    if (codeFixAnswered || !currentCodeFix) return;
    codeFixAnswered = true;

    const input = document.getElementById('codefix-input');
    const userAnswer = input.value.trim();
    const expected = currentCodeFix.fixedLine.trim();
    const feedback = document.getElementById('codefix-feedback');
    feedback.style.display = 'block';
    input.disabled = true;

    // Normalize whitespace for comparison
    const normalize = s => s.replace(/\s+/g, ' ').trim();

    if (normalize(userAnswer) === normalize(expected)) {
        feedback.className = 'codefix-feedback correct';
        feedback.innerHTML = `<strong>✅ Perfect fix!</strong> ${currentCodeFix.explanation}`;
        codeFixCount++;
        document.getElementById('fixes-count').textContent = codeFixCount;

        GameData.player.coins += 15;
        if (window.gameEngine) {
            window.gameEngine.addXP(20);
            window.gameEngine.updatePlayerStats();
        }
        GameUtils.saveGameState();
        app.playSound('success');
    } else {
        feedback.className = 'codefix-feedback wrong';
        feedback.innerHTML = `<strong>❌ Not quite.</strong> Expected:<br><code>${expected}</code><br><br>${currentCodeFix.explanation}`;
        app.playSound('error');
    }
}

// Allow Enter key to submit
document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && document.activeElement?.id === 'codefix-input') {
        submitCodeFix();
    }
});

// ========================================
// NOTIFICATION CENTER
// ========================================

let notifHistory = [];

function toggleNotifCenter() {
    const panel = document.getElementById('notif-center');
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) {
        const badge = document.getElementById('notif-badge');
        badge.style.display = 'none';
        badge.textContent = '0';
    }
}

function pushNotification(message, type = 'info') {
    const icons = {
        success: 'fas fa-check-circle',
        xp: 'fas fa-star',
        coin: 'fas fa-coins',
        achievement: 'fas fa-trophy',
        warning: 'fas fa-exclamation-triangle',
        error: 'fas fa-exclamation-circle',
        info: 'fas fa-info-circle'
    };

    notifHistory.unshift({
        message,
        type,
        icon: icons[type] || icons.info,
        time: new Date()
    });

    // Keep max 50
    if (notifHistory.length > 50) notifHistory.pop();

    renderNotifications();

    // Update badge if panel is closed
    const panel = document.getElementById('notif-center');
    if (!panel.classList.contains('open')) {
        const badge = document.getElementById('notif-badge');
        const count = parseInt(badge.textContent || '0') + 1;
        badge.textContent = count > 9 ? '9+' : count;
        badge.style.display = 'flex';
    }
}

function renderNotifications() {
    const list = document.getElementById('notif-list');
    if (notifHistory.length === 0) {
        list.innerHTML = '<div class="notif-empty">No notifications yet</div>';
        return;
    }

    list.innerHTML = notifHistory.map(n => {
        const ago = getTimeAgo(n.time);
        return `<div class="notif-item">
            <i class="notif-item-icon ${n.type} ${n.icon}"></i>
            <div class="notif-item-body">
                <div class="notif-item-msg">${n.message}</div>
                <div class="notif-item-time">${ago}</div>
            </div>
        </div>`;
    }).join('');
}

function clearNotifications() {
    notifHistory = [];
    renderNotifications();
    const badge = document.getElementById('notif-badge');
    badge.style.display = 'none';
    badge.textContent = '0';
}

function getTimeAgo(date) {
    const s = Math.floor((Date.now() - date.getTime()) / 1000);
    if (s < 10) return 'Just now';
    if (s < 60) return `${s}s ago`;
    const m = Math.floor(s / 60);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    return `${h}h ago`;
}

// ========================================
// EXPORT / IMPORT PROGRESS
// ========================================

function exportProgress() {
    const data = {
        player: GameData.player,
        exportedAt: new Date().toISOString(),
        version: '1.0'
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jsquest-save-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    if (window.gameEngine) window.gameEngine.showNotification('Progress exported!', 'success');
}

function importProgress(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            if (!data.player || typeof data.player.xp !== 'number') {
                throw new Error('Invalid save file');
            }
            Object.assign(GameData.player, data.player);
            GameUtils.saveGameState();
            if (window.gameEngine) {
                window.gameEngine.updatePlayerStats();
                window.gameEngine.updateDashboard();
                window.gameEngine.showNotification('Progress imported successfully!', 'success');
            }
        } catch (err) {
            if (window.gameEngine) window.gameEngine.showNotification('Invalid save file.', 'error');
        }
    };
    reader.readAsText(file);
    event.target.value = '';
}

// ========================================
// SKILL TREE
// ========================================

function openSkillTree() {
    document.getElementById('skill-tree-modal').classList.add('active');
    renderSkillTree();
}

function renderSkillTree() {
    const container = document.getElementById('skill-tree-container');
    const unlocked = GameData.player.unlockedSkills || ['core-1'];
    const tree = GameData.skillTree;

    document.getElementById('skill-points-count').textContent = GameData.player.skillPoints || 0;

    const branches = {
        core: { label: 'Core Fundamentals', icon: 'fas fa-star' },
        frontend: { label: 'Frontend Path', icon: 'fas fa-desktop' },
        backend: { label: 'Backend Path', icon: 'fas fa-server' },
        fullstack: { label: 'Fullstack Path', icon: 'fas fa-layer-group' }
    };

    let html = '';
    for (const [branchId, branchInfo] of Object.entries(branches)) {
        const nodes = tree.filter(n => n.branch === branchId);
        if (nodes.length === 0) continue;

        html += `<div class="skill-branch">
            <div class="skill-branch-label ${branchId}"><i class="${branchInfo.icon}"></i> ${branchInfo.label}</div>
            <div class="skill-nodes">`;

        nodes.forEach((node, i) => {
            const isUnlocked = unlocked.includes(node.id);
            const prereqMet = !node.requires || unlocked.includes(node.requires);
            const isAvailable = !isUnlocked && prereqMet;
            const state = isUnlocked ? 'unlocked' : isAvailable ? 'available' : 'locked';

            if (i > 0) {
                const prevUnlocked = unlocked.includes(nodes[i - 1].id);
                html += `<div class="skill-connector${prevUnlocked ? ' active' : ''}"></div>`;
            }

            html += `<div class="skill-node ${state}" onclick="unlockSkill('${node.id}')" title="${node.desc}">
                ${isUnlocked ? '<div class="skill-node-check"><i class="fas fa-check"></i></div>' : ''}
                <i class="skill-node-icon ${node.icon}"></i>
                <div class="skill-node-name">${node.name}</div>
                <div class="skill-node-desc">${node.desc}</div>
                <div class="skill-node-cost">${isUnlocked ? 'Unlocked' : node.cost + ' SP'}</div>
            </div>`;
        });

        html += `</div></div>`;
    }

    container.innerHTML = html;
}

function unlockSkill(skillId) {
    const tree = GameData.skillTree;
    const node = tree.find(n => n.id === skillId);
    if (!node) return;

    const unlocked = GameData.player.unlockedSkills || ['core-1'];
    if (unlocked.includes(skillId)) return;

    // Check prerequisite
    if (node.requires && !unlocked.includes(node.requires)) {
        if (window.gameEngine) window.gameEngine.showNotification('Unlock the prerequisite skill first!', 'warning');
        return;
    }

    // Check skill points
    if ((GameData.player.skillPoints || 0) < node.cost) {
        if (window.gameEngine) window.gameEngine.showNotification(`Not enough skill points! Need ${node.cost} SP.`, 'warning');
        return;
    }

    GameData.player.skillPoints -= node.cost;
    unlocked.push(skillId);
    GameData.player.unlockedSkills = unlocked;
    GameUtils.saveGameState();

    if (window.gameEngine) window.gameEngine.showNotification(`Skill unlocked: ${node.name}!`, 'success');
    app.playSound('success');
    renderSkillTree();
}

// ========================================
// INTELLISENSE AUTOCOMPLETE
// ========================================

const isenseDictionary = [
    // Keywords
    { name: 'const', type: 'keyword', detail: 'block-scoped constant' },
    { name: 'let', type: 'keyword', detail: 'block-scoped variable' },
    { name: 'var', type: 'keyword', detail: 'function-scoped variable' },
    { name: 'function', type: 'keyword', detail: 'declare function' },
    { name: 'return', type: 'keyword', detail: 'return value' },
    { name: 'if', type: 'keyword', detail: 'conditional' },
    { name: 'else', type: 'keyword', detail: 'alternate branch' },
    { name: 'for', type: 'keyword', detail: 'loop' },
    { name: 'while', type: 'keyword', detail: 'loop' },
    { name: 'switch', type: 'keyword', detail: 'multi-branch' },
    { name: 'case', type: 'keyword', detail: 'switch case' },
    { name: 'break', type: 'keyword', detail: 'exit loop/switch' },
    { name: 'continue', type: 'keyword', detail: 'skip iteration' },
    { name: 'class', type: 'keyword', detail: 'define class' },
    { name: 'extends', type: 'keyword', detail: 'class inheritance' },
    { name: 'new', type: 'keyword', detail: 'create instance' },
    { name: 'this', type: 'keyword', detail: 'current context' },
    { name: 'async', type: 'keyword', detail: 'async function' },
    { name: 'await', type: 'keyword', detail: 'wait for promise' },
    { name: 'try', type: 'keyword', detail: 'error handling' },
    { name: 'catch', type: 'keyword', detail: 'handle error' },
    { name: 'finally', type: 'keyword', detail: 'always execute' },
    { name: 'throw', type: 'keyword', detail: 'throw error' },
    { name: 'import', type: 'keyword', detail: 'import module' },
    { name: 'export', type: 'keyword', detail: 'export module' },
    { name: 'typeof', type: 'keyword', detail: 'check type' },
    { name: 'instanceof', type: 'keyword', detail: 'check instance' },
    { name: 'true', type: 'keyword', detail: 'boolean' },
    { name: 'false', type: 'keyword', detail: 'boolean' },
    { name: 'null', type: 'keyword', detail: 'empty value' },
    { name: 'undefined', type: 'keyword', detail: 'no value' },
    // Methods
    { name: 'console.log()', type: 'method', detail: 'print to console' },
    { name: 'console.error()', type: 'method', detail: 'log error' },
    { name: 'console.warn()', type: 'method', detail: 'log warning' },
    { name: 'parseInt()', type: 'method', detail: 'string to int' },
    { name: 'parseFloat()', type: 'method', detail: 'string to float' },
    { name: 'JSON.parse()', type: 'method', detail: 'string to object' },
    { name: 'JSON.stringify()', type: 'method', detail: 'object to string' },
    { name: 'setTimeout()', type: 'method', detail: 'delay execution' },
    { name: 'setInterval()', type: 'method', detail: 'repeat execution' },
    { name: 'fetch()', type: 'method', detail: 'HTTP request' },
    { name: 'Promise.all()', type: 'method', detail: 'wait all promises' },
    { name: 'Promise.resolve()', type: 'method', detail: 'resolved promise' },
    { name: 'Math.random()', type: 'method', detail: '0-1 random number' },
    { name: 'Math.floor()', type: 'method', detail: 'round down' },
    { name: 'Math.ceil()', type: 'method', detail: 'round up' },
    { name: 'Math.max()', type: 'method', detail: 'largest value' },
    { name: 'Math.min()', type: 'method', detail: 'smallest value' },
    { name: 'Array.isArray()', type: 'method', detail: 'check if array' },
    { name: 'Object.keys()', type: 'method', detail: 'get object keys' },
    { name: 'Object.values()', type: 'method', detail: 'get object values' },
    { name: 'Object.entries()', type: 'method', detail: 'key-value pairs' },
    { name: 'Object.assign()', type: 'method', detail: 'merge objects' },
    // Properties / Array methods
    { name: '.length', type: 'property', detail: 'array/string length' },
    { name: '.push()', type: 'method', detail: 'add to end' },
    { name: '.pop()', type: 'method', detail: 'remove from end' },
    { name: '.shift()', type: 'method', detail: 'remove from start' },
    { name: '.unshift()', type: 'method', detail: 'add to start' },
    { name: '.map()', type: 'method', detail: 'transform array' },
    { name: '.filter()', type: 'method', detail: 'filter array' },
    { name: '.reduce()', type: 'method', detail: 'reduce to value' },
    { name: '.forEach()', type: 'method', detail: 'iterate array' },
    { name: '.find()', type: 'method', detail: 'find element' },
    { name: '.findIndex()', type: 'method', detail: 'find index' },
    { name: '.includes()', type: 'method', detail: 'check contains' },
    { name: '.indexOf()', type: 'method', detail: 'find position' },
    { name: '.slice()', type: 'method', detail: 'extract portion' },
    { name: '.splice()', type: 'method', detail: 'add/remove items' },
    { name: '.sort()', type: 'method', detail: 'sort array' },
    { name: '.reverse()', type: 'method', detail: 'reverse array' },
    { name: '.join()', type: 'method', detail: 'array to string' },
    { name: '.split()', type: 'method', detail: 'string to array' },
    { name: '.trim()', type: 'method', detail: 'remove whitespace' },
    { name: '.replace()', type: 'method', detail: 'replace text' },
    { name: '.toUpperCase()', type: 'method', detail: 'to uppercase' },
    { name: '.toLowerCase()', type: 'method', detail: 'to lowercase' },
    { name: '.startsWith()', type: 'method', detail: 'check prefix' },
    { name: '.endsWith()', type: 'method', detail: 'check suffix' },
    { name: '.toString()', type: 'method', detail: 'convert to string' },
    // DOM
    { name: 'document.getElementById()', type: 'method', detail: 'get by id' },
    { name: 'document.querySelector()', type: 'method', detail: 'CSS selector' },
    { name: 'document.querySelectorAll()', type: 'method', detail: 'all matches' },
    { name: 'document.createElement()', type: 'method', detail: 'create element' },
    { name: '.addEventListener()', type: 'method', detail: 'attach event' },
    { name: '.removeEventListener()', type: 'method', detail: 'remove event' },
    { name: '.appendChild()', type: 'method', detail: 'append child' },
    { name: '.classList.add()', type: 'method', detail: 'add class' },
    { name: '.classList.remove()', type: 'method', detail: 'remove class' },
    { name: '.classList.toggle()', type: 'method', detail: 'toggle class' },
    { name: '.innerHTML', type: 'property', detail: 'HTML content' },
    { name: '.textContent', type: 'property', detail: 'text content' },
    { name: '.style', type: 'property', detail: 'inline styles' },
    // Snippets
    { name: 'for (let i = 0; i < ; i++)', type: 'snippet', detail: 'for loop' },
    { name: 'for (const item of )', type: 'snippet', detail: 'for...of' },
    { name: '() => {}', type: 'snippet', detail: 'arrow function' },
    { name: 'async () => {}', type: 'snippet', detail: 'async arrow' },
    { name: 'try { } catch (e) { }', type: 'snippet', detail: 'try/catch' },
];

let isenseActive = null; // { el, dropdown, activeIndex }

function getWordAtCursor(el) {
    const isInput = el.tagName === 'INPUT';
    const val = el.value;
    const pos = el.selectionStart;
    const before = val.substring(0, pos);
    const match = before.match(/[\w.]+$/);
    return match ? match[0] : '';
}

function showIntelliSense(el, word) {
    if (!word || word.length < 2) { hideIntelliSense(); return; }

    const lower = word.toLowerCase();
    const matches = isenseDictionary.filter(d =>
        d.name.toLowerCase().includes(lower)
    ).slice(0, 10);

    if (matches.length === 0) { hideIntelliSense(); return; }

    let dropdown = el.parentElement.querySelector('.intellisense-dropdown');
    if (!dropdown) {
        dropdown = document.createElement('div');
        dropdown.className = 'intellisense-dropdown';
        el.parentElement.style.position = 'relative';
        el.parentElement.appendChild(dropdown);
    }

    dropdown.innerHTML = matches.map((m, i) =>
        `<div class="isense-item${i === 0 ? ' active' : ''}" data-index="${i}" data-name="${m.name}">
            <span class="isense-badge ${m.type}">${m.type.slice(0, 3)}</span>
            <span class="isense-name">${m.name}</span>
            <span class="isense-detail">${m.detail}</span>
        </div>`
    ).join('');

    dropdown.classList.add('visible');
    // Position below cursor
    const isTextarea = el.tagName === 'TEXTAREA';
    dropdown.style.top = (el.offsetTop + el.offsetHeight + 2) + 'px';
    dropdown.style.left = el.offsetLeft + 'px';

    isenseActive = { el, dropdown, activeIndex: 0, matches, word };

    // Click to select
    dropdown.querySelectorAll('.isense-item').forEach(item => {
        item.addEventListener('mousedown', (e) => {
            e.preventDefault();
            acceptSuggestion(item.dataset.name);
        });
    });
}

function hideIntelliSense() {
    if (isenseActive && isenseActive.dropdown) {
        isenseActive.dropdown.classList.remove('visible');
    }
    isenseActive = null;
}

function acceptSuggestion(name) {
    if (!isenseActive) return;
    const el = isenseActive.el;
    const word = isenseActive.word;
    const pos = el.selectionStart;
    const val = el.value;
    const before = val.substring(0, pos - word.length);
    const after = val.substring(pos);
    el.value = before + name + after;
    const newPos = before.length + name.length;
    el.selectionStart = el.selectionEnd = newPos;
    el.focus();
    hideIntelliSense();
}

function navigateIsense(dir) {
    if (!isenseActive) return;
    const items = isenseActive.dropdown.querySelectorAll('.isense-item');
    items[isenseActive.activeIndex]?.classList.remove('active');
    isenseActive.activeIndex = (isenseActive.activeIndex + dir + items.length) % items.length;
    items[isenseActive.activeIndex]?.classList.add('active');
    items[isenseActive.activeIndex]?.scrollIntoView({ block: 'nearest' });
}

function attachIntelliSense(el) {
    if (!el || el.dataset.isenseAttached) return;
    el.dataset.isenseAttached = 'true';

    el.addEventListener('input', () => {
        const word = getWordAtCursor(el);
        showIntelliSense(el, word);
    });

    el.addEventListener('keydown', (e) => {
        if (!isenseActive) return;
        if (e.key === 'ArrowDown') { e.preventDefault(); navigateIsense(1); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); navigateIsense(-1); }
        else if (e.key === 'Tab' || e.key === 'Enter') {
            if (isenseActive.dropdown.classList.contains('visible')) {
                e.preventDefault();
                const active = isenseActive.matches[isenseActive.activeIndex];
                if (active) acceptSuggestion(active.name);
            }
        }
        else if (e.key === 'Escape') { hideIntelliSense(); }
    });

    el.addEventListener('blur', () => setTimeout(hideIntelliSense, 150));
}

// Auto-attach to code inputs when they appear
function initIntelliSense() {
    const selectors = ['#code-editor-area', '#typing-input', '#codefix-input'];
    selectors.forEach(sel => {
        const el = document.querySelector(sel);
        if (el) attachIntelliSense(el);
    });
}

// Observe DOM for dynamically created code editors (lesson content loads later)
const isenseObserver = new MutationObserver(() => initIntelliSense());
isenseObserver.observe(document.body, { childList: true, subtree: true });

// Also init on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => setTimeout(initIntelliSense, 500));

// ========================================
// JS CHEATSHEET
// ========================================

function toggleCheatsheet() {
    document.getElementById('cheatsheet-panel').classList.toggle('open');
}

// ========================================
// WEEKLY XP GOAL
// ========================================

function initWeeklyGoal() {
    const now = new Date();
    const weekStart = GameData.player.weekStartDate ? new Date(GameData.player.weekStartDate) : null;

    // Reset if no start date or if it's been 7+ days
    if (!weekStart || (now - weekStart) >= 7 * 24 * 60 * 60 * 1000) {
        GameData.player.weeklyXp = 0;
        GameData.player.weekStartDate = now.toISOString();
        GameUtils.saveGameState();
    }

    // Sync dropdown
    const sel = document.getElementById('weekly-goal-select');
    if (sel) sel.value = GameData.player.weeklyGoal;

    updateWeeklyGoalUI();
}

function setWeeklyGoal(value) {
    GameData.player.weeklyGoal = parseInt(value);
    GameUtils.saveGameState();
    updateWeeklyGoalUI();
}

function trackWeeklyXP(amount) {
    GameData.player.weeklyXp += amount;

    if (GameData.player.weeklyXp >= GameData.player.weeklyGoal && (GameData.player.weeklyXp - amount) < GameData.player.weeklyGoal) {
        // Just hit the goal
        GameData.player.coins += 50;
        GameData.player.gems += 2;
        if (window.gameEngine) {
            window.gameEngine.showNotification('🎯 Weekly XP goal reached! +50 coins +2 gems', 'success');
            window.gameEngine.updatePlayerStats();
        }
        if (window.app) app.launchConfetti();
    }

    GameUtils.saveGameState();
    updateWeeklyGoalUI();
}

function updateWeeklyGoalUI() {
    const p = GameData.player;
    const pct = Math.min(100, Math.round((p.weeklyXp / p.weeklyGoal) * 100));

    const ring = document.getElementById('weekly-ring-fill');
    if (ring) {
        const circumference = 263.9;
        ring.style.strokeDashoffset = circumference - (circumference * pct / 100);
    }

    const label = document.getElementById('weekly-ring-label');
    if (label) label.textContent = `${pct}%`;

    const current = document.getElementById('weekly-xp-current');
    if (current) current.textContent = p.weeklyXp;

    const goal = document.getElementById('weekly-xp-goal');
    if (goal) goal.textContent = p.weeklyGoal;

    // Days left
    const daysLeft = document.getElementById('weekly-days-left');
    if (daysLeft && p.weekStartDate) {
        const elapsed = Date.now() - new Date(p.weekStartDate).getTime();
        const remaining = Math.max(0, 7 - Math.floor(elapsed / (24 * 60 * 60 * 1000)));
        daysLeft.textContent = `${remaining} day${remaining !== 1 ? 's' : ''} left`;
    }
}

// ========================================
// THEME TOGGLE
// ========================================

function toggleTheme() {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    const newTheme = isLight ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('jsquest-theme', newTheme);

    const toggle = document.getElementById('setting-theme');
    if (toggle) toggle.checked = newTheme === 'light';
}

function loadSavedTheme() {
    const saved = localStorage.getItem('jsquest-theme');
    if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
        const toggle = document.getElementById('setting-theme');
        if (toggle) toggle.checked = saved === 'light';
    }
}

// ========================================
// INIT: Check daily login on load
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    loadSavedTheme();
    initWeeklyGoal();
    setTimeout(() => checkDailyLogin(), 1500);
});

console.log('🎮 JavaScript Quest App Loaded!');
