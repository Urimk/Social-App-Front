import Message from "./Message";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

function MessageList({ chat, curDisplay }) {
  return (
    <div className="flex-1 min-h-0 flex flex-col justify-end">
      <div className="2xl:ml-[56px] sm:ml-lg-[56px] ml-[5vw] 2xl:mr-[54.5px] sm:mr-lg-[54.5px] mr-[5vw] flex flex-col ">
        <SimpleBar className="h-full auto-padding-scrollbar">
          <div className="2xl-mb-[40px] mb-lg-[40px] font-poppins text-[var(--gray-500)] dark:text-[var(--gray-300)] 2xl:text-[18px] sm:text-lg-[18px] text-[18.5px] text-center">
            Today 01/03
          </div>
          {chat.msgs.map((msg) => {
            return <Message key={msg} msg={msg} curDisplay={curDisplay} />;
          })}
        </SimpleBar>
      </div>
    </div>
  );
}
export default MessageList;
