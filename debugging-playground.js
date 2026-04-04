// ========================================
// DEBUGGING & DEVELOPER TOOLS PLAYGROUND
// ========================================

console.log("Debugging Playground Loaded!");

// Global state
let timers = {};
let performanceMarks = {};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("Debugging Playground initialized!");
    initializePlayground();
});

function initializePlayground() {
    setupEventListeners();
    showDebuggingOverview();
}

// ========================================
// CONSOLE API DEMOS
// ========================================

function switchConsoleTab(tabName) {
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

function demoConsoleLog() {
    const output = document.getElementById('console-output');
    
    // Basic console.log examples
    console.log('Simple log message');
    console.log('Logging variables:', { name: 'John', age: 30 });
    console.log('Logging arrays:', [1, 2, 3, 4, 5]);
    console.log('Logging multiple values:', 'Value 1', 'Value 2', 'Value 3');
    
    output.innerHTML = '<span class="console-log">✅ console.log() examples executed!</span><br>' +
                     '<span class="console-log">Check browser DevTools console for output</span><br><br>' +
                     '<span class="console-log">Examples demonstrated:</span><br>' +
                     '<span class="console-log">• Simple string messages</span><br>' +
                     '<span class="console-log">• Object logging</span><br>' +
                     '<span class="console-log">• Array logging</span><br>' +
                     '<span class="console-log">• Multiple value logging</span>';
    
    showNotification('Console log demo completed', 'success');
}

function demoConsoleWarn() {
    const output = document.getElementById('console-output');
    
    console.warn('This is a warning message');
    console.warn('Deprecated API usage:', 'oldFunction() is deprecated');
    console.warn('Performance warning:', 'Large array detected');
    
    output.innerHTML = '<span class="console-warn">⚠️ console.warn() examples executed!</span><br>' +
                     '<span class="console-warn">Check browser DevTools console for warnings</span><br><br>' +
                     '<span class="console-warn">Use warnings for:</span><br>' +
                     '<span class="console-warn">• Deprecated features</span><br>' +
                     '<span class="console-warn">• Performance issues</span><br>' +
                     '<span class="console-warn">• Potential problems</span>';
    
    showNotification('Console warn demo completed', 'warning');
}

function demoConsoleError() {
    const output = document.getElementById('console-output');
    
    console.error('This is an error message');
    console.error('API call failed:', { status: 404, message: 'Not Found' });
    console.error('Validation error:', new Error('Invalid input'));
    
    output.innerHTML = '<span class="console-error">❌ console.error() examples executed!</span><br>' +
                     '<span class="console-error">Check browser DevTools console for errors</span><br><br>' +
                     '<span class="console-error">Use errors for:</span><br>' +
                     '<span class="console-error">• Critical failures</span><br>' +
                     '<span class="console-error">• API failures</span><br>' +
                     '<span class="console-error">• Validation failures</span>';
    
    showNotification('Console error demo completed', 'error');
}

function demoConsoleInfo() {
    const output = document.getElementById('console-output');
    
    console.info('Application started successfully');
    console.info('User logged in:', { id: 123, name: 'John Doe' });
    console.info('Configuration loaded:', { env: 'production', version: '1.0.0' });
    
    output.innerHTML = '<span class="console-info">ℹ️ console.info() examples executed!</span><br>' +
                     '<span class="console-info">Check browser DevTools console for info messages</span><br><br>' +
                     '<span class="console-info">Use info for:</span><br>' +
                     '<span class="console-info">• Application state</span><br>' +
                     '<span class="console-info">• User actions</span><br>' +
                     '<span class="console-info">• Configuration details</span>';
    
    showNotification('Console info demo completed', 'info');
}

function demoConsoleTable() {
    const output = document.getElementById('console-output');
    
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35 }
    ];
    
    const products = [
        { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics' },
        { id: 2, name: 'Book', price: 19.99, category: 'Education' },
        { id: 3, name: 'Phone', price: 699.99, category: 'Electronics' }
    ];
    
    console.table(users);
    console.table(products, ['name', 'price']);
    
    output.innerHTML = '<span class="console-log">📊 console.table() examples executed!</span><br>' +
                     '<span class="console-log">Check browser DevTools console for tables</span><br><br>' +
                     '<span class="console-log">Tables displayed:</span><br>' +
                     '<span class="console-log">• Users table (all columns)</span><br>' +
                     '<span class="console-log">• Products table (selected columns)</span>';
    
    showNotification('Console table demo completed', 'success');
}

function demoConsoleGroup() {
    const output = document.getElementById('console-output');
    
    console.group('User Authentication');
    console.log('Starting authentication process');
    console.log('User provided credentials');
    console.log('Validating credentials');
    console.group('API Response');
    console.log('Status: 200 OK');
    console.log('Token: abc123xyz');
    console.groupEnd();
    console.log('Authentication successful');
    console.groupEnd();
    
    console.groupCollapsed('Performance Metrics');
    console.log('Page load time: 1.2s');
    console.log('API response time: 200ms');
    console.log('Render time: 50ms');
    console.groupEnd();
    
    output.innerHTML = '<span class="console-log">📁 console.group() examples executed!</span><br>' +
                     '<span class="console-log">Check browser DevTools console for groups</span><br><br>' +
                     '<span class="console-log">Groups created:</span><br>' +
                     '<span class="console-log">• User Authentication (expanded)</span><br>' +
                     '<span class="console-log">• Performance Metrics (collapsed)</span>';
    
    showNotification('Console group demo completed', 'success');
}

