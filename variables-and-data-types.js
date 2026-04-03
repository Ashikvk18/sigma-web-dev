// ========================================
// JAVASCRIPT VARIABLES AND DATA TYPES
// ========================================

console.log("=== VARIABLES ===");

// 1. VAR (function-scoped, can be redeclared and reassigned)
var name = "John";
console.log("var name:", name);

var age = 25;
var age = 30; // Can be redeclared
console.log("var age (redeclared):", age);

// 2. LET (block-scoped, cannot be redeclared, can be reassigned)
let city = "New York";
console.log("let city:", city);

city = "Los Angeles"; // Can be reassigned
console.log("let city (reassigned):", city);

// let city = "Chicago"; // This would cause an error - cannot redeclare

// 3. CONST (block-scoped, cannot be redeclared or reassigned)
const country = "USA";
console.log("const country:", country);

// country = "Canada"; // This would cause an error - cannot reassign
// const country = "Mexico"; // This would cause an error - cannot redeclare

console.log("\n=== DATA TYPES ===");

// 1. STRING
let firstName = "Alice";
let lastName = 'Smith';
let fullName = `Alice Smith`; // Template literal
console.log("String examples:", firstName, lastName, fullName);

// 2. NUMBER
let integer = 42;
let float = 3.14;
let negative = -10;
let infinity = Infinity;
let notANumber = NaN;
console.log("Number examples:", integer, float, negative, infinity, notANumber);

// 3. BOOLEAN
let isTrue = true;
let isFalse = false;
console.log("Boolean examples:", isTrue, isFalse);

// 4. UNDEFINED
let undefinedVar;
console.log("Undefined variable:", undefinedVar);

// 5. NULL
let nullVar = null;
console.log("Null variable:", nullVar);

// 6. OBJECT (complex data type)
let person = {
    name: "Bob",
    age: 35,
    isStudent: false
};
console.log("Object example:", person);

// 7. ARRAY (special type of object)
let numbers = [1, 2, 3, 4, 5];
let mixedArray = ["hello", 42, true, null];
console.log("Array examples:", numbers, mixedArray);

// 8. FUNCTION
function greet() {
    return "Hello!";
}
console.log("Function example:", greet());

// 9. SYMBOL (ES6)
let symbol1 = Symbol("description");
let symbol2 = Symbol("description");
console.log("Symbol examples:", symbol1, symbol1 === symbol2); // false

console.log("\n=== TYPE CHECKING ===");

// typeof operator
console.log("typeof 'hello':", typeof "hello"); // string
console.log("typeof 42:", typeof 42); // number
console.log("typeof true:", typeof true); // boolean
console.log("typeof undefined:", typeof undefined); // undefined
console.log("typeof null:", typeof null); // object (this is a known JavaScript quirk)
console.log("typeof {}:", typeof {}); // object
console.log("typeof []:", typeof []); // object
console.log("typeof function(){}:", typeof function(){}); // function

console.log("\n=== TYPE CONVERSION ===");

// String conversion
let numToString = String(123);
let boolToString = String(true);
console.log("String conversion:", numToString, boolToString);

// Number conversion
let strToNumber = Number("456");
let boolToNumber = Number(false);
let invalidNumber = Number("abc");
console.log("Number conversion:", strToNumber, boolToNumber, invalidNumber);

// Boolean conversion
let numToBool = Boolean(0);
let strToBool = Boolean("");
let emptyArrayToBool = Boolean([]);
console.log("Boolean conversion:", numToBool, strToBool, emptyArrayToBool);

console.log("\n=== END OF VARIABLES AND DATA TYPES ===");
