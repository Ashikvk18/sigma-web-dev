// ========================================
// LESSON CONTENT PART 2 — DOM, Events, Async, Error, Advanced, Master
// ========================================

Object.assign(LessonsContent, {

    dom: {
        'dom-intro': {
            content: `<h3>DOM Introduction</h3><div class="content-area"><p>The <strong>Document Object Model (DOM)</strong> is a tree-like representation of your HTML page. JavaScript uses the DOM to read, modify, add, and delete HTML elements.</p><p>The DOM tree starts with <code>document</code> — the root of every web page. Every HTML tag becomes a "node" that JS can interact with.</p><div class="interactive-example"><h4>Try It</h4><div class="code-editor"><textarea id="code-editor-area">console.log("document object:");
console.log("  title:", document.title);
console.log("  URL:", document.URL);
console.log("  body exists:", !!document.body);
console.log("  all elements:", document.all.length);</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What is the DOM?', options: ['A programming language', 'A tree representation of HTML', 'A CSS framework', 'A database'], correct: 1, explanation: 'The DOM is a tree-structured API representing HTML elements as objects.' }]
        },
        'selecting-elements': {
            content: `<h3>Selecting Elements</h3><div class="content-area"><p>Use these methods to find elements:</p><ul><li><code>getElementById('id')</code> — by ID</li><li><code>querySelector('.class')</code> — first CSS match</li><li><code>querySelectorAll('div')</code> — all matches</li></ul><div class="interactive-example"><h4>Try Selectors</h4><div class="code-editor"><textarea id="code-editor-area">const header = document.querySelector('header');
console.log("Header found:", !!header);

const allBtns = document.querySelectorAll('button');
console.log("Buttons on page:", allBtns.length);

const nav = document.querySelector('nav');
console.log("Nav found:", !!nav);

const byId = document.getElementById('app');
console.log("App div:", !!byId);</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What does querySelector return if no match?', options: ['undefined', 'null', 'false', 'Error'], correct: 1, explanation: 'querySelector returns null if no element matches.' }]
        },
        'modifying-elements': {
            content: `<h3>Modifying Elements</h3><div class="content-area"><p>Once you have an element reference, you can change it:</p><ul><li><code>el.textContent</code> — change text</li><li><code>el.innerHTML</code> — change HTML</li><li><code>el.style.color</code> — inline styles</li><li><code>el.classList.add/remove/toggle</code> — manage classes</li></ul><div class="interactive-example"><h4>Modify Elements</h4><div class="code-editor"><textarea id="code-editor-area">// Common DOM modification patterns:
console.log("Text: el.textContent = 'New text'");
console.log("HTML: el.innerHTML = '<b>Bold</b>'");
console.log("Style: el.style.color = 'red'");
console.log("Class: el.classList.add('active')");
console.log("Class: el.classList.toggle('hidden')");
console.log("Attr: el.setAttribute('title', 'Hi')");
console.log("Data: el.dataset.id = '42'");

// Live example
const output = document.getElementById('code-output');
if (output) {
    console.log("Output element tag:", output.tagName);
}</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'Difference between textContent and innerHTML?', options: ['No difference', 'textContent = text, innerHTML = HTML', 'innerHTML is faster', 'textContent can set HTML'], correct: 1, explanation: 'textContent sets plain text (safe). innerHTML parses HTML tags.' }]
        },
        'creating-elements': {
            content: `<h3>Creating Elements</h3><div class="content-area"><p>Create new elements and add them to the page:</p><div class="interactive-example"><h4>Creating Elements</h4><div class="code-editor"><textarea id="code-editor-area">// Step-by-step process:
console.log("1. const el = document.createElement('div')");
console.log("2. el.textContent = 'Hello'");
console.log("3. el.classList.add('card')");
console.log("4. parent.appendChild(el)");
console.log("");
console.log("Other useful methods:");
console.log("  parent.insertBefore(el, ref)");
console.log("  el.remove()");
console.log("  parent.replaceChild(newEl, oldEl)");
console.log("  el.cloneNode(true)");

// Template literal approach
const cardHTML = '<div class="card"><h3>Title</h3></div>';
console.log("innerHTML approach:", cardHTML);</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'Which method creates a new element?', options: ['document.newElement()', 'document.createElement()', 'document.addElement()', 'Element.create()'], correct: 1, explanation: 'document.createElement("tag") creates a new element.' }]
        },
        practice: {
            content: `<h3>Practice: DOM Manipulation</h3><div class="content-area"><div class="challenge-task"><strong>Challenge:</strong> Write code to create a list of items programmatically.</div><div class="interactive-example"><h4>Code Editor</h4><div class="code-editor"><textarea id="code-editor-area">const items = ["Learn HTML", "Learn CSS", "Learn JS", "Build Projects", "Get Hired"];

console.log("Building a list:");
items.forEach((item, i) => {
    console.log("  " + (i+1) + ". " + item);
});

// Real code would be:
// const ul = document.createElement('ul');
// items.forEach(item => {
//     const li = document.createElement('li');
//     li.textContent = item;
//     ul.appendChild(li);
// });
// document.body.appendChild(ul);
console.log("List created with", items.length, "items");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What does el.remove() do?', options: ['Hides element', 'Removes from DOM', 'Clears content', 'Disables it'], correct: 1, explanation: 'el.remove() completely removes the element from the DOM tree.' }]
        }
    },

    events: {
        'events-intro': {
            content: `<h3>Introduction to Events</h3><div class="content-area"><p>Events are <strong>actions that happen on the page</strong> — clicks, key presses, mouse moves, etc. JavaScript can "listen" for these and respond.</p><div class="interactive-example"><h4>Event Types</h4><div class="code-editor"><textarea id="code-editor-area">const events = [
    "click — user clicks an element",
    "dblclick — double click",
    "keydown — key pressed",
    "keyup — key released",
    "submit — form submitted",
    "input — input value changes",
    "mouseover — mouse enters element",
    "mouseout — mouse leaves element",
    "scroll — user scrolls",
    "load — page finished loading",
    "resize — window resized"
];
events.forEach(e => console.log(e));</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What is an event in JavaScript?', options: ['A function call', 'An action the browser detects', 'A variable type', 'A CSS animation'], correct: 1, explanation: 'Events are actions like clicks or key presses that the browser detects.' }]
        },
        'event-listeners': {
            content: `<h3>Event Listeners</h3><div class="content-area"><p>Use <code>addEventListener()</code> to respond to events:</p><pre class="syntax-block">element.addEventListener('eventType', callback);</pre><div class="interactive-example"><h4>Event Listener Patterns</h4><div class="code-editor"><textarea id="code-editor-area">// Pattern 1: Named function
function handleClick(event) {
    console.log("Clicked!", event.type);
}

// Pattern 2: Arrow function
// btn.addEventListener('click', (e) => {
//     console.log("Target:", e.target.tagName);
//     console.log("Position:", e.clientX, e.clientY);
// });

// Remove listener
// btn.removeEventListener('click', handleClick);

console.log("addEventListener(type, callback)");
console.log("The event object has:");
console.log("  e.type — event name");
console.log("  e.target — element that triggered");
console.log("  e.clientX/Y — mouse position");
console.log("  e.key — key pressed (keyboard)");
console.log("  e.preventDefault() — stop default");
console.log("  e.stopPropagation() — stop bubbling");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What does the event object contain?', options: ['Element HTML', 'Details about the event', 'The callback function', 'CSS styles'], correct: 1, explanation: 'The event object has type, target, position, key, and utility methods.' }]
        },
        'event-types': {
            content: `<h3>Common Event Types</h3><div class="content-area"><table class="data-table"><tr><th>Category</th><th>Events</th></tr><tr><td>Mouse</td><td>click, dblclick, mouseover, mouseout</td></tr><tr><td>Keyboard</td><td>keydown, keyup</td></tr><tr><td>Form</td><td>submit, change, input, focus, blur</td></tr><tr><td>Window</td><td>load, resize, scroll</td></tr></table><div class="interactive-example"><h4>Event Delegation & Bubbling</h4><div class="code-editor"><textarea id="code-editor-area">// Event Delegation — listen on parent
// parent.addEventListener('click', (e) => {
//     if (e.target.matches('.btn')) {
//         console.log('Button:', e.target.textContent);
//     }
// });

// Prevent default behavior
// form.addEventListener('submit', (e) => {
//     e.preventDefault();
//     // handle form without page reload
// });

console.log("Event Bubbling:");
console.log("  click on child -> parent also hears it");
console.log("");
console.log("Event Delegation:");
console.log("  listen on parent, filter by e.target");
console.log("");
console.log("Useful methods:");
console.log("  e.preventDefault() — stop default action");
console.log("  e.stopPropagation() — stop bubbling");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What does e.preventDefault() do?', options: ['Removes listener', 'Stops default browser action', 'Prevents future events', 'Deletes element'], correct: 1, explanation: 'preventDefault() stops the default action like form submission page reload.' }]
        },
        practice: {
            content: `<h3>Practice: Events</h3><div class="content-area"><div class="challenge-task"><strong>Challenge:</strong> Describe how to build a click counter.</div><div class="interactive-example"><h4>Code Editor</h4><div class="code-editor"><textarea id="code-editor-area">// Click counter pattern:
console.log("let count = 0;");
console.log("const btn = document.getElementById('btn');");
console.log("const display = document.getElementById('count');");
console.log("");
console.log("btn.addEventListener('click', () => {");
console.log("    count++;");
console.log("    display.textContent = count;");
console.log("});");
console.log("");

// Keyboard events
console.log("Keyboard listener:");
console.log("document.addEventListener('keydown', (e) => {");
console.log("    console.log('Key:', e.key, 'Code:', e.code);");
console.log("});");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What is event delegation?', options: ['Assigning events to vars', 'Listening on parent, filtering by target', 'Delegating to other pages', 'Using setTimeout'], correct: 1, explanation: 'Event delegation: one listener on parent, use e.target to determine which child.' }]
        }
    },

    async: {
        callbacks: {
            content: `<h3>Callbacks</h3><div class="content-area"><p>A <strong>callback</strong> is a function passed as an argument to be called later.</p><div class="interactive-example"><h4>Callback Examples</h4><div class="code-editor"><textarea id="code-editor-area">// Simple callback
function doMath(a, b, operation) {
    return operation(a, b);
}
console.log("Add:", doMath(5, 3, (a, b) => a + b));
console.log("Multiply:", doMath(5, 3, (a, b) => a * b));

// Simulated async callback
function fetchData(callback) {
    console.log("Fetching data...");
    callback({ name: "Alice", age: 25 });
}
fetchData((data) => {
    console.log("Got data:", data);
});

console.log("Problem: nested callbacks = callback hell!");
console.log("Solution: Promises and async/await!");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What is a callback?', options: ['Function that calls itself', 'Function passed as argument for later', 'Function that returns value', 'Built-in function'], correct: 1, explanation: 'A callback is passed to another function to be executed later.' }]
        },
        promises: {
            content: `<h3>Promises</h3><div class="content-area"><p>A <strong>Promise</strong> represents a value available now, later, or never. States: pending, fulfilled, rejected.</p><div class="interactive-example"><h4>Promise Examples</h4><div class="code-editor"><textarea id="code-editor-area">const myPromise = new Promise((resolve, reject) => {
    const success = true;
    if (success) resolve("Data loaded!");
    else reject("Error occurred");
});

myPromise
    .then(data => console.log("Success:", data))
    .catch(err => console.log("Error:", err));

// Promise.all — wait for multiple
const p1 = Promise.resolve("First");
const p2 = Promise.resolve("Second");
Promise.all([p1, p2]).then(results => {
    console.log("All done:", results);
});

// Promise.race — first to finish
Promise.race([
    Promise.resolve("Fast"),
    new Promise(r => setTimeout(() => r("Slow"), 100))
]).then(r => console.log("Race winner:", r));</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'Promise states?', options: ['start, middle, end', 'pending, fulfilled, rejected', 'open, closed, error', 'waiting, done, failed'], correct: 1, explanation: 'A Promise is pending, fulfilled (resolved), or rejected (failed).' }]
        },
        'async-await': {
            content: `<h3>Async/Await</h3><div class="content-area"><p><code>async/await</code> makes Promises look like synchronous code!</p><div class="interactive-example"><h4>Async/Await</h4><div class="code-editor"><textarea id="code-editor-area">async function getData() {
    return "Hello from async!";
}
getData().then(val => console.log(val));

async function fetchUser() {
    const user = await Promise.resolve({
        name: "Alice", role: "dev"
    });
    console.log("User:", user);
    return user;
}
fetchUser();

// Error handling
async function safeFetch() {
    try {
        const data = await Promise.resolve("Success!");
        console.log(data);
    } catch (error) {
        console.log("Error:", error);
    }
}
safeFetch();</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What does await do?', options: ['Skips the line', 'Pauses until Promise resolves', 'Creates a Promise', 'Catches errors'], correct: 1, explanation: 'await pauses the async function until the Promise settles.' }]
        },
        practice: {
            content: `<h3>Practice: Async JavaScript</h3><div class="content-area"><div class="challenge-task"><strong>Challenge:</strong> Create an async function with simulated delay.</div><div class="interactive-example"><h4>Code Editor</h4><div class="code-editor"><textarea id="code-editor-area">function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function loadData() {
    console.log("Loading...");
    await delay(100);
    console.log("Data ready!");
    return [1, 2, 3, 4, 5];
}

loadData().then(data => console.log("Result:", data));</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'Can you use await outside async?', options: ['Yes, anywhere', 'Only at top level of modules', 'No, never', 'Only in callbacks'], correct: 1, explanation: 'Top-level await is allowed in ES modules only.' }]
        }
    },

    error: {
        'error-types': {
            content: `<h3>Error Types</h3><div class="content-area"><p>JavaScript built-in error types:</p><ul><li><code>SyntaxError</code> — invalid syntax</li><li><code>ReferenceError</code> — undefined variable</li><li><code>TypeError</code> — wrong type operation</li><li><code>RangeError</code> — value out of range</li></ul><div class="interactive-example"><h4>Error Examples</h4><div class="code-editor"><textarea id="code-editor-area">// Demonstrating error types
try { eval("let x = ;"); } catch(e) { console.log("SyntaxError:", e.message); }

try { console.log(nonExistentVar); } catch(e) { console.log("ReferenceError:", e.message); }

try { null.toString(); } catch(e) { console.log("TypeError:", e.message); }

try { (1).toFixed(200); } catch(e) { console.log("RangeError:", e.message); }

console.log("\\nAll caught! Program continues.");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'Error for undeclared variable?', options: ['TypeError', 'SyntaxError', 'ReferenceError', 'RangeError'], correct: 2, explanation: 'ReferenceError occurs when using an undeclared variable.' }]
        },
        'try-catch': {
            content: `<h3>Try-Catch Blocks</h3><div class="content-area"><p><code>try...catch</code> handles errors gracefully without crashing.</p><div class="interactive-example"><h4>Error Handling</h4><div class="code-editor"><textarea id="code-editor-area">try {
    let result = JSON.parse("invalid json");
} catch (error) {
    console.log("Caught:", error.message);
}

// try-catch-finally
try {
    console.log("Trying...");
    let x = 10 / 2;
    console.log("Result:", x);
} catch (error) {
    console.log("Error:", error.message);
} finally {
    console.log("Finally ALWAYS runs!");
}

console.log("Program continues!");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'When does finally run?', options: ['Only on success', 'Only on error', 'Always', 'Never'], correct: 2, explanation: 'finally always runs regardless of try/catch outcome.' }]
        },
        'throwing-errors': {
            content: `<h3>Throwing Errors</h3><div class="content-area"><p>Create and throw your own errors with <code>throw</code>:</p><div class="interactive-example"><h4>Custom Errors</h4><div class="code-editor"><textarea id="code-editor-area">function divide(a, b) {
    if (b === 0) throw new Error("Division by zero!");
    return a / b;
}

try {
    console.log(divide(10, 2));
    console.log(divide(10, 0));
} catch (e) {
    console.log("Caught:", e.message);
}

// Custom error class
class ValidationError extends Error {
    constructor(field, message) {
        super(message);
        this.field = field;
    }
}

try {
    throw new ValidationError("email", "Invalid email");
} catch (e) {
    console.log(e.field + ":", e.message);
}</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What does throw do?', options: ['Deletes variable', 'Creates and triggers an error', 'Exits program', 'Logs to console'], correct: 1, explanation: 'throw creates an error caught by the nearest try-catch.' }]
        },
        practice: {
            content: `<h3>Practice: Error Handling</h3><div class="content-area"><div class="challenge-task"><strong>Challenge:</strong> Write a safe JSON parser with fallback.</div><div class="interactive-example"><h4>Code Editor</h4><div class="code-editor"><textarea id="code-editor-area">function safeParseJSON(str, fallback = null) {
    try {
        return JSON.parse(str);
    } catch (e) {
        console.log("Parse failed:", e.message);
        return fallback;
    }
}

console.log(safeParseJSON('{"name":"Alice"}'));
console.log(safeParseJSON('invalid', { error: true }));
console.log(safeParseJSON('123'));</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'Why is error handling important?', options: ['Makes code faster', 'Prevents crashes, provides fallbacks', 'Required by JavaScript', 'Only for production'], correct: 1, explanation: 'Error handling prevents crashes and provides graceful fallback behavior.' }]
        }
    },

    // ========================================
    // ADVANCED WORLD
    // ========================================

    patterns: {
        'patterns-intro': {
            content: `<h3>Introduction to Design Patterns</h3><div class="content-area"><p>Design patterns are <strong>reusable solutions to common problems</strong>. Three categories:</p><ul><li><strong>Creational</strong> — creating objects</li><li><strong>Structural</strong> — composing objects</li><li><strong>Behavioral</strong> — communication between objects</li></ul><div class="interactive-example"><h4>Why Patterns?</h4><div class="code-editor"><textarea id="code-editor-area">console.log("Design patterns help you:");
console.log("1. Write maintainable code");
console.log("2. Communicate with other devs");
console.log("3. Solve common problems efficiently");
console.log("4. Avoid reinventing the wheel");
console.log("");
console.log("Categories:");
console.log("  Creational — Singleton, Factory, Builder");
console.log("  Structural — Module, Decorator, Adapter");
console.log("  Behavioral — Observer, Strategy, Command");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What are design patterns?', options: ['CSS layouts', 'Reusable solutions to common problems', 'Built-in functions', 'Testing frameworks'], correct: 1, explanation: 'Design patterns are proven solutions to recurring problems.' }]
        },
        creational: {
            content: `<h3>Creational Patterns</h3><div class="content-area"><p>Creational patterns deal with <strong>object creation</strong>.</p><div class="interactive-example"><h4>Singleton & Factory</h4><div class="code-editor"><textarea id="code-editor-area">// Singleton — one instance only
class Database {
    constructor() {
        if (Database.instance) return Database.instance;
        this.connection = "connected";
        Database.instance = this;
    }
}
const db1 = new Database();
const db2 = new Database();
console.log("Same instance?", db1 === db2);

// Factory — create without specifying class
function createUser(type) {
    if (type === "admin") return { role: "admin", perms: "all" };
    return { role: "user", perms: "limited" };
}
console.log(createUser("admin"));
console.log(createUser("guest"));</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What does Singleton ensure?', options: ['Multiple instances', 'Only one instance exists', 'Fast creation', 'Immutable objects'], correct: 1, explanation: 'Singleton ensures only one instance of a class exists.' }]
        },
        structural: {
            content: `<h3>Structural Patterns</h3><div class="content-area"><p>Structural patterns organize <strong>relationships between objects</strong>.</p><div class="interactive-example"><h4>Module Pattern</h4><div class="code-editor"><textarea id="code-editor-area">// Module — encapsulate private data
const Counter = (() => {
    let count = 0; // private!
    return {
        increment() { count++; },
        decrement() { count--; },
        getCount() { return count; }
    };
})();

Counter.increment();
Counter.increment();
Counter.increment();
console.log("Count:", Counter.getCount());
// count is not accessible directly!</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What does Module pattern provide?', options: ['Faster code', 'Encapsulation of private data', 'Auto testing', 'DB access'], correct: 1, explanation: 'Module pattern uses closures to create private variables.' }]
        },
        behavioral: {
            content: `<h3>Behavioral Patterns</h3><div class="content-area"><p>Behavioral patterns manage <strong>communication between objects</strong>.</p><div class="interactive-example"><h4>Observer Pattern</h4><div class="code-editor"><textarea id="code-editor-area">class EventEmitter {
    constructor() { this.events = {}; }
    on(event, fn) {
        if (!this.events[event]) this.events[event] = [];
        this.events[event].push(fn);
    }
    emit(event, data) {
        (this.events[event] || []).forEach(fn => fn(data));
    }
}

const bus = new EventEmitter();
bus.on('message', data => console.log("Received:", data));
bus.on('message', data => console.log("Also got:", data));
bus.emit('message', 'Hello World!');</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What does Observer pattern do?', options: ['Watches for errors', 'Notifies subscribers on state change', 'Observes performance', 'Monitors memory'], correct: 1, explanation: 'Observer lets objects subscribe to events and get notified.' }]
        },
        practice: {
            content: `<h3>Practice: Design Patterns</h3><div class="content-area"><div class="challenge-task"><strong>Challenge:</strong> Build a simple pub/sub system.</div><div class="interactive-example"><h4>Code Editor</h4><div class="code-editor"><textarea id="code-editor-area">const PubSub = {
    events: {},
    subscribe(e, fn) {
        (this.events[e] = this.events[e] || []).push(fn);
    },
    publish(e, data) {
        (this.events[e] || []).forEach(fn => fn(data));
    }
};

PubSub.subscribe('login', user => console.log('Welcome,', user));
PubSub.subscribe('login', user => console.log('Logged:', user));
PubSub.publish('login', 'Alice');</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'addEventListener is based on which pattern?', options: ['Singleton', 'Factory', 'Observer', 'Module'], correct: 2, explanation: 'addEventListener is an implementation of the Observer pattern.' }]
        }
    },

    modules: {
        'modules-intro': {
            content: `<h3>Module Introduction</h3><div class="content-area"><p>Modules split code into <strong>separate files</strong> with import/export.</p><div class="interactive-example"><h4>Why Modules?</h4><div class="code-editor"><textarea id="code-editor-area">console.log("Benefits of modules:");
console.log("1. Code organization — separate concerns");
console.log("2. Reusability — import anywhere");
console.log("3. Namespace isolation — no collisions");
console.log("4. Dependency management — clear deps");
console.log("5. Tree shaking — remove unused code");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'Main benefit of modules?', options: ['Faster execution', 'Organization and reusability', 'Better styling', 'Auto testing'], correct: 1, explanation: 'Modules help organize code into files with clear interfaces.' }]
        },
        'import-export': {
            content: `<h3>Import/Export</h3><div class="content-area"><p>ES6 modules use <code>export</code> and <code>import</code>:</p><div class="interactive-example"><h4>Module Syntax</h4><div class="code-editor"><textarea id="code-editor-area">// Named exports (math.js)
// export const add = (a, b) => a + b;
// export const multiply = (a, b) => a * b;

// Default export (Logger.js)
// export default class Logger { ... }

// Importing
// import { add, multiply } from './math.js';
// import Logger from './Logger.js';
// import * as math from './math.js';

console.log("Named: export const fn = ...");
console.log("Default: export default ...");
console.log("Import named: import { fn } from '...'");
console.log("Import default: import Name from '...'");
console.log("Import all: import * as mod from '...'");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'How many default exports per module?', options: ['Unlimited', 'Only one', 'Two', 'None'], correct: 1, explanation: 'A module can have only ONE default export.' }]
        },
        commonjs: {
            content: `<h3>CommonJS Modules</h3><div class="content-area"><p>CommonJS is Node.js's module system: <code>require()</code> and <code>module.exports</code>.</p><div class="interactive-example"><h4>CommonJS vs ES Modules</h4><div class="code-editor"><textarea id="code-editor-area">console.log("CommonJS (Node.js original):");
console.log("  const fs = require('fs');");
console.log("  module.exports = { myFn };");
console.log("");
console.log("ES Modules (modern standard):");
console.log("  import fs from 'fs';");
console.log("  export { myFn };");
console.log("");
console.log("Key differences:");
console.log("  CJS: synchronous, dynamic");
console.log("  ESM: async, static (tree-shakeable)");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'Node.js original module system?', options: ['ES Modules', 'CommonJS', 'AMD', 'UMD'], correct: 1, explanation: 'Node.js was built with CommonJS. ES module support came later.' }]
        },
        practice: {
            content: `<h3>Practice: Modules</h3><div class="content-area"><div class="challenge-task"><strong>Challenge:</strong> Structure a utility library with modules.</div><div class="interactive-example"><h4>Code Editor</h4><div class="code-editor"><textarea id="code-editor-area">// Barrel export pattern:
// utils/math.js — export const add = ...
// utils/string.js — export const capitalize = ...
// utils/index.js — re-export everything

console.log("File structure:");
console.log("  utils/");
console.log("    math.js    — export { add, subtract }");
console.log("    string.js  — export { capitalize }");
console.log("    index.js   — re-export all");
console.log("");
console.log("Usage: import { add, capitalize } from './utils'");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What is a barrel export?', options: ['A large file', 'Re-exporting from index file', 'Exporting everything', 'Node.js feature'], correct: 1, explanation: 'Barrel: index.js re-exports from multiple files for clean imports.' }]
        }
    },

    apis: {
        'apis-intro': {
            content: `<h3>API Introduction</h3><div class="content-area"><p>APIs let code interact with <strong>external services and browser features</strong>.</p><div class="interactive-example"><h4>Types of APIs</h4><div class="code-editor"><textarea id="code-editor-area">console.log("Browser APIs (built-in):");
console.log("  fetch() — HTTP requests");
console.log("  localStorage — persistent storage");
console.log("  setTimeout — timers");
console.log("  Geolocation, Canvas, Audio...");
console.log("");
console.log("Third-party APIs:");
console.log("  REST APIs (JSON over HTTP)");
console.log("  GraphQL APIs");
console.log("  WebSocket APIs (real-time)");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What does API stand for?', options: ['Advanced Programming Interface', 'Application Programming Interface', 'Automated Program Integration', 'Application Protocol Interface'], correct: 1, explanation: 'API = Application Programming Interface.' }]
        },
        fetch: {
            content: `<h3>Fetch API</h3><div class="content-area"><p><code>fetch()</code> makes HTTP requests to load data.</p><div class="interactive-example"><h4>Fetch Examples</h4><div class="code-editor"><textarea id="code-editor-area">// GET request
// const res = await fetch('https://api.example.com/data');
// const data = await res.json();

// POST request
// await fetch('/api/users', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({ name: 'Alice' })
// });

console.log("fetch(url) — returns Promise<Response>");
console.log("res.json() — parse JSON body");
console.log("res.text() — get as text");
console.log("res.ok — true if 200-299");
console.log("res.status — HTTP status code");
console.log("res.headers — response headers");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What does fetch() return?', options: ['Data directly', 'A Promise', 'A callback', 'An event'], correct: 1, explanation: 'fetch() returns a Promise that resolves to a Response.' }]
        },
        storage: {
            content: `<h3>Storage APIs</h3><div class="content-area"><p>Browser storage for saving data client-side:</p><div class="interactive-example"><h4>localStorage</h4><div class="code-editor"><textarea id="code-editor-area">// localStorage — persists across sessions
localStorage.setItem('demo_user', 'Alice');
console.log("Saved:", localStorage.getItem('demo_user'));

// Store objects as JSON
const settings = { theme: 'dark', lang: 'en' };
localStorage.setItem('demo_settings', JSON.stringify(settings));
const loaded = JSON.parse(localStorage.getItem('demo_settings'));
console.log("Settings:", loaded);

// Cleanup
localStorage.removeItem('demo_user');
localStorage.removeItem('demo_settings');
console.log("Cleaned up!");

console.log("localStorage: persists forever");
console.log("sessionStorage: cleared on tab close");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'localStorage vs sessionStorage?', options: ['No difference', 'localStorage persists, session clears on tab close', 'sessionStorage is faster', 'localStorage has more space'], correct: 1, explanation: 'localStorage persists. sessionStorage clears when the tab closes.' }]
        },
        practice: {
            content: `<h3>Practice: Browser APIs</h3><div class="content-area"><div class="challenge-task"><strong>Challenge:</strong> Save and load a counter with localStorage.</div><div class="interactive-example"><h4>Code Editor</h4><div class="code-editor"><textarea id="code-editor-area">// Persistent counter
let count = parseInt(localStorage.getItem('practiceCounter') || '0');
count++;
localStorage.setItem('practiceCounter', count.toString());
console.log("Counter:", count, "(refresh to increment!)");

// To reset:
// localStorage.removeItem('practiceCounter');</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'Can localStorage store objects directly?', options: ['Yes', 'No, use JSON.stringify first', 'Only arrays', 'Only if small'], correct: 1, explanation: 'localStorage only stores strings. Use JSON.stringify/parse.' }]
        }
    },

    performance: {
        'performance-intro': {
            content: `<h3>Performance Basics</h3><div class="content-area"><p>Writing fast JS means understanding <strong>what causes slowdowns</strong>.</p><div class="interactive-example"><h4>Performance Concepts</h4><div class="code-editor"><textarea id="code-editor-area">console.log("Performance bottlenecks:");
console.log("1. DOM manipulation (reflows/repaints)");
console.log("2. Large loops & heavy computation");
console.log("3. Memory leaks (event listeners)");
console.log("4. Blocking the main thread");
console.log("5. Excessive network requests");
console.log("");

// Measuring performance
const start = performance.now();
let sum = 0;
for (let i = 0; i < 1000000; i++) sum += i;
const end = performance.now();
console.log("Sum of 1M numbers:", sum);
console.log("Time:", (end - start).toFixed(2), "ms");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'Biggest cause of DOM slowness?', options: ['Reading DOM', 'Reflows and repaints', 'Adding listeners', 'Using IDs'], correct: 1, explanation: 'Reflows (layout recalculation) and repaints are the most expensive DOM operations.' }]
        },
        optimization: {
            content: `<h3>Optimization Techniques</h3><div class="content-area"><p>Common techniques to speed up JavaScript:</p><div class="interactive-example"><h4>Optimization Examples</h4><div class="code-editor"><textarea id="code-editor-area">// 1. Debounce — limit rapid function calls
function debounce(fn, ms) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), ms);
    };
}
const search = debounce(q => console.log("Search:", q), 300);
search("h"); search("he"); search("hello");
// Only "hello" will log (after 300ms)

