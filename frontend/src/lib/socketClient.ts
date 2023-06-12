import { io } from "socket.io-client";

export const socketClient = io(
  "http://localhost:4242",
  {
    autoConnect: false,
    transports: ["websocket"]
  }
);