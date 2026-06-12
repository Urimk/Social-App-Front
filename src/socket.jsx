import { io } from "socket.io-client";
import { getApiUrl } from "./utils/auth";

let socketInstance = null;
let joinRoomHandler = null;

const getUserId = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user?.id || user?._id || null;
  } catch {
    return null;
  }
};

const joinPersonalRoom = (socket) => {
  const userId = getUserId();
  if (userId) {
    socket.emit("setup", userId);
  }
};

const createSocket = () => {
  const socket = io(getApiUrl(), {
    autoConnect: false,
  });

  socket.on("connect_error", (error) => {
    console.error("Socket connection error:", error.message, getApiUrl());
  });

  return socket;
};

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

  if (joinRoomHandler) {
    socket.off("connect", joinRoomHandler);
  }
  joinRoomHandler = () => joinPersonalRoom(socket);
  socket.on("connect", joinRoomHandler);

  if (!socket.connected) {
    socket.connect();
  } else {
    joinPersonalRoom(socket);
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
