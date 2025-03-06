fetch('http://127.0.0.1:8000/api/mission-descriptions/')
    .then(response => response.json())
    .then(data => {
        const labels = data.map(mission => mission.mission_name);
        const altitudes = data.map(mission => mission.altitude);

        const ctx = document.getElementById('myChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Altitude',
                    data: altitudes,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });