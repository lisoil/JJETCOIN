document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Basic validation
        if (!email || !password) {
            showError('Please fill in all fields');
            return;
        }
        
        // Here you would typically make an API call to your backend
        // For now, we'll just simulate a successful login
        const currentUser = {
            email: email,
            balance: 1000, // Starting balance
            JJETTCOIN: 0
        };
        
        // Store user in localStorage
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        
        // Redirect to home page
        window.location.href = '/';
    });
    
    function showError(message) {
        const alertDiv = document.createElement('div');
        alertDiv.className = 'alert alert-danger alert-dismissible fade show';
        alertDiv.role = 'alert';
        alertDiv.innerHTML = `
            ${message}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        `;
        
        loginForm.insertBefore(alertDiv, loginForm.firstChild);
        
        // Remove alert after 5 seconds
        setTimeout(() => {
            alertDiv.remove();
        }, 5000);
    }
}); 