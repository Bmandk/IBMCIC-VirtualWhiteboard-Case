const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

const port = 3002;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketIo(server);

let entries = {};

io.on("connection", (socket) => {
    console.log("New client connected");

    socket.emit("updateAllEntries", JSON.stringify(Object.values(entries)))

    socket.on("entry", (entry) => {
        entry = JSON.parse(entry);
        console.log(entry);
        entries[entry.uuid] = entry;
    });

    socket.on("disconnect", () => {
        console.log("Client disconnected");
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));