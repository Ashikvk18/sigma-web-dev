// ========================================
// REGULAR EXPRESSIONS PLAYGROUND
// ========================================

console.log("Regex Playground Loaded!");

// Global state
let currentFlags = ['g'];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("Regex Playground initialized!");
    initializePlayground();
});

function initializePlayground() {
    setupEventListeners();
    runInitialTests();
}

// ========================================
// BASIC REGEX TESTER
// ========================================

function testRegex() {
    const pattern = document.getElementById('regex-pattern').value;
    const text = document.getElementById('test-text').value;
    const result = document.getElementById('regex-result');
    
    if (!pattern) {
        showNotification('Please enter a regex pattern', 'error');
        return;
    }
    
    try {
        const flags = currentFlags.join('');
        const regex = new RegExp(pattern, flags);
        
        let output = `Pattern: /${pattern}/${flags}\n`;
        output += `Text: "${text}"\n`;
        output += '=' .repeat(50) + '\n';
        
        // Test methods
        output += `test() result: ${regex.test(text)}\n`;
        
        if (flags.includes('g')) {
            const matches = text.match(regex);
            output += `match() result: ${JSON.stringify(matches)}\n`;
            output += `Number of matches: ${matches ? matches.length : 0}\n`;
        } else {
            const match = text.match(regex);
            output += `match() result: ${JSON.stringify(match)}\n`;
        }
        
        // Show groups if they exist
        const execResult = regex.exec(text);
        if (execResult) {
            output += `exec() result: ${JSON.stringify(execResult)}\n`;
            output += `Full match: "${execResult[0]}"\n`;
            if (execResult.length > 1) {
                output += `Groups:\n`;
                for (let i = 1; i < execResult.length; i++) {
                    output += `  Group ${i}: "${execResult[i]}"\n`;
                }
            }
        }
        
        result.textContent = output;
        showNotification('Regex test completed', 'success');
        
    } catch (error) {
        result.textContent = `Error: ${error.message}`;
        showNotification('Invalid regex pattern', 'error');
    }
}

function showMatches() {
    const pattern = document.getElementById('regex-pattern').value;
    const text = document.getElementById('test-text').value;
    const result = document.getElementById('regex-result');
    
    if (!pattern) {
        showNotification('Please enter a regex pattern', 'error');
        return;
    }
    
    try {
        const flags = (currentFlags.includes('g') ? currentFlags.join('') : currentFlags.join('') + 'g');
        const regex = new RegExp(pattern, flags);
        const matches = text.match(regex);
        
        let output = `Pattern: /${pattern}/${flags}\n`;
        output += `Text: "${text}"\n`;
        output += '=' .repeat(50) + '\n';
        
        if (matches) {
            output += `Found ${matches.length} matches:\n`;
            matches.forEach((match, index) => {
                output += `${index + 1}. "${match}"\n`;
            });
        } else {
            output += 'No matches found';
        }
        
        result.textContent = output;
        
    } catch (error) {
        result.textContent = `Error: ${error.message}`;
        showNotification('Invalid regex pattern', 'error');
    }
}

function replaceText() {
    const pattern = document.getElementById('regex-pattern').value;
    const text = document.getElementById('test-text').value;
    const result = document.getElementById('regex-result');
    
    if (!pattern) {
        showNotification('Please enter a regex pattern', 'error');
        return;
    }
    
    const replacement = prompt('Enter replacement text:');
    if (replacement === null) return;
    
    try {
        const flags = currentFlags.join('');
        const regex = new RegExp(pattern, flags);
        const replaced = text.replace(regex, replacement);
        
        let output = `Pattern: /${pattern}/${flags}\n`;
        output += `Replacement: "${replacement}"\n`;
        output += `Original: "${text}"\n`;
        output += `Replaced: "${replaced}"\n`;
        output += '=' .repeat(50) + '\n';
        output += `Changes made: ${text !== replaced ? 'Yes' : 'No'}`;
        
        result.textContent = output;
        showNotification('Text replacement completed', 'success');
        
    } catch (error) {
        result.textContent = `Error: ${error.message}`;
        showNotification('Invalid regex pattern', 'error');
    }
}

