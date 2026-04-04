// ========================================
// JAVASCRIPT MODULES & IMPORTS PLAYGROUND
// ========================================

console.log("Modules Playground Loaded!");

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("Modules Playground initialized!");
    initializePlayground();
});

function initializePlayground() {
    setupEventListeners();
    showModuleOverview();
}

// ========================================
// TAB SWITCHING
// ========================================

function switchExampleTab(tabName) {
    // Update tab appearance
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const activeTab = Array.from(tabs).find(tab => 
        tab.textContent.toLowerCase().includes(tabName.replace('-', ' '))
    );
    if (activeTab) activeTab.classList.add('active');
    
    // Update content visibility
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));
    
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// ========================================
// NAMED EXPORTS EXAMPLE
// ========================================

function runNamedExample() {
    const result = document.getElementById('named-result');
    
    try {
        // Simulate named exports
        const math = {
            PI: 3.14159,
            add: (a, b) => a + b,
            multiply: (a, b) => a * b,
            Calculator: class {
                constructor() {
                    this.result = 0;
                }
                add(value) {
                    this.result += value;
                    return this;
                }
            }
        };
        
        // Simulate imports and usage
        const { PI, add, multiply } = math;
        const calc = new math.Calculator();
        
        let output = '✅ Named Exports Example Results:\n\n';
        output += `Imported PI: ${PI}\n`;
        output += `add(5, 3): ${add(5, 3)}\n`;
        output += `multiply(4, 6): ${multiply(4, 6)}\n`;
        output += `Calculator: ${calc.add(10).add(5).result}\n\n`;
        
        output += '📝 Import patterns demonstrated:\n';
        output += '• import { PI, add, multiply } from "./math.js"\n';
        output += '• import * as math from "./math.js"\n';
        output += '• import { add as sum } from "./math.js"\n';
        
        result.textContent = output;
        showNotification('Named exports example executed', 'success');
        
    } catch (error) {
        result.textContent = `❌ Error: ${error.message}`;
        showNotification('Error running example', 'error');
    }
}

function showNamedExplanation() {
    const result = document.getElementById('named-result');
    
    const explanation = `📚 Named Exports - Detailed Explanation

🔹 WHAT ARE NAMED EXPORTS?
Named exports allow you to export multiple values from a module,
each with its own name. This is useful when a module contains
several related functions, constants, or classes.

🔹 SYNTAX:
// Exporting
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export class Calculator { ... }

// Importing
import { PI, add } from './math.js';
import { add as sum } from './math.js'; // with alias
import * as math from './math.js'; // namespace

🔹 WHEN TO USE:
• Module contains multiple related utilities
• Want to allow selective imports
• Need to export multiple functions/constants
• Want tree shaking to work effectively

🔹 BENEFITS:
✓ Explicit imports - clear what's being used
✓ Tree shaking friendly - unused code can be eliminated
✓ Better IDE support - easier autocomplete
✓ Clear module structure

🔹 BEST PRACTICES:
• Use descriptive names
• Group related exports
• Consider default export for main functionality
• Keep modules focused and small`;
    
    result.textContent = explanation;
    showNotification('Named exports explanation displayed', 'info');
}

// ========================================
// DEFAULT EXPORTS EXAMPLE
// ========================================

function runDefaultExample() {
    const result = document.getElementById('default-result');
    
    try {
        // Simulate default export
        class Logger {
            constructor(name) {
                this.name = name;
            }
            log(message) {
                return `[${this.name}] ${message}`;
            }
        }
        
        const VERSION = '1.0.0';
        
        // Simulate imports and usage
        const logger = new Logger('MyApp');
        
        let output = '✅ Default Exports Example Results:\n\n';
        output += `Logger instance created: ${logger.constructor.name}\n`;
        output += `Log message: ${logger.log('Hello World')}\n`;
        output += `Version (named export): ${VERSION}\n\n`;
        
        output += '📝 Import patterns demonstrated:\n';
        output += '• import Logger from "./utils.js"\n';
        output += '• import Logger, { VERSION } from "./utils.js"\n';
        output += '• import MyLogger from "./utils.js" // with alias\n\n';
        
        output += '🔍 Default vs Named:\n';
        output += '• Default: One main export per module\n';
        output += '• Named: Multiple exports with names\n';
        output += '• Can mix both in one module';
        
        result.textContent = output;
        showNotification('Default exports example executed', 'success');
        
    } catch (error) {
        result.textContent = `❌ Error: ${error.message}`;
        showNotification('Error running example', 'error');
    }
}