function demoConsoleCount() {
    const output = document.getElementById('console-output');
    
    console.count('Button clicks');
    console.count('Button clicks');
    console.count('Form submissions');
    console.count('Button clicks');
    console.count('Form submissions');
    console.count('Form submissions');
    
    output.innerHTML = '<span class="console-log">🔢 console.count() examples executed!</span><br>' +
                     '<span class="console-log">Check browser DevTools console for counts</span><br><br>' +
                     '<span class="console-log">Counters:</span><br>' +
                     '<span class="console-log">• Button clicks: 3</span><br>' +
                     '<span class="console-log">• Form submissions: 3</span>';
    
    showNotification('Console count demo completed', 'success');
}

function demoConsoleClear() {
    const output = document.getElementById('console-output');
    
    console.clear();
    console.log('Console cleared! Fresh start.');
    
    output.innerHTML = '<span class="console-log">🧹 console.clear() executed!</span><br>' +
                     '<span class="console-log">Console has been cleared</span><br>' +
                     '<span class="console-log">Use this to clean up cluttered console</span>';
    
    showNotification('Console cleared', 'info');
}

// ========================================
// ADVANCED CONSOLE METHODS
// ========================================

function demoConsoleTrace() {
    const output = document.getElementById('advanced-output');
    
    function functionA() {
        functionB();
    }
    
    function functionB() {
        functionC();
    }
    
    function functionC() {
        console.trace('Trace from functionC');
    }
    
    functionA();
    
    output.innerHTML = '<span class="console-log">📍 console.trace() executed!</span><br>' +
                     '<span class="console-log">Check DevTools for stack trace</span><br><br>' +
                     '<span class="console-log">Stack trace shows:</span><br>' +
                     '<span class="console-log">• functionC (current)</span><br>' +
                     '<span class="console-log">• functionB (caller)</span><br>' +
                     '<span class="console-log">• functionA (caller of caller)</span>';
    
    showNotification('Console trace demo completed', 'info');
}

function demoConsoleAssert() {
    const output = document.getElementById('advanced-output');
    
    console.assert(1 === 1, 'This will not show');
    console.assert(1 === 2, 'This will show - 1 is not equal to 2');
    console.assert(true, 'This is true, no error');
    console.assert(false, 'This is false, error will show');
    
    output.innerHTML = '<span class="console-log">✅ console.assert() examples executed!</span><br>' +
                     '<span class="console-log">Check DevTools for assertion failures</span><br><br>' +
                     '<span class="console-log">Assertions:</span><br>' +
                     '<span class="console-log">• 1 === 1: Passed (no output)</span><br>' +
                     '<span class="console-log">• 1 === 2: Failed (error shown)</span><br>' +
                     '<span class="console-log">• true: Passed (no output)</span><br>' +
                     '<span class="console-log">• false: Failed (error shown)</span>';
    
    showNotification('Console assert demo completed', 'warning');
}

function demoConsoleDir() {
    const output = document.getElementById('advanced-output');
    
    const user = {
        name: 'John Doe',
        age: 30,
        address: {
            street: '123 Main St',
            city: 'New York',
            country: 'USA'
        },
        hobbies: ['reading', 'coding', 'gaming']
    };
    
    console.dir(user);
    console.dir(document);
    console.dir(window);
    
    output.innerHTML = '<span class="console-log">📂 console.dir() examples executed!</span><br>' +
                     '<span class="console-log">Check DevTools for object hierarchy</span><br><br>' +
                     '<span class="console-log">Objects displayed:</span><br>' +
                     '<span class="console-log">• User object (custom)</span><br>' +
                     '<span class="console-log">• Document object (DOM)</span><br>' +
                     '<span class="console-log">• Window object (global)</span>';
    
    showNotification('Console dir demo completed', 'info');
}

function demoConsoleDirxml() {
    const output = document.getElementById('advanced-output');
    
    console.dirxml(document.body);
    console.dirxml(document.querySelector('h1'));
    console.dirxml(document.createElement('div'));
    
    output.innerHTML = '<span class="console-log">🌲 console.dirxml() examples executed!</span><br>' +
                     '<span class="console-log">Check DevTools for XML/HTML tree</span><br><br>' +
                     '<span class="console-log">Elements displayed:</span><br>' +
                     '<span class="console-log">• Document body</span><br>' +
                     '<span class="console-log">• H1 element</span><br>' +
                     '<span class="console-log">• Created div element</span>';
    
    showNotification('Console dirxml demo completed', 'info');
}

function demoConsoleMemory() {
    const output = document.getElementById('advanced-output');
    
    if (console.memory) {
        console.log('Memory info:', console.memory);
        output.innerHTML = '<span class="console-log">💾 console.memory accessed!</span><br>' +
                         '<span class="console-log">Check DevTools for memory details</span><br><br>' +
                         '<span class="console-log">Memory properties:</span><br>' +
                         '<span class="console-log">• usedJSHeapSize</span><br>' +
                         '<span class="console-log">• totalJSHeapSize</span><br>' +
                         '<span class="console-log">• jsHeapSizeLimit</span>';
    } else {
        output.innerHTML = '<span class="console-warn">⚠️ console.memory not available</span><br>' +
                         '<span class="console-warn">This feature is Chrome-specific</span>';
    }
    
    showNotification('Console memory demo completed', 'info');
}

function demoConsoleProfile() {
    const output = document.getElementById('advanced-output');
    
    console.profile('Performance Test');
    
    // Simulate some work
    let result = 0;
    for (let i = 0; i < 1000000; i++) {
        result += Math.random();
    }
    
    console.profileEnd('Performance Test');
    
    output.innerHTML = '<span class="console-log">📊 console.profile() executed!</span><br>' +
                     '<span class="console-log">Check DevTools Profiles tab</span><br><br>' +
                     '<span class="console-log">Profile created:</span><br>' +
                     '<span class="console-log">• Name: Performance Test</span><br>' +
                     '<span class="console-log">• Duration: ~50ms</span><br>' +
                     '<span class="console-log">• CPU usage recorded</span>';
    
    showNotification('Console profile demo completed', 'success');
}

