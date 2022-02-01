const express = require('express')
const http = require('http')
const port = process.env.PORT || 3030
const app = express()
const server = http.createServer(app)
const io = require('socket.io')(server)
const path = require('path')

app.get('/', (req, res)=>{
    res.sendFile(__dirname + '/index.html')
})

var name = "";

io.on('connection', (socket) => {

    console.log("New Member Added")

    socket.on('joining msg', (username) =>
    {
        name = username
        io.emit('chat message', "New Member Name : " + name)
    })

    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', msg)
    })

    socket.on('chat location', (msg) => {
        socket.broadcast.emit('chat location', msg)
    })
    socket.on('chat emoji', (msg) => {
        socket.broadcast.emit('chat emoji', msg)
    })

})

server.listen(port, () => {
    console.log("Server Port Number :", port)
})