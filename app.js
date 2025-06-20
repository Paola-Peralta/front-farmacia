
const token = localStorage.getItem("accessToken");
const isLoggedIn = localStorage.getItem("isLoggedIn");


document.addEventListener("DOMContentLoaded", () => {

  // const token = localStorage.getItem("accessToken");
  // const isLoggedIn = localStorage.getItem("isLoggedIn");

  // Si no hay token o no está marcado como logueado, redirige al login
  if (!token || isLoggedIn !== "true") {
    window.location.href = "/Auth/login.html"; // Asegúrate que esta sea la ruta correcta
  }
});


// SIDEBAR DROPDOWN
const allDropdown = document.querySelectorAll('#sidebar .sidebar__dropdown');
const sidebar = document.getElementById('sidebar');

allDropdown.forEach(item=> {
	const a = item.parentElement.querySelector('a:first-child');
	a.addEventListener('click', function (e) {
		e.preventDefault();

		if(!this.classList.contains('active')) {
			allDropdown.forEach(i=> {
				const aLink = i.parentElement.querySelector('a:first-child');

				aLink.classList.remove('active');
				i.classList.remove('show');
			})
		}

		this.classList.toggle('active');
		item.classList.toggle('show');
	})
})


// // SIDEBAR COLLAPSE
const toggleSidebar = document.querySelector('nav .nav__link-sidebar');
const allSideDivider = document.querySelectorAll('#sidebar .sidebar__divisor');

if(sidebar.classList.contains('hidden')) {
	allSideDivider.forEach(item=> {
		item.textContent = '-'
	})
	allDropdown.forEach(item=> {
		const a = item.parentElement.querySelector('a:first-child');
		a.classList.remove('active');
		item.classList.remove('show');
	})
} else {
	allSideDivider.forEach(item=> {
		item.textContent = item.dataset.text;
	})
}

toggleSidebar.addEventListener('click', function () {
	sidebar.classList.toggle('hidden');

	if(sidebar.classList.contains('hidden')) {
		allSideDivider.forEach(item=> {
			item.textContent = '-'
		})

		allDropdown.forEach(item=> {
			const a = item.parentElement.querySelector('a:first-child');
			a.classList.remove('active');
			item.classList.remove('show');
		})
	} else {
		allSideDivider.forEach(item=> {
			item.textContent = item.dataset.text;
		})
	}
})

document.getElementById('logoutLink').addEventListener('click', function(e) {
    e.preventDefault();

    localStorage.clear();
    sessionStorage.clear();

    // Redirigir al login
    window.location.href = '/Auth/login.html';
  });
// // Esperar a que el DOM cargue
// document.addEventListener("DOMContentLoaded", function () {
//   const links = document.querySelectorAll(".sidebar__menu a");
//   const content = document.getElementById("contentMain");

//   links.forEach(link => {
//     link.addEventListener("click", function (e) {
//       const url = this.getAttribute("href");

//       // Verifica que sea una ruta relativa válida
//       if (url && url !== "#") {
//         e.preventDefault(); // Prevenir navegación completa

//         fetch(url)
//           .then(response => {
//             if (!response.ok) throw new Error("Página no encontrada");
//             return response.text();
//           })
//           .then(html => {
//             // Extraer solo el contenido que te interesa
//             const parser = new DOMParser();
//             const doc = parser.parseFromString(html, "text/html");
//             const mainContent = doc.querySelector("main") || doc.body;

//             content.innerHTML = mainContent.innerHTML;
//           })
//           .catch(err => {
//             content.innerHTML = `<p style="color:red">Error cargando contenido</p>`;
//             console.error(err);
//           });
//       }
//     });
//   });
// });

document.querySelectorAll('[data-target]').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.dataset.target;

      // Oculta todas las secciones
      document.querySelectorAll('.main__section').forEach(section => {
        section.style.display = 'none';
      });

      // Muestra la sección correspondiente
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.style.display = 'block';

          if (targetId === 'section-clientes') {
          loadClientes();
          
        }
        if (targetId === 'section-productos') {
          loadProductos();
          
        }
        if (targetId === 'section-factura') {
          loadFacturas();
          
        }
        
        
      }
    });
  });


  document.querySelectorAll('.main__section').forEach(section => {
  section.style.display = 'none';
});

