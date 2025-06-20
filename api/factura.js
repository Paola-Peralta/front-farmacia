function loadFacturas(url = 'http://127.0.0.1:8000/movimientos/facturas/') {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    console.error('No token found');
    return;
  }

  fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    }
  })
  .then(res => res.json())
  .then(data => {
    const tbody = document.getElementById('facturaTableBody');
    tbody.innerHTML = '';

    data.results.forEach(factura => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${factura.codigo}</td>
        <td>${factura.fecha}</td>
        <td>${factura.cliente_nombre}</td>
        <td>${factura.tipo_factura}</td>
        <td>${factura.sucursal_nombre}</td>
        <td>${factura.iva}%</td>
        <td>${factura.descuento}%</td>
        <td class="edit"><i class='bx bx-detail' data-detalles='${JSON.stringify(factura.detalles)}'></i></td>
      `;
      tbody.appendChild(tr);



    const detailIcon = tr.querySelector('.bx-detail');
    detailIcon.addEventListener('click', () => {
    mostrarDetalleFactura(factura); 
    });

    });
    const pageMatch = url.match(/page=(\d+)/);
      const currentPage = pageMatch ? parseInt(pageMatch[1]) : 1;

      renderPaginationFactura(currentPage, data.count, 10);
  })

  
  .catch(err => {
    console.error('Error cargando facturas:', err);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudieron cargar las facturas.'
    });
  });
}


function mostrarDetalleFactura(factura) {
  let tabla = document.getElementById('tablaDetalleBody');
  if (!tabla) {
    console.warn('Elemento tablaDetalleBody no encontrado');
    return;
  }

  document.getElementById('codigoFactura').value = factura.codigo;
  document.getElementById('fechaFactura').value = factura.fecha;
  document.getElementById('codigoCliente').value = factura.clienteId;
  document.getElementById('nombreCliente').value = factura.cliente_nombre;
  document.getElementById('ivaFactura').value = factura.iva;
  document.getElementById('descuentoFactura').value = factura.descuento;
  document.getElementById('sucursalFactura').value = factura.sucursal;
  document.getElementById('tipoFactura').value = factura.tipoFacturaId;

  tabla.innerHTML = '';
  factura.detalles.forEach(item => {
    const tr = document.createElement('tr');
    const total = (item.precio * item.cantidad).toFixed(2);

    tr.innerHTML = `
      <td>${item.producto_nombre}</td>
      <td>${item.precio}</td>
      <td>${item.cantidad}</td>
      <td>${total}</td>
      <td><button class="btn-eliminar-detalle">X</button></td>
    `;
    tabla.appendChild(tr);
  });


 document.getElementById('totalFactura').value = factura.detalles.reduce((acc, curr) => acc + curr.precio * curr.cantidad, 0).toFixed(2);

  document.getElementById('modalFactura').classList.add('active');
}


let detallesFactura = [];

document.getElementById('btnAgregarDetalle').addEventListener('click', () => {
  const productoId = parseInt(document.getElementById('productoDetalle').value);
  const productoText = $('#productoDetalle option:selected').text();
  const precio = parseFloat(document.getElementById('precioDetalle').value);
  const cantidad = parseInt(document.getElementById('cantidadDetalle').value);

  if (!productoId || isNaN(precio) || isNaN(cantidad)) {
    Swal.fire({
      icon: 'warning',
      title: 'Campos incompletos',
      text: 'Completa todos los campos del detalle antes de agregar.'
    });
    return;
  }

  detallesFactura.push({
    producto: productoId,
    cantidad,
    precio
  });

  const tr = document.createElement('tr');
  const total = precio * cantidad;
  tr.innerHTML = `
    <td>${productoText}</td>
    <td>${precio.toFixed(2)}</td>
    <td>${cantidad}</td>
    <td>${total.toFixed(2)}</td>
    <td><button class="btn-eliminar-detalle">X</button></td>
  `;
  document.getElementById('tablaDetalleBody').appendChild(tr);

  actualizarTotal();
});

function actualizarTotal() {
  const total = detallesFactura.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  document.getElementById('totalFactura').value = total.toFixed(2);
}

document.getElementById('facturaForm').addEventListener('submit', async function(e) {
  e.preventDefault();

  const token = localStorage.getItem('accessToken');

  const data = {
    codigo: document.getElementById('codigoFactura').value,
    fecha: document.getElementById('fechaFactura').value,
    iva: 0,  
    descuento: 0, 
    clienteId: parseInt(document.getElementById('codigoCliente').value),
    tipoFacturaId: parseInt(document.getElementById('tipoFactura').value),
    sucursal: parseInt(document.getElementById('sucursalFactura').value),
    detalles: detallesFactura
  };

  try {
    const response = await fetch('http://127.0.0.1:8000/movimientos/facturas/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error al guardar la factura:', errorData);
      Swal.fire({
        icon: 'error',
        title: 'Error al guardar',
        text: errorData?.Error || 'Verifica los campos o stock disponible.'
      });
      return;
    }

     Swal.fire({
      icon: 'success',
      title: 'Factura registrada',
      text: 'Se ha guardado correctamente.',
      timer: 2000,
      showConfirmButton: false
    });


    document.getElementById('modalFactura').classList.remove('active');
    detallesFactura = [];  // limpiar
    document.getElementById('facturaForm').reset();
    loadFacturas(); 
  } catch (err) {
    console.error('Error de red:', err);
    Swal.fire({
      icon: 'error',
      title: 'Error de red',
      text: 'No se pudo conectar con el servidor.'
    });
  }
});

// Delegación para eliminar detalles dinámicamente
document.getElementById('tablaDetalleBody').addEventListener('click', function (e) {
  if (e.target && e.target.classList.contains('btn-eliminar-detalle')) {
    e.preventDefault();

    const fila = e.target.closest('tr');
    const index = Array.from(fila.parentNode.children).indexOf(fila);

    if (index > -1) {
      detallesFactura.splice(index, 1);
      fila.remove(); 
      actualizarTotal();
    }
  }
});

function renderPaginationFactura(currentPage, totalItems, pageSize = 10) {
  const container = document.getElementById('paginationButtons--facturas');
  container.innerHTML = '';

  const totalPages = Math.ceil(totalItems / pageSize);

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.textContent = i;
    btn.classList.add('pagination-btn');
    if (i === currentPage) btn.classList.add('active');

    btn.addEventListener('click', () => {
      loadFacturas(`http://127.0.0.1:8000/movimientos/facturas/?page=${i}`);
    });

    container.appendChild(btn);
  }
}
