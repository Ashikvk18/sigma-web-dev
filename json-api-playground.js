// ========================================
// JSON & API INTEGRATION PLAYGROUND
// ========================================

console.log("JSON & API Playground Loaded!");

// Global state
let realTimeInterval = null;
let currentUsers = [];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("JSON & API Playground initialized!");
    initializePlayground();
});

function initializePlayground() {
    setupEventListeners();
    loadInitialData();
}

// ========================================
// JSON MANIPULATION
// ========================================

function switchJsonTab(tabName) {
    // Update tab appearance
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const activeTab = Array.from(tabs).find(tab => 
        tab.textContent.toLowerCase().includes(tabName.replace('-', ' '))
    );
    if (activeTab) activeTab.classList.add('active');
    
    // Update content visibility
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));
    
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

function parseJson() {
    const input = document.getElementById('json-input').value;
    const result = document.getElementById('json-parse-result');
    
    try {
        const parsed = JSON.parse(input);
        
        let output = '✅ JSON Parsed Successfully!\n\n';
        output += `Type: ${typeof parsed}\n`;
        output += `Is Array: ${Array.isArray(parsed)}\n`;
        output += `Keys: ${Object.keys(parsed).join(', ')}\n\n`;
        output += 'Parsed Object:\n';
        output += JSON.stringify(parsed, null, 2);
        
        result.textContent = output;
        showNotification('JSON parsed successfully', 'success');
        
    } catch (error) {
        result.textContent = `❌ JSON Parse Error:\n${error.message}`;
        showNotification('Invalid JSON', 'error');
    }
}

function accessJsonProperties() {
    const input = document.getElementById('json-input').value;
    const result = document.getElementById('json-parse-result');
    
    try {
        const parsed = JSON.parse(input);
        
        let output = '🔍 Accessing JSON Properties:\n\n';
        
        // Demonstrate different ways to access properties
        if (typeof parsed === 'object' && parsed !== null) {
            output += 'Using dot notation:\n';
            Object.keys(parsed).forEach(key => {
                if (typeof parsed[key] !== 'object' || parsed[key] === null) {
                    output += `  obj.${key} = ${JSON.stringify(parsed[key])}\n`;
                } else {
                    output += `  obj.${key} = [Object]\n`;
                }
            });
            
            output += '\nUsing bracket notation:\n';
            Object.keys(parsed).forEach(key => {
                if (typeof parsed[key] !== 'object' || parsed[key] === null) {
                    output += `  obj["${key}"] = ${JSON.stringify(parsed[key])}\n`;
                } else {
                    output += `  obj["${key}"] = [Object]\n`;
                }
            });
            
            // Demonstrate nested access
            output += '\nNested property access:\n';
            if (parsed.address) {
                output += `  obj.address.city = ${parsed.address.city}\n`;
            }
            if (parsed.hobbies && parsed.hobbies.length > 0) {
                output += `  obj.hobbies[0] = ${parsed.hobbies[0]}\n`;
            }
        }
        
        result.textContent = output;
        showNotification('Properties accessed', 'info');
        
    } catch (error) {
        result.textContent = `❌ Error: ${error.message}`;
        showNotification('Error accessing properties', 'error');
    }
}

function iterateJson() {
    const input = document.getElementById('json-input').value;
    const result = document.getElementById('json-parse-result');
    
    try {
        const parsed = JSON.parse(input);
        
        let output = '🔄 Iterating JSON Properties:\n\n';
        
        if (typeof parsed === 'object' && parsed !== null) {
            // Object.keys()
            output += 'Using Object.keys():\n';
            Object.keys(parsed).forEach(key => {
                output += `  Key: ${key}, Value: ${JSON.stringify(parsed[key])}\n`;
            });
            
            // Object.values()
            output += '\nUsing Object.values():\n';
            Object.values(parsed).forEach((value, index) => {
                output += `  Index ${index}: ${JSON.stringify(value)}\n`;
            });
            
            // Object.entries()
            output += '\nUsing Object.entries():\n';
            Object.entries(parsed).forEach(([key, value]) => {
                output += `  [${key}]: ${JSON.stringify(value)}\n`;
            });
            
            // for...in loop
            output += '\nUsing for...in loop:\n';
            for (let key in parsed) {
                if (parsed.hasOwnProperty(key)) {
                    output += `  ${key}: ${JSON.stringify(parsed[key])}\n`;
                }
            }
        }
        
        result.textContent = output;
        showNotification('Iteration completed', 'info');
        
    } catch (error) {
        result.textContent = `❌ Error: ${error.message}`;
        showNotification('Error iterating JSON', 'error');
    }
}

