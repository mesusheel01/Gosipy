"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const uuid_1 = require("uuid");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const wss = new ws_1.WebSocketServer({ port: 8000 });
let allSockets = [];
const generateRoomId = () => (0, uuid_1.v4)();
app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    methods: ["POST"],
    credentials: true
}));
app.post("/create-room", (req, res) => {
    const roomId = generateRoomId();
    res.json({ roomId });
});
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
                const currentUser = allSockets.find((x) => x.socket === socket);
                if (currentUser) {
                    const { room, name } = currentUser;
                    const timestamp = new Date().toISOString();
                    allSockets
                        .filter((user) => user.room === room)
                        .forEach((user) => {
                        user.socket.send(JSON.stringify({
                            text: parsedMessage.payload.message,
                            sender: name,
                            timestamp,
                        }));
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
app.listen(3000, () => {
    console.log("Express server running on http://localhost:3000");
});
