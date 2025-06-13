
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



// Esperar a que el DOM cargue
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
