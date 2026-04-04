// ========================================
// BROWSER APIS & WEB APIS PLAYGROUND
// ========================================

console.log("Browser APIs Playground Loaded!");

// Global state
let locationWatchId = null;
let cameraStream = null;
let microphoneStream = null;
let screenShareStream = null;
let mediaRecorder = null;
let audioChunks = [];
let animationId = null;
let webWorker = null;
let batteryMonitorInterval = null;
let orientationWatchId = null;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("Browser APIs Playground initialized!");
    initializePlayground();
});

function initializePlayground() {
    setupEventListeners();
    checkAPIsAvailability();
    initializeCanvases();
}

// ========================================
// API AVAILABILITY CHECK
// ========================================

function checkAPIsAvailability() {
    const apis = {
        'Geolocation': 'geolocation' in navigator,
        'MediaDevices': 'mediaDevices' in navigator,
        'Notifications': 'Notification' in window,
        'Battery': 'getBattery' in navigator,
        'Vibration': 'vibrate' in navigator,
        'Clipboard': 'clipboard' in navigator,
        'DeviceOrientation': 'DeviceOrientationEvent' in window,
        'Web Workers': 'Worker' in window,
        'Canvas': 'HTMLCanvasElement' in window,
        'IndexedDB': 'indexedDB' in window
    };
    
    console.log('🔍 API Availability Check:');
    Object.entries(apis).forEach(([name, available]) => {
        console.log(`${name}: ${available ? '✅ Available' : '❌ Not Available'}`);
    });
    
    return apis;
}

// ========================================
// GEOLOCATION API
// ========================================

function getCurrentLocation() {
    const display = document.getElementById('geolocation-display');
    const result = document.getElementById('location-result');
    
    if (!('geolocation' in navigator)) {
        display.innerHTML = '<strong>❌ Geolocation not supported</strong>';
        return;
    }
    
    display.innerHTML = '<strong>🔄 Getting location...</strong>';
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude, accuracy, altitude, heading, speed } = position.coords;
            
            display.innerHTML = `
                <strong>📍 Current Location</strong><br>
                Latitude: ${latitude.toFixed(6)}<br>
                Longitude: ${longitude.toFixed(6)}<br>
                Accuracy: ${accuracy.toFixed(2)} meters<br>
                ${altitude ? `Altitude: ${altitude.toFixed(2)} meters<br>` : ''}
                ${heading ? `Heading: ${heading.toFixed(2)}°<br>` : ''}
                ${speed ? `Speed: ${speed.toFixed(2)} m/s<br>` : ''}
                Timestamp: ${new Date(position.timestamp).toLocaleString()}
            `;
            
            result.textContent = `Location retrieved successfully!\n\nAccuracy: ±${accuracy.toFixed(2)} meters`;
            
            showNotification('Location retrieved successfully', 'success');
        },
        (error) => {
            let errorMessage = 'Unknown error';
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    errorMessage = 'Location permission denied';
                    break;
                case error.POSITION_UNAVAILABLE:
                    errorMessage = 'Location information unavailable';
                    break;
                case error.TIMEOUT:
                    errorMessage = 'Location request timed out';
                    break;
            }
            
            display.innerHTML = `<strong>❌ Error: ${errorMessage}</strong>`;
            result.textContent = `Failed to get location: ${errorMessage}`;
            
            showNotification('Failed to get location', 'error');
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}

function watchLocation() {
    const result = document.getElementById('location-result');
    
    if (!('geolocation' in navigator)) {
        showNotification('Geolocation not supported', 'error');
        return;
    }
    
    if (locationWatchId) {
        showNotification('Already watching location', 'warning');
        return;
    }
    
    locationWatchId = navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude, accuracy } = position.coords;
            
            result.textContent = `Watching location...\n` +
                               `Last update: ${new Date().toLocaleTimeString()}\n` +
                               `Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}\n` +
                               `Accuracy: ±${accuracy.toFixed(2)}m`;
        },
        (error) => {
            console.error('Location watch error:', error);
            showNotification('Location watch error', 'error');
        },
        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
    
    showNotification('Started watching location', 'success');
}

function stopWatching() {
    if (locationWatchId) {
        navigator.geolocation.clearWatch(locationWatchId);
        locationWatchId = null;
        
        document.getElementById('location-result').textContent = 'Location watching stopped';
        showNotification('Stopped watching location', 'info');
    } else {
        showNotification('Not watching location', 'warning');
    }
}

function checkLocationPermission() {
    const result = document.getElementById('location-result');
    
    if ('permissions' in navigator) {
        navigator.permissions.query({ name: 'geolocation' }).then((result) => {
            let status = result.state;
            let statusText = '';
            
            switch (status) {
                case 'granted':
                    statusText = '✅ Permission granted';
                    break;
                case 'denied':
                    statusText = '❌ Permission denied';
                    break;
                case 'prompt':
                    statusText = '⏳ Permission prompt';
                    break;
            }
            
            result.textContent = `Location permission status: ${statusText}\n` +
                               `Last checked: ${new Date().toLocaleString()}`;
        });
    } else {
        result.textContent = 'Permissions API not available';
    }
}

// ========================================
// MEDIA DEVICES API
// ========================================

