// ========================================
// ADVANCED JAVASCRIPT PATTERNS PLAYGROUND
// ========================================

console.log("Advanced JavaScript Patterns Playground Loaded!");

// Global state
let currentCoffee = null;
let currentOrder = null;
let commandHistory = [];
let observers = [];
let throttledFunction = null;
let debouncedFunction = null;

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("Patterns Playground initialized!");
    initializePlayground();
});

function initializePlayground() {
    setupEventListeners();
    showPatternsOverview();
}

// ========================================
// CREATIONAL PATTERNS
// ========================================

function switchCreationalTab(tabName) {
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

// Singleton Pattern
class Singleton {
    constructor() {
        if (Singleton.instance) {
            return Singleton.instance;
        }
        this.data = [];
        this.createdAt = new Date();
        Singleton.instance = this;
    }
    
    addData(item) {
        this.data.push(item);
    }
    
    getData() {
        return this.data;
    }
    
    getInfo() {
        return {
            dataCount: this.data.length,
            createdAt: this.createdAt,
            instanceId: this.constructor.name
        };
    }
}

function demoSingleton() {
    const result = document.getElementById('singleton-result');
    
    // Create multiple instances
    const instance1 = new Singleton();
    const instance2 = new Singleton();
    const instance3 = new Singleton();
    
    // Add data through different instances
    instance1.addData('Item from instance 1');
    instance2.addData('Item from instance 2');
    instance3.addData('Item from instance 3');
    
    // Show that all instances are the same
    let output = '🏭 Singleton Pattern Demo\n\n';
    output += 'Creating three instances:\n';
    output += `Instance 1: ${instance1.constructor.name}\n`;
    output += `Instance 2: ${instance2.constructor.name}\n`;
    output += `Instance 3: ${instance3.constructor.name}\n\n`;
    
    output += 'Are they the same instance?\n';
    output += `instance1 === instance2: ${instance1 === instance2}\n`;
    output += `instance2 === instance3: ${instance2 === instance3}\n`;
    output += `instance1 === instance3: ${instance1 === instance3}\n\n`;
    
    output += 'Shared data from any instance:\n';
    output += `Data: ${JSON.stringify(instance1.getData())}\n\n`;
    
    output += 'Instance info:\n';
    output += JSON.stringify(instance1.getInfo(), null, 2);
    
    result.textContent = output;
    showNotification('Singleton pattern demonstrated', 'success');
}

function testSingletonUniqueness() {
    const result = document.getElementById('singleton-result');
    
    // Reset singleton for testing
    Singleton.instance = null;
    
    const instance1 = new Singleton();
    const instance2 = new Singleton();
    
    let output = '🧪 Singleton Uniqueness Test\n\n';
    output += `Same instance: ${instance1 === instance1}\n`;
    output += `Different variables, same object: ${instance1 === instance2}\n`;
    output += `Same memory reference: ${instance1.getData() === instance2.getData()}\n`;
    
    result.textContent = output;
    showNotification('Uniqueness test completed', 'info');
}

function showSingletonCode() {
    const result = document.getElementById('singleton-result');
    
    const code = `📝 Singleton Pattern Implementation

class Singleton {
    constructor() {
        if (Singleton.instance) {
            return Singleton.instance;
        }
        this.data = [];
        this.createdAt = new Date();
        Singleton.instance = this;
    }
    
    addData(item) {
        this.data.push(item);
    }
    
    getData() {
        return this.data;
    }
}

// Usage
const instance1 = new Singleton();
const instance2 = new Singleton();
// instance1 === instance2 // true

💡 When to use:
• Database connections
• Logger instances
• Configuration managers
• Cache managers`;
    
    result.textContent = code;
    showNotification('Singleton code shown', 'info');
}

// Factory Pattern
class Car {
    constructor() {
        this.type = 'Car';
        this.wheels = 4;
        this.doors = 4;
    }
    
    drive() {
        return 'Driving a car';
    }
}

class Bike {
    constructor() {
        this.type = 'Bike';
        this.wheels = 2;
        this.doors = 0;
    }
    
    drive() {
        return 'Riding a bike';
    }
}

class Truck {
    constructor() {
        this.type = 'Truck';
        this.wheels = 6;
        this.doors = 2;
    }
    
    drive() {
        return 'Driving a truck';
    }
}

class VehicleFactory {
    static createVehicle(type) {
        switch (type.toLowerCase()) {
            case 'car':
                return new Car();
            case 'bike':
                return new Bike();
            case 'truck':
                return new Truck();
            default:
                throw new Error('Unknown vehicle type');
        }
    }
}

function demoFactory() {
    const result = document.getElementById('factory-result');
    const productType = document.getElementById('product-type').value;
    
    try {
        const vehicle = VehicleFactory.createVehicle(productType);
        
        let output = `🏭 Factory Pattern Demo\n\n`;
        output += `Created: ${vehicle.type}\n`;
        output += `Wheels: ${vehicle.wheels}\n`;
        output += `Doors: ${vehicle.doors}\n`;
        output += `Action: ${vehicle.drive()}\n\n`;
        
        output += `Factory created object:\n`;
        output += `Type: ${vehicle.constructor.name}\n`;
        output += `Instance: ${vehicle instanceof Object}\n`;
        
        result.textContent = output;
        showNotification(`${vehicle.type} created successfully`, 'success');
        
    } catch (error) {
        result.textContent = `Error: ${error.message}`;
        showNotification('Failed to create vehicle', 'error');
    }
}

function showFactoryCode() {
    const result = document.getElementById('factory-result');
    
    const code = `📝 Factory Pattern Implementation

class VehicleFactory {
    static createVehicle(type) {
        switch (type.toLowerCase()) {
            case 'car':
                return new Car();
            case 'bike':
                return new Bike();
            case 'truck':
                return new Truck();
            default:
                throw new Error('Unknown vehicle type');
        }
    }
}

// Usage
const car = VehicleFactory.createVehicle('car');
const bike = VehicleFactory.createVehicle('bike');

💡 When to use:
• Object creation with complex logic
• Multiple similar products
• Runtime type determination
• Decoupling client from concrete classes`;
    
    result.textContent = code;
    showNotification('Factory code shown', 'info');
}

// Builder Pattern
class Computer {
    constructor() {
        this.name = '';
        this.cpu = '';
        this.ram = '';
        this.storage = '';
        this.gpu = '';
    }
    
    setSpecs(specs) {
        Object.assign(this, specs);
        return this;
    }
    
    display() {
        return `Computer: ${this.name}\nCPU: ${this.cpu}\nRAM: ${this.ram}\nStorage: ${this.storage}\nGPU: ${this.gpu || 'Integrated'}`;
    }
}

class ComputerBuilder {
    constructor() {
        this.computer = new Computer();
    }
    
    setName(name) {
        this.computer.name = name;
        return this;
    }
    
    setCPU(cpu) {
        this.computer.cpu = cpu;
        return this;
    }
    
    setRAM(ram) {
        this.computer.ram = ram;
        return this;
    }
    
    setStorage(storage) {
        this.computer.storage = storage;
        return this;
    }
    
    setGPU(gpu) {
        this.computer.gpu = gpu;
        return this;
    }
    
    build() {
        return this.computer;
    }
}

function demoBuilder() {
    const result = document.getElementById('builder-result');
    const name = document.getElementById('builder-name').value;
    const cpu = document.getElementById('builder-cpu').value;
    const ram = document.getElementById('builder-ram').value;
    
    const computer = new ComputerBuilder()
        .setName(name)
        .setCPU(cpu)
        .setRAM(ram)
        .setStorage('1TB SSD')
        .setGPU('RTX 3080')
        .build();
    
    let output = `🏗️ Builder Pattern Demo\n\n`;
    output += `Built computer:\n`;
    output += computer.display();
    
    result.textContent = output;
    showNotification('Computer built successfully', 'success');
}

function showBuilderCode() {
    const result = document.getElementById('builder-result');
    
    const code = `📝 Builder Pattern Implementation

class ComputerBuilder {
    constructor() {
        this.computer = new Computer();
    }
    
    setName(name) {
        this.computer.name = name;
        return this;
    }
    
    setCPU(cpu) {
        this.computer.cpu = cpu;
        return this;
    }
    
    build() {
        return this.computer;
    }
}

// Usage
const computer = new ComputerBuilder()
    .setName('Gaming PC')
    .setCPU('Intel i9')
    .setRAM('32GB')
    .build();

💡 When to use:
• Complex object construction
• Multiple construction steps
• Different representations
• Fluent interface needed`;
    
    result.textContent = code;
    showNotification('Builder code shown', 'info');
}

// Prototype Pattern
class Prototype {
    constructor(name, skills) {
        this.name = name;
        this.skills = skills;
        this.createdAt = new Date();
    }
    
    clone() {
        const clone = Object.create(Object.getPrototypeOf(this));
        clone.name = this.name;
        clone.skills = [...this.skills];
        clone.createdAt = new Date();
        return clone;
    }
    
    addSkill(skill) {
        this.skills.push(skill);
    }
    
    display() {
        return `${this.name} - Skills: ${this.skills.join(', ')} - Created: ${this.createdAt.toLocaleTimeString()}`;
    }
}

function demoPrototype() {
    const result = document.getElementById('prototype-result');
    
    const original = new Prototype('Developer', ['JavaScript', 'React']);
    const clone1 = original.clone();
    const clone2 = original.clone();
    
    // Modify clones independently
    clone1.name = 'Senior Developer';
    clone1.addSkill('Node.js');
    
    clone2.name = 'Junior Developer';
    clone2.addSkill('CSS');
    
    let output = `🔄 Prototype Pattern Demo\n\n`;
    output += `Original: ${original.display()}\n`;
    output += `Clone 1: ${clone1.display()}\n`;
    output += `Clone 2: ${clone2.display()}\n\n`;
    
    output += `Original skills unchanged: ${original.skills.join(', ')}\n`;
    output += `Clone 1 skills: ${clone1.skills.join(', ')}\n`;
    output += `Clone 2 skills: ${clone2.skills.join(', ')}\n\n`;
    
    output += `Are they different objects?\n`;
    output += `original !== clone1: ${original !== clone1}\n`;
    output += `clone1 !== clone2: ${clone1 !== clone2}\n`;
    
    result.textContent = output;
    showNotification('Prototype pattern demonstrated', 'success');
}

function clonePrototype() {
    const result = document.getElementById('prototype-result');
    
    const prototype = new Prototype('Template', ['Base Skill']);
    const clones = [];
    
    for (let i = 0; i < 3; i++) {
        const clone = prototype.clone();
        clone.name = `Clone ${i + 1}`;
        clone.addSkill(`Skill ${i + 1}`);
        clones.push(clone);
    }
    
    let output = `🔄 Multiple Clones Created\n\n`;
    clones.forEach((clone, index) => {
        output += `${clone.display()}\n`;
    });
    
    result.textContent = output;
    showNotification('Multiple clones created', 'success');
}

function showPrototypeCode() {
    const result = document.getElementById('prototype-result');
    
    const code = `📝 Prototype Pattern Implementation

class Prototype {
    clone() {
        const clone = Object.create(Object.getPrototypeOf(this));
        clone.name = this.name;
        clone.skills = [...this.skills];
        clone.createdAt = new Date();
        return clone;
    }
}

// Usage
const original = new Prototype('Original', ['skill1']);
const clone = original.clone();

💡 When to use:
• Expensive object creation
• Similar objects with variations
• Configuration templates
• Performance optimization`;
    
    result.textContent = code;
    showNotification('Prototype code shown', 'info');
}

// ========================================
// STRUCTURAL PATTERNS
// ========================================

function switchStructuralTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const activeTab = Array.from(tabs).find(tab => 
        tab.textContent.toLowerCase().includes(tabName)
    );
    if (activeTab) activeTab.classList.add('active');
    
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));
    
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Adapter Pattern
class LegacySystem {
    oldRequest(data) {
        return `Legacy processed: ${JSON.stringify(data)}`;
    }
}

