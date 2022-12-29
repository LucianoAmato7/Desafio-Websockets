let socket = io.connect();

// socket.on('productos', function(productos) {

//     console.log(productos);

//     if(productos) {

//         document.getElementById('vistaContainer').innerHTML = `
//         <div class="table-responsive">
//             <table class="table table-dark" id="tabla">
//                 <tr class="text-white fw-bold"> 
//                     <th>ID</th>
//                     <th>Nombre</th>
//                     <th>Precio</th>
//                     <th>Imagen</th>
//                 </tr>
//             </table>
//         </div>`;

//         const tablaProds = productos.map( prod =>
//             `<tr>
//                 <td class="align-middle">${prod.id}</td>
//                 <td class="align-middle">${prod.title}</td>
//                 <td class="align-middle">${prod.price}</td>
//                 <td class="align-middle">
//                     <img src=${prod.thumbnail} style="width: 80px">
//                 </td>
//             </tr>` 
//         )

//         document.getElementById('tabla').appendChild(tablaProds)

//     } else {

//         document.getElementById('vistaContainer').innerHTML = '<h3 class="alert alert-danger">No se encontraron productos</h3>'

//     }

// });

// let button = document.querySelector('enviar')

// button.addEventListener('click', () => {
//     console.log('clickeado boton de enviar');
//     socket.emit('productos')
// } )


// MENSAJES CLIENTE SERVIDOR

socket.on('mensajes', data => {
    console.log(data);
    document.querySelector('p').innerHTML = data.map( msj => `${msj.email} [ ${msj.fyh} ]: ${msj.mensaje}`).join('<br>')
})

const AddMensaje = (e) => {
    const mensaje = {
        email: document.getElementById('enviarEmail').value,
        fyh: new Date().toLocaleString(),
        mensaje: document.getElementById('enviarMsj').value
    }
    socket.emit('nuevo-mensaje', mensaje);
    return false;
}