function switchMediaTab(tabName) {
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

async function startCamera() {
    const video = document.getElementById('camera-video');
    const placeholder = document.getElementById('camera-placeholder');
    
    try {
        // Get available cameras
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        
        // Populate camera select
        const cameraSelect = document.getElementById('camera-select');
        cameraSelect.innerHTML = '<option value="">Select Camera</option>';
        videoDevices.forEach((device, index) => {
            const option = document.createElement('option');
            option.value = device.deviceId;
            option.text = device.label || `Camera ${index + 1}`;
            cameraSelect.appendChild(option);
        });
        
        // Start camera stream
        const constraints = {
            video: {
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        };
        
        cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
        video.srcObject = cameraStream;
        video.style.display = 'block';
        placeholder.style.display = 'none';
        
        showNotification('Camera started successfully', 'success');
        
    } catch (error) {
        console.error('Camera error:', error);
        placeholder.textContent = `Camera error: ${error.message}`;
        showNotification('Failed to start camera', 'error');
    }
}

function stopCamera() {
    const video = document.getElementById('camera-video');
    const placeholder = document.getElementById('camera-placeholder');
    
    if (cameraStream) {
        cameraStream.getTracks().forEach(track => track.stop());
        cameraStream = null;
        
        video.srcObject = null;
        video.style.display = 'none';
        placeholder.style.display = 'block';
        placeholder.textContent = 'Camera preview will appear here...';
        
        showNotification('Camera stopped', 'info');
    }
}

async function switchCamera() {
    const cameraSelect = document.getElementById('camera-select');
    const selectedDeviceId = cameraSelect.value;
    
    if (!selectedDeviceId) return;
    
    stopCamera();
    
    try {
        const constraints = {
            video: {
                deviceId: { exact: selectedDeviceId },
                width: { ideal: 1280 },
                height: { ideal: 720 }
            }
        };
        
        cameraStream = await navigator.mediaDevices.getUserMedia(constraints);
        const video = document.getElementById('camera-video');
        video.srcObject = cameraStream;
        
        showNotification('Camera switched', 'success');
        
    } catch (error) {
        console.error('Camera switch error:', error);
        showNotification('Failed to switch camera', 'error');
    }
}

function takePicture() {
    const video = document.getElementById('camera-video');
    const canvas = document.getElementById('camera-canvas');
    const image = document.getElementById('camera-image');
    
    if (!cameraStream) {
        showNotification('Camera not started', 'warning');
        return;
    }
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0);
    
    const imageData = canvas.toDataURL('image/png');
    image.src = imageData;
    image.style.display = 'block';
    
    showNotification('Picture taken!', 'success');
}

async function startMicrophone() {
    const audio = document.getElementById('microphone-audio');
    const placeholder = document.getElementById('microphone-placeholder');
    
    try {
        microphoneStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Create audio element for monitoring
        audio.srcObject = microphoneStream;
        audio.style.display = 'block';
        placeholder.style.display = 'none';
        
        showNotification('Microphone started', 'success');
        
    } catch (error) {
        console.error('Microphone error:', error);
        placeholder.textContent = `Microphone error: ${error.message}`;
        showNotification('Failed to start microphone', 'error');
    }
}

function stopMicrophone() {
    const audio = document.getElementById('microphone-audio');
    const placeholder = document.getElementById('microphone-placeholder');
    
    if (microphoneStream) {
        microphoneStream.getTracks().forEach(track => track.stop());
        microphoneStream = null;
        
        audio.srcObject = null;
        audio.style.display = 'none';
        placeholder.style.display = 'block';
        placeholder.textContent = 'Microphone controls will appear here...';
        
        showNotification('Microphone stopped', 'info');
    }
}

async function recordAudio() {
    if (!microphoneStream) {
        showNotification('Start microphone first', 'warning');
        return;
    }
    
    try {
        mediaRecorder = new MediaRecorder(microphoneStream);
        audioChunks = [];
        
        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };
        
        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = document.getElementById('microphone-audio');
            audio.src = audioUrl;
            audio.controls = true;
            
            showNotification('Audio recording saved', 'success');
        };
        
        mediaRecorder.start();
        showNotification('Recording audio...', 'info');
        
    } catch (error) {
        console.error('Recording error:', error);
        showNotification('Failed to record audio', 'error');
    }
}

function stopRecording() {
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
        showNotification('Recording stopped', 'info');
    }
}

async function enumerateDevices() {
    const result = document.getElementById('devices-result');
    
    try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        
        let output = '📱 Available Media Devices:\n\n';
        
        const deviceTypes = {
            'audioinput': '🎤 Audio Input (Microphone)',
            'audiooutput': '🔊 Audio Output (Speaker)',
            'videoinput': '📷 Video Input (Camera)'
        };
        
        Object.entries(deviceTypes).forEach(([type, label]) => {
            const typeDevices = devices.filter(device => device.kind === type);
            if (typeDevices.length > 0) {
                output += `${label} (${typeDevices.length}):\n`;
                typeDevices.forEach((device, index) => {
                    output += `  ${index + 1}. ${device.label || 'Unnamed device'}\n`;
                    output += `     Device ID: ${device.deviceId}\n`;
                });
                output += '\n';
            }
        });
        
        result.textContent = output;
        showNotification('Device list updated', 'success');
        
    } catch (error) {
        console.error('Device enumeration error:', error);
        result.textContent = `Error: ${error.message}`;
        showNotification('Failed to enumerate devices', 'error');
    }
}

function refreshDeviceList() {
    enumerateDevices();
}

async function startScreenShare() {
    const video = document.getElementById('screenshare-video');
    const placeholder = document.getElementById('screenshare-placeholder');
    
    try {
        screenShareStream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true
        });
        
        video.srcObject = screenShareStream;
        video.style.display = 'block';
        placeholder.style.display = 'none';
        
        // Listen for stream end
        screenShareStream.getVideoTracks()[0].addEventListener('ended', () => {
            stopScreenShare();
        });
        
        showNotification('Screen sharing started', 'success');
        
    } catch (error) {
        console.error('Screen share error:', error);
        placeholder.textContent = `Screen share error: ${error.message}`;
        showNotification('Failed to start screen share', 'error');
    }
}

function stopScreenShare() {
    const video = document.getElementById('screenshare-video');
    const placeholder = document.getElementById('screenshare-placeholder');
    
    if (screenShareStream) {
        screenShareStream.getTracks().forEach(track => track.stop());
        screenShareStream = null;
        
        video.srcObject = null;
        video.style.display = 'none';
        placeholder.style.display = 'block';
        placeholder.textContent = 'Screen share will appear here...';
        
        showNotification('Screen sharing stopped', 'info');
    }
}

// ========================================
// WEB STORAGE API
// ========================================

function switchStorageTab(tabName) {
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

// Local Storage Functions
function saveToLocalStorage() {
    const key = document.getElementById('local-key').value;
    const value = document.getElementById('local-value').value;
    const result = document.getElementById('local-storage-result');
    
    if (!key || !value) {
        showNotification('Please enter key and value', 'error');
        return;
    }
    
    try {
        localStorage.setItem(key, value);
        result.textContent = `✅ Saved to localStorage:\nKey: "${key}"\nValue: "${value}"`;
        showLocalStorageInfo();
        showNotification('Data saved to localStorage', 'success');
        
        // Clear inputs
        document.getElementById('local-key').value = '';
        document.getElementById('local-value').value = '';
        
    } catch (error) {
        console.error('LocalStorage save error:', error);
        result.textContent = `❌ Error saving to localStorage: ${error.message}`;
        showNotification('Failed to save to localStorage', 'error');
    }
}

function getFromLocalStorage() {
    const key = document.getElementById('local-key').value;
    const result = document.getElementById('local-storage-result');
    
    if (!key) {
        showNotification('Please enter a key', 'error');
        return;
    }
    
    const value = localStorage.getItem(key);
    
    if (value !== null) {
        result.textContent = `✅ Retrieved from localStorage:\nKey: "${key}"\nValue: "${value}"`;
        document.getElementById('local-value').value = value;
        showNotification('Data retrieved from localStorage', 'success');
    } else {
        result.textContent = `❌ Key "${key}" not found in localStorage`;
        showNotification('Key not found', 'warning');
    }
}

function removeFromLocalStorage() {
    const key = document.getElementById('local-key').value;
    const result = document.getElementById('local-storage-result');
    
    if (!key) {
        showNotification('Please enter a key', 'error');
        return;
    }
    
    localStorage.removeItem(key);
    result.textContent = `✅ Removed key "${key}" from localStorage`;
    showLocalStorageInfo();
    showNotification('Data removed from localStorage', 'success');
}

function clearLocalStorage() {
    localStorage.clear();
    document.getElementById('local-storage-result').textContent = '✅ localStorage cleared';
    showLocalStorageInfo();
    showNotification('localStorage cleared', 'success');
}

function showLocalStorageInfo() {
    const display = document.getElementById('local-storage-display');
    
    const keys = Object.keys(localStorage);
    const totalSize = new Blob(Object.values(localStorage)).size;
    
    let info = `<strong>💾 Local Storage Info</strong><br>`;
    info += `Keys stored: ${keys.length}<br>`;
    info += `Total size: ${(totalSize / 1024).toFixed(2)} KB<br>`;
    
    if (keys.length > 0) {
        info += `<br><strong>Keys:</strong><br>`;
        keys.forEach(key => {
            const value = localStorage.getItem(key);
            const size = new Blob([value]).size;
            info += `• ${key} (${size} bytes)<br>`;
        });
    }
    
    display.innerHTML = info;
}

function exportLocalStorage() {
    const data = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        data[key] = localStorage.getItem(key);
    }
    
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'localStorage-export.json';
    a.click();
    
    URL.revokeObjectURL(url);
    showNotification('LocalStorage exported', 'success');
}