class ModernSystem {
    newRequest(data) {
        return `Modern processed: ${JSON.stringify(data)}`;
    }
}

class Adapter {
    constructor(legacySystem) {
        this.legacySystem = legacySystem;
    }
    
    request(data) {
        // Transform data for legacy system
        const legacyData = {
            payload: data,
            timestamp: Date.now(),
            version: '1.0'
        };
        
        return this.legacySystem.oldRequest(legacyData);
    }
}

function demoAdapter() {
    const result = document.getElementById('adapter-result');
    
    const legacy = new LegacySystem();
    const adapter = new Adapter(legacy);
    const modern = new ModernSystem();
    
    const testData = { user: 'John', action: 'login' };
    
    let output = `🔌 Adapter Pattern Demo\n\n`;
    output += `Test Data: ${JSON.stringify(testData)}\n\n`;
    
    output += `Modern System: ${modern.newRequest(testData)}\n`;
    output += `Legacy System (via Adapter): ${adapter.request(testData)}\n\n`;
    
    output += `Adapter enables modern interface to work with legacy system\n`;
    output += `No changes needed to legacy code`;
    
    result.textContent = output;
    showNotification('Adapter pattern demonstrated', 'success');
}

function testLegacySystem() {
    const result = document.getElementById('adapter-result');
    
    const legacy = new LegacySystem();
    const adapter = new Adapter(legacy);
    
    const requests = [
        { type: 'GET', resource: '/users' },
        { type: 'POST', resource: '/orders', data: { item: 'book' } },
        { type: 'PUT', resource: '/profile', data: { name: 'John' } }
    ];
    
    let output = `🔌 Legacy System Integration\n\n`;
    requests.forEach((req, index) => {
        output += `Request ${index + 1}: ${adapter.request(req)}\n`;
    });
    
    result.textContent = output;
    showNotification('Legacy system test completed', 'info');
}

function showAdapterCode() {
    const result = document.getElementById('adapter-result');
    
    const code = `📝 Adapter Pattern Implementation

class Adapter {
    constructor(legacySystem) {
        this.legacySystem = legacySystem;
    }
    
    request(data) {
        const legacyData = {
            payload: data,
            timestamp: Date.now(),
            version: '1.0'
        };
        return this.legacySystem.oldRequest(legacyData);
    }
}

// Usage
const adapter = new Adapter(legacySystem);
const result = adapter.request(modernData);

💡 When to use:
• Legacy system integration
• Third-party library adaptation
• Interface compatibility
• System migration`;
    
    result.textContent = code;
    showNotification('Adapter code shown', 'info');
}

// Decorator Pattern
class Coffee {
    cost() {
        return 5;
    }
    
    description() {
        return 'Simple Coffee';
    }
}

class MilkDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }
    
    cost() {
        return this.coffee.cost() + 1;
    }
    
    description() {
        return this.coffee.description() + ', Milk';
    }
}

class SugarDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }
    
    cost() {
        return this.coffee.cost() + 0.5;
    }
    
    description() {
        return this.coffee.description() + ', Sugar';
    }
}

class WhipDecorator {
    constructor(coffee) {
        this.coffee = coffee;
    }
    
    cost() {
        return this.coffee.cost() + 2;
    }
    
    description() {
        return this.coffee.description() + ', Whip';
    }
}

function addMilk() {
    const result = document.getElementById('decorator-result');
    const coffeeType = document.getElementById('coffee-type').value;
    
    if (!currentCoffee) {
        currentCoffee = coffeeType === 'simple' ? new Coffee() : new Coffee();
    }
    
    currentCoffee = new MilkDecorator(currentCoffee);
    
    result.textContent = `☕ Current Coffee:\n${currentCoffee.description()}\nCost: $${currentCoffee.cost()}`;
    showNotification('Milk added', 'success');
}

function addSugar() {
    const result = document.getElementById('decorator-result');
    
    if (!currentCoffee) {
        currentCoffee = new Coffee();
    }
    
    currentCoffee = new SugarDecorator(currentCoffee);
    
    result.textContent = `☕ Current Coffee:\n${currentCoffee.description()}\nCost: $${currentCoffee.cost()}`;
    showNotification('Sugar added', 'success');
}

function addWhip() {
    const result = document.getElementById('decorator-result');
    
    if (!currentCoffee) {
        currentCoffee = new Coffee();
    }
    
    currentCoffee = new WhipDecorator(currentCoffee);
    
    result.textContent = `☕ Current Coffee:\n${currentCoffee.description()}\nCost: $${currentCoffee.cost()}`;
    showNotification('Whip added', 'success');
}

function showCoffeeCost() {
    const result = document.getElementById('decorator-result');
    
    if (!currentCoffee) {
        currentCoffee = new Coffee();
    }
    
    let output = `☕ Coffee Order:\n`;
    output += `Description: ${currentCoffee.description()}\n`;
    output += `Total Cost: $${currentCoffee.cost()}\n\n`;
    output += `Decorators add functionality without modifying the base object`;
    
    result.textContent = output;
    showNotification('Coffee cost calculated', 'info');
}

// Facade Pattern
class SubsystemA {
    operationA() {
        return 'Subsystem A operation';
    }
}

class SubsystemB {
    operationB() {
        return 'Subsystem B operation';
    }
}

class SubsystemC {
    operationC() {
        return 'Subsystem C operation';
    }
}

class Facade {
    constructor() {
        this.subsystemA = new SubsystemA();
        this.subsystemB = new SubsystemB();
        this.subsystemC = new SubsystemC();
    }
    
    complexOperation() {
        const resultA = this.subsystemA.operationA();
        const resultB = this.subsystemB.operationB();
        const resultC = this.subsystemC.operationC();
        
        return `${resultA} → ${resultB} → ${resultC}`;
    }
    
    simpleOperation() {
        return this.subsystemA.operationA();
    }
}

function demoFacade() {
    const result = document.getElementById('facade-result');
    
    const facade = new Facade();
    
    let output = `🏛️ Facade Pattern Demo\n\n`;
    output += `Simple Operation: ${facade.simpleOperation()}\n`;
    output += `Complex Operation: ${facade.complexOperation()}\n\n`;
    
    output += `Facade simplifies interaction with multiple subsystems\n`;
    output += `Client only needs to know about the facade interface`;
    
    result.textContent = output;
    showNotification('Facade pattern demonstrated', 'success');
}

