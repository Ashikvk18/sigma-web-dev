// ========================================
// DATE & TIME MANIPULATION PLAYGROUND
// ========================================

console.log("Date & Time Playground Loaded!");

// Global state
let clockInterval = null;
let isClockRunning = true;
let selectedDate = null;
let countdownInterval = null;
let events = [];
let clockFormat = 24; // 24 or 12 hour format

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("Date & Time Playground initialized!");
    initializePlayground();
});

function initializePlayground() {
    startClock();
    initializeCalendar();
    setupEventListeners();
    loadEventsFromStorage();
}

// ========================================
// LIVE CLOCK
// ========================================

function startClock() {
    updateClock();
    clockInterval = setInterval(updateClock, 1000);
}

function updateClock() {
    const now = new Date();
    const clockElement = document.getElementById('live-clock');
    const dateElement = document.getElementById('live-date');
    
    if (clockFormat === 24) {
        clockElement.textContent = now.toLocaleTimeString('en-US', { hour12: false });
    } else {
        clockElement.textContent = now.toLocaleTimeString('en-US', { hour12: true });
    }
    
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    dateElement.textContent = now.toLocaleDateString('en-US', options);
}

function toggleClock() {
    if (isClockRunning) {
        clearInterval(clockInterval);
        isClockRunning = false;
        showNotification('Clock stopped', 'warning');
    } else {
        startClock();
        isClockRunning = true;
        showNotification('Clock started', 'success');
    }
}

function changeClockFormat() {
    clockFormat = clockFormat === 24 ? 12 : 24;
    updateClock();
    showNotification(`Changed to ${clockFormat}-hour format`, 'info');
}

function showCurrentInfo() {
    const now = new Date();
    const result = document.getElementById('current-info');
    
    let info = '📅 Current Date & Time Information\n';
    info += '=' .repeat(50) + '\n\n';
    
    info += `Full Date: ${now.toString()}\n`;
    info += `ISO String: ${now.toISOString()}\n`;
    info += `UTC String: ${now.toUTCString()}\n`;
    info += `Date String: ${now.toDateString()}\n`;
    info += `Time String: ${now.toTimeString()}\n\n`;
    
    info += '🔢 Numeric Components:\n';
    info += `Year: ${now.getFullYear()}\n`;
    info += `Month: ${now.getMonth() + 1} (0-11)\n`;
    info += `Day: ${now.getDate()}\n`;
    info += `Day of Week: ${now.getDay()} (0-6, 0=Sunday)\n`;
    info += `Hours: ${now.getHours()}\n`;
    info += `Minutes: ${now.getMinutes()}\n`;
    info += `Seconds: ${now.getSeconds()}\n`;
    info += `Milliseconds: ${now.getMilliseconds()}\n\n`;
    
    info += '🌍 Time Zone Information:\n';
    info += `Time Zone Offset: ${now.getTimezoneOffset()} minutes\n`;
    info += `Local Time Zone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}\n\n`;
    
    info += '📊 Timestamp Information:\n';
    info += `Unix Timestamp (seconds): ${Math.floor(now.getTime() / 1000)}\n`;
    info += `Milliseconds since epoch: ${now.getTime()}\n`;
    
    result.textContent = info;
}

// ========================================
// CALENDAR
// ========================================

function initializeCalendar() {
    const now = new Date();
    document.getElementById('calendar-month').value = now.getMonth();
    document.getElementById('calendar-year').value = now.getFullYear();
    updateCalendar();
}

function updateCalendar() {
    const month = parseInt(document.getElementById('calendar-month').value);
    const year = parseInt(document.getElementById('calendar-year').value);
    const calendar = document.getElementById('calendar');
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    
    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();
    const daysInPrevMonth = prevLastDay.getDate();
    
    let html = '';
    
    // Day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        html += `<div class="calendar-header">${day}</div>`;
    });
    
    // Previous month days
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        html += `<div class="calendar-day other-month">${daysInPrevMonth - i}</div>`;
    }
    
    // Current month days
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const isToday = year === today.getFullYear() && 
                       month === today.getMonth() && 
                       day === today.getDate();
        
        html += `<div class="calendar-day ${isToday ? 'today' : ''}" onclick="selectDate(${year}, ${month}, ${day})">${day}</div>`;
    }
    
    // Next month days
    const totalCells = firstDayOfWeek + daysInMonth;
    const nextMonthDays = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7);
    for (let day = 1; day <= nextMonthDays; day++) {
        html += `<div class="calendar-day other-month">${day}</div>`;
    }
    
    calendar.innerHTML = html;
}

