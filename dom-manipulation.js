// ========================================
// JAVASCRIPT DOM MANIPULATION
// ========================================

console.log("DOM Manipulation Examples Loaded!");

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM fully loaded!");
    initializeEventListeners();
});

// ========================================
// SELECTING ELEMENTS
// ========================================

function demonstrateSelection() {
    console.log("\n=== SELECTING ELEMENTS ===");
    
    // getElementById - gets element by ID
    let specialPara = document.getElementById('special-paragraph');
    console.log("By ID:", specialPara.textContent);
    
    // getElementsByClassName - gets collection by class name
    let paragraphs = document.getElementsByClassName('paragraph');
    console.log("By class name - count:", paragraphs.length);
    for (let i = 0; i < paragraphs.length; i++) {
        console.log(`Paragraph ${i + 1}:`, paragraphs[i].textContent);
    }
    
    // getElementsByTagName - gets collection by tag name
    let allParagraphs = document.getElementsByTagName('p');
    console.log("By tag name - count:", allParagraphs.length);
    
    // querySelector - gets first matching element
    let firstParagraph = document.querySelector('.paragraph');
    console.log("Query selector (first):", firstParagraph.textContent);
    
    // querySelectorAll - gets all matching elements
    let allParagraphsQuery = document.querySelectorAll('.paragraph');
    console.log("Query selector all - count:", allParagraphsQuery.length);
    allParagraphsQuery.forEach((para, index) => {
        console.log(`Query para ${index + 1}:`, para.textContent);
    });
    
    // Complex selectors
    let nestedSpan = document.querySelector('#main-content .container span');
    console.log("Complex selector:", nestedSpan.textContent);
}

// ========================================
// CREATING AND MODIFYING ELEMENTS
// ========================================

function addElement() {
    console.log("\n=== ADDING ELEMENTS ===");
    
    // Create new element
    let newParagraph = document.createElement('p');
    newParagraph.textContent = 'This is a dynamically added paragraph!';
    newParagraph.className = 'highlight';
    
    // Add to DOM
    let playground = document.getElementById('element-playground');
    playground.appendChild(newParagraph);
    
    console.log("Added new paragraph to playground");
}

function modifyElement() {
    console.log("\n=== MODIFYING ELEMENTS ===");
    
    let playground = document.getElementById('element-playground');
    let firstChild = playground.firstElementChild;
    
    if (firstChild) {
        // Change text content
        firstChild.textContent = 'This paragraph has been modified!';
        
        // Change HTML content
        firstChild.innerHTML = 'This paragraph has <strong>bold</strong> and <em>italic</em> text!';
        
        console.log("Modified first paragraph");
    }
}

function removeElement() {
    console.log("\n=== REMOVING ELEMENTS ===");
    
    let playground = document.getElementById('element-playground');
    let lastChild = playground.lastElementChild;
    
    if (lastChild) {
        playground.removeChild(lastChild);
        console.log("Removed last element from playground");
    }
}

function replaceElement() {
    console.log("\n=== REPLACING ELEMENTS ===");
    
    let playground = document.getElementById('element-playground');
    let firstChild = playground.firstElementChild;
    
    if (firstChild) {
        let newElement = document.createElement('div');
        newElement.innerHTML = '<h3>Replaced Element</h3><p>This is a completely new element!</p>';
        
        playground.replaceChild(newElement, firstChild);
        console.log("Replaced first element");
    }
}

// ========================================
// WORKING WITH ATTRIBUTES
// ========================================

function changeImageSrc() {
    console.log("\n=== CHANGING ATTRIBUTES ===");
    
    let image = document.getElementById('demo-image');
    let currentSrc = image.src;
    
    // Toggle between two images
    if (currentSrc.includes('150')) {
        image.src = 'https://via.placeholder.com/200';
        image.alt = 'Larger Demo Image';
    } else {
        image.src = 'https://via.placeholder.com/150';
        image.alt = 'Demo Image';
    }
    
    console.log("Changed image src to:", image.src);
}

function toggleAttribute() {
    console.log("\n=== TOGGLING ATTRIBUTES ===");
    
    let image = document.getElementById('demo-image');
    
    // Toggle border attribute
    if (image.hasAttribute('border')) {
        image.removeAttribute('border');
        console.log("Removed border attribute");
    } else {
        image.setAttribute('border', '5');
        console.log("Added border attribute");
    }
}