function complexOperation() {
    const result = document.getElementById('facade-result');
    
    const facade = new Facade();
    
    let output = `🏛️ Complex Operation Breakdown\n\n`;
    output += `Step 1: ${facade.subsystemA.operationA()}\n`;
    output += `Step 2: ${facade.subsystemB.operationB()}\n`;
    output += `Step 3: ${facade.subsystemC.operationC()}\n\n`;
    output += `Facade Result: ${facade.complexOperation()}`;
    
    result.textContent = output;
    showNotification('Complex operation completed', 'info');
}

function showFacadeCode() {
    const result = document.getElementById('facade-result');
    
    const code = `📝 Facade Pattern Implementation

class Facade {
    constructor() {
        this.subsystemA = new SubsystemA();
        this.subsystemB = new SubsystemB();
        this.subsystemC = new SubsystemC();
    }
    
    complexOperation() {
        return this.subsystemA.operationA() + 
               this.subsystemB.operationB() + 
               this.subsystemC.operationC();
    }
}

// Usage
const facade = new Facade();
const result = facade.complexOperation();

💡 When to use:
• Complex subsystems
• Simplified client interface
• Layered architecture
• API design`;
    
    result.textContent = code;
    showNotification('Facade code shown', 'info');
}

// Proxy Pattern
class RealResource {
    access() {
        return 'Real resource data';
    }
}

class Proxy {
    constructor(realResource) {
        this.realResource = realResource;
        this.accessCount = 0;
        this.cache = null;
    }
    
    access() {
        this.accessCount++;
        
        if (this.cache === null) {
            console.log('Loading resource from real object...');
            this.cache = this.realResource.access();
        } else {
            console.log('Returning cached resource...');
        }
        
        return this.cache;
    }
    
    getStats() {
        return {
            accessCount: this.accessCount,
            isCached: this.cache !== null
        };
    }
}

function demoProxy() {
    const result = document.getElementById('proxy-result');
    
    const realResource = new RealResource();
    const proxy = new Proxy(realResource);
    
    let output = `🛡️ Proxy Pattern Demo\n\n`;
    
    // First access - loads from real resource
    output += `First access: ${proxy.access()}\n`;
    
    // Second access - returns cached
    output += `Second access: ${proxy.access()}\n`;
    
    const stats = proxy.getStats();
    output += `\nProxy Stats:\n`;
    output += `Access Count: ${stats.accessCount}\n`;
    output += `Is Cached: ${stats.isCached}\n\n`;
    
    output += `Proxy controls access to the real resource\n`;
    output += `Implements caching for performance`;
    
    result.textContent = output;
    showNotification('Proxy pattern demonstrated', 'success');
}

function accessResource() {
    const result = document.getElementById('proxy-result');
    
    const realResource = new RealResource();
    const proxy = new Proxy(realResource);
    
    let output = `🛡️ Resource Access via Proxy\n\n`;
    
    for (let i = 0; i < 3; i++) {
        output += `Access ${i + 1}: ${proxy.access()}\n`;
    }
    
    const stats = proxy.getStats();
    output += `\nFinal Stats:\n`;
    output += JSON.stringify(stats, null, 2);
    
    result.textContent = output;
    showNotification('Resource access completed', 'info');
}

function showProxyCode() {
    const result = document.getElementById('proxy-result');
    
    const code = `📝 Proxy Pattern Implementation

class Proxy {
    constructor(realResource) {
        this.realResource = realResource;
        this.cache = null;
    }
    
    access() {
        if (this.cache === null) {
            this.cache = this.realResource.access();
        }
        return this.cache;
    }
}

// Usage
const proxy = new Proxy(realResource);
const data = proxy.access();

💡 When to use:
• Access control
• Caching
• Lazy loading
• Logging
• Remote access`;
    
    result.textContent = code;
    showNotification('Proxy code shown', 'info');
}

// ========================================
// BEHAVIORAL PATTERNS
// ========================================

function switchBehavioralTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const activeTab = Array.from(tabs).find(tab => 
        tab.textContent.toLowerCase().includes(tabName)
    );
    if (activeTab) activeTab.classList.add('active');
    
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));
    
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Observer Pattern
class Subject {
    constructor() {
        this.observers = [];
        this.state = '';
    }
    
    subscribe(observer) {
        this.observers.push(observer);
    }
    
    unsubscribe(observer) {
        this.observers = this.observers.filter(obs => obs !== observer);
    }
    
    notify() {
        this.observers.forEach(observer => observer.update(this.state));
    }
    
    setState(state) {
        this.state = state;
        this.notify();
    }
}

class Observer {
    constructor(name) {
        this.name = name;
    }
    
    update(state) {
        console.log(`${this.name} received update: ${state}`);
    }
}

function demoObserver() {
    const result = document.getElementById('observer-result');
    
    const subject = new Subject();
    const observer1 = new Observer('Observer 1');
    const observer2 = new Observer('Observer 2');
    const observer3 = new Observer('Observer 3');
    
    subject.subscribe(observer1);
    subject.subscribe(observer2);
    subject.subscribe(observer3);
    
    let output = `👁️ Observer Pattern Demo\n\n`;
    output += `Subscribed 3 observers\n`;
    output += `Setting state: 'Initial State'\n`;
    subject.setState('Initial State');
    
    output += `\nUnsubscribing Observer 2\n`;
    subject.unsubscribe(observer2);
    output += `Setting state: 'Updated State'\n`;
    subject.setState('Updated State');
    
    output += `\nCheck console for observer notifications`;
    
    result.textContent = output;
    showNotification('Observer pattern demonstrated', 'success');
}

function subscribeObserver() {
    const result = document.getElementById('observer-result');
    
    const observer = new Observer(`Observer ${observers.length + 1}`);
    observers.push(observer);
    
    result.textContent = `👁️ Observer Management\n\n`;
    result.textContent += `Total observers: ${observers.length}\n`;
    result.textContent += `Latest: ${observer.name}`;
    
    showNotification('Observer subscribed', 'success');
}

function notifyObservers() {
    const result = document.getElementById('observer-result');
    
    const subject = new Subject();
    observers.forEach(observer => subject.subscribe(observer));
    
    subject.setState(`Notification at ${new Date().toLocaleTimeString()}`);
    
    result.textContent = `👁️ Observers Notified\n\n`;
    result.textContent += `Notified ${observers.length} observers`;
    result.textContent += `\nCheck console for details`;
    
    showNotification('Observers notified', 'info');
}

function unsubscribeObserver() {
    if (observers.length > 0) {
        observers.pop();
        const result = document.getElementById('observer-result');
        result.textContent = `👁️ Observer Management\n\n`;
        result.textContent += `Total observers: ${observers.length}`;
        showNotification('Observer unsubscribed', 'info');
    }
}

// Strategy Pattern
class CreditCardStrategy {
    pay(amount) {
        return `Paid $${amount} via Credit Card`;
    }
}

class PayPalStrategy {
    pay(amount) {
        return `Paid $${amount} via PayPal`;
    }
}

class BitcoinStrategy {
    pay(amount) {
        return `Paid $${amount} via Bitcoin`;
    }
}

class PaymentContext {
    constructor(strategy) {
        this.strategy = strategy;
    }
    
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    
    processPayment(amount) {
        return this.strategy.pay(amount);
    }
}

function processPayment() {
    const result = document.getElementById('strategy-result');
    const method = document.getElementById('payment-method').value;
    const amount = document.getElementById('payment-amount').value;
    
    let strategy;
    switch (method) {
        case 'credit':
            strategy = new CreditCardStrategy();
            break;
        case 'paypal':
            strategy = new PayPalStrategy();
            break;
        case 'bitcoin':
            strategy = new BitcoinStrategy();
            break;
    }
    
    const context = new PaymentContext(strategy);
    const paymentResult = context.processPayment(amount);
    
    let output = `💳 Strategy Pattern Demo\n\n`;
    output += `Payment Method: ${method}\n`;
    output += `Amount: $${amount}\n`;
    output += `Result: ${paymentResult}\n\n`;
    
    output += `Strategy pattern allows runtime algorithm selection`;
    
    result.textContent = output;
    showNotification('Payment processed', 'success');
}

function showStrategyCode() {
    const result = document.getElementById('strategy-result');
    
    const code = `📝 Strategy Pattern Implementation

class PaymentContext {
    constructor(strategy) {
        this.strategy = strategy;
    }
    
    setStrategy(strategy) {
        this.strategy = strategy;
    }
    
    processPayment(amount) {
        return this.strategy.pay(amount);
    }
}

// Usage
const context = new PaymentContext(new CreditCardStrategy());
context.processPayment(100);

💡 When to use:
• Multiple algorithms
• Runtime strategy selection
• Conditional logic replacement
• Plugin architecture`;
    
    result.textContent = code;
    showNotification('Strategy code shown', 'info');
}

// Command Pattern
class Light {
    turnOn() {
        return 'Light is ON';
    }
    
    turnOff() {
        return 'Light is OFF';
    }
}

class Command {
    constructor(receiver, action) {
        this.receiver = receiver;
        this.action = action;
    }
    
    execute() {
        return this.receiver[this.action]();
    }
    
    undo() {
        const opposite = this.action === 'turnOn' ? 'turnOff' : 'turnOn';
        return this.receiver[opposite]();
    }
}

class Invoker {
    constructor() {
        this.history = [];
    }
    
