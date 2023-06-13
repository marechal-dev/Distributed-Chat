import { io } from "socket.io-client";

export const socketClient = io(
  "https://distributed-chat-backend.onrender.com",
  {
    autoConnect: false,
    reconnection: false,
    transports: ["websocket"],
  },
);

export const redundantSocketClient = io(
  "https://distributed-chat-fallback-backend.onrender.com",
  {
    autoConnect: false,
    transports: ["websocket"],
  },
);
