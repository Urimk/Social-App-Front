import Message from "./Message";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

const belongsToChat = (message, chatId) =>
  message?.chatId?.toString() === chatId?.toString();

const appendMessage = (messages, message) => {
  if (!Array.isArray(messages) || !message?._id) return messages;
  if (messages.some((item) => item._id === message._id)) return messages;
  return [...messages, message];
};

const mergeMessages = (fetched, pending) => {
  const merged = Array.isArray(fetched) ? [...fetched] : [];
  for (const message of pending) {
    if (!message?._id) continue;
    if (!merged.some((item) => item._id === message._id)) {
      merged.push(message);
    }
  }
  return merged;
};

function MessageList({
  chat,
  newOutMessage,
  newIncomingMessage,
  messages,
  setMessages,
  onLoadingChange,
}) {
  const API_URL =
    localStorage.getItem("apiAddress") ||
    import.meta.env.VITE_RENDER_API_URL ||
    "http://localhost:5000";
  const [curUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const simpleBarRef = useRef(null);
  const pendingMessagesRef = useRef([]);

  const scrollToBottom = () => {
    if (simpleBarRef.current) {
      const el = simpleBarRef.current.getScrollElement();
      el.scrollTop = el.scrollHeight;
    }
  };

  useEffect(() => {
    onLoadingChange?.(isLoading);
  }, [isLoading, onLoadingChange]);

  useEffect(() => {
    if (!chat) return;

    const controller = new AbortController();
    pendingMessagesRef.current = [];
    setIsLoading(true);
    setCurrentUser(null);
    setMessages([]);

    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(`${API_URL}/chat/${chat}/messages`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
        });

        if (!response.ok) {
          const res = await response.json();
          throw new Error(res.message);
        }

        const res = await response.json();
        setCurrentUser(res.currentUser ?? null);
        setMessages(
          mergeMessages(res.messages ?? [], pendingMessagesRef.current),
        );
        pendingMessagesRef.current = [];
      } catch (error) {
        if (error.name === "AbortError") {
          return;
        }

        setMessages([]);
        toast.error(error.message);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchMessages();

    return () => {
      controller.abort();
    };
  }, [chat, API_URL, setMessages]);

  useEffect(() => {
    if (!isLoading) {
      scrollToBottom();
    }
  }, [messages, isLoading]);

  useEffect(() => {
    [newIncomingMessage, newOutMessage].forEach((msg) => {
      if (!belongsToChat(msg, chat) || !msg?._id) return;

      if (isLoading) {
        pendingMessagesRef.current = appendMessage(
          pendingMessagesRef.current,
          msg,
        );
      } else {
        setMessages((prev) => appendMessage(prev, msg));
      }
    });
  }, [newIncomingMessage, newOutMessage, chat, isLoading, setMessages]);

  return (
    <div className="flex-1 min-h-0 flex flex-col justify-end">
      <div className="2xl:ml-[56px] sm:ml-lg-[56px] ml-[5vw] 2xl:mr-[54.5px] sm:mr-lg-[54.5px] mr-[5vw] flex flex-col flex-1 min-h-0 justify-end">
        <SimpleBar
          ref={simpleBarRef}
          style={{ maxHeight: "100%" }}
          className="auto-padding-scrollbar"
        >
          <div className="flex flex-col justify-end min-h-full">
            {isLoading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  minHeight: "50px",
                  py: { xs: "25px", sm: "35px", md: "45px" },
                }}
              >
                <CircularProgress
                  sx={{
                    width: { xs: 60, sm: 80, md: 100 },
                    height: { xs: 60, sm: 80, md: 100 },
                  }}
                />
              </Box>
            ) : messages.length === 0 ? (
              <div className="text-center font-poppins text-[var(--gray-500)] dark:text-[var(--gray-300)] opacity-60 my-auto py-8">
                No messages yet. Send a message to start the conversation!
              </div>
            ) : (
              messages.map((msg) => (
                <Message key={msg._id} msg={msg} curUser={curUser} />
              ))
            )}
          </div>
        </SimpleBar>
      </div>
    </div>
  );
}

export default MessageList;