function formatJson() {
    const input = document.getElementById('unformatted-json').value;
    const indentSize = document.getElementById('indent-size').value;
    const result = document.getElementById('json-format-result');
    
    try {
        const parsed = JSON.parse(input);
        
        let indent;
        if (indentSize === 'tab') {
            indent = '\t';
        } else {
            indent = parseInt(indentSize);
        }
        
        const formatted = JSON.stringify(parsed, null, indent);
        
        result.innerHTML = syntaxHighlightJson(formatted);
        showNotification('JSON formatted successfully', 'success');
        
    } catch (error) {
        result.textContent = `❌ Invalid JSON: ${error.message}`;
        showNotification('Invalid JSON', 'error');
    }
}

function minifyJson() {
    const input = document.getElementById('unformatted-json').value;
    const result = document.getElementById('json-format-result');
    
    try {
        const parsed = JSON.parse(input);
        const minified = JSON.stringify(parsed);
        
        result.innerHTML = syntaxHighlightJson(minified);
        showNotification('JSON minified successfully', 'success');
        
    } catch (error) {
        result.textContent = `❌ Invalid JSON: ${error.message}`;
        showNotification('Invalid JSON', 'error');
    }
}

function copyFormattedJson() {
    const result = document.getElementById('json-format-result');
    const text = result.textContent;
    
    navigator.clipboard.writeText(text).then(() => {
        showNotification('JSON copied to clipboard', 'success');
    }).catch(() => {
        showNotification('Failed to copy', 'error');
    });
}

function validateJson() {
    const input = document.getElementById('json-to-validate').value;
    const result = document.getElementById('json-validation-result');
    
    try {
        const parsed = JSON.parse(input);
        
        let output = '✅ JSON is Valid!\n\n';
        output += `Data Type: ${typeof parsed}\n`;
        output += `Is Array: ${Array.isArray(parsed)}\n`;
        
        if (typeof parsed === 'object' && parsed !== null) {
            output += `Number of Properties: ${Object.keys(parsed).length}\n`;
            output += `Property Names: ${Object.keys(parsed).join(', ')}\n`;
        }
        
        if (Array.isArray(parsed)) {
            output += `Array Length: ${parsed.length}\n`;
            if (parsed.length > 0) {
                output += `First Element Type: ${typeof parsed[0]}\n`;
            }
        }
        
        // Additional validation checks
        output += '\n📊 Validation Details:\n';
        output += `String Length: ${input.length} characters\n`;
        output += `Parsed Size: ${JSON.stringify(parsed).length} characters\n`;
        
        result.textContent = output;
        showNotification('JSON is valid', 'success');
        
    } catch (error) {
        let output = '❌ JSON is Invalid!\n\n';
        output += `Error: ${error.message}\n\n`;
        
        // Try to provide more helpful error information
        if (error.message.includes('position')) {
            output += '💡 Tip: Check for missing commas, quotes, or brackets around the error position.\n';
        } else if (error.message.includes('Unexpected token')) {
            output += '💡 Tip: Check for unexpected characters or missing quotes.\n';
        } else if (error.message.includes('Unexpected end')) {
            output += '💡 Tip: Check for missing closing brackets or braces.\n';
        }
        
        result.textContent = output;
        showNotification('JSON is invalid', 'error');
    }
}

