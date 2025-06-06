const toggle = document.querySelector(".toggle");
const menuDashboard = document.querySelector(".menu-dashboard");
const iconoMenu = toggle.querySelector("i");
const enlacesMenu = document.querySelectorAll(".enlace");
const contenedor = document.getElementById("contenido-principal");

toggle.addEventListener("click", () => {
  menuDashboard.classList.toggle("open");
  if (iconoMenu.classList.contains("bx-menu")) {
    iconoMenu.classList.replace("bx-menu", "bx-x");
  } else {
    iconoMenu.classList.replace("bx-x", "bx-menu");
  }
});

// enlacesMenu.forEach((enlace) => {
//   enlace.addEventListener("click", () => {
//     const seccion = enlace.getAttribute("data-seccion"); // ej: "clientes"
//     fetch(`pages/${seccion}.html`)
//       .then(res => res.text())
//       .then(html => {
//         contenedor.innerHTML = html; // Muestra el contenido en el div
//       });
//   });
// });

// window.addEventListener("DOMContentLoaded", () => {
//   fetch("pages/inicio.html")
//     .then(res => res.text())
//     .then(html => {
//       contenedor.innerHTML = html;
//     });
// });