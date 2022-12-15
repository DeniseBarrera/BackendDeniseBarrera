const express = require('express');
const { Server: HttpServer } = require('http')
const { Server: IO } = require('socket.io')
const handlebars = require('express-handlebars');
const ProductosApi = require("./API/ProductosApi");
const ChatApi = require('./API/ChatApi.js');



const producto = new ProductosApi();
const chat = new ChatApi();

const app = express()
const httpServer = new HttpServer(app)
const io = new IO(httpServer)


// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./Public'))

const PORT = 8080

// implementación/configuración de socket
io.on('connection', socket=>{
    console.log('nuevo cliente conectado');

    const productos = producto.getAll();
    socket.emit('productos', productos);

    socket.on('newProduct', data => {
        producto.create(data)
        io.sockets.emit('productos', productos);
    });

    // enviaremos el historial del chat cuando un nuevo cliente se conecte
    const messages = chat.getAll();
    socket.emit('message', messages)

    // escuchamos al cliente
    socket.on('newMessage', data =>{
        messages.push(data);

        // reenviamos por medio de broadcast los msn a todos lo clientes que esten conectados en ese momento
        io.sockets.emit('message', messages)
    })
});

httpServer.listen(PORT, ()=>{
    console.log(`server run on PORT ${PORT}`);
})