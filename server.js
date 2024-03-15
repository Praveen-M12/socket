const http = require('http');
const express = require('express');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Listen for incoming socket.io connections
io.on('connection', (socket) => {
    console.log('A user connected');

    // Handle 'chat message' event
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg); // Broadcast the message to all connected clients
    });

    // Handle 'disconnect' event
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