//******************modal cliente******************


const modal = document.querySelector('#modalAPI');
const tbody = document.querySelector('#clientTableBody');
const closeBtn = modal.querySelector('.close-btn');

//Elementos del modal del formulario

const codigo = document.querySelector('#n-codigo');
const nombre = document.querySelector('#n-name');
const pApellido = document.querySelector('#n-fname');
const sApellido = document.querySelector('#n-sname');
const direccion = document.querySelector('#n-address');
const telefono = document.querySelector('#n-phone');

//inicializado las variables globales
let items;
let id;

function openModal(edit = false, index = 0){
     modal.classList.add('active');

    modal.onclick = e => {
        // if (e.target.id === 'modalAPI') {
        //     modal.classList.remove('active');
        // }
        if(e.target.className.indexOf('modalAPI')!== -1)
        {
            modal.classList.remove('active');
        }
    }

    if(edit){
        codigo.value = items[index].codigo
        nombre.value = items[index].nombre
        pApellido.value = items[index].pApellido
        sApellido.value = items[index].sApellido
        direccion.value = items[index].direccion
        telefono.value = items[index].telefono
        id = index

    }

    else{
        codigo.value = ''
        nombre.value = ''
        pApellido.value = ''
        sApellido.value = ''
        direccion.value = ''
        telefono.value = ''
    }
}

// Evento para cerrar al hacer clic en la X
closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
});

//******************MODAL PROOVEDORES******************//

const proveedorModal = document.querySelector('#modalProveedor');
const proveedorTbody = document.querySelector('#ProveedorTableBody');
const proveedorCloseBtn = proveedorModal.querySelector('#close-btn-proveedores');

//Elementos del modal del formulario

const pvCodigo = document.querySelector('#pv-codigo');
const pvNombre = document.querySelector('#pv-name');
const pvApellido = document.querySelector('#pv-fname');
const pvSapellido = document.querySelector('#pv-sname');
const pvCorreo = document.querySelector('#pv-correo');
const pvDireccion = document.querySelector('#pv-address');
const pvTelefono = document.querySelector('#pv-phone');

//inicializado las variables globales
let itemsProveedor;
let idProveedor;

function openModalProveedores(edit = false, index = 0){
     proveedorModal.classList.add('active');

    proveedorModal.onclick = e => {

        if(e.target.className.indexOf('modalProveedor')!== -1)
        {
            proveedorModal.classList.remove('active');
        }
    }

    if(edit){
        pvCodigo.value = itemsProveedor[index].pvCodigo
        pvNombre.value = itemsProveedor[index].pvNombre
        pvApellido.value = itemsProveedor[index].pvApellido
        pvSapellido.value = itemsProveedor[index].pvSapellido
        pvCorreo.value = itemsProveedor[index].pvCorreo
        pvDireccion.value = itemsProveedor[index].pvDireccion
        pvTelefono.value = itemsProveedor[index].pvTelefono
        idProveedor = index

    }

    else{
        pvCodigo.value = ''
        pNombre.value = ''
        pvApellido.value = ''
        pvSapellido.value = ''
        pvCorreo.value = ''
        pvDireccion.value = ''
        pvTelefono.value = ''
    }
}

proveedorCloseBtn.addEventListener('click', () => {
  proveedorModal.classList.remove('active');
});




//******************MODAL PRODUCTOS******************//

const ProductoModal = document.querySelector('#modalProductos');
const ProductotBody = document.querySelector('#productsTableBody');
const ProductoCloseBtn = ProductoModal.querySelector('#close-productos');

//Elementos del modal del formulario

