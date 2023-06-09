import { io } from "socket.io-client";

export const socketClient = io(
  "https://distributed-chat-proxy.onrender.com/api",
  {
    autoConnect: false,
    transports: ["websocket"]
  }
);