function showDefaultExplanation() {
    const result = document.getElementById('default-result');
    
    const explanation = `📚 Default Exports - Detailed Explanation

🔹 WHAT ARE DEFAULT EXPORTS?
Default exports allow a module to export a single value as the
main export. This is commonly used for classes, functions, or
objects that represent the primary purpose of the module.

🔹 SYNTAX:
// Exporting
export default class Logger { ... }
export default function helper() { ... }
export default { config: {}, utils: {} };

// Importing
import Logger from './utils.js';
import MyLogger from './utils.js'; // with alias
import Logger, { VERSION } from './utils.js'; // mixed

🔹 WHEN TO USE:
• Module has one main purpose/functionality
• Exporting a class or main function
• Creating a module's public API
• When users will typically import one thing

🔹 BENEFITS:
✓ Simpler imports for main functionality
✓ Clear module intention
✓ Easier refactoring (can change internal exports)
✓ Familiar to developers from other languages

🔹 CONSIDERATIONS:
• Can only have one default export per module
• Import name can be chosen by importer
• Less explicit about what's being imported
• Harder for tree shaking in some cases

🔹 COMMON PATTERNS:
• React components (export default Component)
• Utility classes (export default Utils)
• Configuration objects (export default config)
• API clients (export default APIClient)`;
    
    result.textContent = explanation;
    showNotification('Default exports explanation displayed', 'info');
}

// ========================================
// MIXED EXPORTS EXAMPLE
// ========================================

function runMixedExample() {
    const result = document.getElementById('mixed-result');
    
    try {
        // Simulate mixed exports
        class APIClient {
            constructor(baseURL) {
                this.baseURL = baseURL;
            }
        }
        
        const GET = 'GET';
        const POST = 'POST';
        const PUT = 'PUT';
        
        function request(method, url, data) {
            return `${method} ${url} with data: ${JSON.stringify(data)}`;
        }
        
        // Simulate usage
        const client = new APIClient('https://api.example.com');
        const requestResult = request(POST, '/users', { name: 'John' });
        
        let output = '✅ Mixed Exports Example Results:\n\n';
        output += `APIClient created with: ${client.baseURL}\n`;
        output += `HTTP Methods: ${GET}, ${POST}, ${PUT}\n`;
        output += `Request result: ${requestResult}\n\n`;
        
        output += '📝 Import patterns demonstrated:\n';
        output += '• import APIClient, { GET, POST, request } from "./api.js"\n';
        output += '• import * as API from "./api.js"\n\n';
        
        output += '🔍 Mixed Export Benefits:\n';
        output += '• Default: Main class/function\n';
        output += '• Named: Constants and utilities\n';
        output += '• Flexible: Choose import style\n';
        output += '• Complete: Full module API available';
        
        result.textContent = output;
        showNotification('Mixed exports example executed', 'success');
        
    } catch (error) {
        result.textContent = `❌ Error: ${error.message}`;
        showNotification('Error running example', 'error');
    }
}

function showMixedExplanation() {
    const result = document.getElementById('mixed-result');
    
    const explanation = `📚 Mixed Exports - Detailed Explanation

🔹 WHAT ARE MIXED EXPORTS?
Mixed exports combine both default and named exports in a single
module. This pattern is useful when a module has a primary export
but also provides additional utilities.

🔹 SYNTAX:
// Exporting
export default class APIClient { ... }
export const GET = 'GET';
export const POST = 'POST';
export function request() { ... }

// Importing
import APIClient, { GET, POST } from './api.js';
import * as API from './api.js';

🔹 WHEN TO USE:
• Main class with supporting constants
• Library with primary export and utilities
• Component with helper functions
• API client with HTTP method constants

🔹 COMMON PATTERNS:

🎯 React Components:
export default Component;
export { useState, useEffect };

🌐 API Clients:
export default APIClient;
export { GET, POST, PUT };

🔧 Utility Libraries:
export default Utils;
export { format, validate, transform };

📊 Data Models:
export default User;
export { validateUser, userSchema };

🔹 BENEFITS:
✓ Clear primary export (default)
✓ Access to utilities (named)
✓ Flexible import options
✓ Good for library design

🔹 EXAMPLES:
• React: export default Component, export hooks
• Lodash: export default _, export individual functions
• Axios: export default axios, export static methods`;
    
    result.textContent = explanation;
    showNotification('Mixed exports explanation displayed', 'info');
}

// ========================================
// DYNAMIC IMPORTS EXAMPLE
// ========================================