function importLocalStorage() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                Object.entries(data).forEach(([key, value]) => {
                    localStorage.setItem(key, value);
                });
                
                showLocalStorageInfo();
                showNotification('LocalStorage imported successfully', 'success');
                
            } catch (error) {
                showNotification('Invalid JSON file', 'error');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

// Session Storage Functions
function saveToSessionStorage() {
    const key = document.getElementById('session-key').value;
    const value = document.getElementById('session-value').value;
    const result = document.getElementById('session-storage-result');
    
    if (!key || !value) {
        showNotification('Please enter key and value', 'error');
        return;
    }
    
    sessionStorage.setItem(key, value);
    result.textContent = `✅ Saved to sessionStorage:\nKey: "${key}"\nValue: "${value}"`;
    showNotification('Data saved to sessionStorage', 'success');
    
    // Clear inputs
    document.getElementById('session-key').value = '';
    document.getElementById('session-value').value = '';
}

function getFromSessionStorage() {
    const key = document.getElementById('session-key').value;
    const result = document.getElementById('session-storage-result');
    
    if (!key) {
        showNotification('Please enter a key', 'error');
        return;
    }
    
    const value = sessionStorage.getItem(key);
    
    if (value !== null) {
        result.textContent = `✅ Retrieved from sessionStorage:\nKey: "${key}"\nValue: "${value}"`;
        document.getElementById('session-value').value = value;
        showNotification('Data retrieved from sessionStorage', 'success');
    } else {
        result.textContent = `❌ Key "${key}" not found in sessionStorage`;
        showNotification('Key not found', 'warning');
    }
}

function removeFromSessionStorage() {
    const key = document.getElementById('session-key').value;
    const result = document.getElementById('session-storage-result');
    
    if (!key) {
        showNotification('Please enter a key', 'error');
        return;
    }
    
    sessionStorage.removeItem(key);
    result.textContent = `✅ Removed key "${key}" from sessionStorage`;
    showNotification('Data removed from sessionStorage', 'success');
}

function clearSessionStorage() {
    sessionStorage.clear();
    document.getElementById('session-storage-result').textContent = '✅ sessionStorage cleared';
    showNotification('sessionStorage cleared', 'success');
}

// IndexedDB Functions
let db = null;

function initIndexedDB() {
    const result = document.getElementById('indexeddb-result');
    
    if (!('indexedDB' in window)) {
        result.textContent = '❌ IndexedDB not supported';
        return;
    }
    
    const request = indexedDB.open('BrowserAPIsDB', 1);
    
    request.onerror = () => {
        result.textContent = '❌ Failed to open database';
    };
    
    request.onsuccess = () => {
        db = request.result;
        result.textContent = '✅ IndexedDB initialized successfully';
        showNotification('IndexedDB initialized', 'success');
    };
    
    request.onupgradeneeded = () => {
        db = request.result;
        
        if (!db.objectStoreNames.contains('data')) {
            const objectStore = db.createObjectStore('data', { keyPath: 'id', autoIncrement: true });
            objectStore.createIndex('key', 'key', { unique: true });
        }
    };
}

function addToIndexedDB() {
    const result = document.getElementById('indexeddb-result');
    
    if (!db) {
        result.textContent = '❌ Database not initialized';
        return;
    }
    
    const transaction = db.transaction(['data'], 'readwrite');
    const objectStore = transaction.objectStore('data');
    
    const data = {
        key: `item_${Date.now()}`,
        value: `Sample data ${Math.random()}`,
        timestamp: new Date().toISOString()
    };
    
    const request = objectStore.add(data);
    
    request.onsuccess = () => {
        result.textContent = `✅ Added to IndexedDB:\n${JSON.stringify(data, null, 2)}`;
        showNotification('Data added to IndexedDB', 'success');
    };
    
    request.onerror = () => {
        result.textContent = '❌ Failed to add data to IndexedDB';
    };
}

function getFromIndexedDB() {
    const result = document.getElementById('indexeddb-result');
    
    if (!db) {
        result.textContent = '❌ Database not initialized';
        return;
    }
    
    const transaction = db.transaction(['data'], 'readonly');
    const objectStore = transaction.objectStore('data');
    const request = objectStore.getAll();
    
    request.onsuccess = () => {
        const data = request.result;
        if (data.length > 0) {
            result.textContent = `✅ Retrieved ${data.length} items from IndexedDB:\n${JSON.stringify(data, null, 2)}`;
        } else {
            result.textContent = '❌ No data found in IndexedDB';
        }
    };
}

function listIndexedDB() {
    getFromIndexedDB();
}

function clearIndexedDB() {
    const result = document.getElementById('indexeddb-result');
    
    if (!db) {
        result.textContent = '❌ Database not initialized';
        return;
    }
    
    const transaction = db.transaction(['data'], 'readwrite');
    const objectStore = transaction.objectStore('data');
    const request = objectStore.clear();
    
    request.onsuccess = () => {
        result.textContent = '✅ IndexedDB cleared';
        showNotification('IndexedDB cleared', 'success');
    };
}

// ========================================
// NOTIFICATIONS API
// ========================================

async function requestNotificationPermission() {
    const result = document.getElementById('notification-status');
    
    if (!('Notification' in window)) {
        result.textContent = '❌ Notifications not supported';
        return;
    }
    
    if (Notification.permission === 'granted') {
        result.textContent = '✅ Notification permission already granted';
        return;
    }
    
    if (Notification.permission === 'denied') {
        result.textContent = '❌ Notification permission denied';
        return;
    }
    
    try {
        const permission = await Notification.requestPermission();
        
        let statusText = '';
        switch (permission) {
            case 'granted':
                statusText = '✅ Permission granted';
                break;
            case 'denied':
                statusText = '❌ Permission denied';
                break;
            case 'default':
                statusText = '⏳ Permission dismissed';
                break;
        }
        
        result.textContent = `Notification permission: ${statusText}`;
        showNotification(`Permission ${permission}`, permission === 'granted' ? 'success' : 'warning');
        
    } catch (error) {
        console.error('Notification permission error:', error);
        result.textContent = `Error: ${error.message}`;
    }
}

function showNotification() {
    const title = document.getElementById('notification-title').value;
    const body = document.getElementById('notification-body').value;
    const icon = document.getElementById('notification-icon').value;
    
    if (!('Notification' in window)) {
        showNotification('Notifications not supported', 'error');
        return;
    }
    
    if (Notification.permission !== 'granted') {
        showNotification('Permission not granted', 'warning');
        return;
    }
    
    const options = {
        body: body,
        icon: icon || undefined,
        badge: icon || undefined,
        tag: 'browser-apis-demo',
        requireInteraction: false
    };
    
    const notification = new Notification(title, options);
    
    notification.onclick = () => {
        window.focus();
        notification.close();
    };
    
    notification.onclose = () => {
        console.log('Notification closed');
    };
    
    showNotification('Notification displayed', 'success');
}

function showScheduledNotification() {
    setTimeout(() => {
        showNotification();
    }, 3000);
    
    showNotification('Notification scheduled for 3 seconds', 'info');
}

function checkNotificationPermission() {
    const result = document.getElementById('notification-status');
    
    if (!('Notification' in window)) {
        result.textContent = '❌ Notifications not supported';
        return;
    }
    
    let statusText = '';
    switch (Notification.permission) {
        case 'granted':
            statusText = '✅ Permission granted';
            break;
        case 'denied':
            statusText = '❌ Permission denied';
            break;
        case 'default':
            statusText = '⏳ Permission not requested';
            break;
    }
    
    result.textContent = `Current permission status: ${statusText}\n` +
                       `Last checked: ${new Date().toLocaleString()}`;
}

// ========================================
// CANVAS API
// ========================================

function switchCanvasTab(tabName) {
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

function initializeCanvases() {
    // Initialize drawing canvas
    const drawingCanvas = document.getElementById('drawing-canvas');
    if (drawingCanvas) {
        const ctx = drawingCanvas.getContext('2d');
        ctx.fillStyle = '#f8f9fa';
        ctx.fillRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    }
    
    // Initialize other canvases
    ['animation-canvas', 'image-canvas', 'charts-canvas'].forEach(id => {
        const canvas = document.getElementById(id);
        if (canvas) {
            const ctx = canvas.getContext('2d');
            ctx.fillStyle = '#f8f9fa';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    });
}

function drawShapes() {
    const canvas = document.getElementById('drawing-canvas');
    const ctx = canvas.getContext('2d');
    const color = document.getElementById('draw-color').value;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw rectangle
    ctx.fillStyle = color;
    ctx.fillRect(50, 50, 200, 100);
    
    // Draw circle
    ctx.beginPath();
    ctx.arc(400, 100, 50, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw triangle
    ctx.beginPath();
    ctx.moveTo(550, 150);
    ctx.lineTo(650, 150);
    ctx.lineTo(600, 50);
    ctx.closePath();
    ctx.fill();
    
    // Draw line
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(50, 200);
    ctx.lineTo(650, 200);
    ctx.stroke();
    
    showNotification('Shapes drawn', 'success');
}

function drawText() {
    const canvas = document.getElementById('drawing-canvas');
    const ctx = canvas.getContext('2d');
    const color = document.getElementById('draw-color').value;
    
    ctx.fillStyle = color;
    ctx.font = '48px Arial';
    ctx.fillText('Canvas API!', 200, 280);
    
    ctx.font = '24px Arial';
    ctx.fillText('Drawing text with HTML5 Canvas', 220, 320);
    
    showNotification('Text drawn', 'success');
}

function drawGradient() {
    const canvas = document.getElementById('drawing-canvas');
    const ctx = canvas.getContext('2d');
    
    // Create linear gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#667eea');
    gradient.addColorStop(0.5, '#764ba2');
    gradient.addColorStop(1, '#f093fb');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(100, 250, 600, 100);
    
    showNotification('Gradient drawn', 'success');
}

function clearCanvas() {
    const activeTab = document.querySelector('.tab.active');
    const tabName = activeTab.textContent.toLowerCase();
    
    let canvasId = 'drawing-canvas';
    if (tabName.includes('animation')) canvasId = 'animation-canvas';
    if (tabName.includes('image')) canvasId = 'image-canvas';
    if (tabName.includes('chart')) canvasId = 'charts-canvas';
    
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d');
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#f8f9fa';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    showNotification('Canvas cleared', 'info');
}

function startAnimation() {
    const canvas = document.getElementById('animation-canvas');
    const ctx = canvas.getContext('2d');
    
    let x = 0;
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw animated rectangle
        ctx.fillStyle = '#667eea';
        ctx.fillRect(x, 150, 50, 50);
        
        x += 2;
        if (x > canvas.width) x = 0;
        
        animationId = requestAnimationFrame(animate);
    }
    
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    animate();
    showNotification('Animation started', 'success');
}

function stopAnimation() {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
        showNotification('Animation stopped', 'info');
    }
}

function startBouncingBall() {
    const canvas = document.getElementById('animation-canvas');
    const ctx = canvas.getContext('2d');
    
    let x = canvas.width / 2;
    let y = 50;
    let vx = 5;
    let vy = 2;
    const radius = 20;
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw ball
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = '#764ba2';
        ctx.fill();
        
        // Update position
        x += vx;
        y += vy;
        
        // Bounce off walls
        if (x + radius > canvas.width || x - radius < 0) {
            vx = -vx;
        }
        if (y + radius > canvas.height || y - radius < 0) {
            vy = -vy;
        }
        
        animationId = requestAnimationFrame(animate);
    }
    
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    animate();
    showNotification('Bouncing ball animation started', 'success');
}

function startParticles() {
    const canvas = document.getElementById('animation-canvas');
    const ctx = canvas.getContext('2d');
    
    const particles = [];
    const particleCount = 50;
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            radius: Math.random() * 3 + 1,
            color: `hsl(${Math.random() * 360}, 70%, 50%)`
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Wrap around edges
            if (particle.x < 0) particle.x = canvas.width;
            if (particle.x > canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = canvas.height;
            if (particle.y > canvas.height) particle.y = 0;
            
            // Draw particle
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            ctx.fillStyle = particle.color;
            ctx.fill();
        });
        
        animationId = requestAnimationFrame(animate);
    }
    
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    animate();
    showNotification('Particle animation started', 'success');
}

