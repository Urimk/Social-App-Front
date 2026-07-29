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
import DefaultPic from "../assets/Default_pic.png";
import ContactList from "../components/ContactList";
import Conversation from "../components/Conversation";
import AddContact from "../components/AddContact";
import Options from "../components/Options";
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import RequestsList from "../components/RequestsList";
import { useSocket } from "../context/SocketProvider";
import { clearAuthStorage } from "../utils/auth";
import toast from "react-hot-toast";

/**
 * Chat page component - Main chat interface.
 * Handles authentication, chat selection, message handling, and UI layout.
 * Includes sidebar with contacts, conversation view, and modals for options and adding contacts.
 */
const Chat = () => {
  const API_URL =
    localStorage.getItem("apiAddress") ||
    import.meta.env.VITE_RENDER_API_URL ||
    "http://localhost:5000";
  const navigate = useNavigate();
  const {
    incomingMessage: newIncomingMessage,
    incomingRequest,
    setIncomingRequest,
    acceptedRequest,
    setAcceptedRequest,
    declinedRequest,
    setDeclinedRequest,
    disconnectSocket,
  } = useSocket();

  const [userId, setUserId] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [chats, setChats] = useState("Loading");
  const [friendRequests, setFriendRequests] = useState("Loading");
  // eslint-disable-next-line no-unused-vars
  const [newOutMessage, setOutMessage] = useState({});
  const [isTop, setIsTop] = useState(true);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") || "false",
  );

  /**
   * Fetches the user's default profile picture.
   */
  const fetchDefaultPic = useCallback(async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/image`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.message);
    }
    const res = await response.json();
    if (res.image) {
      setProfilePic(res.image);
    }
    return res;
  }, [API_URL]);

  /**
   * Fetches friend requests.
   */
  const fetchRequests = useCallback(async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/users/requests`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.message);
    }
    const res = await response.json();
    if (res.requests) {
      setFriendRequests(res.requests);
    }
    return res;
  }, [API_URL]);

  /**
   * Fetches user's chats.
   */
  const fetchChats = useCallback(async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/chat/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.message);
    }
    const res = await response.json();
    if (res.chats) {
      setChats(res.chats);
    }
    return res;
  }, [API_URL]);

  useEffect(() => {
    const init = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
        const currentUserId = storedUser?.id || storedUser?._id || "";
        setUserId(currentUserId);

        await Promise.all([fetchDefaultPic(), fetchRequests(), fetchChats()]);
      } catch {
        console.error("Error initializing chat");
      }
    };

    init();
  }, [fetchChats, fetchDefaultPic, fetchRequests]);

  // Real-time socket effect: Handle incoming friend requests
  useEffect(() => {
    if (incomingRequest && incomingRequest.displayName) {
      setFriendRequests((prev) => {
        const prevArr = Array.isArray(prev) ? prev : [];
        if (
          prevArr.some(
            (req) => req.displayName === incomingRequest.displayName,
          )
        ) {
          return prevArr;
        }
        return [...prevArr, incomingRequest];
      });
      toast.success(`New friend request from ${incomingRequest.displayName}!`);
      setIncomingRequest(null);
    }
  }, [incomingRequest, setIncomingRequest]);

  // Real-time socket effect: Handle accepted friend requests
  useEffect(() => {
    if (acceptedRequest && acceptedRequest.id) {
      setChats((prev) => {
        const prevArr = Array.isArray(prev) ? prev : [];
        if (prevArr.some((chat) => chat.id === acceptedRequest.id)) {
          return prevArr;
        }
        return [...prevArr, acceptedRequest];
      });
      toast.success(
        `${acceptedRequest.friendName} accepted your friend request!`,
      );
      setAcceptedRequest(null);
    }
  }, [acceptedRequest, setAcceptedRequest]);

  // Real-time socket effect: Handle declined friend requests
  useEffect(() => {
    if (declinedRequest && declinedRequest.displayName) {
      toast.error(
        `${declinedRequest.displayName} declined your friend request.`,
      );
      setDeclinedRequest(null);
    }
  }, [declinedRequest, setDeclinedRequest]);

  const [curChat, setCurChat] = useState("");
  const [contactDisplay, setContactDisplay] = useState("");
  const [contactImage, setContactImage] = useState("");

  /**
   * Handles user logout by disconnecting socket and clearing local storage.
   */
  const handleLogout = () => {
    disconnectSocket();
    clearAuthStorage();
    navigate("/login");
  };

  /**
   * Handles chat selection by updating current chat state.
   * @param {string} id - The chat ID.
   * @param {string} contactDisplay - The contact's display name.
   * @param {string} contactImage - The contact's profile image.
   */
  const handleChatSelect = async (id, contactDisplay, contactImage) => {
    setCurChat(id);
    setContactDisplay(contactDisplay);
    setContactImage(contactImage);
  };

  return (
    <div className={darkMode === "true" ? "dark" : ""}>
      {/* Main chat layout */}
      <div
        className="flex flex-col sm:flex-row w-full h-screen min-h-0
        overflow-y-hidden overflow-x-auto dark:bg-[var(--gray-900)]"
      >
        {/* Sidebar */}
        <div
          className={`flex flex-row sm:flex-col justify-center gap-[25vw] sm:gap-0
            sm:justify-between h-[75px] sm:h-full bg-[var(--gray-100)] dark:bg-[var(--gray-800)]
            2xl:py-[39px] py-lg-[39px] 2xl:px-[22px] px-lg-[22px] items-center sm:flex
            ${curChat ? "hidden sm:flex" : ""}`}
        >
          {/* Profile section */}
          <div className="flex sm:flex-col items-center gap-[10vw] sm:gap-0">
            {/* Profile picture (desktop) */}
            <div className="position relative hidden sm:flex">
              <img
                src={profilePic || DefaultPic}
                className="2xl:w-[85px] w-lg-[85px] 2xl:h-[85px] h-lg-[85px]
                  2xl:min-w-[85px] min-w-lg-[85px] rounded-full object-cover"
                alt="User profile"
              />
              <div
                className="2xl:w-[14px] w-lg-[14px] 2xl:h-[14px] h-lg-[14px]
                rounded-full 2xl:border-2 lg:border-1 border-white absolute top-[77%]
                left-[77%] bg-[var(--green-500)] dark:bg-[var(--green-700)]"
              ></div>
            </div>

            {/* Divider */}
            <div
              className="2xl:mt-[26.5px] mt-lg-[26.5px] border-1 2xl:w-[55px] w-lg-[55px]
              rounded-4xl border-[var(--gray-500)] dark:border-[var(--gray-300)]
              hidden sm:flex"
            ></div>

            {/* Message icon */}
            <Message
              className="2xl:w-[31.7px] w-lg-[31.7px] 2xl:h-[28px] sm:h-lg-[28px]
              2xl:mt-[67.1px] sm:mt-lg-[67.1px]"
            />

            {/* Active indicator */}
            <div
              className="2xl:mt-[10.5px] sm:mt-lg-[10.5px] border-1 2xl:w-[17.3px]
              w-lg-[17.3px] rounded-4xl border-[var(--blue-500)] hidden sm:flex"
            ></div>

            {/* Phone icon (coming soon) */}
            <div title="Coming soon">
              <Phone
                className="2xl:mt-[53.5px] sm:mt-lg-[53.5px] 2xl:w-[26.5px]
                w-lg-[26.5px] 2xl:h-[26.5px] h-lg-[26.5px] dark:brightness-200
                opacity-50 cursor-not-allowed"
              />
            </div>

            {/* Bell icon (coming soon) */}
            <div title="Coming soon">
              <Bell
                className="2xl:mt-[64px] sm:mt-lg-[64px] 2xl:w-[24.5px] w-lg-[24.5px]
                2xl:h-[29.5] h-lg-[29.5] dark:brightness-200 opacity-50 cursor-not-allowed"
              />
            </div>

            {/* Settings icon */}
            <Settings
              onClick={() => setIsOptionsOpen(true)}
              className="2xl:mt-[64px] sm:mt-lg-[64px] 2xl:w-[32px] w-lg-[32px]
                2xl:h-[32px] h-lg-[32px] dark:brightness-200"
            />
          </div>

          {/* Logout icon */}
          <Logout
            onClick={handleLogout}
            className="2xl:mb-[41px] sm:mb-lg-[41px] 2xl:w-[25.5px] w-lg-[25.5px]
              2xl:h-[23px] h-lg-[23px] dark:brightness-200 cursor-pointer"
          />
        </div>
        {/* Contact list panel */}
        <div
          className={`flex flex-col 2xl:w-[537px] sm:w-lg-[537px] w-screen min-h-0
            bg-white dark:bg-[var(--gray-900)] 2xl:px-[22px] px-[5vw] sm:px-lg-[22px]
            2xl:pt-[39px] pt-lg-[39px] sm:border-r-3 border-[var(--gray-100)] sm:flex
            ${curChat ? "hidden sm:flex" : ""}`}
        >
          {/* Header */}
          <div
            className="flex 2xl:ml-[15px] sm:ml-lg-[15px] 2xl:mb-[5px] mb-lg-[5px]
            font-poppins text-[var(--gray-500)] dark:text-[var(--gray-300)]
            2xl:text-[22px] sm:text-lg-[22px] text-[26px] font-semibold items-center
            justify-between"
          >
            <div>
              Messages &nbsp;{" "}
              <span
                title="Coming soon"
                className="text-[var(--blue-500)] font-medium 2xl:text-[20px]
                  sm:text-lg-[20px] text-[24px] opacity-50 cursor-not-allowed"
              >
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

          {/* Search input */}
          <div className="relative 2xl:w-[476px] sm:w-lg-[476px]">
            <input
              title="Coming soon"
              type="text"
              placeholder="Search"
              className="sm:w-full 2xl:mb-[21px] w-[84vw] sm:mb-lg-[21px] my-[18px]
                2xl:pl-[40px] pl-lg-[40px] 2xl:pr-[15px] pr-lg-[15px] 2xl:py-[8px]
                py-lg-[8px] 2xl:ml-[15px] sm:ml-lg-[15px] mx-[3vw] bg-[var(--gray-100)]
                2xl:h-[39px] sm:h-lg-[39px] 2xl:mt-[12px] sm:mt-lg-[12px] rounded-2xl
                focus:outline-none focus:ring-1 focus:ring-[var(--blue-500)]
                focus:dark:ring-[var(--blue-400)] placeholder:text-[var(--gray-500)]
                dark:placeholder:text-[var(--gray-300)] dark:text-white 2xl:text-[16px]
                sm:text-lg-[16px] text-[18px] font-poppins dark:bg-[var(--gray-600)]
                focus:dark:ring-[var(--blue-500)] opacity-50 cursor-not-allowed"
            />
            <Search
              className="absolute 2xl:w-[12.5px] sm:w-lg-[12.5px] w-[12.5px]
              2xl:bottom-[27px] sm:bottom-lg-[24px] bottom-[24px] 2xl:left-[34px]
              left-lg-[34px] text-[var(--gray-500)] dark:brightness-200 font-thin"
            />
          </div>

          {/* Scrollable contact list */}
          <div className="flex-1 min-h-0">
            <SimpleBar className="h-full auto-padding-scrollbar">
              {/* Friend requests */}
              <RequestsList
                friendRequests={friendRequests}
                setFriendRequests={setFriendRequests}
                friends={chats}
                setFriends={setChats}
              />

              {/* Pinned conversations (hidden) */}
              <div className="hidden">
                <div
                  className="flex 2xl:ml-[8px] ml-lg-[8px] font-poppins
                  text-[var(--gray-500)] dark:text-[var(--gray-300)] 2xl:text-[16px]
                  sm:text-lg-[16px] sm:mb-lg-[5px] mb-[3px] text-[18px] items-center
                  justify-between"
                >
                  <div>Pinned Conversations</div>
                  <div className="font-semibold">...</div>
                </div>
                <ContactList
                  users={chats}
                  curChat={curChat}
                  handleChatSelect={handleChatSelect}
                  newOutMessage={newOutMessage}
                  newIncomingMessage={newIncomingMessage}
                  userId={userId}
                />
              </div>

              {/* All conversations */}
              <div
                className="flex 2xl:mt-[21px] mt-lg-[21px] 2xl:mb-[5px] sm:mb-lg-[5px]
                mb-[3px] 2xl:ml-[8px] ml-lg-[8px] font-poppins text-[var(--gray-500)]
                dark:text-[var(--gray-300)] 2xl:text-[16px] sm:text-lg-[16px] text-[18px]
                items-center justify-between"
              >
                <div>All</div>
                <div
                  title="Coming Soon"
                  className="font-semibold opacity-50 cursor-not-allowed"
                >
                  ...
                </div>
              </div>
              <ContactList
                users={chats}
                curChat={curChat}
                handleChatSelect={handleChatSelect}
                newOutMessage={newOutMessage}
                newIncomingMessage={newIncomingMessage}
                userId={userId}
              />
            </SimpleBar>
          </div>
        </div>
        {/* Conversation view */}
        <Conversation
          chat={curChat}
          setChat={setCurChat}
          contactDisplay={contactDisplay}
          contactImage={contactImage}
          newOutMessage={newOutMessage}
          newIncomingMessage={newIncomingMessage}
          setOutMessage={setOutMessage}
        />

        {/* Add contact modal */}
        <AddContact
          isWindowOpen={isWindowOpen}
          setIsWindowOpen={setIsWindowOpen}
        />

        {/* Options modal */}
        <Options
          isTop={isTop}
          setIsTop={setIsTop}
          isOptionsOpen={isOptionsOpen}
          setIsOptionsOpen={setIsOptionsOpen}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          profilePic={profilePic}
          setProfilePic={setProfilePic}
        />
      </div>
    </div>
  );
};
export default Chat;