function demoConsoleTimeEnd() {
    const output = document.getElementById('advanced-output');
    
    console.time('Operation 1');
    setTimeout(() => {
        console.timeEnd('Operation 1');
    }, 100);
    
    console.time('Operation 2');
    setTimeout(() => {
        console.timeEnd('Operation 2');
    }, 200);
    
    output.innerHTML = '<span class="console-log">⏱️ console.timeEnd() examples started!</span><br>' +
                     '<span class="console-log">Check DevTools for timing results</span><br><br>' +
                     '<span class="console-log">Timers started:</span><br>' +
                     '<span class="console-log">• Operation 1 (100ms)</span><br>' +
                     '<span class="console-log">• Operation 2 (200ms)</span>';
    
    showNotification('Console timing demo started', 'info');
}

function demoConsoleKeys() {
    const output = document.getElementById('advanced-output');
    
    const obj = { a: 1, b: 2, c: 3 };
    const arr = ['x', 'y', 'z'];
    
    console.log('Object keys:', Object.keys(obj));
    console.log('Array keys:', Object.keys(arr));
    console.log('Object values:', Object.values(obj));
    console.log('Object entries:', Object.entries(obj));
    
    output.innerHTML = '<span class="console-log">🔑 Object methods demonstrated!</span><br>' +
                     '<span class="console-log">Check DevTools for results</span><br><br>' +
                     '<span class="console-log">Methods shown:</span><br>' +
                     '<span class="console-log">• Object.keys()</span><br>' +
                     '<span class="console-log">• Object.values()</span><br>' +
                     '<span class="console-log">• Object.entries()</span>';
    
    showNotification('Object methods demo completed', 'success');
}

// ========================================
// STRING FORMATTING
// ========================================

function demoStringSubstitution() {
    const output = document.getElementById('formatting-output');
    
    const name = 'John';
    const age = 30;
    const city = 'New York';
    
    console.log('User %s is %d years old and lives in %s', name, age, city);
    console.log('Price: $%.2f', 19.99);
    console.log('Hex: %#x', 255);
    console.log('Object: %o', { name, age, city });
    
    output.innerHTML = '<span class="console-log">📝 String substitution examples!</span><br>' +
                     '<span class="console-log">Check DevTools for formatted output</span><br><br>' +
                     '<span class="console-log">Format specifiers:</span><br>' +
                     '<span class="console-log">• %s - String</span><br>' +
                     '<span class="console-log">• %d - Number (integer)</span><br>' +
                     '<span class="console-log">• %f - Float</span><br>' +
                     '<span class="console-log">• %o - Object</span><br>' +
                     '<span class="console-log">• %#x - Hexadecimal</span>';
    
    showNotification('String formatting demo completed', 'success');
}

function demoCSSStyling() {
    const output = document.getElementById('formatting-output');
    
    console.log('%cThis is styled text!', 'color: red; font-size: 20px; font-weight: bold;');
    console.log('%cSuccess message', 'color: green; background: #e8f5e8; padding: 5px;');
    console.log('%cWarning message', 'color: orange; background: #fff3cd; padding: 5px;');
    console.log('%cError message', 'color: white; background: #f8d7da; padding: 5px; font-weight: bold;');
    
    output.innerHTML = '<span class="console-log">🎨 CSS styling examples!</span><br>' +
                     '<span class="console-log">Check DevTools for styled output</span><br><br>' +
                     '<span class="console-log">Styling applied:</span><br>' +
                     '<span class="console-log">• Red bold text</span><br>' +
                     '<span class="console-log">• Green success message</span><br>' +
                     '<span class="console-log">• Orange warning message</span><br>' +
                     '<span class="console-log">• Red error message</span>';
    
    showNotification('CSS styling demo completed', 'success');
}

function demoObjectFormatting() {
    const output = document.getElementById('formatting-output');
    
    const user = {
        name: 'John Doe',
        age: 30,
        email: 'john@example.com',
        address: {
            street: '123 Main St',
            city: 'New York'
        }
    };
    
    console.log('User object:', user);
    console.log('User JSON:', JSON.stringify(user, null, 2));
    console.dir(user);
    
    output.innerHTML = '<span class="console-log">📋 Object formatting examples!</span><br>' +
                     '<span class="console-log">Check DevTools for object display</span><br><br>' +
                     '<span class="console-log">Formatting methods:</span><br>' +
                     '<span class="console-log">• Default object logging</span><br>' +
                     '<span class="console-log">• JSON.stringify with indentation</span><br>' +
                     '<span class="console-log">• console.dir for hierarchy</span>';
    
    showNotification('Object formatting demo completed', 'success');
}

function demoCustomFormatters() {
    const output = document.getElementById('formatting-output');
    
    // Custom formatter function
    function formatUser(user) {
        return `${user.name} (${user.age}) - ${user.email}`;
    }
    
    const users = [
        { name: 'John', age: 30, email: 'john@example.com' },
        { name: 'Jane', age: 25, email: 'jane@example.com' }
    ];
    
    console.log('Formatted users:');
    users.forEach(user => console.log(formatUser(user)));
    
    output.innerHTML = '<span class="console-log">🔧 Custom formatter examples!</span><br>' +
                     '<span class="console-log">Check DevTools for formatted output</span><br><br>' +
                     '<span class="console-log">Custom formatting:</span><br>' +
                     '<span class="console-log">• User: John (30) - john@example.com</span><br>' +
                     '<span class="console-log">• User: Jane (25) - jane@example.com</span>';
    
    showNotification('Custom formatters demo completed', 'success');
}

