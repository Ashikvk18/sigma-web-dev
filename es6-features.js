// ========================================
// JAVASCRIPT ES6+ FEATURES
// ========================================

console.log("=== TEMPLATE LITERALS ===");

// Basic template literals
let name = "Alice";
let age = 25;
let message = `Hello, my name is ${name} and I'm ${age} years old.`;
console.log("Template literal:", message);

// Multi-line strings
let multiLine = `This is a
multi-line string
that spans multiple
lines without escape characters.`;
console.log("Multi-line string:", multiLine);

// Template literals with expressions
let price = 19.99;
let quantity = 3;
let total = `Total: $${(price * quantity).toFixed(2)}`;
console.log("Expression in template:", total);

// Tagged template literals
function highlight(strings, ...values) {
    return strings.reduce((result, str, i) => {
        const value = values[i] ? `<strong>${values[i]}</strong>` : '';
        return result + str + value;
    }, '');
}

let highlighted = highlight`Name: ${name}, Age: ${age}`;
console.log("Tagged template literal:", highlighted);

console.log("\n=== DESTRUCTURING ===");

// Array destructuring
let colors = ["red", "green", "blue", "yellow"];
let [first, second, third] = colors;
console.log("Array destructuring:", first, second, third);

// Skipping elements
let [, , , fourth] = colors;
console.log("Skipped to fourth:", fourth);

// Rest operator in destructuring
let [primary, ...secondary] = colors;
console.log("Primary:", primary);
console.log("Secondary colors:", secondary);

// Default values
let [a, b, c, d, e = "purple"] = colors;
console.log("With default:", e);

// Object destructuring
let person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    city: "New York"
};

let {firstName, lastName} = person;
console.log("Object destructuring:", firstName, lastName);

// Renaming variables
let {firstName: fName, lastName: lName} = person;
console.log("Renamed variables:", fName, lName);

// Default values in object destructuring
let {firstName: name2, country = "USA"} = person;
console.log("With default country:", country);

// Nested destructuring
let employee = {
    id: 1,
    personal: {
        name: "Jane Smith",
        age: 28
    },
    job: {
        title: "Developer",
        salary: 75000
    }
};

let {personal: {name, age}, job: {title}} = employee;
console.log("Nested destructuring:", name, age, title);

console.log("\n=== SPREAD OPERATOR (...) ===");

// Spread with arrays
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let combined = [...arr1, ...arr2];
console.log("Combined arrays:", combined);

// Spread with array literals
let numbers = [0, ...arr1, 4, ...arr2, 7];
console.log("Spread in array literal:", numbers);

// Spread with function arguments
function sum(a, b, c, d) {
    return a + b + c + d;
}
let nums = [1, 2, 3, 4];
console.log("Sum with spread:", sum(...nums));

// Spread with objects
let obj1 = {a: 1, b: 2};
let obj2 = {c: 3, d: 4};
let merged = {...obj1, ...obj2};
console.log("Merged objects:", merged);

// Overriding properties with spread
let original = {x: 1, y: 2, z: 3};
let updated = {...original, y: 20, w: 4};
console.log("Updated object:", updated);

// Spread for copying
let copy = {...original};
console.log("Copied object:", copy);

console.log("\n=== REST OPERATOR (...) ===");

// Rest parameters in functions
function sumAll(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}
console.log("Sum all numbers:", sumAll(1, 2, 3, 4, 5));

// Rest with other parameters
function greet(greeting, ...names) {
    names.forEach(name => console.log(`${greeting}, ${name}!`));
}
greet("Hello", "Alice", "Bob", "Charlie");

// Rest in destructuring
let [firstItem, ...restItems] = [10, 20, 30, 40, 50];
console.log("First item:", firstItem);
console.log("Rest items:", restItems);

let {x, y, ...rest} = {x: 1, y: 2, z: 3, w: 4};
console.log("X and Y:", x, y);
console.log("Rest properties:", rest);

console.log("\n=== ENHANCED OBJECT LITERALS ===");

// Property shorthand
let username = "johndoe";
let email = "john@example.com";

let user = {
    username,  // same as username: username
    email      // same as email: email
};
console.log("Property shorthand:", user);

// Method shorthand
let calculator = {
    add(a, b) {
        return a + b;
    },
    
    subtract(a, b) {
        return a - b;
    }
};
console.log("Method shorthand:", calculator.add(5, 3));

// Computed property names
let propName = "dynamic";
let dynamicObj = {
    [propName]: "This is dynamic",
    ["computed_" + "property"]: "Another computed property"
};
console.log("Computed properties:", dynamicObj);

console.log("\n=== ARROW FUNCTIONS ===");

// Basic arrow function
let add = (a, b) => a + b;
console.log("Arrow function:", add(3, 4));

// Arrow function with multiple statements
let multiply = (a, b) => {
    let result = a * b;
    console.log(`Multiplying ${a} and ${b}`);
    return result;
};
console.log("Arrow function with body:", multiply(5, 6));