    executeCommand(command) {
        const result = command.execute();
        this.history.push(command);
        return result;
    }
    
    undo() {
        if (this.history.length > 0) {
            const command = this.history.pop();
            return command.undo();
        }
        return 'Nothing to undo';
    }
}

function demoCommand() {
    const result = document.getElementById('command-result');
    
    const light = new Light();
    const invoker = new Invoker();
    
    const turnOnCommand = new Command(light, 'turnOn');
    const turnOffCommand = new Command(light, 'turnOff');
    
    let output = `⚡ Command Pattern Demo\n\n`;
    output += invoker.executeCommand(turnOnCommand) + '\n';
    output += invoker.executeCommand(turnOffCommand) + '\n';
    output += invoker.undo() + '\n';
    output += invoker.undo() + '\n';
    
    result.textContent = output;
    showNotification('Command pattern demonstrated', 'success');
}

function executeCommand() {
    const result = document.getElementById('command-result');
    
    const light = new Light();
    const invoker = new Invoker();
    
    const turnOnCommand = new Command(light, 'turnOn');
    const result_text = invoker.executeCommand(turnOnCommand);
    
    result.textContent = `⚡ Command Executed\n\n${result_text}`;
    showNotification('Command executed', 'success');
}

function undoCommand() {
    const result = document.getElementById('command-result');
    
    const light = new Light();
    const invoker = new Invoker();
    
    // Execute a command first
    const turnOnCommand = new Command(light, 'turnOn');
    invoker.executeCommand(turnOnCommand);
    
    // Then undo
    const undoResult = invoker.undo();
    
    result.textContent = `⚡ Command Undone\n\n${undoResult}`;
    showNotification('Command undone', 'info');
}

function showCommandHistory() {
    const result = document.getElementById('command-result');
    
    result.textContent = `⚡ Command History\n\n`;
    result.textContent += `Commands in history: ${commandHistory.length}`;
    result.textContent += `\nHistory tracks executed commands for undo functionality`;
    
    showNotification('Command history shown', 'info');
}

// State Pattern
class OrderState {
    constructor(name) {
        this.name = name;
    }
    
    next(order) {
        return this;
    }
    
    cancel(order) {
        return this;
    }
}

class PendingState extends OrderState {
    constructor() {
        super('Pending');
    }
    
    next(order) {
        console.log('Order moved to Processing');
        return new ProcessingState();
    }
    
    cancel(order) {
        console.log('Order cancelled');
        return new CancelledState();
    }
}

class ProcessingState extends OrderState {
    constructor() {
        super('Processing');
    }
    
    next(order) {
        console.log('Order moved to Shipped');
        return new ShippedState();
    }
    
    cancel(order) {
        console.log('Cannot cancel processing order');
        return this;
    }
}

class ShippedState extends OrderState {
    constructor() {
        super('Shipped');
    }
    
    next(order) {
        console.log('Order delivered');
        return new DeliveredState();
    }
    
    cancel(order) {
        console.log('Cannot cancel shipped order');
        return this;
    }
}

class DeliveredState extends OrderState {
    constructor() {
        super('Delivered');
    }
    
    next(order) {
        console.log('Order already delivered');
        return this;
    }
    
    cancel(order) {
        console.log('Cannot cancel delivered order');
        return this;
    }
}

class CancelledState extends OrderState {
    constructor() {
        super('Cancelled');
    }
    
    next(order) {
        console.log('Cannot proceed cancelled order');
        return this;
    }
    
    cancel(order) {
        console.log('Order already cancelled');
        return this;
    }
}

class Order {
    constructor() {
        this.state = new PendingState();
    }
    
    setState(state) {
        this.state = state;
    }
    
    next() {
        this.setState(this.state.next(this));
    }
    
    cancel() {
        this.setState(this.state.cancel(this));
    }
    
    getStatus() {
        return this.state.name;
    }
}

function demoState() {
    const result = document.getElementById('state-result');
    
    currentOrder = new Order();
    
    let output = `🔄 State Pattern Demo\n\n`;
    output += `Initial state: ${currentOrder.getStatus()}\n`;
    
    currentOrder.next();
    output += `After next: ${currentOrder.getStatus()}\n`;
    
    currentOrder.next();
    output += `After next: ${currentOrder.getStatus()}\n`;
    
    currentOrder.next();
    output += `After next: ${currentOrder.getStatus()}\n`;
    
    output += `\nCheck console for state transition messages`;
    
    result.textContent = output;
    showNotification('State pattern demonstrated', 'success');
}

function orderNext() {
    const result = document.getElementById('state-result');
    
    if (!currentOrder) {
        currentOrder = new Order();
    }
    
    currentOrder.next();
    
    result.textContent = `🔄 Order State\n\n`;
    result.textContent += `Current state: ${currentOrder.getStatus()}`;
    result.textContent += `\nCheck console for transition message`;
    
    showNotification('Order state advanced', 'success');
}

function cancelOrder() {
    const result = document.getElementById('state-result');
    
    if (!currentOrder) {
        currentOrder = new Order();
    }
    
    currentOrder.cancel();
    
    result.textContent = `🔄 Order State\n\n`;
    result.textContent += `Current state: ${currentOrder.getStatus()}`;
    result.textContent += `\nCheck console for transition message`;
    
    showNotification('Order cancelled', 'warning');
}

function showStateCode() {
    const result = document.getElementById('state-result');
    
    const code = `📝 State Pattern Implementation

class Order {
    constructor() {
        this.state = new PendingState();
    }
    
    next() {
        this.setState(this.state.next(this));
    }
    
    cancel() {
        this.setState(this.state.cancel(this));
    }
}

// Usage
const order = new Order();
order.next(); // Changes state
order.cancel(); // State-dependent behavior

💡 When to use:
• Object behavior changes with state
• Complex state transitions
• State-dependent logic
• Game development`;
    
    result.textContent = code;
    showNotification('State code shown', 'info');
}

// ========================================
// FUNCTIONAL PROGRAMMING PATTERNS
// ========================================

function switchFunctionalTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const activeTab = Array.from(tabs).find(tab => 
        tab.textContent.toLowerCase().includes(tabName)
    );
    if (activeTab) activeTab.classList.add('active');
    
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));
    
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Currying Pattern
function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return (...next) => curried.apply(this, args.concat(next));
    };
}

function demoCurrying() {
    const result = document.getElementById('currying-result');
    
    // Regular function
    function add(a, b, c) {
        return a + b + c;
    }
    
    // Curried version
    const curriedAdd = curry(add);
    
    let output = `🍛 Currying Pattern Demo\n\n`;
    output += `Regular function: add(1, 2, 3) = ${add(1, 2, 3)}\n\n`;
    
    output += `Curried usage:\n`;
    output += `curriedAdd(1)(2)(3) = ${curriedAdd(1)(2)(3)}\n`;
    output += `curriedAdd(1, 2)(3) = ${curriedAdd(1, 2)(3)}\n`;
    output += `curriedAdd(1)(2, 3) = ${curriedAdd(1)(2, 3)}\n\n`;
    
    // Partial application
    const add5 = curriedAdd(5);
    output += `Partial application:\n`;
    output += `add5(3)(2) = ${add5(3)(2)}\n`;
    
    const add5And3 = add5(3);
    output += `add5And3(2) = ${add5And3(2)}\n`;
    
    result.textContent = output;
    showNotification('Currying pattern demonstrated', 'success');
}

function createCurriedFunction() {
    const result = document.getElementById('currying-result');
    
    // Create a curried multiply function
    const multiply = curry((a, b) => a * b);
    
    const double = multiply(2);
    const triple = multiply(3);
    
    let output = `🍛 Custom Curried Functions\n\n`;
    output += `double(5) = ${double(5)}\n`;
    output += `triple(4) = ${triple(4)}\n`;
    output += `multiply(6)(7) = ${multiply(6)(7)}\n\n`;
    
    output += `Currying enables function specialization\n`;
    output += `and partial application`;
    
    result.textContent = output;
    showNotification('Curried functions created', 'success');
}

function showCurryingCode() {
    const result = document.getElementById('currying-result');
    
    const code = `📝 Currying Pattern Implementation

function curry(fn) {
    return function curried(...args) {
        if (args.length >= fn.length) {
            return fn.apply(this, args);
        }
        return (...next) => curried.apply(this, args.concat(next));
    };
}

// Usage
const curriedAdd = curry((a, b, c) => a + b + c);
const result = curriedAdd(1)(2)(3);

💡 When to use:
• Function specialization
• Partial application
• Function composition
• Configuration functions`;
    
    result.textContent = code;
    showNotification('Currying code shown', 'info');
}

// Function Composition
function compose(...fns) {
    return (x) => fns.reduceRight((acc, fn) => fn(acc), x);
}

function pipe(...fns) {
    return (x) => fns.reduce((acc, fn) => fn(acc), x);
}

