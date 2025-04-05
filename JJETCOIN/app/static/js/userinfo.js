// Calculate and update statistics
function updateStats(username) {
    const userData = JSON.parse(sessionStorage.getItem('userData')) || {};
    const user = userData[username];
    
    if (!user || !user.transactions) return;

    let totalWinnings = 0;
    let totalLosses = 0;
    let weeklyWinnings = [0, 0, 0, 0]; // Last 4 weeks
    let weeklyLosses = [0, 0, 0, 0];   // Last 4 weeks

    // Calculate totals and weekly breakdowns
    user.transactions.forEach(transaction => {
        const amount = transaction.amount;
        const timestamp = new Date(transaction.timestamp);
        const weekIndex = Math.min(3, Math.floor((Date.now() - timestamp) / (7 * 24 * 60 * 60 * 1000)));

        if (amount > 0) {
            totalWinnings += amount;
            weeklyWinnings[weekIndex] += amount;
        } else {
            totalLosses += Math.abs(amount);
            weeklyLosses[weekIndex] += Math.abs(amount);
        }
    });

    // Update the display
    document.getElementById('total-winnings').innerText = `$${totalWinnings.toFixed(2)}`;
    document.getElementById('total-losses').innerText = `$${totalLosses.toFixed(2)}`;
    document.getElementById('net-profit').innerText = `$${(totalWinnings - totalLosses).toFixed(2)}`;

    // Update the chart
    chart.data.datasets[0].data = weeklyWinnings;
    chart.data.datasets[1].data = weeklyLosses;
    chart.update();
}

// Initialize chart
const ctxWinnings = document.getElementById('winnings-losses-chart').getContext('2d');
const chart = new Chart(ctxWinnings, {
    type: 'line',
    data: {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        datasets: [{
            label: 'Winnings',
            data: [0, 0, 0, 0],
            borderColor: 'green',
            fill: false,
            tension: 0.4
        }, {
            label: 'Losses',
            data: [0, 0, 0, 0],
            borderColor: 'red',
            fill: false,
            tension: 0.4
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
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

// Initialize event listeners
document.addEventListener('DOMContentLoaded', function() {
    const currentUser = sessionStorage.getItem('currentUser');
    if (currentUser) {
        updateStats(currentUser);
    }
}); 