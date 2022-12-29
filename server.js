import express from "express";
import Api from "./api/productos.js";
import MensajesRecord from "./api/mensajes.js";
import handlebars from 'express-handlebars'
const app = express()

import { Server } from 'socket.io';
import { createServer } from 'http';

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
app.use(express.static('public'));

const api = new Api()

const msjRecord = new MensajesRecord()

let productos = api.productosTodos()


//FUNCIONALIDADES
// ----------------------------------------------|


app.get('/', (req, res) => {
    res.render('formulario', {productos})

});

app.get('/productos', (req, res) => {
    res.render('vista', {productos});
});

app.post('/productos', (req, res) => {

    let newProd = req.body

    api.guardar( newProd )

    console.log("Producto guardado");

    res.redirect('/')
});

// CHAT CLIENTE SERVIDOR
io.on('connection', socket => {
            
    console.log('Nuevo cliente conectado')
    socket.emit('mensajes', msjRecord.MsjTodos())

    socket.on('nuevo-mensaje', data => {
        io.sockets.emit('mensaje', guardarMsj(data))
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