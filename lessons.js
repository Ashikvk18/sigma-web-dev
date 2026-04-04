// ========================================
// JAVASCRIPT QUEST - LESSONS CONTENT
// ========================================

const LessonsContent = {
    // Variables and Data Types
    variables: {
        intro: {
            title: 'Introduction to Variables',
            content: `
                <h3>What are Variables?</h3>
                <p>Variables are containers for storing data values. Think of them as labeled boxes where you can store information.</p>
                
                <div class="example-box">
                    <h4>Example:</h4>
                    <pre><code>let name = "John";
let age = 25;
let isStudent = true;</code></pre>
                </div>
                
                <h3>Why Use Variables?</h3>
                <ul>
                    <li>Store data that can change</li>
                    <li>Make code more readable</li>
                    <li>Reuse values throughout your program</li>
                </ul>
                
                <div class="interactive-demo">
                    <h4>Try It Yourself:</h4>
                    <p>Create variables for your favorite color, favorite number, and whether you like JavaScript!</p>
                    <div class="code-editor">
                        <textarea id="variables-practice" placeholder="// Write your code here
let favoriteColor = "";
let favoriteNumber = 0;
let likesJavaScript = false;

console.log("My favorite color is " + favoriteColor);
console.log("My favorite number is " + favoriteNumber);
console.log("Do I like JavaScript? " + likesJavaScript);"></textarea>
                        <button class="btn-primary" onclick="runLessonCode('variables-practice')">Run Code</button>
                    </div>
                    <div class="output-area">
                        <h5>Output:</h5>
                        <pre id="variables-output"></pre>
                    </div>
                </div>
            `,
            quiz: [
                {
                    question: 'What is a variable?',
                    options: [
                        'A container for storing data',
                        'A type of function',
                        'A loop structure',
                        'A conditional statement'
                    ],
                    correct: 0,
                    explanation: 'Variables are containers that store data values in your program.'
                },
                {
                    question: 'Which keyword is recommended for modern JavaScript variable declaration?',
                    options: ['var', 'let', 'int', 'string'],
                    correct: 1,
                    explanation: 'The "let" keyword is the modern way to declare variables that can be reassigned.'
                }
            ]
        },
        
        datatypes: {
            title: 'Data Types',
            content: `
                <h3>JavaScript Data Types</h3>
                <p>JavaScript has several data types to represent different kinds of information:</p>
                
                <div class="datatype-grid">
                    <div class="datatype-card">
                        <h4>String</h4>
                        <p>Text data enclosed in quotes</p>
                        <pre><code>"Hello"
'JavaScript'
\`Template literal\`</code></pre>
                    </div>
                    
                    <div class="datatype-card">
                        <h4>Number</h4>
                        <p>Numeric values (integers and decimals)</p>
                        <pre><code>42
3.14
-10</code></pre>
                    </div>
                    
                    <div class="datatype-card">
                        <h4>Boolean</h4>
                        <p>True or false values</p>
                        <pre><code>true
false</code></pre>
                    </div>
                    
                    <div class="datatype-card">
                        <h4>Undefined</h4>
                        <p>Variable declared but not assigned</p>
                        <pre><code>let x;
// x is undefined</code></pre>
                    </div>
                    
                    <div class="datatype-card">
                        <h4>Null</h4>
                        <p>Intentionally empty value</p>
                        <pre><code>let empty = null;</code></pre>
                    </div>
                    
                    <div class="datatype-card">
                        <h4>Object</h4>
                        <p>Collection of key-value pairs</p>
                        <pre><code>{name: "John", age: 25}</code></pre>
                    </div>
                </div>
                
                <div class="interactive-demo">
                    <h4>Type Checking:</h4>
                    <p>Use the typeof operator to check a variable's data type</p>
                    <div class="code-editor">
                        <textarea id="datatype-practice" placeholder="// Check data types
let text = "Hello World";
let number = 42;
let isTrue = true;
let nothing = null;
let notDefined;

console.log("text is:", typeof text);
console.log("number is:", typeof number);
console.log("isTrue is:", typeof isTrue);
console.log("nothing is:", typeof nothing);
console.log("notDefined is:", typeof notDefined);"></textarea>
                        <button class="btn-primary" onclick="runLessonCode('datatype-practice')">Run Code</button>
                    </div>
                    <div class="output-area">
                        <h5>Output:</h5>
                        <pre id="datatype-output"></pre>
                    </div>
                </div>
            `,
            quiz: [
                {
                    question: 'What does typeof null return in JavaScript?',
                    options: ['null', 'undefined', 'object', 'string'],
                    correct: 2,
                    explanation: 'This is a JavaScript quirk - typeof null returns "object".'
                },
                {
                    question: 'Which of these is NOT a primitive data type?',
                    options: ['string', 'number', 'object', 'boolean'],
                    correct: 2,
                    explanation: 'Object is a complex data type, not a primitive.'
                }
            ]
        },
        
        declaration: {
            title: 'Variable Declaration',
            content: `
                <h3>Variable Declaration Keywords</h3>
                <p>JavaScript provides three ways to declare variables:</p>
                
                <div class="declaration-comparison">
                    <div class="declaration-card">
                        <h4>let</h4>
                        <p>Modern variable declaration with block scope</p>
                        <ul>
                            <li>Can be reassigned</li>
                            <li>Block scoped</li>
                            <li>Cannot be redeclared</li>
                        </ul>
                        <pre><code>let age = 25;
age = 26; // ✅ Allowed</code></pre>
                    </div>
                    
                    <div class="declaration-card">
                        <h4>const</h4>
                        <p>Constant declaration with block scope</p>
                        <ul>
                            <li>Cannot be reassigned</li>
                            <li>Block scoped</li>
                            <li>Cannot be redeclared</li>
                        </ul>
                        <pre><code>const PI = 3.14;
PI = 3.15; // ❌ Error!</code></pre>
                    </div>
                    
                    <div class="declaration-card">
                        <h4>var</h4>
                        <p>Old variable declaration (avoid in modern code)</p>
                        <ul>
                            <li>Can be reassigned</li>
                            <li>Function scoped</li>
                            <li>Can be redeclared</li>
                        </ul>
                        <pre><code>var old = "avoid using";
var old = "redeclared"; // ✅ Allowed</code></pre>
                    </div>
                </div>
                
                <div class="best-practices">
                    <h4>Best Practices:</h4>
                    <ul>
                        <li>Use <strong>const</strong> by default</li>
                        <li>Use <strong>let</strong> when you need to reassign</li>
                        <li>Avoid <strong>var</strong> in modern JavaScript</li>
                        <li>Use meaningful variable names</li>
                    </ul>
                </div>
                
                <div class="interactive-demo">
                    <h4>Practice:</h4>
                    <p>Declare variables using the appropriate keyword for each scenario</p>
                    <div class="code-editor">
                        <textarea id="declaration-practice" placeholder">// Declare variables appropriately

// Your name (won't change)
const name = "";

// Your age (might change)
let age = 0;

// Current year (won't change)
const currentYear = 2024;

// Score in a game (will change)
let score = 0;

console.log(name, age, currentYear, score);"></textarea>
                        <button class="btn-primary" onclick="runLessonCode('declaration-practice')">Run Code</button>
                    </div>
                    <div class="output-area">
                        <h5>Output:</h5>
                        <pre id="declaration-output"></pre>
                    </div>
                </div>
            `,
            quiz: [
                {
                    question: 'Which keyword should you use by default in modern JavaScript?',
                    options: ['var', 'let', 'const', 'int'],
                    correct: 2,
                    explanation: 'Use const by default, and let only when you need to reassign the variable.'
                }
            ]
        },
        
        practice: {
            title: 'Practice Exercises',
            content: `
                <h3>Variable Practice Challenges</h3>
                <p>Test your understanding with these hands-on exercises!</p>
                
                <div class="exercise-list">
                    <div class="exercise-card">
                        <h4>Exercise 1: Personal Profile</h4>
                        <p>Create variables to store your personal information</p>
                        <div class="code-editor">
                            <textarea id="exercise1" placeholder="// Create your personal profile
const firstName = "";
const lastName = "";
let age = 0;
const isStudent = false;
const hobbies = [""];

console.log("Name:", firstName + " " + lastName);
console.log("Age:", age);
console.log("Student:", isStudent);
console.log("Hobbies:", hobbies);"></textarea>
                            <button class="btn-primary" onclick="runLessonCode('exercise1')">Run Code</button>
                        </div>
                        <div class="output-area">
                            <h5>Output:</h5>
                            <pre id="exercise1-output"></pre>
                        </div>
                    </div>
                    
                    <div class="exercise-card">
                        <h4>Exercise 2: Math Calculator</h4>
                        <p>Create variables to perform basic math operations</p>
                        <div class="code-editor">
                            <textarea id="exercise2" placeholder="// Math calculator
let num1 = 10;
let num2 = 5;

let sum = num1 + num2;
let difference = num1 - num2;
let product = num1 * num2;
let quotient = num1 / num2;

console.log("Sum:", sum);
console.log("Difference:", difference);
console.log("Product:", product);
console.log("Quotient:", quotient);"></textarea>
                            <button class="btn-primary" onclick="runLessonCode('exercise2')">Run Code</button>
                        </div>
                        <div class="output-area">
                            <h5>Output:</h5>
                            <pre id="exercise2-output"></pre>
                        </div>
                    </div>
                    
                    <div class="exercise-card">
                        <h4>Exercise 3: String Manipulation</h4>
                        <p>Work with string variables</p>
                        <div class="code-editor">
                            <textarea id="exercise3" placeholder="// String manipulation
const greeting = "Hello";
const name = "World";
const punctuation = "!";

const fullGreeting = greeting + " " + name + punctuation;
const greetingLength = fullGreeting.length;
const upperGreeting = fullGreeting.toUpperCase();

console.log("Full greeting:", fullGreeting);
console.log("Length:", greetingLength);
console.log("Uppercase:", upperGreeting);"></textarea>
                            <button class="btn-primary" onclick="runLessonCode('exercise3')">Run Code</button>
                        </div>
                        <div class="output-area">
                            <h5>Output:</h5>
                            <pre id="exercise3-output"></pre>
                        </div>
                    </div>
                </div>
                
                <div class="completion-check">
                    <h4>Ready to Complete?</h4>
                    <p>Try all exercises and make sure you understand variables and data types!</p>
                    <button class="btn-success" onclick="completeLessonTopic()">
                        <i class="fas fa-check"></i> Complete Topic
                    </button>
                </div>
            `,
            quiz: [
                {
                    question: 'What will be the output of: console.log(typeof "42")?',
                    options: ['number', 'string', 'undefined', 'object'],
                    correct: 1,
                    explanation: 'The quotes make "42" a string, not a number.'
                }
            ]
        }
    },
    
    // Operators and Expressions
    operators: {
        arithmetic: {
            title: 'Arithmetic Operators',
            content: `
                <h3>Basic Arithmetic Operations</h3>
                <p>JavaScript supports all standard arithmetic operations:</p>
                
                <div class="operator-grid">
                    <div class="operator-card">
                        <h4>Addition (+)</h4>
                        <pre><code>5 + 3 = 8
"Hello" + " World" = "Hello World"</code></pre>
                    </div>
                    
                    <div class="operator-card">
                        <h4>Subtraction (-)</h4>
                        <pre><code>10 - 4 = 6</code></pre>
                    </div>
                    
                    <div class="operator-card">
                        <h4>Multiplication (*)</h4>
                        <pre><code>6 * 7 = 42</code></pre>
                    </div>
                    
                    <div class="operator-card">
                        <h4>Division (/)</h4>
                        <pre><code>15 / 3 = 5
10 / 4 = 2.5</code></pre>
                    </div>
                    
                    <div class="operator-card">
                        <h4>Modulus (%)</h4>
                        <pre><code>10 % 3 = 1
15 % 5 = 0</code></pre>
                    </div>
                    
                    <div class="operator-card">
                        <h4>Exponentiation (**)</h4>
                        <pre><code>2 ** 3 = 8
5 ** 2 = 25</code></pre>
                    </div>
                </div>
                
                <div class="interactive-demo">
                    <h4>Try It:</h4>
                    <div class="code-editor">
                        <textarea id="arithmetic-practice" placeholder="// Practice arithmetic operations
let a = 10;
let b = 3;

console.log("Addition:", a + b);
console.log("Subtraction:", a - b);
console.log("Multiplication:", a * b);
console.log("Division:", a / b);
console.log("Modulus:", a % b);
console.log("Exponentiation:", a ** b);"></textarea>
                        <button class="btn-primary" onclick="runLessonCode('arithmetic-practice')">Run Code</button>
                    </div>
                    <div class="output-area">
                        <h5>Output:</h5>
                        <pre id="arithmetic-output"></pre>
                    </div>
                </div>
            `,
            quiz: [
                {
                    question: 'What is the result of 15 % 4?',
                    options: ['3', '3.75', '4', '11'],
                    correct: 0,
                    explanation: 'The modulus operator (%) returns the remainder of division. 15 ÷ 4 = 3 with remainder 3.'
                }
            ]
        },
        
        comparison: {
            title: 'Comparison Operators',
            content: `
                <h3>Comparing Values</h3>
                <p>Comparison operators compare two values and return a boolean (true/false):</p>
                
                <div class="operator-grid">
                    <div class="operator-card">
                        <h4>Equal (==)</h4>
                        <pre><code>5 == "5"  // true (type coercion)
5 == 5    // true</code></pre>
                    </div>
                    
                    <div class="operator-card">
                        <h4>Strict Equal (===)</h4>
                        <pre><code>5 === "5" // false (different types)
5 === 5   // true</code></pre>
                    </div>
                    
                    <div class="operator-card">
                        <h4>Not Equal (!=)</h4>
                        <pre><code>5 != "5"  // false
5 != 6    // true</code></pre>
                    </div>
                    
                    <div class="operator-card">
                        <h4>Strict Not Equal (!==)</h4>
                        <pre><code>5 !== "5" // true
5 !== 5   // false</code></pre>
                    </div>
                    
                    <div class="operator-card">
                        <h4>Greater Than (>)</h4>
                        <pre><code>10 > 5    // true
5 > 10    // false</code></pre>
                    </div>
                    
                    <div class="operator-card">
                        <h4>Less Than (<)</h4>
                        <pre><code>3 < 7     // true
7 < 3     // false</code></pre>
                    </div>
                </div>
                
                <div class="best-practices">
                    <h4>Best Practice:</h4>
                    <p>Always use strict equality (=== and !==) to avoid unexpected type coercion!</p>
                </div>
                
                <div class="interactive-demo">
                    <h4>Practice:</h4>
                    <div class="code-editor">
                        <textarea id="comparison-practice" placeholder="// Practice comparison operators
let x = 10;
let y = "10";
let z = 5;

console.log("x == y:", x == y);
console.log("x === y:", x === y);
console.log("x !== y:", x !== y);
console.log("x > z:", x > z);
console.log("z < y:", z < y);"></textarea>
                        <button class="btn-primary" onclick="runLessonCode('comparison-practice')">Run Code</button>
                    </div>
                    <div class="output-area">
                        <h5>Output:</h5>
                        <pre id="comparison-output"></pre>
                    </div>
                </div>
            `,
            quiz: [
                {
                    question: 'Which comparison should you use to check if two values are equal in JavaScript?',
                    options: ['==', '===', '=', 'equals()'],
                    correct: 1,
                    explanation: 'Use === (strict equality) to avoid type coercion issues.'
                }
            ]
        },
        
        logical: {
            title: 'Logical Operators',
            content: `
                <h3>Logical Operations</h3>
                <p>Logical operators are used to combine multiple conditions:</p>
                
                <div class="operator-grid">
                    <div class="operator-card">
                        <h4>AND (&&)</h4>
                        <p>Returns true if both conditions are true</p>
                        <pre><code>true && true   // true
true && false  // false
false && false // false</code></pre>
                    </div>
                    
                    <div class="operator-card">
                        <h4>OR (||)</h4>
                        <p>Returns true if at least one condition is true</p>
                        <pre><code>true || true   // true
true || false  // true
false || false // false</code></pre>
                    </div>
                    
                    <div class="operator-card">
                        <h4>NOT (!)</h4>
                        <p>Inverts the boolean value</p>
                        <pre><code>!true  // false
!false // true</code></pre>
                    </div>
                </div>
                
                <div class="interactive-demo">
                    <h4>Real-world Examples:</h4>
                    <div class="code-editor">
                        <textarea id="logical-practice" placeholder>// Logical operators in action
let age = 25;
let hasLicense = true;
let hasCar = false;

// Can drive if old enough AND has license
let canDrive = age >= 18 && hasLicense;

// Can travel if has car OR can use public transport
let canTravel = hasCar || true; // assuming public transport available

// Cannot drive if NOT old enough
let cannotDrive = age < 18;

console.log("Can drive:", canDrive);
console.log("Can travel:", canTravel);
console.log("Cannot drive:", cannotDrive);"></textarea>
                        <button class="btn-primary" onclick="runLessonCode('logical-practice')">Run Code</button>
                    </div>
                    <div class="output-area">
                        <h5>Output:</h5>
                        <pre id="logical-output"></pre>
                    </div>
                </div>
            `,
            quiz: [
                {
                    question: 'What does true && false evaluate to?',
                    options: ['true', 'false', 'undefined', 'null'],
                    correct: 1,
                    explanation: 'The AND operator (&&) returns true only if both operands are true.'
                }
            ]
        },
        
        practice: {
            title: 'Operator Practice',
            content: `
                <h3>Operator Challenges</h3>
                <p>Test your understanding with these operator exercises!</p>
                
                <div class="exercise-list">
                    <div class="exercise-card">
                        <h4>Challenge 1: Grade Calculator</h4>
                        <p>Calculate if a student passes based on score and attendance</p>
                        <div class="code-editor">
                            <textarea id="operator-exercise1" placeholder="// Grade calculator
let score = 85;
let attendance = 90;
let minimumScore = 70;
let minimumAttendance = 80;

// Student passes if score AND attendance are above minimums
let passes = score >= minimumScore && attendance >= minimumAttendance;

console.log("Score:", score);
console.log("Attendance:", attendance);
console.log("Passes:", passes);"></textarea>
                            <button class="btn-primary" onclick="runLessonCode('operator-exercise1')">Run Code</button>
                        </div>
                        <div class="output-area">
                            <h5>Output:</h5>
                            <pre id="operator-exercise1-output"></pre>
                        </div>
                    </div>
                    
                    <div class="exercise-card">
                        <h4>Challenge 2: Even or Odd</h4>
                        <p>Use the modulus operator to check if numbers are even or odd</p>
                        <div class="code-editor">
                            <textarea id="operator-exercise2" placeholder="// Even or odd checker
let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

numbers.forEach(num => {
    let isEven = num % 2 === 0;
    console.log(num + " is even:", isEven);
});"></textarea>
                            <button class="btn-primary" onclick="runLessonCode('operator-exercise2')">Run Code</button>
                        </div>
                        <div class="output-area">
                            <h5>Output:</h5>
                            <pre id="operator-exercise2-output"></pre>
                        </div>
                    </div>
                </div>
                
                <div class="completion-check">
                    <button class="btn-success" onclick="completeLessonTopic()">
                        <i class="fas fa-check"></i> Complete Topic
                    </button>
                </div>
            `,
            quiz: [
                {
                    question: 'What will be the output of: 5 > 3 && 2 < 4?',
                    options: ['true', 'false', 'undefined', 'error'],
                    correct: 0,
                    explanation: 'Both conditions (5 > 3 and 2 < 4) are true, so the AND operation returns true.'
                }
            ]
        }
    }
};

