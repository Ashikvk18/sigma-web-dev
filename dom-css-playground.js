// ========================================
// DOM + CSS PLAYGROUND
// ========================================

console.log("DOM + CSS Playground Loaded!");

// Global state
let isDarkTheme = false;
let gridItemCount = 0;
let currentAnimations = new Set();

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM + CSS Playground initialized!");
    initializePlayground();
});

function initializePlayground() {
    generatePalette();
    initializeGrid();
    setupEventListeners();
}

// ========================================
// DYNAMIC STYLING
// ========================================

function applyStyles() {
    const playground = document.getElementById('style-playground');
    const bgColor = document.getElementById('bg-color').value;
    const textColor = document.getElementById('text-color').value;
    const borderRadius = document.getElementById('border-radius').value;
    const padding = document.getElementById('padding').value;
    
    // Apply styles using JavaScript
    playground.style.backgroundColor = bgColor;
    playground.style.color = textColor;
    playground.style.borderRadius = `${borderRadius}px`;
    playground.style.padding = `${padding}px`;
    
    // Add transition for smooth changes
    playground.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    
    console.log('Applied styles:', { bgColor, textColor, borderRadius, padding });
}

function randomStyles() {
    const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16);
    
    document.getElementById('bg-color').value = randomColor();
    document.getElementById('text-color').value = randomColor();
    document.getElementById('border-radius').value = Math.floor(Math.random() * 30);
    document.getElementById('padding').value = Math.floor(Math.random() * 30) + 10;
    
    applyStyles();
}

function addStyleCard() {
    const container = document.getElementById('style-cards');
    const card = document.createElement('div');
    card.className = 'style-card';
    
    const randomGradient = () => {
        const color1 = '#' + Math.floor(Math.random()*16777215).toString(16);
        const color2 = '#' + Math.floor(Math.random()*16777215).toString(16);
        return `linear-gradient(135deg, ${color1}, ${color2})`;
    };
    
    card.innerHTML = `
        <h3>Dynamic Card ${container.children.length + 1}</h3>
        <p>This card was added dynamically with random styles!</p>
        <button class="btn btn-danger" onclick="this.parentElement.remove()">Remove</button>
    `;
    
    card.style.background = randomGradient();
    card.style.color = 'white';
    
    container.appendChild(card);
    
    // Animate entrance
    setTimeout(() => {
        card.style.animation = 'slide 0.5s ease-out';
    }, 10);
}

// ========================================
// COLOR PALETTE GENERATOR
// ========================================

function generatePalette() {
    const baseColor = document.getElementById('base-color').value;
    const paletteType = document.getElementById('palette-type').value;
    const container = document.getElementById('color-palette');
    
    container.innerHTML = '';
    
    let colors = [];
    
    switch(paletteType) {
        case 'monochromatic':
            colors = generateMonochromatic(baseColor);
            break;
        case 'analogous':
            colors = generateAnalogous(baseColor);
            break;
        case 'complementary':
            colors = generateComplementary(baseColor);
            break;
        case 'triadic':
            colors = generateTriadic(baseColor);
            break;
    }
    
    colors.forEach((color, index) => {
        const swatch = document.createElement('div');
        swatch.className = 'color-swatch';
        swatch.style.background = color;
        swatch.textContent = color.toUpperCase();
        swatch.onclick = () => copyToClipboard(color);
        swatch.title = `Click to copy: ${color}`;
        
        container.appendChild(swatch);
        
        // Animate entrance
        setTimeout(() => {
            swatch.style.animation = 'fade 0.5s ease-out';
        }, index * 100);
    });
}

function generateMonochromatic(baseColor) {
    const colors = [];
    const hsl = hexToHSL(baseColor);
    
    for (let i = 0; i < 5; i++) {
        const lightness = 20 + (i * 15);
        colors.push(hslToHex(hsl.h, hsl.s, lightness));
    }
    
    return colors;
}

function generateAnalogous(baseColor) {
    const colors = [];
    const hsl = hexToHSL(baseColor);
    
    for (let i = -2; i <= 2; i++) {
        const hue = (hsl.h + i * 30 + 360) % 360;
        colors.push(hslToHex(hue, hsl.s, hsl.l));
    }
    
    return colors;
}