function addCustomAttributes() {
    console.log("\n=== CUSTOM ATTRIBUTES ===");
    
    let image = document.getElementById('demo-image');
    
    // Add data attributes
    image.setAttribute('data-id', 'demo-image-1');
    image.setAttribute('data-category', 'demo');
    image.setAttribute('data-timestamp', new Date().toISOString());
    
    console.log("Added custom attributes:");
    console.log("data-id:", image.getAttribute('data-id'));
    console.log("data-category:", image.getAttribute('data-category'));
    console.log("data-timestamp:", image.getAttribute('data-timestamp'));
}

// ========================================
// WORKING WITH STYLES
// ========================================

function changeInlineStyle() {
    console.log("\n=== INLINE STYLES ===");
    
    let styleDemo = document.getElementById('style-demo');
    
    // Change inline styles
    styleDemo.style.backgroundColor = 'lightgreen';
    styleDemo.style.color = 'darkgreen';
    styleDemo.style.fontSize = '18px';
    styleDemo.style.padding = '15px';
    styleDemo.style.borderRadius = '8px';
    
    console.log("Changed inline styles");
}

function toggleClasses() {
    console.log("\n=== TOGGLING CLASSES ===");
    
    let styleDemo = document.getElementById('style-demo');
    
    // Toggle classes
    styleDemo.classList.toggle('blue-bg');
    styleDemo.classList.toggle('red-text');
    
    // Add and remove classes
    if (styleDemo.classList.contains('highlight')) {
        styleDemo.classList.remove('highlight');
        console.log("Removed highlight class");
    } else {
        styleDemo.classList.add('highlight');
        console.log("Added highlight class");
    }
    
    console.log("Current classes:", styleDemo.className);
}

function checkStyles() {
    console.log("\n=== CHECKING STYLES ===");
    
    let styleDemo = document.getElementById('style-demo');
    
    // Check computed styles
    let computedStyle = window.getComputedStyle(styleDemo);
    console.log("Computed background color:", computedStyle.backgroundColor);
    console.log("Computed font size:", computedStyle.fontSize);
    
    // Check classes
    console.log("Has highlight class:", styleDemo.classList.contains('highlight'));
    console.log("Has blue-bg class:", styleDemo.classList.contains('blue-bg'));
}

// ========================================
// EVENT HANDLING
// ========================================

function initializeEventListeners() {
    console.log("\n=== INITIALIZING EVENT LISTENERS ===");
    
    // Click event
    let clickBtn = document.getElementById('click-btn');
    clickBtn.addEventListener('click', function() {
        updateEventOutput('Button was clicked!');
        console.log("Click event triggered");
    });
    
    // Double click event
    clickBtn.addEventListener('dblclick', function() {
        updateEventOutput('Button was double-clicked!');
        console.log("Double click event triggered");
    });
    
    // Mouse events
    let hoverBtn = document.getElementById('hover-btn');
    hoverBtn.addEventListener('mouseenter', function() {
        updateEventOutput('Mouse entered button area');
        this.style.backgroundColor = '#28a745';
    });
    
    hoverBtn.addEventListener('mouseleave', function() {
        updateEventOutput('Mouse left button area');
        this.style.backgroundColor = '#007bff';
    });
    
    // Input events
    let inputField = document.getElementById('input-field');
    inputField.addEventListener('input', function() {
        updateEventOutput(`Input value: ${this.value}`);
    });
    
    inputField.addEventListener('focus', function() {
        updateEventOutput('Input field focused');
        this.style.borderColor = '#007bff';
    });
    
    inputField.addEventListener('blur', function() {
        updateEventOutput('Input field lost focus');
        this.style.borderColor = '#ddd';
    });
    
    // Select events
    let selectField = document.getElementById('select-field');
    selectField.addEventListener('change', function() {
        updateEventOutput(`Selected: ${this.value}`);
    });
    
    // Keyboard events
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && event.ctrlKey) {
            updateEventOutput('Ctrl+Enter pressed!');
        }
    });
    
    console.log("All event listeners initialized");
}

function updateEventOutput(message) {
    let output = document.getElementById('event-output');
    let timestamp = new Date().toLocaleTimeString();
    output.innerHTML = `<strong>[${timestamp}]</strong> ${message}`;
}

// ========================================
// FORM HANDLING
// ========================================

