// ========================================
// JAVASCRIPT ERROR HANDLING
// ========================================

console.log("=== BASIC ERROR TYPES ===");

// 1. ReferenceError - accessing undefined variable
try {
    console.log(undefinedVariable);
} catch (error) {
    console.log("ReferenceError caught:", error.name);
    console.log("Error message:", error.message);
}

// 2. TypeError - wrong type operation
try {
    let num = 5;
    num(); // Trying to call a number as function
} catch (error) {
    console.log("TypeError caught:", error.name);
    console.log("Error message:", error.message);
}

// 3. SyntaxError - invalid JavaScript syntax
try {
    // This would normally cause a syntax error during parsing
    eval("let x = ;"); // Invalid syntax
} catch (error) {
    console.log("SyntaxError caught:", error.name);
    console.log("Error message:", error.message);
}

// 4. RangeError - number outside valid range
try {
    let arr = new Array(-5); // Negative array length
} catch (error) {
    console.log("RangeError caught:", error.name);
    console.log("Error message:", error.message);
}

console.log("\n=== TRY-CATCH-FINALLY ===");

function divide(a, b) {
    try {
        if (b === 0) {
            throw new Error("Division by zero is not allowed");
        }
        return a / b;
    } catch (error) {
        console.log("Error in division:", error.message);
        return null; // Return null if error occurs
    } finally {
        console.log("Division operation completed"); // Always runs
    }
}

console.log("10 / 2 =", divide(10, 2));
console.log("10 / 0 =", divide(10, 0));

console.log("\n=== THROWING CUSTOM ERRORS ===");

function validateAge(age) {
    if (typeof age !== 'number') {
        throw new TypeError("Age must be a number");
    }
    if (age < 0) {
        throw new RangeError("Age cannot be negative");
    }
    if (age > 120) {
        throw new RangeError("Age seems unrealistic");
    }
    if (age < 18) {
        throw new Error("User must be at least 18 years old");
    }
    return "Age is valid";
}

// Test validation
function testAge(age) {
    try {
        return validateAge(age);
    } catch (error) {
        return `Validation failed: ${error.name} - ${error.message}`;
    }
}

console.log("Test age 25:", testAge(25));
console.log("Test age 16:", testAge(16));
console.log("Test age -5:", testAge(-5));
console.log("Test age 'twenty':", testAge("twenty"));

console.log("\n=== CUSTOM ERROR CLASSES ===");

// Create custom error class
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = "ValidationError";
        this.field = field;
    }
}

class DatabaseError extends Error {
    constructor(message, code) {
        super(message);
        this.name = "DatabaseError";
        this.code = code;
    }
}

// Function using custom errors
function validateUser(user) {
    if (!user.name || user.name.trim() === '') {
        throw new ValidationError("Name is required", "name");
    }
    if (!user.email || !user.email.includes("@")) {
        throw new ValidationError("Valid email is required", "email");
    }
    if (user.age && user.age < 0) {
        throw new ValidationError("Age cannot be negative", "age");
    }
    return "User is valid";
}

// Test custom errors
function testUserValidation(user) {
    try {
        return validateUser(user);
    } catch (error) {
        if (error instanceof ValidationError) {
            return `Validation Error in field '${error.field}': ${error.message}`;
        } else {
            return `Unexpected error: ${error.message}`;
        }
    }
}

console.log("Valid user:", testUserValidation({name: "John", email: "john@example.com", age: 25}));
console.log("Invalid name:", testUserValidation({name: "", email: "john@example.com"}));
console.log("Invalid email:", testUserValidation({name: "John", email: "invalid-email"}));

console.log("\n=== NESTED TRY-CATCH ===");

function processData(data) {
    try {
        console.log("Processing data...");
        
        try {
            // Simulate inner operation that might fail
            if (data === null) {
                throw new Error("Data is null");
            }
            
            let result = JSON.parse(data);
            console.log("Data parsed successfully:", result);
            return result;
            
        } catch (parseError) {
            console.log("Parse error:", parseError.message);
            // Try alternative parsing
            return {fallback: true, originalData: data};
        }
        
    } catch (processingError) {
        console.log("Processing error:", processingError.message);
        return {error: true, message: processingError.message};
    }
}

