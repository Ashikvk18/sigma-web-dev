// ========================================
// JAVASCRIPT QUEST - GAME ENGINE
// ========================================

class GameEngine {
    constructor() {
        this.currentView = 'dashboard';
        this.currentLesson = null;
        this.startTime = Date.now();
        this.sessionTime = 0;
        this.dailyChallengeCompleted = false;
        
        this.init();
    }

    init() {
        // Load saved game state
        GameUtils.loadGameState();
        
        // Update UI with player data
        this.updatePlayerStats();
        this.updateDashboard();
        this.updateLearningMap();
        this.updateProfile();
        
        // Start session timer
        this.startSessionTimer();
        
        // Check for achievements
        GameUtils.checkAchievements();
        
        // Show welcome back message
        this.showWelcomeMessage();
        
        console.log('🎮 JavaScript Quest Game Engine initialized!');
    }

    // ========================================
    // VIEW MANAGEMENT
    // ========================================

    showView(viewId) {
        // Hide all views
        document.querySelectorAll('.view').forEach(view => {
            view.classList.remove('active');
        });
        
        // Show requested view
        const targetView = document.getElementById(viewId);
        if (targetView) {
            targetView.classList.add('active');
            this.currentView = viewId;
            
            // Update nav active state
            document.querySelectorAll('.nav-btn[data-view]').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.view === viewId);
            });
            
            // Update view-specific content
            switch (viewId) {
                case 'dashboard':
                    this.updateDashboard();
                    break;
                case 'learning-map':
                    this.updateLearningMap();
                    break;
                case 'profile':
                    this.updateProfile();
                    break;
                case 'lesson':
                    this.updateLessonView();
                    break;
            }
        }
    }

    // ========================================
    // PLAYER STATS MANAGEMENT
    // ========================================

    updatePlayerStats() {
        const player = GameData.player;
        const level = GameUtils.calculateLevel(player.xp);
        
        document.getElementById('player-level').textContent = `Level ${level.level}`;
        document.getElementById('player-xp').textContent = `${player.xp} XP`;
        document.getElementById('player-points').textContent = `${player.points} Points`;
        
        // Update coins & gems
        const coinsEl = document.getElementById('player-coins');
        if (coinsEl) coinsEl.textContent = player.coins;
        const gemsEl = document.getElementById('player-gems');
        if (gemsEl) gemsEl.textContent = player.gems;
        
        // Update streak
        const streakEl = document.getElementById('player-streak');
        if (streakEl) streakEl.textContent = player.streak;
        const streakStat = document.getElementById('streak-stat');
        if (streakStat) streakStat.classList.toggle('active-streak', player.streak > 0);
        
        // Update XP bar
        this.updateXPBar();
    }

    updateXPBar() {
        const player = GameData.player;
        const currentLevel = GameUtils.calculateLevel(player.xp);
        const nextLevel = GameData.levels.find(l => l.level === currentLevel.level + 1);
        
        const fill = document.getElementById('xp-bar-fill');
        const text = document.getElementById('xp-bar-text');
        if (!fill || !text) return;
        
        if (nextLevel) {
            const xpIntoLevel = player.xp - currentLevel.xpRequired;
            const xpNeeded = nextLevel.xpRequired - currentLevel.xpRequired;
            const pct = Math.min((xpIntoLevel / xpNeeded) * 100, 100);
            fill.style.width = `${pct}%`;
            text.textContent = `${xpIntoLevel} / ${xpNeeded} XP to Level ${nextLevel.level}`;
        } else {
            fill.style.width = '100%';
            text.textContent = 'MAX LEVEL';
        }
    }

    addXP(amount) {
        const oldLevel = GameUtils.calculateLevel(GameData.player.xp);
        GameData.player.xp += amount;
        GameData.player.totalXp += amount;
        
        const newLevel = GameUtils.calculateLevel(GameData.player.xp);
        
        // Check for level up
        if (newLevel.level > oldLevel.level) {
            this.showLevelUp(newLevel);
        }
        
        // Show XP popup
        if (window.app && amount > 0) {
            window.app.showXPPopup(amount);
        }
        
        this.updatePlayerStats();
        GameUtils.saveGameState();
    }

    addPoints(amount) {
        GameData.player.points += amount;
        this.updatePlayerStats();
        GameUtils.saveGameState();
    }

    // ========================================
    // DASHBOARD UPDATES
    // ========================================

    updateDashboard() {
        this.updateCurrentQuest();
        this.updateDailyChallenge();
        this.updateRecentAchievements();
        this.updateLeaderboard();
        this.updateStatsRibbon();
        this.updateWelcomeMessage();
    }

    updateStatsRibbon() {
        const player = GameData.player;
        const el = (id, val) => { const e = document.getElementById(id); if (e) e.textContent = val; };
        el('ribbon-streak', player.streak);
        el('ribbon-lessons', player.lessonsCompleted);
        el('ribbon-time', GameUtils.formatTime(Math.floor(player.timeSpent)));
        el('ribbon-progress', GameUtils.getOverallProgress() + '%');
    }

    updateWelcomeMessage() {
        const hours = new Date().getHours();
        let greeting = hours < 12 ? 'Good morning' : hours < 18 ? 'Good afternoon' : 'Good evening';
        const titleEl = document.getElementById('welcome-title');
        const subEl = document.getElementById('welcome-subtitle');
        if (titleEl) titleEl.textContent = `${greeting}, ${GameData.player.name}! 🚀`;
        if (subEl) {
            const progress = GameUtils.getOverallProgress();
            subEl.textContent = progress > 0 
                ? `You're ${progress}% through your JavaScript journey` 
                : 'Start your JavaScript adventure today';
        }
    }

    updateCurrentQuest() {
        const player = GameData.player;
        let currentQuest = null;
        
        // Find the first unlocked but not completed lesson
        for (const lessonId of player.unlockedLessons) {
            if (!player.completedLessons.includes(lessonId)) {
                currentQuest = GameUtils.getLesson(lessonId);
                break;
            }
        }
        
        if (currentQuest) {
            document.getElementById('current-quest-title').textContent = currentQuest.title;
            document.getElementById('current-quest-desc').textContent = currentQuest.description;
            
            const progress = GameUtils.getLessonProgress(currentQuest.id);
            document.getElementById('quest-progress').style.width = `${progress}%`;
            document.getElementById('quest-progress-text').textContent = `${progress}% Complete`;
        }
    }

    updateDailyChallenge() {
        const challenge = GameUtils.getDailyChallenge();
        // Update daily challenge display
        const challengeInfo = document.querySelector('.challenge-info h4');
        const challengeDesc = document.querySelector('.challenge-info p');
        
        if (challengeInfo) challengeInfo.textContent = challenge.title;
        if (challengeDesc) challengeDesc.textContent = challenge.description;
    }

    updateRecentAchievements() {
        const recentAchievements = document.getElementById('recent-achievements');
        if (!recentAchievements) return;
        
        const playerAchievements = GameData.player.achievements.slice(-3).reverse();
        
        let html = '';
        playerAchievements.forEach(achievementId => {
            const achievement = GameUtils.getAchievement(achievementId);
            if (achievement) {
                html += `
                    <div class="achievement">
                        <i class="${achievement.icon} achievement-icon"></i>
                        <div class="achievement-info">
                            <span class="achievement-title">${achievement.title}</span>
                            <span class="achievement-desc">${achievement.description}</span>
                        </div>
                    </div>
                `;
            }
        });
        
        recentAchievements.innerHTML = html || '<p>No achievements yet. Keep learning!</p>';
    }

    updateLeaderboard() {
        const player = GameData.player;
        
        // Add player to leaderboard
        const playerEntry = {
            rank: 15, // This would be calculated based on actual XP
            name: 'You',
            xp: player.xp,
            isPlayer: true
        };
        
        // Update leaderboard display
        const leaderboardItems = document.querySelectorAll('.leaderboard-item');
        const playerRankItem = document.querySelector('.player-rank');
        
        if (playerRankItem) {
            playerRankItem.querySelector('.score').textContent = `${player.xp} XP`;
        }
    }

    // ========================================
    // LEARNING MAP UPDATES
    // ========================================

    updateLearningMap() {
        // Find all .world elements and update their lessons
        const worldElements = document.querySelectorAll('.world');
        const worldNames = ['basics', 'intermediate', 'advanced', 'master'];
        
        worldElements.forEach((worldElement, index) => {
            if (index >= worldNames.length) return;
            const world = worldNames[index];
            const lessons = GameUtils.getWorldLessons(world);
            const lessonsContainer = worldElement.querySelector('.lessons');
            
            if (lessonsContainer) {
                let html = '';
                lessons.forEach(lesson => {
                    const isCompleted = GameUtils.isLessonCompleted(lesson.id);
                    const isUnlocked = GameUtils.isLessonUnlocked(lesson.id);
                    const isCurrent = GameData.player.currentLesson === lesson.id;
                    
                    let statusClass = '';
                    let icon = '';
                    
                    if (isCompleted) {
                        statusClass = 'completed';
                        icon = 'fas fa-check-circle';
                    } else if (isCurrent) {
                        statusClass = 'current';
                        icon = 'fas fa-play-circle';
                    } else if (isUnlocked) {
                        statusClass = '';
                        icon = 'fas fa-circle';
                    } else {
                        statusClass = 'locked';
                        icon = 'fas fa-lock';
                    }
                    
                    const legendaryClass = lesson.legendary ? 'legendary' : '';
                    
                    html += `
                        <div class="lesson ${statusClass} ${legendaryClass}" onclick="startLesson('${lesson.id}')">
                            <i class="${icon}"></i>
                            <span>${lesson.title}</span>
                        </div>
                    `;
                });
                
                lessonsContainer.innerHTML = html;
            }
        });
    }

    // ========================================
    // PROFILE UPDATES
    // ========================================

    updateProfile() {
        const player = GameData.player;
        const level = GameUtils.calculateLevel(player.xp);
        
        // Update player info
        const playerInfo = document.querySelector('.player-info');
        if (playerInfo) {
            playerInfo.querySelector('h2').textContent = player.name;
            playerInfo.querySelector('p').textContent = `Level ${level.level} • ${player.xp} XP • ${player.points} Points`;
        }
        
        // Update badges
        const levelBadge = document.getElementById('level-badge');
        if (levelBadge) levelBadge.innerHTML = `<i class="fas fa-star"></i> ${level.title}`;
        const streakBadge = document.getElementById('streak-badge');
        if (streakBadge) streakBadge.innerHTML = `<i class="fas fa-fire"></i> ${player.streak} Day Streak`;
        
        // Update progress ring
        this.updateProfileRing();
        
        // Update stats
        this.updateProfileStats();
        
        // Update achievements
        this.updateProfileAchievements();
        
        // Update progress chart
        this.updateProgressChart();
    }

    updateProfileRing() {
        const ring = document.getElementById('profile-ring');
        if (!ring) return;
        const progress = GameUtils.getOverallProgress();
        const circumference = 2 * Math.PI * 52; // r=52
        const offset = circumference - (progress / 100) * circumference;
        ring.style.strokeDasharray = circumference;
        ring.style.strokeDashoffset = offset;
    }

    updateProfileStats() {
        const player = GameData.player;
        
        const statValues = document.querySelectorAll('.stat-value');
        if (statValues.length >= 4) {
            statValues[0].textContent = player.streak;
            statValues[1].textContent = GameUtils.formatTime(Math.floor(player.timeSpent));
            statValues[2].textContent = player.lessonsCompleted;
            statValues[3].textContent = player.problemsSolved;
        }
    }

    updateProfileAchievements() {
        const achievementsGrid = document.querySelector('.achievements-grid');
        if (!achievementsGrid) return;
        
        let html = '';
        GameData.achievements.forEach(achievement => {
            const isEarned = GameData.player.achievements.includes(achievement.id);
            html += `
                <div class="achievement ${isEarned ? 'earned' : ''}">
                    <i class="${isEarned ? achievement.icon : 'fas fa-lock'}"></i>
                    <span>${achievement.title}</span>
                </div>
            `;
        });
        
        achievementsGrid.innerHTML = html;
    }

    updateProgressChart() {
        const canvas = document.getElementById('progressChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const dpr = window.devicePixelRatio || 1;
        canvas.width = canvas.offsetWidth * dpr;
        canvas.height = 200 * dpr;
        ctx.scale(dpr, dpr);
        const W = canvas.offsetWidth;
        const H = 200;
        
        ctx.clearRect(0, 0, W, H);
        
        // Per-world progress bars
        const worlds = ['basics', 'intermediate', 'advanced', 'master'];
        const labels = ['Basics', 'Intermediate', 'Advanced', 'Master'];
        const colors = ['#667eea', '#10b981', '#f59e0b', '#ef4444'];
        const barH = 24;
        const gap = 16;
        const startY = 20;
        const labelW = 100;
        const barMaxW = W - labelW - 30;
        
        worlds.forEach((world, i) => {
            const lessons = GameUtils.getWorldLessons(world);
            const completed = lessons.filter(l => GameUtils.isLessonCompleted(l.id)).length;
            const pct = lessons.length > 0 ? completed / lessons.length : 0;
            const y = startY + i * (barH + gap);
            
            // Label
            ctx.fillStyle = '#94a1b2';
            ctx.font = '13px Inter, sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText(labels[i], labelW - 10, y + barH / 2 + 4);
            
            // Background bar
            ctx.fillStyle = 'rgba(102, 126, 234, 0.1)';
            ctx.beginPath();
            ctx.roundRect(labelW, y, barMaxW, barH, 6);
            ctx.fill();
            
            // Progress fill
            if (pct > 0) {
                const grad = ctx.createLinearGradient(labelW, 0, labelW + barMaxW, 0);
                grad.addColorStop(0, colors[i]);
                grad.addColorStop(1, colors[i] + '88');
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.roundRect(labelW, y, barMaxW * pct, barH, 6);
                ctx.fill();
            }
            
            // Percentage text
            ctx.fillStyle = '#fffffe';
            ctx.font = 'bold 12px Inter, sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(`${Math.round(pct * 100)}%  (${completed}/${lessons.length})`, labelW + 8, y + barH / 2 + 4);
        });
    }

    // ========================================
    // LESSON MANAGEMENT
    // ========================================

    startLesson(lessonId) {
        const lesson = GameUtils.getLesson(lessonId);
        if (!lesson) return;
        
        // Check if lesson is unlocked
        if (!GameUtils.isLessonUnlocked(lessonId)) {
            this.showNotification('This lesson is locked! Complete previous lessons first.', 'warning');
            return;
        }
        
        this.currentLesson = lesson;
        GameData.player.currentLesson = lessonId;
        
        // Show lesson view
        this.showView('lesson');
        this.updateLessonView();
        
        console.log(`📚 Starting lesson: ${lesson.title}`);
    }

    updateLessonView() {
        if (!this.currentLesson) return;
        
        // Update lesson header
        document.getElementById('lesson-title').textContent = this.currentLesson.title;
        
        // Update lesson navigation
        this.updateLessonNavigation();
        
        // Load first topic
        this.loadTopicById(this.currentLesson.topics[0].id);
    }

    updateLessonNavigation() {
        const topicsList = document.getElementById('lesson-topics');
        if (!topicsList || !this.currentLesson) return;
        
        let html = '';
        this.currentLesson.topics.forEach((topic, index) => {
            const isActive = index === 0;
            const isCompleted = topic.completed;
            
            html += `
                <li class="${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}" 
                    data-topic-id="${topic.id}"
                    onclick="gameEngine.loadTopicById('${topic.id}')">
                    <i class="fas ${isCompleted ? 'fa-check-circle' : 'fa-circle'}"></i>
                    ${topic.title}
                </li>
            `;
        });
        
        topicsList.innerHTML = html;
        
        // Update progress text
        const completedCount = this.currentLesson.topics.filter(t => t.completed).length;
        document.getElementById('lesson-progress-text').textContent = 
            `${completedCount}/${this.currentLesson.topics.length} Complete`;
    }

    loadTopicById(topicId) {
        if (!this.currentLesson) return;
        
        const topic = this.currentLesson.topics.find(t => t.id === topicId);
        if (!topic) return;
        
        this.currentTopicId = topicId;
        
        // Update navigation
        document.querySelectorAll('#lesson-topics li').forEach(li => {
            li.classList.remove('active');
            if (li.dataset.topicId === topicId) {
                li.classList.add('active');
            }
        });
        
        // Load topic content
        this.loadTopicContent(topic);
        
        console.log(`📖 Loading topic: ${topic.title}`);
    }

    loadTopicContent(topic) {
        const lessonArea = document.getElementById('lesson-area');
        if (!lessonArea) return;
        
        const lessonId = this.currentLesson.id;
        
        // Try to load real content from LessonsContent
        let realContent = '';
        if (typeof LessonsContent !== 'undefined' && 
            LessonsContent[lessonId] && 
            LessonsContent[lessonId][topic.id]) {
            realContent = LessonsContent[lessonId][topic.id].content;
        }
        
        // Build quiz HTML if available
        let quizHtml = '';
        if (typeof LessonsContent !== 'undefined' && 
            LessonsContent[lessonId] && 
            LessonsContent[lessonId][topic.id] && 
            LessonsContent[lessonId][topic.id].quiz) {
            const questions = LessonsContent[lessonId][topic.id].quiz;
            quizHtml = this.buildQuizHTML(questions);
        }
        
        const content = `
            <div class="topic-content">
                ${realContent || `
                    <h3>${topic.title}</h3>
                    <div class="content-area">
                        <p>Welcome to <strong>${topic.title}</strong>!</p>
                        <div class="interactive-example">
                            <h4>Interactive Code Editor</h4>
                            <div class="code-editor">
                                <textarea id="code-editor-area" placeholder="// Write your JavaScript code here\nconsole.log('Hello World!');">// Write your JavaScript code here\nconsole.log('Hello World!');</textarea>
                                <button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button>
                            </div>
                            <div class="output-area">
                                <h5>Output:</h5>
                                <pre id="code-output">Click "Run Code" to see results...</pre>
                            </div>
                        </div>
                    </div>
                `}
                ${quizHtml}
                <div class="topic-navigation">
                    <button class="btn-secondary" onclick="gameEngine.previousTopic()">
                        <i class="fas fa-arrow-left"></i> Previous
                    </button>
                    <button class="btn-primary" onclick="gameEngine.completeTopic()">
                        Complete Topic <i class="fas fa-check"></i>
                    </button>
                    <button class="btn-secondary" onclick="gameEngine.nextTopic()">
                        Next <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
            </div>
        `;
        
        lessonArea.innerHTML = content;
    }

    buildQuizHTML(questions) {
        let html = '<div class="quiz-section"><h4>Quick Quiz</h4>';
        questions.forEach((q, qi) => {
            html += `<div class="quiz-question" data-correct="${q.correct}" id="quiz-${qi}">`;
            html += `<p><strong>Q${qi+1}:</strong> ${q.question}</p>`;
            html += '<div class="quiz-options">';
            q.options.forEach((opt, oi) => {
                html += `<button class="quiz-option" onclick="gameEngine.checkAnswer(${qi}, ${oi})">${opt}</button>`;
            });
            html += '</div>';
            html += `<p class="quiz-explanation" style="display:none;">${q.explanation}</p>`;
            html += '</div>';
        });
        html += '</div>';
        return html;
    }

    checkAnswer(questionIndex, selectedOption) {
        const quizEl = document.getElementById(`quiz-${questionIndex}`);
        if (!quizEl) return;
        
        const correct = parseInt(quizEl.dataset.correct);
        const buttons = quizEl.querySelectorAll('.quiz-option');
        const explanation = quizEl.querySelector('.quiz-explanation');
        
        buttons.forEach((btn, i) => {
            btn.disabled = true;
            if (i === correct) {
                btn.style.background = '#10b981';
                btn.style.color = 'white';
            } else if (i === selectedOption && i !== correct) {
                btn.style.background = '#ef4444';
                btn.style.color = 'white';
            }
        });
        
        explanation.style.display = 'block';
        
        if (selectedOption === correct) {
            this.addXP(10);
            this.showNotification('Correct! +10 XP', 'success');
        } else {
            this.showNotification('Not quite. Check the explanation!', 'warning');
        }
    }

    completeTopic() {
        if (!this.currentLesson || !this.currentTopicId) return;
        
        // Mark current topic as completed
        const topic = this.currentLesson.topics.find(t => t.id === this.currentTopicId);
        if (topic) {
            topic.completed = true;
        }
        
        // Update sidebar navigation
        this.updateLessonNavigation();
        
        // Re-highlight current topic
        document.querySelectorAll('#lesson-topics li').forEach(li => {
            li.classList.remove('active');
            if (li.dataset.topicId === this.currentTopicId) {
                li.classList.add('active');
            }
        });
        
        // Check if lesson is complete
        const allTopicsCompleted = this.currentLesson.topics.every(t => t.completed);
        
        if (allTopicsCompleted) {
            this.completeLesson();
        } else {
            this.showNotification('Topic completed! +5 XP +5 Coins 🪙', 'success');
            this.addXP(5);
            GameData.player.coins += 5;
            this.updatePlayerStats();
            this.nextTopic();
        }
        
        GameUtils.saveGameState();
    }

    completeLesson() {
        if (!this.currentLesson) return;
        
        const lesson = this.currentLesson;
        
        // Add to completed lessons
        if (!GameData.player.completedLessons.includes(lesson.id)) {
            GameData.player.completedLessons.push(lesson.id);
            GameData.player.lessonsCompleted++;
        }
        
        // Award rewards
        this.addXP(lesson.xpReward);
        this.addPoints(lesson.pointsReward);
        GameData.player.coins += 25;
        GameData.player.gems += 1;
        
        // Unlock next lesson
        const nextLesson = GameUtils.getNextLesson(lesson.id);
        if (nextLesson && !GameUtils.isLessonUnlocked(nextLesson.id)) {
            GameData.player.unlockedLessons.push(nextLesson.id);
        }
        
        // Show completion message
        this.showLessonComplete(lesson);
        
        // Check achievements
        GameUtils.checkAchievements();
        
        // Update UI
        this.updateDashboard();
        this.updateLearningMap();
        this.updateProfile();
        
        console.log(`🎉 Lesson completed: ${lesson.title}`);
    }

    nextTopic() {
        if (!this.currentLesson || !this.currentTopicId) return;
        const topics = this.currentLesson.topics;
        const currentIndex = topics.findIndex(t => t.id === this.currentTopicId);
        if (currentIndex < topics.length - 1) {
            this.loadTopicById(topics[currentIndex + 1].id);
        }
    }

    previousTopic() {
        if (!this.currentLesson || !this.currentTopicId) return;
        const topics = this.currentLesson.topics;
        const currentIndex = topics.findIndex(t => t.id === this.currentTopicId);
        if (currentIndex > 0) {
            this.loadTopicById(topics[currentIndex - 1].id);
        }
    }

    // ========================================
    // CODING CHALLENGES
    // ========================================

    runCode() {
        const codeEditor = document.getElementById('code-editor-area') || document.querySelector('.code-editor textarea');
        const output = document.getElementById('code-output');
        
        if (!codeEditor || !output) return;
        
        try {
            // Create safe execution environment
            const result = this.executeCode(codeEditor.value);
            output.textContent = result;
            output.style.color = '#10b981';
            
            // Add to problems solved
            GameData.player.problemsSolved++;
            this.addXP(5);
            
        } catch (error) {
            output.textContent = `Error: ${error.message}`;
            output.style.color = '#ef4444';
        }
    }

    executeCode(code) {
        // Simple code execution (in production, this would be more sophisticated)
        const logs = [];
        const customConsole = {
            log: (...args) => logs.push(args.join(' '))
        };
        
        // Execute code in safe context
        const func = new Function('console', code);
        func(customConsole);
        
        return logs.length > 0 ? logs.join('\n') : 'Code executed successfully!';
    }

    // ========================================
    // DAILY CHALLENGES
    // ========================================

    startDailyChallenge() {
        const challenge = GameUtils.getDailyChallenge();
        
        if (this.dailyChallengeCompleted) {
            this.showNotification('Daily challenge already completed!', 'warning');
            return;
        }
        
        // Show challenge interface
        this.showDailyChallengeInterface(challenge);
    }

    showDailyChallengeInterface(challenge) {
        const modal = document.createElement('div');
        modal.className = 'modal active';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h2><i class="fas fa-calendar-day"></i> Daily Challenge</h2>
                    <button class="close-btn" onclick="this.closest('.modal').remove()">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <h3>${challenge.title}</h3>
                    <p>${challenge.description}</p>
                    <div class="challenge-tasks">
                        <!-- Challenge tasks would be loaded here -->
                        <div class="task-item">
                            <span>Task 1: Sample task</span>
                            <button class="btn-primary" onclick="gameEngine.completeChallengeTask(this)">Complete</button>
                        </div>
                        <div class="task-item">
                            <span>Task 2: Sample task</span>
                            <button class="btn-primary" onclick="gameEngine.completeChallengeTask(this)">Complete</button>
                        </div>
                    </div>
                    <div class="challenge-progress">
                        <div class="progress-bar">
                            <div class="progress-fill" id="challenge-progress" style="width: 0%"></div>
                        </div>
                        <span id="challenge-progress-text">0/5 Complete</span>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
    }

    completeChallengeTask(button) {
        button.disabled = true;
        button.textContent = 'Completed!';
        button.classList.add('btn-success');
        
        // Update progress
        const completed = document.querySelectorAll('.challenge-tasks button:disabled').length;
        const total = document.querySelectorAll('.challenge-tasks button').length;
        const progress = (completed / total) * 100;
        
        document.getElementById('challenge-progress').style.width = `${progress}%`;
        document.getElementById('challenge-progress-text').textContent = `${completed}/${total} Complete`;
        
        if (completed === total) {
            this.completeDailyChallenge();
        }
    }

    completeDailyChallenge() {
        const challenge = GameUtils.getDailyChallenge();
        
        this.dailyChallengeCompleted = true;
        this.addXP(challenge.xpReward);
        this.addPoints(challenge.pointsReward);
        
        this.showNotification('Daily challenge completed! 🎉', 'success');
        
        // Close modal
        document.querySelector('.modal').remove();
        
        // Update dashboard
        this.updateDashboard();
        
        GameUtils.saveGameState();
    }

    // ========================================
    // NOTIFICATIONS AND MODALS
    // ========================================

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas ${this.getNotificationIcon(type)}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            warning: 'fa-exclamation-triangle',
            info: 'fa-info-circle'
        };
        return icons[type] || icons.info;
    }

    showAchievementUnlocked(achievement) {
        // Use new achievement toast if available
        if (typeof showAchievementToast === 'function') {
            showAchievementToast(achievement);
        } else {
            const modal = document.getElementById('achievement-modal');
            if (!modal) return;
            document.getElementById('achievement-title').textContent = achievement.title;
            document.getElementById('achievement-desc').textContent = achievement.description;
            modal.classList.add('active');
            setTimeout(() => modal.classList.remove('active'), 3000);
        }
        console.log(`🏆 Achievement unlocked: ${achievement.title}`);
    }

    showLevelUp(newLevel) {
        const modal = document.getElementById('level-up-modal');
        if (!modal) return;
        
        document.getElementById('new-level').textContent = newLevel.level;
        
        modal.classList.add('active');
        
        // Launch confetti!
        if (window.app) window.app.launchConfetti();
        
        // Auto-close after 3 seconds
        setTimeout(() => {
            modal.classList.remove('active');
        }, 3000);
        
        this.showNotification(`Level up! You're now level ${newLevel.level}! 🎉`, 'success');
        console.log(`⬆️ Level up! New level: ${newLevel.level}`);
    }

    showLessonComplete(lesson) {
        this.showNotification(`🎉 Lesson completed: ${lesson.title}! +${lesson.xpReward} XP`, 'success');
        // Launch confetti on lesson complete!
        if (window.app) window.app.launchConfetti();
    }

    showWelcomeMessage() {
        const hours = new Date().getHours();
        let greeting = 'Good evening';
        
        if (hours < 12) greeting = 'Good morning';
        else if (hours < 18) greeting = 'Good afternoon';
        
        this.showNotification(`${greeting}! Ready to continue your JavaScript journey? 🚀`, 'info');
    }

    // ========================================
    // SESSION MANAGEMENT
    // ========================================

    startSessionTimer() {
        setInterval(() => {
            this.sessionTime++;
            GameData.player.timeSpent = Math.floor(GameData.player.timeSpent) + (1/3600); // Convert to hours
            
            // Save every minute
            if (this.sessionTime % 60 === 0) {
                GameUtils.saveGameState();
            }
        }, 1000);
    }

    // ========================================
    // UTILITY FUNCTIONS
    // ========================================

    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.classList.remove('active');
        }
    }

    continueQuest() {
        if (GameData.player.currentLesson) {
            this.startLesson(GameData.player.currentLesson);
        } else {
            // Find first unlocked lesson
            const firstUnlocked = GameData.player.unlockedLessons.find(id => 
                !GameData.player.completedLessons.includes(id)
            );
            
            if (firstUnlocked) {
                this.startLesson(firstUnlocked);
            } else {
                this.showNotification('All available lessons completed! 🎉', 'success');
            }
        }
    }

    showAllAchievements() {
        const grid = document.getElementById('all-achievements-grid');
        if (!grid) return;
        
        let html = '';
        GameData.achievements.forEach(achievement => {
            const isEarned = GameData.player.achievements.includes(achievement.id);
            html += `
                <div class="achievement ${isEarned ? 'earned' : ''}">
                    <i class="${isEarned ? achievement.icon : 'fas fa-lock'}"></i>
                    <span class="achievement-title">${achievement.title}</span>
                    <span class="achievement-desc">${achievement.description}</span>
                    ${isEarned ? `<span class="text-success" style="font-size:0.75rem;">+${achievement.xpReward} XP</span>` : ''}
                </div>
            `;
        });
        
        grid.innerHTML = html;
        document.getElementById('all-achievements-modal').classList.add('active');
    }

    showDashboard() {
        this.showView('dashboard');
    }

    showMap() {
        this.showView('learning-map');
    }

    showProfile() {
        this.showView('profile');
    }
}

// Initialize game engine when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.gameEngine = new GameEngine();
});

// Global functions for button onclick handlers
function showDashboard() {
    window.gameEngine.showDashboard();
}

function showMap() {
    window.gameEngine.showMap();
}

function showProfile() {
    window.gameEngine.showProfile();
}

function continueQuest() {
    window.gameEngine.continueQuest();
}

function startDailyChallenge() {
    window.gameEngine.startDailyChallenge();
}

function showAllAchievements() {
    window.gameEngine.showAllAchievements();
}

function startLesson(lessonId) {
    window.gameEngine.startLesson(lessonId);
}

function closeModal(modalId) {
    window.gameEngine.closeModal(modalId);
}

function runCode() {
    window.gameEngine.runCode();
}

function completeTopic() {
    window.gameEngine.completeTopic();
}

function completeChallengeTask(button) {
    window.gameEngine.completeChallengeTask(button);
}

console.log('🎮 Game Engine loaded!');