// ========================================
// TIMING & PERFORMANCE
// ========================================

function startTimer(name) {
    console.time(name);
    timers[name] = Date.now();
    
    const output = document.getElementById('timing-output');
    output.innerHTML = `<span class="console-info">⏱️ Timer "${name}" started!</span><br>` +
                     `<span class="console-info">Use endTimer() to stop and measure</span>`;
    
    showNotification(`Timer ${name} started`, 'info');
}

function endTimer(name) {
    console.timeEnd(name);
    
    if (timers[name]) {
        const duration = Date.now() - timers[name];
        const output = document.getElementById('timing-output');
        output.innerHTML = `<span class="console-success">⏱️ Timer "${name}" stopped!</span><br>` +
                         `<span class="console-success">Duration: ${duration}ms</span>`;
        delete timers[name];
    }
    
    showNotification(`Timer ${name} ended`, 'success');
}

function demoPerformanceNow() {
    const output = document.getElementById('timing-output');
    
    const start = performance.now();
    
    // Simulate some work
    let result = 0;
    for (let i = 0; i < 100000; i++) {
        result += Math.random();
    }
    
    const end = performance.now();
    const duration = end - start;
    
    console.log(`Operation took ${duration.toFixed(2)} milliseconds`);
    
    output.innerHTML = `<span class="console-log">⚡ performance.now() demo!</span><br>` +
                     `<span class="console-log">Operation duration: ${duration.toFixed(2)}ms</span><br><br>` +
                     `<span class="console-log">performance.now() provides:</span><br>` +
                     `<span class="console-log">• High-resolution timing</span><br>` +
                     `<span class="console-log">• Sub-millisecond precision</span><br>` +
                     `<span class="console-log">• Monotonic clock</span>`;
    
    showNotification('Performance.now demo completed', 'success');
}

function demoMarkMeasure() {
    const output = document.getElementById('timing-output');
    
    performance.mark('start-operation');
    
    // Simulate work
    setTimeout(() => {
        performance.mark('end-operation');
        performance.measure('operation-duration', 'start-operation', 'end-operation');
        
        const measures = performance.getEntriesByName('operation-duration');
        const duration = measures[0].duration;
        
        console.log(`Measured operation: ${duration.toFixed(2)}ms`);
        
        output.innerHTML = `<span class="console-log">📏 Mark & Measure demo!</span><br>` +
                         `<span class="console-log">Operation duration: ${duration.toFixed(2)}ms</span><br><br>` +
                         `<span class="console-log">Steps:</span><br>` +
                         `<span class="console-log">• performance.mark('start')</span><br>` +
                         `<span class="console-log">• performance.mark('end')</span><br>` +
                         `<span class="console-log">• performance.measure()</span>`;
    }, 100);
    
    showNotification('Mark & Measure demo started', 'info');
}

function demoUserTiming() {
    const output = document.getElementById('timing-output');
    
    // Create custom marks
    performance.mark('app-start');
    
    setTimeout(() => {
        performance.mark('data-loaded');
        performance.measure('data-loading-time', 'app-start', 'data-loaded');
        
        setTimeout(() => {
            performance.mark('ui-rendered');
            performance.measure('ui-rendering-time', 'data-loaded', 'ui-rendered');
            performance.measure('total-app-time', 'app-start', 'ui-rendered');
            
            const measures = performance.getEntriesByType('measure');
            
            measures.forEach(measure => {
                console.log(`${measure.name}: ${measure.duration.toFixed(2)}ms`);
            });
            
            output.innerHTML = `<span class="console-log">👤 User Timing API demo!</span><br>` +
                             `<span class="console-log">Multiple measures created</span><br><br>` +
                             `<span class="console-log">Measures:</span><br>` +
                             `<span class="console-log">• data-loading-time</span><br>` +
                             `<span class="console-log">• ui-rendering-time</span><br>` +
                             `<span class="console-log">• total-app-time</span>`;
        }, 50);
    }, 100);
    
    showNotification('User Timing demo started', 'info');
}

// ========================================
// BREAKPOINTS & DEBUGGER
// ========================================

function demoDebuggerStatement() {
    const output = document.getElementById('breakpoint-demo');
    
    function processNumbers(numbers) {
        debugger; // This will pause execution
        const result = numbers.map(n => n * 2);
        debugger; // Another breakpoint
        return result.reduce((sum, n) => sum + n, 0);
    }
    
    const numbers = [1, 2, 3, 4, 5];
    const result = processNumbers(numbers);
    
    output.innerHTML = `<span class="console-log">🛑 Debugger statement demo!</span><br>` +
                     `<span class="console-log">Result: ${result}</span><br><br>` +
                     `<span class="console-log">Debug points:</span><br>` +
                     `<span class="console-log">• Before processing numbers</span><br>` +
                     `<span class="console-log">• After processing numbers</span><br><br>` +
                     `<span class="console-log">Open DevTools to see debugger in action!</span>`;
    
    showNotification('Debugger statement executed', 'info');
}