async function runDynamicExample() {
    const result = document.getElementById('dynamic-result');
    
    try {
        result.textContent = '🔄 Loading dynamic module...';
        
        // Simulate async loading
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Simulate dynamic module
        const heavyModule = {
            heavyFunction: () => {
                let result = 0;
                for (let i = 0; i < 100000; i++) {
                    result += Math.random();
                }
                return result.toFixed(2);
            },
            config: {
                debug: true,
                version: '2.0.0'
            }
        };
        
        const heavyResult = heavyModule.heavyFunction();
        
        let output = '✅ Dynamic Imports Example Results:\n\n';
        output += `Heavy function result: ${heavyResult}\n`;
        output += `Module config: ${JSON.stringify(heavyModule.config, null, 2)}\n\n`;
        
        output += '📝 Dynamic Import Patterns:\n';
        output += '• const module = await import("./heavy.js");\n';
        output += '• const { func } = await import("./utils.js");\n';
        output += '• import("./module.js").then(module => {...});\n\n';
        
        output += '🔍 Use Cases:\n';
        output += '• Code splitting / lazy loading\n';
        output += '• Conditional module loading\n';
        output += '• Performance optimization\n';
        output += '• Reducing initial bundle size';
        
        result.textContent = output;
        showNotification('Dynamic imports example executed', 'success');
        
    } catch (error) {
        result.textContent = `❌ Error: ${error.message}`;
        showNotification('Error running example', 'error');
    }
}

function showDynamicExplanation() {
    const result = document.getElementById('dynamic-result');
    
    const explanation = `📚 Dynamic Imports - Detailed Explanation

🔹 WHAT ARE DYNAMIC IMPORTS?
Dynamic imports allow you to load modules on-demand at runtime,
rather than at compile time. This enables code splitting and
lazy loading for better performance.

🔹 SYNTAX:
// Basic dynamic import
const module = await import('./module.js');

// Destructuring import
const { func1, func2 } = await import('./utils.js');

// Promise-based
import('./module.js')
  .then(module => console.log(module))
  .catch(error => console.error(error));

🔹 WHEN TO USE:
• Large modules that aren't needed immediately
• Route-based code splitting
• Feature flags / conditional loading
• Reducing initial bundle size
• Performance optimization

🔹 BENEFITS:
✓ Faster initial page load
✓ Reduced memory usage
✓ Better user experience
✓ Conditional loading possible
✓ Tree shaking friendly

🔹 REAL-WORLD EXAMPLES:

🛣️ Route-based loading:
const Home = () => import('./views/Home.js');
const About = () => import('./views/About.js');

🎛️ Feature flags:
if (featureEnabled) {
  const { premiumFeature } = await import('./premium.js');
}

📦 Lazy loading libraries:
button.onclick = async () => {
  const { Chart } = await import('chart.js');
  new Chart(canvas, config);
};

🔹 CONSIDERATIONS:
• Returns a Promise
• Can be used in async functions
• Network request required
• Error handling important
• Browser support (modern browsers)`;
    
    result.textContent = explanation;
    showNotification('Dynamic imports explanation displayed', 'info');
}

// ========================================
// CUSTOM MODULE CREATOR
// ========================================

function executeCustomModule() {
    const moduleName = document.getElementById('module-name').value;
    const moduleCode = document.getElementById('module-code').value;
    const importCode = document.getElementById('import-code').value;
    const result = document.getElementById('custom-module-result');
    
    if (!moduleName || !moduleCode) {
        showNotification('Please enter module name and code', 'error');
        return;
    }
    
    try {
        // Create a safe execution environment
        const moduleFunction = new Function(moduleCode);
        const moduleExports = {};
        
        // Mock export functions
        const mockExport = (name, value) => {
            moduleExports[name] = value;
        };
        
        const mockDefaultExport = (value) => {
            moduleExports.default = value;
        };
        
        // Execute module code with mock exports
        const moduleCodeWithExports = moduleCode
            .replace(/export\s+const/g, 'const')
            .replace(/export\s+function/g, 'function')
            .replace(/export\s+class/g, 'class')
            .replace(/export\s+{([^}]+)}/g, 'const {$1} = {}')
            .replace(/export\s+default/g, '// export default');
        
        // This is a simplified simulation
        result.textContent = `✅ Module "${moduleName}" Analysis:\n\n` +
            `📝 Module Code:\n${moduleCode}\n\n` +
            `📥 Import Code:\n${importCode}\n\n` +
            `🔍 Detected Exports:\n` +
            `• Functions: ${extractFunctions(moduleCode)}\n` +
            `• Classes: ${extractClasses(moduleCode)}\n` +
            `• Constants: ${extractConstants(moduleCode)}\n` +
            `• Default Export: ${hasDefaultExport(moduleCode) ? 'Yes' : 'No'}\n\n` +
            `💡 Note: In a real ES6 module environment, this code would\n` +
            `be executed with proper import/export semantics.`;
        
        showNotification('Module analyzed successfully', 'success');
        
    } catch (error) {
        result.textContent = `❌ Module Error: ${error.message}\n\n` +
            `💡 Check your module syntax and try again.`;
        showNotification('Error in module code', 'error');
    }
}