function loadImageToCanvas() {
    const canvas = document.getElementById('image-canvas');
    const ctx = canvas.getContext('2d');
    
    // Load sample image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Scale image to fit canvas
        const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;
        
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        showNotification('Image loaded to canvas', 'success');
    };
    
    img.onerror = () => {
        showNotification('Failed to load image', 'error');
    };
    
    img.src = 'https://picsum.photos/seed/canvas-demo/800/400.jpg';
}

function handleImageUpload(event) {
    const file = event.target.files[0];
    if (!file) return;
    
    const canvas = document.getElementById('image-canvas');
    const ctx = canvas.getContext('2d');
    
    const reader = new FileReader();
    reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Scale image to fit canvas
            const scale = Math.min(canvas.width / img.width, canvas.height / img.height);
            const x = (canvas.width - img.width * scale) / 2;
            const y = (canvas.height - img.height * scale) / 2;
            
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
            showNotification('Image uploaded to canvas', 'success');
        };
        img.src = e.target.result;
    };
    
    reader.readAsDataURL(file);
}

function applyFilter(filterType) {
    const canvas = document.getElementById('image-canvas');
    const ctx = canvas.getContext('2d');
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    switch (filterType) {
        case 'grayscale':
            for (let i = 0; i < data.length; i += 4) {
                const gray = data[i] * 0.299 + data[i + 1] * 0.587 + data[i + 2] * 0.114;
                data[i] = gray;
                data[i + 1] = gray;
                data[i + 2] = gray;
            }
            break;
            
        case 'invert':
            for (let i = 0; i < data.length; i += 4) {
                data[i] = 255 - data[i];
                data[i + 1] = 255 - data[i + 1];
                data[i + 2] = 255 - data[i + 2];
            }
            break;
            
        case 'blur':
            // Simple box blur
            const tempData = new Uint8ClampedArray(data);
            const width = canvas.width;
            const height = canvas.height;
            
            for (let y = 1; y < height - 1; y++) {
                for (let x = 1; x < width - 1; x++) {
                    for (let c = 0; c < 3; c++) {
                        let sum = 0;
                        for (let dy = -1; dy <= 1; dy++) {
                            for (let dx = -1; dx <= 1; dx++) {
                                const idx = ((y + dy) * width + (x + dx)) * 4 + c;
                                sum += tempData[idx];
                            }
                        }
                        data[(y * width + x) * 4 + c] = sum / 9;
                    }
                }
            }
            break;
    }
    
    ctx.putImageData(imageData, 0, 0);
    showNotification(`${filterType} filter applied`, 'success');
}

