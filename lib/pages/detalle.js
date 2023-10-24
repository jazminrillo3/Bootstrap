import { getTicket } from "../service/tickets.js";

const id = new URLSearchParams(window.location.search).get("id");

const ticket_image = document.getElementById("ticket-image");
const ticket_title = document.getElementById("ticket-title");
const ticket_time = document.getElementById("ticket-time");
const ticket_responsable = document.getElementById("ticket-responsable");
const ticket_description = document.getElementById("ticket-description");
const ticket_state = document.getElementById("ticket-selected-state");
const ticket_dropdown = document.getElementById("ticket-dropdown");

const findTicket = async () => {
  return await getTicket(id);
};

const fillDetailTicket = async () => {
  const ticket = await findTicket();
  if (ticket) {
    ticket_image.src = ticket.imagen;
    ticket_title.innerText = ticket.titulo;
    ticket_time.innerText += ` ${ticket.tiempo} ${
      ticket.tiempo == 1 ? " día" : "días"
    }`;
    ticket_responsable.innerText += " " + ticket.responsable;
    ticket_description.innerText = ticket.descripcion;
    ticket_state.innerText = ticket.estado;

    if (ticket.estado == "Por Hacer") {
      ticket_state.className = "btn btn-primary";
      ticket_dropdown.className =
        "btn btn-primary dropdown-toggle dropdown-toggle-split";
    } else if (ticket.estado == "En Proceso") {
      ticket_state.className = "btn btn-danger";
      ticket_dropdown.className =
        "btn btn-danger dropdown-toggle dropdown-toggle-split";
    } else if (ticket.estado == "Por Testear") {
      ticket_state.className = "btn btn-secondary";
      ticket_dropdown.className =
        "btn btn-secondary dropdown-toggle dropdown-toggle-split";
    } else if (ticket.estado == "Completada") {
      ticket_state.className = "btn btn-success";
      ticket_dropdown.className =
        "btn btn-success dropdown-toggle dropdown-toggle-split";
    }
  }
};

const updateSelectedState = async (button) => {
  const selectedState = button.textContent;

  fetch(`http://localhost:3000/tareas/${id}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("No se pudo obtener la tarea existente");
      }
    })
    .then((ticket) => {
      const updatedTicket = { ...ticket, estado: selectedState };

      return fetch(`http://localhost:3000/tareas/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTicket),
      });
    })
    .then((response) => {
      if (response.ok) {
        console.log("Tarea actualizada correctamente.");
        // Realiza cualquier acción adicional que necesites después de la actualización.
      } else {
        console.error("Error al actualizar la tarea.");
      }
    })
    .catch((error) => {
      console.error("Error de red:", error);
    });
};

fillDetailTicket();
window.updateSelectedState = updateSelectedState;
