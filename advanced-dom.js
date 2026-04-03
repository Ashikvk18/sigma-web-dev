// ========================================
// ADVANCED DOM MANIPULATION
// ========================================

console.log("Advanced DOM Manipulation Loaded!");

// Global state
let todos = [];
let draggedElement = null;
let fieldCounter = 0;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("Advanced DOM initialized!");
    initializeApp();
});

function initializeApp() {
    loadTodosFromStorage();
    initializeDragAndDrop();
    initializeVirtualScrolling();
    updateTodoStats();
}

// ========================================
// TODO LIST FUNCTIONALITY
// ========================================

function addTodo() {
    const input = document.getElementById('todo-input');
    const text = input.value.trim();
    
    if (text === '') {
        showNotification('Please enter a todo item', 'error');
        return;
    }
    
    const todo = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };
    
    todos.push(todo);
    renderTodos();
    saveTodosToStorage();
    input.value = '';
    input.focus();
    
    showNotification('Todo added successfully!', 'success');
}

function renderTodos() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';
    
    todos.forEach(todo => {
        const todoElement = createTodoElement(todo);
        todoList.appendChild(todoElement);
    });
    
    updateTodoStats();
}

function createTodoElement(todo) {
    const div = document.createElement('div');
    div.className = `todo-item ${todo.completed ? 'completed' : ''}`;
    div.dataset.id = todo.id;
    
    const leftSection = document.createElement('div');
    leftSection.style.display = 'flex';
    leftSection.style.alignItems = 'center';
    leftSection.style.gap = '10px';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleTodo(todo.id));
    
    const text = document.createElement('span');
    text.textContent = todo.text;
    text.style.cursor = 'pointer';
    text.addEventListener('click', () => editTodo(todo.id));
    
    const time = document.createElement('small');
    time.textContent = formatTime(todo.createdAt);
    time.style.color = '#666';
    time.style.marginLeft = '10px';
    
    leftSection.appendChild(checkbox);
    leftSection.appendChild(text);
    leftSection.appendChild(time);
    
    const rightSection = document.createElement('div');
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'btn btn-danger';
    deleteBtn.style.padding = '5px 10px';
    deleteBtn.style.fontSize = '12px';
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
    
    rightSection.appendChild(deleteBtn);
    
    div.appendChild(leftSection);
    div.appendChild(rightSection);
    
    return div;
}

function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
        saveTodosToStorage();
    }
}

function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        const newText = prompt('Edit todo:', todo.text);
        if (newText && newText.trim() !== '') {
            todo.text = newText.trim();
            renderTodos();
            saveTodosToStorage();
        }
    }
}

function deleteTodo(id) {
    todos = todos.filter(t => t.id !== id);
    renderTodos();
    saveTodosToStorage();
    showNotification('Todo deleted', 'info');
}

function clearCompleted() {
    const completedCount = todos.filter(t => t.completed).length;
    if (completedCount === 0) {
        showNotification('No completed todos to clear', 'info');
        return;
    }
    
    if (confirm(`Clear ${completedCount} completed todo(s)?`)) {
        todos = todos.filter(t => !t.completed);
        renderTodos();
        saveTodosToStorage();
        showNotification(`Cleared ${completedCount} completed todos`, 'success');
    }
}

function updateTodoStats() {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const pending = total - completed;
    
    document.getElementById('total-todos').textContent = total;
    document.getElementById('completed-todos').textContent = completed;
    document.getElementById('pending-todos').textContent = pending;
}

function saveTodosToStorage() {
    localStorage.setItem('advanced-todos', JSON.stringify(todos));
}

function loadTodosFromStorage() {
    const stored = localStorage.getItem('advanced-todos');
    if (stored) {
        todos = JSON.parse(stored);
        renderTodos();
    }
}

// ========================================
// MODAL FUNCTIONALITY
// ========================================

function openModal() {
    const modal = document.getElementById('modal');
    document.getElementById('modal-title').textContent = 'Simple Modal';
    document.getElementById('modal-body').innerHTML = '<p>This is a simple modal dialog!</p>';
    modal.style.display = 'block';
}

function openModalWithContent() {
    const modal = document.getElementById('modal');
    document.getElementById('modal-title').textContent = 'Dynamic Content Modal';
    
    const content = `
        <div class="input-group">
            <input type="text" id="modal-input" placeholder="Enter something...">
            <button class="btn" onclick="processModalInput()">Process</button>
        </div>
        <div id="modal-result" style="margin-top: 15px;"></div>
    `;
    
    document.getElementById('modal-body').innerHTML = content;
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function saveModal() {
    showNotification('Modal saved!', 'success');
    closeModal();
}

function processModalInput() {
    const input = document.getElementById('modal-input');
    const result = document.getElementById('modal-result');
    
    if (input.value.trim()) {
        result.innerHTML = `<p style="color: green;">You entered: <strong>${input.value}</strong></p>`;
        result.style.animation = 'fadeIn 0.3s ease-in';
    } else {
        result.innerHTML = '<p style="color: red;">Please enter something!</p>';
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
});

// ========================================
// TABS FUNCTIONALITY
// ========================================

function switchTab(tabId, tabElement) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Show selected tab content
    document.getElementById(tabId).classList.add('active');
    tabElement.classList.add('active');
}