function goToToday() {
    const today = new Date();
    document.getElementById('calendar-month').value = today.getMonth();
    document.getElementById('calendar-year').value = today.getFullYear();
    updateCalendar();
    showNotification('Jumped to today', 'info');
}

function selectDate(year, month, day) {
    selectedDate = new Date(year, month, day);
    
    // Update visual selection
    document.querySelectorAll('.calendar-day').forEach(el => {
        el.classList.remove('selected');
    });
    
    event.target.classList.add('selected');
    
    showSelectedDate();
}

function showSelectedDate() {
    const result = document.getElementById('selected-date-info');
    
    if (!selectedDate) {
        result.textContent = 'No date selected. Click on a date in the calendar.';
        return;
    }
    
    let info = '📅 Selected Date Information\n';
    info += '=' .repeat(40) + '\n\n';
    
    info += `Selected Date: ${selectedDate.toDateString()}\n`;
    info += `Full Date: ${selectedDate.toString()}\n`;
    info += `ISO Date: ${selectedDate.toISOString()}\n\n`;
    
    info += '🔢 Components:\n';
    info += `Year: ${selectedDate.getFullYear()}\n`;
    info += `Month: ${selectedDate.getMonth() + 1}\n`;
    info += `Day: ${selectedDate.getDate()}\n`;
    info += `Day of Week: ${selectedDate.getDay()}\n\n`;
    
    info += '📊 Calculations:\n';
    const today = new Date();
    const diffTime = selectedDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
        info += 'This date is TODAY!\n';
    } else if (diffDays > 0) {
        info += `${diffDays} days from now\n`;
    } else {
        info += `${Math.abs(diffDays)} days ago\n`;
    }
    
    info += `Week number: ${getWeekNumber(selectedDate)}\n`;
    info += `Day of year: ${getDayOfYear(selectedDate)}\n`;
    
    result.textContent = info;
}

function getWeekNumber(date) {
    const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - firstDayOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
}

function getDayOfYear(date) {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date - start;
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
}

// ========================================
// DATE OPERATIONS
// ========================================