function loadInvalidExample() {
    document.getElementById('json-to-validate').value = '{"name": "John", "age": 30, "city": "New York",}';
    validateJson();
}

function loadValidExample() {
    document.getElementById('json-to-validate').value = '{"name": "John", "age": 30, "city": "New York", "hobbies": ["reading", "coding"]}';
    validateJson();
}

function transformJson(operation) {
    const input = document.getElementById('source-json').value;
    const result = document.getElementById('transformed-json');
    
    try {
        const parsed = JSON.parse(input);
        let transformed;
        
        switch (operation) {
            case 'extractNames':
                if (parsed.users) {
                    transformed = parsed.users.map(user => user.name);
                } else {
                    transformed = ['No users array found'];
                }
                break;
                
            case 'groupByAge':
                if (parsed.users) {
                    transformed = parsed.users.reduce((groups, user) => {
                        const age = user.age;
                        if (!groups[age]) {
                            groups[age] = [];
                        }
                        groups[age].push(user.name);
                        return groups;
                    }, {});
                } else {
                    transformed = {error: 'No users array found'};
                }
                break;
                
            case 'filterByAge':
                if (parsed.users) {
                    transformed = parsed.users.filter(user => user.age > 25);
                } else {
                    transformed = [];
                }
                break;
                
            case 'addTimestamp':
                transformed = {
                    ...parsed,
                    timestamp: new Date().toISOString(),
                    processedAt: new Date().toLocaleString()
                };
                break;
                
            default:
                transformed = parsed;
        }
        
        result.innerHTML = syntaxHighlightJson(JSON.stringify(transformed, null, 2));
        showNotification(`JSON transformed: ${operation}`, 'success');
        
    } catch (error) {
        result.textContent = `❌ Error: ${error.message}`;
        showNotification('Transformation failed', 'error');
    }
}

// ========================================
// API TESTING
// ========================================

function switchApiTab(tabName) {
    // Update tab appearance
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const activeTab = Array.from(tabs).find(tab => 
        tab.textContent.toLowerCase().includes(tabName.replace('-', ' '))
    );
    if (activeTab) activeTab.classList.add('active');
    
    // Update content visibility
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));
    
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

async function callPublicAPI(url) {
    const result = document.getElementById('api-result');
    
    showLoading(result);
    
    try {
        const startTime = Date.now();
        const response = await fetch(url);
        const endTime = Date.now();
        
        const data = await response.json();
        
        let output = `✅ API Call Successful!\n\n`;
        output += `URL: ${url}\n`;
        output += `Status: ${response.status} ${response.statusText}\n`;
        output += `Response Time: ${endTime - startTime}ms\n`;
        output += `Content-Type: ${response.headers.get('content-type')}\n\n`;
        output += 'Response Data:\n';
        output += JSON.stringify(data, null, 2);
        
        result.textContent = output;
        showNotification('API call successful', 'success');
        
    } catch (error) {
        result.textContent = `❌ API Call Failed:\n${error.message}`;
        showNotification('API call failed', 'error');
    }
}