function validateModuleCode() {
    const moduleCode = document.getElementById('module-code').value;
    const result = document.getElementById('custom-module-result');
    
    if (!moduleCode) {
        showNotification('Please enter module code', 'error');
        return;
    }
    
    const issues = [];
    const suggestions = [];
    
    // Check for common patterns
    if (moduleCode.includes('export default')) {
        suggestions.push('✓ Uses default export');
    }
    
    if (moduleCode.includes('export const') || moduleCode.includes('export function')) {
        suggestions.push('✓ Uses named exports');
    }
    
    if (!moduleCode.includes('export')) {
        issues.push('❌ No exports found - module won\'t expose anything');
    }
    
    if (moduleCode.includes('var ')) {
        suggestions.push('💡 Consider using const/let instead of var');
    }
    
    if (moduleCode.includes('console.log')) {
        suggestions.push('💡 Remove console.log from production modules');
    }
    
    let output = '🔍 Module Code Validation:\n\n';
    
    if (issues.length > 0) {
        output += '🚨 Issues:\n';
        issues.forEach(issue => output += `${issue}\n`);
        output += '\n';
    }
    
    if (suggestions.length > 0) {
        output += '💡 Suggestions:\n';
        suggestions.forEach(suggestion => output += `${suggestion}\n`);
    }
    
    if (issues.length === 0 && suggestions.length === 0) {
        output = '✅ Module code looks good!\n\n' +
            'No issues found. Your module follows best practices.';
    }
    
    result.textContent = output;
    showNotification('Module validation completed', 'info');
}

function generateModuleTemplate() {
    const templates = {
        utility: `// Utility Module Template
// File: utils.js

// Constants
export const API_BASE_URL = 'https://api.example.com';
export const VERSION = '1.0.0';

// Utility functions
export function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency
    }).format(amount);
}

export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Default export - main utility class
export default class Utils {
    static formatCurrency = formatCurrency;
    static debounce = debounce;
}`,
        
        api: `// API Module Template
// File: api.js

// HTTP methods
export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const DELETE = 'DELETE';

// Default export - API client
export default class APIClient {
    constructor(baseURL = 'https://api.example.com') {
        this.baseURL = baseURL;
        this.headers = {
            'Content-Type': 'application/json'
        };
    }
    
    async request(endpoint, options = {}) {
        const url = \`\${this.baseURL}\${endpoint}\`;
        const config = {
            headers: this.headers,
            ...options
        };
        
        try {
            const response = await fetch(url, config);
            if (!response.ok) {
                throw new Error(\`HTTP error! status: \${response.status}\`);
            }
            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }
    
    get(endpoint) {
        return this.request(endpoint, { method: GET });
    }
    
    post(endpoint, data) {
        return this.request(endpoint, {
            method: POST,
            body: JSON.stringify(data)
        });
    }
}`,
        
        component: `// Component Module Template
// File: Button.js

// CSS styles (could be in separate CSS module)
export const styles = {
    button: 'btn btn-primary',
    disabled: 'disabled',
    loading: 'loading'
};

// Utility functions
export function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.className = styles.button;
    button.onclick = onClick;
    return button;
}

export function setLoading(button, loading) {
    if (loading) {
        button.disabled = true;
        button.classList.add(styles.loading);
        button.textContent = 'Loading...';
    } else {
        button.disabled = false;
        button.classList.remove(styles.loading);
    }
}

// Default export - Button component
export default class Button {
    constructor(text, onClick) {
        this.element = createButton(text, onClick);
        this.isLoading = false;
    }
    
    setLoading(loading) {
        this.isLoading = loading;
        setLoading(this.element, loading);
    }
    
    render(container) {
        container.appendChild(this.element);
    }
}`
    };
    
    const templateNames = Object.keys(templates);
    const selectedTemplate = templateNames[Math.floor(Math.random() * templateNames.length)];
    
    document.getElementById('module-code').value = templates[selectedTemplate];
    document.getElementById('module-name').value = selectedTemplate;
    
    showNotification(`Generated ${selectedTemplate} template`, 'success');
}

// Helper functions for module analysis
function extractFunctions(code) {
    const matches = code.match(/export\s+function\s+(\w+)/g) || [];
    return matches.map(m => m.replace(/export\s+function\s+/, '')).join(', ') || 'None';
}

function extractClasses(code) {
    const matches = code.match(/export\s+class\s+(\w+)/g) || [];
    return matches.map(m => m.replace(/export\s+class\s+/, '')).join(', ') || 'None';
}

function extractConstants(code) {
    const matches = code.match(/export\s+const\s+(\w+)/g) || [];
    return matches.map(m => m.replace(/export\s+const\s+/, '')).join(', ') || 'None';
}

function hasDefaultExport(code) {
    return code.includes('export default');
}

// ========================================
// DEPENDENCY MANAGEMENT
// ========================================

