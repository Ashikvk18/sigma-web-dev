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
// INIT: Check daily login on load
// ========================================

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => checkDailyLogin(), 1500);
});

console.log('🎮 JavaScript Quest App Loaded!');
