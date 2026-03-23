import { useEffect } from "react";
import ProfilePic from "../assets/Default_pic.png";
import {
  Phone,
  Search,
  Video,
  More,
  Add,
  Emoji,
  Mic,
  Back,
} from "../assets/icons";
import MessageList from "./MessageList";
import { useState } from "react";
import toast from "react-hot-toast";

function Conversation({
  chat,
  setChat,
  contactDisplay,
  contactImage,
  newOutMessage,
  setOutMessage,
  newIncomingMessage,
  setIncomingMessage,
  controllerRef,
}) {
  const API_URL =
    import.meta.env.VITE_RENDER_API_URL || "http://localhost:5000";
  const [unsentMsgs, setUnsentMsgs] = useState({});
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState("Loading");

  useEffect(() => {
    if (chat in unsentMsgs) {
      setMessage(unsentMsgs[chat]);
    } else {
      setMessage("");
    }
  }, [chat]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (messages === "Loading") return;
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_URL}/chat/${chat}/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: message }),
      });
      if (!response.ok) {
        const res = await response.json();
        throw new Error(res.message);
      }
      const res = await response.json();
      setIncomingMessage(res.messageObj);
      setMessage("");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return Object.keys(chat).length !== 0 ? (
    <div className="flex-1 2xl:min-w-[550px] sm:min-w-lg-[700px] flex flex-col h-screen sm:flex">
      <div className="flex justify-center items-center bg-[var(--gray-800)] gap-[14vw] py-[2vh] 2xl:mr-[15px] sm:hidden">
        <Back
          onClick={() => {
            setChat({});
          }}
          className="dark:brightness-200 w-[32px] "
        />
        <Phone className="dark:brightness-200" />
        <Video className="dark:brightness-200" />
        <Search className="dark:brightness-200" />
        <More className="dark:brightness-200" />
      </div>
      <div className="flex justify-between 2xl:mt-[41px] sm:mt-lg-[41px] mt-[2.5vh] 2xl:ml-[56px] sm:ml-lg-[56px] 2xl:pb-[24.5px] pb-lg-[24.5px] 2xl:mr-[54.5px] sm:mr-lg-[54.5px] border-b-2 border-[var(--gray-500)] dark:border-[var(--gray-100)]">
        <div className="flex ml-[25px] sm:ml-0">
          <img
            src={contactImage || ProfilePic}
            className="2xl:w-[85px] w-lg-[85px] 2xl:h-[85px] h-lg-[85px] 2xl:min-w-[85px] min-w-lg-[85px] rounded-full object-cover"
          ></img>
          <div className="flex flex-col 2xl:mt-[10px] mt-lg-[10px] 2xl:ml-[25px] ml-lg-[25px]">
            <div className="font-poppins text-[var(--gray-500)] dark:text-[var(--gray-300)] 2xl:text-[22px] text-lg-[22px] font-semibold">
              {contactDisplay}
            </div>
            <div className="flex 2xl:mt-[2px] sm:mt-lg-[2px] mt-[0.6vh]">
              <div className="2xl:w-[14px] w-lg-[14px] 2xl:h-[14px] 2xl:mt-[7px] sm:mt-lg-[7px] mt-[0.5vh] h-lg-[14px] rounded-full 2xl:border-3 border-2 border-[var(--gray-100)] dark:border-[var(--gray-300)]"></div>
              <div className="font-poppins  2xl:ml-[7px] ml-lg-[7px]  text-[var(--gray-500)] dark:text-[var(--gray-300)] 2xl:text-[18px] text-lg-[18px]">
                Last seen: 20:20
              </div>
            </div>
          </div>
        </div>
        <div className="flex 2xl:gap-[47.5px] gap-lg-[47.5px] 2xl:mt[28px] mt-lg-[28px] 2xl:mr-[15px] mr-lg-[15px] hidden sm:flex">
          <Phone className="dark:brightness-200" />
          <Video className="dark:brightness-200" />
          <Search className="dark:brightness-200" />
          <More className="dark:brightness-200" />
        </div>
      </div>
      <MessageList
        chat={chat}
        newOutMessage={newOutMessage}
        newIncomingMessage={newIncomingMessage}
        messages={messages}
        setMessages={setMessages}
        incomingMessage={newOutMessage}
      />
      <form
        onSubmit={(e) => handleSend(e)}
        className="flex 2xl:pt-[31px] pt-lg-[31px] 2xl:mb-[39px] mb-lg-[39px] 2xl:ml-[56px] sm:ml-lg-[56px] 2xl:mr-[54.5px] sm:mr-lg-[54.5px] border-t-2 border-[var(--gray-500)] dark:border-[var(--gray-100)]"
      >
        <Add className="2xl:w-[31px] w-lg-[31px]  dark:brightness-200 sm:ml-0 ml-[3vw]" />
        <input
          type="text"
          onChange={(e) => {
            setMessage(e.target.value);
            setUnsentMsgs({ ...unsentMsgs, [chat]: message });
          }}
          placeholder="Message Name"
          value={message}
          className="focus:outline-none sm:flex-1 w-[60vw] 2xl:ml-[22.5px] sm:ml-lg-[22.5px] ml-[3vw] 2xl:mr-[10px] sm:mr-lg-[10px] mr-[6vw] font-poppins text-[var(--gray-500)] dark:text-white 2xl:text-[18px] sm:text-lg-[18px] text-[18.5px]"
        ></input>
        <Mic className="2xl:w-[21px] w-lg-[21px]  2xl:h-[28px] h-lg-[28px] 2xl:mt-[2px] mt-lg-[6px] 2xl:mr-[44px] sm:mr-lg-[44px] mr-[6vw] dark:brightness-200" />
        <Emoji className="2xl:w-[30px] w-lg-[30px]  2xl:mr-[2px] sm:mr-lg-[2px] mr-[1px] dark:brightness-200" />
      </form>
    </div>
  ) : (
    <></>
  );
}
export default Conversation;
