import ProfilePic from "../assets/Default_pic.png";
import { Phone, Search, Video, More, Add, Emoji, Mic } from "../assets/icons";
import MessageList from "./MessageList";

function Conversation() {
  return (
    <div className="flex-1 2xl:min-w-[550px] min-w-lg-[700px] flex flex-col h-screen">
      <div className="flex justify-between 2xl:mt-[41px] mt-lg-[41px] 2xl:ml-[56px] ml-lg-[56px] 2xl:pb-[24.5px] pb-lg-[24.5px] 2xl:mr-[54.5px] mr-lg-[54.5px] border-b-2 border-[var(--gray-500)] dark:border-[var(--gray-100)]">
        <div className="flex">
          <img
            src={ProfilePic}
            className="2xl:w-[85px] w-lg-[85px] 2xl:h-[85px] h-lg-[85px] rounded-lg"
          ></img>
          <div className="flex flex-col 2xl:mt-[10px] mt-lg-[10px] 2xl:ml-[25px] ml-lg-[25px]">
            <div className="font-poppins text-[var(--gray-500)] dark:text-[var(--gray-300)] 2xl:text-[22px] text-lg-[22px] font-semibold">
              Name
            </div>
            <div className="flex 2xl:mt-[2px] mt-lg-[2px]">
              <div className="2xl:w-[14px] w-lg-[14px] 2xl:h-[14px] 2xl:mt-[7px] mt-lg-[7px] h-lg-[14px] rounded-full 2xl:border-3 lg:border-2 border-[var(--gray-100)] dark:border-[var(--gray-300)]"></div>
              <div className="font-poppins  2xl:ml-[7px] ml-lg-[7px]  text-[var(--gray-500)] dark:text-[var(--gray-300)] 2xl:text-[18px] text-lg-[18px]">
                Last seen: 20:20
              </div>
            </div>
          </div>
        </div>
        <div className="flex 2xl:gap-[47.5px] gap-lg-[47.5px] 2xl:mt[28px] mt-lg-[28px] 2xl:mr-[15px] mr-lg-[15px]">
          <Phone className="dark:brightness-200" />
          <Video className="dark:brightness-200" />
          <Search className="dark:brightness-200" />
          <More className="dark:brightness-200" />
        </div>
      </div>
      <MessageList />
      <div className="flex 2xl:pt-[31px] pt-lg-[31px] 2xl:mb-[39px] mb-lg-[39px] 2xl:ml-[56px] ml-lg-[56px] 2xl:mr-[54.5px] mr-lg-[54.5px] border-t-2 border-[var(--gray-500)] dark:border-[var(--gray-100)]">
        <Add className="2xl:w-[31px] w-lg-[31px] dark:brightness-200" />
        <input
          type="text"
          placeholder="Message Name"
          className="focus:outline-none flex-1 2xl:ml-[22.5px] ml-lg-[22.5px] 2xl:mr-[10px] mr-lg-[10px] font-poppins text-[var(--gray-500)] dark:text-white 2xl:text-[18px] text-lg-[18px]"
        ></input>
        <Mic className="2xl:w-[21px] w-lg-[21px] 2xl:h-[28px] h-lg-[28px] 2xl:mr-[44px] mr-lg-[44px] dark:brightness-200" />
        <Emoji className="2xl:w-[30px] w-lg-[30px] 2xl:mr-[2px] mr-lg-[2px] dark:brightness-200" />
      </div>
    </div>
  );
}
export default Conversation;
