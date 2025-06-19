function loadProductos(url = 'http://127.0.0.1:8000/catalogos/productos/') {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    console.error('No token found, user not authenticated');
    return;
  }

  fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const tbody = document.getElementById('productsTableBody');
      tbody.innerHTML = '';

      data.results.forEach(producto => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${producto.codigoProducto}</td>
          <td>${producto.nombreProducto}</td>
          <td>${producto.cantidad}</td>
          <td>${producto.fechaVencimiento}</td>
          <td>${producto.precio}</td>
          <td>${producto.categoria || '-'}</td>
          <td>${producto.medidas || '-'}</td>
          <td>${producto.presentaciones || '-'}</td>
          <td class="edit"><i class='bx bx-edit' data-id="${producto.id}"></i></td>
          <td class="edit"><i class='bx bx-trash' data-id="${producto.id}"></i></td>
        `;
        tbody.appendChild(tr);
 
      });

      

      renderPagination(data.previous, data.next);
    })
    .catch(error => {
      console.error('Error loading Productos:', error);
    });
}
