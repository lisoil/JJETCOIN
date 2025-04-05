document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const exchangeForm = document.getElementById('exchangeForm');
    const amountInput = document.getElementById('amount');
    const messageDiv = document.getElementById('message');
    const rateDisplay = document.getElementById('rateDisplay');

    // Update rate display
    function updateRateDisplay() {
        const rate = 0.0001; // Current exchange rate
        rateDisplay.innerHTML = `<p>Current Rate: <span>1 JJETTCOIN = $${rate.toFixed(4)}</span></p>`;
    }

    // Handle form submission
    exchangeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const amount = parseFloat(amountInput.value);
        if (isNaN(amount) || amount <= 0) {
            showMessage('Please enter a valid amount', 'error');
            return;
        }

        // Get current user from localStorage
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (!currentUser) {
            showMessage('Please log in to exchange JJETTCOIN', 'error');
            return;
        }

        // Calculate exchange amount
        const rate = 0.0001;
        const exchangeAmount = amount * rate;

        // Check if user has enough balance
        if (exchangeAmount > currentUser.balance) {
            showMessage('Insufficient balance', 'error');
            return;
        }

        // Update user balance
        currentUser.balance -= exchangeAmount;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));

        // Update user tracker
        updateUserTracker();

        // Show success message
        showMessage(`Successfully exchanged ${amount} JJETTCOIN for $${exchangeAmount.toFixed(2)}`, 'success');
        
        // Reset form
        exchangeForm.reset();
    });

    // Show message function
    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = `exchange-message ${type}-message`;
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = 'exchange-message';
        }, 5000);
    }

    // Initialize rate display
    updateRateDisplay();
}); 