import { io } from "socket.io-client";

const URL = import.meta.env.SOCKET_ENV || "http://localhost:5000";

export const socket = io(URL, { autoConnect: false });
