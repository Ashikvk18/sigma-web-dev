// ========================================
// STORAGE PLAYGROUND - LOCAL & SESSION STORAGE
// ========================================

console.log("Storage Playground Loaded!");

// Global state
let currentStorageType = 'local';
let storageMonitor = null;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("Storage Playground initialized!");
    initializePlayground();
});

function initializePlayground() {
    updateStorageStats();
    displayStorageContent('local');
    displayStorageContent('session');
    loadUserProfile();
    loadShoppingCart();
    setupStorageEventListener();
    setupAutoRefresh();
}

// ========================================
// BASIC STORAGE OPERATIONS
// ========================================

function saveToStorage(type) {
    const keyInput = document.getElementById(`${type}-key`);
    const valueInput = document.getElementById(`${type}-value`);
    
    const key = keyInput.value.trim();
    const value = valueInput.value.trim();
    
    if (!key) {
        showNotification('Please enter a key', 'error');
        return;
    }
    
    const storage = type === 'local' ? localStorage : sessionStorage;
    
    try {
        storage.setItem(key, value);
        showNotification(`Saved to ${type} storage: ${key}`, 'success');
        keyInput.value = '';
        valueInput.value = '';
        updateStorageStats();
        displayStorageContent(type);
    } catch (error) {
        showNotification(`Error saving to ${type} storage: ${error.message}`, 'error');
    }
}

function getFromStorage(type) {
    const keyInput = document.getElementById(`${type}-key`);
    const key = keyInput.value.trim();
    
    if (!key) {
        showNotification('Please enter a key', 'error');
        return;
    }
    
    const storage = type === 'local' ? localStorage : sessionStorage;
    const value = storage.getItem(key);
    
    if (value !== null) {
        document.getElementById(`${type}-value`).value = value;
        showNotification(`Retrieved from ${type} storage: ${key} = ${value}`, 'info');
    } else {
        showNotification(`Key "${key}" not found in ${type} storage`, 'warning');
    }
}

function removeFromStorage(type) {
    const keyInput = document.getElementById(`${type}-key`);
    const key = keyInput.value.trim();
    
    if (!key) {
        showNotification('Please enter a key', 'error');
        return;
    }
    
    const storage = type === 'local' ? localStorage : sessionStorage;
    
    if (storage.getItem(key) !== null) {
        storage.removeItem(key);
        showNotification(`Removed from ${type} storage: ${key}`, 'success');
        keyInput.value = '';
        document.getElementById(`${type}-value`).value = '';
        updateStorageStats();
        displayStorageContent(type);
    } else {
        showNotification(`Key "${key}" not found in ${type} storage`, 'warning');
    }
}

function clearStorage(type) {
    const storage = type === 'local' ? localStorage : sessionStorage;
    
    if (confirm(`Are you sure you want to clear all ${type} storage?`)) {
        storage.clear();
        showNotification(`Cleared all ${type} storage`, 'success');
        updateStorageStats();
        displayStorageContent(type);
    }
}

// ========================================
// STORAGE DISPLAY
// ========================================

function displayStorageContent(type) {
    const storage = type === 'local' ? localStorage : sessionStorage;
    const display = document.getElementById(`${type}-display`);
    
    if (storage.length === 0) {
        display.innerHTML = `${type.charAt(0).toUpperCase() + type.slice(1)} storage is empty`;
        return;
    }
    
    let content = `${type.charAt(0).toUpperCase() + type.slice(1)} Storage Content:\n`;
    content += '=' .repeat(50) + '\n';
    
    for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        const value = storage.getItem(key);
        content += `${key}: ${value}\n`;
    }
    
    display.textContent = content;
}

function updateStorageStats() {
    // Local storage stats
    const localCount = localStorage.length;
    const localSize = calculateStorageSize(localStorage);
    
    document.getElementById('local-count').textContent = localCount;
    document.getElementById('local-size').textContent = localSize;
    
    // Session storage stats
    const sessionCount = sessionStorage.length;
    const sessionSize = calculateStorageSize(sessionStorage);
    
    document.getElementById('session-count').textContent = sessionCount;
    document.getElementById('session-size').textContent = sessionSize;
}

function calculateStorageSize(storage) {
    let total = 0;
    
    for (let key in storage) {
        if (storage.hasOwnProperty(key)) {
            total += storage[key].length + key.length;
        }
    }
    
    return Math.round(total / 1024); // Convert to KB
}

// ========================================
// TAB SWITCHING
// ========================================

function switchStorageTab(type) {
    // Update tab appearance
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const activeTab = Array.from(tabs).find(tab => 
        tab.textContent.toLowerCase().includes(type)
    );
    if (activeTab) activeTab.classList.add('active');
    
    // Update content visibility
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));
    
    document.getElementById(`${type}-tab`).classList.add('active');
    
    currentStorageType = type;
}

