import {create} from 'zustand'

type ChatOpen = {
    isChatOpen:boolean,
    setIsChatOpen:(val:boolean)=>void
}

type User={
    name:string,
    image:string, 
    receiversChat: string[],
    sendersChat:string[],
    setReceiversChat: (val:string[])=>void,
    setSendersChat: (val:string[]) => void
}
export const useIsChatOpen = create<ChatOpen>((set)=>({
    isChatOpen:false,
    setIsChatOpen: (val:boolean) => set({isChatOpen:val})
}))

export const useUser = create<User>((set)=>({
    name:"John Doe",
    image:"https://images.unsplash.com/photo-1557862921-37829c790f19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHx1c2VyfGVufDB8MHx8fDE2OTQwOTU5Nzl8MA&ixlib=rb-4.0.3&q=80&w=1080",
    receiversChat: [],
    sendersChat:[],
    setReceiversChat: (chats:string[]) => set((state:User)=>({receiversChat: [...state.receiversChat, ...chats]})),
    setSendersChat: (chats:string[]) => set((state:User)=>({sendersChat:[...state.sendersChat, ...chats]}))
}))