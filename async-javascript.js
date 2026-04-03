// ========================================
// JAVASCRIPT ASYNC PROGRAMMING
// ========================================

console.log("=== SYNCHRONOUS VS ASYNCHRONOUS ===");

console.log("Start of program");

// Synchronous code
console.log("Synchronous operation 1");
console.log("Synchronous operation 2");

// Asynchronous code (setTimeout)
setTimeout(() => {
    console.log("Asynchronous operation (setTimeout)");
}, 2000);

console.log("End of program (but async will run later)");

console.log("\n=== CALLBACKS ===");

// Basic callback function
function greet(name, callback) {
    console.log(`Hello, ${name}!`);
    callback();
}

function sayGoodbye() {
    console.log("Goodbye!");
}

greet("Alice", sayGoodbye);

// Callback with parameters
function calculate(a, b, callback) {
    let result = a + b;
    callback(result);
}

function displayResult(result) {
    console.log(`The result is: ${result}`);
}

calculate(5, 3, displayResult);

// Callback Hell (Pyramid of Doom)
function getUserData(userId, callback) {
    setTimeout(() => {
        console.log("User data fetched");
        let user = {id: userId, name: `User ${userId}`};
        
        getUserPosts(userId, (posts) => {
            console.log("User posts fetched");
            
            getPostComments(posts[0].id, (comments) => {
                console.log("Post comments fetched");
                callback({user, posts, comments});
            });
        });
    }, 1000);
}

function getUserPosts(userId, callback) {
    setTimeout(() => {
        callback([{id: 1, title: "Post 1"}, {id: 2, title: "Post 2"}]);
    }, 500);
}

function getPostComments(postId, callback) {
    setTimeout(() => {
        callback(["Great post!", "Interesting read"]);
    }, 300);
}

// Using callback hell
getUserData(1, (data) => {
    console.log("Complete data:", data);
});

console.log("\n=== PROMISES BASICS ===");

// Creating a promise
let myPromise = new Promise((resolve, reject) => {
    let success = true;
    
    if (success) {
        resolve("Operation successful!");
    } else {
        reject("Operation failed!");
    }
});

// Consuming a promise
myPromise
    .then(result => console.log("Success:", result))
    .catch(error => console.log("Error:", error));

// Promise with async operation
function fetchUser(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({id: userId, name: `User ${userId}`});
            } else {
                reject(new Error("Invalid user ID"));
            }
        }, 1000);
    });
}

// Using promises
fetchUser(1)
    .then(user => console.log("User fetched:", user))
    .catch(error => console.log("Error:", error.message));

fetchUser(0)
    .then(user => console.log("User fetched:", user))
    .catch(error => console.log("Error:", error.message));

console.log("\n=== PROMISE CHAINING ===");

function getUser(id) {
    return new Promise(resolve => {
        setTimeout(() => resolve({id, name: `User ${id}`}), 500);
    });
}

function getPosts(userId) {
    return new Promise(resolve => {
        setTimeout(() => resolve([
            {id: 1, userId, title: "Post 1"},
            {id: 2, userId, title: "Post 2"}
        ]), 300);
    });
}

function getComments(postId) {
    return new Promise(resolve => {
        setTimeout(() => resolve([
            {id: 1, postId, text: "Great post!"},
            {id: 2, postId, text: "Nice read!"}
        ]), 200);
    });
}

// Promise chaining (flattened compared to callback hell)
getUser(1)
    .then(user => {
        console.log("Got user:", user);
        return getPosts(user.id);
    })
    .then(posts => {
        console.log("Got posts:", posts);
        return getComments(posts[0].id);
    })
    .then(comments => {
        console.log("Got comments:", comments);
    })
    .catch(error => {
        console.log("Error in chain:", error.message);
    });

console.log("\n=== PROMISE METHODS ===");

// Promise.all - waits for all promises to resolve
let promise1 = Promise.resolve(3);
let promise2 = new Promise(resolve => setTimeout(() => resolve("foo"), 1000));
let promise3 = Promise.resolve(42);

Promise.all([promise1, promise2, promise3])
    .then(values => {
        console.log("Promise.all results:", values);
    })
    .catch(error => {
        console.log("Promise.all error:", error);
    });

// Promise.race - resolves/rejects when first promise resolves/rejects
let race1 = new Promise(resolve => setTimeout(() => resolve("one"), 500));
let race2 = new Promise(resolve => setTimeout(() => resolve("two"), 100));

Promise.race([race1, race2])
    .then(value => {
        console.log("Promise.race winner:", value);
    });

// Promise.allSettled - waits for all promises to settle (resolve or reject)
let settled1 = Promise.resolve(3);
let settled2 = new Promise((resolve, reject) => 
    setTimeout(() => reject(new Error("Failed")), 1000)
);
let settled3 = Promise.resolve(42);

Promise.allSettled([settled1, settled2, settled3])
    .then(results => {
        console.log("Promise.allSettled results:");
        results.forEach((result, i) => {
            if (result.status === 'fulfilled') {
                console.log(`Promise ${i}: ${result.value}`);
            } else {
                console.log(`Promise ${i}: ${result.status} - ${result.reason.message}`);
            }
        });
    });

// Promise.any - resolves when any promise resolves (ES2021)
let any1 = Promise.reject(new Error("Failed 1"));
let any2 = Promise.resolve("Success 2");
let any3 = Promise.reject(new Error("Failed 3"));

Promise.any([any1, any2, any3])
    .then(value => {
        console.log("Promise.any result:", value);
    })
    .catch(error => {
        console.log("Promise.any error:", error.message);
    });

console.log("\n=== ASYNC/AWAIT ===");