async function callCustomAPI() {
    const url = document.getElementById('api-url').value;
    const method = document.getElementById('api-method').value;
    const headersText = document.getElementById('api-headers').value;
    const bodyText = document.getElementById('api-body').value;
    const result = document.getElementById('api-result');
    const requestInfo = document.getElementById('api-request-info');
    const requestDetails = document.getElementById('request-details');
    
    if (!url) {
        showNotification('Please enter an API URL', 'error');
        return;
    }
    
    try {
        const headers = headersText ? JSON.parse(headersText) : {};
        const body = (method !== 'GET' && bodyText) ? JSON.parse(bodyText) : undefined;
        
        // Show request information
        let requestInfoText = `Method: ${method}\n`;
        requestInfoText += `URL: ${url}\n`;
        requestInfoText += `Headers: ${JSON.stringify(headers, null, 2)}\n`;
        if (body) {
            requestInfoText += `Body: ${JSON.stringify(body, null, 2)}\n`;
        }
        
        requestDetails.textContent = requestInfoText;
        requestInfo.style.display = 'block';
        
        showLoading(result);
        
        const startTime = Date.now();
        const response = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined
        });
        const endTime = Date.now();
        
        let responseData;
        const contentType = response.headers.get('content-type');
        
        if (contentType && contentType.includes('application/json')) {
            responseData = await response.json();
        } else {
            responseData = await response.text();
        }
        
        let output = `${response.ok ? '✅' : '❌'} API Call Completed!\n\n`;
        output += `Method: ${method}\n`;
        output += `URL: ${url}\n`;
        output += `Status: ${response.status} ${response.statusText}\n`;
        output += `Response Time: ${endTime - startTime}ms\n`;
        output += `Content-Type: ${contentType}\n\n`;
        
        if (typeof responseData === 'object') {
            output += 'Response Data:\n';
            output += JSON.stringify(responseData, null, 2);
        } else {
            output += 'Response Data:\n';
            output += responseData;
        }
        
        result.textContent = output;
        
        if (response.ok) {
            showNotification('API call successful', 'success');
        } else {
            showNotification(`API error: ${response.status}`, 'warning');
        }
        
    } catch (error) {
        result.textContent = `❌ API Call Failed:\n${error.message}`;
        showNotification('API call failed', 'error');
    }
}

function clearApiResults() {
    document.getElementById('api-result').textContent = 'API response will appear here...';
    document.getElementById('api-request-info').style.display = 'none';
    showNotification('Results cleared', 'info');
}

// ========================================
// API EXAMPLES
// ========================================

async function loadUsers() {
    const display = document.getElementById('users-display');
    
    showLoading(display);
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();
        
        currentUsers = users;
        
        let html = '<h4>Users Loaded:</h4>';
        users.forEach(user => {
            const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
            
            html += `
                <div class="user-card">
                    <div class="user-avatar">${initials}</div>
                    <div class="user-info">
                        <h3>${user.name}</h3>
                        <p>📧 ${user.email}</p>
                        <p>📱 ${user.phone}</p>
                        <p>🌐 ${user.website}</p>
                        <p>🏢 ${user.company.name}</p>
                    </div>
                </div>
            `;
        });
        
        display.innerHTML = html;
        showNotification(`Loaded ${users.length} users`, 'success');
        
    } catch (error) {
        display.textContent = `❌ Failed to load users: ${error.message}`;
        showNotification('Failed to load users', 'error');
    }
}

async function createUser() {
    const newUser = {
        name: 'New User',
        email: 'newuser@example.com',
        phone: '1-555-123-4567',
        website: 'newuser.com',
        company: {
            name: 'New Company'
        }
    };
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        });
        
        const createdUser = await response.json();
        
        showNotification(`User created with ID: ${createdUser.id}`, 'success');
        loadUsers(); // Refresh the users list
        
    } catch (error) {
        showNotification(`Failed to create user: ${error.message}`, 'error');
    }
}

async function updateUser() {
    if (currentUsers.length === 0) {
        showNotification('Please load users first', 'warning');
        return;
    }
    
    const firstUser = currentUsers[0];
    const updatedUser = {
        ...firstUser,
        name: 'Updated User',
        email: 'updated@example.com'
    };
    
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${firstUser.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        });
        
        const result = await response.json();
        showNotification(`User ${firstUser.id} updated`, 'success');
        loadUsers(); // Refresh the users list
        
    } catch (error) {
        showNotification(`Failed to update user: ${error.message}`, 'error');
    }
}

