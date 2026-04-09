import Message from "./Message";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";

function MessageList({
  chat,
  newOutMessage,
  newIncomingMessage,
  messages,
  setMessages,
}) {
  const API_URL =
    localStorage.getItem("apiAddress") ||
    import.meta.env.VITE_RENDER_API_URL ||
    "http://localhost:5000";
  const [curUser, setCurrentUser] = useState({});
  const simpleBarRef = useRef(null);
  // eslint-disable-next-line no-unused-vars
  const controller = new AbortController();

  const scrollToBottom = () => {
    if (simpleBarRef.current) {
      const el = simpleBarRef.current.getScrollElement();
      el.scrollTop = el.scrollHeight;
    }
  };

  useEffect(() => {
    if (!chat) return;

    const controller = new AbortController();

    const fetchMessages = async () => {
      try {
        setMessages("Loading");
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
        setCurrentUser(res.currentUser);
        setMessages(res.messages);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("Aborted fetch for chat:", chat);
          return;
        }

        toast.error(error.message);
      }
    };

    fetchMessages();

    return () => {
      controller.abort();
    };
  }, [chat, API_URL, setMessages]);

  useEffect(() => {
    if (messages !== "Loading") {
      scrollToBottom();
    }
  }, [messages]);

  useEffect(() => {
    if (Object.keys(newIncomingMessage).length !== 0) {
      setMessages((prev) => [...prev, newIncomingMessage]);
    }
  }, [newIncomingMessage, setMessages]);

  useEffect(() => {
    if (Object.keys(newOutMessage).length !== 0) {
      setMessages((prev) => [...prev, newOutMessage]);
    }
  }, [newOutMessage, setMessages]);

  return (
    <div className="flex-1 min-h-0 flex flex-col justify-end">
      <div className="2xl:ml-[56px] sm:ml-lg-[56px] ml-[5vw] 2xl:mr-[54.5px] sm:mr-lg-[54.5px] mr-[5vw] flex flex-col flex-1 min-h-0 justify-end">
        <SimpleBar
          ref={simpleBarRef}
          style={{ maxHeight: "100%" }}
          className="auto-padding-scrollbar"
        >
          <div className="flex flex-col justify-end min-h-full">
            <div className="2xl-mb-[40px] mb-lg-[40px] font-poppins text-[var(--gray-500)] dark:text-[var(--gray-300)] 2xl:text-[18px] sm:text-lg-[18px] text-[18.5px] text-center justify-end">
              Today 01/03
            </div>
            {messages === "Loading" ? (
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
            ) : (
              messages.map((msg) => (
                <Message
                  key={msg._id}
                  msg={msg}
                  curUser={curUser}
                  date={msg.createdAt}
                />
              ))
            )}
          </div>
        </SimpleBar>
      </div>
    </div>
  );
}

export default MessageList;
