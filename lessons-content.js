// ========================================
// JAVASCRIPT QUEST - LESSON CONTENT
// Theory, Examples, and Quiz Questions
// ========================================

const LessonsContent = {

    // ========================================
    // BASICS WORLD
    // ========================================

    variables: {
        intro: {
            content: `
                <h3>Introduction to Variables</h3>
                <div class="content-area">
                    <p>Variables are <strong>containers for storing data values</strong>. Think of them as labeled boxes where you can put information and retrieve it later.</p>
                    <p>In JavaScript, you declare variables using three keywords:</p>
                    <ul>
                        <li><code>let</code> — for values that can change</li>
                        <li><code>const</code> — for values that stay the same</li>
                        <li><code>var</code> — the old way (avoid in modern JS)</li>
                    </ul>
                    <div class="interactive-example">
                        <h4>Try It Yourself</h4>
                        <div class="code-editor">
                            <textarea id="code-editor-area">// Declare variables
let myName = "JavaScript Learner";
const year = 2025;
let score = 0;

console.log("Name:", myName);
console.log("Year:", year);

// You can change let variables
score = 100;
console.log("Score:", score);</textarea>
                            <button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button>
                        </div>
                        <div class="output-area">
                            <h5>Output:</h5>
                            <pre id="code-output">Click "Run Code" to see results...</pre>
                        </div>
                    </div>
                    <div class="key-concept">
                        <strong>Key Rule:</strong> Use <code>const</code> by default. Only use <code>let</code> when you know the value will change. Avoid <code>var</code>.
                    </div>
                </div>
            `,
            quiz: [
                { question: 'Which keyword declares a variable that cannot be reassigned?', options: ['let', 'var', 'const', 'define'], correct: 2, explanation: 'const creates a constant — once assigned, it cannot be changed.' },
                { question: 'What happens if you try to reassign a const variable?', options: ['Nothing', 'It silently fails', 'TypeError is thrown', 'It works fine'], correct: 2, explanation: 'JavaScript throws a TypeError if you try to reassign a const variable.' }
            ]
        },
        datatypes: {
            content: `
                <h3>Data Types</h3>
                <div class="content-area">
                    <p>JavaScript has <strong>7 primitive data types</strong> and 1 complex type:</p>
                    <table class="data-table">
                        <tr><th>Type</th><th>Example</th><th>Description</th></tr>
                        <tr><td><code>string</code></td><td><code>"Hello"</code></td><td>Text data</td></tr>
                        <tr><td><code>number</code></td><td><code>42, 3.14</code></td><td>Integers and decimals</td></tr>
                        <tr><td><code>boolean</code></td><td><code>true, false</code></td><td>True or false</td></tr>
                        <tr><td><code>undefined</code></td><td><code>undefined</code></td><td>Variable declared but not assigned</td></tr>
                        <tr><td><code>null</code></td><td><code>null</code></td><td>Intentionally empty</td></tr>
                        <tr><td><code>symbol</code></td><td><code>Symbol('id')</code></td><td>Unique identifier</td></tr>
                        <tr><td><code>bigint</code></td><td><code>123n</code></td><td>Very large integers</td></tr>
                        <tr><td><code>object</code></td><td><code>{ name: "JS" }</code></td><td>Complex data structures</td></tr>
                    </table>
                    <div class="interactive-example">
                        <h4>Explore Data Types</h4>
                        <div class="code-editor">
                            <textarea id="code-editor-area">let text = "Hello World";
let number = 42;
let decimal = 3.14;
let isActive = true;
let nothing = null;
let notDefined;

console.log(typeof text);
console.log(typeof number);
console.log(typeof isActive);
console.log(typeof nothing);
console.log(typeof notDefined);</textarea>
                            <button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button>
                        </div>
                        <div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div>
                    </div>
                </div>
            `,
            quiz: [
                { question: 'What does typeof null return?', options: ['"null"', '"undefined"', '"object"', '"boolean"'], correct: 2, explanation: 'This is a famous JavaScript bug! typeof null returns "object".' },
                { question: 'Which is NOT a primitive type?', options: ['string', 'number', 'array', 'boolean'], correct: 2, explanation: 'Arrays are objects, not primitives.' }
            ]
        },
        declaration: {
            content: `
                <h3>Variable Declaration</h3>
                <div class="content-area">
                    <p>Understanding the difference between <code>var</code>, <code>let</code>, and <code>const</code>:</p>
                    <table class="data-table">
                        <tr><th>Feature</th><th>var</th><th>let</th><th>const</th></tr>
                        <tr><td>Scope</td><td>Function</td><td>Block</td><td>Block</td></tr>
                        <tr><td>Reassignable</td><td>Yes</td><td>Yes</td><td>No</td></tr>
                        <tr><td>Hoisted</td><td>Yes (undefined)</td><td>Yes (TDZ)</td><td>Yes (TDZ)</td></tr>
                        <tr><td>Redeclarable</td><td>Yes</td><td>No</td><td>No</td></tr>
                    </table>
                    <div class="interactive-example">
                        <h4>Scope Demonstration</h4>
                        <div class="code-editor">
                            <textarea id="code-editor-area">// Block scope with let
if (true) {
    let blockVar = "I'm inside a block";
    console.log(blockVar);
}

// const with objects
const person = { name: "Alice" };
person.name = "Bob";  // This works!
console.log(person.name);

// Naming conventions
let camelCase = "standard for variables";
const MAX_SIZE = 100;
console.log(camelCase, MAX_SIZE);</textarea>
                            <button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button>
                        </div>
                        <div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div>
                    </div>
                </div>
            `,
            quiz: [
                { question: 'What is "block scope"?', options: ['Accessible everywhere', 'Only inside the function', 'Only inside {} where declared', 'Only in the file'], correct: 2, explanation: 'Block scope means the variable is only accessible within the {} where it was declared.' },
                { question: 'Can you modify properties of a const object?', options: ['No, const means immutable', 'Yes, only the reference is constant', 'Only with Object.assign', 'Only arrays'], correct: 1, explanation: 'const prevents reassignment of the variable, but the object itself can still be mutated.' }
            ]
        },
        practice: {
            content: `
                <h3>Practice: Variables & Data Types</h3>
                <div class="content-area">
                    <p>Complete these exercises to test your understanding.</p>
                    <div class="challenge-task"><strong>Challenge 1:</strong> Create a variable called <code>greeting</code> that holds "Hello, World!" and log it.</div>
                    <div class="challenge-task"><strong>Challenge 2:</strong> Create a constant <code>PI</code> with value 3.14159 and calculate the area of a circle with radius 5.</div>
                    <div class="challenge-task"><strong>Challenge 3:</strong> Use <code>typeof</code> to check the types of: 42, "hello", true, null, undefined.</div>
                    <div class="interactive-example">
                        <h4>Code Editor</h4>
                        <div class="code-editor">
                            <textarea id="code-editor-area">// Challenge 1
let greeting = "Hello, World!";
console.log(greeting);

// Challenge 2
const PI = 3.14159;
let radius = 5;
let area = PI * radius * radius;
console.log("Area:", area);

// Challenge 3
console.log(typeof 42);
console.log(typeof "hello");
console.log(typeof true);
console.log(typeof null);
console.log(typeof undefined);</textarea>
                            <button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button>
                        </div>
                        <div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div>
                    </div>
                </div>
            `,
            quiz: [
                { question: 'What is the result of typeof "42"?', options: ['"number"', '"string"', '"integer"', '"text"'], correct: 1, explanation: '"42" is wrapped in quotes, making it a string.' },
                { question: 'Which naming convention is standard for JS variables?', options: ['snake_case', 'camelCase', 'PascalCase', 'kebab-case'], correct: 1, explanation: 'camelCase is the standard convention for variables and functions in JavaScript.' }
            ]
        }
    },

    operators: {
        arithmetic: {
            content: `
                <h3>Arithmetic Operators</h3>
                <div class="content-area">
                    <p>Arithmetic operators perform mathematical calculations:</p>
                    <table class="data-table">
                        <tr><th>Operator</th><th>Name</th><th>Example</th><th>Result</th></tr>
                        <tr><td><code>+</code></td><td>Addition</td><td><code>5 + 3</code></td><td>8</td></tr>
                        <tr><td><code>-</code></td><td>Subtraction</td><td><code>10 - 4</code></td><td>6</td></tr>
                        <tr><td><code>*</code></td><td>Multiplication</td><td><code>3 * 7</code></td><td>21</td></tr>
                        <tr><td><code>/</code></td><td>Division</td><td><code>15 / 4</code></td><td>3.75</td></tr>
                        <tr><td><code>%</code></td><td>Modulus</td><td><code>15 % 4</code></td><td>3</td></tr>
                        <tr><td><code>**</code></td><td>Exponentiation</td><td><code>2 ** 3</code></td><td>8</td></tr>
                    </table>
                    <div class="interactive-example">
                        <h4>Try Arithmetic</h4>
                        <div class="code-editor">
                            <textarea id="code-editor-area">console.log("5 + 3 =", 5 + 3);
console.log("10 - 4 =", 10 - 4);
console.log("3 * 7 =", 3 * 7);
console.log("15 / 4 =", 15 / 4);
console.log("15 % 4 =", 15 % 4);
console.log("2 ** 3 =", 2 ** 3);

let count = 5;
count++;
console.log("After ++:", count);
count--;
console.log("After --:", count);</textarea>
                            <button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button>
                        </div>
                        <div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div>
                    </div>
                </div>
            `,
            quiz: [
                { question: 'What does 15 % 4 return?', options: ['3.75', '3', '4', '0'], correct: 1, explanation: 'The modulus operator returns the remainder. 15 / 4 = 3 remainder 3.' },
                { question: 'What does 2 ** 3 equal?', options: ['6', '8', '5', '23'], correct: 1, explanation: '** is exponentiation. 2 ** 3 = 2 x 2 x 2 = 8.' }
            ]
        },
        comparison: {
            content: `
                <h3>Comparison Operators</h3>
                <div class="content-area">
                    <p>Comparison operators return a <strong>boolean</strong> (true/false):</p>
                    <table class="data-table">
                        <tr><th>Operator</th><th>Meaning</th><th>Example</th><th>Result</th></tr>
                        <tr><td><code>===</code></td><td>Strict equal</td><td><code>5 === 5</code></td><td>true</td></tr>
                        <tr><td><code>!==</code></td><td>Strict not equal</td><td><code>5 !== "5"</code></td><td>true</td></tr>
                        <tr><td><code>==</code></td><td>Loose equal</td><td><code>5 == "5"</code></td><td>true</td></tr>
                        <tr><td><code>></code></td><td>Greater than</td><td><code>10 > 5</code></td><td>true</td></tr>
                        <tr><td><code><</code></td><td>Less than</td><td><code>3 < 7</code></td><td>true</td></tr>
                    </table>
                    <div class="interactive-example">
                        <h4>Try Comparisons</h4>
                        <div class="code-editor">
                            <textarea id="code-editor-area">console.log(5 === 5);
console.log(5 === "5");
console.log(5 == "5");

console.log(null === undefined);
console.log(null == undefined);

console.log(10 > 5);
console.log(3 >= 3);
console.log("a" < "b");</textarea>
                            <button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button>
                        </div>
                        <div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div>
                    </div>
                    <div class="key-concept"><strong>Golden Rule:</strong> Always use <code>===</code> instead of <code>==</code>.</div>
                </div>
            `,
            quiz: [
                { question: 'What does 5 === "5" return?', options: ['true', 'false', 'undefined', 'Error'], correct: 1, explanation: '=== checks value AND type. 5 is number, "5" is string — false.' },
                { question: 'Why avoid == in JavaScript?', options: ['It is slower', 'It causes type coercion', 'It is deprecated', 'It only works with numbers'], correct: 1, explanation: '== performs type coercion, leading to unexpected results.' }
            ]
        },
        logical: {
            content: `
                <h3>Logical Operators</h3>
                <div class="content-area">
                    <p>Logical operators combine conditions:</p>
                    <table class="data-table">
                        <tr><th>Operator</th><th>Name</th><th>Description</th></tr>
                        <tr><td><code>&&</code></td><td>AND</td><td>Both must be true</td></tr>
                        <tr><td><code>||</code></td><td>OR</td><td>At least one true</td></tr>
                        <tr><td><code>!</code></td><td>NOT</td><td>Inverts boolean</td></tr>
                        <tr><td><code>??</code></td><td>Nullish coalescing</td><td>Fallback for null/undefined</td></tr>
                    </table>
                    <div class="interactive-example">
                        <h4>Logical Operations</h4>
                        <div class="code-editor">
                            <textarea id="code-editor-area">let age = 25;
let hasLicense = true;

console.log(age >= 18 && hasLicense);
console.log(age < 18 || hasLicense);
console.log(!true);
console.log(!false);

let username = null;
console.log(username ?? "Guest");

let score = 0;
console.log(score ?? 100);
console.log(score || 100);</textarea>
                            <button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button>
                        </div>
                        <div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div>
                    </div>
                </div>
            `,
            quiz: [
                { question: 'What does true && false return?', options: ['true', 'false', 'undefined', 'null'], correct: 1, explanation: 'AND requires BOTH sides true. One is false, result is false.' },
                { question: 'What does 0 ?? 100 return?', options: ['100', '0', 'null', 'undefined'], correct: 1, explanation: '?? only replaces null/undefined. 0 is valid, so returns 0.' }
            ]
        },
        practice: {
            content: `
                <h3>Practice: Operators</h3>
                <div class="content-area">
                    <div class="challenge-task"><strong>Challenge 1:</strong> Check if a number is even using modulus.</div>
                    <div class="challenge-task"><strong>Challenge 2:</strong> Check if age is between 18 and 65 inclusive.</div>
                    <div class="interactive-example">
                        <h4>Code Editor</h4>
                        <div class="code-editor">
                            <textarea id="code-editor-area">let num = 42;
console.log(num + " is even:", num % 2 === 0);

let age = 30;
console.log("Working age:", age >= 18 && age <= 65);

let userColor = null;
let color = userColor ?? "blue";
console.log("Color:", color);</textarea>
                            <button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button>
                        </div>
                        <div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div>
                    </div>
                </div>
            `,
            quiz: [
                { question: 'How do you check if num is odd?', options: ['num / 2 === 1', 'num % 2 !== 0', 'num & 1', 'All of the above'], correct: 1, explanation: 'num % 2 !== 0 checks if the remainder is not zero — meaning odd.' }
            ]
        }
    },

    functions: {
        intro: {
            content: `
                <h3>Introduction to Functions</h3>
                <div class="content-area">
                    <p>Functions are <strong>reusable blocks of code</strong> that perform a specific task.</p>
                    <div class="interactive-example">
                        <h4>Function Types</h4>
                        <div class="code-editor">
                            <textarea id="code-editor-area">// 1. Function Declaration
function greet(name) {
    return "Hello, " + name + "!";
}
console.log(greet("Alice"));

// 2. Function Expression
const add = function(a, b) {
    return a + b;
};
console.log("2 + 3 =", add(2, 3));

// 3. Arrow Function
const multiply = (a, b) => a * b;
console.log("4 * 5 =", multiply(4, 5));

// 4. Single param arrow
const double = n => n * 2;
console.log("Double 7:", double(7));</textarea>
                            <button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button>
                        </div>
                        <div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div>
                    </div>
                </div>
            `,
            quiz: [
                { question: 'Which is the correct arrow function syntax?', options: ['const fn = (x) -> x * 2', 'const fn = (x) => x * 2', 'const fn = x --> x * 2', 'const fn = x >> x * 2'], correct: 1, explanation: 'Arrow functions use => (fat arrow) syntax.' },
                { question: 'What does a function without return give back?', options: ['0', 'null', 'undefined', 'Error'], correct: 2, explanation: 'Functions without explicit return return undefined.' }
            ]
        },
        parameters: {
            content: `
                <h3>Parameters and Arguments</h3>
                <div class="content-area">
                    <p><strong>Parameters</strong> are placeholders. <strong>Arguments</strong> are actual values passed.</p>
                    <div class="interactive-example">
                        <h4>Parameters in Action</h4>
                        <div class="code-editor">
                            <textarea id="code-editor-area">// Default parameters
function greet(name = "World") {
    return "Hello, " + name + "!";
}
console.log(greet());
console.log(greet("Alice"));

// Rest parameters
function sum(...numbers) {
    return numbers.reduce((t, n) => t + n, 0);
}
console.log("Sum:", sum(1, 2, 3, 4, 5));

// Destructured parameters
function printUser({ name, age }) {
    console.log(name + " is " + age);
}
printUser({ name: "Bob", age: 30 });</textarea>
                            <button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button>
                        </div>
                        <div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div>
                    </div>
                </div>
            `,
            quiz: [
                { question: 'What does ...numbers do in a parameter?', options: ['Spreads the array', 'Collects all args into an array', 'Creates a copy', 'Invalid syntax'], correct: 1, explanation: 'Rest parameters (...) collect remaining arguments into an array.' }
            ]
        },
        'return': {
            content: `
                <h3>Return Values</h3>
                <div class="content-area">
                    <p><code>return</code> sends a value back and <strong>stops function execution</strong>.</p>
                    <div class="interactive-example">
                        <h4>Using Return</h4>
                        <div class="code-editor">
                            <textarea id="code-editor-area">function square(n) {
    return n * n;
}
console.log("5 squared:", square(5));

// Guard clause
function divide(a, b) {
    if (b === 0) return "Cannot divide by zero!";
    return a / b;
}
console.log(divide(10, 3));
console.log(divide(10, 0));

// Return an object
function createUser(name, age) {
    return { name, age, active: true };
}
console.log(createUser("Alice", 25));</textarea>
                            <button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button>
                        </div>
                        <div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div>
                    </div>
                </div>
            `,
            quiz: [
                { question: 'What happens after return executes?', options: ['Code continues', 'Function stops immediately', 'It loops back', 'Nothing'], correct: 1, explanation: 'return immediately exits the function.' }
            ]
        },
        scope: {
            content: `
                <h3>Function Scope</h3>
                <div class="content-area">
                    <p><strong>Scope</strong> determines where variables are accessible:</p>
                    <ul>
                        <li><strong>Global</strong> — accessible everywhere</li>
                        <li><strong>Function</strong> — inside the function only</li>
                        <li><strong>Block</strong> — inside {} only (let/const)</li>
                    </ul>
                    <div class="interactive-example">
                        <h4>Scope and Closures</h4>
                        <div class="code-editor">
                            <textarea id="code-editor-area">let globalVar = "I'm global!";

function myFunction() {
    let localVar = "I'm local!";
    console.log(globalVar);
    console.log(localVar);
}
myFunction();

// Closure
function counter() {
    let count = 0;
    return function() {
        count++;
        return count;
    };
}
const increment = counter();
console.log(increment());
console.log(increment());
console.log(increment());</textarea>
                            <button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button>
                        </div>
                        <div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div>
                    </div>
                </div>
            `,
            quiz: [
                { question: 'What is a closure?', options: ['A way to close a function', 'A function that remembers its outer scope', 'A method to end loops', 'A type of object'], correct: 1, explanation: 'A closure retains access to its outer scope even after the outer function has returned.' }
            ]
        },
        practice: {
            content: `
                <h3>Practice: Functions</h3>
                <div class="content-area">
                    <div class="challenge-task"><strong>Challenge 1:</strong> Write an arrow function for rectangle area.</div>
                    <div class="challenge-task"><strong>Challenge 2:</strong> Write a greeting function with defaults.</div>
                    <div class="challenge-task"><strong>Challenge 3:</strong> Create a counter using closures.</div>
                    <div class="interactive-example">
                        <h4>Code Editor</h4>
                        <div class="code-editor">
                            <textarea id="code-editor-area">const rectArea = (w, h) => w * h;
console.log("Area 5x3:", rectArea(5, 3));

function welcome(name = "Guest", time = "day") {
    return "Good " + time + ", " + name + "!";
}
console.log(welcome());
console.log(welcome("Alice", "morning"));

function makeCounter(start = 0) {
    let n = start;
    return { inc: () => ++n, get: () => n };
}
const c = makeCounter(10);
c.inc(); c.inc();
console.log("Counter:", c.get());</textarea>
                            <button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button>
                        </div>
                        <div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div>
                    </div>
                </div>
            `,
            quiz: [
                { question: 'Shorthand for const fn = (x) => { return x * 2; }?', options: ['const fn = x => x * 2', 'const fn = x -> x * 2', 'const fn(x) => x * 2', 'const fn = x: x * 2'], correct: 0, explanation: 'Single-expression arrows can omit braces and return.' }
            ]
        }
    },

    conditionals: {
        'if-else': {
            content: `
                <h3>If-Else Statements</h3>
                <div class="content-area">
                    <p>Conditionals let your code make <strong>decisions</strong>:</p>
                    <div class="interactive-example">
                        <h4>Conditional Logic</h4>
                        <div class="code-editor">
                            <textarea id="code-editor-area">let temperature = 28;

if (temperature > 30) {
    console.log("It's hot!");
} else if (temperature > 20) {
    console.log("Nice weather!");
} else if (temperature > 10) {
    console.log("A bit chilly.");
} else {
    console.log("It's cold!");
}

let score = 85;
let grade;
if (score >= 90) grade = "A";
else if (score >= 80) grade = "B";
else if (score >= 70) grade = "C";
else grade = "F";
console.log("Score:", score, "Grade:", grade);</textarea>
                            <button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button>
                        </div>
                        <div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div>
                    </div>
                </div>
            `,
            quiz: [
                { question: 'Which value is "falsy"?', options: ['1', '"hello"', '0', '[]'], correct: 2, explanation: 'Falsy: 0, "", null, undefined, NaN, false.' },
                { question: 'How many else-if blocks can you have?', options: ['Only 1', 'Up to 5', 'Up to 10', 'Unlimited'], correct: 3, explanation: 'You can chain as many else-if blocks as needed.' }
            ]
        },
        'switch': {
            content: `
                <h3>Switch Statements</h3>
                <div class="content-area">
                    <p>Switch compares a <strong>single value</strong> against multiple options:</p>
                    <div class="interactive-example">
                        <h4>Switch Examples</h4>
                        <div class="code-editor">
                            <textarea id="code-editor-area">let day = "Monday";

switch (day) {
    case "Monday":
    case "Tuesday":
    case "Wednesday":
    case "Thursday":
    case "Friday":
        console.log(day + " is a weekday");
        break;
    case "Saturday":
    case "Sunday":
        console.log(day + " is weekend");
        break;
    default:
        console.log("Invalid day");
}

let fruit = "apple";
switch (fruit) {
    case "apple":
        console.log("$1.50/lb");
        break;
    case "banana":
        console.log("$0.75/lb");
        break;
    default:
        console.log("Not available");
}</textarea>
                            <button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button>
                        </div>
                        <div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div>
                    </div>
                </div>
            `,
            quiz: [
                { question: 'What happens without break in switch?', options: ['Error', 'Skips to default', 'Falls through to next case', 'Nothing'], correct: 2, explanation: 'Without break, execution falls through to the next case.' }
            ]
        },
        ternary: {
            content: `
                <h3>Ternary Operator</h3>
                <div class="content-area">
                    <p>Shorthand if-else: <code>condition ? ifTrue : ifFalse</code></p>
                    <div class="interactive-example">
                        <h4>Ternary Examples</h4>
                        <div class="code-editor">
                            <textarea id="code-editor-area">let age = 20;
let status = age >= 18 ? "adult" : "minor";
console.log(status);

let score = 85;
let grade = score >= 90 ? "A"
          : score >= 80 ? "B"
          : score >= 70 ? "C" : "F";
console.log("Grade:", grade);

let isLoggedIn = true;
let message = isLoggedIn ? "Welcome back!" : "Please log in";
console.log(message);</textarea>
                            <button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button>
                        </div>
                        <div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div>
                    </div>
                </div>
            `,
            quiz: [
                { question: 'What does true ? "yes" : "no" return?', options: ['"yes"', '"no"', 'true', 'undefined'], correct: 0, explanation: 'Condition is true, so the first value is returned.' }
            ]
        },
        practice: {
            content: `
                <h3>Practice: Conditionals</h3>
                <div class="content-area">
                    <div class="challenge-task"><strong>Challenge:</strong> Write a function that returns "positive", "negative", or "zero".</div>
                    <div class="interactive-example">
                        <h4>Code Editor</h4>
                        <div class="code-editor">
                            <textarea id="code-editor-area">function checkNumber(n) {
    if (n > 0) return "positive";
    else if (n < 0) return "negative";
    else return "zero";
}

console.log(checkNumber(5));
console.log(checkNumber(-3));
console.log(checkNumber(0));

const check = n => n > 0 ? "positive" : n < 0 ? "negative" : "zero";
console.log(check(10), check(-1), check(0));</textarea>
                            <button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button>
                        </div>
                        <div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div>
                    </div>
                </div>
            `,
            quiz: [
                { question: 'Which are "falsy" values?', options: ['0, "", null, undefined, NaN, false', 'Only 0 and false', 'Only null and undefined', '0, false, []'], correct: 0, explanation: 'JS has 6 falsy values: 0, "", null, undefined, NaN, false.' }
            ]
        }
    },

    loops: {
        'for-loop': {
            content: `
                <h3>For Loops</h3>
                <div class="content-area">
                    <p>The <code>for</code> loop repeats code a specific number of times:</p>
                    <div class="interactive-example">
                        <h4>For Loop Examples</h4>
                        <div class="code-editor">
                            <textarea id="code-editor-area">for (let i = 1; i <= 5; i++) {
    console.log("Count:", i);
}

const fruits = ["Apple", "Banana", "Cherry"];
for (let i = 0; i < fruits.length; i++) {
    console.log(i + ":", fruits[i]);
}

// for...of (modern)
for (const fruit of fruits) {
    console.log("Fruit:", fruit);
}

// for...in (objects)
const person = { name: "Alice", age: 25 };
for (const key in person) {
    console.log(key + ":", person[key]);
}</textarea>
                            <button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button>
                        </div>
                        <div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div>
                    </div>
                </div>
            `,
            quiz: [
                { question: 'What are the 3 parts of a for loop?', options: ['start, end, step', 'init, condition, update', 'begin, check, next', 'declare, compare, change'], correct: 1, explanation: 'A for loop has: initialization, condition, and update.' },
                { question: 'Which loop is best for array values?', options: ['for...in', 'for...of', 'while', 'do...while'], correct: 1, explanation: 'for...of iterates over values. for...in is for object keys.' }
            ]
        },
        'while-loop': {
            content: `
                <h3>While Loops</h3>
                <div class="content-area">
                    <p><code>while</code> runs as long as a condition is true:</p>
                    <div class="interactive-example">
                        <h4>While Loop Examples</h4>
                        <div class="code-editor">
                            <textarea id="code-editor-area">let count = 0;
while (count < 5) {
    console.log("Count:", count);
    count++;
}

let num = 50;
while (num % 7 !== 0) {
    num++;
}
console.log("First >= 50 divisible by 7:", num);

let i = 0;
while (true) {
    if (i >= 3) break;
    console.log("i is", i);
    i++;
}</textarea>
                            <button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button>
                        </div>
                        <div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div>
                    </div>
                    <div class="key-concept"><strong>Warning:</strong> Always ensure the condition will eventually be false!</div>
                </div>
            `,
            quiz: [
                { question: 'When use while instead of for?', options: ['Always', 'When you know exact count', 'When iterations unknown', 'Never'], correct: 2, explanation: 'While loops are ideal when iteration count is unknown.' }
            ]
        },
        'do-while': {
            content: `
                <h3>Do-While Loops</h3>
                <div class="content-area">
                    <p><code>do...while</code> <strong>always runs at least once</strong>.</p>
                    <div class="interactive-example">
                        <h4>Do-While Examples</h4>
                        <div class="code-editor">
                            <textarea id="code-editor-area">let x = 10;
do {
    console.log("x is", x);
    x++;
} while (x < 5);

let choice = 1;
let attempts = 0;
do {
    attempts++;
    console.log("Attempt", attempts);
    choice++;
} while (choice <= 3);
console.log("Total:", attempts);</textarea>
                            <button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button>
                        </div>
                        <div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div>
                    </div>
                </div>
            `,
            quiz: [
                { question: 'Key difference between while and do-while?', options: ['Speed', 'do-while runs at least once', 'while is newer', 'Identical'], correct: 1, explanation: 'do-while checks condition AFTER executing, guaranteeing at least one run.' }
            ]
        },
        practice: {
            content: `
                <h3>Practice: Loops</h3>
                <div class="content-area">
                    <div class="challenge-task"><strong>Challenge 1:</strong> Print even numbers 1-20.</div>
                    <div class="challenge-task"><strong>Challenge 2:</strong> Calculate factorial of 6.</div>
                    <div class="interactive-example">
                        <h4>Code Editor</h4>
                        <div class="code-editor">
                            <textarea id="code-editor-area">for (let i = 2; i <= 20; i += 2) {
    console.log(i);
}

let n = 6;
let factorial = 1;
while (n > 1) {
    factorial *= n;
    n--;
}
console.log("6! =", factorial);</textarea>
                            <button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button>
                        </div>
                        <div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div>
                    </div>
                </div>
            `,
            quiz: [
                { question: 'What does "break" do in a loop?', options: ['Pauses', 'Exits immediately', 'Skips iteration', 'Restarts'], correct: 1, explanation: 'break exits the loop. Use "continue" to skip to next iteration.' }
            ]
        }
    },

    // ========================================
    // INTERMEDIATE WORLD
    // ========================================

    arrays: {
        'arrays-intro': {
            content: `
                <h3>Introduction to Arrays</h3>
                <div class="content-area">
                    <p>Arrays are <strong>ordered lists</strong> of values.</p>
                    <div class="interactive-example">
                        <h4>Array Basics</h4>
                        <div class="code-editor">
                            <textarea id="code-editor-area">const fruits = ["Apple", "Banana", "Cherry"];
console.log(fruits[0]);
console.log(fruits.length);

fruits.push("Date");
fruits.unshift("Avocado");
console.log(fruits);

fruits.pop();
fruits.shift();
console.log(fruits);
console.log(Array.isArray(fruits));</textarea>
                            <button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button>
                        </div>
                        <div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div>
                    </div>
                </div>
            `,
            quiz: [
                { question: 'First element index?', options: ['1', '0', '-1', 'first'], correct: 1, explanation: 'Arrays are zero-indexed.' },
                { question: 'What does .push() do?', options: ['Removes first', 'Adds to end', 'Sorts', 'Reverses'], correct: 1, explanation: 'push() adds to the END of an array.' }
            ]
        },
        'array-methods': {
            content: `
                <h3>Array Methods</h3>
                <div class="content-area">
                    <p>Powerful built-in methods for transforming data:</p>
                    <div class="interactive-example">
                        <h4>Essential Methods</h4>
                        <div class="code-editor">
                            <textarea id="code-editor-area">const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const doubled = numbers.map(n => n * 2);
console.log("Doubled:", doubled);

const evens = numbers.filter(n => n % 2 === 0);
console.log("Evens:", evens);

const sum = numbers.reduce((t, n) => t + n, 0);
console.log("Sum:", sum);

const firstBig = numbers.find(n => n > 7);
console.log("First > 7:", firstBig);

console.log("Has negative?", numbers.some(n => n < 0));
console.log("All positive?", numbers.every(n => n > 0));

const result = numbers.filter(n => n % 2 === 0).map(n => n * 10);
console.log("Even x 10:", result);</textarea>
                            <button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button>
                        </div>
                        <div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div>
                    </div>
                </div>
            `,
            quiz: [
                { question: 'What does .filter() return?', options: ['Single value', 'New array with matches', 'First match', 'Boolean'], correct: 1, explanation: 'filter() returns a NEW array with matching elements.' },
                { question: 'What does .reduce() do?', options: ['Removes duplicates', 'Combines into single value', 'Reduces size', 'Sorts'], correct: 1, explanation: 'reduce() accumulates values into a single result.' }
            ]
        },
        'objects-intro': {
            content: `
                <h3>Introduction to Objects</h3>
                <div class="content-area">
                    <p>Objects store data as <strong>key-value pairs</strong>.</p>
                    <div class="interactive-example">
                        <h4>Object Basics</h4>
                        <div class="code-editor">
                            <textarea id="code-editor-area">const person = {
    name: "Alice",
    age: 25,
    hobbies: ["reading", "coding"]
};

console.log(person.name);
console.log(person["age"]);

person.email = "alice@test.com";
person.age = 26;
console.log(person);

const { name, age, hobbies } = person;
console.log(name, age, hobbies);

const updated = { ...person, city: "NYC" };
console.log(updated);</textarea>
                            <button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button>
                        </div>
                        <div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div>
                    </div>
                </div>
            `,
            quiz: [
                { question: 'Two ways to access properties?', options: ['get() and set()', 'Dot and bracket notation', 'index and key', '.prop and ->prop'], correct: 1, explanation: 'Use obj.prop or obj["prop"]. Brackets needed for dynamic keys.' }
            ]
        },
        'object-methods': {
            content: `
                <h3>Object Methods</h3>
                <div class="content-area">
                    <p>Useful static methods on <code>Object</code>:</p>
                    <div class="interactive-example">
                        <h4>Object Utilities</h4>
                        <div class="code-editor">
                            <textarea id="code-editor-area">const car = { brand: "Toyota", year: 2024, color: "red" };

console.log(Object.keys(car));
console.log(Object.values(car));
console.log(Object.entries(car));

console.log("brand" in car);

const defaults = { theme: "dark", lang: "en" };
const prefs = { theme: "light" };
const settings = { ...defaults, ...prefs };
console.log(settings);

const user = { profile: { name: "Bob" } };
console.log(user.profile?.name);
console.log(user.address?.street);</textarea>
                            <button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button>
                        </div>
                        <div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div>
                    </div>
                </div>
            `,
            quiz: [
                { question: 'What does Object.keys() return?', options: ['Values', 'Array of key names', 'Object itself', 'Number of keys'], correct: 1, explanation: 'Object.keys() returns an array of property names.' }
            ]
        },
        practice: {
            content: `
                <h3>Practice: Arrays & Objects</h3>
                <div class="content-area">
                    <div class="challenge-task"><strong>Challenge:</strong> Get names of people over 18 using map and filter.</div>
                    <div class="interactive-example">
                        <h4>Code Editor</h4>
                        <div class="code-editor">
                            <textarea id="code-editor-area">const people = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 17 },
    { name: "Charlie", age: 30 },
    { name: "Diana", age: 15 }
];

const adultNames = people
    .filter(p => p.age >= 18)
    .map(p => p.name);
console.log("Adults:", adultNames);

const totalAge = people.reduce((s, p) => s + p.age, 0);
console.log("Average age:", totalAge / people.length);</textarea>
                            <button class="btn-primary" onclick="gameEngine.runCode()">Run Code <i class="fas fa-play"></i></button>
                        </div>
                        <div class="output-area"><h5>Output:</h5><pre id="code-output">Click "Run Code" to see results...</pre></div>
                    </div>
                </div>
            `,
            quiz: [
                { question: 'What does spread (...) do with arrays?', options: ['Deletes elements', 'Shallow copy / merge', 'Deep copies', 'Sorts'], correct: 1, explanation: 'Spread creates a shallow copy or merges arrays/objects.' }
            ]
        }
    }

};