async function deleteUser() {
    if (currentUsers.length === 0) {
        showNotification('Please load users first', 'warning');
        return;
    }
    
    const lastUser = currentUsers[currentUsers.length - 1];
    
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${lastUser.id}`, {
            method: 'DELETE'
        });
        
        showNotification(`User ${lastUser.id} deleted`, 'success');
        loadUsers(); // Refresh the users list
        
    } catch (error) {
        showNotification(`Failed to delete user: ${error.message}`, 'error');
    }
}

function startRealTimeFetch() {
    const interval = parseInt(document.getElementById('fetch-interval').value) * 1000;
    const display = document.getElementById('real-time-display');
    
    if (realTimeInterval) {
        clearInterval(realTimeInterval);
    }
    
    realTimeInterval = setInterval(async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
            const data = await response.json();
            
            const timestamp = new Date().toLocaleTimeString();
            const output = `[${timestamp}] Latest Post:\n${JSON.stringify(data, null, 2)}`;
            
            display.textContent = output;
            
        } catch (error) {
            display.textContent = `[${new Date().toLocaleTimeString()}] Error: ${error.message}`;
        }
    }, interval);
    
    showNotification(`Real-time fetching started (${interval/1000}s interval)`, 'success');
}

function stopRealTimeFetch() {
    if (realTimeInterval) {
        clearInterval(realTimeInterval);
        realTimeInterval = null;
        showNotification('Real-time fetching stopped', 'info');
    }
}

// ========================================
// ERROR HANDLING DEMOS
// ========================================

async function demonstrateSuccess() {
    const result = document.getElementById('error-demo-result');
    
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const data = await response.json();
        
        result.textContent = `✅ Success Response:\n${JSON.stringify(data, null, 2)}`;
        showNotification('Success response demo', 'success');
        
    } catch (error) {
        result.textContent = `❌ Unexpected Error: ${error.message}`;
        showNotification('Unexpected error', 'error');
    }
}

async function demonstrateNetworkError() {
    const result = document.getElementById('error-demo-result');
    
    try {
        // Use an invalid URL to simulate network error
        const response = await fetch('https://invalid-url-that-does-not-exist.com/api');
        const data = await response.json();
        
        result.textContent = JSON.stringify(data, null, 2);
        
    } catch (error) {
        result.textContent = `🌐 Network Error Demonstrated:\n${error.message}\n\nThis is how you handle network errors in production:\n\ntry {\n  const response = await fetch(url);\n  const data = await response.json();\n} catch (error) {\n  console.error('Network error:', error);\n  // Show user-friendly message\n  showErrorMessage('Unable to connect. Please check your internet.');\n}`;
        showNotification('Network error demo', 'warning');
    }
}

