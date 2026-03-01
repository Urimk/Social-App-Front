import Message from "./Message";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

function MessageList() {
  return (
    <div className="flex-1 min-h-0 flex flex-col justify-end">
      <div className="2xl:ml-[56px] ml-lg-[56px] 2xl:mr-[54.5px] mr-lg-[54.5px] flex flex-col ">
        <SimpleBar className="h-full auto-padding-scrollbar">
          <div className="2xl-mb-[40px] mb-lg-[40px] font-poppins text-[var(--text-color)] 2xl:text-[18px] text-lg-[18px] text-center">
            Today 01/03
          </div>
          <Message isOwn={true} />
          <Message isOwn={false} />
          <Message isOwn={true} />
        </SimpleBar>
      </div>
    </div>
  );
}
export default MessageList;