function switchDateTab(tabName) {
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

function createDateFromInput() {
    const dateInput = document.getElementById('create-date').value;
    const timeInput = document.getElementById('create-time').value;
    const result = document.getElementById('date-creation-result');
    
    if (!dateInput) {
        showNotification('Please select a date', 'error');
        return;
    }
    
    let dateString = dateInput;
    if (timeInput) {
        dateString += 'T' + timeInput;
    }
    
    const createdDate = new Date(dateString);
    
    let output = '✅ Date Created Successfully!\n\n';
    output += `Input Date: ${dateInput}\n`;
    output += `Input Time: ${timeInput || 'Not specified'}\n`;
    output += `Combined: ${dateString}\n\n`;
    output += `Created Date: ${createdDate.toString()}\n`;
    output += `ISO String: ${createdDate.toISOString()}\n`;
    output += `Timestamp: ${createdDate.getTime()}\n`;
    
    result.textContent = output;
    showNotification('Date created successfully', 'success');
}

function createCurrentDate() {
    const now = new Date();
    const result = document.getElementById('date-creation-result');
    
    let output = '✅ Current Date Created!\n\n';
    output += `new Date(): ${now.toString()}\n`;
    output += `Date.now(): ${Date.now()}\n`;
    output += `new Date(Date.now()): ${new Date(Date.now()).toString()}\n\n`;
    
    output += 'Different creation methods:\n';
    output += `new Date(): ${new Date()}\n`;
    output += `new Date().toISOString(): ${new Date().toISOString()}\n`;
    output += `new Date().toDateString(): ${new Date().toDateString()}\n`;
    output += `new Date().toTimeString(): ${new Date().toTimeString()}\n`;
    
    result.textContent = output;
    showNotification('Current date created', 'success');
}

function createFromString() {
    const result = document.getElementById('date-creation-result');
    
    const examples = [
        '2024-01-15',
        '2024/01/15',
        'January 15, 2024',
        '15 January 2024',
        '01/15/2024',
        '15/01/2024',
        '2024-01-15T10:30:00',
        '2024-01-15T10:30:00Z'
    ];
    
    let output = '📝 Creating Dates from Strings\n';
    output += '=' .repeat(40) + '\n\n';
    
    examples.forEach(example => {
        const date = new Date(example);
        output += `Input: "${example}"\n`;
        output += `Result: ${date.toString()}\n`;
        output += `Valid: ${!isNaN(date.getTime()) ? '✅' : '❌'}\n\n`;
    });
    
    result.textContent = output;
    showNotification('String parsing examples shown', 'info');
}

function formatDate() {
    const dateInput = document.getElementById('format-date').value;
    const pattern = document.getElementById('format-pattern').value;
    const result = document.getElementById('date-formatting-result');
    
    if (!dateInput) {
        showNotification('Please select a date', 'error');
        return;
    }
    
    const date = new Date(dateInput);
    
    let output = '';
    
    switch (pattern) {
        case 'iso':
            output = `ISO String: ${date.toISOString()}\n`;
            output += `Date String: ${date.toDateString()}\n`;
            output += `Time String: ${date.toTimeString()}\n`;
            break;
            
        case 'locale':
            output = `Locale String: ${date.toLocaleString()}\n`;
            output += `US Locale: ${date.toLocaleString('en-US')}\n`;
            output += `UK Locale: ${date.toLocaleString('en-GB')}\n`;
            output += `German Locale: ${date.toLocaleString('de-DE')}\n`;
            break;
            
        case 'custom':
            output = 'Custom Formats:\n';
            output += `MM/DD/YYYY: ${formatCustom(date, 'MM/DD/YYYY')}\n`;
            output += `DD-MM-YYYY: ${formatCustom(date, 'DD-MM-YYYY')}\n`;
            output += `Month DD, YYYY: ${formatCustom(date, 'Month DD, YYYY')}\n`;
            output += `DD Month YYYY: ${formatCustom(date, 'DD Month YYYY')}\n`;
            output += `HH:mm:ss: ${formatCustom(date, 'HH:mm:ss')}\n`;
            break;
            
        case 'components':
            output = 'Date Components:\n';
            output += `Year: ${date.getFullYear()}\n`;
            output += `Month: ${date.getMonth() + 1} (${getMonthName(date.getMonth())})\n`;
            output += `Day: ${date.getDate()}\n`;
            output += `Day of Week: ${date.getDay()} (${getDayName(date.getDay())})\n`;
            output += `Hours: ${date.getHours()}\n`;
            output += `Minutes: ${date.getMinutes()}\n`;
            output += `Seconds: ${date.getSeconds()}\n`;
            break;
    }
    
    result.textContent = output;
    showNotification('Date formatted', 'success');
}

function formatCustom(date, format) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const monthName = getMonthName(date.getMonth());
    
    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('Month', monthName)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
}

function getMonthName(month) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                   'July', 'August', 'September', 'October', 'November', 'December'];
    return months[month];
}

function getDayName(day) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day];
}

// ========================================
// DATE CALCULATIONS
// ========================================

function addDays() {
    const daysToAdd = parseInt(document.getElementById('add-days').value);
    const today = new Date();
    const resultDate = new Date(today);
    resultDate.setDate(today.getDate() + daysToAdd);
    
    document.getElementById('add-days-result').textContent = 
        `${today.toDateString()} + ${daysToAdd} days = ${resultDate.toDateString()}`;
}

function addMonths() {
    const monthsToAdd = parseInt(document.getElementById('add-months').value);
    const today = new Date();
    const resultDate = new Date(today);
    resultDate.setMonth(today.getMonth() + monthsToAdd);
    
    document.getElementById('add-months-result').textContent = 
        `${today.toDateString()} + ${monthsToAdd} months = ${resultDate.toDateString()}`;
}

