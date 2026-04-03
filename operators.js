// ========================================
// JAVASCRIPT OPERATORS
// ========================================

console.log("=== ARITHMETIC OPERATORS ===");

let a = 10;
let b = 3;

console.log("a =", a, ", b =", b);

// Addition (+)
console.log("Addition (a + b):", a + b); // 13

// Subtraction (-)
console.log("Subtraction (a - b):", a - b); // 7

// Multiplication (*)
console.log("Multiplication (a * b):", a * b); // 30

// Division (/)
console.log("Division (a / b):", a / b); // 3.333...

// Modulus (remainder) (%)
console.log("Modulus (a % b):", a % b); // 1

// Exponentiation (**)
console.log("Exponentiation (a ** b):", a ** b); // 1000

// Increment (++)
let x = 5;
console.log("Pre-increment (++x):", ++x); // 6 (increments first, then returns)
x = 5;
console.log("Post-increment (x++):", x++); // 5 (returns first, then increments)
console.log("After post-increment:", x); // 6

// Decrement (--)
let y = 5;
console.log("Pre-decrement (--y):", --y); // 4
y = 5;
console.log("Post-decrement (y--):", y--); // 5
console.log("After post-decrement:", y); // 4

console.log("\n=== ASSIGNMENT OPERATORS ===");

let num = 10;
console.log("Initial num:", num);

// Simple assignment (=)
num = 15;
console.log("After num = 15:", num);

// Addition assignment (+=)
num += 5; // num = num + 5
console.log("After num += 5:", num); // 20

// Subtraction assignment (-=)
num -= 3; // num = num - 3
console.log("After num -= 3:", num); // 17

// Multiplication assignment (*=)
num *= 2; // num = num * 2
console.log("After num *= 2:", num); // 34

// Division assignment (/=)
num /= 2; // num = num / 2
console.log("After num /= 2:", num); // 17

// Modulus assignment (%=)
num %= 5; // num = num % 5
console.log("After num %= 5:", num); // 2

// Exponentiation assignment (**=)
num **= 3; // num = num ** 3
console.log("After num **= 3:", num); // 8

console.log("\n=== COMPARISON OPERATORS ===");

let p = 10;
let q = "10";
let r = 5;

// Equal (==) - loose equality (type coercion)
console.log("p == q (10 == '10'):", p == q); // true

// Strict equal (===) - strict equality (no type coercion)
console.log("p === q (10 === '10'):", p === q); // false

// Not equal (!=) - loose inequality
console.log("p != q (10 != '10'):", p != q); // false

// Strict not equal (!==) - strict inequality
console.log("p !== q (10 !== '10'):", p !== q); // true

// Greater than (>)
console.log("p > r (10 > 5):", p > r); // true

// Greater than or equal (>=)
console.log("p >= q (10 >= '10'):", p >= q); // true

// Less than (<)
console.log("r < p (5 < 10):", r < p); // true

// Less than or equal (<=)
console.log("r <= p (5 <= 10):", r <= p); // true

console.log("\n=== LOGICAL OPERATORS ===");

let isTrue = true;
let isFalse = false;

// AND (&&) - returns true if both operands are true
console.log("true && true:", true && true); // true
console.log("true && false:", true && false); // false
console.log("false && false:", false && false); // false

// OR (||) - returns true if at least one operand is true
console.log("true || true:", true || true); // true
console.log("true || false:", true || false); // true
console.log("false || false:", false || false); // false

// NOT (!) - reverses the boolean value
console.log("!true:", !true); // false
console.log("!false:", !false); // true

// Short-circuit evaluation
let result1 = isTrue || "default value"; // returns true
let result2 = isFalse || "default value"; // returns "default value"
console.log("Short-circuit OR examples:", result1, result2);

let result3 = isTrue && "value if true"; // returns "value if true"
let result4 = isFalse && "value if true"; // returns false
console.log("Short-circuit AND examples:", result3, result4);

console.log("\n=== STRING OPERATORS ===");

let firstName = "John";
let lastName = "Doe";

// Concatenation (+)
let fullName = firstName + " " + lastName;
console.log("String concatenation:", fullName);

// Concatenation assignment (+=)
let greeting = "Hello";
greeting += ", World!";
console.log("Concatenation assignment:", greeting);

console.log("\n=== TERNARY OPERATOR ===");

// condition ? value_if_true : value_if_false
let age = 18;
let canVote = age >= 18 ? "Yes" : "No";
console.log("Can vote (ternary):", canVote);

let score = 85;
let grade = score >= 90 ? "A" : 
            score >= 80 ? "B" : 
            score >= 70 ? "C" : 
            score >= 60 ? "D" : "F";
console.log("Grade (nested ternary):", grade);

console.log("\n=== TYPEOF OPERATOR ===");

console.log("typeof 42:", typeof 42);
console.log("typeof 'hello':", typeof "hello");
console.log("typeof true:", typeof true);
console.log("typeof undefined:", typeof undefined);
console.log("typeof null:", typeof null);
console.log("typeof {}:", typeof {});
console.log("typeof []:", typeof []);
console.log("typeof function(){}:", typeof function(){});

console.log("\n=== END OF OPERATORS ===");
