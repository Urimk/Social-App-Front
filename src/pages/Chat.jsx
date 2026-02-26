import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import {
  Bell,
  Message,
  Logout,
  Phone,
  Settings,
  Search,
} from "../assets/icons";
import ProfilePic from "../assets/Default_pic.png";

const Chat = () => {
  return (
    <div>
      <div className="flex w-full h-screen">
        <div className="flex flex-col justify-between  h-full bg-[var(--field-bg)] 2xl:py-[39px] 2xl:px-[22px] items-center">
          <div className="flex flex-col items-center">
            <div className="position relative">
              <img src={ProfilePic} className="2xl:w-[85px] rounded-lg"></img>
              <div className="2xl:w-[14px] 2xl:h-[14px] rounded-full border-2 border-white absolute top-[77%] left-[77%] bg-[var(--online-color)]"></div>
            </div>
            <div className="2xl:mt-[26.5px] border-1 2xl:w-[55px] rounded-4xl border-[var(--text-color)]"></div>
            <Message className="2xl:w-[31.7px] 2xl:h-[28px] text-[var(--checkbox-color)] 2xl:mt-[67.1px]" />
            <div className="2xl:mt-[10.5px] border-1 2xl:w-[17.3px] rounded-4xl border-[var(--checkbox-color)]"></div>
            <Phone className="2xl:mt-[53.5px] 2xl:w-[26.5px] 2xl:h-[26.5px]" />
            <Bell className="2xl:mt-[64px] 2xl:w-[24.5px] 2xl:h-[29.5]" />
            <Settings className="2xl:mt-[64px] 2xl:w-[32px] 2xl:h-[32px]" />
          </div>

          <Logout className="2xl:mb-[41px] 2xl:w-[25.5px] 2xl:h-[23px]" />
        </div>
        <div className="2xl:w-[535px] bg-white 2xl:px-[22px] h-full 2xl:py-[39px] border-r-3 border-[var(--field-bg)]">
          <div className="flex 2xl:ml-[15px] font-poppins text-[var(--text-color)] 2xl:text-[22px] font-semibold items-center justify-between">
            <div>
              Messages &nbsp;{" "}
              <span className="text-[var(--checkbox-color)] font-medium 2xl:text-[20px]">
                (23)
              </span>
            </div>
            <div className="font-medium">+</div>
          </div>
          <div className="relative 2xl:w-[476px]">
            <input
              type="text"
              placeholder="Search"
              className="w-full 2xl:pl-[40px] 2xl:pr-[15px] 2xl:py-[8px] 2xl:ml-[15px] bg-[var(--field-bg)] 2xl:h-[39px] 2xl:mt-[12px] rounded-2xl focus:outline-none focus:ring-1 focus:ring-[var(--checkbox-color)] focus:dark:ring-[var(--dark-checkbox)] transition-all duration-200 ease-in-out placeholder:text-[var(--text-color)] 2xl:text-[16px] font-poppins"
            ></input>
            <Search className="absolute 2xl:w-[12.5px] 2xl:bottom-[13%] 2xl:left-[7.5%] text-[var(--text-color)] font-thin" />
          </div>
          <SimpleBar style={{ maxHeight: "100%" }}>
            <div className="flex 2xl:mt-[21px] 2xl:ml-[8px] font-poppins text-[var(--text-color)] 2xl:text-[16px]  items-center justify-between">
              <div>Pinned Conversations</div>
              <div className="font-semibold">...</div>
            </div>
          </SimpleBar>
        </div>
      </div>
    </div>
  );
};
export default Chat;