// Basic async function
async function fetchData() {
    return "Data fetched";
}

fetchData().then(data => console.log("Async function result:", data));

// Async function with await
async function fetchUserWithAwait(userId) {
    try {
        console.log("Fetching user...");
        let user = await fetchUser(userId);
        console.log("Got user with await:", user);
        return user;
    } catch (error) {
        console.log("Error with await:", error.message);
        return null;
    }
}

fetchUserWithAwait(2);
fetchUserWithAwait(0);

// Converting promise chain to async/await
async function getUserDataAsync(userId) {
    try {
        console.log("Starting async data fetch...");
        
        let user = await getUser(userId);
        console.log("Step 1 - User:", user);
        
        let posts = await getPosts(user.id);
        console.log("Step 2 - Posts:", posts);
        
        let comments = await getComments(posts[0].id);
        console.log("Step 3 - Comments:", comments);
        
        return {user, posts, comments};
        
    } catch (error) {
        console.log("Error in async flow:", error.message);
        return null;
    }
}

getUserDataAsync(3);

console.log("\n=== PARALLEL ASYNC OPERATIONS ===");

// Sequential with async/await (slow)
async function sequentialOperations() {
    console.log("Sequential operations:");
    let start = Date.now();
    
    let user = await fetchUser(1);
    let posts = await getPosts(1);
    let comments = await getComments(1);
    
    let end = Date.now();
    console.log(`Sequential took: ${end - start}ms`);
    return {user, posts, comments};
}

// Parallel with Promise.all (fast)
async function parallelOperations() {
    console.log("Parallel operations:");
    let start = Date.now();
    
    let [user, posts, comments] = await Promise.all([
        fetchUser(1),
        getPosts(1),
        getComments(1)
    ]);
    
    let end = Date.now();
    console.log(`Parallel took: ${end - start}ms`);
    return {user, posts, comments};
}

// Run both to compare timing
sequentialOperations();
parallelOperations();

console.log("\n=== ERROR HANDLING IN ASYNC ===");

// Multiple await with single try-catch
async function multipleOperations() {
    try {
        let user = await fetchUser(1);
        let posts = await getPosts(user.id);
        let comments = await getComments(posts[0].id);
        
        return {user, posts, comments};
    } catch (error) {
        console.log("Caught error:", error.message);
        throw error; // Re-throw if needed
    }
}

// Individual error handling
async function individualErrorHandling() {
    let user, posts, comments;
    
    try {
        user = await fetchUser(1);
    } catch (error) {
        console.log("User fetch failed:", error.message);
        user = {id: 0, name: "Guest"};
    }
    
    try {
        posts = await getPosts(user.id);
    } catch (error) {
        console.log("Posts fetch failed:", error.message);
        posts = [];
    }
    
    try {
        comments = await getComments(1);
    } catch (error) {
        console.log("Comments fetch failed:", error.message);
        comments = [];
    }
    
    return {user, posts, comments};
}

individualErrorHandling();

console.log("\n=== ASYNC ITERATORS AND GENERATORS ===");

// Async generator function
async function* asyncGenerator() {
    yield await Promise.resolve("First value");
    yield await Promise.resolve("Second value");
    yield await Promise.resolve("Third value");
}

// Using async generator
async function consumeAsyncGenerator() {
    for await (let value of asyncGenerator()) {
        console.log("Async generator value:", value);
    }
}

consumeAsyncGenerator();

console.log("\n=== PRACTICAL EXAMPLES ===");

// Simulate API calls
function apiCall(endpoint, data = null) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (endpoint === "/login" && data?.username === "admin" && data?.password === "password") {
                resolve({token: "abc123", user: {id: 1, name: "Admin"}});
            } else if (endpoint === "/data") {
                resolve({items: [1, 2, 3, 4, 5]});
            } else {
                reject(new Error("API endpoint not found"));
            }
        }, 500);
    });
}

// Login and fetch data flow
async function loginAndFetchData() {
    try {
        console.log("Logging in...");
        let loginResponse = await apiCall("/login", {username: "admin", password: "password"});
        console.log("Login successful:", loginResponse);
        
        console.log("Fetching data...");
        let dataResponse = await apiCall("/data");
        console.log("Data fetched:", dataResponse);
        
        return {user: loginResponse.user, data: dataResponse.items};
        
    } catch (error) {
        console.log("Login or data fetch failed:", error.message);
        return null;
    }
}

loginAndFetchData();

// Retry pattern with async/await
async function retryOperation(operation, maxRetries = 3) {
    for (let i = 0; i < maxRetries; i++) {
        try {
            console.log(`Attempt ${i + 1}...`);
            let result = await operation();
            console.log("Operation successful!");
            return result;
        } catch (error) {
            console.log(`Attempt ${i + 1} failed:`, error.message);
            if (i === maxRetries - 1) {
                throw new Error(`Operation failed after ${maxRetries} attempts`);
            }
        }
    }
}

// Simulate flaky operation
function flakyOperation() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (Math.random() > 0.7) {
                resolve("Success!");
            } else {
                reject(new Error("Random failure"));
            }
        }, 200);
    });
}

// Test retry pattern
retryOperation(flakyOperation)
    .then(result => console.log("Final result:", result))
    .catch(error => console.log("Final error:", error.message));

console.log("\n=== TOP-LEVEL AWAIT (ES2022) ===");

// Note: This only works in ES modules (files with .mjs extension or type="module")
// Uncomment to test in a module environment:
// const topLevelResult = await Promise.resolve("Top-level await works!");
// console.log(topLevelResult);

console.log("\n=== END OF ASYNC JAVASCRIPT ===");
