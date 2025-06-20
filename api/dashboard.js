const dashboardToken  = localStorage.getItem('accessToken');


const baseUrl = 'http://127.0.0.1:8000/movimientos/facturas/dashboard';

function fetchAndDisplay(endpoint, elementId, formatValue = (v) => v) {
fetch(`${baseUrl}/${endpoint}/`, {
  headers: {
    Authorization: `Bearer ${dashboardToken}`
  }
})
    .then(res => res.json())
    .then(data => {
      const el = document.querySelector(`#${elementId} .value`);
      el.textContent = formatValue(Object.values(data)[1] || Object.values(data)[0]);
    })
    .catch(err => {
     console.error(`Error cargando ${endpoint}:`, err);
    });
}


fetchAndDisplay('ventas-anuales', 'ventas-anuales');
fetchAndDisplay('total-ingresos', 'total-ingresos', (v) => `$${parseFloat(v).toFixed(2)}`);
fetchAndDisplay('producto-top', 'producto-top', (v) => `${v}`);

// Gráfico de ventas por mes
fetch(`${baseUrl}/ventas-mensuales/`, {
  headers: {
    Authorization: `Bearer ${dashboardToken}`
  }
})
  .then(res => res.json())
  .then(data => {
    const ctx = document.getElementById('ventasMensualesChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: data.meses,
        datasets: [{
          label: 'Ventas por mes',
          data: data.ventas,
          backgroundColor: '#4e73df',
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              stepSize: 1
            }
          }
        }
      }
    });
  })
  .catch(err => {
    console.error('Error cargando gráfico de ventas mensuales:', err);
  });