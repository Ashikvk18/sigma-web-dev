// ========================================
// JAVASCRIPT LOOPS
// ========================================

console.log("=== FOR LOOP ===");

// Basic for loop
console.log("Counting 1 to 5:");
for (let i = 1; i <= 5; i++) {
    console.log(i);
}

// For loop with different steps
console.log("Even numbers 0 to 10:");
for (let i = 0; i <= 10; i += 2) {
    console.log(i);
}

// For loop counting backwards
console.log("Counting down from 5 to 1:");
for (let i = 5; i >= 1; i--) {
    console.log(i);
}

// For loop with array
let fruits = ["apple", "banana", "orange", "grape"];
console.log("Fruits using for loop:");
for (let i = 0; i < fruits.length; i++) {
    console.log(`Fruit ${i + 1}: ${fruits[i]}`);
}

console.log("\n=== WHILE LOOP ===");

// Basic while loop
console.log("While loop counting 1 to 5:");
let counter = 1;
while (counter <= 5) {
    console.log(counter);
    counter++;
}

// While loop with condition
console.log("While loop until random number > 0.8:");
let randomNum;
let attempts = 0;
while ((randomNum = Math.random()) <= 0.8 && attempts < 10) {
    console.log(`Attempt ${attempts + 1}: ${randomNum.toFixed(3)}`);
    attempts++;
}
console.log(`Final: ${randomNum.toFixed(3)} after ${attempts} attempts`);

console.log("\n=== DO-WHILE LOOP ===");

// Basic do-while loop (always executes at least once)
console.log("Do-while loop counting 1 to 5:");
let doCounter = 1;
do {
    console.log(doCounter);
    doCounter++;
} while (doCounter <= 5);

// Do-while with user input simulation
console.log("Do-while loop (always runs once):");
let userInput = ""; // Simulating empty input
let doAttempts = 0;
do {
    console.log(`Attempt ${doAttempts + 1}: Processing input`);
    doAttempts++;
    userInput = "valid"; // Simulate getting valid input
} while (userInput === "" && doAttempts < 3);

console.log("\n=== FOR-IN LOOP ===");

// For-in with objects (iterates over keys/properties)
let person = {
    name: "John",
    age: 30,
    city: "New York",
    occupation: "Developer"
};

console.log("Object properties using for-in:");
for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}

// For-in with arrays (not recommended - iterates over indices)
console.log("Array indices using for-in:");
for (let index in fruits) {
    console.log(`Index ${index}: ${fruits[index]}`);
}

console.log("\n=== FOR-OF LOOP ===");

// For-of with arrays (iterates over values)
console.log("Array values using for-of:");
for (let fruit of fruits) {
    console.log(fruit);
}

// For-of with strings
let text = "Hello";
console.log("String characters using for-of:");
for (let char of text) {
    console.log(char);
}

// For-of with Set
let uniqueNumbers = new Set([1, 2, 3, 2, 4, 1]);
console.log("Set values using for-of:");
for (let num of uniqueNumbers) {
    console.log(num);
}

// For-of with Map
let countryCodes = new Map([
    ["USA", "United States"],
    ["UK", "United Kingdom"],
    ["JP", "Japan"]
]);
console.log("Map entries using for-of:");
for (let [code, country] of countryCodes) {
    console.log(`${code}: ${country}`);
}

console.log("\n=== LOOP CONTROL STATEMENTS ===");

// Break statement
console.log("Break example (stop at 3):");
for (let i = 1; i <= 10; i++) {
    if (i === 4) {
        break; // Exit the loop
    }
    console.log(i);
}

// Continue statement
console.log("Continue example (skip 3):");
for (let i = 1; i <= 5; i++) {
    if (i === 3) {
        continue; // Skip this iteration
    }
    console.log(i);
}

// Break and continue with nested loops
console.log("Nested loops with break:");
for (let i = 1; i <= 3; i++) {
    console.log(`Outer loop: ${i}`);
    for (let j = 1; j <= 3; j++) {
        if (j === 2) {
            break; // Only breaks inner loop
        }
        console.log(`  Inner loop: ${j}`);
    }
}

console.log("\n=== LABELS WITH LOOPS ===");

// Labeled break
console.log("Labeled break example:");
outerLoop: for (let i = 1; i <= 3; i++) {
    console.log(`Outer: ${i}`);
    for (let j = 1; j <= 3; j++) {
        if (i === 2 && j === 2) {
            break outerLoop; // Breaks outer loop
        }
        console.log(`  Inner: ${j}`);
    }
}

// Labeled continue
console.log("Labeled continue example:");
outerContinue: for (let i = 1; i <= 3; i++) {
    console.log(`Outer: ${i}`);
    for (let j = 1; j <= 3; j++) {
        if (i === 2 && j === 2) {
            continue outerContinue; // Continues outer loop
        }
        console.log(`  Inner: ${j}`);
    }
}

console.log("\n=== INFINITE LOOPS ===");

// Be careful with infinite loops!
// This would be infinite:
// while (true) {
//     console.log("This runs forever!");
// }

// Proper way to handle potentially infinite loops
console.log("Controlled 'infinite' loop:");
let infiniteCounter = 0;
while (true) {
    console.log(`Iteration: ${infiniteCounter}`);
    infiniteCounter++;
    if (infiniteCounter >= 5) {
        break; // Always have a way out!
    }
}

console.log("\n=== END OF LOOPS ===");
