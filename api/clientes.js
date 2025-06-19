

function loadClientes(url = 'http://127.0.0.1:8000/catalogos/clientes/') {
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
      const tbody = document.getElementById('clientTableBody');
      tbody.innerHTML = '';

      data.results.forEach(cliente => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${cliente.codigo}</td>
          <td>${cliente.nombres}</td>
          <td>${cliente.primerApellido}</td>
          <td>${cliente.segundoApellido}</td>
          <td>${cliente.direccion}</td>
          <td>${cliente.telefono}</td>
          <td class="edit"><i class='bx bx-edit' data-id="${cliente.id}"></i></td>
          <td class="edit"><i class='bx bx-trash' data-id="${cliente.id}"></i></td>
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
              fetch(`http://127.0.0.1:8000/catalogos/clientes/${id}/`, {
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
                    'El cliente ha sido eliminado.',
                    'success'
                  );
                  loadClientes(); // Recargar tabla
                })
                .catch(error => {
                  console.error('Error eliminando cliente:', error);
                  Swal.fire(
                    'Error',
                    'No se pudo eliminar el cliente.',
                    'error'
                  );
                });
            }
          });
        });

        // ✏️ EDITAR
        const editIcon = tr.querySelector('.bx-edit');
        editIcon.addEventListener('click', () => {
          document.getElementById('clientId').value = cliente.id;
          document.getElementById('n-codigo').value = cliente.codigo;
          document.getElementById('n-name').value = cliente.nombres;
          document.getElementById('n-fname').value = cliente.primerApellido;
          document.getElementById('n-sname').value = cliente.segundoApellido;
          document.getElementById('n-address').value = cliente.direccion;
          document.getElementById('n-phone').value = cliente.telefono;

          document.getElementById('modalAPI').classList.add('active');
        });
      });

      renderPagination(data.previous, data.next);
    })
    .catch(error => {
      console.error('Error loading clientes:', error);
    });
}

//  GUARDAR O ACTUALIZAR
const form = document.getElementById('clientsForm');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const token = localStorage.getItem('accessToken');
  const id = document.getElementById('clientId').value;

  const clienteData = {
    codigo: document.getElementById('n-codigo').value,
    nombres: document.getElementById('n-name').value,
    primerApellido: document.getElementById('n-fname').value,
    segundoApellido: document.getElementById('n-sname').value,
    direccion: document.getElementById('n-address').value,
    telefono: document.getElementById('n-phone').value
  };

  const method = id ? 'PUT' : 'POST';
  const url = id
    ? `http://127.0.0.1:8000/catalogos/clientes/${id}/`
    : 'http://127.0.0.1:8000/catalogos/clientes/';

  fetch(url, {
    method: method,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(clienteData)
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
        title: id ? 'Cliente actualizado' : 'Cliente registrado',
        showConfirmButton: false,
        timer: 1500
      });

      form.reset();
      document.getElementById('clientId').value = '';
      document.getElementById('modalAPI').classList.remove('active');
      loadClientes();
    })
    .catch(error => {
      console.error('Error al guardar cliente:', error);
      Swal.fire('Error', 'No se pudo guardar el cliente.', 'error');
    });
});

//  PAGINACIÓN
function renderPagination(previous, next) {
  const container = document.getElementById('paginationButtons');
  container.innerHTML = '';

  if (previous) {
    const prevBtn = document.createElement('button');
    prevBtn.textContent = 'Anterior';
    prevBtn.addEventListener('click', () => loadClientes(previous));
    container.appendChild(prevBtn);
  }

  if (next) {
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Siguiente';
    nextBtn.addEventListener('click', () => loadClientes(next));
    container.appendChild(nextBtn);
  }
}