function demoComposition() {
    const result = document.getElementById('composition-result');
    
    // Simple functions
    const add5 = x => x + 5;
    const multiply2 = x => x * 2;
    const toString = x => x.toString();
    const exclaim = x => x + '!';
    
    // Compose functions
    const composed = compose(exclaim, toString, multiply2, add5);
    const piped = pipe(add5, multiply2, toString, exclaim);
    
    let output = `🎼 Function Composition Demo\n\n`;
    output += `Input: 10\n\n`;
    
    output += `Compose (right-to-left):\n`;
    output += `composed(10) = ${composed(10)}\n\n`;
    
    output += `Pipe (left-to-right):\n`;
    output += `piped(10) = ${piped(10)}\n\n`;
    
    output += `Step by step:\n`;
    output += `10 + 5 = 15\n`;
    output += `15 * 2 = 30\n`;
    output += `30.toString() = "30"\n`;
    output += `"30" + "!" = "30!"\n`;
    
    result.textContent = output;
    showNotification('Function composition demonstrated', 'success');
}

function composeFunctions() {
    const result = document.getElementById('composition-result');
    
    // Utility functions
    const trim = str => str.trim();
    const toLower = str => str.toLowerCase();
    const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);
    
    // Create composed function
    const cleanString = compose(capitalize, toLower, trim);
    
    const testString = '  HELLO WORLD  ';
    
    let output = `🎼 String Processing Pipeline\n\n`;
    output += `Original: "${testString}"\n`;
    output += `Processed: "${cleanString(testString)}"\n\n`;
    
    output += `Pipeline: trim → toLower → capitalize`;
    
    result.textContent = output;
    showNotification('Functions composed', 'success');
}

function showCompositionCode() {
    const result = document.getElementById('composition-result');
    
    const code = `📝 Function Composition Implementation

function compose(...fns) {
    return (x) => fns.reduceRight((acc, fn) => fn(acc), x);
}

function pipe(...fns) {
    return (x) => fns.reduce((acc, fn) => fn(acc), x);
}

// Usage
const composed = compose(f, g, h); // h(g(f(x)))
const piped = pipe(f, g, h);      // f(g(h(x)))

💡 When to use:
• Function pipelines
• Data transformation
• Reusable function chains
• Point-free programming`;
    
    result.textContent = code;
    showNotification('Composition code shown', 'info');
}

// Memoization Pattern
function memoize(fn) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            console.log('Returning cached result');
            return cache.get(key);
        }
        
        console.log('Computing new result');
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

function demoMemoization() {
    const result = document.getElementById('memoization-result');
    
    // Expensive function
    const fibonacci = (n) => {
        if (n < 2) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    };
    
    // Memoized version
    const memoizedFibonacci = memoize(fibonacci);
    
    let output = `🧠 Memoization Pattern Demo\n\n`;
    output += `Testing fibonacci(10):\n`;
    output += `First call: ${memoizedFibonacci(10)} (computes)\n`;
    output += `Second call: ${memoizedFibonacci(10)} (cached)\n\n`;
    
    output += `Check console for computation vs cache messages\n\n`;
    
    output += `Memoization caches expensive function results\n`;
    output += `to improve performance on repeated calls`;
    
    result.textContent = output;
    showNotification('Memoization pattern demonstrated', 'success');
}

function testMemoization() {
    const result = document.getElementById('memoization-result');
    
    // Expensive function simulation
    const expensiveOperation = memoize((n) => {
        // Simulate expensive computation
        let sum = 0;
        for (let i = 0; i < n * 1000000; i++) {
            sum += Math.random();
        }
        return sum.toFixed(2);
    });
    
    const start = performance.now();
    const result1 = expensiveOperation(5);
    const firstCall = performance.now() - start;
    
    const start2 = performance.now();
    const result2 = expensiveOperation(5);
    const secondCall = performance.now() - start2;
    
    let output = `🧠 Performance Test\n\n`;
    output += `First call: ${result1} (${firstCall.toFixed(2)}ms)\n`;
    output += `Second call: ${result2} (${secondCall.toFixed(2)}ms)\n`;
    output += `Speedup: ${(firstCall / secondCall).toFixed(0)}x faster\n\n`;
    
    output += `Check console for computation vs cache messages`;
    
    result.textContent = output;
    showNotification('Memoization test completed', 'success');
}

function showMemoizationCode() {
    const result = document.getElementById('memoization-result');
    
    const code = `📝 Memoization Pattern Implementation

function memoize(fn) {
    const cache = new Map();
    
    return function(...args) {
        const key = JSON.stringify(args);
        
        if (cache.has(key)) {
            return cache.get(key);
        }
        
        const result = fn.apply(this, args);
        cache.set(key, result);
        return result;
    };
}

// Usage
const memoizedFn = memoize(expensiveFunction);

💡 When to use:
• Expensive computations
• Pure functions
• Repeated calculations
• API responses`;
    
    result.textContent = code;
    showNotification('Memoization code shown', 'info');
}

// Immutable Patterns
function demoImmutable() {
    const result = document.getElementById('immutable-result');
    
    // Original object
    const originalUser = {
        name: 'John',
        age: 30,
        address: {
            city: 'New York',
            country: 'USA'
        }
    };
    
    // Immutable update (using spread operator)
    const updatedUser = {
        ...originalUser,
        age: 31,
        address: {
            ...originalUser.address,
            city: 'Boston'
        }
    };
    
    let output = `🔒 Immutable Pattern Demo\n\n`;
    output += `Original user:\n`;
    output += JSON.stringify(originalUser, null, 2);
    output += '\n\n';
    
    output += `Updated user:\n`;
    output += JSON.stringify(updatedUser, null, 2);
    output += '\n\n';
    
    output += `Are they the same object? ${originalUser === updatedUser}\n`;
    output += `Original age unchanged: ${originalUser.age}\n`;
    output += `Original city unchanged: ${originalUser.address.city}\n`;
    
    result.textContent = output;
    showNotification('Immutable pattern demonstrated', 'success');
}

function updateImmutable() {
    const result = document.getElementById('immutable-result');
    
    // Immutable array operations
    const originalArray = [1, 2, 3, 4, 5];
    
    // Add item (immutable)
    const withNewItem = [...originalArray, 6];
    
    // Remove item (immutable)
    const withoutItem = originalArray.filter(item => item !== 3);
    
    // Update item (immutable)
    const withUpdatedItem = originalArray.map(item => 
        item === 2 ? 20 : item
    );
    
    let output = `🔒 Immutable Array Operations\n\n`;
    output += `Original: [${originalArray.join(', ')}]\n`;
    output += `Add 6: [${withNewItem.join(', ')}]\n`;
    output += `Remove 3: [${withoutItem.join(', ')}]\n`;
    output += `Update 2 to 20: [${withUpdatedItem.join(', ')}]\n\n`;
    
    output += `Original array unchanged: [${originalArray.join(', ')}]\n`;
    output += `All operations create new arrays`;
    
    result.textContent = output;
    showNotification('Immutable operations completed', 'success');
}

function showImmutableCode() {
    const result = document.getElementById('immutable-result');
    
    const code = `📝 Immutable Pattern Implementation

// Immutable object update
const updateObject = (obj, updates) => ({
    ...obj,
    ...updates
});

// Immutable array operations
const addItem = (arr, item) => [...arr, item];
const removeItem = (arr, index) => arr.filter((_, i) => i !== index);
const updateItem = (arr, index, item) => arr.map((i, idx) => idx === index ? item : i);

// Usage
const updated = updateObject(original, { age: 31 });

💡 When to use:
• State management
• Predictable updates
• Functional programming
• React/Redux applications`;
    
    result.textContent = code;
    showNotification('Immutable code shown', 'info');
}

// ========================================
// ASYNCHRONOUS PATTERNS
// ========================================

function switchAsyncTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const activeTab = Array.from(tabs).find(tab => 
        tab.textContent.toLowerCase().includes(tabName)
    );
    if (activeTab) activeTab.classList.add('active');
    
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));
    
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Promise Patterns
function demoPromises() {
    const result = document.getElementById('promises-result');
    
    // Create a promise
    const myPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Promise resolved!');
        }, 1000);
    });
    
    let output = `🎯 Promise Pattern Demo\n\n`;
    output += `Creating and consuming promises...\n\n`;
    
    myPromise
        .then(value => {
            output += `Resolved: ${value}\n`;
            result.textContent = output;
        })
        .catch(error => {
            output += `Rejected: ${error}\n`;
            result.textContent = output;
        });
    
    output += `Promise created, waiting for resolution...`;
    result.textContent = output;
    showNotification('Promise demo started', 'info');
}

function chainPromises() {
    const result = document.getElementById('promises-result');
    
    // Simulate API calls
    const fetchUser = () => Promise.resolve({ id: 1, name: 'John' });
    const fetchPosts = (user) => Promise.resolve([{ title: 'Post 1' }, { title: 'Post 2' }]);
    const fetchComments = (posts) => Promise.resolve(['Comment 1', 'Comment 2']);
    
    let output = `⛓️ Promise Chaining Demo\n\n`;
    
    fetchUser()
        .then(user => {
            output += `User: ${JSON.stringify(user)}\n`;
            return fetchPosts(user);
        })
        .then(posts => {
            output += `Posts: ${JSON.stringify(posts)}\n`;
            return fetchComments(posts);
        })
        .then(comments => {
            output += `Comments: ${JSON.stringify(comments)}\n`;
            result.textContent = output;
        })
        .catch(error => {
            output += `Error: ${error}\n`;
            result.textContent = output;
        });
    
    result.textContent = output + 'Chaining promises...';
    showNotification('Promise chaining started', 'info');
}