// Function to run lesson code
function runLessonCode(textareaId) {
    const textarea = document.getElementById(textareaId);
    
    // Derive output ID: try [id]-output first, then replace -practice with -output
    let outputId = textareaId + '-output';
    let output = document.getElementById(outputId);
    if (!output) {
        outputId = textareaId.replace('-practice', '-output');
        output = document.getElementById(outputId);
    }
    
    if (!textarea || !output) {
        console.warn('Could not find textarea or output for:', textareaId);
        return;
    }
    
    try {
        // Capture console.log output
        const logs = [];
        const customConsole = {
            log: (...args) => {
                logs.push(args.map(arg => 
                    typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
                ).join(' '));
            }
        };
        
        // Execute code in safe context
        const func = new Function('console', textarea.value);
        func(customConsole);
        
        output.textContent = logs.join('\n') || 'Code executed successfully!';
        output.style.color = '#10b981';
        
        // Add XP for running code
        if (window.gameEngine) {
            window.gameEngine.addXP(2);
        }
        
    } catch (error) {
        output.textContent = `Error: ${error.message}`;
        output.style.color = '#ef4444';
    }
}

// Function to complete lesson topic
function completeLessonTopic() {
    if (window.gameEngine) {
        window.gameEngine.completeTopic();
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { LessonsContent, runLessonCode, completeLessonTopic };
}

console.log('📚 Lessons content loaded!');
