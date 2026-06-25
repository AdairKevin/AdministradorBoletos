document.addEventListener("DOMContentLoaded", async () => {
  const contenedor = document.getElementById("lista");

  try {
    // 1. Cargar JSON (asegúrate de que el archivo se llame links.json o cambia el nombre aquí)
    const res = await fetch("./files/links.json");
    const data = await res.json();

    // 2. Recorrer todos los invitados (como 'data' es un Array, usamos un forEach directo)
    data.forEach((invitado) => {
      // Tomamos el link directamente de los datos del JSON
      const link = invitado.url;

      // 3. Crear tarjeta
      const card = document.createElement("div");
      card.classList.add("card");

      // Opcional: Agregué la información de los pases a la tarjeta para que la veas
      card.innerHTML = `
        <div class="name"><strong>${invitado.nombre}</strong></div>
        <div class="pases">Adultos: ${invitado.pasesAdulto} | Niños: ${invitado.pasesNino}</div>
        <div class="link">${link}</div>

        <div class="buttons">
          <button class="copy">📋 Copiar</button>
          <button class="whatsapp">💬 WhatsApp</button>
        </div>
      `;

      // 4. Botón copiar
      card.querySelector(".copy").addEventListener("click", () => {
        navigator.clipboard.writeText(link);
        alert("Link copiado de " + invitado.nombre);
      });

      // 5. Botón WhatsApp
      card.querySelector(".whatsapp").addEventListener("click", () => {
        const mensaje = `Hola ${invitado.nombre}, aquí está tu invitación: ${link}`;
        const url = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;

        window.open(url, "_blank");
      });

      // 6. Agregar al DOM
      contenedor.appendChild(card);
    });
  } catch (error) {
    console.error("Hubo un problema con la petición Fetch:", error);
    contenedor.innerHTML =
      "<p>Error cargando invitados. Revisa la consola para más detalles.</p>";
  }
});
