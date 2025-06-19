// ****GET********//

function loadClientes() {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    console.error('No token found, user not authenticated');
    return;
  }

  fetch('http://127.0.0.1:8000/catalogos/clientes/', {
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
      console.log("CLIENTES API DATA:", data);
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
          <td class="edit"><i class='bx bx-edit'></i></td>
          <td class="edit"><i class='bx bx-trash'></i></td>
        `;
        tbody.appendChild(tr);
      });

      renderPagination(data.previous, data.next);
    })
    .catch(error => {
      console.error('Error loading clientes:', error);
    });
}


//******************POST*************************** */

// Escucha el evento submit del formulario
const form = document.getElementById('clientsForm');

form.addEventListener('submit', function (e) {
  e.preventDefault(); // evita que recargue la página

  const token = localStorage.getItem('accessToken');

  // Capturar los valores del formulario
  const codigo = document.getElementById('n-codigo').value;
  const nombres = document.getElementById('n-name').value;
  const primerApellido = document.getElementById('n-fname').value;
  const segundoApellido = document.getElementById('n-sname').value;
  const direccion = document.getElementById('n-address').value;
  const telefono = document.getElementById('n-phone').value;

  const clienteData = {
    codigo,
    nombres,
    primerApellido,
    segundoApellido,
    direccion,
    telefono
  };

  fetch('http://127.0.0.1:8000/catalogos/clientes/', {
    method: 'POST',
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
      alert('Cliente registrado con éxito');

      const modal = document.getElementById('modalAPI');
      modal.classList.remove('active'); // Cierra el modal

      form.reset(); // Limpia el formulario
      loadClientes(); // Recarga la tabla
    })
    .catch(error => {
      console.error('Error al registrar cliente:', error);
      alert('Error al registrar cliente. ');
    });
});