function splitText() {
    const pattern = document.getElementById('regex-pattern').value;
    const text = document.getElementById('test-text').value;
    const result = document.getElementById('regex-result');
    
    if (!pattern) {
        showNotification('Please enter a regex pattern', 'error');
        return;
    }
    
    try {
        const regex = new RegExp(pattern, currentFlags.join(''));
        const parts = text.split(regex);
        
        let output = `Pattern: /${pattern}/${currentFlags.join('')}\n`;
        output += `Text: "${text}"\n`;
        output += '=' .repeat(50) + '\n';
        output += `Split into ${parts.length} parts:\n`;
        parts.forEach((part, index) => {
            output += `${index + 1}. "${part}"\n`;
        });
        
        result.textContent = output;
        showNotification('Text split completed', 'success');
        
    } catch (error) {
        result.textContent = `Error: ${error.message}`;
        showNotification('Invalid regex pattern', 'error');
    }
}

// ========================================
// FLAGS MANAGEMENT
// ========================================

function toggleFlag(flag) {
    const flagElement = document.querySelector(`[data-flag="${flag}"]`);
    
    if (currentFlags.includes(flag)) {
        currentFlags = currentFlags.filter(f => f !== flag);
        flagElement.classList.remove('active');
    } else {
        currentFlags.push(flag);
        flagElement.classList.add('active');
    }
    
    console.log('Current flags:', currentFlags);
}

// ========================================
// PATTERN LIBRARY
// ========================================

function usePattern(pattern, name) {
    document.getElementById('regex-pattern').value = pattern;
    showNotification(`Using pattern: ${name}`, 'info');
    
    // Auto-test with current text
    setTimeout(() => testRegex(), 100);
}

// ========================================
// FORM VALIDATION
// ========================================

const validationPatterns = {
    email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address'
    },
    phone: {
        pattern: /^\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})$/,
        message: 'Please enter a valid phone number'
    },
    password: {
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/,
        message: 'Password must be 8+ chars with uppercase, lowercase, and number'
    },
    url: {
        pattern: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/,
        message: 'Please enter a valid URL starting with http:// or https://'
    },
    username: {
        pattern: /^[a-zA-Z0-9_]{3,20}$/,
        message: 'Username must be 3-20 characters (letters, numbers, underscore)'
    },
    zipcode: {
        pattern: /^\d{5}(-\d{4})?$/,
        message: 'Please enter a valid ZIP code (12345 or 12345-6789)'
    }
};

function validateField(fieldName) {
    const input = document.getElementById(`${fieldName}-input`);
    const field = document.getElementById(`${fieldName}-field`);
    const message = document.getElementById(`${fieldName}-message`);
    const validation = validationPatterns[fieldName];
    
    const value = input.value.trim();
    
    if (value === '') {
        field.classList.remove('valid', 'invalid');
        message.textContent = '';
        message.className = 'validation-message';
        return;
    }
    
    const regex = validation.pattern;
    const isValid = regex.test(value);
    
    if (isValid) {
        field.classList.remove('invalid');
        field.classList.add('valid');
        message.textContent = '✓ Valid';
        message.className = 'validation-message valid';
    } else {
        field.classList.remove('valid');
        field.classList.add('invalid');
        message.textContent = '✗ ' + validation.message;
        message.className = 'validation-message invalid';
    }
}

// ========================================
// CHEAT SHEET TABS
// ========================================

function switchCheatTab(tabName) {
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

// ========================================
// ADVANCED EXAMPLES
// ========================================

function switchAdvancedTab(tabName) {
    // Update tab appearance
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const activeTab = Array.from(tabs).find(tab => 
        tab.textContent.toLowerCase().includes(tabName)
    );
    if (activeTab) activeTab.classList.add('active');
    
    // Update content visibility
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));
    
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

