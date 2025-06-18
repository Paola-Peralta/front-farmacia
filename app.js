document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("accessToken");
  const isLoggedIn = localStorage.getItem("isLoggedIn");

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


// // Esperar a que el DOM cargue
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".sidebar__menu a");
  const content = document.getElementById("contentMain");

  links.forEach(link => {
    link.addEventListener("click", function (e) {
      const url = this.getAttribute("href");

      // Verifica que sea una ruta relativa válida
      if (url && url !== "#") {
        e.preventDefault(); // Prevenir navegación completa

        fetch(url)
          .then(response => {
            if (!response.ok) throw new Error("Página no encontrada");
            return response.text();
          })
          .then(html => {
            // Extraer solo el contenido que te interesa
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const mainContent = doc.querySelector("main") || doc.body;

            content.innerHTML = mainContent.innerHTML;
          })
          .catch(err => {
            content.innerHTML = `<p style="color:red">Error cargando contenido</p>`;
            console.error(err);
          });
      }
    });
  });
});

document.querySelectorAll('.sidebar__dropdown a').forEach(link => {
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
      }
    });
  });


  document.querySelectorAll('.main__section').forEach(section => {
  section.style.display = 'none';
});

//******************modal cliente******************

console.log("clientes.js cargado");

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