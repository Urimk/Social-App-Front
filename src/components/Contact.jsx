import ProfilePic from "../assets/Default_pic.png";
import { Checkmark } from "../assets/icons";
import { useEffect, useState } from "react";

function Contact({
  curChat,
  id,
  userId,
  image,
  display,
  message,
  handleChatSelect,
  newOutMessage,
  newIncomingMessage,
}) {
  const [msg, setMsg] = useState(message);
  useEffect(() => {
    if (newOutMessage.chatId === id) {
      setMsg(newOutMessage);
    }
  }, [newOutMessage]);

  useEffect(() => {
    if (newIncomingMessage.chatId === id) {
      setMsg(newIncomingMessage);
    }
  }, [newIncomingMessage]);
  console.log(msg);
  console.log(msg?.authorId, id);
  return (
    <div
      onClick={() => {
        handleChatSelect(id, display, image);
      }}
      className={`2xl:w-[488px] sm:w-lg-[488px] 2xl:h-[115px] h-lg-[115px] mt-[1px] 2xl:py-[16px] py-lg-[16px] 2xl:px-[14.5px] px-lg-[14.5px] flex 2xl:rounded-[18px] rounded-lg ${curChat === id ? `bg-[var(--gray-100)] dark:bg-[var(--gray-800)]` : ""}`}
    >
      <div className="relative">
        <img
          src={image || ProfilePic}
          className="2xl:w-[85px] w-lg-[85px] 2xl:h-[85px] h-lg-[85px] 2xl:min-w-[85px] min-w-lg-[85px] rounded-full object-cover"
        ></img>
        <div className="2xl:w-[14px] w-lg-[14px] 2xl:h-[14px] h-lg-[14px] rounded-full 2xl:border-2 lg:border-1 border-white absolute sm:top-[77%] sm:left-[77%] top-[77%] left-[77%] bg-[var(--green-500)] dark:bg-[var(--green-700)]"></div>
      </div>
      <div className="flex flex-col 2xl:mt-[13px] mt-lg-[13px] 2xl:ml-[30px] ml-lg-[30px] 2xl:gap-[4px] sm:gap-lg-[4px] gap-[1px]">
        <div className="flex justify-between 2xl:w-[350px] sm:w-lg-[350px] w-[63vw]">
          <div className="2xl:text-[20px] text-lg-[20px] text-[var(--gray-500)] dark:text-[var(--gray-300)] font-poppins font-semibold">
            {display}
          </div>
          <div className="2xl:text-[16px] text-lg-[16px] text-[var(--gray-500)] dark:text-[var(--gray-300)] font-poppins opacity-40">
            {"20:53"}
          </div>
        </div>
        <div className="flex justify-between 2xl:w-[350px]">
          <div
            className={`2xl:text-[16px] sm:text-lg-[16px] text-[18px] 2xl:ml-[6px] ml-lg-[6px] ${msg ? (msg.authorId === userId ? "text-[var(--blue-500)]" : `text-[var(--gray-500)] dark:text-[var(--gray-300)]`) : "text-[var(--blue-500)] font-semibold"} font-poppins`}
          >
            {msg?.text ? msg.text : "New Chat"}
          </div>
          <div className="2xl:text-[16px] text-lg-[16px] text-[var(--gray-500)] dark:text-[var(--gray-300)] font-poppins relative">
            <div className="text-[var(--blue-500)]">
              <Checkmark className="absolute right-[35%] 2xl:w-[20px] w-lg-[20px] 2xl:h-[20px] h-lg-[20px]" />
              <Checkmark className="2xl:w-[20px] w-lg-[20px] 2xl:h-[20px] h-lg-[20px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Contact;