function highlightText() {
    const pattern = document.getElementById('highlight-pattern').value;
    const output = document.getElementById('highlight-output');
    const originalText = output.textContent;
    
    if (!pattern) {
        showNotification('Please enter a pattern to highlight', 'error');
        return;
    }
    
    try {
        const regex = new RegExp(`(${pattern})`, 'g');
        const highlighted = originalText.replace(regex, '<span class="match-highlight">$1</span>');
        output.innerHTML = highlighted;
        showNotification('Text highlighted successfully', 'success');
    } catch (error) {
        showNotification('Invalid pattern', 'error');
    }
}

function clearHighlight() {
    const output = document.getElementById('highlight-output');
    output.innerHTML = output.textContent;
    showNotification('Highlight cleared', 'info');
}

function extractEmails() {
    const text = document.getElementById('extract-text').value;
    const result = document.getElementById('extract-result');
    
    const emailPattern = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const emails = text.match(emailPattern) || [];
    
    result.textContent = `Found ${emails.length} email(s):\n${emails.join('\n')}`;
    showNotification(`Extracted ${emails.length} email(s)`, 'success');
}

function extractPhones() {
    const text = document.getElementById('extract-text').value;
    const result = document.getElementById('extract-result');
    
    const phonePattern = /\b\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}\b/g;
    const phones = text.match(phonePattern) || [];
    
    result.textContent = `Found ${phones.length} phone number(s):\n${phones.join('\n')}`;
    showNotification(`Extracted ${phones.length} phone number(s)`, 'success');
}

function extractUrls() {
    const text = document.getElementById('extract-text').value;
    const result = document.getElementById('extract-result');
    
    const urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const urls = text.match(urlPattern) || [];
    
    result.textContent = `Found ${urls.length} URL(s):\n${urls.join('\n')}`;
    showNotification(`Extracted ${urls.length} URL(s)`, 'success');
}

function extractNames() {
    const text = document.getElementById('extract-text').value;
    const result = document.getElementById('extract-result');
    
    // Simple name pattern - capitalized words
    const namePattern = /\b[A-Z][a-z]+(?:\s[A-Z][a-z]+)*\b/g;
    const names = text.match(namePattern) || [];
    
    // Filter out common non-name words
    const filteredNames = names.filter(name => 
        !['Contact', 'Email', 'Phone', 'Website'].includes(name)
    );
    
    result.textContent = `Found ${filteredNames.length} name(s):\n${filteredNames.join('\n')}`;
    showNotification(`Extracted ${filteredNames.length} name(s)`, 'success');
}

// ========================================
// TEST SUITE
// ========================================

const testCases = [
    {
        name: 'Email',
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        tests: ['test@example.com', 'invalid.email', 'user@domain.co.uk', 'user@.com', '@domain.com']
    },
    {
        name: 'Phone',
        pattern: /^\(?(\d{3})\)?[-. ]?(\d{3})[-. ]?(\d{4})$/,
        tests: ['123-456-7890', '(555) 123-4567', '1234567890', '12-34-56', 'abc-def-ghij']
    },
    {
        name: 'URL',
        pattern: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b/,
        tests: ['https://google.com', 'http://example.org', 'ftp://invalid.com', 'www.google.com', 'https://']
    },
    {
        name: 'Hex Color',
        pattern: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
        tests: ['#FF5733', '#fff', '#123ABC', '#GGGGGG', '123456', '#12']
    },
    {
        name: 'Zip Code',
        pattern: /^\d{5}(-\d{4})?$/,
        tests: ['12345', '12345-6789', '1234', '123456', '12345-678', 'abcde']
    }
];

