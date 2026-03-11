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
import Conversation from "../components/Conversation";
import AddContact from "../components/AddContact";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RequestsList from "../components/RequestsList";

const Chat = () => {
  const navigate = useNavigate();

  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || [],
  );
  const [friends, setFriends] = useState(
    JSON.parse(localStorage.getItem("friends")) || [],
  );
  const [friendRequests, setFriendRequests] = useState(
    JSON.parse(localStorage.getItem("friendRequests")) || [],
  );
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users")) || [],
  );
  const [selected, setSelected] = useState("");
  const [curChat, setCurChat] = useState({});

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const handleChatSelect = (display) => {
    setSelected(display);
    setCurChat(
      friends.find(
        (friendship) =>
          (friendship.usr1 === currentUser.display &&
            friendship.usr2 === display) ||
          (friendship.usr1 === display &&
            friendship.usr2 === currentUser.display),
      ),
    );
  };
  return (
    <div>
      <div className="flex flex-col sm:flex-row w-full h-screen min-h-0  overflow-y-hidden overflow-x-auto dark:bg-[var(--gray-900)]">
        <div className="flex flex-row sm:flex-col justify-center gap-[25vw] sm:gap-0 sm:justify-between h-[75px] sm:h-full bg-[var(--gray-100)] dark:bg-[var(--gray-800)] 2xl:py-[39px] py-lg-[39px] 2xl:px-[22px] px-lg-[22px] items-center sm:flex">
          <div className="flex sm:flex-col items-center gap-[10vw] sm:gap-0">
            <div className="position relative hidden sm:flex">
              <img
                src={currentUser?.image || ProfilePic}
                className="2xl:w-[85px] w-lg-[85px] 2xl:min-w-[85px] min-w-lg-[85px] rounded-full"
              ></img>
              <div className="2xl:w-[14px] w-lg-[14px] 2xl:h-[14px] h-lg-[14px] rounded-full 2xl:border-2 lg:border-1 border-white absolute top-[77%] left-[77%] bg-[var(--green-500)] dark:bg-[var(--green-700)]"></div>
            </div>
            <div className="2xl:mt-[26.5px] mt-lg-[26.5px] border-1 2xl:w-[55px] w-lg-[55px] rounded-4xl border-[var(--gray-500)] dark:border-[var(--gray-300)] hidden sm:flex"></div>
            <Message className="2xl:w-[31.7px] w-lg-[31.7px] 2xl:h-[28px] sm:h-lg-[28px] 2xl:mt-[67.1px] sm:mt-lg-[67.1px]  " />
            <div className="2xl:mt-[10.5px] sm:mt-lg-[10.5px] border-1 2xl:w-[17.3px] w-lg-[17.3px] rounded-4xl border-[var(--blue-500)] hidden sm:flex"></div>
            <Phone className="2xl:mt-[53.5px] sm:mt-lg-[53.5px] 2xl:w-[26.5px] w-lg-[26.5px] 2xl:h-[26.5px] h-lg-[26.5px] dark:brightness-200" />
            <Bell className="2xl:mt-[64px] sm:mt-lg-[64px] 2xl:w-[24.5px] w-lg-[24.5px] 2xl:h-[29.5] h-lg-[29.5] dark:brightness-200" />
            <Settings className="2xl:mt-[64px] sm:mt-lg-[64px] 2xl:w-[32px] w-lg-[32px] 2xl:h-[32px] h-lg-[32px] dark:brightness-200" />
          </div>

          <Logout
            onClick={handleLogout}
            className="2xl:mb-[41px] sm:mb-lg-[41px] 2xl:w-[25.5px] w-lg-[25.5px] 2xl:h-[23px] h-lg-[23px] dark:brightness-200 cursor-pointer"
          />
        </div>
        <div className="flex flex-col 2xl:w-[537px] sm:w-lg-[537px] w-screen min-h-0 bg-white dark:bg-[var(--gray-900)] 2xl:px-[22px] px-[5vw] sm:px-lg-[22px] 2xl:pt-[39px] pt-lg-[39px] sm:border-r-3 border-[var(--gray-100)] sm:flex ">
          <div className="flex 2xl:ml-[15px] sm:ml-lg-[15px] 2xl:mb-[5px] mb-lg-[5px] font-poppins text-[var(--gray-500)] dark:text-[var(--gray-300)] 2xl:text-[22px] sm:text-lg-[22px] text-[26px] font-semibold items-center justify-between">
            <div>
              Messages &nbsp;{" "}
              <span className="text-[var(--blue-500)]  font-medium 2xl:text-[20px] sm:text-lg-[20px] text-[24px]">
                (23)
              </span>
            </div>
            <button
              onClick={() => setIsWindowOpen(true)}
              className="font-medium cursor-pointer"
            >
              +
            </button>
          </div>
          <div className="relative 2xl:w-[476px] sm:w-lg-[476px] ">
            <input
              type="text"
              placeholder="Search"
              className="sm:w-full 2xl:mb-[21px] w-[84vw] sm:mb-lg-[21px] my-[18px] 2xl:pl-[40px] pl-lg-[40px] 2xl:pr-[15px] pr-lg-[15px] 2xl:py-[8px] py-lg-[8px] 2xl:ml-[15px] sm:ml-lg-[15px] mx-[3vw] bg-[var(--gray-100)] 2xl:h-[39px] sm:h-lg-[39px] 2xl:mt-[12px] sm:mt-lg-[12px]  rounded-2xl focus:outline-none focus:ring-1 focus:ring-[var(--blue-500)] focus:dark:ring-[var(--blue-400)] transition-all duration-200 ease-in-out placeholder:text-[var(--gray-500)] dark:placeholder:text-[var(--gray-300)] dark:text-white 2xl:text-[16px] sm:text-lg-[16px] text-[18px] font-poppins dark:bg-(--gray-600) focus:dark:ring-[var(--blue-500)]"
            ></input>
            <Search className="absolute 2xl:w-[12.5px] sm:w-lg-[12.5px] w-[12.5px] 2xl:bottom-[27px] sm:bottom-lg-[24px] bottom-[24px] 2xl:left-[34px] left-lg-[34px] text-[var(--gray-500)]  dark:brightness-200  font-thin" />
          </div>
          <div className="flex-1 min-h-0">
            <SimpleBar className="h-full auto-padding-scrollbar">
              <RequestsList
                friends={friends}
                setFriends={setFriends}
                friendRequests={friendRequests}
                setFriendRequests={setFriendRequests}
                display={currentUser.display}
              />
              <div className="hidden">
                <div className="flex 2xl:ml-[8px] ml-lg-[8px] font-poppins text-[var(--gray-500)] dark:text-[var(--gray-300)] 2xl:text-[16px] sm:text-lg-[16px] sm:mb-lg-[5px] mb-[3px] text-[18px] items-center justify-between">
                  <div>Pinned Conversations</div>
                  <div className="font-semibold">...</div>
                </div>
                <ContactList
                  users={friends
                    .filter(
                      (friendship) =>
                        friendship.usr1 === currentUser.display ||
                        friendship.usr2 === currentUser.display,
                    )
                    .map((friendship) =>
                      friendship.usr1 === currentUser.display
                        ? friendship.usr2
                        : friendship.usr1,
                    )
                    .map((display) =>
                      users.find((user) => user.display === display),
                    )}
                  selected={selected}
                  handleChatSelect={handleChatSelect}
                />
              </div>
              <div className="flex 2xl:mt-[21px] mt-lg-[21px] 2xl:mb-[5px] sm:mb-lg-[5px] mb-[3px] 2xl:ml-[8px] ml-lg-[8px] font-poppins text-[var(--gray-500)] dark:text-[var(--gray-300)] 2xl:text-[16px] sm:text-lg-[16px] text-[18px] items-center justify-between">
                <div>All</div>
                <div className="font-semibold">...</div>
              </div>
              <ContactList
                users={friends
                  .filter(
                    (friendship) =>
                      friendship.usr1 === currentUser.display ||
                      friendship.usr2 === currentUser.display,
                  )
                  .map((friendship) =>
                    friendship.usr1 === currentUser.display
                      ? friendship.usr2
                      : friendship.usr1,
                  )
                  .map((display) =>
                    users.find((user) => user.display === display),
                  )}
                selected={selected}
                handleChatSelect={handleChatSelect}
              />
            </SimpleBar>
          </div>
        </div>
        <Conversation
          contact={users.find((user) => user.display === selected)}
          chat={curChat}
          setChat={setCurChat}
        />
        <AddContact
          isWindowOpen={isWindowOpen}
          setIsWindowOpen={setIsWindowOpen}
          currentDisplay={currentUser.display}
          friendRequests={friendRequests}
          setFriendRequests={setFriendRequests}
          users={users}
        />
      </div>
    </div>
  );
};
export default Chat;
