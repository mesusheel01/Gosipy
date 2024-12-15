import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { inputAtom, messagesAtom, socketAtom, userNameAtom, roomIdAtom } from "../store/state";

const Room = () => {
  const [input, setInput] = useRecoilState(inputAtom);
  const [messages, setMessages] = useRecoilState(messagesAtom);
  const [socket, setSocket] = useRecoilState(socketAtom);
  const [userName] = useRecoilState(userNameAtom);
  const [roomId] = useRecoilState(roomIdAtom);

  useEffect(() => {
    const ws = new WebSocket("wss://gosipy-ws-server.onrender.com");
    setSocket(ws);
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: "join", payload: { roomId, name: userName } }));
    };
    ws.onmessage = (message) => {
      const parsedMessage = JSON.parse(message.data);
      setMessages((m) => [...m, parsedMessage]);
    };
    ws.onclose = () => {
      console.log("Disconnected from server");
    };
    return () => {
      ws.close();
    };
  }, [roomId, userName]);

  const sendMessage = () => {
    if (!socket || !input.trim()) return;
    socket.send(
      JSON.stringify({
        type: "chat",
        payload: {
          message: input,
        },
      })
    );
    setInput("");
  };

  return (
    <div className="h-screen bg-black flex flex-col justify-between">
      <div className="h-[90vh] p-4 overflow-y-auto">
        <div className="text-white mb-4">Room ID: {roomId}</div>
        {messages.map((m, index) => (
          <div key={index} className="bg-white text-black rounded-xl p-4 m-2 flex justify-between">
            <div>
              <p><strong>{m.sender}</strong></p>
              <p>{m.text}</p>
            </div>
            <div className="text-right text-gray-500 text-sm">
              {new Date(m.timestamp).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      <div className="w-full bg-white flex p-2">
        <input
          className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none"
          value={input}
          type="text"
          placeholder="Message..."
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          onClick={sendMessage}
          className="bg-pink-300 p-2 rounded-r-lg hover:bg-pink-400 transition-all duration-300"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Room;