function calculateDaysBetween() {
    const startDate = new Date(document.getElementById('start-date').value);
    const endDate = new Date(document.getElementById('end-date').value);
    
    if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
        document.getElementById('days-between-result').textContent = 'Invalid dates';
        return;
    }
    
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const remainingDays = diffDays % 7;
    
    document.getElementById('days-between-result').textContent = 
        `${diffDays} days (${diffWeeks} weeks, ${remainingDays} days)`;
}

function calculateAge() {
    const birthDate = new Date(document.getElementById('birth-date').value);
    
    if (isNaN(birthDate.getTime())) {
        document.getElementById('age-result').textContent = 'Invalid birth date';
        return;
    }
    
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    const nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBirthday < today) {
        nextBirthday.setFullYear(today.getFullYear() + 1);
    }
    
    const daysUntilBirthday = Math.ceil((nextBirthday - today) / (1000 * 60 * 60 * 24));
    
    document.getElementById('age-result').textContent = 
        `${age} years old (Next birthday in ${daysUntilBirthday} days)`;
}

// ========================================
// DATE COMPARISON
// ========================================

function compareDates() {
    const date1 = new Date(document.getElementById('compare-date1').value);
    const date2 = new Date(document.getElementById('compare-date2').value);
    const result = document.getElementById('date-comparison-result');
    
    if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
        result.textContent = 'Please select valid dates';
        return;
    }
    
    let output = '📊 Date Comparison Results\n';
    output += '=' .repeat(40) + '\n\n';
    
    output += `Date 1: ${date1.toString()}\n`;
    output += `Date 2: ${date2.toString()}\n\n`;
    
    output += '🔢 Numeric Comparison:\n';
    output += `Date 1.getTime(): ${date1.getTime()}\n`;
    output += `Date 2.getTime(): ${date2.getTime()}\n\n`;
    
    output += '📋 Comparison Results:\n';
    
    if (date1.getTime() === date2.getTime()) {
        output += 'Dates are EQUAL ✅\n';
    } else if (date1.getTime() < date2.getTime()) {
        output += 'Date 1 is BEFORE Date 2 ⬅️\n';
        const diffMs = date2.getTime() - date1.getTime();
        const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
        output += `Difference: ${diffDays} days\n`;
    } else {
        output += 'Date 1 is AFTER Date 2 ➡️\n';
        const diffMs = date1.getTime() - date2.getTime();
        const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
        output += `Difference: ${diffDays} days\n`;
    }
    
    output += '\n🔍 Direct Comparisons:\n';
    output += `date1 === date2: ${date1 === date2}\n`;
    output += `date1.getTime() === date2.getTime(): ${date1.getTime() === date2.getTime()}\n`;
    output += `date1 < date2: ${date1 < date2}\n`;
    output += `date1 > date2: ${date1 > date2}\n`;
    output += `date1 <= date2: ${date1 <= date2}\n`;
    output += `date1 >= date2: ${date1 >= date2}\n`;
    
    result.textContent = output;
}

// ========================================
// TIME ZONES
// ========================================

function showTimeZones() {
    const display = document.getElementById('timezone-display');
    const result = document.getElementById('timezone-result');
    
    const timeZones = [
        { name: 'UTC', offset: 0 },
        { name: 'EST', offset: -5 },
        { name: 'CST', offset: -6 },
        { name: 'MST', offset: -7 },
        { name: 'PST', offset: -8 },
        { name: 'GMT', offset: 0 },
        { name: 'CET', offset: 1 },
        { name: 'JST', offset: 9 },
        { name: 'AEST', offset: 10 }
    ];
    
    let html = '';
    const now = new Date();
    
    timeZones.forEach(tz => {
        const time = new Date(now.getTime() + (tz.offset - now.getTimezoneOffset() / 60) * 60 * 60 * 1000);
        html += `
            <div class="timezone-card">
                <div class="timezone-name">${tz.name} (UTC${tz.offset >= 0 ? '+' : ''}${tz.offset})</div>
                <div class="timezone-time">${time.toLocaleTimeString()}</div>
            </div>
        `;
    });
    
    display.innerHTML = html;
    
    result.textContent = `Showing ${timeZones.length} time zones. Current local time: ${now.toLocaleTimeString()}`;
    showNotification('Time zones displayed', 'success');
}

