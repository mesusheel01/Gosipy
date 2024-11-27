import { WebSocketServer, WebSocket } from "ws";
import { v4 as uuidv4 } from "uuid";
import express from "express";
import cors from "cors";
import http from 'http'

const app = express();
const PORT = 5000;


const server = http.createServer(app)

interface User {
  socket: WebSocket;
  room: string;
  name: string;
}

let allSockets: User[] = [];

const generateRoomId = () => uuidv4();

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["POST", "GET"],
  credentials: true
}));

// Routes
app.get('/', (req, res) => {
  res.send("Hello Server is hosted");
});

app.post("/create-room", (req, res) => {
  const roomId = generateRoomId();
  res.json({ roomId });
});

// Start Express server
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});

// Start WebSocket server
const wss = new WebSocketServer({ server });

wss.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("message", (message) => {
    try {
      const parsedMessage = JSON.parse(message.toString());
      if (parsedMessage.type === "join") {
        const { roomId, name } = parsedMessage.payload;
        allSockets.push({ socket, room: roomId, name });
        console.log(`${name} joined room: ${roomId}`);
      } else if (parsedMessage.type === "chat") {
        const currentUser = allSockets.find((x) => x.socket === socket);
        if (currentUser) {
          const { room, name } = currentUser;
          const timestamp = new Date().toISOString();

          allSockets
            .filter((user) => user.room === room)
            .forEach((user) => {
              user.socket.send(
                JSON.stringify({
                  text: parsedMessage.payload.message,
                  sender: name,
                  timestamp,
                })
              );
            });
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  });

  socket.on("close", () => {
    console.log("Client disconnected");
    allSockets = allSockets.filter((user) => user.socket !== socket);
  });
});
