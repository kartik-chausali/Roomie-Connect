"use client"
import { useIsChatOpen, useUser } from "@/store/chatStates"
import { useEffect, useState , useRef} from "react";

export default function Chat(){
    const chat = useIsChatOpen((state)=> state.isChatOpen)
    const setChat = useIsChatOpen((state)=> state.setIsChatOpen)
    // const receiversChat = useUser((state)=> state.receiversChat);
    // const sendersChat = useUser((state)=> state.sendersChat);
    const name = useUser((state)=> state.name);
    const image = useUser((state)=>state.image);
    // const setReceiversChat = useUser((state)=> state.setReceiversChat);
    // const setSendersChat = useUser((state)=> state.setSendersChat);
    const [socket, setSocket]= useState<WebSocket | null>(null);
    // const [latestSenderMessage, setLatestSenderMessages] = useState("")
    // const [latestReceiverMessage, setLatestReceiverMessages] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const[mergedChats, setMergedChats] = useState<{message:string , sender:string}[]>([])
    useEffect(()=>{
        const socket = new WebSocket('ws://localhost:4000');
        socket.onopen = ()=>{
            console.log('connected on client side');
            setSocket(socket);
        }

        socket.onmessage = (message)=>{
        //    setReceiversChat([...receiversChat, message.data])
        //    setLatestReceiverMessages(message.data);
           setMergedChats((prev)=>[...prev, {message:message.data, sender:'receiver'}])
        //    console.log("message received ", message);
        }
        
        setSocket(socket);

        return ()=> socket.close();

    },[])

    // const mergedChats = [];
    // const maxLength = Math.max(sendersChat.length, receiversChat.length);
  
    // for (let i = 0; i < maxLength; i++) {
    //   if (i < sendersChat.length) {
    //     mergedChats.push({ message: sendersChat[i], sender: "sender" });
    //   }
    //   if (i < receiversChat.length) {
    //     mergedChats.push({ message: receiversChat[i], sender: "receiver" });
    //   }
    // }

    console.log("merged",mergedChats)

   return <div>
    <div id="chat-container" className={` ${chat === false ? 'hidden' : ''} fixed bottom-16 right-4 w-96`}>
        <div className="bg-white shadow-md rounded-lg max-w-lg w-full">
            <div className="p-4 border-b bg-blue-500 text-white rounded-t-lg flex justify-between items-center">
                <img src={image} className="h-10 w-10 rounded-full"/>
                <p className="text-lg font-semibold">{name}</p>
                <button id="close-chat" onClick={()=> setChat(false)}className="text-gray-300 hover:text-gray-400 focus:outline-none focus:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            <div id="chatbox" className="p-4 h-80 overflow-y-auto">
              {/* <!-- Chat messages will be displayed here --> */}

              {
                mergedChats.map((chat, index)=>{
                    return (<div className={`${chat.sender === 'sender' ? 'mb-2 text-right' :'mb-2'}`}>
                            <p className={`${chat.sender === 'sender' ? 'bg-blue-500 text-white rounded-lg py-2 px-4 inline-block':'bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block'}`}>
                                {chat.message}
                            </p>
                    </div>)
                })
              }

              {/* {latestSenderMessage && <div className="mb-2 text-right">
                <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">{latestSenderMessage}</p>
                </div>}
                {latestReceiverMessage && <div className="mb-2'">
                    <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">{latestReceiverMessage}</p>
                    </div>} */}

              {/* <div className="mb-2 text-right">
                <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">hello</p>
              </div>
              <div className="mb-2">
                <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">This is a response from the chatbot.</p>
              </div>
              <div className="mb-2 text-right">
                <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">this example of chat</p>
              </div>
              <div className="mb-2">
                <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">This is a response from the chatbot.</p>
              </div>
              <div className="mb-2 text-right">
                <p className="bg-blue-500 text-white rounded-lg py-2 px-4 inline-block">design with tailwind</p>
              </div>
              <div className="mb-2">
                <p className="bg-gray-200 text-gray-700 rounded-lg py-2 px-4 inline-block">This is a response from the chatbot.</p>
              </div> */}
            </div>
            <div className="p-4 border-t flex">
                <input id="user-input" type="text" placeholder="Type a message" ref={inputRef} className="w-full px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <button id="send-button" onClick={()=>{
                    if(inputRef.current && inputRef.current.value.length>0 && socket){
                        socket.send(inputRef.current.value);
                    //    setSendersChat([...sendersChat, inputRef.current.value])
                    //    setLatestSenderMessages(inputRef.current.value);
                       setMergedChats([...mergedChats, {message:inputRef.current.value, sender:"sender"}])
                        inputRef.current.value = "";
                    }
                }} className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 transition duration-300">Send</button>
            </div>
        </div>
    </div>
    </div> 
}