function runTestSuite() {
    const result = document.getElementById('test-results');
    let output = 'REGEX TEST SUITE RESULTS\n';
    output += '=' .repeat(50) + '\n\n';
    
    let totalTests = 0;
    let passedTests = 0;
    
    testCases.forEach(testCase => {
        output += `Testing: ${testCase.name}\n`;
        output += `Pattern: ${testCase.pattern}\n`;
        output += '-'.repeat(30) + '\n';
        
        testCase.tests.forEach(testInput => {
            totalTests++;
            const passed = testCase.pattern.test(testInput);
            if (passed) passedTests++;
            
            output += `${passed ? '✓' : '✗'} "${testInput}"\n`;
        });
        
        output += '\n';
    });
    
    output += '=' .repeat(50) + '\n';
    output += `Total Tests: ${totalTests}\n`;
    output += `Passed: ${passedTests}\n`;
    output += `Failed: ${totalTests - passedTests}\n`;
    output += `Success Rate: ${Math.round((passedTests / totalTests) * 100)}%\n`;
    
    result.textContent = output;
    showNotification(`Test suite completed: ${passedTests}/${totalTests} passed`, 'info');
}

function addCustomTest() {
    const pattern = prompt('Enter regex pattern:');
    if (!pattern) return;
    
    const testInput = prompt('Enter test input:');
    if (!testInput) return;
    
    try {
        const regex = new RegExp(pattern);
        const passed = regex.test(testInput);
        
        const result = document.getElementById('test-results');
        const currentContent = result.textContent;
        
        const newTest = `\nCustom Test:\nPattern: ${pattern}\nInput: "${testInput}"\nResult: ${passed ? 'PASS' : 'FAIL'}\n`;
        
        result.textContent = currentContent + newTest;
        showNotification('Custom test added', 'success');
        
    } catch (error) {
        showNotification('Invalid regex pattern', 'error');
    }
}

function runInitialTests() {
    // Run basic validation on page load
    setTimeout(() => {
        runTestSuite();
    }, 500);
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

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
    // Auto-test on pattern change
    document.getElementById('regex-pattern').addEventListener('input', function() {
        if (this.value && document.getElementById('test-text').value) {
            testRegex();
        }
    });
    
    // Auto-test on text change
    document.getElementById('test-text').addEventListener('input', function() {
        if (this.value && document.getElementById('regex-pattern').value) {
            testRegex();
        }
    });
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Enter: Test regex
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            testRegex();
        }
        
        // Ctrl/Cmd + H: Highlight text
        if ((e.ctrlKey || e.metaKey) && e.key === 'h') {
            e.preventDefault();
            highlightText();
        }
        
        // Ctrl/Cmd + T: Run test suite
        if ((e.ctrlKey || e.metaKey) && e.key === 't') {
            e.preventDefault();
            runTestSuite();
        }
    });
    
    // Clear highlight on pattern change in highlight section
    document.getElementById('highlight-pattern').addEventListener('input', function() {
        if (this.value === '') {
            clearHighlight();
        }
    });
}

// ========================================
// EDUCATIONAL EXAMPLES
// ========================================

function demonstrateRegexConcepts() {
    const examples = {
        'Basic Matching': {
            pattern: 'cat',
            text: 'The cat sat on the mat. catapult',
            explanation: 'Matches "cat" anywhere in the text'
        },
        'Case Insensitive': {
            pattern: 'cat',
            flags: 'i',
            text: 'The CAT sat on the mat. Cat',
            explanation: 'Matches "cat" regardless of case'
        },
        'Word Boundaries': {
            pattern: '\\bcat\\b',
            text: 'The cat sat on the catapult',
            explanation: 'Matches "cat" only as a whole word'
        },
        'Quantifiers': {
            pattern: 'ca+t',
            text: 'ct cat caat caaat',
            explanation: 'Matches "c" followed by one or more "a"s and "t"'
        },
        'Character Classes': {
            pattern: '[0-9]+',
            text: 'Call 123-456-7890 for help',
            explanation: 'Matches one or more digits'
        },
        'Groups': {
            pattern: '(\\d{3})-(\\d{3})-(\\d{4})',
            text: 'Phone: 123-456-7890',
            explanation: 'Captures area code, prefix, and line number'
        }
    };
    
    // Add examples to a dropdown or auto-demonstrate
    console.log('Regex examples loaded:', examples);
}

// Load educational examples on init
demonstrateRegexConcepts();

console.log("Regex Playground - All systems ready! 🔍");