function demoConditionalBreakpoint() {
    const output = document.getElementById('breakpoint-demo');
    
    function processArray(arr) {
        let sum = 0;
        for (let i = 0; i < arr.length; i++) {
            const value = arr[i];
            
            // Simulate conditional breakpoint
            if (value > 10) {
                console.log(`Found value > 10: ${value}`);
                // In real DevTools, you'd set a conditional breakpoint here
            }
            
            sum += value;
        }
        return sum;
    }
    
    const data = [5, 12, 8, 15, 3, 20, 7];
    const result = processArray(data);
    
    output.innerHTML = `<span class="console-log">🔍 Conditional breakpoint demo!</span><br>` +
                     `<span class="console-log">Result: ${result}</span><br><br>` +
                     `<span class="console-log">Values > 10 found:</span><br>` +
                     `<span class="console-log">• 12</span><br>` +
                     `<span class="console-log">• 15</span><br>` +
                     `<span class="console-log">• 20</span><br><br>` +
                     `<span class="console-log">In DevTools: Right-click line → Add conditional breakpoint</span>`;
    
    showNotification('Conditional breakpoint demo completed', 'info');
}

function demoLogpoint() {
    const output = document.getElementById('breakpoint-demo');
    
    function trackProgress(steps) {
        for (let i = 0; i < steps; i++) {
            // Simulate logpoint - logs without pausing
            console.log(`Step ${i + 1} of ${steps} completed`);
            
            // Simulate work
            Math.random() * 1000;
        }
    }
    
    trackProgress(5);
    
    output.innerHTML = `<span class="console-log">📝 Logpoint demo!</span><br>` +
                     `<span class="console-log">Progress tracked in console</span><br><br>` +
                     `<span class="console-log">Logpoints:</span><br>` +
                     `<span class="console-log">• Log without pausing execution</span><br>` +
                     `<span class="console-log">• Useful for tracking progress</span><br>` +
                     `<span class="console-log">• In DevTools: Right-click → Add logpoint</span>`;
    
    showNotification('Logpoint demo completed', 'info');
}

function demoExceptionBreakpoint() {
    const output = document.getElementById('breakpoint-demo');
    
    function riskyOperation(shouldFail) {
        if (shouldFail) {
            throw new Error('Intentional error for demonstration');
        }
        return 'Operation successful';
    }
    
    try {
        console.log('Trying successful operation...');
        riskyOperation(false);
        
        console.log('Trying failing operation...');
        riskyOperation(true);
    } catch (error) {
        console.log('Caught error:', error.message);
    }
    
    output.innerHTML = `<span class="console-log">🚨 Exception breakpoint demo!</span><br>` +
                     `<span class="console-log">Error handled gracefully</span><br><br>` +
                     `<span class="console-log">Exception breakpoints:</span><br>` +
                     `<span class="console-log">• Pause on uncaught exceptions</span><br>` +
                     `<span class="console-log">• Pause on caught exceptions</span><br>` +
                     `<span class="console-log">• In DevTools: Sources → Pause on exceptions</span>`;
    
    showNotification('Exception breakpoint demo completed', 'warning');
}

function runCodeWithBreakpoints() {
    const condition = document.getElementById('breakpoint-condition').value;
    const loopCount = parseInt(document.getElementById('loop-count').value);
    const output = document.getElementById('breakpoint-demo');
    
    function processData(data) {
        let results = [];
        
        for (let i = 0; i < data.length; i++) {
            const value = data[i];
            
            // Simulate conditional breakpoint
            if (eval(condition.replace(/value/g, value))) {
                console.log(`Condition met at index ${i}: value = ${value}`);
                results.push(`Special: ${value * 2}`);
            } else {
                results.push(value);
            }
        }
        
        return results;
    }
    
    const data = Array.from({ length: loopCount }, (_, i) => i + 1);
    const results = processData(data);
    
    output.innerHTML = `<span class="console-log">🔄 Code executed with breakpoints!</span><br>` +
                     `<span class="console-log">Condition: ${condition}</span><br>` +
                     `<span class="console-log">Loop count: ${loopCount}</span><br>` +
                     `<span class="console-log">Results: ${results.slice(0, 10).join(', ')}${results.length > 10 ? '...' : ''}</span><br><br>` +
                     `<span class="console-log">💡 Set breakpoints in DevTools to step through code!</span>`;
    
    showNotification('Code executed with breakpoints', 'success');
}

// ========================================
// ERROR SIMULATION
// ========================================

function simulateTypeError() {
    const output = document.getElementById('error-output');
    
    try {
        const obj = null;
        obj.property = 'value'; // This will throw TypeError
    } catch (error) {
        console.error('TypeError caught:', error);
        output.innerHTML = `<strong>🚨 TypeError Simulated</strong><br>` +
                         `Error: ${error.message}<br>` +
                         `Stack trace available in console`;
    }
    
    showNotification('TypeError simulated', 'error');
}

function simulateReferenceError() {
    const output = document.getElementById('error-output');
    
    try {
        console.log(undefinedVariable); // This will throw ReferenceError
    } catch (error) {
        console.error('ReferenceError caught:', error);
        output.innerHTML = `<strong>🚨 ReferenceError Simulated</strong><br>` +
                         `Error: ${error.message}<br>` +
                         `Stack trace available in console`;
    }
    
    showNotification('ReferenceError simulated', 'error');
}

function simulateSyntaxError() {
    const output = document.getElementById('error-output');
    
    try {
        // This will cause a syntax error
        eval('const obj = { name: "John", age: 30, '); // Missing closing brace
    } catch (error) {
        console.error('SyntaxError caught:', error);
        output.innerHTML = `<strong>🚨 SyntaxError Simulated</strong><br>` +
                         `Error: ${error.message}<br>` +
                         `Line: ${error.lineNumber || 'N/A'}`;
    }
    
    showNotification('SyntaxError simulated', 'error');
}

function simulateRangeError() {
    const output = document.getElementById('error-output');
    
    try {
        const arr = new Array(-1); // This will throw RangeError
    } catch (error) {
        console.error('RangeError caught:', error);
        output.innerHTML = `<strong>🚨 RangeError Simulated</strong><br>` +
                         `Error: ${error.message}<br>` +
                         `Invalid array length: -1`;
    }
    
    showNotification('RangeError simulated', 'error');
}