function addTabContent() {
    const dynamicContent = document.getElementById('dynamic-content');
    const newContent = document.createElement('div');
    newContent.className = 'card';
    newContent.innerHTML = `
        <h4>Dynamic Content ${Date.now()}</h4>
        <p>This content was added dynamically at ${new Date().toLocaleTimeString()}</p>
        <button class="btn btn-danger" onclick="this.parentElement.remove()">Remove</button>
    `;
    
    dynamicContent.appendChild(newContent);
    newContent.style.animation = 'fadeIn 0.3s ease-in';
}

// ========================================
// PROGRESS BAR FUNCTIONALITY
// ========================================

function updateProgress() {
    const input = document.getElementById('progress-input');
    const progressFill = document.getElementById('progress-fill');
    const value = Math.max(0, Math.min(100, parseInt(input.value) || 0));
    
    progressFill.style.width = value + '%';
    
    // Add color based on progress
    if (value < 33) {
        progressFill.style.background = '#dc3545';
    } else if (value < 66) {
        progressFill.style.background = '#ffc107';
    } else {
        progressFill.style.background = '#28a745';
    }
}

function animateProgress() {
    const progressFill = document.getElementById('progress-fill');
    let progress = 0;
    
    const interval = setInterval(() => {
        progress += 2;
        progressFill.style.width = progress + '%';
        
        if (progress >= 100) {
            clearInterval(interval);
            showNotification('Progress complete!', 'success');
        }
    }, 20);
}

// ========================================
// SEARCH AND HIGHLIGHT
// ========================================

function searchAndHighlight() {
    const searchTerm = document.getElementById('search-input').value.trim();
    const content = document.getElementById('search-content');
    
    // Remove existing highlights
    removeHighlights();
    
    if (searchTerm === '') return;
    
    // Create regex for case-insensitive search
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    
    // Walk through all text nodes
    const walker = document.createTreeWalker(
        content,
        NodeFilter.SHOW_TEXT,
        null,
        false
    );
    
    const textNodes = [];
    let node;
    while (node = walker.nextNode()) {
        if (node.nodeValue.trim() !== '') {
            textNodes.push(node);
        }
    }
    
    // Highlight matches
    textNodes.forEach(textNode => {
        const text = textNode.nodeValue;
        if (regex.test(text)) {
            const span = document.createElement('span');
            span.innerHTML = text.replace(regex, '<span class="highlight">$1</span>');
            textNode.parentNode.replaceChild(span, textNode);
        }
    });
}

function removeHighlights() {
    const highlights = document.querySelectorAll('.highlight');
    highlights.forEach(highlight => {
        const parent = highlight.parentNode;
        parent.replaceChild(document.createTextNode(highlight.textContent), highlight);
        parent.normalize();
    });
}

// ========================================
// DRAG AND DROP
// ========================================

function initializeDragAndDrop() {
    const dragItems = document.querySelectorAll('.drag-item');
    const dropZone = document.getElementById('drop-zone');
    
    dragItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });
    
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('drop', handleDrop);
    dropZone.addEventListener('dragleave', handleDragLeave);
}

function handleDragStart(e) {
    draggedElement = e.target;
    e.target.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', e.target.innerHTML);
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    
    // Remove drag-over class from all drop zones
    const dropZones = document.querySelectorAll('.drop-zone');
    dropZones.forEach(zone => zone.classList.remove('drag-over'));
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    
    e.dataTransfer.dropEffect = 'move';
    e.currentTarget.classList.add('drag-over');
    
    return false;
}