function parallelPromises() {
    const result = document.getElementById('promises-result');
    
    // Simulate parallel API calls
    const promise1 = new Promise(resolve => setTimeout(() => resolve('Result 1'), 500));
    const promise2 = new Promise(resolve => setTimeout(() => resolve('Result 2'), 1000));
    const promise3 = new Promise(resolve => setTimeout(() => resolve('Result 3'), 750));
    
    let output = `⚡ Parallel Promises Demo\n\n`;
    
    Promise.all([promise1, promise2, promise3])
        .then(results => {
            output += `All results: ${JSON.stringify(results)}\n`;
            result.textContent = output;
        })
        .catch(error => {
            output += `Error: ${error}\n`;
            result.textContent = output;
        });
    
    result.textContent = output + 'Running promises in parallel...';
    showNotification('Parallel promises started', 'info');
}

function showPromiseCode() {
    const result = document.getElementById('promises-result');
    
    const code = `📝 Promise Patterns Implementation

// Promise creation
const myPromise = new Promise((resolve, reject) => {
    // async operation
    if (success) {
        resolve(result);
    } else {
        reject(error);
    }
});

// Promise chaining
promise
    .then(result => transform(result))
    .then(transformed => save(transformed))
    .catch(error => handleError(error));

// Parallel promises
Promise.all([promise1, promise2, promise3])
    .then(results => handleAll(results));

💡 When to use:
• Async operations
• API calls
• File operations
• Event handling`;
    
    result.textContent = code;
    showNotification('Promise code shown', 'info');
}

// Async/Await Patterns
async function demoAsyncAwait() {
    const result = document.getElementById('asyncawait-result');
    
    // Simulate async operation
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    
    let output = `⏳ Async/Await Pattern Demo\n\n`;
    
    try {
        output += 'Starting async operations...\n';
        result.textContent = output;
        
        await delay(500);
        output += 'Step 1 completed\n';
        result.textContent = output;
        
        await delay(500);
        output += 'Step 2 completed\n';
        result.textContent = output;
        
        await delay(500);
        output += 'Step 3 completed\n';
        output += '\nAll operations completed successfully!';
        result.textContent = output;
        
    } catch (error) {
        output += `Error: ${error}\n`;
        result.textContent = output;
    }
    
    showNotification('Async/await demo started', 'info');
}

async function sequentialAsync() {
    const result = document.getElementById('asyncawait-result');
    
    // Simulate API calls
    const apiCall = (name, delay) => 
        new Promise(resolve => setTimeout(() => resolve(`${name} result`), delay));
    
    let output = `📋 Sequential Async Operations\n\n`;
    
    try {
        const result1 = await apiCall('API 1', 500);
        output += `${result1}\n`;
        result.textContent = output;
        
        const result2 = await apiCall('API 2', 500);
        output += `${result2}\n`;
        result.textContent = output;
        
        const result3 = await apiCall('API 3', 500);
        output += `${result3}\n`;
        result.textContent = output;
        
    } catch (error) {
        output += `Error: ${error}\n`;
        result.textContent = output;
    }
    
    showNotification('Sequential operations completed', 'success');
}

async function parallelAsync() {
    const result = document.getElementById('asyncawait-result');
    
    // Simulate API calls
    const apiCall = (name, delay) => 
        new Promise(resolve => setTimeout(() => resolve(`${name} result`), delay));
    
    let output = `⚡ Parallel Async Operations\n\n`;
    
    try {
        const [result1, result2, result3] = await Promise.all([
            apiCall('API 1', 500),
            apiCall('API 2', 1000),
            apiCall('API 3', 750)
        ]);
        
        output += `${result1}\n`;
        output += `${result2}\n`;
        output += `${result3}\n`;
        output += '\nAll operations completed in parallel!';
        result.textContent = output;
        
    } catch (error) {
        output += `Error: ${error}\n`;
        result.textContent = output;
    }
    
    showNotification('Parallel operations completed', 'success');
}

function showAsyncCode() {
    const result = document.getElementById('asyncawait-result');
    
    const code = `📝 Async/Await Pattern Implementation

async function fetchData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// Parallel execution
async function fetchMultiple() {
    const [data1, data2] = await Promise.all([
        fetch('/api/1'),
        fetch('/api/2')
    ]);
    return [data1, data2];
}

💡 When to use:
• Clean async code
• Sequential operations
• Error handling
• Modern JavaScript`;
    
    result.textContent = code;
    showNotification('Async/await code shown', 'info');
}

// Observable Patterns
class Observable {
    constructor(subscribe) {
        this.subscribe = subscribe;
    }
    
    static fromEvent(element, eventName) {
        return new Observable(observer => {
            const handler = event => observer.next(event);
            element.addEventListener(eventName, handler);
            return () => element.removeEventListener(eventName, handler);
        });
    }
    
    map(fn) {
        return new Observable(observer => {
            return this.subscribe({
                next: value => observer.next(fn(value)),
                error: observer.error,
                complete: observer.complete
            });
        });
    }
    
    filter(predicate) {
        return new Observable(observer => {
            return this.subscribe({
                next: value => {
                    if (predicate(value)) {
                        observer.next(value);
                    }
                },
                error: observer.error,
                complete: observer.complete
            });
        });
    }
}

function demoObservables() {
    const result = document.getElementById('observables-result');
    
    // Create a simple observable
    const observable = new Observable(observer => {
        let count = 0;
        const interval = setInterval(() => {
            observer.next(count++);
            if (count > 5) {
                observer.complete();
                clearInterval(interval);
            }
        }, 500);
        
        return () => clearInterval(interval);
    });
    
    let output = `👁️ Observable Pattern Demo\n\n`;
    output += 'Subscribing to observable...\n';
    
    const subscription = observable.subscribe({
        next: value => {
            output += `Next: ${value}\n`;
            result.textContent = output;
        },
        error: error => {
            output += `Error: ${error}\n`;
            result.textContent = output;
        },
        complete: () => {
            output += 'Complete!\n';
            result.textContent = output;
        }
    });
    
    showNotification('Observable demo started', 'info');
}

function createObservable() {
    const result = document.getElementById('observables-result');
    
    // Create observable from array
    const observable = new Observable(observer => {
        [1, 2, 3, 4, 5].forEach(value => observer.next(value));
        observer.complete();
    });
    
    // Chain operators
    const mapped = observable
        .map(x => x * 2)
        .filter(x => x > 4);
    
    let output = `👁️ Observable with Operators\n\n`;
    
    mapped.subscribe({
        next: value => {
            output += `Filtered & Mapped: ${value}\n`;
            result.textContent = output;
        },
        complete: () => {
            output += 'Complete!\n';
            result.textContent = output;
        }
    });
    
    showNotification('Observable with operators created', 'success');
}

function showObservableCode() {
    const result = document.getElementById('observables-result');
    
    const code = `📝 Observable Pattern Implementation

class Observable {
    constructor(subscribe) {
        this.subscribe = subscribe;
    }
    
    map(fn) {
        return new Observable(observer => {
            return this.subscribe({
                next: value => observer.next(fn(value)),
                error: observer.error,
                complete: observer.complete
            });
        });
    }
}

// Usage
const observable = new Observable(observer => {
    observer.next(1);
    observer.next(2);
    observer.complete();
});

observable.subscribe({
    next: value => console.log(value),
    complete: () => console.log('done')
});

💡 When to use:
• Event streams
• Reactive programming
• Data streams
• Complex async flows`;
    
    result.textContent = code;
    showNotification('Observable code shown', 'info');
}

// Generator Patterns
function* numberGenerator() {
    let i = 0;
    while (true) {
        yield i++;
    }
}

function* fibonacciGenerator() {
    let a = 0, b = 1;
    while (true) {
        yield a;
        [a, b] = [b, a + b];
    }
}

function demoGenerators() {
    const result = document.getElementById('generators-result');
    
    const numbers = numberGenerator();
    const fibonacci = fibonacciGenerator();
    
    let output = `⚡ Generator Pattern Demo\n\n`;
    
    output += 'First 5 numbers:\n';
    for (let i = 0; i < 5; i++) {
        output += `${numbers.next().value} `;
    }
    
    output += '\n\nFirst 10 Fibonacci numbers:\n';
    for (let i = 0; i < 10; i++) {
        output += `${fibonacci.next().value} `;
    }
    
    output += '\n\nGenerators provide lazy evaluation\n';
    output += 'and can produce infinite sequences';
    
    result.textContent = output;
    showNotification('Generator pattern demonstrated', 'success');
}

function createGenerator() {
    const result = document.getElementById('generators-result');
    
    // Custom generator
    function* range(start, end) {
        for (let i = start; i <= end; i++) {
            yield i;
        }
    }
    
    // Generator with delegation
    function* combined() {
        yield* range(1, 3);
        yield* range(10, 12);
        yield 'Done!';
    }
    
    let output = `⚡ Custom Generators\n\n`;
    
    output += 'Range 1-3 and 10-12:\n';
    for (const value of combined()) {
        output += `${value} `;
    }
    
    output += '\n\nGenerators can be composed\n';
    output += 'and delegated using yield*';
    
    result.textContent = output;
    showNotification('Custom generators created', 'success');
}

