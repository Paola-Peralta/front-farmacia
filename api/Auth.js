
document.addEventListener("DOMContentLoaded", () => {

document.getElementById("login-form").addEventListener("submit", async function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    if (!response.ok) {
      throw new Error("Login incorrecto");
    }

    const data = await response.json();

    // Guardar token en localStorage
    localStorage.setItem("accessToken", data.access);
    localStorage.setItem("refreshToken", data.refresh);
    localStorage.setItem("isLoggedIn", "true");

    // Redirigir al dashboard
    window.location.href = "/index.html";
  } catch (error) {
    alert("Error al iniciar sesión: " + error.message);
    console.error(error);
  }
});

});