function showMajorCities() {
    const display = document.getElementById('timezone-display');
    const result = document.getElementById('timezone-result');
    
    const cities = [
        { name: 'New York', timezone: 'America/New_York' },
        { name: 'London', timezone: 'Europe/London' },
        { name: 'Paris', timezone: 'Europe/Paris' },
        { name: 'Tokyo', timezone: 'Asia/Tokyo' },
        { name: 'Sydney', timezone: 'Australia/Sydney' },
        { name: 'Dubai', timezone: 'Asia/Dubai' }
    ];
    
    let html = '';
    const now = new Date();
    
    cities.forEach(city => {
        const time = now.toLocaleTimeString('en-US', { timeZone: city.timezone });
        html += `
            <div class="timezone-card">
                <div class="timezone-name">${city.name}</div>
                <div class="timezone-time">${time}</div>
            </div>
        `;
    });
    
    display.innerHTML = html;
    
    result.textContent = `Showing times for ${cities.length} major cities.`;
    showNotification('City times displayed', 'success');
}

function convertTimeZone() {
    const result = document.getElementById('timezone-result');
    
    const now = new Date();
    const localTime = now.toLocaleTimeString();
    const utcTime = now.toLocaleTimeString('en-US', { timeZone: 'UTC' });
    const tokyoTime = now.toLocaleTimeString('en-US', { timeZone: 'Asia/Tokyo' });
    const londonTime = now.toLocaleTimeString('en-US', { timeZone: 'Europe/London' });
    
    let output = '🌍 Time Zone Conversion\n';
    output += '=' .repeat(40) + '\n\n';
    output += `Local Time: ${localTime}\n`;
    output += `UTC Time: ${utcTime}\n`;
    output += `Tokyo Time: ${tokyoTime}\n`;
    output += `London Time: ${londonTime}\n\n`;
    
    output += '📊 Time Zone Information:\n';
    output += `Local Time Zone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}\n`;
    output += `Time Zone Offset: ${now.getTimezoneOffset()} minutes\n`;
    output += `UTC Offset: ${-now.getTimezoneOffset() / 60} hours\n`;
    
    result.textContent = output;
    showNotification('Time zone conversion completed', 'success');
}

// ========================================
// COUNTDOWN TIMER
// ========================================

function startCountdown() {
    const targetDate = new Date(document.getElementById('target-datetime').value);
    const title = document.getElementById('countdown-title').value || 'Event';
    
    if (isNaN(targetDate.getTime())) {
        showNotification('Please select a valid target date', 'error');
        return;
    }
    
    if (targetDate <= new Date()) {
        showNotification('Target date must be in the future', 'error');
        return;
    }
    
    if (countdownInterval) {
        clearInterval(countdownInterval);
    }
    
    document.getElementById('countdown-title-display').textContent = `Countdown to ${title}`;
    document.getElementById('countdown-display').style.display = 'block';
    
    updateCountdown(targetDate);
    countdownInterval = setInterval(() => updateCountdown(targetDate), 1000);
    
    showNotification('Countdown started', 'success');
}

