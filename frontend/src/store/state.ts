import { atom } from "recoil";


type Message = {
    text: string;
    sender: string;
    timestamp: number;
}

export const roomIdAtom = atom<string>({
    key: 'roomId-store',
    default: ""
})

export const inputAtom = atom<string>({
    key: 'input-msg',
    default: ""
})

export const socketAtom = atom<WebSocket | null>({
    key: 'sockets',
    default: null
})


export const errorAtom = atom<string| null>({
    key: "error-handler",
    default: null
})

export const messagesAtom = atom<Message[]>({
    key: 'messages',
    default: []
})

export const userNameAtom = atom({
    key: "userName",
    default: "",
  });