// ========================================
// DATA TYPES DEMO
// ========================================

function saveDataType(type, value) {
    const key = `demo_${type}`;
    let serializedValue;
    
    switch (type) {
        case 'string':
            serializedValue = value;
            break;
        case 'number':
            serializedValue = JSON.stringify(value);
            break;
        case 'boolean':
            serializedValue = JSON.stringify(value);
            break;
        case 'array':
            serializedValue = JSON.stringify(value);
            break;
        case 'object':
            serializedValue = JSON.stringify(value);
            break;
        case 'date':
            serializedValue = value.toISOString();
            break;
        default:
            serializedValue = String(value);
    }
    
    localStorage.setItem(key, serializedValue);
    
    // Display the saved data
    const display = document.getElementById('datatype-display');
    const retrieved = localStorage.getItem(key);
    let parsed;
    
    try {
        parsed = JSON.parse(retrieved);
    } catch {
        parsed = retrieved;
    }
    
    display.innerHTML = `
Saved ${type}:
Key: ${key}
Original: ${JSON.stringify(value)}
Stored: ${retrieved}
Retrieved: ${JSON.stringify(parsed)}
Type of retrieved: ${typeof parsed}
    `;
    
    updateStorageStats();
    showNotification(`Saved ${type} data type`, 'success');
}

// ========================================
// USER PROFILE DEMO
// ========================================

function saveUserProfile() {
    const profile = {
        name: document.getElementById('user-name').value.trim(),
        email: document.getElementById('user-email').value.trim(),
        age: parseInt(document.getElementById('user-age').value) || null,
        bio: document.getElementById('user-bio').value.trim(),
        savedAt: new Date().toISOString()
    };
    
    if (!profile.name || !profile.email) {
        showNotification('Please fill in name and email', 'error');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profile.email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    localStorage.setItem('userProfile', JSON.stringify(profile));
    showNotification('Profile saved successfully!', 'success');
    loadUserProfile();
}

function loadUserProfile() {
    const profileData = localStorage.getItem('userProfile');
    const display = document.getElementById('user-profile-display');
    
    if (!profileData) {
        display.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">👤</div>
                <p>No profile saved yet</p>
            </div>
        `;
        return;
    }
    
    try {
        const profile = JSON.parse(profileData);
        
        // Populate form fields
        document.getElementById('user-name').value = profile.name || '';
        document.getElementById('user-email').value = profile.email || '';
        document.getElementById('user-age').value = profile.age || '';
        document.getElementById('user-bio').value = profile.bio || '';
        
        // Display profile
        const initials = profile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        
        display.innerHTML = `
            <div class="user-profile">
                <div class="avatar">${initials}</div>
                <div class="user-info">
                    <h3>${profile.name}</h3>
                    <p>📧 ${profile.email}</p>
                    <p>🎂 ${profile.age || 'Not specified'} years old</p>
                    <p>📝 ${profile.bio || 'No bio provided'}</p>
                    <p>💾 Saved: ${new Date(profile.savedAt).toLocaleString()}</p>
                </div>
            </div>
        `;
    } catch (error) {
        display.innerHTML = `<p style="color: red;">Error loading profile: ${error.message}</p>`;
    }
}

function deleteUserProfile() {
    if (confirm('Are you sure you want to delete your profile?')) {
        localStorage.removeItem('userProfile');
        
        // Clear form fields
        document.getElementById('user-name').value = '';
        document.getElementById('user-email').value = '';
        document.getElementById('user-age').value = '';
        document.getElementById('user-bio').value = '';
        
        showNotification('Profile deleted', 'success');
        loadUserProfile();
        updateStorageStats();
    }
}

// ========================================
// SHOPPING CART DEMO
// ========================================

function addToCart() {
    const name = document.getElementById('product-name').value.trim();
    const price = parseFloat(document.getElementById('product-price').value) || 0;
    const quantity = parseInt(document.getElementById('product-quantity').value) || 1;
    
    if (!name || price <= 0) {
        showNotification('Please enter valid product name and price', 'error');
        return;
    }
    
    // Get existing cart
    let cart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    
    // Check if product already exists
    const existingItem = cart.find(item => item.name === name);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: Date.now(),
            name,
            price,
            quantity,
            addedAt: new Date().toISOString()
        });
    }
    
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    
    // Clear form
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-quantity').value = '1';
    
    showNotification(`Added ${name} to cart`, 'success');
    loadShoppingCart();
    updateStorageStats();
}

function loadShoppingCart() {
    const cartData = localStorage.getItem('shoppingCart');
    const display = document.getElementById('cart-display');
    
    if (!cartData) {
        display.innerHTML = `
            <div class="shopping-cart">
                <div class="empty-state">
                    <div class="empty-state-icon">🛒</div>
                    <p>Your cart is empty</p>
                </div>
            </div>
        `;
        return;
    }
    
    try {
        const cart = JSON.parse(cartData);
        
        if (cart.length === 0) {
            display.innerHTML = `
                <div class="shopping-cart">
                    <div class="empty-state">
                        <div class="empty-state-icon">🛒</div>
                        <p>Your cart is empty</p>
                    </div>
                </div>
            `;
            return;
        }
        
        let total = 0;
        let cartHTML = '<div class="shopping-cart">';
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            
            cartHTML += `
                <div class="cart-item">
                    <div>
                        <strong>${item.name}</strong><br>
                        $${item.price.toFixed(2)} x ${item.quantity}
                    </div>
                    <div>
                        <strong>$${itemTotal.toFixed(2)}</strong>
                        <button class="mini-btn delete-btn" onclick="removeFromCart(${item.id})" style="margin-left: 10px;">Remove</button>
                    </div>
                </div>
            `;
        });
        
        cartHTML += `
            <div class="cart-total">
                Total: $${total.toFixed(2)}
            </div>
            <div style="margin-top: 15px;">
                <button class="btn btn-success" onclick="checkout()">Checkout</button>
                <button class="btn btn-warning" onclick="clearCart()">Clear Cart</button>
            </div>
        </div>`;
        
        display.innerHTML = cartHTML;
    } catch (error) {
        display.innerHTML = `<p style="color: red;">Error loading cart: ${error.message}</p>`;
    }
}

function removeFromCart(itemId) {
    let cart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    cart = cart.filter(item => item.id !== itemId);
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    
    showNotification('Item removed from cart', 'info');
    loadShoppingCart();
    updateStorageStats();
}

function clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
        localStorage.removeItem('shoppingCart');
        showNotification('Cart cleared', 'success');
        loadShoppingCart();
        updateStorageStats();
    }
}

function checkout() {
    const cart = JSON.parse(localStorage.getItem('shoppingCart') || '[]');
    
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'warning');
        return;
    }
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Create order history
    const order = {
        id: Date.now(),
        items: cart,
        total: total,
        checkoutDate: new Date().toISOString()
    };
    
    let orderHistory = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    orderHistory.push(order);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    
    // Clear cart
    localStorage.removeItem('shoppingCart');
    
    showNotification(`Order placed! Total: $${total.toFixed(2)}`, 'success');
    loadShoppingCart();
    updateStorageStats();
}

// ========================================
// ADVANCED FEATURES
// ========================================

function exportStorage() {
    const data = {
        localStorage: {},
        sessionStorage: {},
        exportDate: new Date().toISOString()
    };
    
    // Export local storage
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            data.localStorage[key] = localStorage.getItem(key);
        }
    }
    
    // Export session storage
    for (let key in sessionStorage) {
        if (sessionStorage.hasOwnProperty(key)) {
            data.sessionStorage[key] = sessionStorage.getItem(key);
        }
    }
    
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `storage-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showNotification('Storage data exported successfully', 'success');
    
    // Also display in the advanced display
    document.getElementById('advanced-display').textContent = jsonString;
}

function importStorage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                
                // Import local storage
                if (data.localStorage) {
                    for (let key in data.localStorage) {
                        localStorage.setItem(key, data.localStorage[key]);
                    }
                }
                
                // Import session storage
                if (data.sessionStorage) {
                    for (let key in data.sessionStorage) {
                        sessionStorage.setItem(key, data.sessionStorage[key]);
                    }
                }
                
                showNotification('Storage data imported successfully', 'success');
                updateStorageStats();
                displayStorageContent('local');
                displayStorageContent('session');
                loadUserProfile();
                loadShoppingCart();
                
                // Display import info
                const display = document.getElementById('advanced-display');
                display.innerHTML = `
Import completed on: ${new Date().toLocaleString()}
Local storage items: ${Object.keys(data.localStorage || {}).length}
Session storage items: ${Object.keys(data.sessionStorage || {}).length}
Original export date: ${data.exportDate || 'Unknown'}
                `;
            } catch (error) {
                showNotification(`Error importing data: ${error.message}`, 'error');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

function backupStorage() {
    const backup = {
        timestamp: new Date().toISOString(),
        localStorage: {},
        sessionStorage: {}
    };
    
    // Backup local storage
    for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            backup.localStorage[key] = localStorage.getItem(key);
        }
    }
    
    // Backup session storage
    for (let key in sessionStorage) {
        if (sessionStorage.hasOwnProperty(key)) {
            backup.sessionStorage[key] = sessionStorage.getItem(key);
        }
    }
    
    // Save backup to local storage
    localStorage.setItem('storageBackup', JSON.stringify(backup));
    
    showNotification('Backup created successfully', 'success');
    
    const display = document.getElementById('advanced-display');
    display.innerHTML = `
Backup created: ${new Date().toLocaleString()}
Backup size: ${Math.round(JSON.stringify(backup).length / 1024)} KB
Items backed up: ${Object.keys(backup.localStorage).length + Object.keys(backup.sessionStorage).length}

To restore backup, use: restoreFromBackup()
    `;
}