// Arrow function with single parameter
let square = x => x * x;
console.log("Single parameter arrow:", square(7));

// Arrow function with no parameters
let getRandom = () => Math.random();
console.log("No parameters arrow:", getRandom());

// Arrow functions and 'this'
let person2 = {
    name: "Bob",
    hobbies: ["reading", "coding", "gaming"],
    
    // Regular function - 'this' refers to person2
    printHobbiesRegular: function() {
        console.log(`${this.name}'s hobbies (regular):`);
        this.hobbies.forEach(function(hobby) {
            console.log(`- ${hobby}`); // 'this' is undefined here in strict mode
        });
    },
    
    // Arrow function - 'this' is inherited from outer scope
    printHobbiesArrow: function() {
        console.log(`${this.name}'s hobbies (arrow):`);
        this.hobbies.forEach(hobby => {
            console.log(`- ${hobby}`); // 'this' refers to person2
        });
    }
};

person2.printHobbiesArrow();

console.log("\n=== DEFAULT PARAMETERS ===");

// Default parameters
function greetUser(name = "Guest", age = 0) {
    console.log(`Hello, ${name}! You are ${age} years old.`);
}
greetUser("Alice", 25);
greetUser("Bob");
greetUser();

// Default parameters with expressions
function createPerson(name, age = 18, greeting = `Hello, ${name}!`) {
    return {
        name,
        age,
        greeting
    };
}
console.log("Default with expression:", createPerson("Charlie"));

console.log("\n=== ENHANCED STRING METHODS ===");

// startsWith(), endsWith(), includes()
let text = "Hello, World!";

console.log("Starts with 'Hello':", text.startsWith("Hello"));
console.log("Ends with 'World!':", text.endsWith("World!"));
console.log("Includes 'World':", text.includes("World"));

// repeat()
let repeated = "abc".repeat(3);
console.log("Repeated string:", repeated);

// padStart() and padEnd()
let number = "5";
let padded = number.padStart(3, "0");
let paddedEnd = number.padEnd(3, "0");
console.log("Padded start:", padded);
console.log("Padded end:", paddedEnd);

console.log("\n=== ENHANCED NUMBER METHODS ===");

// Number.isFinite(), Number.isNaN()
console.log("Is finite (123):", Number.isFinite(123));
console.log("Is finite (Infinity):", Number.isFinite(Infinity));
console.log("Is NaN (NaN):", Number.isNaN(NaN));
console.log("Is NaN (123):", Number.isNaN(123));

// Number.isInteger()
console.log("Is integer (123):", Number.isInteger(123));
console.log("Is integer (123.45):", Number.isInteger(123.45));

// Number.isSafeInteger()
console.log("Is safe integer:", Number.isSafeInteger(Number.MAX_SAFE_INTEGER));

// Math methods
console.log("Math.trunc(4.9):", Math.trunc(4.9)); // 4
console.log("Math.sign(-5):", Math.sign(-5)); // -1
console.log("Math.cbrt(27):", Math.cbrt(27)); // 3

console.log("\n=== ARRAY METHODS ===");

// Array.from()
let arrayFromString = Array.from("hello");
console.log("Array from string:", arrayFromString);

// Array.of()
let arrayOfNumbers = Array.of(1, 2, 3, 4, 5);
console.log("Array.of:", arrayOfNumbers);

// find() and findIndex()
let numbers2 = [5, 12, 8, 130, 44];
let found = numbers2.find(x => x > 10);
let foundIndex = numbers2.findIndex(x => x > 10);
console.log("Found > 10:", found);
console.log("Found index:", foundIndex);

// entries(), keys(), values()
let entries = ["a", "b", "c"].entries();
console.log("Entries:", [...entries]);

let keys = ["a", "b", "c"].keys();
console.log("Keys:", [...keys]);

let values = ["a", "b", "c"].values();
console.log("Values:", [...values]);

console.log("\n=== SET AND MAP ===");

// Set
let mySet = new Set([1, 2, 3, 2, 4, 1]);
console.log("Set (unique values):", mySet);

mySet.add(5);
mySet.add(3); // Duplicate, won't be added
console.log("Set after adding:", mySet);

console.log("Set has 3:", mySet.has(3));
console.log("Set size:", mySet.size);

mySet.delete(2);
console.log("Set after deleting 2:", mySet);

// Map
let myMap = new Map([
    ["name", "Alice"],
    ["age", 25],
    ["city", "New York"]
]);
console.log("Map:", myMap);

myMap.set("country", "USA");
console.log("Map after setting:", myMap);

console.log("Get name:", myMap.get("name"));
console.log("Has age:", myMap.has("age"));
console.log("Map size:", myMap.size);

myMap.delete("city");
console.log("Map after deleting city:", myMap);

console.log("\n=== END OF ES6+ FEATURES ===");
