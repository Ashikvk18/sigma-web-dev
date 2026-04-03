// ========================================
// JAVASCRIPT ARRAYS
// ========================================

console.log("=== CREATING ARRAYS ===");

// Array literal
let fruits = ["apple", "banana", "orange", "grape"];
console.log("Fruits array:", fruits);

// Array constructor
let numbers = new Array(1, 2, 3, 4, 5);
console.log("Numbers array:", numbers);

// Array with specified size
let emptyArray = new Array(3);
console.log("Empty array with size 3:", emptyArray);

// Mixed data types
let mixedArray = ["hello", 42, true, null, undefined, {name: "John"}, [1, 2, 3]];
console.log("Mixed array:", mixedArray);

console.log("\n=== ACCESSING ELEMENTS ===");

// Access by index
console.log("First fruit:", fruits[0]); // "apple"
console.log("Last fruit:", fruits[fruits.length - 1]); // "grape"

// Modifying elements
fruits[1] = "blueberry";
console.log("Modified fruits:", fruits);

// Adding elements at specific index
fruits[4] = "kiwi";
console.log("Fruits after adding at index 4:", fruits);

console.log("\n=== ARRAY PROPERTIES ===");

// Length property
console.log("Fruits length:", fruits.length);

console.log("\n=== BASIC ARRAY METHODS ===");

// push() - add to end
fruits.push("mango");
console.log("After push:", fruits);

// pop() - remove from end
let lastFruit = fruits.pop();
console.log("Popped fruit:", lastFruit);
console.log("After pop:", fruits);

// unshift() - add to beginning
fruits.unshift("strawberry");
console.log("After unshift:", fruits);

// shift() - remove from beginning
let firstFruit = fruits.shift();
console.log("Shifted fruit:", firstFruit);
console.log("After shift:", fruits);

console.log("\n=== SEARCHING AND FINDING ===");

let colors = ["red", "blue", "green", "yellow", "purple", "blue"];

// indexOf() - first occurrence
console.log("Index of 'blue':", colors.indexOf("blue")); // 1
console.log("Index of 'orange':", colors.indexOf("orange")); // -1 (not found)

// lastIndexOf() - last occurrence
console.log("Last index of 'blue':", colors.lastIndexOf("blue")); // 5

// includes() - check if element exists
console.log("Includes 'green':", colors.includes("green")); // true
console.log("Includes 'orange':", colors.includes("orange")); // false

// find() - find first element matching condition
let numbers2 = [5, 12, 8, 130, 44];
let found = numbers2.find(element => element > 10);
console.log("First number > 10:", found);

// findIndex() - find index of first element matching condition
let foundIndex = numbers2.findIndex(element => element > 10);
console.log("Index of first number > 10:", foundIndex);

console.log("\n=== TRANSFORMING ARRAYS ===");

// map() - create new array by transforming each element
let doubled = numbers2.map(x => x * 2);
console.log("Doubled numbers:", doubled);

// filter() - create new array with elements matching condition
let evenNumbers = numbers2.filter(x => x % 2 === 0);
console.log("Even numbers:", evenNumbers);

// reduce() - reduce array to single value
let sum = numbers2.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
console.log("Sum of numbers:", sum);

// reduceRight() - reduce from right to left
let concatenated = ["a", "b", "c"].reduceRight((acc, val) => acc + val);
console.log("Concatenated (right to left):", concatenated);

console.log("\n=== SLICING AND JOINING ===");

// slice() - extract portion of array
let sliced = colors.slice(1, 4); // from index 1 to 3 (4 is exclusive)
console.log("Sliced colors (1-3):", sliced);

// slice with negative indices
let slicedFromEnd = colors.slice(-3); // last 3 elements
console.log("Last 3 colors:", slicedFromEnd);

// join() - convert array to string
let joined = colors.join(", ");
console.log("Joined colors:", joined);

// toString() - default string conversion
let stringVersion = colors.toString();
console.log("Colors as string:", stringVersion);

