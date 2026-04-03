// ========================================
// JAVASCRIPT OBJECTS
// ========================================

console.log("=== CREATING OBJECTS ===");

// Object literal syntax
let person = {
    name: "John Doe",
    age: 30,
    city: "New York",
    isStudent: false
};
console.log("Person object:", person);

// Object with methods
let car = {
    brand: "Toyota",
    model: "Camry",
    year: 2020,
    
    // Method
    start: function() {
        console.log("Car started!");
    },
    
    // ES6 method shorthand
    stop() {
        console.log("Car stopped!");
    },
    
    // Method with this keyword
    getInfo: function() {
        return `${this.brand} ${this.model} (${this.year})`;
    }
};
console.log("Car object:", car);

console.log("\n=== ACCESSING PROPERTIES ===");

// Dot notation
console.log("Person name (dot notation):", person.name);
console.log("Person age (dot notation):", person.age);

// Bracket notation
console.log("Person name (bracket notation):", person["name"]);
console.log("Person age (bracket notation):", person["age"]);

// Bracket notation with variable
let propertyName = "city";
console.log("Person city (variable property):", person[propertyName]);

// Accessing non-existent properties
console.log("Person salary:", person.salary); // undefined

console.log("\n=== MODIFYING PROPERTIES ===");

// Updating existing properties
person.age = 31;
console.log("Updated age:", person.age);

// Adding new properties
person.email = "john@example.com";
person["phone"] = "123-456-7890";
console.log("Person after adding properties:", person);

// Deleting properties
delete person.isStudent;
console.log("Person after deleting isStudent:", person);

console.log("\n=== OBJECT METHODS ===");

// Object.keys() - get array of property names
let keys = Object.keys(person);
console.log("Person keys:", keys);

// Object.values() - get array of property values
let values = Object.values(person);
console.log("Person values:", values);

// Object.entries() - get array of [key, value] pairs
let entries = Object.entries(person);
console.log("Person entries:", entries);

console.log("\n=== CHECKING PROPERTIES ===");

// hasOwnProperty() - check if object has own property
console.log("Person has 'name' property:", person.hasOwnProperty("name"));
console.log("Person has 'toString' property:", person.hasOwnProperty("toString")); // false

// 'in' operator - checks own and inherited properties
console.log("'name' in person:", "name" in person);
console.log("'toString' in person:", "toString" in person); // true (inherited)

console.log("\n=== OBJECT DESTRUCTURING ===");

// Basic destructuring
let {name, age} = person;
console.log("Destructured name:", name);
console.log("Destructured age:", age);

// Destructuring with different variable names
let {name: personName, age: personAge} = person;
console.log("Renamed name:", personName);
console.log("Renamed age:", personAge);

// Destructuring with default values
let {name: n, salary: s = 50000} = person;
console.log("Name with default:", n);
console.log("Salary with default:", s);

// Nested object destructuring
let employee = {
    id: 1,
    personal: {
        firstName: "Jane",
        lastName: "Smith"
    },
    job: {
        title: "Developer",
        department: "IT"
    }
};

let {personal: {firstName, lastName}, job: {title}} = employee;
console.log("Nested destructuring:", firstName, lastName, title);

console.log("\n=== SPREAD OPERATOR WITH OBJECTS ===");

// Copying objects
let personCopy = {...person};
console.log("Person copy:", personCopy);

// Merging objects
let address = {street: "123 Main St", city: "Boston", zip: "02108"};
let personWithAddress = {...person, ...address};
console.log("Person with address:", personWithAddress);

// Overriding properties with spread
let updatedPerson = {...person, age: 35, country: "USA"};
console.log("Updated person:", updatedPerson);

console.log("\n=== OBJECT METHODS AND THIS ===");

// Using 'this' in methods
let calculator = {
    value: 0,
    
    add(num) {
        this.value += num;
        return this;
    },
    
    subtract(num) {
        this.value -= num;
        return this;
    },
    
    multiply(num) {
        this.value *= num;
        return this;
    },
    
    getResult() {
        return this.value;
    }
};

// Method chaining
let result = calculator.add(10).multiply(2).subtract(5).getResult();
console.log("Calculator result:", result);

console.log("\n=== CONSTRUCTOR FUNCTIONS ===");

// Constructor function
function User(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.fullName = function() {
        return `${this.firstName} ${this.lastName}`;
    };
}

// Creating instances
let user1 = new User("Alice", "Johnson", 25);
let user2 = new User("Bob", "Wilson", 30);

console.log("User 1:", user1.fullName());
console.log("User 2:", user2.fullName());

console.log("\n=== PROTOTYPES ===");

// Adding method to prototype
User.prototype.getAgeInDays = function() {
    return this.age * 365;
};

console.log("User 1 age in days:", user1.getAgeInDays());

console.log("\n=== ES6 CLASSES ===");

// Class declaration
class Animal {
    constructor(name, species) {
        this.name = name;
        this.species = species;
    }
    
    speak() {
        console.log(`${this.name} makes a sound`);
    }
    
    // Static method
    static getKingdom() {
        return "Animalia";
    }
}

// Class inheritance
class Dog extends Animal {
    constructor(name, breed) {
        super(name, "Canine"); // Call parent constructor
        this.breed = breed;
    }
    
    speak() {
        console.log(`${this.name} barks`);
    }
    
    wagTail() {
        console.log(`${this.name} wags tail`);
    }
}

let dog = new Dog("Rex", "Golden Retriever");
dog.speak();
dog.wagTail();
console.log("Animal kingdom:", Animal.getKingdom());

console.log("\n=== OBJECT ASSIGN AND MERGE ===");

// Object.assign() - copy properties
let target = {a: 1, b: 2};
let source = {b: 3, c: 4};
let merged = Object.assign(target, source);
console.log("Merged object:", merged);

// Creating new object without modifying original
let original = {x: 1, y: 2};
let copy = Object.assign({}, original, {y: 3, z: 4});
console.log("Original:", original);
console.log("Copy:", copy);

console.log("\n=== FREEZING AND SEALING ===");

// Object.seal() - prevent adding/removing properties, allow modifying existing
let sealedObj = {name: "John", age: 30};
Object.seal(sealedObj);
sealedObj.age = 31; // Allowed
// sealedObj.city = "NYC"; // Error (in strict mode)
// delete sealedObj.name; // Error (in strict mode)
console.log("Sealed object:", sealedObj);

// Object.freeze() - prevent any changes
let frozenObj = {name: "Jane", age: 25};
Object.freeze(frozenObj);
// frozenObj.age = 26; // Error (in strict mode)
// frozenObj.city = "Boston"; // Error (in strict mode)
// delete frozenObj.name; // Error (in strict mode)
console.log("Frozen object:", frozenObj);

console.log("\n=== GETTERS AND SETTERS ===");

let temperature = {
    _celsius: 0, // Convention for private properties
    
    // Getter
    get celsius() {
        return this._celsius;
    },
    
    // Setter
    set celsius(value) {
        if (value < -273.15) {
            console.log("Temperature below absolute zero is not possible");
            return;
        }
        this._celsius = value;
    },
    
    // Getter for fahrenheit
    get fahrenheit() {
        return this._celsius * 9/5 + 32;
    },
    
    // Setter for fahrenheit
    set fahrenheit(value) {
        this._celsius = (value - 32) * 5/9;
    }
};

temperature.celsius = 25;
console.log("Celsius:", temperature.celsius);
console.log("Fahrenheit:", temperature.fahrenheit);

temperature.fahrenheit = 68;
console.log("Celsius after setting fahrenheit:", temperature.celsius);

console.log("\n=== END OF OBJECTS ===");