// 2. Cache expensive calculations
const cache = {};
function expensiveCalc(n) {
    if (cache[n]) return cache[n];
    let result = 0;
    for (let i = 0; i < n; i++) result += i;
    cache[n] = result;
    return result;
}
console.log(expensiveCalc(10000));
console.log("Cached:", expensiveCalc(10000));

// 3. Use document fragments for batch DOM
console.log("DocumentFragment batches DOM writes");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What does debounce do?', options: ['Speeds up functions', 'Limits rapid calls to one after delay', 'Caches results', 'Runs code in parallel'], correct: 1, explanation: 'Debounce waits until calls stop, then executes once.' }]
        },
        tools: {
            content: `<h3>Performance Tools</h3><div class="content-area"><p>Browser DevTools help you measure and improve performance:</p><div class="interactive-example"><h4>Performance API</h4><div class="code-editor"><textarea id="code-editor-area">console.log("Chrome DevTools tabs:");
console.log("  Performance — record & analyze");
console.log("  Memory — heap snapshots");
console.log("  Network — request timing");
console.log("  Lighthouse — overall audit");
console.log("");

// Performance API
console.time("loop");
let arr = [];
for (let i = 0; i < 100000; i++) arr.push(i);
console.timeEnd("loop");

// Memory-friendly: avoid creating closures in loops
console.log("Tip: Reuse objects, avoid closures in loops");
console.log("Tip: Use requestAnimationFrame for animations");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'Which tool audits web performance?', options: ['console.log', 'Lighthouse', 'ESLint', 'Prettier'], correct: 1, explanation: 'Lighthouse is Chrome\'s built-in tool for auditing performance, accessibility, etc.' }]
        },
        practice: {
            content: `<h3>Practice: Performance</h3><div class="content-area"><div class="challenge-task"><strong>Challenge:</strong> Implement a memoize function.</div><div class="interactive-example"><h4>Code Editor</h4><div class="code-editor"><textarea id="code-editor-area">function memoize(fn) {
    const cache = new Map();
    return function(...args) {
        const key = JSON.stringify(args);
        if (cache.has(key)) return cache.get(key);
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
}

const factorial = memoize(function f(n) {
    return n <= 1 ? 1 : n * f(n - 1);
});

console.time("first");
console.log("10! =", factorial(10));
console.timeEnd("first");

console.time("cached");
console.log("10! =", factorial(10));
console.timeEnd("cached");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What is memoization?', options: ['Memorizing code', 'Caching function results', 'Creating memories', 'Logging output'], correct: 1, explanation: 'Memoization caches function results to avoid recalculation.' }]
        }
    },

    testing: {
        'testing-intro': {
            content: `<h3>Testing Introduction</h3><div class="content-area"><p>Testing ensures your code <strong>works correctly</strong> and stays correct as you make changes.</p><div class="interactive-example"><h4>Testing Concepts</h4><div class="code-editor"><textarea id="code-editor-area">console.log("Types of tests:");
console.log("1. Unit tests — test individual functions");
console.log("2. Integration — test modules together");
console.log("3. E2E — test full user workflows");
console.log("");
console.log("Testing pyramid:");
console.log("        /E2E\\\\     (few, slow, expensive)");
console.log("      /Integr\\\\   (some, medium)");
console.log("    /  Unit   \\\\  (many, fast, cheap)");
console.log("");
console.log("Popular tools: Jest, Mocha, Vitest");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'Which tests should you have the most of?', options: ['E2E', 'Integration', 'Unit', 'Manual'], correct: 2, explanation: 'Unit tests form the base of the testing pyramid — many, fast, cheap.' }]
        },
        'unit-testing': {
            content: `<h3>Unit Testing</h3><div class="content-area"><p>Unit tests test <strong>individual functions in isolation</strong>.</p><div class="interactive-example"><h4>Writing Tests</h4><div class="code-editor"><textarea id="code-editor-area">// Simple test framework
function test(name, fn) {
    try {
        fn();
        console.log("PASS:", name);
    } catch (e) {
        console.log("FAIL:", name, "-", e.message);
    }
}

function expect(actual) {
    return {
        toBe(expected) {
            if (actual !== expected)
                throw new Error(actual + " !== " + expected);
        }
    };
}

// Functions to test
const add = (a, b) => a + b;
const isEven = n => n % 2 === 0;

// Tests!
test("add 2+3 = 5", () => expect(add(2, 3)).toBe(5));
test("add 0+0 = 0", () => expect(add(0, 0)).toBe(0));
test("4 is even", () => expect(isEven(4)).toBe(true));
test("3 is odd", () => expect(isEven(3)).toBe(false));</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What makes a good unit test?', options: ['Tests entire app', 'Tests one function in isolation', 'Tests UI only', 'Runs once'], correct: 1, explanation: 'Unit tests isolate and test a single function or module.' }]
        },
        'integration-testing': {
            content: `<h3>Integration Testing</h3><div class="content-area"><p>Integration tests verify <strong>modules work together correctly</strong>.</p><div class="interactive-example"><h4>Integration Test Example</h4><div class="code-editor"><textarea id="code-editor-area">// Simulating modules working together
function createCart() {
    return { items: [], total: 0 };
}
function addItem(cart, item) {
    cart.items.push(item);
    cart.total += item.price;
    return cart;
}
function applyDiscount(cart, pct) {
    cart.total *= (1 - pct / 100);
    return cart;
}

// Integration test: full cart workflow
function test(name, fn) {
    try { fn(); console.log("PASS:", name); }
    catch(e) { console.log("FAIL:", name, e.message); }
}

test("cart workflow", () => {
    let cart = createCart();
    cart = addItem(cart, { name: "Shirt", price: 25 });
    cart = addItem(cart, { name: "Pants", price: 40 });
    cart = applyDiscount(cart, 10);
    if (cart.items.length !== 2) throw new Error("Wrong items");
    if (cart.total !== 58.5) throw new Error("Wrong total: " + cart.total);
});</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What do integration tests verify?', options: ['Single functions', 'Modules working together', 'CSS styling', 'Server uptime'], correct: 1, explanation: 'Integration tests verify that different modules interact correctly.' }]
        },
        practice: {
            content: `<h3>Practice: Testing</h3><div class="content-area"><div class="challenge-task"><strong>Challenge:</strong> Write tests for a string utility module.</div><div class="interactive-example"><h4>Code Editor</h4><div class="code-editor"><textarea id="code-editor-area">function test(name, fn) {
    try { fn(); console.log("PASS:", name); }
    catch(e) { console.log("FAIL:", name, "-", e.message); }
}
function expect(a) {
    return { toBe(b) { if (a !== b) throw new Error(a + " !== " + b); } };
}

// String utilities
const capitalize = s => s[0].toUpperCase() + s.slice(1);
const reverse = s => s.split('').reverse().join('');
const isPalindrome = s => s === reverse(s);

test("capitalize hello", () => expect(capitalize("hello")).toBe("Hello"));
test("reverse abc", () => expect(reverse("abc")).toBe("cba"));
test("racecar is palindrome", () => expect(isPalindrome("racecar")).toBe(true));
test("hello is not palindrome", () => expect(isPalindrome("hello")).toBe(false));</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What is TDD?', options: ['Test-Driven Design', 'Test-Driven Development', 'Type-Driven Development', 'Test Data Design'], correct: 1, explanation: 'TDD: write tests first, then write code to pass them.' }]
        }
    },

    // ========================================
    // MASTER WORLD
    // ========================================

    frameworks: {
        'frameworks-intro': {
            content: `<h3>Framework Introduction</h3><div class="content-area"><p>Frameworks provide <strong>structure and tools</strong> for building complex apps.</p><div class="interactive-example"><h4>Popular Frameworks</h4><div class="code-editor"><textarea id="code-editor-area">console.log("Top JS Frameworks (2025):");
console.log("");
console.log("React — Meta, component-based, JSX");
console.log("  Virtual DOM, hooks, huge ecosystem");
console.log("");
console.log("Vue — Progressive, template-based");
console.log("  Easy to learn, reactive data binding");
console.log("");
console.log("Angular — Google, full framework");
console.log("  TypeScript, dependency injection, CLI");
console.log("");
console.log("Svelte — Compile-time, no virtual DOM");
console.log("  Less code, faster runtime");
console.log("");
console.log("All solve: state management, routing, UI");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What problem do frameworks solve?', options: ['Making HTML valid', 'Structure for complex apps', 'Replacing JavaScript', 'Server management'], correct: 1, explanation: 'Frameworks provide structure, state management, and tools for building complex applications.' }]
        },
        'react-basics': {
            content: `<h3>React Basics</h3><div class="content-area"><p>React uses <strong>components</strong> and <strong>JSX</strong> to build UIs.</p><div class="interactive-example"><h4>React Concepts</h4><div class="code-editor"><textarea id="code-editor-area">// React component (conceptual)
console.log("Function Component:");
console.log("function Greeting({ name }) {");
console.log("  return <h1>Hello, {name}!</h1>;");
console.log("}");
console.log("");
console.log("Hooks:");
console.log("  useState — manage state");
console.log("  useEffect — side effects");
console.log("  useRef — DOM references");
console.log("  useContext — shared state");
console.log("");
console.log("JSX compiles to React.createElement()");
console.log("<div> becomes React.createElement('div')");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What is JSX?', options: ['A new language', 'HTML-like syntax in JavaScript', 'A CSS framework', 'A testing tool'], correct: 1, explanation: 'JSX lets you write HTML-like syntax in JavaScript, compiled by React.' }]
        },
        'vue-basics': {
            content: `<h3>Vue Basics</h3><div class="content-area"><p>Vue uses <strong>templates</strong> and <strong>reactive data</strong> binding.</p><div class="interactive-example"><h4>Vue Concepts</h4><div class="code-editor"><textarea id="code-editor-area">console.log("Vue 3 Component:");
console.log("<template>");
console.log("  <h1>{{ message }}</h1>");
console.log("  <button @click='count++'>{{ count }}</button>");
console.log("</template>");
console.log("");
console.log("<script setup>");
console.log("  import { ref } from 'vue'");
console.log("  const message = ref('Hello Vue!')");
console.log("  const count = ref(0)");
console.log("</script>");
console.log("");
console.log("Key features:");
console.log("  v-bind, v-model, v-if, v-for");
console.log("  Composition API with ref/reactive");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What is Vue\'s reactivity based on?', options: ['Virtual DOM only', 'Proxy-based reactive system', 'Manual DOM updates', 'jQuery'], correct: 1, explanation: 'Vue 3 uses JavaScript Proxies for its reactivity system.' }]
        },
        practice: {
            content: `<h3>Practice: Frameworks</h3><div class="content-area"><div class="challenge-task"><strong>Challenge:</strong> Compare React and Vue approaches to a counter component.</div><div class="interactive-example"><h4>Code Editor</h4><div class="code-editor"><textarea id="code-editor-area">console.log("=== React Counter ===");
console.log("function Counter() {");
console.log("  const [count, setCount] = useState(0);");
console.log("  return <button onClick={() => setCount(count + 1)}>{count}</button>;");
console.log("}");
console.log("");
console.log("=== Vue Counter ===");
console.log("<template><button @click='count++'>{{ count }}</button></template>");
console.log("<script setup>const count = ref(0)</script>");
console.log("");
console.log("Both achieve the same result!");
console.log("React: explicit state updates");
console.log("Vue: automatic reactivity");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What do React and Vue have in common?', options: ['Same syntax', 'Component-based architecture', 'Same company', 'Same language'], correct: 1, explanation: 'Both use a component-based architecture for building UIs.' }]
        }
    },

    nodejs: {
        'nodejs-intro': {
            content: `<h3>Node.js Introduction</h3><div class="content-area"><p>Node.js runs JavaScript <strong>outside the browser</strong> — on servers, CLI tools, etc.</p><div class="interactive-example"><h4>Node.js Concepts</h4><div class="code-editor"><textarea id="code-editor-area">console.log("Node.js = V8 engine + OS APIs");
console.log("");
console.log("What you can do:");
console.log("  - Build web servers");
console.log("  - Read/write files");
console.log("  - Connect to databases");
console.log("  - Create CLI tools");
console.log("  - Build APIs");
console.log("");
console.log("Key built-in modules:");
console.log("  fs — file system");
console.log("  http — web server");
console.log("  path — file paths");
console.log("  os — operating system info");
console.log("  events — event emitter");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What is Node.js?', options: ['A browser', 'JS runtime outside browser', 'A framework', 'A database'], correct: 1, explanation: 'Node.js is a JavaScript runtime built on Chrome\'s V8 engine for server-side JS.' }]
        },
        npm: {
            content: `<h3>NPM and Packages</h3><div class="content-area"><p>NPM is the <strong>package manager</strong> for Node.js — the world's largest software registry.</p><div class="interactive-example"><h4>NPM Essentials</h4><div class="code-editor"><textarea id="code-editor-area">console.log("Essential NPM commands:");
console.log("  npm init — create package.json");
console.log("  npm install pkg — add dependency");
console.log("  npm install -D pkg — dev dependency");
console.log("  npm run script — run a script");
console.log("  npx pkg — run without installing");
console.log("");
console.log("package.json:");
console.log('  { "name": "my-app",');
console.log('    "scripts": { "start": "node index.js" },');
console.log('    "dependencies": { "express": "^4.18.0" } }');
console.log("");
console.log("Popular packages:");
console.log("  express, lodash, axios, dotenv, cors");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What is package.json?', options: ['A database', 'Project config and dependency list', 'A JavaScript file', 'A test file'], correct: 1, explanation: 'package.json lists project metadata, scripts, and dependencies.' }]
        },
        express: {
            content: `<h3>Express.js</h3><div class="content-area"><p>Express is the most popular <strong>web framework for Node.js</strong>.</p><div class="interactive-example"><h4>Express Basics</h4><div class="code-editor"><textarea id="code-editor-area">console.log("Basic Express server:");
console.log("");
console.log("const express = require('express');");
console.log("const app = express();");
console.log("");
console.log("app.get('/', (req, res) => {");
console.log("  res.json({ message: 'Hello World!' });");
console.log("});");
console.log("");
console.log("app.post('/users', (req, res) => {");
console.log("  // Create user");
console.log("  res.status(201).json({ id: 1 });");
console.log("});");
console.log("");
console.log("app.listen(3000);");
console.log("");
console.log("Middleware: app.use(express.json())");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What is middleware in Express?', options: ['A database', 'Functions that process requests', 'A template engine', 'A testing tool'], correct: 1, explanation: 'Middleware are functions that have access to req, res and can modify them or end the cycle.' }]
        },
        practice: {
            content: `<h3>Practice: Node.js</h3><div class="content-area"><div class="challenge-task"><strong>Challenge:</strong> Design a REST API for a todo app.</div><div class="interactive-example"><h4>Code Editor</h4><div class="code-editor"><textarea id="code-editor-area">console.log("Todo API Design:");
console.log("");
console.log("GET    /todos      — list all todos");
console.log("POST   /todos      — create a todo");
console.log("GET    /todos/:id  — get one todo");
console.log("PUT    /todos/:id  — update a todo");
console.log("DELETE /todos/:id  — delete a todo");
console.log("");
console.log("Todo object: { id, title, completed }");
console.log("");
console.log("Status codes:");
console.log("  200 OK, 201 Created");
console.log("  400 Bad Request, 404 Not Found");
console.log("  500 Internal Server Error");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What does REST stand for?', options: ['Remote Execution Standard', 'Representational State Transfer', 'Request-Response System', 'Resource State Tracking'], correct: 1, explanation: 'REST = Representational State Transfer, an architectural style for APIs.' }]
        }
    },

    typescript: {
        'typescript-intro': {
            content: `<h3>TypeScript Introduction</h3><div class="content-area"><p>TypeScript adds <strong>static types</strong> to JavaScript, catching bugs before runtime.</p><div class="interactive-example"><h4>Why TypeScript?</h4><div class="code-editor"><textarea id="code-editor-area">console.log("TypeScript = JavaScript + Types");
console.log("");
console.log("Benefits:");
console.log("1. Catch errors at compile time");
console.log("2. Better IDE autocomplete");
console.log("3. Self-documenting code");
console.log("4. Safer refactoring");
console.log("");
console.log("// TypeScript syntax:");
console.log("let name: string = 'Alice';");
console.log("let age: number = 25;");
console.log("let active: boolean = true;");
console.log("let items: string[] = ['a', 'b'];");
console.log("");
console.log("Compiles to plain JavaScript!");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What does TypeScript add to JS?', options: ['New runtime', 'Static types', 'A framework', 'A database'], correct: 1, explanation: 'TypeScript adds static type checking that catches errors before running.' }]
        },
        types: {
            content: `<h3>Basic Types</h3><div class="content-area"><p>TypeScript's type system:</p><div class="interactive-example"><h4>Type Examples</h4><div class="code-editor"><textarea id="code-editor-area">console.log("Basic types:");
console.log("  string, number, boolean");
console.log("  string[], number[]");
console.log("  any, unknown, void, never");
console.log("");
console.log("Type annotations:");
console.log("  let x: number = 42;");
console.log("  function add(a: number, b: number): number");
console.log("  const names: string[] = ['Alice']");
console.log("");
console.log("Union types:");
console.log("  let id: string | number = 'abc';");
console.log("  id = 123; // also valid");
console.log("");
console.log("Type aliases:");
console.log("  type Point = { x: number; y: number };");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What is a union type?', options: ['Two types merged', 'Variable that can be one of several types', 'An array type', 'A class type'], correct: 1, explanation: 'Union type (string | number) means the value can be either type.' }]
        },
        interfaces: {
            content: `<h3>Interfaces</h3><div class="content-area"><p>Interfaces define the <strong>shape of an object</strong>.</p><div class="interactive-example"><h4>Interface Examples</h4><div class="code-editor"><textarea id="code-editor-area">console.log("Interface definition:");
console.log("interface User {");
console.log("  name: string;");
console.log("  age: number;");
console.log("  email?: string; // optional");
console.log("  readonly id: number;");
console.log("}");
console.log("");
console.log("Extending interfaces:");
console.log("interface Admin extends User {");
console.log("  role: 'admin';");
console.log("  permissions: string[];");
console.log("}");
console.log("");
console.log("Generics:");
console.log("function first<T>(arr: T[]): T {");
console.log("  return arr[0];");
console.log("}");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What does ? after a property mean?', options: ['Required', 'Optional', 'Nullable', 'Deprecated'], correct: 1, explanation: 'The ? makes a property optional — it may or may not exist.' }]
        },
        practice: {
            content: `<h3>Practice: TypeScript</h3><div class="content-area"><div class="challenge-task"><strong>Challenge:</strong> Design type-safe interfaces for a blog.</div><div class="interactive-example"><h4>Code Editor</h4><div class="code-editor"><textarea id="code-editor-area">console.log("Blog type definitions:");
console.log("");
console.log("interface Author { name: string; bio?: string; }");
console.log("");
console.log("interface Post {");
console.log("  id: number;");
console.log("  title: string;");
console.log("  content: string;");
console.log("  author: Author;");
console.log("  tags: string[];");
console.log("  published: boolean;");
console.log("  createdAt: Date;");
console.log("}");
console.log("");
console.log("type PostPreview = Pick<Post, 'id'|'title'|'author'>;");
console.log("type CreatePost = Omit<Post, 'id'|'createdAt'>;");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What does Pick<T, K> do?', options: ['Removes properties', 'Selects specific properties from a type', 'Picks a random value', 'Creates a new type'], correct: 1, explanation: 'Pick creates a type with only the specified properties from T.' }]
        }
    },

    projects: {
        'project-planning': {
            content: `<h3>Project Planning</h3><div class="content-area"><p>Good projects start with a <strong>clear plan</strong>.</p><div class="interactive-example"><h4>Planning Steps</h4><div class="code-editor"><textarea id="code-editor-area">console.log("Project Planning Steps:");
console.log("1. Define requirements & features");
console.log("2. Choose tech stack");
console.log("3. Design data models");
console.log("4. Plan UI/UX wireframes");
console.log("5. Break into small tasks");
console.log("6. Set up project structure");
console.log("7. Build MVP first");
console.log("8. Test & iterate");
console.log("");
console.log("Project structure:");
console.log("  src/");
console.log("    components/");
console.log("    utils/");
console.log("    styles/");
console.log("    index.js");
console.log("  tests/");
console.log("  package.json");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What is MVP?', options: ['Most Valuable Player', 'Minimum Viable Product', 'Maximum Version Program', 'Main Variable Protocol'], correct: 1, explanation: 'MVP = Minimum Viable Product — smallest version with core features.' }]
        },
        'project-1': {
            content: `<h3>Todo App</h3><div class="content-area"><p>Build a <strong>full-featured Todo application</strong> with CRUD operations.</p><div class="interactive-example"><h4>Todo App Logic</h4><div class="code-editor"><textarea id="code-editor-area">// Todo app core logic
class TodoApp {
    constructor() { this.todos = []; this.nextId = 1; }
    add(title) {
        this.todos.push({ id: this.nextId++, title, done: false });
    }
    toggle(id) {
        const t = this.todos.find(t => t.id === id);
        if (t) t.done = !t.done;
    }
    remove(id) {
        this.todos = this.todos.filter(t => t.id !== id);
    }
    list() { return this.todos; }
}

const app = new TodoApp();
app.add("Learn JavaScript");
app.add("Build projects");
app.add("Get hired");
app.toggle(1);
console.log(app.list());</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What does CRUD stand for?', options: ['Code Run Update Delete', 'Create Read Update Delete', 'Copy Restore Undo Delete', 'Check Read Use Destroy'], correct: 1, explanation: 'CRUD = Create, Read, Update, Delete — the four basic operations.' }]
        },
        'project-2': {
            content: `<h3>Weather App</h3><div class="content-area"><p>Build a weather app using a <strong>public API</strong>.</p><div class="interactive-example"><h4>Weather App Concept</h4><div class="code-editor"><textarea id="code-editor-area">// Weather app structure
console.log("Features:");
console.log("  Search by city name");
console.log("  Display current temperature");
console.log("  Show weather icon & description");
console.log("  5-day forecast");
console.log("");
console.log("API: OpenWeatherMap (free tier)");
console.log("");
console.log("async function getWeather(city) {");
console.log("  const url = 'https://api.openweather...'");
console.log("  const res = await fetch(url);");
console.log("  const data = await res.json();");
console.log("  return {");
console.log("    temp: data.main.temp,");
console.log("    desc: data.weather[0].description,");
console.log("    icon: data.weather[0].icon");
console.log("  };");
console.log("}");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What do you need to use most APIs?', options: ['A database', 'An API key', 'A framework', 'TypeScript'], correct: 1, explanation: 'Most public APIs require an API key for authentication and rate limiting.' }]
        },
        'project-3': {
            content: `<h3>E-commerce Site</h3><div class="content-area"><p>Build an e-commerce site with <strong>cart, products, and checkout</strong>.</p><div class="interactive-example"><h4>E-commerce Logic</h4><div class="code-editor"><textarea id="code-editor-area">// Shopping cart logic
const products = [
    { id: 1, name: "Laptop", price: 999 },
    { id: 2, name: "Mouse", price: 29 },
    { id: 3, name: "Keyboard", price: 79 }
];

let cart = [];

function addToCart(productId, qty = 1) {
    const product = products.find(p => p.id === productId);
    const existing = cart.find(i => i.id === productId);
    if (existing) existing.qty += qty;
    else cart.push({ ...product, qty });
}

function getTotal() {
    return cart.reduce((sum, i) => sum + i.price * i.qty, 0);
}

addToCart(1); addToCart(2, 2); addToCart(3);
console.log("Cart:", cart);
console.log("Total: $" + getTotal());</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'Key feature of a shopping cart?', options: ['User login', 'Add/remove items and calculate total', 'Dark mode', 'Search'], correct: 1, explanation: 'Core cart features: add items, adjust quantities, calculate totals.' }]
        }
    },

    mastery: {
        'mastery-challenge': {
            content: `<h3>Final Challenge</h3><div class="content-area"><p>Prove your mastery by solving this <strong>comprehensive challenge</strong>!</p><div class="interactive-example"><h4>Challenge: Data Pipeline</h4><div class="code-editor"><textarea id="code-editor-area">// Build a data processing pipeline
const data = [
    { name: "Alice", dept: "Eng", salary: 95000 },
    { name: "Bob", dept: "Sales", salary: 72000 },
    { name: "Charlie", dept: "Eng", salary: 110000 },
    { name: "Diana", dept: "Eng", salary: 88000 },
    { name: "Eve", dept: "Sales", salary: 65000 }
];

// Pipeline: group by dept, calc avg salary, sort by avg
const result = Object.entries(
    data.reduce((groups, person) => {
        (groups[person.dept] = groups[person.dept] || []).push(person.salary);
        return groups;
    }, {})
).map(([dept, salaries]) => ({
    dept,
    count: salaries.length,
    avgSalary: Math.round(salaries.reduce((a, b) => a + b) / salaries.length)
})).sort((a, b) => b.avgSalary - a.avgSalary);

console.log("Department Summary:");
result.forEach(r => console.log(r.dept + ": " + r.count + " people, avg $" + r.avgSalary));</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What does .reduce() with an object accumulator do?', options: ['Sorts data', 'Groups data by a key', 'Filters data', 'Flattens arrays'], correct: 1, explanation: 'Using reduce with an object accumulator is a common pattern for grouping data.' }]
        },
        'code-review': {
            content: `<h3>Code Review</h3><div class="content-area"><p>Learn to <strong>review code</strong> like a senior developer.</p><div class="interactive-example"><h4>Code Review Practice</h4><div class="code-editor"><textarea id="code-editor-area">// Review this code — find improvements!
function getUserData(users, id) {
    for (var i = 0; i < users.length; i++) {
        if (users[i].id == id) {
            return {
                name: users[i].name,
                email: users[i].email,
                age: users[i].age
            }
        }
    }
    return null
}

// Improved version:
const getUserDataV2 = (users, id) =>
    users.find(u => u.id === id) ?? null;

const users = [
    { id: 1, name: "Alice", email: "a@b.c", age: 25 },
    { id: 2, name: "Bob", email: "b@b.c", age: 30 }
];
console.log("v1:", getUserData(users, 1));
console.log("v2:", getUserDataV2(users, 2));
console.log("Improvements: const, ===, .find(), arrow fn");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'What should you look for in code review?', options: ['Only bugs', 'Bugs, readability, performance, style', 'Only style', 'Only performance'], correct: 1, explanation: 'Code review covers correctness, readability, performance, and code style.' }]
        },
        contribution: {
            content: `<h3>Open Source Contribution</h3><div class="content-area"><p>Contributing to open source <strong>levels up your career</strong>.</p><div class="interactive-example"><h4>Getting Started</h4><div class="code-editor"><textarea id="code-editor-area">console.log("Open Source Contribution Guide:");
console.log("");
console.log("1. Find a project you use and like");
console.log("2. Read CONTRIBUTING.md");
console.log("3. Start with 'good first issue' labels");
console.log("4. Fork the repo");
console.log("5. Create a feature branch");
console.log("6. Make your changes");
console.log("7. Write tests");
console.log("8. Submit a Pull Request");
console.log("9. Respond to feedback");
console.log("");
console.log("Great platforms:");
console.log("  GitHub, GitLab");
console.log("  goodfirstissue.dev");
console.log("  up-for-grabs.net");
console.log("");
console.log("Congratulations! You've completed the course!");</textarea><button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button></div><div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div></div></div>`,
            quiz: [{ question: 'Best way to start contributing?', options: ['Rewrite entire projects', 'Look for "good first issue" labels', 'Submit random PRs', 'Only report bugs'], correct: 1, explanation: 'Start with issues labeled "good first issue" — they\'re designed for newcomers.' }]
        }
    }

});
