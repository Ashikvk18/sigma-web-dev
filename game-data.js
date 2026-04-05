// ========================================
// JAVASCRIPT QUEST - GAME DATA
// ========================================

// Game configuration and data structures
const GameData = {
    // Player data
    player: {
        name: 'JavaScript Coder',
        level: 1,
        xp: 0,
        points: 0,
        totalXp: 0,
        streak: 0,
        combo: 0,
        maxCombo: 0,
        coins: 50,
        gems: 5,
        weeklyXp: 0,
        weeklyGoal: 200,
        weekStartDate: null,
        timeSpent: 0,
        lessonsCompleted: 0,
        problemsSolved: 0,
        achievements: [],
        currentLesson: null,
        unlockedLessons: ['variables', 'operators', 'functions', 'conditionals', 'loops', 'arrays', 'dom', 'events', 'async', 'error', 'patterns', 'modules', 'apis', 'performance', 'testing', 'frameworks', 'nodejs', 'typescript', 'projects', 'mastery'],
        completedLessons: ['variables', 'operators'],
        loginDays: [],
        lastLoginDate: null,
        typingBestWPM: 0,
        quizHighScores: {},
        ownedCosmetics: ['title-beginner'],
        equippedTitle: 'title-beginner',
        skillPoints: 3,
        unlockedSkills: ['core-1']
    },

    // Level system
    levels: [
        { level: 1, xpRequired: 0, title: 'Beginner Coder' },
        { level: 2, xpRequired: 100, title: 'Novice Developer' },
        { level: 3, xpRequired: 250, title: 'Apprentice Programmer' },
        { level: 4, xpRequired: 500, title: 'Junior Developer' },
        { level: 5, xpRequired: 1000, title: 'JavaScript Developer' },
        { level: 6, xpRequired: 2000, title: 'Senior Developer' },
        { level: 7, xpRequired: 3500, title: 'Expert Programmer' },
        { level: 8, xpRequired: 5000, title: 'JavaScript Master' },
        { level: 9, xpRequired: 7500, title: 'Code Wizard' },
        { level: 10, xpRequired: 10000, title: 'JavaScript Legend' }
    ],

    // Lessons structure
    lessons: {
        // Basics World
        variables: {
            id: 'variables',
            title: 'Variables & Data Types',
            world: 'basics',
            order: 1,
            xpReward: 50,
            pointsReward: 100,
            description: 'Learn about variables, data types, and basic operations',
            topics: [
                { id: 'intro', title: 'Introduction to Variables', completed: false },
                { id: 'datatypes', title: 'Data Types', completed: false },
                { id: 'declaration', title: 'Variable Declaration', completed: false },
                { id: 'practice', title: 'Practice Exercises', completed: false }
            ]
        },
        operators: {
            id: 'operators',
            title: 'Operators & Expressions',
            world: 'basics',
            order: 2,
            xpReward: 50,
            pointsReward: 100,
            description: 'Master arithmetic, comparison, and logical operators',
            topics: [
                { id: 'arithmetic', title: 'Arithmetic Operators', completed: false },
                { id: 'comparison', title: 'Comparison Operators', completed: false },
                { id: 'logical', title: 'Logical Operators', completed: false },
                { id: 'practice', title: 'Practice Problems', completed: false }
            ]
        },
        functions: {
            id: 'functions',
            title: 'Functions',
            world: 'basics',
            order: 3,
            xpReward: 75,
            pointsReward: 150,
            description: 'Learn to create and use functions',
            topics: [
                { id: 'intro', title: 'Introduction to Functions', completed: false },
                { id: 'parameters', title: 'Parameters and Arguments', completed: false },
                { id: 'return', title: 'Return Values', completed: false },
                { id: 'scope', title: 'Function Scope', completed: false },
                { id: 'practice', title: 'Function Exercises', completed: false }
            ]
        },
        conditionals: {
            id: 'conditionals',
            title: 'Conditionals',
            world: 'basics',
            order: 4,
            xpReward: 75,
            pointsReward: 150,
            description: 'Control program flow with conditional statements',
            topics: [
                { id: 'if-else', title: 'If-Else Statements', completed: false },
                { id: 'switch', title: 'Switch Statements', completed: false },
                { id: 'ternary', title: 'Ternary Operator', completed: false },
                { id: 'practice', title: 'Conditional Exercises', completed: false }
            ]
        },
        loops: {
            id: 'loops',
            title: 'Loops',
            world: 'basics',
            order: 5,
            xpReward: 75,
            pointsReward: 150,
            description: 'Repeat code efficiently with loops',
            topics: [
                { id: 'for-loop', title: 'For Loops', completed: false },
                { id: 'while-loop', title: 'While Loops', completed: false },
                { id: 'do-while', title: 'Do-While Loops', completed: false },
                { id: 'practice', title: 'Loop Exercises', completed: false }
            ]
        },

        // Intermediate World
        arrays: {
            id: 'arrays',
            title: 'Arrays & Objects',
            world: 'intermediate',
            order: 6,
            xpReward: 100,
            pointsReward: 200,
            description: 'Work with complex data structures',
            topics: [
                { id: 'arrays-intro', title: 'Introduction to Arrays', completed: false },
                { id: 'array-methods', title: 'Array Methods', completed: false },
                { id: 'objects-intro', title: 'Introduction to Objects', completed: false },
                { id: 'object-methods', title: 'Object Methods', completed: false },
                { id: 'practice', title: 'Data Structure Exercises', completed: false }
            ]
        },
        dom: {
            id: 'dom',
            title: 'DOM Manipulation',
            world: 'intermediate',
            order: 7,
            xpReward: 100,
            pointsReward: 200,
            description: 'Interact with web pages using JavaScript',
            topics: [
                { id: 'dom-intro', title: 'DOM Introduction', completed: false },
                { id: 'selecting-elements', title: 'Selecting Elements', completed: false },
                { id: 'modifying-elements', title: 'Modifying Elements', completed: false },
                { id: 'creating-elements', title: 'Creating Elements', completed: false },
                { id: 'practice', title: 'DOM Exercises', completed: false }
            ]
        },
        events: {
            id: 'events',
            title: 'Event Handling',
            world: 'intermediate',
            order: 8,
            xpReward: 100,
            pointsReward: 200,
            description: 'Respond to user interactions',
            topics: [
                { id: 'events-intro', title: 'Introduction to Events', completed: false },
                { id: 'event-listeners', title: 'Event Listeners', completed: false },
                { id: 'event-types', title: 'Common Event Types', completed: false },
                { id: 'practice', title: 'Event Exercises', completed: false }
            ]
        },
        async: {
            id: 'async',
            title: 'Async JavaScript',
            world: 'intermediate',
            order: 9,
            xpReward: 125,
            pointsReward: 250,
            description: 'Handle asynchronous operations',
            topics: [
                { id: 'callbacks', title: 'Callbacks', completed: false },
                { id: 'promises', title: 'Promises', completed: false },
                { id: 'async-await', title: 'Async/Await', completed: false },
                { id: 'practice', title: 'Async Exercises', completed: false }
            ]
        },
        error: {
            id: 'error',
            title: 'Error Handling',
            world: 'intermediate',
            order: 10,
            xpReward: 125,
            pointsReward: 250,
            description: 'Handle errors gracefully',
            topics: [
                { id: 'error-types', title: 'Error Types', completed: false },
                { id: 'try-catch', title: 'Try-Catch Blocks', completed: false },
                { id: 'throwing-errors', title: 'Throwing Errors', completed: false },
                { id: 'practice', title: 'Error Handling Exercises', completed: false }
            ]
        },

        // Advanced World
        patterns: {
            id: 'patterns',
            title: 'Design Patterns',
            world: 'advanced',
            order: 11,
            xpReward: 150,
            pointsReward: 300,
            description: 'Learn common design patterns',
            topics: [
                { id: 'patterns-intro', title: 'Introduction to Patterns', completed: false },
                { id: 'creational', title: 'Creational Patterns', completed: false },
                { id: 'structural', title: 'Structural Patterns', completed: false },
                { id: 'behavioral', title: 'Behavioral Patterns', completed: false },
                { id: 'practice', title: 'Pattern Exercises', completed: false }
            ]
        },
        modules: {
            id: 'modules',
            title: 'Modules & Imports',
            world: 'advanced',
            order: 12,
            xpReward: 150,
            pointsReward: 300,
            description: 'Organize code with modules',
            topics: [
                { id: 'modules-intro', title: 'Module Introduction', completed: false },
                { id: 'import-export', title: 'Import/Export', completed: false },
                { id: 'commonjs', title: 'CommonJS Modules', completed: false },
                { id: 'practice', title: 'Module Exercises', completed: false }
            ]
        },
        apis: {
            id: 'apis',
            title: 'Browser APIs',
            world: 'advanced',
            order: 13,
            xpReward: 150,
            pointsReward: 300,
            description: 'Use powerful browser APIs',
            topics: [
                { id: 'apis-intro', title: 'API Introduction', completed: false },
                { id: 'fetch', title: 'Fetch API', completed: false },
                { id: 'storage', title: 'Storage APIs', completed: false },
                { id: 'practice', title: 'API Exercises', completed: false }
            ]
        },
        performance: {
            id: 'performance',
            title: 'Performance',
            world: 'advanced',
            order: 14,
            xpReward: 150,
            pointsReward: 300,
            description: 'Optimize JavaScript performance',
            topics: [
                { id: 'performance-intro', title: 'Performance Basics', completed: false },
                { id: 'optimization', title: 'Optimization Techniques', completed: false },
                { id: 'tools', title: 'Performance Tools', completed: false },
                { id: 'practice', title: 'Performance Exercises', completed: false }
            ]
        },
        testing: {
            id: 'testing',
            title: 'Testing',
            world: 'advanced',
            order: 15,
            xpReward: 150,
            pointsReward: 300,
            description: 'Test your JavaScript code',
            topics: [
                { id: 'testing-intro', title: 'Testing Introduction', completed: false },
                { id: 'unit-testing', title: 'Unit Testing', completed: false },
                { id: 'integration-testing', title: 'Integration Testing', completed: false },
                { id: 'practice', title: 'Testing Exercises', completed: false }
            ]
        },

        // Master World
        frameworks: {
            id: 'frameworks',
            title: 'Frameworks',
            world: 'master',
            order: 16,
            xpReward: 200,
            pointsReward: 400,
            description: 'Learn modern JavaScript frameworks',
            topics: [
                { id: 'frameworks-intro', title: 'Framework Introduction', completed: false },
                { id: 'react-basics', title: 'React Basics', completed: false },
                { id: 'vue-basics', title: 'Vue Basics', completed: false },
                { id: 'practice', title: 'Framework Exercises', completed: false }
            ]
        },
        nodejs: {
            id: 'nodejs',
            title: 'Node.js',
            world: 'master',
            order: 17,
            xpReward: 200,
            pointsReward: 400,
            description: 'Server-side JavaScript with Node.js',
            topics: [
                { id: 'nodejs-intro', title: 'Node.js Introduction', completed: false },
                { id: 'npm', title: 'NPM and Packages', completed: false },
                { id: 'express', title: 'Express.js', completed: false },
                { id: 'practice', title: 'Node.js Exercises', completed: false }
            ]
        },
        typescript: {
            id: 'typescript',
            title: 'TypeScript',
            world: 'master',
            order: 18,
            xpReward: 200,
            pointsReward: 400,
            description: 'Add static types to JavaScript',
            topics: [
                { id: 'typescript-intro', title: 'TypeScript Introduction', completed: false },
                { id: 'types', title: 'Basic Types', completed: false },
                { id: 'interfaces', title: 'Interfaces', completed: false },
                { id: 'practice', title: 'TypeScript Exercises', completed: false }
            ]
        },
        projects: {
            id: 'projects',
            title: 'Capstone Projects',
            world: 'master',
            order: 19,
            xpReward: 250,
            pointsReward: 500,
            description: 'Build real-world projects',
            topics: [
                { id: 'project-planning', title: 'Project Planning', completed: false },
                { id: 'project-1', title: 'Todo App', completed: false },
                { id: 'project-2', title: 'Weather App', completed: false },
                { id: 'project-3', title: 'E-commerce Site', completed: false }
            ]
        },
        mastery: {
            id: 'mastery',
            title: 'JavaScript Mastery',
            world: 'master',
            order: 20,
            xpReward: 500,
            pointsReward: 1000,
            description: 'Complete mastery challenge',
            legendary: true,
            topics: [
                { id: 'mastery-challenge', title: 'Final Challenge', completed: false },
                { id: 'code-review', title: 'Code Review', completed: false },
                { id: 'contribution', title: 'Open Source Contribution', completed: false }
            ]
        }
    },

    // Achievements
    achievements: [
        {
            id: 'first-steps',
            title: 'First Steps',
            description: 'Complete your first lesson',
            icon: 'fas fa-star',
            xpReward: 25,
            pointsReward: 50,
            unlocked: false
        },
        {
            id: 'week-warrior',
            title: 'Week Warrior',
            description: 'Maintain a 7-day streak',
            icon: 'fas fa-fire',
            xpReward: 50,
            pointsReward: 100,
            unlocked: false
        },
        {
            id: 'speed-coder',
            title: 'Speed Coder',
            description: 'Complete a lesson in under 10 minutes',
            icon: 'fas fa-bolt',
            xpReward: 30,
            pointsReward: 75,
            unlocked: false
        },
        {
            id: 'perfect-score',
            title: 'Perfect Score',
            description: 'Get 100% on any lesson quiz',
            icon: 'fas fa-trophy',
            xpReward: 40,
            pointsReward: 80,
            unlocked: false
        },
        {
            id: 'explorer',
            title: 'Explorer',
            description: 'Complete all lessons in Basics World',
            icon: 'fas fa-compass',
            xpReward: 100,
            pointsReward: 200,
            unlocked: false
        },
        {
            id: 'intermediate',
            title: 'Intermediate Developer',
            description: 'Complete all lessons in Intermediate World',
            icon: 'fas fa-cogs',
            xpReward: 200,
            pointsReward: 400,
            unlocked: false
        },
        {
            id: 'advanced',
            title: 'Advanced Programmer',
            description: 'Complete all lessons in Advanced World',
            icon: 'fas fa-rocket',
            xpReward: 300,
            pointsReward: 600,
            unlocked: false
        },
        {
            id: 'master',
            title: 'JavaScript Master',
            description: 'Complete all lessons and achieve mastery',
            icon: 'fas fa-crown',
            xpReward: 500,
            pointsReward: 1000,
            unlocked: false
        },
        {
            id: 'problem-solver',
            title: 'Problem Solver',
            description: 'Solve 100 coding problems',
            icon: 'fas fa-puzzle-piece',
            xpReward: 75,
            pointsReward: 150,
            unlocked: false
        },
        {
            id: 'dedicated',
            title: 'Dedicated Learner',
            description: 'Spend 50 hours learning',
            icon: 'fas fa-clock',
            xpReward: 60,
            pointsReward: 120,
            unlocked: false
        }
    ],

    // Daily challenges
    dailyChallenges: [
        {
            id: 'array-master',
            title: 'Array Manipulation Master',
            description: 'Solve 5 array problems',
            xpReward: 50,
            pointsReward: 100,
            difficulty: 'easy'
        },
        {
            id: 'function-wizard',
            title: 'Function Wizard',
            description: 'Create 5 different functions',
            xpReward: 60,
            pointsReward: 120,
            difficulty: 'medium'
        },
        {
            id: 'dom-dominator',
            title: 'DOM Dominator',
            description: 'Complete 5 DOM manipulation tasks',
            xpReward: 70,
            pointsReward: 140,
            difficulty: 'medium'
        },
        {
            id: 'async-champion',
            title: 'Async Champion',
            description: 'Solve 5 async programming problems',
            xpReward: 80,
            pointsReward: 160,
            difficulty: 'hard'
        },
        {
            id: 'algorithm-guru',
            title: 'Algorithm Guru',
            description: 'Implement 5 sorting algorithms',
            xpReward: 100,
            pointsReward: 200,
            difficulty: 'hard'
        }
    ],

    // Shop items
    shopItems: [
        { id: 'title-hacker', name: '"Hacker" Title', desc: 'Show off your elite status', type: 'title', cost: 200, currency: 'coins', icon: 'fas fa-terminal' },
        { id: 'title-ninja', name: '"Code Ninja" Title', desc: 'Silent but deadly coder', type: 'title', cost: 300, currency: 'coins', icon: 'fas fa-user-ninja' },
        { id: 'title-wizard', name: '"JS Wizard" Title', desc: 'Master of JavaScript magic', type: 'title', cost: 500, currency: 'coins', icon: 'fas fa-hat-wizard' },
        { id: 'title-legend', name: '"Legend" Title', desc: 'A true JavaScript legend', type: 'title', cost: 10, currency: 'gems', icon: 'fas fa-crown' },
        { id: 'boost-2x', name: '2x XP Boost (1hr)', desc: 'Double XP for one hour', type: 'boost', cost: 150, currency: 'coins', icon: 'fas fa-bolt' },
        { id: 'boost-streak', name: 'Streak Shield', desc: 'Protect your streak for one day', type: 'boost', cost: 5, currency: 'gems', icon: 'fas fa-shield-alt' },
        { id: 'hint-pack', name: 'Hint Pack (5)', desc: 'Get 5 quiz hints', type: 'consumable', cost: 100, currency: 'coins', icon: 'fas fa-lightbulb' },
        { id: 'theme-neon', name: 'Neon Theme', desc: 'Unlock the neon color theme', type: 'theme', cost: 15, currency: 'gems', icon: 'fas fa-palette' }
    ],

    // Typing challenge snippets
    typingChallenges: [
        { id: 'tc1', label: 'Hello World', code: 'console.log("Hello, World!");' },
        { id: 'tc2', label: 'Variable Declaration', code: 'let name = "JavaScript";\nconst version = 2025;' },
        { id: 'tc3', label: 'Arrow Function', code: 'const add = (a, b) => a + b;' },
        { id: 'tc4', label: 'Array Map', code: 'const doubled = nums.map(n => n * 2);' },
        { id: 'tc5', label: 'Object Destructure', code: 'const { name, age } = person;' },
        { id: 'tc6', label: 'Async Fetch', code: 'const res = await fetch(url);\nconst data = await res.json();' },
        { id: 'tc7', label: 'For Loop', code: 'for (let i = 0; i < arr.length; i++) {\n  console.log(arr[i]);\n}' },
        { id: 'tc8', label: 'Ternary Operator', code: 'const status = age >= 18 ? "adult" : "minor";' },
        { id: 'tc9', label: 'Template Literal', code: 'const msg = `Hello ${name}, you are ${age}!`;' },
        { id: 'tc10', label: 'Promise Chain', code: 'fetch(url)\n  .then(res => res.json())\n  .then(data => console.log(data));' }
    ],

    // Daily login rewards (7-day cycle)
    loginRewards: [
        { day: 1, reward: 10,  currency: 'coins', icon: 'fas fa-coins' },
        { day: 2, reward: 15,  currency: 'coins', icon: 'fas fa-coins' },
        { day: 3, reward: 20,  currency: 'coins', icon: 'fas fa-coins' },
        { day: 4, reward: 1,   currency: 'gems',  icon: 'fas fa-gem' },
        { day: 5, reward: 30,  currency: 'coins', icon: 'fas fa-coins' },
        { day: 6, reward: 2,   currency: 'gems',  icon: 'fas fa-gem' },
        { day: 7, reward: 50,  currency: 'coins', icon: 'fas fa-gift' }
    ],

    // Flashcards for JS concepts
    flashcards: [
        { front: 'What is a closure?', back: 'A function that remembers the variables from its outer scope even after the outer function has returned.', category: 'functions' },
        { front: 'What is hoisting?', back: 'JavaScript moves variable and function declarations to the top of their scope before execution. var is hoisted (as undefined), let/const are not accessible before declaration.', category: 'basics' },
        { front: 'Difference between == and ===', back: '== checks value with type coercion. === checks value AND type without coercion. Always prefer ===.', category: 'basics' },
        { front: 'What is the event loop?', back: 'The mechanism that allows JS to perform non-blocking operations by offloading tasks to the browser, then processing callbacks from the queue when the call stack is empty.', category: 'async' },
        { front: 'What does Array.reduce() do?', back: 'Executes a reducer function on each array element, accumulating a single return value. Syntax: arr.reduce((acc, cur) => acc + cur, initialValue)', category: 'arrays' },
        { front: 'What is prototypal inheritance?', back: 'Objects can inherit properties and methods from other objects through the prototype chain. Every object has a [[Prototype]] linking to another object.', category: 'objects' },
        { front: 'What is a Promise?', back: 'An object representing the eventual completion or failure of an async operation. States: pending, fulfilled, rejected. Use .then(), .catch(), or async/await.', category: 'async' },
        { front: 'let vs const vs var', back: 'var: function-scoped, hoisted. let: block-scoped, reassignable. const: block-scoped, cannot be reassigned (but objects/arrays can be mutated).', category: 'basics' },
        { front: 'What is destructuring?', back: 'Syntax to unpack values from arrays or properties from objects into variables. const { name } = obj; const [a, b] = arr;', category: 'basics' },
        { front: 'What is the spread operator?', back: '... spreads elements of an iterable. Used to copy arrays/objects, merge them, or pass array elements as function arguments.', category: 'basics' },
        { front: 'What is debouncing?', back: 'A technique that delays function execution until after a wait period has elapsed since the last call. Useful for search inputs, resize handlers.', category: 'performance' },
        { front: 'What is the DOM?', back: 'Document Object Model — a tree-structured API that represents HTML as objects. JavaScript uses it to read, modify, add, or delete HTML elements and attributes.', category: 'dom' }
    ],

    // Bug challenges for Find the Bug mini-game
    bugChallenges: [
        {
            id: 'bug1', title: 'Variable Scope',
            lines: ['function greet() {', '  let msg = "Hi";', '}', 'console.log(msg);'],
            bugLine: 3, hint: 'Think about where "let" variables are accessible.',
            explanation: '"msg" is declared with let inside the function — it\'s not accessible outside. Move the declaration or use a return value.'
        },
        {
            id: 'bug2', title: 'Off-by-one',
            lines: ['const arr = [1, 2, 3];', 'for (let i = 0; i <= arr.length; i++) {', '  console.log(arr[i]);', '}'],
            bugLine: 1, hint: 'Check the loop boundary condition carefully.',
            explanation: 'Using <= instead of < causes an extra iteration where arr[3] is undefined.'
        },
        {
            id: 'bug3', title: 'Strict Equality',
            lines: ['const age = "18";', 'if (age == 18) {', '  console.log("Adult");', '}'],
            bugLine: 1, hint: 'Look at the comparison operator and the variable type.',
            explanation: 'Using == instead of === allows type coercion. "18" == 18 is true but it\'s a common source of bugs. Use === for strict comparison.'
        },
        {
            id: 'bug4', title: 'Missing Return',
            lines: ['function double(n) {', '  n * 2;', '}', 'const result = double(5);'],
            bugLine: 1, hint: 'The function calculates something but does it give it back?',
            explanation: 'Missing "return" keyword. The function executes n * 2 but doesn\'t return it, so result is undefined.'
        },
        {
            id: 'bug5', title: 'Async Mistake',
            lines: ['async function getData() {', '  const res = fetch("/api");', '  const data = res.json();', '  return data;', '}'],
            bugLine: 1, hint: 'This is an async function — is it waiting for the async operation?',
            explanation: 'Missing "await" before fetch(). Without await, res is a Promise, not the response object.'
        },
        {
            id: 'bug6', title: 'Array Mutation',
            lines: ['const nums = [3, 1, 2];', 'const sorted = nums.sort();', 'console.log(nums);', '// Expected: [3, 1, 2]'],
            bugLine: 1, hint: 'Does .sort() create a new array or change the existing one?',
            explanation: 'Array.sort() mutates the original array. Use [...nums].sort() to avoid changing the original.'
        },
        {
            id: 'bug7', title: 'Callback Trap',
            lines: ['for (var i = 0; i < 3; i++) {', '  setTimeout(() => {', '    console.log(i);', '  }, 100);', '}'],
            bugLine: 0, hint: 'Pay attention to the variable declaration keyword in the loop.',
            explanation: 'Using "var" in a loop with setTimeout prints 3 three times because var is function-scoped. Use "let" instead.'
        },
        {
            id: 'bug8', title: 'Object Reference',
            lines: ['const user = { name: "Alice" };', 'const copy = user;', 'copy.name = "Bob";', 'console.log(user.name);'],
            bugLine: 1, hint: 'How are objects assigned in JavaScript — by value or reference?',
            explanation: 'Objects are assigned by reference. "copy" points to the same object. Use { ...user } for a shallow copy.'
        }
    ],

    // Code Fix challenges — type the corrected line
    codeFixChallenges: [
        {
            id: 'fix1', title: 'Missing Semicolon',
            code: 'let x = 5\nconsole.log(x)',
            bugLineIndex: 0, bugLine: 'let x = 5',
            fixedLine: 'let x = 5;',
            explanation: 'Always end statements with a semicolon for clarity.'
        },
        {
            id: 'fix2', title: 'Wrong Comparison',
            code: 'if (age == "18") {\n  console.log("adult");\n}',
            bugLineIndex: 0, bugLine: 'if (age == "18") {',
            fixedLine: 'if (age === "18") {',
            explanation: 'Use === for strict equality to avoid type coercion bugs.'
        },
        {
            id: 'fix3', title: 'Forgot Return',
            code: 'function add(a, b) {\n  a + b;\n}',
            bugLineIndex: 1, bugLine: '  a + b;',
            fixedLine: '  return a + b;',
            explanation: 'Without return, the function returns undefined.'
        },
        {
            id: 'fix4', title: 'Var in Loop',
            code: 'for (var i = 0; i < 5; i++) {\n  setTimeout(() => console.log(i), 100);\n}',
            bugLineIndex: 0, bugLine: 'for (var i = 0; i < 5; i++) {',
            fixedLine: 'for (let i = 0; i < 5; i++) {',
            explanation: 'Use let instead of var to get block-scoped loop variable.'
        },
        {
            id: 'fix5', title: 'Missing Await',
            code: 'async function load() {\n  const data = fetch("/api");\n  return data;\n}',
            bugLineIndex: 1, bugLine: '  const data = fetch("/api");',
            fixedLine: '  const data = await fetch("/api");',
            explanation: 'fetch() returns a Promise — use await to get the actual response.'
        },
        {
            id: 'fix6', title: 'Array Copy',
            code: 'const original = [1, 2, 3];\nconst copy = original;\ncopy.push(4);',
            bugLineIndex: 1, bugLine: 'const copy = original;',
            fixedLine: 'const copy = [...original];',
            explanation: 'Use spread operator to create a shallow copy instead of a reference.'
        }
    ],

    // Skill Tree
    skillTree: [
        // Core (starting branch)
        { id: 'core-1', name: 'JS Basics', desc: 'Variables, types, operators', cost: 0, requires: null, branch: 'core', icon: 'fas fa-seedling' },
        { id: 'core-2', name: 'Control Flow', desc: 'If/else, loops, switch', cost: 1, requires: 'core-1', branch: 'core', icon: 'fas fa-code-branch' },
        { id: 'core-3', name: 'Functions', desc: 'Declarations, arrows, scope', cost: 1, requires: 'core-2', branch: 'core', icon: 'fas fa-cube' },
        // Frontend branch
        { id: 'fe-1', name: 'DOM Basics', desc: 'Selectors, events, manipulation', cost: 2, requires: 'core-3', branch: 'frontend', icon: 'fas fa-window-maximize' },
        { id: 'fe-2', name: 'CSS-in-JS', desc: 'Dynamic styles, classList', cost: 2, requires: 'fe-1', branch: 'frontend', icon: 'fas fa-palette' },
        { id: 'fe-3', name: 'Animations', desc: 'RequestAnimationFrame, transitions', cost: 2, requires: 'fe-2', branch: 'frontend', icon: 'fas fa-film' },
        { id: 'fe-4', name: 'React Basics', desc: 'Components, JSX, state', cost: 3, requires: 'fe-3', branch: 'frontend', icon: 'fab fa-react' },
        // Backend branch
        { id: 'be-1', name: 'Node.js', desc: 'Runtime, modules, npm', cost: 2, requires: 'core-3', branch: 'backend', icon: 'fab fa-node-js' },
        { id: 'be-2', name: 'Express', desc: 'Routes, middleware, REST', cost: 2, requires: 'be-1', branch: 'backend', icon: 'fas fa-server' },
        { id: 'be-3', name: 'Databases', desc: 'MongoDB, SQL basics', cost: 2, requires: 'be-2', branch: 'backend', icon: 'fas fa-database' },
        { id: 'be-4', name: 'Auth & Security', desc: 'JWT, bcrypt, CORS', cost: 3, requires: 'be-3', branch: 'backend', icon: 'fas fa-shield-alt' },
        // Fullstack branch
        { id: 'fs-1', name: 'Async Mastery', desc: 'Promises, async/await, fetch', cost: 2, requires: 'core-3', branch: 'fullstack', icon: 'fas fa-sync-alt' },
        { id: 'fs-2', name: 'API Design', desc: 'REST, GraphQL, WebSockets', cost: 2, requires: 'fs-1', branch: 'fullstack', icon: 'fas fa-plug' },
        { id: 'fs-3', name: 'Testing', desc: 'Unit tests, Jest, TDD', cost: 2, requires: 'fs-2', branch: 'fullstack', icon: 'fas fa-vial' },
        { id: 'fs-4', name: 'DevOps', desc: 'CI/CD, Docker, deployment', cost: 3, requires: 'fs-3', branch: 'fullstack', icon: 'fas fa-rocket' },
    ],

    // Leaderboard (mock data)
    leaderboard: [
        { rank: 1, name: 'CodeMaster', xp: 2450, avatar: 'fas fa-user-ninja' },
        { rank: 2, name: 'JSNinja', xp: 2100, avatar: 'fas fa-user-ninja' },
        { rank: 3, name: 'WebWizard', xp: 1950, avatar: 'fas fa-user-astronaut' },
        { rank: 4, name: 'AsyncPro', xp: 1800, avatar: 'fas fa-user-graduate' },
        { rank: 5, name: 'DOMKing', xp: 1650, avatar: 'fas fa-user-tie' },
        { rank: 6, name: 'FunctionFan', xp: 1500, avatar: 'fas fa-user' },
        { rank: 7, name: 'LoopLegend', xp: 1400, avatar: 'fas fa-user' },
        { rank: 8, name: 'VariableVirtuoso', xp: 1300, avatar: 'fas fa-user' },
        { rank: 9, name: 'OperatorExpert', xp: 1200, avatar: 'fas fa-user' },
        { rank: 10, name: 'ErrorEliminator', xp: 1100, avatar: 'fas fa-user' }
    ],

    // Quiz questions for each lesson
    quizQuestions: {
        variables: [
            {
                question: 'What keyword is used to declare a variable in modern JavaScript?',
                options: ['var', 'let', 'int', 'declare'],
                correct: 1,
                explanation: 'The "let" keyword is used to declare block-scoped variables in modern JavaScript.'
            },
            {
                question: 'Which of the following is a primitive data type in JavaScript?',
                options: ['Array', 'Object', 'String', 'Function'],
                correct: 2,
                explanation: 'String is a primitive data type, while Array, Object, and Function are reference types.'
            },
            {
                question: 'What is the result of: typeof null?',
                options: ['null', 'undefined', 'object', 'string'],
                correct: 2,
                explanation: 'This is a known JavaScript quirk - typeof null returns "object".'
            }
        ],
        operators: [
            {
                question: 'What does the "===" operator do?',
                options: ['Assigns a value', 'Compares value and type', 'Compares only value', 'Creates an object'],
                correct: 1,
                explanation: 'The "===" operator checks for strict equality - both value and type must match.'
            },
            {
                question: 'What is the result of: 5 + "5"?',
                options: ['10', '55', 'Error', 'undefined'],
                correct: 1,
                explanation: 'When you add a number and a string, JavaScript converts the number to a string and concatenates them.'
            }
        ],
        functions: [
            {
                question: 'How do you declare an arrow function?',
                options: ['function => ()', '=> function()', '() => {}', 'function () =>'],
                correct: 2,
                explanation: 'Arrow functions are declared with the syntax: () => {}'
            }
        ]
    },

    // Coding challenges
    codingChallenges: {
        variables: [
            {
                title: 'Variable Declaration',
                description: 'Declare variables for a person\'s name, age, and isStudent status',
                starterCode: '// Declare variables here\n',
                solution: 'const name = "John";\nlet age = 25;\nlet isStudent = true;',
                testCases: [
                    { input: '', expected: 'Variables declared correctly' }
                ]
            }
        ]
    }
};