function handleDragLeave(e) {
    e.currentTarget.classList.remove('drag-over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    e.preventDefault();
    
    const dropZone = e.currentTarget;
    dropZone.classList.remove('drag-over');
    
    if (draggedElement) {
        // Clone the dragged element
        const clone = draggedElement.cloneNode(true);
        clone.classList.remove('dragging');
        clone.addEventListener('dragstart', handleDragStart);
        clone.addEventListener('dragend', handleDragEnd);
        
        // Add to drop zone
        if (dropZone.children.length === 1 && dropZone.children[0].textContent === 'Drop items here') {
            dropZone.innerHTML = '';
        }
        
        dropZone.appendChild(clone);
        
        // Remove original
        draggedElement.remove();
        
        showNotification('Item dropped successfully!', 'success');
    }
    
    return false;
}

// ========================================
// DYNAMIC FORM BUILDER
// ========================================

function addFormField() {
    const fieldType = document.getElementById('field-type').value;
    const fieldLabel = document.getElementById('field-label').value.trim();
    
    if (fieldLabel === '') {
        showNotification('Please enter a field label', 'error');
        return;
    }
    
    fieldCounter++;
    const form = document.getElementById('dynamic-form');
    
    const fieldGroup = document.createElement('div');
    fieldGroup.className = 'form-group';
    fieldGroup.style.margin = '15px 0';
    
    const label = document.createElement('label');
    label.textContent = fieldLabel;
    label.htmlFor = `field-${fieldCounter}`;
    
    let input;
    
    switch (fieldType) {
        case 'textarea':
            input = document.createElement('textarea');
            input.rows = 3;
            break;
        case 'select':
            input = document.createElement('select');
            ['Option 1', 'Option 2', 'Option 3'].forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option.toLowerCase().replace(' ', '');
                optionElement.textContent = option;
                input.appendChild(optionElement);
            });
            break;
        default:
            input = document.createElement('input');
            input.type = fieldType;
    }
    
    input.id = `field-${fieldCounter}`;
    input.name = `field-${fieldCounter}`;
    input.style.width = '100%';
    input.style.padding = '8px';
    input.style.marginTop = '5px';
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Remove';
    deleteBtn.className = 'btn btn-danger';
    deleteBtn.style.marginTop = '5px';
    deleteBtn.onclick = () => fieldGroup.remove();
    
    fieldGroup.appendChild(label);
    fieldGroup.appendChild(input);
    fieldGroup.appendChild(deleteBtn);
    
    form.appendChild(fieldGroup);
    
    // Clear inputs
    document.getElementById('field-label').value = '';
    
    showNotification('Field added successfully!', 'success');
}

function submitDynamicForm() {
    const form = document.getElementById('dynamic-form');
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    const output = document.getElementById('form-output');
    output.innerHTML = `
        <h4>Form Data Submitted:</h4>
        <pre style="background: #f8f9fa; padding: 15px; border-radius: 5px;">
${JSON.stringify(data, null, 2)}
        </pre>
    `;
    
    showNotification('Form submitted successfully!', 'success');
}

// ========================================
// VIRTUAL SCROLLING
// ========================================

function initializeVirtualScrolling() {
    // Initial virtual list
    createVirtualList();
}

function createVirtualList() {
    const container = document.getElementById('virtual-container');
    const itemCount = parseInt(document.getElementById('item-count').value) || 1000;
    
    container.innerHTML = '';
    
    // Create virtual items (only render visible ones)
    const itemHeight = 30;
    const visibleCount = Math.ceil(container.clientHeight / itemHeight) + 2;
    
    for (let i = 0; i < visibleCount && i < itemCount; i++) {
        const item = document.createElement('div');
        item.style.height = itemHeight + 'px';
        item.style.padding = '5px';
        item.style.borderBottom = '1px solid #eee';
        item.textContent = `Virtual Item ${i + 1} of ${itemCount}`;
        container.appendChild(item);
    }
    
    // Add scroll event for lazy loading
    let loadedCount = visibleCount;
    
    container.addEventListener('scroll', function() {
        if (container.scrollTop + container.clientHeight >= container.scrollHeight - 100) {
            if (loadedCount < itemCount) {
                const itemsToLoad = Math.min(20, itemCount - loadedCount);
                
                for (let i = loadedCount; i < loadedCount + itemsToLoad; i++) {
                    const item = document.createElement('div');
                    item.style.height = itemHeight + 'px';
                    item.style.padding = '5px';
                    item.style.borderBottom = '1px solid #eee';
                    item.textContent = `Virtual Item ${i + 1} of ${itemCount}`;
                    item.style.animation = 'fadeIn 0.3s ease-in';
                    container.appendChild(item);
                }
                
                loadedCount += itemsToLoad;
            }
        }
    });
    
    showNotification(`Created virtual list with ${itemCount} items`, 'info');
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

function formatTime(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} min ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`;
    
    return date.toLocaleDateString();
}

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + Enter to add todo
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        const todoInput = document.getElementById('todo-input');
        if (document.activeElement === todoInput) {
            addTodo();
        }
    }
    
    // Escape to close modal
    if (e.key === 'Escape') {
        closeModal();
    }
    
    // Ctrl/Cmd + K to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('search-input').focus();
    }
});

console.log("Advanced DOM Manipulation - All systems ready! 🚀");
