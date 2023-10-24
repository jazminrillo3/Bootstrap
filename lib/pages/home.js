import { getAllTickets } from "../service/tickets.js";

const contenedor_por_hacer = document.getElementById("contenedor-por-hacer");
const contenedor_en_proceso = document.getElementById("contenedor-en-proceso");
const contenedor_por_testear = document.getElementById("contenedor-por-testear");
const contenedor_completada = document.getElementById("contenedor-completada");

const fillTickets = async () => {
    const tickets = await getAllTickets();

    tickets.forEach((ticket) => {
        const estado = ticket.estado;

        let container;
        if (estado === "Por Hacer"){
            container = contenedor_por_hacer
        }else if(estado === "En Proceso"){
            container = contenedor_en_proceso
        }else if(estado === "Por Testear"){
            container = contenedor_por_testear
        }else if(estado === "Completada"){
            container = contenedor_completada
        }

        container.innerHTML += 
            `<div class="col">
                <div class="card h-100">
                    <img 
                        class="card-img-top" 
                        src="${ticket.imagen}" 
                        alt="" 
                    />
                    <div class="card-body p-4">
                        <div class="text-center">
                            <h5 class="fw-bolder">${ticket.titulo}</h5>
                            <span>Tiempo: ${ticket.tiempo} ${ticket.tiempo == 1 ? "día" : "días"}</span>
                        </div>
                    </div>
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center">
                            <a href="/detalle.html?id=${ticket.id}" class="btn btn-outline-primary mt-auto">
                            Ver Tarea
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            `
    });
}

fillTickets();
