import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  connectSocket,
  disconnectSocket,
  reconnectSocket as resetSocket,
} from "../socket";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [incomingMessage, setIncomingMessage] = useState({});
  const [incomingRequest, setIncomingRequest] = useState(null);
  const [acceptedRequest, setAcceptedRequest] = useState(null);
  const [declinedRequest, setDeclinedRequest] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef(null);

  const detachListeners = useCallback((socket) => {
    if (!socket) return;

    socket.off("connect");
    socket.off("disconnect");
    socket.off("message_received");
    socket.off("request_received");
    socket.off("request_accepted");
    socket.off("request_declined");
  }, []);

  const attachListeners = useCallback((socket) => {
    const handleConnect = () => setIsConnected(true);
    const handleDisconnect = () => setIsConnected(false);
    const handleMessageReceived = (data) => setIncomingMessage(data);
    const handleRequestReceived = (data) => setIncomingRequest(data);
    const handleRequestAccepted = (data) => setAcceptedRequest(data);
    const handleRequestDeclined = (data) => setDeclinedRequest(data);

    socket.on("connect", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("message_received", handleMessageReceived);
    socket.on("request_received", handleRequestReceived);
    socket.on("request_accepted", handleRequestAccepted);
    socket.on("request_declined", handleRequestDeclined);

    if (socket.connected) {
      setIsConnected(true);
    }
  }, []);

  const reconnect = useCallback(() => {
    if (socketRef.current) {
      detachListeners(socketRef.current);
    }

    const socket = resetSocket();
    socketRef.current = socket;
    attachListeners(socket);
  }, [attachListeners, detachListeners]);

  useEffect(() => {
    const socket = connectSocket();
    socketRef.current = socket;
    attachListeners(socket);

    return () => {
      detachListeners(socket);
      disconnectSocket();
      socketRef.current = null;
    };
  }, [attachListeners, detachListeners]);

  const disconnect = useCallback(() => {
    if (socketRef.current) {
      detachListeners(socketRef.current);
    }
    disconnectSocket();
    socketRef.current = null;
    setIsConnected(false);
  }, [detachListeners]);

  return (
    <SocketContext.Provider
      value={{
        incomingMessage,
        setIncomingMessage,
        incomingRequest,
        setIncomingRequest,
        acceptedRequest,
        setAcceptedRequest,
        declinedRequest,
        setDeclinedRequest,
        isConnected,
        disconnectSocket: disconnect,
        reconnectSocket: reconnect,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within SocketProvider");
  }
  return context;
};
