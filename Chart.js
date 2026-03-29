<canvas id="progressChart" width="400" height="200"></canvas>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
const ctx = document.getElementById('progressChart').getContext('2d');
const chart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['المرحلة 1', 'المرحلة 2', 'المرحلة 3'],
        datasets: [{
            label: 'نسبة الإنجاز %',
            data: [70, 40, 90],
            backgroundColor: ['#4caf50','#2196f3','#ff9800']
        }]
    },
    options: {
        scales: { y: { beginAtZero: true, max: 100 } }
    }
});
</script>