function drawBarChart() {
    const canvas = document.getElementById('charts-canvas');
    const ctx = canvas.getContext('2d');
    
    const data = [65, 59, 80, 81, 56, 55, 40];
    const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    const barWidth = chartWidth / data.length;
    const maxValue = Math.max(...data);
    
    // Draw axes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();
    
    // Draw bars
    data.forEach((value, index) => {
        const barHeight = (value / maxValue) * chartHeight;
        const x = padding + index * barWidth + barWidth * 0.1;
        const y = canvas.height - padding - barHeight;
        const width = barWidth * 0.8;
        
        // Draw bar
        const gradient = ctx.createLinearGradient(0, y, 0, canvas.height - padding);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, width, barHeight);
        
        // Draw label
        ctx.fillStyle = '#333';
        ctx.font = '14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(labels[index], x + width / 2, canvas.height - padding + 20);
        
        // Draw value
        ctx.fillText(value, x + width / 2, y - 5);
    });
    
    showNotification('Bar chart drawn', 'success');
}

function drawPieChart() {
    const canvas = document.getElementById('charts-canvas');
    const ctx = canvas.getContext('2d');
    
    const data = [30, 25, 20, 15, 10];
    const labels = ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'];
    const colors = ['#667eea', '#764ba2', '#f093fb', '#fda4af', '#fb923c'];
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 40;
    
    const total = data.reduce((sum, value) => sum + value, 0);
    let currentAngle = -Math.PI / 2;
    
    data.forEach((value, index) => {
        const sliceAngle = (value / total) * Math.PI * 2;
        
        // Draw slice
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = colors[index];
        ctx.fill();
        
        // Draw label
        const labelAngle = currentAngle + sliceAngle / 2;
        const labelX = centerX + Math.cos(labelAngle) * (radius * 0.7);
        const labelY = centerY + Math.sin(labelAngle) * (radius * 0.7);
        
        ctx.fillStyle = 'white';
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${value}%`, labelX, labelY);
        
        currentAngle += sliceAngle;
    });
    
    // Draw legend
    let legendY = 30;
    labels.forEach((label, index) => {
        ctx.fillStyle = colors[index];
        ctx.fillRect(canvas.width - 150, legendY, 15, 15);
        
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(label, canvas.width - 130, legendY + 12);
        
        legendY += 25;
    });
    
    showNotification('Pie chart drawn', 'success');
}

function drawLineChart() {
    const canvas = document.getElementById('charts-canvas');
    const ctx = canvas.getContext('2d');
    
    const data = [20, 35, 40, 30, 45, 60, 55, 70, 65, 80];
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const padding = 40;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    const pointSpacing = chartWidth / (data.length - 1);
    const maxValue = Math.max(...data);
    
    // Draw axes
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();
    
    // Draw line
    ctx.strokeStyle = '#667eea';
    ctx.lineWidth = 3;
    ctx.beginPath();
    
    data.forEach((value, index) => {
        const x = padding + index * pointSpacing;
        const y = canvas.height - padding - (value / maxValue) * chartHeight;
        
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    
    ctx.stroke();
    
    // Draw points and labels
    data.forEach((value, index) => {
        const x = padding + index * pointSpacing;
        const y = canvas.height - padding - (value / maxValue) * chartHeight;
        
        // Draw point
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, Math.PI * 2);
        ctx.fillStyle = '#667eea';
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 2;
        ctx.stroke();
        
        // Draw label
        ctx.fillStyle = '#333';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(labels[index], x, canvas.height - padding + 20);
        ctx.fillText(value, x, y - 10);
    });
    
    showNotification('Line chart drawn', 'success');
}

function drawRealTimeChart() {
    const canvas = document.getElementById('charts-canvas');
    const ctx = canvas.getContext('2d');
    
    const data = [];
    const maxPoints = 50;
    
    function updateChart() {
        // Add new data point
        data.push(Math.random() * 100);
        if (data.length > maxPoints) {
            data.shift();
        }
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw axes
        const padding = 40;
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, canvas.height - padding);
        ctx.lineTo(canvas.width - padding, canvas.height - padding);
        ctx.stroke();
        
        // Draw line
        if (data.length > 1) {
            const chartWidth = canvas.width - padding * 2;
            const chartHeight = canvas.height - padding * 2;
            const pointSpacing = chartWidth / (maxPoints - 1);
            
            ctx.strokeStyle = '#667eea';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            data.forEach((value, index) => {
                const x = padding + index * pointSpacing;
                const y = canvas.height - padding - (value / 100) * chartHeight;
                
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            
            ctx.stroke();
        }
        
        animationId = requestAnimationFrame(updateChart);
    }
    
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    updateChart();
    showNotification('Real-time chart started', 'success');
}

// ========================================
// WEB WORKERS
// ========================================

function createWorker() {
    const result = document.getElementById('worker-result');
    const status = document.getElementById('worker-status');
    
    // Create worker code as a blob
    const workerCode = `
        let counter = 0;
        
        self.onmessage = function(e) {
            const { command, data } = e.data;
            
            switch (command) {
                case 'heavy-calculation':
                    heavyCalculation(data);
                    break;
                case 'background-task':
                    backgroundTask();
                    break;
                case 'ping':
                    self.postMessage({ type: 'pong', data: 'Worker is alive!' });
                    break;
                default:
                    self.postMessage({ type: 'error', data: 'Unknown command' });
            }
        };
        
        function heavyCalculation(iterations) {
            let result = 0;
            const startTime = Date.now();
            
            for (let i = 0; i < iterations; i++) {
                result += Math.sqrt(i) * Math.sin(i);
            }
            
            const endTime = Date.now();
            
            self.postMessage({
                type: 'calculation-result',
                data: {
                    result: result.toFixed(2),
                    iterations: iterations,
                    duration: endTime - startTime
                }
            });
        }
        
        function backgroundTask() {
            setInterval(() => {
                counter++;
                self.postMessage({
                    type: 'background-update',
                    data: {
                        counter: counter,
                        timestamp: new Date().toISOString()
                    }
                });
            }, 1000);
        }
    `;
    
    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const workerUrl = URL.createObjectURL(blob);
    
    webWorker = new Worker(workerUrl);
    
    webWorker.onmessage = (e) => {
        const { type, data } = e.data;
        
        switch (type) {
            case 'calculation-result':
                result.textContent = `Heavy calculation completed:\n` +
                                   `Result: ${data.result}\n` +
                                   `Iterations: ${data.iterations}\n` +
                                   `Duration: ${data.duration}ms`;
                break;
                
            case 'background-update':
                result.textContent = `Background task running:\n` +
                                   `Counter: ${data.counter}\n` +
                                   `Last update: ${data.timestamp}`;
                break;
                
            case 'pong':
                result.textContent = `Worker response: ${data}`;
                break;
                
            case 'error':
                result.textContent = `Worker error: ${data}`;
                break;
        }
        
        status.innerHTML = `<strong>👷 Web Worker Status</strong><br>Worker is active`;
    };
    
    webWorker.onerror = (error) => {
        result.textContent = `Worker error: ${error.message}`;
        status.innerHTML = `<strong>👷 Web Worker Status</strong><br>Worker error`;
    };
    
    status.innerHTML = `<strong>👷 Web Worker Status</strong><br>Worker created and ready`;
    showNotification('Web worker created', 'success');
}

function startHeavyCalculation() {
    if (!webWorker) {
        showNotification('Create worker first', 'warning');
        return;
    }
    
    const iterations = 1000000;
    webWorker.postMessage({ command: 'heavy-calculation', data: iterations });
    
    document.getElementById('worker-result').textContent = 'Starting heavy calculation...';
    showNotification('Heavy calculation started', 'info');
}

function startBackgroundTask() {
    if (!webWorker) {
        showNotification('Create worker first', 'warning');
        return;
    }
    
    webWorker.postMessage({ command: 'background-task' });
    showNotification('Background task started', 'info');
}

function terminateWorker() {
    if (webWorker) {
        webWorker.terminate();
        webWorker = null;
        
        document.getElementById('worker-status').innerHTML = `<strong>👷 Web Worker Status</strong><br>Worker terminated`;
        document.getElementById('worker-result').textContent = 'Worker terminated';
        
        showNotification('Web worker terminated', 'info');
    } else {
        showNotification('No worker to terminate', 'warning');
    }
}

// ========================================
// DEVICE APIS
// ========================================

function switchDeviceTab(tabName) {
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

// Battery API
async function getBatteryInfo() {
    const result = document.getElementById('battery-info');
    
    if (!('getBattery' in navigator)) {
        result.textContent = 'Battery API not supported';
        return;
    }
    
    try {
        const battery = await navigator.getBattery();
        
        const info = `🔋 Battery Information:\n\n` +
                    `Level: ${(battery.level * 100).toFixed(0)}%\n` +
                    `Charging: ${battery.charging ? 'Yes' : 'No'}\n` +
                    `Charging Time: ${battery.chargingTime ? `${battery.chargingTime}s` : 'N/A'}\n` +
                    `Discharging Time: ${battery.dischargingTime ? `${battery.dischargingTime}s` : 'N/A'}`;
        
        result.textContent = info;
        showNotification('Battery info retrieved', 'success');
        
    } catch (error) {
        console.error('Battery API error:', error);
        result.textContent = `Error: ${error.message}`;
        showNotification('Failed to get battery info', 'error');
    }
}

async function monitorBattery() {
    const result = document.getElementById('battery-info');
    
    if (!('getBattery' in navigator)) {
        result.textContent = 'Battery API not supported';
        return;
    }
    
    try {
        const battery = await navigator.getBattery();
        
        const updateBatteryInfo = () => {
            const info = `🔋 Battery Monitor (Live):\n\n` +
                        `Level: ${(battery.level * 100).toFixed(0)}%\n` +
                        `Charging: ${battery.charging ? 'Yes' : 'No'}\n` +
                        `Last Update: ${new Date().toLocaleTimeString()}`;
            
            result.textContent = info;
        };
        
        // Add event listeners
        battery.addEventListener('levelchange', updateBatteryInfo);
        battery.addEventListener('chargingchange', updateBatteryInfo);
        
        // Initial update
        updateBatteryInfo();
        
        // Update every 5 seconds
        batteryMonitorInterval = setInterval(updateBatteryInfo, 5000);
        
        showNotification('Battery monitoring started', 'success');
        
    } catch (error) {
        console.error('Battery monitoring error:', error);
        result.textContent = `Error: ${error.message}`;
        showNotification('Failed to start battery monitoring', 'error');
    }
}

function stopBatteryMonitor() {
    if (batteryMonitorInterval) {
        clearInterval(batteryMonitorInterval);
        batteryMonitorInterval = null;
        
        document.getElementById('battery-info').textContent = 'Battery monitoring stopped';
        showNotification('Battery monitoring stopped', 'info');
    }
}

// Vibration API
function vibratePattern(pattern) {
    const result = document.getElementById('vibration-result');
    
    if (!('vibrate' in navigator)) {
        result.textContent = 'Vibration API not supported';
        return;
    }
    
    let vibrationPattern;
    let description;
    
    switch (pattern) {
        case 'short':
            vibrationPattern = 200;
            description = 'Short vibration (200ms)';
            break;
        case 'long':
            vibrationPattern = 1000;
            description = 'Long vibration (1000ms)';
            break;
        case 'pattern':
            vibrationPattern = [200, 100, 200, 100, 200];
            description = 'Pattern: 200ms on, 100ms off, 200ms on, 100ms off, 200ms on';
            break;
        case 'custom':
            vibrationPattern = [100, 50, 100, 50, 100, 50, 300];
            description = 'Custom pattern: Short bursts followed by long vibration';
            break;
    }
    
    navigator.vibrate(vibrationPattern);
    
    result.textContent = `Vibration pattern executed:\n${description}\n` +
                       `Pattern: ${JSON.stringify(vibrationPattern)}\n` +
                       `Time: ${new Date().toLocaleTimeString()}`;
    
    showNotification('Vibration pattern executed', 'success');
}

// Device Orientation API
function getOrientation() {
    const result = document.getElementById('orientation-info');
    
    if (!('DeviceOrientationEvent' in window)) {
        result.textContent = 'Device Orientation API not supported';
        return;
    }
    
    const handleOrientation = (event) => {
        const info = `🧭 Device Orientation:\n\n` +
                    `Alpha (Z-axis): ${event.alpha?.toFixed(2) || 'N/A'}°\n` +
                    `Beta (X-axis): ${event.beta?.toFixed(2) || 'N/A'}°\n` +
                    `Gamma (Y-axis): ${event.gamma?.toFixed(2) || 'N/A'}°\n` +
                    `Absolute: ${event.absolute ? 'Yes' : 'No'}\n` +
                    `Timestamp: ${new Date().toLocaleTimeString()}`;
        
        result.textContent = info;
    };
    
    window.addEventListener('deviceorientation', handleOrientation);
    
    // Try to get initial orientation
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        // iOS 13+ requires permission
        DeviceOrientationEvent.requestPermission()
            .then(response => {
                if (response === 'granted') {
                    showNotification('Orientation permission granted', 'success');
                } else {
                    showNotification('Orientation permission denied', 'warning');
                }
            })
            .catch(console.error);
    }
    
    showNotification('Orientation tracking started', 'info');
}

function watchOrientation() {
    getOrientation();
}

function stopOrientationWatch() {
    window.removeEventListener('deviceorientation', handleOrientation);
    document.getElementById('orientation-info').textContent = 'Orientation watching stopped';
    showNotification('Orientation watching stopped', 'info');
}

function requestOrientationPermission() {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(response => {
                if (response === 'granted') {
                    showNotification('Orientation permission granted', 'success');
                } else {
                    showNotification('Orientation permission denied', 'warning');
                }
            })
            .catch(error => {
                console.error('Orientation permission error:', error);
                showNotification('Failed to request orientation permission', 'error');
            });
    } else {
        showNotification('Orientation permission not required', 'info');
    }
}

// Clipboard API
async function copyToClipboard() {
    const text = document.getElementById('clipboard-text').value;
    const result = document.getElementById('clipboard-result');
    
    if (!text) {
        showNotification('Please enter text to copy', 'error');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(text);
        
        result.textContent = `✅ Copied to clipboard:\n"${text}"\n` +
                           `Time: ${new Date().toLocaleTimeString()}`;
        
        showNotification('Text copied to clipboard', 'success');
        
    } catch (error) {
        console.error('Clipboard copy error:', error);
        
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        result.textContent = `✅ Copied to clipboard (fallback):\n"${text}"`;
        showNotification('Text copied (fallback method)', 'success');
    }
}

async function readFromClipboard() {
    const result = document.getElementById('clipboard-result');
    
    try {
        const text = await navigator.clipboard.readText();
        
        result.textContent = `✅ Read from clipboard:\n"${text}"\n` +
                           `Time: ${new Date().toLocaleTimeString()}`;
        
        document.getElementById('clipboard-text').value = text;
        showNotification('Text read from clipboard', 'success');
        
    } catch (error) {
        console.error('Clipboard read error:', error);
        result.textContent = `❌ Failed to read from clipboard: ${error.message}`;
        showNotification('Failed to read from clipboard', 'error');
    }
}

async function writeToClipboard() {
    const text = document.getElementById('clipboard-text').value;
    const result = document.getElementById('clipboard-result');
    
    if (!text) {
        showNotification('Please enter text to write', 'error');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(text);
        
        result.textContent = `✅ Written to clipboard:\n"${text}"\n` +
                           `Time: ${new Date().toLocaleTimeString()}`;
        
        showNotification('Text written to clipboard', 'success');
        
    } catch (error) {
        console.error('Clipboard write error:', error);
        result.textContent = `❌ Failed to write to clipboard: ${error.message}`;
        showNotification('Failed to write to clipboard', 'error');
    }
}

// ========================================
// BEST PRACTICES
// ========================================

function showBestPractice(topic) {
    const content = document.getElementById('best-practice-content');
    
    const practices = {
        permissions: `🔐 Permission Handling Best Practices

🎯 REQUEST PERMISSIONS APPROPRIATELY:
• Request permissions only when needed
• Explain why you need the permission
• Handle both grant and denial gracefully
• Provide fallback functionality

✅ GOOD EXAMPLES:
// Check permission before using
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(success, error);
}

// Request permission with context
const requestLocation = async () => {
    const permission = await navigator.permissions.query({ name: 'geolocation' });
    if (permission.state === 'granted') {
        getLocation();
    } else {
        showLocationPermissionDialog();
    }
};

❌ AVOID:
• Requesting all permissions on page load
• Not explaining why permission is needed
• Failing silently when permission denied
• Not providing alternatives

🔧 PERMISSION STATES:
• granted: Permission approved
• denied: Permission rejected
• prompt: User needs to decide

💡 PRO TIPS:
• Use Permissions API to check status
• Implement graceful degradation
• Store permission preferences
• Respect user privacy`,

        error: `⚠️ Error Handling Best Practices

🎯 COMPREHENSIVE ERROR HANDLING:
• Always include try-catch blocks
• Provide meaningful error messages
• Log errors for debugging
• Offer user-friendly error messages

✅ GOOD EXAMPLES:
// Geolocation with error handling
const getLocation = async () => {
    try {
        const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        return position;
    } catch (error) {
        console.error('Location error:', error);
        switch (error.code) {
            case error.PERMISSION_DENIED:
                throw new Error('Location access denied');
            case error.POSITION_UNAVAILABLE:
                throw new Error('Location unavailable');
            default:
                throw new Error('Location request failed');
        }
    }
};

// Media device error handling
const startCamera = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        return stream;
    } catch (error) {
        if (error.name === 'NotAllowedError') {
            throw new Error('Camera permission denied');
        } else if (error.name === 'NotFoundError') {
            throw new Error('No camera found');
        }
        throw error;
    }
};