function simulateAsyncError() {
    const output = document.getElementById('error-output');
    
    setTimeout(() => {
        try {
            throw new Error('Async error in setTimeout');
        } catch (error) {
            console.error('Async error caught:', error);
            output.innerHTML = `<strong>🚨 Async Error Simulated</strong><br>` +
                             `Error occurred in async operation<br>` +
                             `Error: ${error.message}`;
        }
    }, 100);
    
    showNotification('Async error simulated', 'error');
}

function simulatePromiseRejection() {
    const output = document.getElementById('error-output');
    
    const promise = new Promise((resolve, reject) => {
        reject(new Error('Promise rejected intentionally'));
    });
    
    promise.catch(error => {
        console.error('Promise rejection caught:', error);
        output.innerHTML = `<strong>🚨 Promise Rejection Simulated</strong><br>` +
                         `Error: ${error.message}<br>` +
                         `Promise was rejected and caught`;
    });
    
    showNotification('Promise rejection simulated', 'error');
}

function simulateNetworkError() {
    const output = document.getElementById('error-output');
    
    fetch('https://invalid-url-that-does-not-exist.com/api')
        .catch(error => {
            console.error('Network error caught:', error);
            output.innerHTML = `<strong>🚨 Network Error Simulated</strong><br>` +
                             `Error: ${error.message}<br>` +
                             `Failed to fetch from invalid URL`;
        });
    
    showNotification('Network error simulated', 'error');
}

function simulateCustomError() {
    const output = document.getElementById('error-output');
    
    class CustomError extends Error {
        constructor(message, code) {
            super(message);
            this.name = 'CustomError';
            this.code = code;
        }
    }
    
    try {
        throw new CustomError('This is a custom error', 'ERR_001');
    } catch (error) {
        console.error('Custom error caught:', error);
        output.innerHTML = `<strong>🚨 Custom Error Simulated</strong><br>` +
                         `Error: ${error.message}<br>` +
                         `Code: ${error.code}<br>` +
                         `Type: ${error.name}`;
    }
    
    showNotification('Custom error simulated', 'error');
}

// ========================================
// PERFORMANCE ANALYSIS
// ========================================

function analyzePerformance() {
    const output = document.getElementById('performance-metrics');
    
    // Collect performance metrics
    const navigation = performance.getEntriesByType('navigation')[0];
    const paint = performance.getEntriesByType('paint');
    
    const metrics = {
        'Page Load Time': Math.round(navigation.loadEventEnd - navigation.fetchStart),
        'DOM Content Loaded': Math.round(navigation.domContentLoadedEventEnd - navigation.fetchStart),
        'First Paint': paint.find(p => p.name === 'first-paint')?.startTime || 'N/A',
        'First Contentful Paint': paint.find(p => p.name === 'first-contentful-paint')?.startTime || 'N/A',
        'Time to Interactive': 'N/A', // Requires more complex calculation
        'Total Resources': performance.getEntriesByType('resource').length
    };
    
    let html = '<strong>📊 Performance Metrics</strong><br><br>';
    Object.entries(metrics).forEach(([key, value]) => {
        const formattedValue = typeof value === 'number' ? `${value}ms` : value;
        html += `<strong>${key}:</strong> ${formattedValue}<br>`;
    });
    
    output.innerHTML = html;
    
    console.log('Performance metrics:', metrics);
    showNotification('Performance analysis completed', 'success');
}

function measureFunctionPerformance() {
    const output = document.getElementById('performance-metrics');
    
    // Test different array methods
    const testArray = Array.from({ length: 10000 }, (_, i) => i);
    
    const tests = [
        {
            name: 'for loop',
            fn: () => {
                let sum = 0;
                for (let i = 0; i < testArray.length; i++) {
                    sum += testArray[i];
                }
                return sum;
            }
        },
        {
            name: 'forEach',
            fn: () => {
                let sum = 0;
                testArray.forEach(item => sum += item);
                return sum;
            }
        },
        {
            name: 'reduce',
            fn: () => testArray.reduce((sum, item) => sum + item, 0)
        }
    ];
    
    const results = {};
    
    tests.forEach(test => {
        const start = performance.now();
        test.fn();
        const end = performance.now();
        results[test.name] = (end - start).toFixed(3);
    });
    
    let html = '<strong>⚡ Function Performance Comparison</strong><br><br>';
    Object.entries(results).forEach(([name, time]) => {
        html += `<strong>${name}:</strong> ${time}ms<br>`;
    });
    
    output.innerHTML = html;
    
    console.log('Function performance results:', results);
    showNotification('Function performance measured', 'success');
}

function memoryUsageAnalysis() {
    const output = document.getElementById('performance-metrics');
    
    if (performance.memory) {
        const memory = performance.memory;
        
        const formatBytes = (bytes) => (bytes / 1024 / 1024).toFixed(2) + ' MB';
        
        const memoryInfo = {
            'Used JS Heap Size': formatBytes(memory.usedJSHeapSize),
            'Total JS Heap Size': formatBytes(memory.totalJSHeapSize),
            'JS Heap Size Limit': formatBytes(memory.jsHeapSizeLimit)
        };
        
        let html = '<strong>💾 Memory Usage Analysis</strong><br><br>';
        Object.entries(memoryInfo).forEach(([key, value]) => {
            html += `<strong>${key}:</strong> ${value}<br>`;
        });
        
        output.innerHTML = html;
        
        console.log('Memory usage:', memoryInfo);
    } else {
        output.innerHTML = '<strong>💾 Memory Usage</strong><br><br>Memory API not available in this browser';
    }
    
    showNotification('Memory analysis completed', 'info');
}

