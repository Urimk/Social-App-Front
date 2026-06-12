import { io } from "socket.io-client";
import { getApiUrl } from "./utils/auth";

let socketInstance = null;

const createSocket = () =>
  io(getApiUrl(), {
    autoConnect: false,
  });

/**
 * Returns the shared socket client, creating it if needed.
 */
export const getSocket = () => {
  if (!socketInstance) {
    socketInstance = createSocket();
  }
  return socketInstance;
};

/**
 * Connects the socket with the current auth token.
 */
export const connectSocket = () => {
  const socket = getSocket();
  socket.auth = { token: localStorage.getItem("token") };

  if (!socket.connected) {
    socket.connect();
  }

  return socket;
};

/**
 * Disconnects the active socket connection.
 */
export const disconnectSocket = () => {
  if (socketInstance?.connected) {
    socketInstance.disconnect();
  }
};

/**
 * Recreates the socket client (e.g. after API URL change).
 */
export const reconnectSocket = () => {
  if (socketInstance) {
    socketInstance.removeAllListeners();
    socketInstance.disconnect();
    socketInstance = null;
  }

  return connectSocket();
};