const pCodigo = document.querySelector('#p-codigo');
const pNombre = document.querySelector('#p-name');
const pCantidad = document.querySelector('#cantidad');
const pFechaNacimiento = document.querySelector('#fechaVencimiento');
const pPrecio = document.querySelector('#precio');
const pCategoria = document.querySelector('#categoria');
const pUnidad = document.querySelector('#unidadMedida');
const pPresentacion = document.querySelector('#presentacion');

//inicializado las variables globales
let itemsProductos;
let idProductos;

function openModalProductos(edit = false, index = 0){
     ProductoModal.classList.add('active');

     cargarCategorias();
    cargarMedidas();
    cargarPresentaciones();


    ProductoModal.onclick = e => {
        if(e.target.className.indexOf('modalProductos')!== -1)
        {
            ProductoModal.classList.remove('active');
        }
    }

    if(edit){
        pCodigo.value = itemsProductos[index].pCodigo
        pNombre.value = itemsProductos[index].pNombre
        pCantidad.value = itemsProductos[index].pCantidad
        pFechaNacimiento.value = itemsProductos[index].pFechaNacimiento
        pPrecio.value = itemsProductos[index].pPrecio
        pCategoria.value = itemsProductos[index].pCategoria
        pUnidad.value = itemsProductos[index].pUnidad
        pPresentacion.value = itemsProductos[index].pPresentacion
        idProductos = index

    }

    else{
        pCodigo.value = ''
        pNombre.value = ''
        pCantidad.value = ''
        pFechaNacimiento.value = ''
        pPrecio.value = ''
        pCategoria.value = ''
        pUnidad.value = ''
        pPresentacion.value = ''
    }
}

ProductoCloseBtn.addEventListener('click', () => {
  ProductoModal.classList.remove('active');
});



function cargarCategorias() {
  const token = localStorage.getItem('accessToken');
  fetch('http://127.0.0.1:8000/catalogos/catalogos/categorias/', {
    headers: { 'Authorization': `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById('categoria');
      select.innerHTML = '<option value="">Seleccione</option>';
      data.results.forEach(c => {
        const option = document.createElement('option');
        option.value = c.id;
        option.textContent = c.descripcion;
        select.appendChild(option);
      });
    })
    .catch(err => console.error("Error al cargar categorías:", err));
}

function cargarMedidas() {
  const token = localStorage.getItem('accessToken');
  fetch('http://127.0.0.1:8000/catalogos/catalogos/medidas/', {
    headers: { 'Authorization': `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById('unidadMedida');
      select.innerHTML = '<option value="">Seleccione</option>';
      data.results.forEach(m => {
        const option = document.createElement('option');
        option.value = m.id;
        option.textContent = m.descripcion;
        select.appendChild(option);
      });
    })
    .catch(err => console.error("Error al cargar medidas:", err));
}

function cargarPresentaciones() {
  const token = localStorage.getItem('accessToken');
  fetch('http://127.0.0.1:8000/catalogos/catalogos/presentaciones/', {
    headers: { 'Authorization': `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById('presentacion');
      select.innerHTML = '<option value="">Seleccione</option>';
      data.results.forEach(p => {
        const option = document.createElement('option');
        option.value = p.id;
        option.textContent = p.descripcion;
        select.appendChild(option);
      });
    })
    .catch(err => console.error("Error al cargar presentaciones:", err));
}


// ****************** MODAL FACTURA ****************** //

const facturaModal = document.querySelector('#modalFactura');
const facturaCloseBtn = facturaModal.querySelector('#closeFacturaModal');


function openModalFactura() {
  facturaModal.classList.add('active');

     cargarTiposFactura();
     cargarSucursal();

  // Limpiar campos
   document.querySelector('#codigoFactura').value = '';
  document.querySelector('#fechaFactura').value = new Date().toISOString().split('T')[0];
  document.querySelector('#codigoCliente').value = '';
  document.querySelector('#nombreCliente').value = '';
  document.querySelector('#ivaFactura').value = '15';
  document.querySelector('#descuentoFactura').value = '0';
  document.querySelector('#productoDetalle').value = '';
  document.querySelector('#precioDetalle').value = '';
  document.querySelector('#cantidadDetalle').value = '';

  document.querySelector('#tablaDetalleBody').innerHTML = '';
  document.querySelector('#totalFactura').value = '0.00';
}

facturaCloseBtn.addEventListener('click', () => {
  facturaModal.classList.remove('active');
});


$(document).ready(function() {
  const token = localStorage.getItem('accessToken');

  $('#productoDetalle').select2({
    placeholder: 'Seleccione producto',
    width: '100%',
    ajax: {
      url: 'http://127.0.0.1:8000/catalogos/productos/',
      headers: { 'Authorization': `Bearer ${token}` },
      dataType: 'json',
      delay: 250, 
      data: function(params) {
        return {
          search: params.term, 
          page: params.page || 1
        };
      },
      processResults: function(data, params) {
        params.page = params.page || 1;
        return {
          results: data.results.map(producto => ({
            id: producto.id,
            text: producto.nombreProducto
          })),
          pagination: {
            more: Boolean(data.next)
          }
        };
      },
      cache: true
    },
    minimumInputLength: 1 // mínimo 1 carácter para buscar
  });

  // Evento para actualizar precio cuando cambie producto
  $('#productoDetalle').on('change', function () {
    const productoId = $(this).val();

    if (!productoId) {
      $('#precioDetalle').val('');
      return;
    }

    
    fetch(`http://127.0.0.1:8000/catalogos/productos/${productoId}/`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(producto => {
      $('#precioDetalle').val(producto.precio);
    })
    .catch(() => {
      $('#precioDetalle').val('');
    });
  });
});