// Utility functions for game data
const GameUtils = {
    // Calculate player level based on XP
    calculateLevel(xp) {
        for (let i = GameData.levels.length - 1; i >= 0; i--) {
            if (xp >= GameData.levels[i].xpRequired) {
                return GameData.levels[i];
            }
        }
        return GameData.levels[0];
    },

    // Get XP required for next level
    getXpToNextLevel(currentXp) {
        const currentLevel = this.calculateLevel(currentXp);
        const nextLevel = GameData.levels.find(level => level.level === currentLevel.level + 1);
        if (!nextLevel) return 0;
        return nextLevel.xpRequired - currentXp;
    },

    // Get lesson by ID
    getLesson(lessonId) {
        return GameData.lessons[lessonId];
    },

    // Get lessons in a world
    getWorldLessons(world) {
        return Object.values(GameData.lessons)
            .filter(lesson => lesson.world === world)
            .sort((a, b) => a.order - b.order);
    },

    // Check if lesson is unlocked
    isLessonUnlocked(lessonId) {
        return true;
    },

    // Check if lesson is completed
    isLessonCompleted(lessonId) {
        return GameData.player.completedLessons.includes(lessonId);
    },

    // Get next lesson to unlock
    getNextLesson(lessonId) {
        const lesson = this.getLesson(lessonId);
        const worldLessons = this.getWorldLessons(lesson.world);
        const currentIndex = worldLessons.findIndex(l => l.id === lessonId);
        
        if (currentIndex < worldLessons.length - 1) {
            return worldLessons[currentIndex + 1];
        }
        
        // Move to next world
        const worlds = ['basics', 'intermediate', 'advanced', 'master'];
        const currentWorldIndex = worlds.indexOf(lesson.world);
        
        if (currentWorldIndex < worlds.length - 1) {
            const nextWorldLessons = this.getWorldLessons(worlds[currentWorldIndex + 1]);
            return nextWorldLessons[0];
        }
        
        return null;
    },

    // Get achievement by ID
    getAchievement(achievementId) {
        return GameData.achievements.find(a => a.id === achievementId);
    },

    // Check and unlock achievements
    checkAchievements() {
        const player = GameData.player;
        
        GameData.achievements.forEach(achievement => {
            if (!achievement.unlocked) {
                let shouldUnlock = false;
                
                switch (achievement.id) {
                    case 'first-steps':
                        shouldUnlock = player.completedLessons.length > 0;
                        break;
                    case 'week-warrior':
                        shouldUnlock = player.streak >= 7;
                        break;
                    case 'problem-solver':
                        shouldUnlock = player.problemsSolved >= 100;
                        break;
                    case 'dedicated':
                        shouldUnlock = player.timeSpent >= 50;
                        break;
                    case 'explorer':
                        shouldUnlock = this.getWorldLessons('basics').every(lesson => 
                            player.completedLessons.includes(lesson.id)
                        );
                        break;
                    case 'intermediate':
                        shouldUnlock = this.getWorldLessons('intermediate').every(lesson => 
                            player.completedLessons.includes(lesson.id)
                        );
                        break;
                    case 'advanced':
                        shouldUnlock = this.getWorldLessons('advanced').every(lesson => 
                            player.completedLessons.includes(lesson.id)
                        );
                        break;
                    case 'master':
                        shouldUnlock = this.getWorldLessons('master').every(lesson => 
                            player.completedLessons.includes(lesson.id)
                        );
                        break;
                }
                
                if (shouldUnlock) {
                    this.unlockAchievement(achievement.id);
                }
            }
        });
    },

    // Unlock achievement
    unlockAchievement(achievementId) {
        const achievement = this.getAchievement(achievementId);
        if (achievement && !achievement.unlocked) {
            achievement.unlocked = true;
            GameData.player.achievements.push(achievementId);
            
            // Award rewards
            GameData.player.xp += achievement.xpReward;
            GameData.player.points += achievement.pointsReward;
            
            // Show achievement notification
            if (window.gameEngine) {
                window.gameEngine.showAchievementUnlocked(achievement);
            }
            
            // Save game state
            this.saveGameState();
        }
    },

    // Save game state to localStorage
    saveGameState() {
        const gameState = {
            player: GameData.player,
            achievements: GameData.achievements,
            lastPlayed: new Date().toISOString()
        };
        localStorage.setItem('javascriptQuestGameState', JSON.stringify(gameState));
    },

    // Load game state from localStorage
    loadGameState() {
        const savedState = localStorage.getItem('javascriptQuestGameState');
        if (savedState) {
            const gameState = JSON.parse(savedState);
            GameData.player = { ...GameData.player, ...gameState.player };
            
            // Restore achievement unlock status
            if (gameState.achievements) {
                gameState.achievements.forEach(savedAchievement => {
                    const achievement = GameData.achievements.find(a => a.id === savedAchievement.id);
                    if (achievement) {
                        achievement.unlocked = savedAchievement.unlocked;
                    }
                });
            }
            
            // Check for streak
            this.checkStreak(gameState.lastPlayed);
        }
    },

    // Check daily streak
    checkStreak(lastPlayed) {
        if (!lastPlayed) return;
        
        const lastDate = new Date(lastPlayed);
        const today = new Date();
        const diffTime = Math.abs(today - lastDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 1) {
            // Consecutive day
            GameData.player.streak++;
        } else if (diffDays > 1) {
            // Streak broken
            GameData.player.streak = 1;
        }
        // If diffDays === 0, same day, don't change streak
    },

    // Get daily challenge
    getDailyChallenge() {
        const today = new Date().toDateString();
        const challengeIndex = today.charCodeAt(0) % GameData.dailyChallenges.length;
        return GameData.dailyChallenges[challengeIndex];
    },

    // Format time display
    formatTime(minutes) {
        if (minutes < 60) {
            return `${minutes}m`;
        } else {
            const hours = Math.floor(minutes / 60);
            const mins = minutes % 60;
            return `${hours}h ${mins}m`;
        }
    },

    // Get progress percentage for a lesson
    getLessonProgress(lessonId) {
        const lesson = this.getLesson(lessonId);
        if (!lesson) return 0;
        
        const completedTopics = lesson.topics.filter(topic => topic.completed).length;
        return Math.round((completedTopics / lesson.topics.length) * 100);
    },

    // Get overall progress
    getOverallProgress() {
        const totalLessons = Object.keys(GameData.lessons).length;
        const completedLessons = GameData.player.completedLessons.length;
        return Math.round((completedLessons / totalLessons) * 100);
    },

    // Get combo multiplier (1x base, +0.1x per combo, max 3x)
    getComboMultiplier() {
        return Math.min(1 + GameData.player.combo * 0.1, 3);
    },

    // Check and process daily login
    processDailyLogin() {
        const today = new Date().toDateString();
        if (GameData.player.lastLoginDate === today) return null; // already logged in today

        GameData.player.lastLoginDate = today;
        if (!GameData.player.loginDays.includes(today)) {
            GameData.player.loginDays.push(today);
        }

        // Determine which reward day (cycle 1-7)
        const dayIndex = (GameData.player.loginDays.length - 1) % 7;
        const reward = GameData.loginRewards[dayIndex];

        // Grant reward
        if (reward.currency === 'coins') {
            GameData.player.coins += reward.reward;
        } else {
            GameData.player.gems += reward.reward;
        }

        this.saveGameState();
        return { dayIndex, reward };
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { GameData, GameUtils };
}