❌ AVOID:
• Ignoring errors silently
• Showing technical error messages to users
• Not logging errors for debugging
• Not providing recovery options

🔧 ERROR TYPES:
• PermissionError: Access denied
• NotFoundError: Device/API not found
• NotAllowedError: Permission denied
• NotReadableError: Device in use

💡 PRO TIPS:
• Create custom error classes
• Implement error boundaries
• Use error monitoring services
• Test error scenarios regularly`,

        performance: `⚡ Performance Best Practices

🎯 OPTIMIZE API USAGE:
• Use APIs efficiently and sparingly
• Implement proper cleanup
• Avoid unnecessary API calls
• Use requestAnimationFrame for animations

✅ GOOD EXAMPLES:
// Efficient geolocation watching
let watchId = null;
const startLocationWatch = () => {
    if (watchId) return; // Prevent multiple watches
    
    watchId = navigator.geolocation.watchPosition(
        updatePosition,
        handleError,
        { enableHighAccuracy: false, maximumAge: 60000 }
    );
};

// Clean up media streams
const cleanupMediaStream = (stream) => {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
};

// Efficient canvas rendering
const animate = () => {
    if (!isAnimating) return;
    
    updateCanvas();
    requestAnimationFrame(animate);
};

❌ AVOID:
• Creating multiple streams without cleanup
• High-frequency API calls
• Not using requestAnimationFrame
• Ignoring memory leaks

