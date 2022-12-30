import express from "express";
import Api from "./api/productos.js";
import MensajesRecord from "./api/mensajes.js";
import handlebars from 'express-handlebars'
import { Server } from 'socket.io';
import { createServer } from 'http';

const app = express()
const server = createServer(app); 
const io = new Server(server);


app.use(express.urlencoded({extended: true}));

app.engine(
    "hbs",
    handlebars({
        extname: "*.hbs",
        defaultLayout: "index.hbs",
    })
);

app.set('view engine', "hbs");
app.set("views", "./views");

app.use(express.static('views/layouts'));

const api = new Api()

const msjRecord = new MensajesRecord()

let mensajesN = msjRecord.MsjTodos()

let productos = api.productosTodos()


//FUNCIONALIDADES
// ----------------------------------------------|


app.get('/', (req, res) => {
    res.render('formulario')
});


// CHAT CLIENTE SERVIDOR
io.on('connection', socket => {
            
    console.log('Nuevo cliente conectado')
    socket.emit('mensajes', msjRecord.MsjTodos())

    socket.on('nuevo-mensaje', data => {
        msjRecord.guardarMsj(data)
        io.sockets.emit('mensajes', mensajesN)
    })

    socket.emit('productos', productos)

    socket.on('nuevo-producto', data => {
        api.guardar(data)
        console.log('Producto Guardado');
        io.sockets.emit('productos', productos)
    })

});


//INICIAMOS EL SERVIDOR
// ----------------------------------------------|

const PORT = 8080

const srv = server.listen(PORT, () => {
    console.log( `Servidor corriendo en el puerto ${ srv.address().port }` );
})

server.on( 'error', ( error ) => {
    console.log( `Error en servidor: ${error}` );
} )