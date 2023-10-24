//npm install -g json-server
//json-server --watch db.json

export function getAllTickets(){
    return fetch('http://localhost:3000/tareas')
    .then(res=>res.json())
}

export function getTicket(id){
    return fetch(`http://localhost:3000/tareas/${id}`)
    .then(res=>res.json())
}