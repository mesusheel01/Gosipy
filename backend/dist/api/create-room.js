"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const uuid_1 = require("uuid");
const app = (0, express_1.default)();
const PORT = 5000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    origin: ["https://gosipy.vercel.app", "http://localhost:5173"],
    methods: ["POST", "GET"],
    credentials: true
}));
const generateRoomId = () => (0, uuid_1.v4)();
app.get('/', (req, res) => {
    res.send("Hello, server is hosted!");
});
app.post("/create-room", (req, res) => {
    const roomId = generateRoomId();
    res.json({ roomId });
});
exports.default = app;
