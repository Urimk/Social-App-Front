import { io } from "socket.io-client";

const URL = import.meta.env.SOCKET_ENV || "http://localhost:5000";

/**
 * Socket.io client instance for real-time communication.
 * Connects to the server at the specified URL with autoConnect disabled.
 */
export const socket = io(URL, { autoConnect: false });
