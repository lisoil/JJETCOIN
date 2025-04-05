// Common functions for all pages

// Global user object
let currentUser = {
    username: null,
    usd: 0,
    JJETTCOIN: 0
};

// Update user tracker display
function updateUserTracker() {
    const usernameElement = document.getElementById('current-username');
    const usdElement = document.getElementById('current-usd');
    const jjettcoinElement = document.getElementById('current-JJETTCOIN');

    if (usernameElement) usernameElement.textContent = currentUser.username || 'NA';
    if (usdElement) usdElement.textContent = currentUser.usd.toFixed(2);
    if (jjettcoinElement) jjettcoinElement.textContent = currentUser.JJETTCOIN.toFixed(2);
}

// Set active navigation link
function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    updateUserTracker();
    setActiveNavLink();
});

// Account creation form handling
const createAccountForm = document.getElementById('create-account-form');
if (createAccountForm) {
    createAccountForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        
        if (username) {
            currentUser.username = username;
            currentUser.usd = 1000; // Starting balance
            currentUser.JJETTCOIN = 0;
            
            updateUserTracker();
            
            const messageElement = document.getElementById('account-message');
            if (messageElement) {
                messageElement.textContent = 'Account created successfully!';
                messageElement.className = 'success';
            }
        }
    });
}

// Sign in form handling
const signInForm = document.getElementById('sign-in-form');
if (signInForm) {
    signInForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('sign-in-username').value;
        
        if (username) {
            currentUser.username = username;
            currentUser.usd = 1000; // Starting balance
            currentUser.JJETTCOIN = 0;
            
            updateUserTracker();
            
            const messageElement = document.getElementById('sign-in-message');
            if (messageElement) {
                messageElement.textContent = 'Signed in successfully!';
                messageElement.className = 'success';
            }
        }
    });
}

// Logout handling
const logoutLink = document.querySelector('a[href="/logout"]');
if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
        e.preventDefault();
        currentUser = {
            username: null,
            usd: 0,
            JJETTCOIN: 0
        };
        updateUserTracker();
        window.location.href = '/login';
    });
} 