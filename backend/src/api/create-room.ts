import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ["https://gosipy.vercel.app", "http://localhost:5173"],
  methods: ["POST", "GET"],
  credentials: true
}));

const generateRoomId = () => uuidv4();

app.get('/', (req, res) => {
  res.send("Hello, server is hosted!");
});

app.post("/create-room", (req, res) => {
  const roomId = generateRoomId();
  res.json({ roomId });
});

export default app;