function updateCountdown(targetDate) {
    const now = new Date();
    const difference = targetDate - now;
    
    if (difference <= 0) {
        clearInterval(countdownInterval);
        document.getElementById('countdown-time').textContent = '00:00:00:00';
        showNotification('Countdown completed!', 'success');
        return;
    }
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    const timeString = `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    document.getElementById('countdown-time').textContent = timeString;
}

function stopCountdown() {
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
        document.getElementById('countdown-display').style.display = 'none';
        showNotification('Countdown stopped', 'info');
    }
}

// ========================================
// EVENT SCHEDULER
// ========================================

function addEvent() {
    const title = document.getElementById('event-title').value;
    const datetime = document.getElementById('event-datetime').value;
    const type = document.getElementById('event-type').value;
    
    if (!title || !datetime) {
        showNotification('Please fill in all fields', 'error');
        return;
    }
    
    const event = {
        id: Date.now(),
        title,
        datetime: new Date(datetime),
        type,
        created: new Date()
    };
    
    events.push(event);
    saveEventsToStorage();
    displayEvents();
    
    // Clear form
    document.getElementById('event-title').value = '';
    document.getElementById('event-datetime').value = '';
    
    showNotification('Event added successfully', 'success');
}

function displayEvents() {
    const eventsList = document.getElementById('events-list');
    
    if (events.length === 0) {
        eventsList.innerHTML = '<p style="text-align: center; color: #666;">No events scheduled</p>';
        return;
    }
    
    // Sort events by date
    const sortedEvents = [...events].sort((a, b) => a.datetime - b.datetime);
    
    let html = '<h4>Scheduled Events:</h4>';
    
    sortedEvents.forEach(event => {
        const eventDate = event.datetime.toLocaleDateString();
        const eventTime = event.datetime.toLocaleTimeString();
        
        html += `
            <div class="event-item">
                <div>
                    <div class="event-title">${event.title}</div>
                    <div class="event-date">${eventDate} at ${eventTime} (${event.type})</div>
                </div>
                <button class="btn btn-danger" onclick="deleteEvent(${event.id})" style="padding: 5px 10px; font-size: 12px;">Delete</button>
            </div>
        `;
    });
    
    eventsList.innerHTML = html;
}

function deleteEvent(eventId) {
    events = events.filter(event => event.id !== eventId);
    saveEventsToStorage();
    displayEvents();
    showNotification('Event deleted', 'info');
}

function checkUpcomingEvents() {
    const now = new Date();
    const upcoming = events.filter(event => {
        const diffHours = (event.datetime - now) / (1000 * 60 * 60);
        return diffHours > 0 && diffHours <= 24; // Next 24 hours
    });
    
    const result = document.getElementById('scheduler-result');
    
    if (upcoming.length === 0) {
        result.textContent = 'No upcoming events in the next 24 hours.';
    } else {
        let output = `📅 Found ${upcoming.length} upcoming event(s) in the next 24 hours:\n\n`;
        
        upcoming.forEach(event => {
            const diffHours = Math.ceil((event.datetime - now) / (1000 * 60 * 60));
            output += `• ${event.title} - in ${diffHours} hours\n`;
        });
        
        result.textContent = output;
    }
    
    showNotification(`Found ${upcoming.length} upcoming events`, 'info');
}

function saveEventsToStorage() {
    localStorage.setItem('datetime-events', JSON.stringify(events));
}

function loadEventsFromStorage() {
    const stored = localStorage.getItem('datetime-events');
    if (stored) {
        events = JSON.parse(stored).map(event => ({
            ...event,
            datetime: new Date(event.datetime),
            created: new Date(event.created)
        }));
        displayEvents();
    }
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
    // Auto-update calendar when month/year changes
    document.getElementById('calendar-month').addEventListener('change', updateCalendar);
    document.getElementById('calendar-year').addEventListener('change', updateCalendar);
    
    // Set default values for date inputs
    const now = new Date();
    const localDateTime = new Date(now.getTime() - now.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    
    document.getElementById('format-date').value = localDateTime;
    document.getElementById('compare-date1').value = localDateTime;
    document.getElementById('compare-date2').value = localDateTime;
    document.getElementById('target-datetime').value = localDateTime;
    document.getElementById('event-datetime').value = localDateTime;
    
    // Set default date for calculation inputs
    const today = now.toISOString().split('T')[0];
    document.getElementById('start-date').value = today;
    document.getElementById('end-date').value = today;
    document.getElementById('birth-date').value = today;
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + T: Go to today
        if ((e.ctrlKey || e.metaKey) && e.key === 't') {
            e.preventDefault();
            goToToday();
        }
        
        // Ctrl/Cmd + C: Toggle clock
        if ((e.ctrlKey || e.metaKey) && e.key === 'c') {
            e.preventDefault();
            toggleClock();
        }
        
        // Ctrl/Cmd + F: Change clock format
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            e.preventDefault();
            changeClockFormat();
        }
    });
}

console.log("Date & Time Playground - All systems ready! 📅");
