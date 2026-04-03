// ========================================
// JAVASCRIPT CONTROL FLOW
// ========================================

console.log("=== IF/ELSE STATEMENTS ===");

// Basic if statement
let age = 18;
if (age >= 18) {
    console.log("You are an adult");
}

// if-else statement
let score = 75;
if (score >= 90) {
    console.log("Grade: A");
} else {
    console.log("Grade: Not A");
}

// if-else if-else statement
let temperature = 25;
if (temperature > 30) {
    console.log("It's hot!");
} else if (temperature > 20) {
    console.log("It's warm");
} else if (temperature > 10) {
    console.log("It's cool");
} else {
    console.log("It's cold!");
}

// Nested if statements
let isStudent = true;
let hasDiscount = false;
if (isStudent) {
    console.log("You are a student");
    if (age < 25) {
        console.log("You get a student discount");
        hasDiscount = true;
    }
}

console.log("\n=== SWITCH STATEMENT ===");

let day = "Wednesday";
switch (day) {
    case "Monday":
        console.log("Start of the work week");
        break;
    case "Tuesday":
    case "Wednesday":
    case "Thursday":
        console.log("Middle of the work week");
        break;
    case "Friday":
        console.log("End of the work week");
        break;
    case "Saturday":
    case "Sunday":
        console.log("Weekend!");
        break;
    default:
        console.log("Invalid day");
}

// Switch with fall-through (no break)
let fruit = "apple";
switch (fruit) {
    case "apple":
    case "banana":
    case "orange":
        console.log("This is a fruit");
        break;
    case "carrot":
    case "broccoli":
        console.log("This is a vegetable");
        break;
    default:
        console.log("Unknown food type");
}

// Switch with expressions
let grade = "B";
switch (true) {
    case grade >= 90:
        console.log("Excellent!");
        break;
    case grade >= 80:
        console.log("Good!");
        break;
    case grade >= 70:
        console.log("Average");
        break;
    case grade >= 60:
        console.log("Below average");
        break;
    default:
        console.log("Fail");
}

console.log("\n=== TERNARY OPERATOR ===");

// Basic ternary
let isAdult = age >= 18 ? "Yes" : "No";
console.log("Is adult?", isAdult);

// Ternary with expressions
let price = 100;
let finalPrice = price > 50 ? price * 0.9 : price; // 10% discount if price > 50
console.log("Final price:", finalPrice);

// Nested ternary
let testScore = 85;
let result = testScore >= 90 ? "A" : 
              testScore >= 80 ? "B" : 
              testScore >= 70 ? "C" : "F";
console.log("Test result:", result);

console.log("\n=== LOGICAL OPERATORS FOR CONTROL FLOW ===");

// Using && for conditional execution
let isLoggedIn = true;
isLoggedIn && console.log("Welcome back!");

// Using || for default values
let username = null;
let displayName = username || "Guest";
console.log("Display name:", displayName);

// Nullish coalescing operator (??) - only uses default if null or undefined
let quantity = 0;
let orderQuantity = quantity ?? 10; // Uses 0 because it's not null/undefined
console.log("Order quantity:", orderQuantity);

let undefinedQuantity = undefined;
let fallbackQuantity = undefinedQuantity ?? 10; // Uses 10 because it's undefined
console.log("Fallback quantity:", fallbackQuantity);

console.log("\n=== MULTIPLE CONDITIONS ===");

// Using && (AND)
let hasLicense = true;
let hasCar = false;
if (hasLicense && hasCar) {
    console.log("You can drive");
} else {
    console.log("You cannot drive");
}

// Using || (OR)
let isWeekend = false;
let isHoliday = true;
if (isWeekend || isHoliday) {
    console.log("You can rest today");
} else {
    console.log("You need to work");
}

// Combining && and ||
let hasTicket = true;
let isVIP = false;
let hasBackstagePass = true;
if ((hasTicket && isVIP) || hasBackstagePass) {
    console.log("You can enter the VIP area");
} else {
    console.log("Regular access only");
}

console.log("\n=== TRUTHY AND FALSY VALUES ===");

// Falsy values: false, 0, "", null, undefined, NaN
// Everything else is truthy

let value1 = "";
if (value1) {
    console.log("Empty string is truthy");
} else {
    console.log("Empty string is falsy");
}

let value2 = 0;
if (value2) {
    console.log("Zero is truthy");
} else {
    console.log("Zero is falsy");
}

let value3 = "hello";
if (value3) {
    console.log("Non-empty string is truthy");
} else {
    console.log("Non-empty string is falsy");
}

let value4 = [];
if (value4) {
    console.log("Empty array is truthy");
} else {
    console.log("Empty array is falsy");
}

console.log("\n=== END OF CONTROL FLOW ===");