// Form submission
document.getElementById('demo-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent actual form submission
    
    console.log("\n=== FORM SUBMISSION ===");
    
    // Get form data
    let formData = new FormData(this);
    let data = {};
    
    // Process regular fields
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    // Handle special cases
    data.gender = document.querySelector('input[name="gender"]:checked')?.value || 'Not specified';
    data.newsletter = document.getElementById('newsletter').checked;
    
    console.log("Form data:", data);
    
    // Display form data
    let output = document.getElementById('form-output');
    output.innerHTML = `
        <h4>Form Submitted:</h4>
        <pre>${JSON.stringify(data, null, 2)}</pre>
    `;
    
    // Reset form after 3 seconds
    setTimeout(() => {
        this.reset();
        output.innerHTML = '<em>Form has been reset</em>';
    }, 3000);
});

// Form validation
document.getElementById('name').addEventListener('input', function() {
    let name = this.value;
    if (name.length < 2) {
        this.style.borderColor = 'red';
        this.setCustomValidity('Name must be at least 2 characters');
    } else {
        this.style.borderColor = 'green';
        this.setCustomValidity('');
    }
});

// ========================================
// DOM TRAVERSAL
// ========================================

function demonstrateTraversal() {
    console.log("\n=== DOM TRAVERSAL ===");
    
    let parentDiv = document.getElementById('parent-div');
    
    // Parent relationships
    console.log("Parent element:", parentDiv.parentElement.id);
    
    // Child relationships
    console.log("Children count:", parentDiv.children.length);
    console.log("First child:", parentDiv.firstElementChild.textContent);
    console.log("Last child:", parentDiv.lastElementChild.textContent);
    
    // Sibling relationships
    let firstChild = parentDiv.firstElementChild;
    console.log("Next sibling:", firstChild.nextElementSibling.textContent);
    console.log("Previous sibling of last child:", parentDiv.lastElementChild.previousElementSibling.textContent);
    
    // Find specific elements
    let allParagraphs = parentDiv.querySelectorAll('p');
    console.log("All paragraphs in parent:");
    allParagraphs.forEach((para, index) => {
        console.log(`  ${index + 1}: ${para.textContent}`);
    });
    
    // Closest method - find closest ancestor matching selector
    let nestedSpan = document.querySelector('#traversal-demo span');
    let closestContainer = nestedSpan.closest('.container');
    console.log("Closest container to span:", closestContainer.id);
}

// ========================================
// DYNAMIC LIST MANAGEMENT
// ========================================

function addItem() {
    console.log("\n=== DYNAMIC LIST MANAGEMENT ===");
    
    let input = document.getElementById('new-item');
    let itemText = input.value.trim();
    
    if (itemText === '') {
        alert('Please enter an item!');
        return;
    }
    
    // Create new item element
    let newItem = document.createElement('div');
    newItem.className = 'item';
    newItem.innerHTML = `
        ${itemText}
        <button onclick="removeItem(this)" style="float: right; background-color: #dc3545;">Remove</button>
    `;
    
    // Add click event to highlight
    newItem.addEventListener('click', function(e) {
        if (e.target.tagName !== 'BUTTON') {
            this.classList.toggle('highlight');
        }
    });
    
    // Add to list
    let itemList = document.getElementById('item-list');
    itemList.appendChild(newItem);
    
    // Clear input
    input.value = '';
    input.focus();
    
    console.log("Added item:", itemText);
}

function removeItem(button) {
    let item = button.parentElement;
    let itemText = item.textContent.replace('Remove', '').trim();
    
    if (confirm(`Remove "${itemText}"?`)) {
        item.remove();
        console.log("Removed item:", itemText);
    }
}

// ========================================
// ADVANCED DOM OPERATIONS
// ========================================

// Clone elements
function cloneExample() {
    let original = document.querySelector('.item');
    if (original) {
        let clone = original.cloneNode(true);
        clone.textContent = clone.textContent.replace('Item 1', 'Cloned Item');
        document.getElementById('item-list').appendChild(clone);
    }
}

// Insert elements at specific positions
function insertExample() {
    let list = document.getElementById('item-list');
    let firstItem = list.firstElementChild;
    
    if (firstItem) {
        let newItem = document.createElement('div');
        newItem.className = 'item';
        newItem.textContent = 'Inserted at beginning';
        list.insertBefore(newItem, firstItem);
    }
}

// Batch DOM operations for better performance
function batchOperation() {
    let fragment = document.createDocumentFragment();
    
    for (let i = 0; i < 5; i++) {
        let item = document.createElement('div');
        item.className = 'item';
        item.textContent = `Batch Item ${i + 1}`;
        fragment.appendChild(item);
    }
    
    document.getElementById('item-list').appendChild(fragment);
    console.log("Added 5 items using document fragment");
}

console.log("\n=== DOM MANIPULATION EXAMPLES READY ===");
