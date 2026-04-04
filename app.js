// ========================================
// JAVASCRIPT QUEST - MAIN APPLICATION
// ========================================

// Main application controller
class JavaScriptQuestApp {
    constructor() {
        this.isInitialized = false;
        this.currentTheme = 'dark';
        this.soundEnabled = true;
        this.animationsEnabled = true;
        
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.onDOMReady());
        } else {
            this.onDOMReady();
        }
    }

    onDOMReady() {
        console.log('🚀 JavaScript Quest Application Starting...');
        
        // Initialize application
        this.setupEventListeners();
        this.loadSettings();
        this.setupKeyboardShortcuts();
        this.initializeAnimations();
        
        // Show loading screen briefly
        this.showLoadingScreen();
        
        // Mark as initialized
        this.isInitialized = true;
        
        console.log('✅ JavaScript Quest Application Ready!');
    }

    // ========================================
    // EVENT LISTENERS
    // ========================================

    setupEventListeners() {
        // Navigation buttons
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.currentTarget.textContent.toLowerCase().includes('dashboard') ? 'dashboard' :
                           e.currentTarget.textContent.toLowerCase().includes('map') ? 'learning-map' : 'profile';
                this.navigateToView(view);
            });
        });

        // Modal close buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('.close-btn')) {
                this.closeModal(e.target.closest('.modal'));
            }
        });

        // Click outside modal to close
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                this.closeModal(e.target);
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });

        // Window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Before unload - save game state
        window.addEventListener('beforeunload', () => {
            if (window.gameEngine) {
                GameUtils.saveGameState();
            }
        });

        // Visibility change - pause/resume
        document.addEventListener('visibilitychange', () => {
            this.handleVisibilityChange();
        });
    }

    // ========================================
    // NAVIGATION
    // ========================================

    navigateToView(viewId) {
        if (!this.isInitialized) return;
        
        // Navigate to view
        if (window.gameEngine) {
            window.gameEngine.showView(viewId);
        }
        
        // Play navigation sound
        this.playSound('navigate');
        
        // Track navigation
        this.trackEvent('navigation', { view: viewId });
    }

    handleLessonClick(lessonTitle, lessonElement) {
        if (lessonElement.classList.contains('locked')) {
            this.showNotification('This lesson is locked! Complete previous lessons first.', 'warning');
            this.shakeElement(lessonElement);
            return;
        }
        
        // Find lesson by title
        const lesson = Object.values(GameData.lessons).find(l => l.title === lessonTitle);
        if (lesson && window.gameEngine) {
            window.gameEngine.startLesson(lesson.id);
        }
        
        // Play click sound
        this.playSound('click');
    }

    // ========================================
    // KEYBOARD SHORTCUTS
    // ========================================

    setupKeyboardShortcuts() {
        this.shortcuts = {
            'Escape': () => this.closeCurrentModal(),
            '1': () => this.navigateToView('dashboard'),
            '2': () => this.navigateToView('learning-map'),
            '3': () => this.navigateToView('profile'),
            'h': () => this.showHelp(),
            's': () => this.toggleSound(),
            't': () => this.toggleTheme(),
            'r': () => this.resetProgress(),
            'Ctrl+s': () => this.saveGame(),
            'Ctrl+l': () => this.loadGame()
        };
    }

    handleKeyboardNavigation(e) {
        // Don't handle shortcuts when typing in input fields
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
        
        const key = e.ctrlKey ? `Ctrl+${e.key}` : e.key;
        
        if (this.shortcuts[key]) {
            e.preventDefault();
            this.shortcuts[key]();
        }
    }

    // ========================================
    // MODAL MANAGEMENT
    // ========================================

    closeModal(modal) {
        if (modal) {
            modal.classList.remove('active');
            this.playSound('close');
        }
    }

    closeCurrentModal() {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            this.closeModal(activeModal);
        }
    }

    showModal(content, title = '') {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                ${title ? `
                    <div class="modal-header">
                        <h2>${title}</h2>
                        <button class="close-btn">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                ` : ''}
                <div class="modal-body">
                    ${content}
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        this.playSound('open');
        
        return modal;
    }

    // ========================================
    // NOTIFICATIONS
    // ========================================

    showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${this.getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        requestAnimationFrame(() => {
            notification.classList.add('show');
        });
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            this.removeNotification(notification);
        });
        
        // Auto remove
        if (duration > 0) {
            setTimeout(() => {
                this.removeNotification(notification);
            }, duration);
        }
        
        // Play sound
        this.playSound(type === 'error' ? 'error' : 'notification');
        
        return notification;
    }

    removeNotification(notification) {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle',
            achievement: 'fa-trophy',
            levelup: 'fa-level-up-alt'
        };
        return icons[type] || icons.info;
    }

    // ========================================
    // SETTINGS
    // ========================================

    loadSettings() {
        const settings = localStorage.getItem('javascriptQuestSettings');
        if (settings) {
            const parsed = JSON.parse(settings);
            this.soundEnabled = parsed.soundEnabled !== false;
            this.animationsEnabled = parsed.animationsEnabled !== false;
            this.currentTheme = parsed.theme || 'dark';
            
            this.applySettings();
        }
    }

    saveSettings() {
        const settings = {
            soundEnabled: this.soundEnabled,
            animationsEnabled: this.animationsEnabled,
            theme: this.currentTheme
        };
        localStorage.setItem('javascriptQuestSettings', JSON.stringify(settings));
    }

    applySettings() {
        // Apply theme
        document.body.setAttribute('data-theme', this.currentTheme);
        
        // Apply animations
        if (!this.animationsEnabled) {
            document.body.classList.add('no-animations');
        }
    }

    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        this.saveSettings();
        this.showNotification(`Sound ${this.soundEnabled ? 'enabled' : 'disabled'}`, 'info');
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applySettings();
        this.saveSettings();
        this.showNotification(`Theme changed to ${this.currentTheme}`, 'info');
    }

    // ========================================
    // SOUND EFFECTS
    // ========================================

    playSound(type) {
        if (!this.soundEnabled) return;
        
        // Create audio context for sound effects
        if (!this.audioContext) {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // Different sounds for different actions
        switch (type) {
            case 'click':
                oscillator.frequency.value = 800;
                gainNode.gain.value = 0.1;
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.05);
                break;
            case 'navigate':
                oscillator.frequency.value = 600;
                gainNode.gain.value = 0.1;
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.1);
                break;
            case 'achievement':
                oscillator.frequency.value = 1000;
                gainNode.gain.value = 0.2;
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.2);
                break;
            case 'error':
                oscillator.frequency.value = 300;
                gainNode.gain.value = 0.1;
                oscillator.start();
                oscillator.stop(this.audioContext.currentTime + 0.15);
                break;
            case 'levelup':
                oscillator.frequency.value = 1200;
                gainNode.gain.value = 0.2;
                oscillator.start();
                oscillator.frequency.linearRampToValueAtTime(1600, this.audioContext.currentTime + 0.3);
                oscillator.stop(this.audioContext.currentTime + 0.3);
                break;
        }
    }

    // ========================================
    // ANIMATIONS
    // ========================================

    initializeAnimations() {
        // Add CSS animations
        const style = document.createElement('style');
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                background: var(--card-bg);
                border: 2px solid var(--border-color);
                border-radius: 8px;
                padding: 1rem 1.5rem;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                z-index: 3000;
                transform: translateX(400px);
                transition: transform 0.3s ease;
                max-width: 400px;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification.success {
                border-color: var(--success-color);
                background: rgba(16, 185, 129, 0.1);
            }
            
            .notification.error {
                border-color: var(--danger-color);
                background: rgba(239, 68, 68, 0.1);
            }
            
            .notification.warning {
                border-color: var(--warning-color);
                background: rgba(245, 158, 11, 0.1);
            }
            
            .notification-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                cursor: pointer;
                padding: 0.25rem;
                margin-left: auto;
            }
            
            .notification-close:hover {
                color: var(--text-primary);
            }
            
            .shake {
                animation: shake 0.5s;
            }
            
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
                20%, 40%, 60%, 80% { transform: translateX(5px); }
            }
            
            .bounce {
                animation: bounce 0.5s;
            }
            
            @keyframes bounce {
                0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                40% { transform: translateY(-10px); }
                60% { transform: translateY(-5px); }
            }
            
            .no-animations * {
                animation: none !important;
                transition: none !important;
            }
            
            .loading-screen {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: var(--dark-bg);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 4000;
                transition: opacity 0.5s ease;
            }
            
            .loading-screen.hidden {
                opacity: 0;
                pointer-events: none;
            }
            
            .loader {
                width: 50px;
                height: 50px;
                border: 3px solid var(--border-color);
                border-top: 3px solid var(--primary-color);
                border-radius: 50%;
                animation: spin 1s linear infinite;
            }
            
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }

    shakeElement(element) {
        element.classList.add('shake');
        setTimeout(() => {
            element.classList.remove('shake');
        }, 500);
    }

    bounceElement(element) {
        element.classList.add('bounce');
        setTimeout(() => {
            element.classList.remove('bounce');
        }, 500);
    }

    // ========================================
    // UTILITY FUNCTIONS
    // ========================================

    showLoadingScreen() {
        const loadingScreen = document.createElement('div');
        loadingScreen.className = 'loading-screen';
        loadingScreen.id = 'loading-screen';
        loadingScreen.innerHTML = `
            <div class="loader"></div>
        `;
        
        document.body.appendChild(loadingScreen);
        
        // Hide after a short delay
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 1000);
    }

    handleResize() {
        // Handle responsive layout changes
        if (window.innerWidth < 768) {
            document.body.classList.add('mobile');
        } else {
            document.body.classList.remove('mobile');
        }
    }

    handleVisibilityChange() {
        if (document.hidden) {
            // Page is hidden - pause timers
            console.log('Page hidden - pausing activities');
        } else {
            // Page is visible - resume timers
            console.log('Page visible - resuming activities');
        }
    }

    // ========================================
    // HELP AND INFO
    // ========================================

    showHelp() {
        const helpContent = `
            <div class="help-content">
                <h3>Keyboard Shortcuts</h3>
                <div class="shortcuts-grid">
                    <div class="shortcut">
                        <kbd>1</kbd>
                        <span>Dashboard</span>
                    </div>
                    <div class="shortcut">
                        <kbd>2</kbd>
                        <span>Learning Map</span>
                    </div>
                    <div class="shortcut">
                        <kbd>3</kbd>
                        <span>Profile</span>
                    </div>
                    <div class="shortcut">
                        <kbd>Esc</kbd>
                        <span>Close Modal</span>
                    </div>
                    <div class="shortcut">
                        <kbd>H</kbd>
                        <span>Show Help</span>
                    </div>
                    <div class="shortcut">
                        <kbd>S</kbd>
                        <span>Toggle Sound</span>
                    </div>
                    <div class="shortcut">
                        <kbd>T</kbd>
                        <span>Toggle Theme</span>
                    </div>
                    <div class="shortcut">
                        <kbd>Ctrl+S</kbd>
                        <span>Save Game</span>
                    </div>
                </div>
                
                <h3>How to Play</h3>
                <ul>
                    <li>Complete lessons to earn XP and points</li>
                    <li>Unlock new lessons by completing previous ones</li>
                    <li>Earn achievements for special accomplishments</li>
                    <li>Complete daily challenges for bonus rewards</li>
                    <li>Level up to unlock new features</li>
                </ul>
                
                <h3>Tips</h3>
                <ul>
                    <li>Practice regularly to maintain your streak</li>
                    <li>Try to get perfect scores on quizzes</li>
                    <li>Experiment with the code examples</li>
                    <li>Complete daily challenges for extra XP</li>
                </ul>
            </div>
            
            <style>
                .help-content h3 {
                    color: var(--primary-color);
                    margin-top: 1.5rem;
                    margin-bottom: 1rem;
                }
                
                .shortcuts-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 0.75rem;
                    margin-bottom: 1.5rem;
                }
                
                .shortcut {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }
                
                kbd {
                    background: var(--border-color);
                    padding: 0.25rem 0.5rem;
                    border-radius: 4px;
                    font-family: monospace;
                    font-weight: bold;
                }
                
                .help-content ul {
                    margin-left: 1.5rem;
                    margin-bottom: 1rem;
                }
                
                .help-content li {
                    margin-bottom: 0.5rem;
                }
            </style>
        `;
        
        this.showModal(helpContent, 'Help & Shortcuts');
    }

    // ========================================
    // GAME MANAGEMENT
    // ========================================

    saveGame() {
        if (window.gameEngine) {
            GameUtils.saveGameState();
            this.showNotification('Game saved!', 'success');
        }
    }

    loadGame() {
        GameUtils.loadGameState();
        if (window.gameEngine) {
            window.gameEngine.updatePlayerStats();
            window.gameEngine.updateDashboard();
            window.gameEngine.updateLearningMap();
            window.gameEngine.updateProfile();
        }
        this.showNotification('Game loaded!', 'success');
    }

    resetProgress() {
        if (confirm('Are you sure you want to reset all progress? This cannot be undone!')) {
            localStorage.removeItem('javascriptQuestGameState');
            localStorage.removeItem('javascriptQuestSettings');
            location.reload();
        }
    }

    // ========================================
    // ANALYTICS
    // ========================================

    trackEvent(event, data = {}) {
        // In a real application, this would send to analytics service
        console.log('📊 Event tracked:', event, data);
        
        // Store events locally for demo purposes
        const events = JSON.parse(localStorage.getItem('javascriptQuestEvents') || '[]');
        events.push({
            event,
            data,
            timestamp: new Date().toISOString()
        });
        
        // Keep only last 100 events
        if (events.length > 100) {
            events.splice(0, events.length - 100);
        }
        
        localStorage.setItem('javascriptQuestEvents', JSON.stringify(events));
    }
}