function createDependencyTree() {
    const tree = document.getElementById('dependency-tree');
    
    const dependencies = {
        'app.js': [
            { name: 'components/Button.js', type: 'import' },
            { name: 'utils/api.js', type: 'import' },
            { name: 'config/index.js', type: 'import' }
        ],
        'components/Button.js': [
            { name: 'utils/helpers.js', type: 'import' },
            { name: 'styles/button.css', type: 'import' }
        ],
        'utils/api.js': [
            { name: 'config/constants.js', type: 'import' },
            { name: 'utils/auth.js', type: 'import' }
        ],
        'config/index.js': [
            { name: 'config/constants.js', type: 'import' },
            { name: 'config/environment.js', type: 'import' }
        ]
    };
    
    let html = '<h4>🌳 Module Dependency Tree</h4>';
    
    Object.entries(dependencies).forEach(([module, deps]) => {
        html += `<div class="dependency-item">📁 ${module}`;
        
        deps.forEach(dep => {
            const icon = dep.type === 'import' ? '📥' : '📤';
            html += `<div class="dependency-item nested">${icon} ${dep.name}</div>`;
        });
        
        html += '</div>';
    });
    
    tree.innerHTML = html;
    showNotification('Dependency tree created', 'success');
}

function analyzeDependencies() {
    const result = document.getElementById('dependency-analysis');
    
    let analysis = '📊 Dependency Analysis:\n\n';
    
    analysis += '🔍 Types of Dependencies:\n';
    analysis += '• Production Dependencies: Required for runtime\n';
    analysis += '• Development Dependencies: Required for development\n';
    analysis += '• Peer Dependencies: Expected to be provided by consumer\n\n';
    
    analysis += '⚠️ Common Issues:\n';
    analysis += '• Circular Dependencies: A → B → A\n';
    analysis += '• Unused Dependencies: Imported but never used\n';
    analysis += '• Missing Dependencies: Required but not listed\n';
    analysis += '• Version Conflicts: Incompatible versions\n\n';
    
    analysis += '🛠️ Optimization Strategies:\n';
    analysis += '• Tree Shaking: Remove unused code\n';
    analysis += '• Code Splitting: Load modules on demand\n';
    analysis += '• Dynamic Imports: Conditional loading\n';
    analysis += '• Bundle Analysis: Identify large modules\n\n';
    
    analysis += '📈 Best Practices:\n';
    analysis += '• Keep modules small and focused\n';
    analysis += '• Avoid deep nesting\n';
    analysis += '• Use explicit imports/exports\n';
    analysis += '• Regular dependency audits';
    
    result.textContent = analysis;
    showNotification('Dependency analysis completed', 'info');
}

function simulateCircularDependency() {
    const result = document.getElementById('dependency-analysis');
    
    const example = `🔄 Circular Dependency Example:

❌ PROBLEMATIC STRUCTURE:
// moduleA.js
import { funcB } from './moduleB.js';
export function funcA() {
    console.log('Function A');
    funcB();
}

// moduleB.js  
import { funcA } from './moduleB.js';
export function funcB() {
    console.log('Function B');
    funcA();
}

✅ SOLUTIONS:

1. 📦 Extract Common Code:
// shared.js
export function commonLogic() { ... }

// moduleA.js
import { commonLogic } from './shared.js';
export function funcA() { commonLogic(); }

2. 🔄 Dependency Inversion:
// events.js
export const eventEmitter = new EventEmitter();

// moduleA.js
import { eventEmitter } from './events.js';
eventEmitter.on('event', handleEvent);

3. 📋 Interface Segregation:
// interfaces.js
export interface ILogger { log(message: string); }

// moduleA.js implements logger
// moduleB.js receives logger as parameter

💡 PREVENTION:
• Design clear module boundaries
• Use dependency injection
• Avoid tight coupling
• Consider event-driven architecture`;
    
    result.textContent = example;
    showNotification('Circular dependency demo shown', 'warning');
}

// ========================================
// BEST PRACTICES
// ========================================