function renderingPerformance() {
    const output = document.getElementById('performance-metrics');
    
    // Measure rendering performance
    const startTime = performance.now();
    
    // Create many DOM elements
    const container = document.createElement('div');
    container.style.display = 'none'; // Hide from user
    document.body.appendChild(container);
    
    for (let i = 0; i < 1000; i++) {
        const div = document.createElement('div');
        div.textContent = `Element ${i}`;
        div.className = 'test-element';
        container.appendChild(div);
    }
    
    const renderTime = performance.now() - startTime;
    
    // Clean up
    document.body.removeChild(container);
    
    const renderingInfo = {
        'Elements Created': 1000,
        'Render Time': renderTime.toFixed(2) + 'ms',
        'Time per Element': (renderTime / 1000).toFixed(3) + 'ms'
    };
    
    let html = '<strong>🎨 Rendering Performance</strong><br><br>';
    Object.entries(renderingInfo).forEach(([key, value]) => {
        html += `<strong>${key}:</strong> ${value}<br>`;
    });
    
    output.innerHTML = html;
    
    console.log('Rendering performance:', renderingInfo);
    showNotification('Rendering performance measured', 'success');
}

// ========================================
// DEVELOPER TOOLS GUIDE
// ========================================

function switchToolsTab(tabName) {
    // Update tab appearance
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const activeTab = Array.from(tabs).find(tab => 
        tab.textContent.toLowerCase().includes(tabName)
    );
    if (activeTab) activeTab.classList.add('active');
    
    // Update content visibility
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));
    
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// ========================================
// BEST PRACTICES
// ========================================