function showGeneratorCode() {
    const result = document.getElementById('generators-result');
    
    const code = `📝 Generator Pattern Implementation

function* generator() {
    yield 1;
    yield 2;
    yield 3;
}

// Usage
const gen = generator();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3

// With for...of
for (const value of generator()) {
    console.log(value);
}

💡 When to use:
• Lazy evaluation
• Infinite sequences
• Async generators
• Memory efficiency`;
    
    result.textContent = code;
    showNotification('Generator code shown', 'info');
}

// ========================================
// PERFORMANCE PATTERNS
// ========================================

function switchPerformanceTab(tabName) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    const activeTab = Array.from(tabs).find(tab => 
        tab.textContent.toLowerCase().includes(tabName)
    );
    if (activeTab) activeTab.classList.add('active');
    
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));
    
    document.getElementById(`${tabName}-tab`).classList.add('active');
}

// Throttling Pattern
function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            return func.apply(this, args);
        }
    };
}

function demoThrottling() {
    const result = document.getElementById('throttling-result');
    
    let output = `⏱️ Throttling Pattern Demo\n\n`;
    output += 'Creating throttled function (1000ms delay)\n\n';
    
    const normalFunction = () => {
        output += `Normal: ${new Date().toLocaleTimeString()}\n`;
        result.textContent = output;
    };
    
    const throttledFunction = throttle(() => {
        output += `Throttled: ${new Date().toLocaleTimeString()}\n`;
        result.textContent = output;
    }, 1000);
    
    // Simulate rapid calls
    output += 'Making 10 rapid calls:\n';
    result.textContent = output;
    
    for (let i = 0; i < 10; i++) {
        normalFunction();
        throttledFunction();
    }
    
    showNotification('Throttling demo started', 'info');
}

function testThrottling() {
    const result = document.getElementById('throttling-result');
    
    throttledFunction = throttle(() => {
        result.textContent = `⏱️ Throttled Function Called\n${new Date().toLocaleTimeString()}`;
    }, 1000);
    
    // Simulate rapid clicks
    for (let i = 0; i < 5; i++) {
        setTimeout(() => throttledFunction(), i * 100);
    }
    
    showNotification('Throttling test started', 'info');
}

function showThrottlingCode() {
    const result = document.getElementById('throttling-result');
    
    const code = `📝 Throttling Pattern Implementation

function throttle(func, delay) {
    let lastCall = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            return func.apply(this, args);
        }
    };
}

// Usage
const throttledScroll = throttle(handleScroll, 100);
window.addEventListener('scroll', throttledScroll);

💡 When to use:
• Scroll events
• Resize events
• Mouse events
• API rate limiting`;
    
    result.textContent = code;
    showNotification('Throttling code shown', 'info');
}

// Debouncing Pattern
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

function demoDebouncing() {
    const result = document.getElementById('debouncing-result');
    
    let output = `⏱️ Debouncing Pattern Demo\n\n`;
    output += 'Creating debounced function (500ms delay)\n\n';
    
    const normalFunction = () => {
        output += `Normal: ${new Date().toLocaleTimeString()}\n`;
        result.textContent = output;
    };
    
    const debouncedFunction = debounce(() => {
        output += `Debounced: ${new Date().toLocaleTimeString()}\n`;
        result.textContent = output;
    }, 500);
    
    // Simulate rapid calls
    output += 'Making 10 rapid calls (only last will execute):\n';
    result.textContent = output;
    
    for (let i = 0; i < 10; i++) {
        normalFunction();
        debouncedFunction();
    }
    
    showNotification('Debouncing demo started', 'info');
}

function testDebouncing() {
    const result = document.getElementById('debouncing-result');
    
    debouncedFunction = debounce(() => {
        result.textContent = `⏱️ Debounced Function Executed\n${new Date().toLocaleTimeString()}`;
    }, 500);
    
    // Simulate rapid typing
    for (let i = 0; i < 5; i++) {
        setTimeout(() => debouncedFunction(), i * 100);
    }
    
    showNotification('Debouncing test started', 'info');
}

function showDebouncingCode() {
    const result = document.getElementById('debouncing-result');
    
    const code = `📝 Debouncing Pattern Implementation

function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Usage
const debouncedSearch = debounce(performSearch, 300);
searchInput.addEventListener('input', debouncedSearch);

💡 When to use:
• Search inputs
• Auto-save
• Form validation
• API calls on user input`;
    
    result.textContent = code;
    showNotification('Debouncing code shown', 'info');
}

// Lazy Loading Pattern
function demoLazyLoading() {
    const result = document.getElementById('lazyloading-result');
    
    let output = `⏳ Lazy Loading Pattern Demo\n\n`;
    output += 'Simulating module loading...\n';
    result.textContent = output;
    
    // Simulate dynamic import
    setTimeout(() => {
        output += 'Module loaded successfully!\n';
        output += 'Module functionality available\n\n';
        output += 'Lazy loading benefits:\n';
        output += '• Faster initial page load\n';
        output += '• Load only when needed\n';
        output += '• Reduced bundle size';
        result.textContent = output;
    }, 1000);
    
    showNotification('Lazy loading demo started', 'info');
}

async function loadModule() {
    const result = document.getElementById('lazyloading-result');
    
    try {
        // Simulate dynamic module loading
        const module = {
            processData: (data) => `Processed: ${data}`,
            version: '1.0.0'
        };
        
        result.textContent = `⏳ Module Loaded\n\n`;
        result.textContent += `Version: ${module.version}\n`;
        result.textContent += `Process result: ${module.processData('test data')}`;
        
        showNotification('Module loaded successfully', 'success');
        
    } catch (error) {
        result.textContent = `❌ Module loading failed: ${error}`;
        showNotification('Module loading failed', 'error');
    }
}

function showLazyCode() {
    const result = document.getElementById('lazyloading-result');
    
    const code = `📝 Lazy Loading Pattern Implementation

// Dynamic import
async function loadModule() {
    const module = await import('./module.js');
    return module.doSomething();
}

// Conditional loading
if (featureNeeded) {
    const module = await import('./feature.js');
    module.enable();
}

// Lazy component loading
const LazyComponent = React.lazy(() => import('./Component'));

💡 When to use:
• Large applications
• Route-based code splitting
• Feature flags
• Performance optimization`;
    
    result.textContent = code;
    showNotification('Lazy loading code shown', 'info');
}

// Object Pooling Pattern
class ObjectPool {
    constructor(createFn, resetFn, initialSize = 5) {
        this.createFn = createFn;
        this.resetFn = resetFn;
        this.pool = [];
        
        // Pre-populate pool
        for (let i = 0; i < initialSize; i++) {
            this.pool.push(this.createFn());
        }
    }
    
    acquire() {
        if (this.pool.length > 0) {
            return this.pool.pop();
        }
        return this.createFn();
    }
    
    release(obj) {
        this.resetFn(obj);
        this.pool.push(obj);
    }
    
    size() {
        return this.pool.length;
    }
}

function demoObjectPooling() {
    const result = document.getElementById('pooling-result');
    
    // Create a pool of objects
    const pool = new ObjectPool(
        () => ({ data: null, timestamp: Date.now() }),
        (obj) => { obj.data = null; obj.timestamp = Date.now(); },
        3
    );
    
    let output = `🏊 Object Pooling Pattern Demo\n\n`;
    output += `Initial pool size: ${pool.size()}\n`;
    
    // Acquire objects
    const obj1 = pool.acquire();
    const obj2 = pool.acquire();
    const obj3 = pool.acquire();
    
    output += `After acquiring 3 objects: ${pool.size()}\n`;
    
    // Acquire one more (creates new)
    const obj4 = pool.acquire();
    output += `After acquiring 4 objects: ${pool.size()}\n`;
    
    // Release objects back to pool
    pool.release(obj1);
    pool.release(obj2);
    
    output += `After releasing 2 objects: ${pool.size()}\n`;
    
    result.textContent = output;
    showNotification('Object pooling demonstrated', 'success');
}

function testPooling() {
    const result = document.getElementById('pooling-result');
    
    // Pool for expensive objects
    const expensiveObjectPool = new ObjectPool(
        () => {
            // Simulate expensive object creation
            const obj = { id: Math.random(), data: new Array(1000).fill(0) };
            console.log('Created new expensive object');
            return obj;
        },
        (obj) => { obj.data.fill(0); },
        2
    );
    
    let output = `🏊 Pool Performance Test\n\n`;
    
    // Test pool usage
    const objects = [];
    for (let i = 0; i < 5; i++) {
        objects.push(expensiveObjectPool.acquire());
    }
    
    output += `Acquired 5 objects, pool size: ${expensiveObjectPool.size()}\n`;
    
    // Release half
    objects.splice(0, 3).forEach(obj => expensiveObjectPool.release(obj));
    
    output += `Released 3 objects, pool size: ${expensiveObjectPool.size()}\n`;
    output += `Check console for object creation messages`;
    
    result.textContent = output;
    showNotification('Object pooling test completed', 'success');
}

