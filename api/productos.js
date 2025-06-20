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

        //ELIMINAR
        const deleteIcon = tr.querySelector('.bx-trash');
        deleteIcon.addEventListener('click', () => {
          const id = deleteIcon.getAttribute('data-id');

          Swal.fire({
            title: '¿Estás seguro?',
            text: "Esta acción no se puede deshacer.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar'
          }).then((result) => {
            if (result.isConfirmed) {
              fetch(`http://127.0.0.1:8000/catalogos/productos/${id}/`, {
                method: 'DELETE',
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
              })
                .then(response => {
                  if (!response.ok) {
                    throw new Error('Error al eliminar');
                  }
                  Swal.fire(
                    '¡Eliminado!',
                    'El producto ha sido eliminado.',
                    'success'
                  );
                  loadProductos(); // Recargar tabla
                })
                .catch(error => {
                  console.error('Error eliminando producto:', error);
                  Swal.fire(
                    'Error',
                    'No se pudo eliminar el producto.',
                    'error'
                  );
                });
            }
          });
        });


        //  EDITAR
        const editIcon = tr.querySelector('.bx-edit');
        editIcon.addEventListener('click', () => {
          document.getElementById('productoId').value = producto.id;
          document.getElementById('p-codigo').value = producto.codigoProducto;
          document.getElementById('p-name').value = producto.nombreProducto;
          document.getElementById('cantidad').value = producto.cantidad;
          document.getElementById('fechaVencimiento').value = producto.fechaVencimiento
          document.getElementById('precio').value = producto.precio;

          document.getElementById('categoria').value = producto.categoria_id || '';
            document.getElementById('unidadMedida').value = producto.medidas_id || '';
            document.getElementById('presentacion').value = producto.presentaciones_id || '';

          document.getElementById('modalProductos').classList.add('active');
        });
 
      });

      // renderPaginationProductos(data.previous, data.next);
    })
    .catch(error => {
      console.error('Error loading Productos:', error);
    });
}

//  GUARDAR O ACTUALIZAR
const productoForm  = document.getElementById('productosForm');

productoForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const token = localStorage.getItem('accessToken');
  const id = document.getElementById('productoId').value;

  const categoriaValue = document.getElementById('categoria').value;
  const medidasValue = document.getElementById('unidadMedida').value;
  const presentacionValue = document.getElementById('presentacion').value;

  const productoData = {
    codigoProducto: document.getElementById('p-codigo').value,
    nombreProducto: document.getElementById('p-name').value,
    cantidad: document.getElementById('cantidad').value,
    fechaVencimiento: document.getElementById('fechaVencimiento').value,
    precio: document.getElementById('precio').value,
    categoria_id: categoriaValue, // ID del select
    medidas_id: medidasValue,
    presentaciones_id: presentacionValue
  };

  const method = id ? 'PUT' : 'POST';
  const url = id
    ? `http://127.0.0.1:8000/catalogos/productos/${id}/`
    : 'http://127.0.0.1:8000/catalogos/productos/';

  fetch(url, {
    method: method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productoData)
  })
    .then(response => {
      if (!response.ok) {
        return response.json().then(data => {
          throw new Error(JSON.stringify(data));
        });
      }
      return response.json();
    })
    .then(data => {
      Swal.fire({
        icon: 'success',
        title: id ? 'Producto actualizado' : 'Producto registrado',
        showConfirmButton: false,
        timer: 1500
      });

      productoForm.reset();
      document.getElementById('productoId').value = '';
      document.getElementById('modalProductos').classList.remove('active');
      loadProductos();
    })
    .catch(error => {
      console.error('Error al guardar producto:', error);
      Swal.fire('Error', 'No se pudo guardar el producto.', 'error');
    });
});

// //  PAGINACIÓN
// function renderPagination(previous, next) {
//   const container = document.getElementById('paginationButtons');
//   container.innerHTML = '';

//   if (previous) {
//     const prevBtn = document.createElement('button');
//     prevBtn.textContent = 'Anterior';
//     prevBtn.addEventListener('click', () => loadProductos(previous));
//     container.appendChild(prevBtn);
//   }

//   if (next) {
//     const nextBtn = document.createElement('button');
//     nextBtn.textContent = 'Siguiente';
//     nextBtn.addEventListener('click', () => loadProductos(next));
//     container.appendChild(nextBtn);
//   }
// }