🔧 PERFORMANCE TECHNIQUES:
• Debounce expensive operations
• Use Web Workers for heavy tasks
• Implement proper resource cleanup
• Cache API responses when appropriate

💡 PRO TIPS:
• Monitor memory usage
• Use performance profiling tools
• Test on low-end devices
• Implement lazy loading`,

        security: `🔒 Security Best Practices

🎯 SECURE API USAGE:
• Validate all inputs and outputs
• Use HTTPS for all requests
• Implement proper authentication
• Sanitize user-generated content

✅ GOOD EXAMPLES:
// Secure clipboard usage
const copyToClipboard = async (text) => {
    if (!text || typeof text !== 'string') {
        throw new Error('Invalid text to copy');
    }
    
    try {
        await navigator.clipboard.writeText(text);
    } catch (error) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
    }
};

// Secure media device usage
const startCamera = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: { ideal: 1280, max: 1920 },
                height: { ideal: 720, max: 1080 }
            }
        });
        return stream;
    } catch (error) {
        console.error('Camera access denied:', error);
        throw new Error('Unable to access camera');
    }
};

❌ AVOID:
• Storing sensitive data in localStorage
• Not validating API responses
• Using HTTP for API requests
• Ignoring CORS policies

🔧 SECURITY CONSIDERATIONS:
• Use Content Security Policy (CSP)
• Implement proper authentication
• Validate and sanitize all data
• Use secure contexts (HTTPS)