// Initialize the application
const app = new JavaScriptQuestApp();

// Make app available globally
window.JavaScriptQuestApp = app;
window.app = app;

// Add some additional CSS for better mobile experience
const mobileStyles = document.createElement('style');
mobileStyles.textContent = `
    @media (max-width: 768px) {
        .header-content {
            flex-direction: column;
            gap: 1rem;
            padding: 1rem;
        }
        
        .nav {
            flex-wrap: wrap;
            justify-content: center;
        }
        
        .nav-btn {
            font-size: 0.9rem;
            padding: 0.5rem 1rem;
        }
        
        .player-stats {
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;
        }
        
        .main-content {
            padding: 1rem;
        }
        
        .dashboard-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
        }
        
        .current-quest {
            grid-column: span 1;
        }
        
        .learning-map-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
        }
        
        .lesson-content {
            grid-template-columns: 1fr;
        }
        
        .lesson-sidebar {
            position: static;
            margin-bottom: 1rem;
        }
        
        .modal-content {
            margin: 1rem;
            max-width: calc(100% - 2rem);
        }
        
        .notification {
            right: 10px;
            left: 10px;
            max-width: none;
        }
    }
    
    @media (max-width: 480px) {
        .logo {
            font-size: 1.2rem;
        }
        
        .logo i {
            font-size: 1.5rem;
        }
        
        .nav-btn {
            font-size: 0.8rem;
            padding: 0.4rem 0.8rem;
        }
        
        .stat {
            font-size: 0.9rem;
        }
    }
    
    /* High contrast mode support */
    @media (prefers-contrast: high) {
        :root {
            --border-color: #ffffff;
            --text-secondary: #ffffff;
        }
    }
    
    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    }
`;
document.head.appendChild(mobileStyles);

console.log('🎮 JavaScript Quest Main Application Loaded!');
