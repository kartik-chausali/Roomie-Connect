
import express from 'express'
import {WebSocket, WebSocketServer} from 'ws'
import {createClient} from 'redis'
import prisma from './lib/singletonDb'
const app = express();
const server = app.listen(4000, ()=>console.log("express server running"));

//redis connection
const redisClient = createClient();
redisClient.on('error', ()=> console.log('redis client error' ));
async function startServer(){
    try{
        await redisClient.connect();
        console.log('redis connected')
    }catch(error){
        console.log('error', error)
    }
}

startServer();

const ws = new WebSocketServer({server})
let userCount = 0;
ws.on('connection', (socketInstance)=>{
    
    socketInstance.on('message', async(data, isBinary)=>{
        let messageString: string;

        // Handle different data types (Buffer, ArrayBuffer, or string)
        if (typeof data === 'string') {
            messageString = data; // If it's already a string, use it directly
        } else if (data instanceof Buffer) {
            messageString = data.toString(); // Convert Buffer to string
        } else if (data instanceof ArrayBuffer) {
            messageString = Buffer.from(data).toString(); // Convert ArrayBuffer to string
        } else if (Array.isArray(data)) {
            // Convert Buffer[] to string (concatenate the buffer contents)
            messageString = Buffer.concat(data).toString();
        } else {
            console.error('Unknown data type received:', typeof data);
            return;
        }
      
        try{
            const message = JSON.parse(messageString);
            console.log(message)
            const { senderId, receiverId, content } = message;

            const redisKey = `chat:${senderId}:${receiverId}`
            const messageData = {
                senderId,
                receiverId,
                content
            }
            
            await redisClient.rPush(redisKey, JSON.stringify(messageData));
            ws.clients.forEach((client)=>{
                if(client !== socketInstance && client.readyState == WebSocket.OPEN){
                    
                    client.send(data, {binary:false});
                }
            })
        }catch(error){
            console.log("Failed to process message", error);
        }
       
    })
    console.log("user connected", ++userCount);
   socketInstance.send("connected from backend")
})


function generateId(){
    return 'message-'+ Math.random().toString(36).substring(2, 9);    
}

setInterval( async()=>{
    const keys = await redisClient.keys(`chat:*`);

    for(const key of keys){
        const messages = await redisClient.lRange(key , 0 , -1);

        if(messages.length>0){
            const parsedMessage = messages.map((message)=> JSON.parse(message));

            try{

                await prisma.message.createMany({
                    data: parsedMessage.map((msg)=>({
                        content: msg.content,
                        senderId: msg.senderId,
                        receiverId: msg.receiverId,
                        timestamp: msg.timestamp,
                    }))
                })

                //delete messages from redis
               await redisClient.del(key)
                
            }catch(error){
                console.log('Failed to push message to db', error)
            }
        }
    }
}, 1 * 60 * 1000)