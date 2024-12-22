import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

const app = express();
const PORT= 5000

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

app.get("/create-room", (req, res) => {
  const roomId = generateRoomId();
  res.json({ roomId });
});


app.listen(PORT, ()=>{
    console.log(`Server is hosted on http://localhost:${PORT}`)
})