function showBestPractice(topic) {
    const content = document.getElementById('best-practice-content');
    
    const practices = {
        structure: `📁 Module Structure Best Practices

🎯 ORGANIZATION:
• One main export per module when possible
• Group related functionality together
• Use descriptive file and folder names
• Keep modules focused and small

📂 FOLDER STRUCTURE:
/src
  /components
    Button.js
    Button.css
    Button.test.js
  /utils
    api.js
    helpers.js
    validators.js
  /services
    auth.js
    database.js
  /config
    index.js
    constants.js

📝 NAMING CONVENTIONS:
• Files: PascalCase for classes, camelCase for utilities
• Exports: Use clear, descriptive names
• Constants: UPPER_SNAKE_CASE
• Functions: camelCase with descriptive verbs

🔧 MODULE DESIGN:
• Single Responsibility Principle
• High cohesion, low coupling
• Clear public API
• Minimal dependencies`,

        exports: `📤 Export Strategy Best Practices

🎯 NAMED EXPORTS:
✅ USE WHEN:
• Multiple related utilities
• Library with many functions
• Need selective imports
• Want tree shaking

❌ AVOID WHEN:
• Only one main export
• Complex internal API
• Performance-critical paths

🎯 DEFAULT EXPORTS:
✅ USE WHEN:
• Main class or function
• React/Vue components
• Configuration objects
• Primary module purpose

❌ AVOID WHEN:
• Multiple equal exports
• Utility collections
• When clarity is important

🎯 MIXED EXPORTS:
✅ USE WHEN:
• Main class + utilities
• Component + helpers
• Library + constants

📊 EXAMPLES:
// Good: Main class + constants
export default class APIClient { ... }
export const GET = 'GET';
export const POST = 'POST';

// Good: Utility collection
export const format = ...;
export const validate = ...;
export const transform = ...;`,

        imports: `📥 Import Optimization Best Practices

🎯 SELECTIVE IMPORTS:
✅ DO: import { add, multiply } from './math.js';
❌ DON'T: import * as math from './math.js';

🎯 IMPORT AT TOP:
✅ DO: Place imports at file top
✅ DO: Group related imports
✅ DO: Order: third-party → local

📝 IMPORT ORDERING:
// 1. Node.js built-ins
import fs from 'fs';

// 2. Third-party libraries
import React from 'react';
import _ from 'lodash';

// 3. Local modules
import { utils } from './utils.js';
import Component from './Component.js';

🎯 TREE SHAKING FRIENDLY:
✅ Use named exports for utilities
✅ Import only what you need
✅ Avoid side effects in imports
✅ Use dynamic imports for large modules

🔍 EXAMPLES:
// Good - selective
import { useState, useEffect } from 'react';

// Good - dynamic
const Chart = await import('./Chart.js');

// Bad - import all
import * as React from 'react';`,

        circular: `🔄 Circular Dependency Prevention

🚨 COMMON CIRCULAR DEPENDENCIES:
• A imports B, B imports A
• A → B → C → A
• Shared utilities creating loops

✅ PREVENTION STRATEGIES:

1. 📦 DEPENDENCY INVERSION:
// Instead of A → B → A
// Create: A → Interface ← B

2. 🎯 EVENT-DRIVEN ARCHITECTURE:
// Use events instead of direct imports
eventEmitter.emit('dataChanged', data);

3. 📋 EXTRACT COMMON CODE:
// Move shared logic to separate module
// Both A and B import from common

4. 🔄 DEPENDENCY INJECTION:
// Pass dependencies as parameters
function processData(data, logger) {
    logger.log(data);
}

🔍 DETECTION TOOLS:
• ESLint plugins (import/no-cycle)
• Webpack bundle analyzer
• Madge (dependency graph generator)
• Circular dependency checkers

📊 EXAMPLES:

❌ BEFORE (Circular):
// auth.js imports user.js
// user.js imports auth.js

✅ AFTER (Fixed):
// events.js
export const emitter = new EventEmitter();

// auth.js
import { emitter } from './events.js';

// user.js  
import { emitter } from './events.js';`,

        performance: `⚡ Performance Optimization

🎯 CODE SPLITTING:
• Route-based splitting
• Feature-based splitting
• Vendor chunk separation
• Dynamic imports

📦 LAZY LOADING:
// Route-based
const Home = () => import('./views/Home.js');

// Feature-based
if (featureEnabled) {
    const { PremiumFeature } = await import('./premium.js');
}

// Component-based
const HeavyComponent = React.lazy(() => import('./HeavyComponent.js'));

🌳 TREE SHAKING:
✅ Use ES6 modules
✅ Named exports for utilities
✅ Import only what's needed
✅ Avoid side effects

📊 BUNDLE OPTIMIZATION:
• Analyze bundle size regularly
• Identify large dependencies
• Use lighter alternatives
• Remove unused code

🔍 MONITORING TOOLS:
• Webpack Bundle Analyzer
• Source map explorer
• Lighthouse performance audit
• Bundle size tracking

📈 EXAMPLES:

// Good - tree shakable
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;

// Good - dynamic import
const chart = await import('./chart.js');

// Good - conditional
if (process.env.NODE_ENV === 'development') {
    const { devTools } = await import('./dev-tools.js');
}`,

        testing: `🧪 Testing Modular Code

🎯 TESTABLE MODULE DESIGN:
• Pure functions when possible
• Dependency injection
• Clear interfaces
• Minimal side effects

📝 TESTING STRATEGIES:

1. 🧪 UNIT TESTS:
// Test individual functions in isolation
import { add, multiply } from './math.js';

test('add function', () => {
    expect(add(2, 3)).toBe(5);
});

2. 🔧 MOCKING:
// Mock dependencies
jest.mock('./api.js');
import { fetchData } from './data.js';

3. 🎭 INTEGRATION TESTS:
// Test module interactions
import { UserComponent } from './User.js';

4. 📦 MODULE TESTS:
// Test imports/exports
import * as utils from './utils.js';

🔧 TESTING PATTERNS:

✅ DEPENDENCY INJECTION:
function processData(data, validator = defaultValidator) {
    if (!validator.isValid(data)) throw new Error();
    return transform(data);
}

✅ FACTORY FUNCTIONS:
export function createService(config) {
    return new Service(config);
}

✅ PURE FUNCTIONS:
export function formatUser(user) {
    return \`\${user.firstName} \${user.lastName}\`;
}

📊 EXAMPLES:

// Testable module
export class UserService {
    constructor(apiClient) {
        this.api = apiClient;
    }
    
    async getUser(id) {
        return this.api.get(\`/users/\${id}\`);
    }
}

// Test file
import { UserService } from './UserService.js';
import { MockAPIClient } from './mocks.js';

test('UserService.getUser', async () => {
    const mockAPI = new MockAPIClient();
    const service = new UserService(mockAPI);
    
    const user = await service.getUser(1);
    expect(user.name).toBe('Test User');
});`
    };
    
    content.textContent = practices[topic] || 'Best practice information not available.';
    showNotification(`Showing ${topic} best practices`, 'info');
}

