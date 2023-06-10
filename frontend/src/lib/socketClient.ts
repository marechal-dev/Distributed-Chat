import { io } from "socket.io-client";

export const socketClient = io(
  "https://distributed-chat-backend.onrender.com",
  {
    autoConnect: false,
    transports: ["websocket"]
  }
);