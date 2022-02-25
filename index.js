const express = require('express')

const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const contenedor = require("./api/contenedor.js")
const file = new contenedor()

const contenedorMessages  = require("./api_messages/contenedor.js")
const messages = new contenedorMessages()

const PORT = 8080 || process.env.PORT;

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))


const httpServer = new HttpServer(app)
const io = new Socket(httpServer)
 
  
io.on('connection', async socket => {
    console.log('Nueva conexion');
 
    file.getAll().then((res) => socket.emit('productos',res))
    
    socket.on('newItem', producto => {         
        file.save(producto.title,producto.price,producto.thumb)
        io.sockets.emit('productos', file.getAll());

        file.getAll().then((res) =>   io.sockets.emit('productos', res) )
    })

    
    messages.getAll().then((res) => socket.emit('messages',res))
   
 
    socket.on('newMessage', async mensaje => {
        mensaje.fyh = new Date().toLocaleString()
        mensaje.socketId = socket.id
         
        await messages.save(mensaje)
           
        messages.getAll().then((res) => io.sockets.emit('messages', res) )

    }) 

});
 
 
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
