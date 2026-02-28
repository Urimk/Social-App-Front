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
import ContactList from "../components/ContactList";

const Chat = () => {
  return (
    <div>
      <div className="flex w-full h-screen">
        <div className="flex flex-col justify-between  h-full bg-[var(--field-bg)] 2xl:py-[39px] py-lg-[39px] 2xl:px-[22px] px-lg-[22px] items-center">
          <div className="flex flex-col items-center">
            <div className="position relative">
              <img
                src={ProfilePic}
                className="2xl:w-[85px] w-lg-[85px] rounded-lg"
              ></img>
              <div className="2xl:w-[14px] w-lg-[14px] 2xl:h-[14px] h-lg-[14px] rounded-full 2xl:border-2 lg:border-1 border-white absolute top-[77%] left-[77%] bg-[var(--online-color)]"></div>
            </div>
            <div className="2xl:mt-[26.5px] mt-lg-[26.5px] border-1 2xl:w-[55px] w-lg-[55px] rounded-4xl border-[var(--text-color)]"></div>
            <Message className="2xl:w-[31.7px] w-lg-[31.7px] 2xl:h-[28px] h-lg-[28px] text-[var(--checkbox-color)] 2xl:mt-[67.1px] mt-lg-[67.1px]" />
            <div className="2xl:mt-[10.5px] mt-lg-[10.5px] border-1 2xl:w-[17.3px] w-lg-[17.3px] rounded-4xl border-[var(--checkbox-color)]"></div>
            <Phone className="2xl:mt-[53.5px] mt-lg-[53.5px] 2xl:w-[26.5px] w-lg-[26.5px] 2xl:h-[26.5px] h-lg-[26.5px]" />
            <Bell className="2xl:mt-[64px] mt-lg-[64px] 2xl:w-[24.5px] w-lg-[24.5px] 2xl:h-[29.5] h-lg-[29.5]" />
            <Settings className="2xl:mt-[64px] mt-lg-[64px] 2xl:w-[32px] w-lg-[32px] 2xl:h-[32px] h-lg-[32px]" />
          </div>

          <Logout className="2xl:mb-[41px] mb-lg-[41px] 2xl:w-[25.5px] w-lg-[25.5px] 2xl:h-[23px] h-lg-[23px]" />
        </div>
        <div className="flex flex-col 2xl:w-[537px] w-lg-[537px] h-screen bg-white 2xl:px-[22px] px-lg-[22px] 2xl:pt-[39px] pt-lg-[39px] border-r-3 border-[var(--field-bg)]">
          <div className="flex 2xl:ml-[15px] ml-lg-[15px] 2xl:mb-[5px] mb-lg-[5px] font-poppins text-[var(--text-color)] 2xl:text-[22px] text-lg-[22px] font-semibold items-center justify-between">
            <div>
              Messages &nbsp;{" "}
              <span className="text-[var(--checkbox-color)] font-medium 2xl:text-[20px] text-lg-[20px]">
                (23)
              </span>
            </div>
            <div className="font-medium">+</div>
          </div>
          <div className="relative 2xl:w-[476px] w-lg-[476px]">
            <input
              type="text"
              placeholder="Search"
              className="w-full 2xl:mb-[21px] mb-lg-[21px] 2xl:pl-[40px] pl-lg-[40px] 2xl:pr-[15px] pr-lg-[15px] 2xl:py-[8px] py-lg-[8px] 2xl:ml-[15px] ml-lg-[15px] bg-[var(--field-bg)] 2xl:h-[39px] h-lg-[39px] 2xl:mt-[12px] mt-lg-[12px] rounded-2xl focus:outline-none focus:ring-1 focus:ring-[var(--checkbox-color)] focus:dark:ring-[var(--dark-checkbox)] transition-all duration-200 ease-in-out placeholder:text-[var(--text-color)] 2xl:text-[16px] text-lg-[16px] font-poppins"
            ></input>
            <Search className="absolute 2xl:w-[12.5px] w-lg-[12.5px] 2xl:bottom-[27px] bottom-lg-[16px] 2xl:left-[34px] left-lg-[34px] text-[var(--text-color)] font-thin" />
          </div>
          <div className="flex-1 min-h-0">
            <SimpleBar className="h-full auto-padding-scrollbar">
              <div className="flex 2xl:ml-[8px] ml-lg-[8px] font-poppins text-[var(--text-color)] 2xl:text-[16px] text-lg-[16px] items-center justify-between">
                <div>Pinned Conversations</div>
                <div className="font-semibold">...</div>
              </div>
              <ContactList />
              <div className="flex 2xl:mt-[21px] mt-lg-[21px] 2xl:mb-[5px] mb-lg-[5px] 2xl:ml-[8px] ml-lg-[8px] font-poppins text-[var(--text-color)] 2xl:text-[16px] text-lg-[16px] items-center justify-between">
                <div>All</div>
                <div className="font-semibold">...</div>
              </div>
              <ContactList />
            </SimpleBar>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chat;
