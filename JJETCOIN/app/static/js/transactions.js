// JJETTCOIN value simulation
let JJETTCOINValue = 50; // Starting value
const JJETTCOINHistory = [];
const JJETTCOINLabels = [];
const maxHistoryLength = 10;
const volatility = 0.20;
const drift = -0.03;

// Initialize chart
const ctx = document.getElementById('JJETTCOIN-value-chart').getContext('2d');
const JJETTCOINChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: JJETTCOINLabels,
        datasets: [{
            label: 'JJETTCOIN Value (USD)',
            data: JJETTCOINHistory,
            borderColor: 'rgba(0, 123, 255, 1)',
            backgroundColor: 'rgba(0, 123, 255, 0.1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: false,
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#fff'
                }
            },
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                },
                ticks: {
                    color: '#fff'
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    color: '#fff'
                }
            }
        }
    }
});

function updateJJETTCOINValue() {
    const randomChange = (Math.random() - 0.5) * volatility * JJETTCOINValue;
    const driftChange = drift * JJETTCOINValue;
    JJETTCOINValue = Math.max(0.01, JJETTCOINValue + randomChange + driftChange);
    
    JJETTCOINValue = Math.round(JJETTCOINValue * 100) / 100;
    document.getElementById('JJETTCOIN-value').innerText = JJETTCOINValue.toFixed(2);

    JJETTCOINHistory.push(JJETTCOINValue);
    JJETTCOINLabels.push(new Date().toLocaleTimeString());

    if (JJETTCOINHistory.length > maxHistoryLength) {
        JJETTCOINHistory.shift();
        JJETTCOINLabels.shift();
    }

    JJETTCOINChart.update();
}

// Handle buying JJETTCOIN
function handleBuy(event) {
    event.preventDefault();
    const amount = parseFloat(document.getElementById('buy-amount').value);
    const totalCost = Math.floor((amount * JJETTCOINValue) * 100) / 100;
    const currentUser = sessionStorage.getItem('currentUser');
    const userData = JSON.parse(sessionStorage.getItem('userData')) || {};
    
    if (currentUser && userData[currentUser] && userData[currentUser].balance >= totalCost) {
        userData[currentUser].JJETTCOIN += amount;
        userData[currentUser].balance -= totalCost;
        
        if (!userData[currentUser].transactions) {
            userData[currentUser].transactions = [];
        }
        userData[currentUser].transactions.push({
            type: 'buy',
            amount: -totalCost,
            JJETTCOIN: amount,
            price: JJETTCOINValue,
            timestamp: new Date().toISOString()
        });
        
        sessionStorage.setItem('userData', JSON.stringify(userData));
        document.getElementById('transaction-message').innerText = `Bought ${amount} JJETTCOIN for ${totalCost.toFixed(2)} USD!`;
        updateUserTracker();
    } else {
        document.getElementById('transaction-message').innerText = 'Insufficient funds!';
    }
}

// Handle selling JJETTCOIN
function handleSell(event) {
    event.preventDefault();
    const amount = parseFloat(document.getElementById('sell-amount').value);
    const totalRevenue = Math.floor((amount * JJETTCOINValue) * 100) / 100;
    const currentUser = sessionStorage.getItem('currentUser');
    const userData = JSON.parse(sessionStorage.getItem('userData')) || {};
    
    if (currentUser && userData[currentUser] && userData[currentUser].JJETTCOIN >= amount) {
        userData[currentUser].JJETTCOIN -= amount;
        userData[currentUser].balance += totalRevenue;
        
        if (!userData[currentUser].transactions) {
            userData[currentUser].transactions = [];
        }
        userData[currentUser].transactions.push({
            type: 'sell',
            amount: totalRevenue,
            JJETTCOIN: -amount,
            price: JJETTCOINValue,
            timestamp: new Date().toISOString()
        });
        
        sessionStorage.setItem('userData', JSON.stringify(userData));
        document.getElementById('transaction-message').innerText = `Sold ${amount} JJETTCOIN for ${totalRevenue.toFixed(2)} USD!`;
        updateUserTracker();
    } else {
        document.getElementById('transaction-message').innerText = 'Insufficient JJETTCOIN!';
    }
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Add buy/sell form listeners
    const buyForm = document.getElementById('buy-form');
    if (buyForm) {
        buyForm.addEventListener('submit', handleBuy);
    }

    const sellForm = document.getElementById('sell-form');
    if (sellForm) {
        sellForm.addEventListener('submit', handleSell);
    }

    // Start JJETTCOIN value updates
    setInterval(updateJJETTCOINValue, 5000);
    updateJJETTCOINValue();
}); 