console.log("Process valid JSON:", processData('{"name": "John", "age": 30}'));
console.log("Process invalid JSON:", processData('{"name": "John", age: 30}'));
console.log("Process null data:", processData(null));

console.log("\n=== ERROR HANDLING WITH ASYNC OPERATIONS ===");

// Simulate async operation that might fail
function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId <= 0) {
                reject(new Error("Invalid user ID"));
            } else if (userId === 404) {
                reject(new Error("User not found"));
            } else {
                resolve({id: userId, name: `User ${userId}`, email: `user${userId}@example.com`});
            }
        }, 1000);
    });
}

// Using async/await with try-catch
async function getUserData(userId) {
    try {
        console.log(`Fetching user ${userId}...`);
        const user = await fetchUserData(userId);
        console.log("User data:", user);
        return user;
    } catch (error) {
        console.log(`Failed to fetch user ${userId}:`, error.message);
        return null;
    }
}

// Test async error handling
async function testAsyncErrors() {
    await getUserData(1);  // Success
    await getUserData(0);  // Invalid ID
    await getUserData(404); // Not found
}

testAsyncErrors();

console.log("\n=== ERROR HANDLING PATTERNS ===");

// 1. Graceful degradation
function getConfig() {
    try {
        // Try to get config from environment
        return process.env.CONFIG || JSON.parse(localStorage.getItem('config'));
    } catch (error) {
        // Fallback to default config
        return {theme: 'light', language: 'en'};
    }
}

console.log("Config (fallback pattern):", getConfig());

// 2. Input validation with early returns
function calculatePrice(quantity, price, discount) {
    // Validate inputs
    if (typeof quantity !== 'number' || quantity <= 0) {
        throw new Error("Quantity must be a positive number");
    }
    if (typeof price !== 'number' || price <= 0) {
        throw new Error("Price must be a positive number");
    }
    if (discount && (typeof discount !== 'number' || discount < 0 || discount > 100)) {
        throw new Error("Discount must be between 0 and 100");
    }
    
    // Calculate
    let total = quantity * price;
    if (discount) {
        total = total * (1 - discount / 100);
    }
    
    return total;
}

// Test input validation
function testPriceCalculation() {
    try {
        console.log("Price calculation:", calculatePrice(5, 10, 10)); // Valid
        console.log("Price calculation:", calculatePrice(-1, 10)); // Invalid
    } catch (error) {
        console.log("Calculation error:", error.message);
    }
}

testPriceCalculation();

console.log("\n=== DEBUGGING ERRORS ===");

// Error object properties
try {
    JSON.parse("invalid json");
} catch (error) {
    console.log("Error properties:");
    console.log("- name:", error.name);
    console.log("- message:", error.message);
    console.log("- stack:", error.stack); // Call stack
}

// Console error methods
console.log("\nConsole error methods:");
console.error("This is an error message");
console.warn("This is a warning message");
console.info("This is an info message");

console.log("\n=== BEST PRACTICES ===");

// 1. Be specific in error handling
function specificErrorHandling(value) {
    try {
        // Some operation
        if (value === null) throw new Error("Value cannot be null");
        if (typeof value !== 'string') throw new TypeError("Value must be string");
        
        return value.toUpperCase();
        
    } catch (error) {
        if (error instanceof TypeError) {
            console.log("Type error occurred:", error.message);
        } else if (error instanceof Error) {
            console.log("General error occurred:", error.message);
        }
        return null;
    }
}

console.log("Specific error handling:", specificErrorHandling("hello"));
console.log("Specific error handling:", specificErrorHandling(123));

// 2. Don't catch everything blindly
function badErrorHandling() {
    try {
        // Some risky operation
        riskyOperation();
    } catch (e) {
        // Bad: catching everything silently
    }
}

function goodErrorHandling() {
    try {
        // Some risky operation
        riskyOperation();
    } catch (error) {
        // Good: log the error or handle it appropriately
        console.error("Operation failed:", error.message);
        // Optionally rethrow if you can't handle it
        throw error;
    }
}

// Simulate risky operation
function riskyOperation() {
    throw new Error("Something went wrong");
}

console.log("\n=== END OF ERROR HANDLING ===");