function generateComplementary(baseColor) {
    const hsl = hexToHSL(baseColor);
    const complement = hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l);
    
    return [baseColor, complement, '#ffffff', '#000000', baseColor + '80'];
}

function generateTriadic(baseColor) {
    const hsl = hexToHSL(baseColor);
    const color1 = baseColor;
    const color2 = hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l);
    const color3 = hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l);
    
    return [color1, color2, color3, '#ffffff', '#000000'];
}

function hexToHSL(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
        h = s = 0;
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    
    return { h: h * 360, s: s * 100, l: l * 100 };
}

function hslToHex(h, s, l) {
    h = h / 360;
    s = s / 100;
    l = l / 100;
    
    let r, g, b;
    
    if (s === 0) {
        r = g = b = l;
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1/6) return p + (q - p) * 6 * t;
            if (t < 1/2) return q;
            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        };
        
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    
    const toHex = x => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function exportPalette() {
    const swatches = document.querySelectorAll('.color-swatch');
    let css = ':root {\n';
    
    swatches.forEach((swatch, index) => {
        const color = swatch.textContent;
        css += `  --color-${index + 1}: ${color};\n`;
    });
    
    css += '}';
    
    copyToClipboard(css);
    showNotification('CSS variables copied to clipboard!', 'success');
}

// ========================================
// ANIMATION SHOWCASE
// ========================================

function playAnimation(animationName) {
    const boxes = document.querySelectorAll('.animation-box');
    
    boxes.forEach(box => {
        if (box.dataset.animation === animationName) {
            box.style.animation = 'none';
            setTimeout(() => {
                box.style.animation = `${animationName} 1s ease-in-out`;
            }, 10);
            
            currentAnimations.add(box);
        }
    });
}

function stopAllAnimations() {
    const boxes = document.querySelectorAll('.animation-box');
    
    boxes.forEach(box => {
        box.style.animation = 'none';
    });
    
    currentAnimations.clear();
}

// ========================================
// LAYOUT GRID SYSTEM
// ========================================

function initializeGrid() {
    const grid = document.getElementById('layout-grid');
    
    for (let i = 0; i < 6; i++) {
        addGridItem(false);
    }
}

function updateGrid() {
    const grid = document.getElementById('layout-grid');
    const columns = document.getElementById('grid-columns').value;
    const gap = document.getElementById('grid-gap').value;
    
    grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    grid.style.gap = `${gap}px`;
}

function addGridItem(animate = true) {
    const grid = document.getElementById('layout-grid');
    const item = document.createElement('div');
    item.className = 'grid-item';
    
    gridItemCount++;
    
    const randomGradient = () => {
        const color1 = '#' + Math.floor(Math.random()*16777215).toString(16);
        const color2 = '#' + Math.floor(Math.random()*16777215).toString(16);
        return `linear-gradient(135deg, ${color1}, ${color2})`;
    };
    
    item.innerHTML = `
        <h3>Item ${gridItemCount}</h3>
        <p>Dynamic grid item</p>
        <button class="btn btn-danger" onclick="this.parentElement.remove()" style="margin-top: 10px; padding: 5px 10px; font-size: 12px;">Remove</button>
    `;
    
    item.style.background = randomGradient();
    item.style.color = 'white';
    
    grid.appendChild(item);
    
    if (animate) {
        setTimeout(() => {
            item.style.animation = 'fade 0.5s ease-out';
        }, 10);
    }
}

function clearGrid() {
    const grid = document.getElementById('layout-grid');
    grid.innerHTML = '';
    gridItemCount = 0;
}

// ========================================
// RESPONSIVE DESIGN DEMO
// ========================================

function updateViewportWidth(width) {
    const demo = document.getElementById('responsive-demo');
    const display = document.getElementById('width-display');
    
    demo.style.maxWidth = `${width}px`;
    demo.style.margin = '0 auto';
    display.textContent = `${width}px`;
}

function resetViewport() {
    const demo = document.getElementById('responsive-demo');
    const slider = document.getElementById('viewport-width');
    const display = document.getElementById('width-display');
    
    demo.style.maxWidth = '100%';
    demo.style.margin = '';
    slider.value = 1000;
    display.textContent = '1000px';
}

// ========================================
// PROGRESS AND LOADING
// ========================================