// ========================================
// REAL-WORLD EXAMPLES
// ========================================

function showExample(type) {
    const display = document.getElementById('real-world-example');
    
    const examples = {
        config: `// Configuration Module Example
// File: config/index.js

// Environment detection
export const isDevelopment = process.env.NODE_ENV === 'development';
export const isProduction = process.env.NODE_ENV === 'production';
export const isTest = process.env.NODE_ENV === 'test';

// API configuration
export const API_CONFIG = {
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
    timeout: 10000,
    retries: 3
};

// Feature flags
export const FEATURES = {
    darkMode: process.env.REACT_APP_DARK_MODE === 'true',
    analytics: process.env.REACT_APP_ANALYTICS === 'true',
    betaFeatures: isDevelopment
};

// App configuration
export const APP_CONFIG = {
    name: 'My Application',
    version: '1.0.0',
    description: 'A modern web application'
};

// Default export - main config object
export default {
    ...API_CONFIG,
    ...FEATURES,
    ...APP_CONFIG,
    environment: process.env.NODE_ENV
};

// Usage in other files:
// import config, { API_CONFIG, isDevelopment } from './config/index.js';`,

        api: `// API Service Module Example
// File: services/api.js

// HTTP methods
export const HTTP_METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH'
};

// API endpoints
export const ENDPOINTS = {
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        REFRESH: '/auth/refresh'
    },
    USERS: {
        LIST: '/users',
        DETAIL: (id) => \`/users/\${id}\`,
        CREATE: '/users'
    }
};

// Default export - API client class
export default class APIClient {
    constructor(baseURL = process.env.REACT_APP_API_URL) {
        this.baseURL = baseURL;
        this.token = null;
    }
    
    // Set authentication token
    setToken(token) {
        this.token = token;
    }
    
    // Generic request method
    async request(endpoint, options = {}) {
        const url = \`\${this.baseURL}\${endpoint}\`;
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };
        
        if (this.token) {
            config.headers.Authorization = \`Bearer \${this.token}\`;
        }
        
        try {
            const response = await fetch(url, config);
            
            if (!response.ok) {
                throw new Error(\`HTTP error! status: \${response.status}\`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }
    
    // Convenience methods
    get(endpoint) {
        return this.request(endpoint, { method: HTTP_METHODS.GET });
    }
    
    post(endpoint, data) {
        return this.request(endpoint, {
            method: HTTP_METHODS.POST,
            body: JSON.stringify(data)
        });
    }
    
    put(endpoint, data) {
        return this.request(endpoint, {
            method: HTTP_METHODS.PUT,
            body: JSON.stringify(data)
        });
    }
    
    delete(endpoint) {
        return this.request(endpoint, { method: HTTP_METHODS.DELETE });
    }
}

// Usage:
// import api, { ENDPOINTS, HTTP_METHODS } from './services/api.js';
// const users = await api.get(ENDPOINTS.USERS.LIST);`,

        utils: `// Utility Module Example
// File: utils/index.js

// String utilities
export const stringUtils = {
    capitalize: (str) => str.charAt(0).toUpperCase() + str.slice(1),
    truncate: (str, length) => str.length > length ? str.slice(0, length) + '...' : str,
    slugify: (str) => str.toLowerCase().replace(/\\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
    isValidEmail: (email) => /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)
};

// Date utilities
export const dateUtils = {
    formatDate: (date, format = 'YYYY-MM-DD') => {
        const d = new Date(date);
        return d.toISOString().split('T')[0];
    },
    isToday: (date) => {
        const today = new Date();
        const checkDate = new Date(date);
        return checkDate.toDateString() === today.toDateString();
    },
    addDays: (date, days) => {
        const result = new Date(date);
        result.setDate(result.getDate() + days);
        return result;
    }
};

// Array utilities
export const arrayUtils = {
    unique: (arr) => [...new Set(arr)],
    chunk: (arr, size) => {
        const chunks = [];
        for (let i = 0; i < arr.length; i += size) {
            chunks.push(arr.slice(i, i + size));
        }
        return chunks;
    },
    shuffle: (arr) => {
        const shuffled = [...arr];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
};

// Storage utilities
export const storageUtils = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Failed to save to localStorage:', error);
        }
    },
    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (error) {
            console.error('Failed to read from localStorage:', error);
            return defaultValue;
        }
    },
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Failed to remove from localStorage:', error);
        }
    }
};

// Default export - combined utils object
export default {
    string: stringUtils,
    date: dateUtils,
    array: arrayUtils,
    storage: storageUtils
};

// Usage:
// import utils, { stringUtils, dateUtils } from './utils/index.js';
// const formatted = utils.string.capitalize('hello world');`,

        components: `// React Component Module Example
// File: components/Button/index.js

import React from 'react';
import PropTypes from 'prop-types';

// Styles (could be CSS modules)
import './Button.css';

// Button variants
export const VARIANTS = {
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    DANGER: 'danger',
    SUCCESS: 'success'
};

// Button sizes
export const SIZES = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large'
};

// Default export - Button component
export default function Button({
    children,
    variant = VARIANTS.PRIMARY,
    size = SIZES.MEDIUM,
    disabled = false,
    loading = false,
    onClick,
    className = '',
    ...props
}) {
    const baseClass = 'btn';
    const classes = [
        baseClass,
        \`\${baseClass}--\${variant}\`,
        \`\${baseClass}--\${size}\`,
        disabled && \`\${baseClass}--disabled\`,
        loading && \`\${baseClass}--loading\`,
        className
    ].filter(Boolean).join(' ');

    const handleClick = (event) => {
        if (!disabled && !loading && onClick) {
            onClick(event);
        }
    };

    return (
        <button
            className={classes}
            disabled={disabled || loading}
            onClick={handleClick}
            {...props}
        >
            {loading ? (
                <span className="btn-spinner" />
            ) : (
                children
            )}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(Object.values(VARIANTS)),
    size: PropTypes.oneOf(Object.values(SIZES)),
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string
};

// Named exports for testing and utilities
export { Button };

// Utility function to create button with preset styles
export function createPrimaryButton(children, onClick) {
    return (
        <Button
            variant={VARIANTS.PRIMARY}
            onClick={onClick}
        >
            {children}
        </Button>
    );
}

// Usage:
// import Button, { VARIANTS, createPrimaryButton } from './components/Button/index.js';
// <Button variant={VARIANTS.SUCCESS} onClick={handleClick}>
//     Click me
// </Button>`
    };
    
    display.textContent = examples[type] || 'Example not available.';
    showNotification(`Showing ${type} example`, 'info');
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function showModuleOverview() {
    console.log(`
📦 JavaScript Modules System Overview

🎯 KEY CONCEPTS:
• ES6 Modules (import/export)
• Named vs Default exports
• Dynamic imports
• Module bundling
• Tree shaking
• Code splitting

🔧 IMPORT/EXPORT SYNTAX:
• Named: export const PI = 3.14;
• Default: export default class Calculator {}
• Import: import { PI } from './math.js';
• Dynamic: const module = await import('./module.js');

📊 BENEFITS:
✓ Code organization
✓ Reusability
✓ Maintainability
✓ Tree shaking
✓ Better tooling support

🌐 BROWSER SUPPORT:
• Modern browsers: Full support
• Node.js: Full support (with .mjs)
• Legacy: Need bundlers (Webpack, Rollup)
    `);
}

function setupEventListeners() {
    // Auto-validate module code on input
    document.getElementById('module-code').addEventListener('input', function() {
        if (this.value.trim()) {
            // Debounced validation
            clearTimeout(this.validationTimeout);
            this.validationTimeout = setTimeout(() => {
                validateModuleCode();
            }, 1000);
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter: Execute custom module
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const activeElement = document.activeElement;
            if (activeElement && activeElement.id === 'module-code') {
                e.preventDefault();
                executeCustomModule();
            }
        }
        
        // Ctrl/Cmd + G: Generate template
        if ((e.ctrlKey || e.metaKey) && e.key === 'g') {
            e.preventDefault();
            generateModuleTemplate();
        }
    });
}

console.log("Modules Playground - All systems ready! 📦");
