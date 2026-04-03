// ========================================
// JAVASCRIPT FUNCTIONS
// ========================================

console.log("=== FUNCTION DECLARATIONS ===");

// Basic function declaration
function greet() {
    console.log("Hello, World!");
}
greet();

// Function with parameters
function greetPerson(name) {
    console.log(`Hello, ${name}!`);
}
greetPerson("Alice");
greetPerson("Bob");

// Function with multiple parameters
function add(a, b) {
    return a + b;
}
let sum = add(5, 3);
console.log("5 + 3 =", sum);

// Function with default parameters (ES6)
function greetWithDefault(name = "Guest") {
    console.log(`Hello, ${name}!`);
}
greetWithDefault("Charlie");
greetWithDefault(); // Uses default value

console.log("\n=== FUNCTION EXPRESSIONS ===");

// Function assigned to variable
let multiply = function(a, b) {
    return a * b;
};
console.log("4 * 6 =", multiply(4, 6));

// Anonymous function
let numbers = [1, 2, 3, 4, 5];
let doubled = numbers.map(function(n) {
    return n * 2;
});
console.log("Doubled numbers:", doubled);

// Named function expression
let factorial = function fact(n) {
    if (n <= 1) return 1;
    return n * fact(n - 1);
};
console.log("5! =", factorial(5));

console.log("\n=== ARROW FUNCTIONS ===");

// Basic arrow function
let square = (x) => x * x;
console.log("Square of 7:", square(7));

// Arrow function with multiple parameters
let subtract = (a, b) => a - b;
console.log("10 - 3 =", subtract(10, 3));

// Arrow function with multiple statements
let calculateArea = (radius) => {
    const pi = 3.14159;
    return pi * radius * radius;
};
console.log("Area of circle (r=5):", calculateArea(5));

// Arrow function with single parameter (no parentheses needed)
let double = x => x * 2;
console.log("Double of 8:", double(8));

// Arrow function with no parameters
let getRandom = () => Math.random();
console.log("Random number:", getRandom());

console.log("\n=== FUNCTION PARAMETERS ===");

// Rest parameters
function sumAll(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}
console.log("Sum of 1,2,3,4,5:", sumAll(1, 2, 3, 4, 5));
console.log("Sum of 10,20:", sumAll(10, 20));

// Mixed parameters with rest
function greetEveryone(greeting, ...names) {
    names.forEach(name => console.log(`${greeting}, ${name}!`));
}
greetEveryone("Hi", "Alice", "Bob", "Charlie");

// Destructuring parameters
function printPerson({name, age, city}) {
    console.log(`${name} is ${age} years old and lives in ${city}`);
}
let person = {name: "John", age: 30, city: "New York"};
printPerson(person);

// Array destructuring
function getFirstAndSecond([first, second]) {
    console.log(`First: ${first}, Second: ${second}`);
}
getFirstAndSecond(["apple", "banana", "orange"]);

console.log("\n=== FUNCTION SCOPE AND CLOSURES ===");

// Global scope
let globalVar = "I'm global";

function outerFunction() {
    let outerVar = "I'm outer";
    
    function innerFunction() {
        let innerVar = "I'm inner";
        console.log(globalVar); // Can access global
        console.log(outerVar);  // Can access outer
        console.log(innerVar);  // Can access inner
    }
    
    innerFunction();
    // console.log(innerVar); // Error: innerVar is not defined here
}
outerFunction();

// Closure example
function createCounter() {
    let count = 0;
    
    return function() {
        count++;
        return count;
    };
}

let counter1 = createCounter();
let counter2 = createCounter();

console.log("Counter 1:", counter1()); // 1
console.log("Counter 1:", counter1()); // 2
console.log("Counter 2:", counter2()); // 1 (independent counter)

console.log("\n=== HIGHER-ORDER FUNCTIONS ===");

// Function that takes a function as parameter
function operate(a, b, operation) {
    return operation(a, b);
}

let addResult = operate(5, 3, (x, y) => x + y);
let multiplyResult = operate(5, 3, (x, y) => x * y);
console.log("Add result:", addResult);
console.log("Multiply result:", multiplyResult);

// Function that returns a function
function createMultiplier(factor) {
    return function(number) {
        return number * factor;
    };
}

let double2 = createMultiplier(2);
let triple = createMultiplier(3);
console.log("Double 10:", double2(10));
console.log("Triple 10:", triple(10));

console.log("\n=== RECURSION ===");

// Recursive factorial
function recursiveFactorial(n) {
    if (n <= 1) return 1;
    return n * recursiveFactorial(n - 1);
}
console.log("Recursive factorial of 6:", recursiveFactorial(6));

// Recursive Fibonacci
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log("Fibonacci of 7:", fibonacci(7));

console.log("\n=== IMMEDIATELY INVOKED FUNCTION EXPRESSIONS (IIFE) ===");

// Basic IIFE
(function() {
    console.log("IIFE executed immediately!");
})();

// IIFE with parameters
(function(name) {
    console.log(`Hello, ${name} from IIFE!`);
})("IIFE User");

// IIFE returning value
let result = (function(a, b) {
    return a + b;
})(10, 20);
console.log("IIFE result:", result);

console.log("\n=== METHODS ===");

// Object methods
let calculator = {
    add: function(a, b) {
        return a + b;
    },
    
    subtract: (a, b) => a - b, // Arrow function (no 'this' binding)
    
    multiply(a, b) { // ES6 method shorthand
        return a * b;
    }
};

console.log("Calculator add:", calculator.add(5, 3));
console.log("Calculator subtract:", calculator.subtract(10, 4));
console.log("Calculator multiply:", calculator.multiply(6, 7));

console.log("\n=== END OF FUNCTIONS ===");