function updateProgress(value) {
    const progressBar = document.getElementById('progress-bar');
    const display = document.getElementById('progress-display');
    
    progressBar.style.width = `${value}%`;
    display.textContent = `${value}%`;
    
    // Change color based on progress
    if (value < 33) {
        progressBar.style.background = 'linear-gradient(90deg, #ef4444, #dc2626)';
    } else if (value < 66) {
        progressBar.style.background = 'linear-gradient(90deg, #f59e0b, #d97706)';
    } else {
        progressBar.style.background = 'linear-gradient(90deg, #10b981, #059669)';
    }
}

function animateProgress() {
    let progress = 0;
    const interval = setInterval(() => {
        progress += 2;
        updateProgress(progress);
        
        if (progress >= 100) {
            clearInterval(interval);
            setTimeout(() => {
                updateProgress(0);
                document.getElementById('progress-value').value = 0;
            }, 1000);
        }
    }, 50);
}

function toggleLoading() {
    const container = document.getElementById('loading-container');
    
    if (container.children.length === 0) {
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        container.appendChild(spinner);
    } else {
        container.innerHTML = '';
    }
}

// ========================================
// CSS VARIABLES DEMO
// ========================================

function updateCSSVariable(variable, value) {
    document.documentElement.style.setProperty(`--${variable}`, value);
    console.log(`Updated CSS variable --${variable} to ${value}`);
}

function randomizeVariables() {
    const randomColor = () => '#' + Math.floor(Math.random()*16777215).toString(16);
    
    const primary = randomColor();
    const secondary = randomColor();
    const accent = randomColor();
    
    document.getElementById('primary-var').value = primary;
    document.getElementById('secondary-var').value = secondary;
    document.getElementById('accent-var').value = accent;
    
    updateCSSVariable('primary-color', primary);
    updateCSSVariable('secondary-color', secondary);
    updateCSSVariable('accent-color', accent);
}

function resetVariables() {
    const defaults = {
        'primary-color': '#6366f1',
        'secondary-color': '#8b5cf6',
        'accent-color': '#ec4899'
    };
    
    document.getElementById('primary-var').value = defaults['primary-color'];
    document.getElementById('secondary-var').value = defaults['secondary-color'];
    document.getElementById('accent-var').value = defaults['accent-color'];
    
    Object.entries(defaults).forEach(([variable, value]) => {
        updateCSSVariable(variable, value);
    });
}

// ========================================
// THEME SWITCHER
// ========================================

function toggleTheme() {
    const body = document.body;
    const themeBtn = document.querySelector('.theme-btn');
    
    isDarkTheme = !isDarkTheme;
    
    if (isDarkTheme) {
        body.classList.add('dark-theme');
        themeBtn.textContent = '☀️';
        themeBtn.style.background = 'linear-gradient(135deg, #f59e0b, #f97316)';
    } else {
        body.classList.remove('dark-theme');
        themeBtn.textContent = '🌙';
        themeBtn.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
    }
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Copied to clipboard!', 'success');
    }).catch(() => {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        showNotification('Copied to clipboard!', 'success');
    });
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Set color based on type
    const colors = {
        success: 'linear-gradient(135deg, #10b981, #059669)',
        error: 'linear-gradient(135deg, #ef4444, #dc2626)',
        warning: 'linear-gradient(135deg, #f59e0b, #d97706)',
        info: 'linear-gradient(135deg, #3b82f6, #2563eb)'
    };
    
    notification.style.background = colors[type] || colors.info;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '8px';
    notification.style.color = 'white';
    notification.style.fontWeight = 'bold';
    notification.style.zIndex = '10000';
    notification.style.animation = 'slide 0.3s ease-out';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slide 0.3s ease-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function setupEventListeners() {
    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'r':
                    e.preventDefault();
                    randomStyles();
                    break;
                case 'g':
                    e.preventDefault();
                    generatePalette();
                    break;
                case 't':
                    e.preventDefault();
                    toggleTheme();
                    break;
            }
        }
    });
    
    // Auto-generate palette when base color changes
    document.getElementById('base-color').addEventListener('change', generatePalette);
    document.getElementById('palette-type').addEventListener('change', generatePalette);
    
    // Auto-update grid when settings change
    document.getElementById('grid-columns').addEventListener('input', updateGrid);
    document.getElementById('grid-gap').addEventListener('input', updateGrid);
}

console.log("DOM + CSS Playground - All systems ready! 🎨");
