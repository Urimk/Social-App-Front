import { Bell, Message, Logout, Phone, Settings } from "../assets/icons";
import ProfilePic from "../assets/Default_pic.png";

const Chat = () => {
  return (
    <div>
      <div className="flex w-full h-screen">
        <div className="flex flex-col justify-between w-[128px] h-full bg-[var(--field-bg)] py-[3.6vh] px-[22px] items-center">
          <div className="flex flex-col items-center">
            <div className="position relative">
              <img src={ProfilePic} className="w-[85px] rounded-lg"></img>
              <div className="w-[16px] h-[16px] rounded-full border-2 border-white absolute top-[77%] left-[77%] bg-[var(--online-color)]"></div>
            </div>
            <div className="mt-[2.5vh] border-2 w-[55px] rounded-4xl border-[var(--text-color)]"></div>
            <Message className="w-[32px] text-[var(--checkbox-color)] mt-[6.2vh]" />
            <div className="mt-[1vh] border-1 w-[17px] rounded-4xl border-[var(--checkbox-color)]"></div>
            <Phone className="mt-[5vh] w-[26.5px]" />
            <Bell className="mt-[6vh] w-[24.5px]" />
            <Settings className="mt-[6vh] w-[32px]" />
          </div>

          <Logout className="mb-[2vh] w-[25.5]" />
        </div>
      </div>
    </div>
  );
};
export default Chat;
