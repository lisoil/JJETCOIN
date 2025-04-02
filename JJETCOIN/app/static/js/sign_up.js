document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.querySelector('form');
    const password1 = document.getElementById('password1');
    const password2 = document.getElementById('password2');
    const email = document.getElementById('email');
    const firstName = document.getElementById('firstName');
    
    // Password validation function
    function validatePassword(password) {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /\d/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        return password.length >= minLength && 
               hasUpperCase && 
               hasLowerCase && 
               hasNumbers && 
               hasSpecialChar;
    }
    
    // Email validation function
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show error message function
    function showError(element, message) {
        let errorDiv = element.nextElementSibling;
        if (!errorDiv || !errorDiv.classList.contains('error-message')) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            element.parentNode.insertBefore(errorDiv, element.nextSibling);
        }
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
    }
    
    // Hide error message function
    function hideError(element) {
        const errorDiv = element.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('error-message')) {
            errorDiv.style.display = 'none';
        }
    }
    
    // Real-time validation
    password1.addEventListener('input', function() {
        if (!validatePassword(this.value)) {
            showError(this, 'Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters');
        } else {
            hideError(this);
        }
    });
    
    password2.addEventListener('input', function() {
        if (this.value !== password1.value) {
            showError(this, 'Passwords do not match');
        } else {
            hideError(this);
        }
    });
    
    email.addEventListener('input', function() {
        if (!validateEmail(this.value)) {
            showError(this, 'Please enter a valid email address');
        } else {
            hideError(this);
        }
    });
    
    firstName.addEventListener('input', function() {
        if (this.value.length < 2) {
            showError(this, 'First name must be at least 2 characters long');
        } else {
            hideError(this);
        }
    });
    
    // Form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        let isValid = true;
        
        if (!validateEmail(email.value)) {
            showError(email, 'Please enter a valid email address');
            isValid = false;
        }
        
        if (firstName.value.length < 2) {
            showError(firstName, 'First name must be at least 2 characters long');
            isValid = false;
        }
        
        if (!validatePassword(password1.value)) {
            showError(password1, 'Password must be at least 8 characters long and contain uppercase, lowercase, numbers, and special characters');
            isValid = false;
        }
        
        if (password1.value !== password2.value) {
            showError(password2, 'Passwords do not match');
            isValid = false;
        }
        
        if (isValid) {
            // Here you would typically make an API call to your backend
            // For now, we'll just simulate a successful signup
            const newUser = {
                email: email.value,
                firstName: firstName.value,
                balance: 1000, // Starting balance
                JJETTCOIN: 0
            };
            
            // Store user in localStorage
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            
            // Redirect to home page
            window.location.href = '/';
        }
    });
}); 