function showBestPractice(topic) {
    const content = document.getElementById('best-practice-content');
    
    const practices = {
        logging: `📝 Effective Logging Best Practices

🎯 LOGGING LEVELS:
• ERROR: Critical failures that stop execution
• WARN: Potential issues that don't stop execution
• INFO: Important application state changes
• LOG: General debugging information
• DEBUG: Detailed debugging data

✅ DO'S:
• Use appropriate log levels
• Include context and timestamps
• Log user actions and state changes
• Use structured logging for objects
• Remove debug logs in production

❌ DON'TS:
• Log sensitive information (passwords, tokens)
• Over-log with unnecessary details
• Use console.log for error handling
• Log in hot code paths (performance impact)
• Forget to clean up debug statements

🔧 TECHNIQUES:
// Structured logging
console.log('User action:', { action: 'login', userId: 123, timestamp: Date.now() });

// Conditional logging
const DEBUG = process.env.NODE_ENV === 'development';
if (DEBUG) console.log('Debug info:', data);

// Grouped logging
console.group('API Request');
console.log('URL:', url);
console.log('Method:', method);
console.log('Response:', response);
console.groupEnd();

💡 PRO TIPS:
• Use console.table for arrays of objects
• Implement custom logger for production
• Consider log levels and filtering
• Use source maps for debugging minified code`,

        breakpoints: `⏸️ Strategic Breakpoints Best Practices

🎯 BREAKPOINT TYPES:
• Line Breakpoints: Pause at specific lines
• Conditional Breakpoints: Pause when condition is true
• Logpoints: Log without pausing
• DOM Breakpoints: Pause on DOM changes
• Exception Breakpoints: Pause on errors

✅ STRATEGIC PLACEMENT:
• At function entry points
• Before critical decisions
• In error handling blocks
• At loop boundaries
• Before API calls

🔧 CONDITIONAL BREAKPOINTS:
// Pause only when value is problematic
value > 100
user.id === targetId
response.status >= 400

// Pause on specific conditions
array.length === 0
typeof error !== 'undefined'
performance.now() > 1000

📊 DEBUGGING WORKFLOW:
1. Reproduce the issue
2. Set strategic breakpoints
3. Examine variables and state
4. Step through execution
5. Identify root cause
6. Fix and verify

💡 PRO TIPS:
• Use watch expressions for variables
• Leverage call stack navigation
• Use blackboxing for library code
• Save breakpoints for debugging sessions
• Use inline debugger() for quick pauses`,

        errors: `🚨 Error Handling Best Practices

🎯 ERROR TYPES:
• SyntaxError: Code parsing errors
• ReferenceError: Undefined variables
• TypeError: Type mismatches
• RangeError: Invalid ranges
• CustomError: Application-specific errors

✅ ERROR HANDLING PATTERNS:

// Try-catch for synchronous code
try {
    riskyOperation();
} catch (error) {
    console.error('Operation failed:', error);
    // Handle error gracefully
}

// Promise error handling
promise
    .then(result => processResult(result))
    .catch(error => handleError(error));

// Async/await error handling
async function fetchData() {
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error('Fetch failed:', error);
        throw error; // Re-throw if needed
    }
}

🔧 CUSTOM ERRORS:
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = 'ValidationError';
        this.field = field;
    }
}

📊 ERROR REPORTING:
• Include stack traces
• Add context and user info
• Log to monitoring services
• Provide user-friendly messages
• Implement error boundaries (React)

💡 PRO TIPS:
• Fail fast and loudly
• Provide meaningful error messages
• Log errors with context
• Implement retry mechanisms
• Use error monitoring tools`,

        performance: `📊 Performance Debugging Best Practices

🎯 PERFORMANCE METRICS:
• FCP (First Contentful Paint): First content render
• LCP (Largest Contentful Paint): Largest element render
• FID (First Input Delay): First interaction delay
• CLS (Cumulative Layout Shift): Layout stability
• TTI (Time to Interactive): Interactive state

✅ MEASUREMENT TOOLS:

// Performance API
const navigation = performance.getEntriesByType('navigation')[0];
console.log('Page load time:', navigation.loadEventEnd - navigation.fetchStart);

// User Timing API
performance.mark('feature-start');
// ... feature code ...
performance.mark('feature-end');
performance.measure('feature-duration', 'feature-start', 'feature-end');

// Observer API
const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
        console.log(entry.name, entry.duration);
    });
});
observer.observe({ entryTypes: ['measure', 'navigation'] });

🔧 COMMON BOTTLENECKS:
• Large JavaScript bundles
• Unoptimized images
• Excessive DOM manipulations
• Memory leaks
• Blocking network requests

📊 OPTIMIZATION TECHNIQUES:
• Code splitting and lazy loading
• Image optimization and compression
• Virtual scrolling for large lists
• Debouncing and throttling
• Caching strategies

💡 PRO TIPS:
• Use Lighthouse for audits
• Monitor Core Web Vitals
• Profile JavaScript execution
• Analyze network waterfalls
• Test on real devices`,

        tools: `🔧 DevTools Mastery Best Practices

🎯 ESSENTIAL PANELS:
• Elements: DOM inspection and editing
• Console: Logging and debugging
• Sources: Code debugging and analysis
• Network: Request monitoring
• Performance: Performance profiling
• Application: Storage and debugging

✅ WORKFLOW OPTIMIZATION:

// Console shortcuts
• $0: Last selected element
• $1-$4: Previously selected elements
• $(selector): document.querySelector
• $$(selector): document.querySelectorAll
• inspect(element): Inspect element

// Sources panel shortcuts
• Ctrl+P: Quick file open
• Ctrl+Shift+O: Go to symbol
• Ctrl+G: Go to line
• Ctrl+Shift+F: Search across files

🔧 ADVANCED FEATURES:
• Local overrides for testing
• Workspace for local development
• Device mode for responsive testing
• Throttling for performance testing
• Coverage analysis for unused code

📊 DEBUGGING TECHNIQUES:
• Conditional breakpoints
• Watch expressions
• Call stack analysis
• Scope variable inspection
• Blackboxing library code

💡 PRO TIPS:
• Customize DevTools layout
• Use keyboard shortcuts
• Save workspace configurations
• Install helpful extensions
• Learn command menu (Ctrl+Shift+P)`,

        workflow: `🔄 Systematic Debugging Workflow

🎯 DEBUGGING PROCESS:

1. 📋 REPRODUCE THE ISSUE
   • Identify exact steps
   • Note browser/environment
   • Document expected vs actual behavior
   • Capture screenshots/videos

2. 🔍 INITIAL INVESTIGATION
   • Check console for errors
   • Verify network requests
   • Examine DOM state
   • Review recent changes

3. ⏸️ STRATEGIC BREAKPOINTS
   • Set breakpoints at key points
   • Use conditional breakpoints
   • Add watch expressions
   • Examine call stack

4. 📊 DATA ANALYSIS
   • Inspect variable values
   • Check data types and formats
   • Verify API responses
   • Analyze performance metrics

5. 🐛 ISOLATE THE PROBLEM
   • Binary search approach
   - Comment out sections
   - Test with minimal data
   - Try different inputs

6. 🔧 IMPLEMENT FIX
   • Make minimal changes
   • Test the fix thoroughly
   • Consider edge cases
   • Document the solution

✅ BEST PRACTICES:
• Document your debugging process
• Use version control for changes
• Write tests for fixed issues
• Share knowledge with team
• Learn from each debugging session

🔧 TOOLS AND TECHNIQUES:
• Rubber duck debugging
• Pair programming
• Code reviews
• Automated testing
• Error monitoring systems

💡 PRO TIPS:
• Stay calm and systematic
• Take breaks when stuck
• Keep a debugging journal
• Build mental models
• Practice regularly`
    };
    
    content.textContent = practices[topic] || 'Best practice information not available.';
    showNotification(`Showing ${topic} best practices`, 'info');
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

function showDebuggingOverview() {
    console.log(`
🐛 Debugging & Developer Tools Overview

🎯 KEY CONCEPTS:
• Console API for logging and debugging
• Breakpoints for code execution control
• Error handling and debugging strategies
• Performance analysis and optimization
• Browser DevTools mastery

🔧 ESSENTIAL SKILLS:
• Console logging (log, warn, error, info)
• Breakpoint management
• Stack trace analysis
• Performance profiling
• Network request debugging

📊 DEBUGGING TOOLS:
• Console: Logging and immediate execution
• Sources: Code debugging and breakpoints
• Network: Request/response analysis
• Performance: Performance profiling
• Elements: DOM inspection and editing

💡 BEST PRACTICES:
• Use appropriate log levels
• Set strategic breakpoints
• Handle errors gracefully
• Monitor performance regularly
• Master keyboard shortcuts

🚀 ADVANCED TECHNIQUES:
• Conditional breakpoints
• Performance profiling
• Memory leak detection
• Network throttling
• Source map debugging
    `);
}

function setupEventListeners() {
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Shift + C: Clear console
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            console.clear();
            showNotification('Console cleared', 'info');
        }
        
        // Ctrl/Cmd + Shift + D: Toggle debugger
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
            e.preventDefault();
            debugger;
        }
        
        // F12: Open DevTools (browser dependent)
        if (e.key === 'F12') {
            showNotification('Press F12 to open DevTools', 'info');
        }
    });
    
    // Auto-update performance metrics every 5 seconds
    setInterval(() => {
        if (document.getElementById('performance-metrics').textContent.includes('Performance Metrics')) {
            analyzePerformance();
        }
    }, 5000);
}

console.log("Debugging Playground - All systems ready! 🐛");
