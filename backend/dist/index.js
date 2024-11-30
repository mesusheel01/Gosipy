"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
let allSockets = [];
const wss = new ws_1.WebSocketServer({ port: 8080 });
wss.on("connection", (socket) => {
    console.log("Client connected");
    socket.on("message", (message) => {
        try {
            const parsedMessage = JSON.parse(message.toString());
            if (parsedMessage.type === "join") {
                const { roomId, name } = parsedMessage.payload;
                allSockets.push({ socket, room: roomId, name });
                console.log(`${name} joined room: ${roomId}`);
            }
            else if (parsedMessage.type === "chat") {
                const currentUser = allSockets.find((user) => user.socket === socket);
                if (currentUser) {
                    const { room, name } = currentUser;
                    const timestamp = new Date().toISOString();
                    allSockets
                        .filter((user) => user.room === room)
                        .forEach((user) => {
                        if (user.socket !== socket) {
                            user.socket.send(JSON.stringify({
                                text: parsedMessage.payload.message,
                                sender: name,
                                timestamp,
                            }));
                        }
                    });
                }
            }
        }
        catch (error) {
            console.error("Error:", error);
        }
    });
    socket.on("close", () => {
        console.log("Client disconnected");
        allSockets = allSockets.filter((user) => user.socket !== socket);
    });
});
