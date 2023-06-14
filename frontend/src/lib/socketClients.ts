import { io } from "socket.io-client";
import { env } from "../configs/env";

export const socketClient = io(
  env.VITE_MAIN_SERVER_URL,
  {
    autoConnect: false,
    reconnection: false,
    transports: ["websocket"],
  },
);

export const redundantSocketClient = io(
  env.VITE_REPLICA_SERVER_URL,
  {
    autoConnect: false,
    transports: ["websocket"],
  },
);