💡 PRO TIPS:
• Regular security audits
• Keep dependencies updated
• Use security headers
• Implement proper logging`,

        compatibility: `🌐 Compatibility Best Practices

🎯 ENSURE CROSS-BROWSER SUPPORT:
• Check API availability before use
• Provide polyfills when needed
• Implement graceful degradation
• Test on multiple browsers

✅ GOOD EXAMPLES:
// Check API availability
const checkAPIAvailability = () => {
    const apis = {
        geolocation: 'geolocation' in navigator,
        mediaDevices: 'mediaDevices' in navigator,
        notifications: 'Notification' in window,
        webWorkers: 'Worker' in window
    };
    
    return apis;
};

// Graceful degradation
const getLocation = () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        // Fallback: Ask user to enter location
        showLocationInputForm();
    }
};

// Feature detection with polyfill
const requestAnimationFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    ((callback) => setTimeout(callback, 1000 / 60));

❌ AVOID:
• Assuming API availability
• Not providing fallbacks
• Using browser-specific features without checks
• Ignoring mobile browser limitations

🔧 COMPATIBILITY STRATEGIES:
• Use feature detection
• Implement progressive enhancement
• Provide polyfills for missing features
• Test on target browsers

💡 PRO TIPS:
• Use caniuse.com for compatibility info
• Test on real devices
• Consider older browser support
• Use browser detection sparingly`,

        accessibility: `♿ Accessibility Best Practices

🎯 MAKE APIS ACCESSIBLE:
• Provide keyboard alternatives
• Ensure screen reader compatibility
• Add proper ARIA labels
• Consider motor impairments

✅ GOOD EXAMPLES:
// Accessible notifications
const showNotification = (message, type = 'info') => {
    const notification = document.createElement('div');
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    notification.className = \`notification \${type}\`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 5000);
};

// Accessible media controls
const createMediaControls = () => {
    const controls = document.createElement('div');
    controls.setAttribute('role', 'toolbar');
    controls.setAttribute('aria-label', 'Media controls');
    
    const startBtn = document.createElement('button');
    startBtn.setAttribute('aria-label', 'Start camera');
    startBtn.textContent = 'Start Camera';
    
    const stopBtn = document.createElement('button');
    stopBtn.setAttribute('aria-label', 'Stop camera');
    stopBtn.textContent = 'Stop Camera';
    
    controls.appendChild(startBtn);
    controls.appendChild(stopBtn);
    
    return controls;
};

❌ AVOID:
• Relying solely on visual feedback
• Not providing keyboard alternatives
• Ignoring screen reader users
• Using color as only indicator

🔧 ACCESSIBILITY FEATURES:
• ARIA labels and roles
• Keyboard navigation
• Screen reader support
• High contrast support
• Focus management

💡 PRO TIPS:
• Test with screen readers
• Use keyboard-only navigation
• Ensure sufficient color contrast
• Provide text alternatives
• Test with accessibility tools`
    };
    
    content.textContent = practices[topic] || 'Best practice information not available.';
    showNotification(`Showing ${topic} best practices`, 'info');
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
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Shift + L: Get location
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'L') {
            e.preventDefault();
            getCurrentLocation();
        }
        
        // Ctrl/Cmd + Shift + C: Start camera
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            startCamera();
        }
        
        // Ctrl/Cmd + Shift + N: Show notification
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'N') {
            e.preventDefault();
            showNotification();
        }
    });
    
    // Handle page unload for cleanup
    window.addEventListener('beforeunload', () => {
        // Cleanup resources
        if (cameraStream) {
            cameraStream.getTracks().forEach(track => track.stop());
        }
        if (microphoneStream) {
            microphoneStream.getTracks().forEach(track => track.stop());
        }
        if (screenShareStream) {
            screenShareStream.getTracks().forEach(track => track.stop());
        }
        if (webWorker) {
            webWorker.terminate();
        }
        if (locationWatchId) {
            navigator.geolocation.clearWatch(locationWatchId);
        }
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
        if (batteryMonitorInterval) {
            clearInterval(batteryMonitorInterval);
        }
    });
}

console.log("Browser APIs Playground - All systems ready! 🌐");