async function demonstrateServerError() {
    const result = document.getElementById('error-demo-result');
    
    try {
        // Use an endpoint that returns 404
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/999999');
        
        if (!response.ok) {
            throw new Error(`Server Error: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        result.textContent = JSON.stringify(data, null, 2);
        
    } catch (error) {
        result.textContent = `🔥 Server Error Demonstrated:\n${error.message}\n\nThis is how you handle server errors:\n\ntry {\n  const response = await fetch(url);\n  \n  if (!response.ok) {\n    if (response.status === 404) {\n      throw new Error('Resource not found');\n    } else if (response.status >= 500) {\n      throw new Error('Server error. Please try again later.');\n    }\n  }\n  \n  const data = await response.json();\n} catch (error) {\n  console.error('Server error:', error);\n  // Show appropriate error message\n  showErrorMessage(error.message);\n}`;
        showNotification('Server error demo', 'warning');
    }
}

async function demonstrateTimeout() {
    const result = document.getElementById('error-demo-result');
    
    try {
        // Create a timeout promise
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Request timeout')), 2000);
        });
        
        // Race between fetch and timeout
        const response = await Promise.race([
            fetch('https://httpbin.org/delay/5'), // This takes 5 seconds
            timeoutPromise
        ]);
        
        const data = await response.json();
        result.textContent = JSON.stringify(data, null, 2);
        
    } catch (error) {
        result.textContent = `⏰ Timeout Error Demonstrated:\n${error.message}\n\nThis is how you implement timeouts:\n\nconst timeoutPromise = new Promise((_, reject) => {\n  setTimeout(() => reject(new Error('Request timeout')), 5000);\n});\n\ntry {\n  const response = await Promise.race([\n    fetch(url),\n    timeoutPromise\n  ]);\n  const data = await response.json();\n} catch (error) {\n  if (error.message === 'Request timeout') {\n    showErrorMessage('Request timed out. Please try again.');\n  }\n}`;
        showNotification('Timeout error demo', 'warning');
    }
}

async function demonstrateRetry() {
    const result = document.getElementById('retry-result');
    const retryCount = parseInt(document.getElementById('retry-count').value);
    const retryDelay = parseInt(document.getElementById('retry-delay').value);
    
    let attempt = 1;
    let lastError;
    
    while (attempt <= retryCount) {
        try {
            result.textContent = `🔄 Retry attempt ${attempt} of ${retryCount}...\n`;
            
            // Simulate a request that might fail (using a non-existent endpoint)
            const response = await fetch('https://jsonplaceholder.typicode.com/posts/999999');
            
            if (response.ok) {
                const data = await response.json();
                result.textContent = `✅ Success on attempt ${attempt}!\n\n${JSON.stringify(data, null, 2)}`;
                showNotification(`Success on attempt ${attempt}`, 'success');
                return;
            } else {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }
            
        } catch (error) {
            lastError = error;
            result.textContent += `❌ Attempt ${attempt} failed: ${error.message}\n`;
            
            if (attempt < retryCount) {
                result.textContent += `⏳ Waiting ${retryDelay}ms before retry...\n`;
                await new Promise(resolve => setTimeout(resolve, retryDelay));
            }
            
            attempt++;
        }
    }
    
    result.textContent += `\n💥 All ${retryCount} attempts failed!\nFinal Error: ${lastError.message}\n\nThis is a complete retry mechanism implementation.`;
    showNotification('All retry attempts failed', 'error');
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function syntaxHighlightJson(json) {
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        let cls = 'json-number';
        
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'json-key';
            } else {
                cls = 'json-string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'json-boolean';
        } else if (/null/.test(match)) {
            cls = 'json-null';
        }
        
        return '<span class="' + cls + '">' + match + '</span>';
    });
}

function showLoading(element) {
    element.innerHTML = '<div class="loading"></div> Loading...';
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function setupEventListeners() {
    // Auto-format JSON on input
    document.getElementById('unformatted-json').addEventListener('input', function() {
        if (this.value.trim()) {
            try {
                JSON.parse(this.value);
                // Valid JSON, auto-format
                setTimeout(() => formatJson(), 500);
            } catch (e) {
                // Invalid JSON, don't auto-format
            }
        }
    });
    
    // Auto-validate JSON on input
    document.getElementById('json-to-validate').addEventListener('input', function() {
        if (this.value.trim()) {
            try {
                JSON.parse(this.value);
                // Valid JSON
                document.getElementById('json-validation-result').textContent = '✅ JSON appears valid...';
            } catch (e) {
                // Invalid JSON
                document.getElementById('json-validation-result').textContent = '❌ JSON appears invalid...';
            }
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter: Parse JSON
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            const activeTab = document.querySelector('.tab.active');
            if (activeTab && activeTab.textContent.includes('Parser')) {
                e.preventDefault();
                parseJson();
            }
        }
        
        // Ctrl/Cmd + F: Format JSON
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            const activeTab = document.querySelector('.tab.active');
            if (activeTab && activeTab.textContent.includes('Formatter')) {
                e.preventDefault();
                formatJson();
            }
        }
        
        // Ctrl/Cmd + R: Make API request
        if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
            const activeTab = document.querySelector('.tab.active');
            if (activeTab && activeTab.textContent.includes('Custom')) {
                e.preventDefault();
                callCustomAPI();
            }
        }
    });
}

function loadInitialData() {
    // Load some initial data for demonstration
    setTimeout(() => {
        loadUsers();
    }, 1000);
}

console.log("JSON & API Playground - All systems ready! 🌐");
