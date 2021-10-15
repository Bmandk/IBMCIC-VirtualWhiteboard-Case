const express = require("express");
const http = require("http");


const port = 3002;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);
const socketIo = require("socket.io");
const io = socketIo(server, {
    cors: {
        origin: "http://jonathanhertz.dk",
        methods: ["GET", "POST"]
    }
});

let entries = {};

io.on("connection", (socket) => {
    console.log("New client connected");

    socket.emit("updateAllEntries", JSON.stringify(Object.values(entries)))

    socket.on("entry", (json) => {
        let entry = JSON.parse(json);
        console.log(entry);
        entries[entry.uuid] = entry;
        io.emit('entry', json)
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));