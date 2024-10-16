
import express from 'express'
import {WebSocket, WebSocketServer} from 'ws'

const app = express();
const server = app.listen(4000, ()=>console.log("express server running"));

const ws = new WebSocketServer({server})
let userCount = 0;
ws.on('connection', (socketInstance)=>{
    
    socketInstance.on('message', (data, isBinary)=>{
        ws.clients.forEach((client)=>{
            if(client !== socketInstance && client.readyState == WebSocket.OPEN){
                client.send(data, {binary:false});
            }
        })
    })
    console.log("user connected", ++userCount);
   socketInstance.send("connected from backend")
})