function restoreFromBackup() {
    const backupData = localStorage.getItem('storageBackup');
    
    if (!backupData) {
        showNotification('No backup found', 'warning');
        return;
    }
    
    try {
        const backup = JSON.parse(backupData);
        
        if (confirm(`Restore backup from ${new Date(backup.timestamp).toLocaleString()}?`)) {
            // Clear current storage
            localStorage.clear();
            sessionStorage.clear();
            
            // Restore local storage
            for (let key in backup.localStorage) {
                localStorage.setItem(key, backup.localStorage[key]);
            }
            
            // Restore session storage
            for (let key in backup.sessionStorage) {
                sessionStorage.setItem(key, backup.sessionStorage[key]);
            }
            
            showNotification('Backup restored successfully', 'success');
            updateStorageStats();
            displayStorageContent('local');
            displayStorageContent('session');
            loadUserProfile();
            loadShoppingCart();
        }
    } catch (error) {
        showNotification(`Error restoring backup: ${error.message}`, 'error');
    }
}

function monitorStorage() {
    if (storageMonitor) {
        clearInterval(storageMonitor);
        storageMonitor = null;
        showNotification('Storage monitoring stopped', 'info');
        return;
    }
    
    storageMonitor = setInterval(() => {
        const localCount = localStorage.length;
        const sessionCount = sessionStorage.length;
        const timestamp = new Date().toLocaleTimeString();
        
        const display = document.getElementById('advanced-display');
        display.innerHTML = `
Monitoring storage changes...
Last check: ${timestamp}
Local storage items: ${localCount}
Session storage items: ${sessionCount}
Total storage size: ${calculateStorageSize(localStorage) + calculateStorageSize(sessionStorage)} KB

Click "Monitor Changes" again to stop monitoring.
        `;
    }, 2000);
    
    showNotification('Storage monitoring started', 'info');
}

function clearAllStorage() {
    if (confirm('Are you sure you want to clear ALL storage data? This cannot be undone!')) {
        localStorage.clear();
        sessionStorage.clear();
        
        showNotification('All storage cleared', 'success');
        updateStorageStats();
        displayStorageContent('local');
        displayStorageContent('session');
        loadUserProfile();
        loadShoppingCart();
    }
}

// ========================================
// STORAGE EVENTS
// ========================================

function setupStorageEventListener() {
    window.addEventListener('storage', function(event) {
        const log = document.getElementById('event-log');
        const timestamp = new Date().toLocaleTimeString();
        
        const logEntry = `[${timestamp}] Storage Event:
Key: ${event.key || 'null'}
Old Value: ${event.oldValue || 'null'}
New Value: ${event.newValue || 'null'}
Storage Area: ${event.storageArea === localStorage ? 'Local' : 'Session'}
URL: ${event.url}

`;
        
        log.textContent = logEntry + log.textContent;
        
        // Update displays if this is a local storage change
        if (event.storageArea === localStorage) {
            updateStorageStats();
            displayStorageContent('local');
            loadUserProfile();
            loadShoppingCart();
        }
    });
}

function triggerStorageEvent() {
    const key = document.getElementById('event-key').value.trim();
    const value = document.getElementById('event-value').value.trim();
    
    if (!key) {
        showNotification('Please enter a key for the event', 'error');
        return;
    }
    
    // Set item in local storage (this will trigger storage event in other tabs)
    localStorage.setItem(key, value || '');
    
    showNotification(`Storage event triggered for key: ${key}`, 'info');
    
    // Clear inputs
    document.getElementById('event-key').value = '';
    document.getElementById('event-value').value = '';
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

function setupAutoRefresh() {
    // Auto-refresh stats every 5 seconds
    setInterval(() => {
        updateStorageStats();
    }, 5000);
}

// ========================================
// KEYBOARD SHORTCUTS
// ========================================

document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + S: Save current storage type
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveToStorage(currentStorageType);
    }
    
    // Ctrl/Cmd + E: Export storage
    if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
        e.preventDefault();
        exportStorage();
    }
    
    // Ctrl/Cmd + I: Import storage
    if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
        e.preventDefault();
        importStorage();
    }
    
    // Ctrl/Cmd + B: Create backup
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        backupStorage();
    }
});

console.log("Storage Playground - All systems ready! 💾");
