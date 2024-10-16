"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const app = (0, express_1.default)();
const server = app.listen(4000, () => console.log("express server running"));
const ws = new ws_1.WebSocketServer({ server });
let userCount = 0;
ws.on('connection', (socketInstance) => {
    socketInstance.on('message', (data, isBinary) => {
        ws.clients.forEach((client) => {
            if (client !== socketInstance && client.readyState == ws_1.WebSocket.OPEN) {
                client.send(data, { binary: false });
            }
        });
    });
    console.log("user connected", ++userCount);
    socketInstance.send("connected from backend");
});
