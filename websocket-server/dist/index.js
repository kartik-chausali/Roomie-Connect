"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const redis_1 = require("redis");
const singletonDb_1 = __importDefault(require("./lib/singletonDb"));
const app = (0, express_1.default)();
const server = app.listen(4000, () => console.log("express server running"));
//redis connection
const redisClient = (0, redis_1.createClient)();
redisClient.on('error', () => console.log('redis client error'));
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield redisClient.connect();
            console.log('redis connected');
        }
        catch (error) {
            console.log('error', error);
        }
    });
}
startServer();
const ws = new ws_1.WebSocketServer({ server });
let userCount = 0;
ws.on('connection', (socketInstance) => {
    socketInstance.on('message', (data, isBinary) => __awaiter(void 0, void 0, void 0, function* () {
        let messageString;
        // Handle different data types (Buffer, ArrayBuffer, or string)
        if (typeof data === 'string') {
            messageString = data; // If it's already a string, use it directly
        }
        else if (data instanceof Buffer) {
            messageString = data.toString(); // Convert Buffer to string
        }
        else if (data instanceof ArrayBuffer) {
            messageString = Buffer.from(data).toString(); // Convert ArrayBuffer to string
        }
        else if (Array.isArray(data)) {
            // Convert Buffer[] to string (concatenate the buffer contents)
            messageString = Buffer.concat(data).toString();
        }
        else {
            console.error('Unknown data type received:', typeof data);
            return;
        }
        try {
            const message = JSON.parse(messageString);
            console.log(message);
            const { senderId, receiverId, content } = message;
            const redisKey = `chat:${senderId}:${receiverId}`;
            const messageData = {
                senderId,
                receiverId,
                content
            };
            yield redisClient.rPush(redisKey, JSON.stringify(messageData));
            ws.clients.forEach((client) => {
                if (client !== socketInstance && client.readyState == ws_1.WebSocket.OPEN) {
                    client.send(data, { binary: false });
                }
            });
        }
        catch (error) {
            console.log("Failed to process message", error);
        }
    }));
    console.log("user connected", ++userCount);
    socketInstance.send("connected from backend");
});
function generateId() {
    return 'message-' + Math.random().toString(36).substring(2, 9);
}
setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
    const keys = yield redisClient.keys(`chat:*`);
    for (const key of keys) {
        const messages = yield redisClient.lRange(key, 0, -1);
        if (messages.length > 0) {
            const parsedMessage = messages.map((message) => JSON.parse(message));
            try {
                yield singletonDb_1.default.message.createMany({
                    data: parsedMessage.map((msg) => ({
                        content: msg.content,
                        senderId: msg.senderId,
                        receiverId: msg.receiverId,
                        timestamp: msg.timestamp,
                    }))
                });
            }
            catch (error) {
                console.log('Failed to push message to db', error);
            }
        }
    }
}), 1 * 60 * 1000);