function showPoolingCode() {
    const result = document.getElementById('pooling-result');
    
    const code = `📝 Object Pooling Pattern Implementation

class ObjectPool {
    constructor(createFn, resetFn, initialSize = 5) {
        this.createFn = createFn;
        this.resetFn = resetFn;
        this.pool = [];
        
        for (let i = 0; i < initialSize; i++) {
            this.pool.push(this.createFn());
        }
    }
    
    acquire() {
        return this.pool.length > 0 ? 
            this.pool.pop() : this.createFn();
    }
    
    release(obj) {
        this.resetFn(obj);
        this.pool.push(obj);
    }
}

// Usage
const pool = new ObjectPool(createObject, resetObject);
const obj = pool.acquire();
pool.release(obj);

💡 When to use:
• Expensive object creation
• High-frequency object usage
• Memory management
• Game development`;
    
    result.textContent = code;
    showNotification('Object pooling code shown', 'info');
}

// ========================================
// BEST PRACTICES
// ========================================

function showBestPractice(topic) {
    const content = document.getElementById('best-practice-content');
    
    const practices = {
        choosing: `🎯 Choosing the Right Pattern

📋 DECISION FACTORS:
• Problem complexity
• Team experience
• Performance requirements
• Maintainability needs
• Future scalability

✅ PATTERN SELECTION GUIDE:

CREATIONAL PATTERNS:
• Singleton: Global access needed
• Factory: Object creation complexity
• Builder: Step-by-step construction
• Prototype: Object cloning needed

STRUCTURAL PATTERNS:
• Adapter: Interface compatibility
• Decorator: Add functionality dynamically
• Facade: Simplify complex system
• Proxy: Control access to object

BEHAVIORAL PATTERNS:
• Observer: Event-driven systems
• Strategy: Algorithm selection
• Command: Encapsulate operations
• State: Behavior changes with state

🔧 EVALUATION CRITERIA:
• Does it solve the problem?
• Is it overkill?
• Is the team familiar?
• Does it improve maintainability?
• Does it hurt performance?

💡 PRO TIPS:
• Start simple, add patterns as needed
• Consider the cost/benefit ratio
• Document pattern usage
• Review and refactor regularly`,

        implementing: `🔧 Pattern Implementation Best Practices

📋 IMPLEMENTATION PRINCIPLES:
• Keep it simple
• Follow SOLID principles
• Use meaningful names
• Document intent
• Test thoroughly

✅ IMPLEMENTATION GUIDELINES:

UNDERSTAND THE PATTERN:
• Study the pattern structure
• Know the problem it solves
• Understand the trade-offs
• Learn common variations

START WITH PURPOSE:
• Identify the specific problem
• Choose the simplest solution
• Add complexity only when needed
• Refactor when requirements change

FOLLOW CONVENTIONS:
• Use standard naming
• Follow language idioms
• Maintain consistent style
• Write self-documenting code

TEST COMPREHENSIVELY:
• Unit test pattern components
• Test edge cases
• Verify pattern behavior
• Test integration points

🔧 COMMON MISTAKES:
• Over-engineering simple problems
• Using patterns incorrectly
• Ignoring performance impact
• Not documenting pattern usage

💡 PRO TIPS:
• Pattern libraries and frameworks
• Code review for pattern usage
• Performance testing
• Regular refactoring sessions`,

        antipatterns: `⚠️ Common Anti-Patterns

🚨 CREATIONAL ANTI-PATTERNS:
• Singleton overuse
• God objects
• Tight coupling
• Hard-coded dependencies

🚨 STRUCTURAL ANTI-PATTERNS:
• Spaghetti inheritance
• Feature envy
• Inappropriate intimacy
• Refused bequest

🚨 BEHAVIORAL ANTI-PATTERNS:
• God classes
• Shotgun surgery
• Feature creep
• Magic numbers

🚨 FUNCTIONAL ANTI-PATTERNS:
• Side effects in pure functions
• Mutable global state
• Callback hell
• Promise chaining without error handling

✅ AVOIDANCE STRATEGIES:

SINGLE RESPONSIBILITY:
• One reason to change
• Small, focused functions
• Clear boundaries
• Cohesive modules

LOOSE COUPLING:
• Dependency injection
• Interface segregation
• Event-driven architecture
• Observer pattern

HIGH COHESION:
• Related functionality together
• Clear module boundaries
• Minimal dependencies
• Focused responsibilities

💡 DETECTION TECHNIQUES:
• Code review checklists
• Static analysis tools
• Metrics and measurements
• Regular refactoring`,

        testing: `🧪 Testing Pattern Implementations

📋 TESTING STRATEGIES:
• Unit testing
• Integration testing
• Behavior testing
• Performance testing

✅ TESTING APPROACHES:

UNIT TESTING PATTERNS:
• Test individual components
• Mock dependencies
• Verify pattern behavior
• Test edge cases

INTEGRATION TESTING:
• Test pattern interactions
• Verify system behavior
• Test with real dependencies
• End-to-end scenarios

BEHAVIORAL TESTING:
• Test pattern outcomes
• Verify expected behavior
• Test state changes
• Validate invariants

PERFORMANCE TESTING:
• Measure pattern overhead
• Test with realistic data
• Profile memory usage
• Benchmark alternatives

🔧 TESTING TECHNIQUES:

TEST DOUBLES:
• Mocks for external dependencies
• Stubs for controlled responses
• Spies for interaction verification
• Fakes for lightweight alternatives

PATTERN-SPECIFIC TESTS:
• Singleton: Test instance uniqueness
• Factory: Test object creation
• Observer: Test notification flow
• Strategy: Test algorithm selection

💡 TESTING BEST PRACTICES:
• Test first when possible
• Write meaningful test names
• Test one thing at a time
• Keep tests independent
• Regular test maintenance`,

        performance: `⚡ Performance Optimization

📋 PERFORMANCE CONSIDERATIONS:
• Memory usage
• CPU overhead
• I/O operations
• Network latency

✅ OPTIMIZATION STRATEGIES:

MEMORY EFFICIENCY:
• Object pooling
• Lazy loading
• Memory leaks prevention
• Garbage collection optimization

CPU OPTIMIZATION:
• Algorithm efficiency
• Caching strategies
• Parallel processing
• Web Workers

I/O OPTIMIZATION:
• Debouncing and throttling
• Batch operations
• Compression
• Caching layers

NETWORK OPTIMIZATION:
• Request batching
• Compression
• Caching strategies
• CDN usage

🔧 PATTERN-SPECIFIC OPTIMIZATIONS:

SINGLETON:
• Lazy initialization
• Thread safety
• Memory cleanup

OBSERVER:
• Event delegation
• Unsubscribe handling
• Memory leak prevention

FACTORY:
• Object reuse
• Caching
• Lazy creation

💡 MONITORING TECHNIQUES:
• Performance profiling
• Memory usage tracking
• Network monitoring
• User experience metrics`,

        modern: `🚀 Modern JavaScript Adaptations

📋 MODERN FEATURES:
• ES6+ syntax
• Modules and imports
• Async/await
• Destructuring
• Spread operator

✅ PATTERN EVOLUTIONS:

CLASS-BASED PATTERNS:
• ES6 classes vs constructor functions
• Private fields and methods
• Static properties
• Super calls

FUNCTIONAL PATTERNS:
• Arrow functions
• Destructuring
• Spread/rest operators
• Template literals

ASYNC PATTERNS:
• Promises vs callbacks
• Async/await syntax
• Error handling
• Parallel execution

MODULE PATTERNS:
• ES6 modules
• Named vs default exports
• Dynamic imports
• Tree shaking

🔧 MODERN IMPLEMENTATIONS:

DECORATORS (PROPOSAL):
• Class decorators
• Method decorators
• Property decorators
• Parameter decorators

PROXIES:
• Property access control
• Validation
• Logging
• Data binding

GENERATORS:
• Async generators
• Yield delegation
• Iterator protocol
• Lazy evaluation

💡 MIGRATION STRATEGIES:
• Gradual migration
• Polyfills for older browsers
• Build tools integration
• Code splitting
• Performance monitoring`
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

function showPatternsOverview() {
    console.log(`
🏗️ Advanced JavaScript Patterns Overview

🎯 PATTERN CATEGORIES:
• Creational: Object creation mechanisms
• Structural: Object composition patterns
• Behavioral: Object interaction patterns
• Functional: Functional programming concepts
• Async: Asynchronous programming patterns
• Performance: Optimization techniques

🔧 KEY CONCEPTS:
• SOLID principles
• Design patterns
• Code organization
• Maintainability
• Performance optimization

💡 LEARNING PATH:
1. Master basic patterns (Singleton, Factory)
2. Learn structural patterns (Adapter, Decorator)
3. Understand behavioral patterns (Observer, Strategy)
4. Explore functional patterns (Currying, Composition)
5. Master async patterns (Promises, Async/Await)
6. Apply performance patterns (Throttling, Debouncing)

🚀 ADVANCED TOPICS:
• Pattern combinations
• Anti-patterns avoidance
• Performance optimization
• Modern JavaScript adaptations
• Testing strategies
    `);
}

function setupEventListeners() {
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + Shift + P: Show patterns overview
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
            e.preventDefault();
            showPatternsOverview();
        }
        
        // Ctrl/Cmd + Shift + S: Singleton demo
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'S') {
            e.preventDefault();
            demoSingleton();
        }
        
        // Ctrl/Cmd + Shift + F: Factory demo
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'F') {
            e.preventDefault();
            demoFactory();
        }
    });
}

console.log("Advanced JavaScript Patterns Playground - All systems ready! 🏗️");