console.log("\n=== MODIFYING ARRAYS ===");

// splice() - add/remove elements at any position
let months = ["Jan", "Feb", "Mar", "Apr", "May"];
console.log("Original months:", months);

// Remove elements
let removed = months.splice(1, 2); // remove 2 elements starting at index 1
console.log("Removed elements:", removed);
console.log("After splice remove:", months);

// Add elements
months.splice(1, 0, "Feb", "Mar"); // add at index 1, remove 0 elements
console.log("After splice add:", months);

// Replace elements
months.splice(2, 1, "March"); // replace 1 element at index 2
console.log("After splice replace:", months);

console.log("\n=== SORTING AND REVERSING ===");

let unsortedNumbers = [3, 1, 4, 1, 5, 9, 2, 6];

// sort() - sorts as strings by default
let sortedStrings = unsortedNumbers.slice(); // copy
sortedStrings.sort();
console.log("Sorted as strings:", sortedStrings);

// sort with compare function for numbers
let sortedNumbers = unsortedNumbers.slice(); // copy
sortedNumbers.sort((a, b) => a - b);
console.log("Sorted as numbers:", sortedNumbers);

// reverse()
let reversed = sortedNumbers.slice(); // copy
reversed.reverse();
console.log("Reversed:", reversed);

console.log("\n=== CHECKING AND TESTING ===");

// every() - check if all elements pass test
let allPositive = numbers2.every(x => x > 0);
console.log("All numbers positive?", allPositive);

// some() - check if at least one element passes test
let someGreaterThan100 = numbers2.some(x => x > 100);
console.log("Some numbers > 100?", someGreaterThan100);

console.log("\n=== ITERATION METHODS ===");

// forEach() - execute function for each element
console.log("forEach iteration:");
colors.forEach((color, index) => {
    console.log(`${index}: ${color}`);
});

// for...of loop
console.log("for...of iteration:");
for (let color of colors) {
    console.log(color);
}

console.log("\n=== ARRAY DESTRUCTURING ===");

let [first, second, third] = fruits;
console.log("Destructured:", first, second, third);

// With rest operator
let [primary, ...secondary] = colors;
console.log("Primary:", primary);
console.log("Secondary:", secondary);

// Skipping elements
let [, , thirdColor] = colors;
console.log("Third color:", thirdColor);

console.log("\n=== SPREAD OPERATOR WITH ARRAYS ===");

// Copy array
let fruitsCopy = [...fruits];
console.log("Copied fruits:", fruitsCopy);

// Combine arrays
let combined = [...fruits, ...colors];
console.log("Combined arrays:", combined);

// Add elements to array
let withNewElements = [...fruits, "papaya", "coconut"];
console.log("With new elements:", withNewElements);

console.log("\n=== STATIC ARRAY METHODS ===");

// Array.from() - create array from array-like object
let arrayFromString = Array.from("hello");
console.log("Array from string:", arrayFromString);

// Array.of() - create array from arguments
let arrayOf = Array.of(1, 2, 3, 4, 5);
console.log("Array.of:", arrayOf);

// Array.isArray() - check if value is array
console.log("Is fruits an array?", Array.isArray(fruits));
console.log("Is 'hello' an array?", Array.isArray("hello"));

console.log("\n=== MULTIDIMENSIONAL ARRAYS ===");

// 2D array
let matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
console.log("Matrix:", matrix);

// Accessing 2D array elements
console.log("Matrix[1][2]:", matrix[1][2]); // 6

// Flattening nested arrays
let nested = [1, [2, 3], [4, [5, 6]]];
let flat1 = nested.flat(); // one level
let flat2 = nested.flat(2); // two levels
console.log("Flat (1 level):", flat1);
console.log("Flat (2 levels):", flat2);

// flatMap() - map then flatten
let sentences = ["Hello world", "How are you", "Good morning"];
let words = sentences.flatMap(sentence => sentence.split(" "));
console.log("Words from sentences:", words);

console.log("\n=== END OF ARRAYS ===");