//****CARGAR CODIGO DE CLIENTES********** */
$('#codigoCliente').select2({
  placeholder: 'Buscar cliente por código',
  width: '100%',
  ajax: {
    url: 'http://127.0.0.1:8000/catalogos/clientes/',
    headers: { 'Authorization': `Bearer ${token}` },
    dataType: 'json',
    delay: 250,
    data: function (params) {
      return {
        search: params.term,
        page: params.page || 1
      };
    },
    processResults: function (data, params) {
      params.page = params.page || 1;
      return {
        results: data.results.map(cliente => ({
          id: cliente.id,
          text: `${cliente.codigo}`
        })),
        pagination: {
          more: Boolean(data.next)
        }
      };
    },
    cache: true
  },
  minimumInputLength: 1
});


$('#codigoCliente').on('change', function () {
  const clienteId = $(this).val();

  if (!clienteId) {
    $('#nombreCliente').val('');
    return;
  }

  fetch(`http://127.0.0.1:8000/catalogos/clientes/${clienteId}/`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(cliente => {
      $('#nombreCliente').val(cliente.nombres);
    })
    .catch(() => {
      $('#nombreCliente').val('');
    });
});



function cargarTiposFactura() {
  const token = localStorage.getItem('accessToken');

  fetch('http://127.0.0.1:8000/catalogos/tipoFactura/tipoFactura/', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .then(data => {
    const select = document.getElementById('tipoFactura');
    select.innerHTML = '<option value="">Seleccione</option>';

    const resultados = data.results || data; // por si tiene paginación o no
    resultados.forEach(tipo => {
      const option = document.createElement('option');
      option.value = tipo.id;
      option.textContent = tipo.descripcion;
      select.appendChild(option);
    });
  })
  .catch(err => {
    console.error('Error al cargar tipos de factura:', err);
  });
}

function cargarSucursal() {
  const token = localStorage.getItem('accessToken');

  fetch('http://127.0.0.1:8000/catalogos/catalogos/sucursal/', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(res => res.json())
  .then(data => {
    const select = document.getElementById('sucursalFactura');
    select.innerHTML = '<option value="">Seleccione</option>';

    const resultados = data.results || data; // por si tiene paginación o no
    resultados.forEach(sucursal => {
      const option = document.createElement('option');
      option.value = sucursal.id;
      option.textContent = sucursal.nombre;
      select.appendChild(option);
    });
  })
  .catch(err => {
    console.error('Error al cargar sucursales:', err);
  });
}