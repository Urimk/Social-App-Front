import Contact from "./Contact";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

/**
 * ContactList component for displaying the list of contacts.
 * @param {Object} props - The component props.
 * @param {Array|string} props.users - List of users or "Loading".
 * @param {Object} props.curChat - Current selected chat.
 * @param {Function} props.handleChatSelect - Function to handle chat selection.
 * @param {Object} props.newIncomingMessage - New incoming message.
 * @param {Object} props.newOutMessage - New outgoing message.
 * @param {string} props.userId - Current user ID.
 */
const ContactList = ({
  users = [],
  curChat,
  handleChatSelect,
  newIncomingMessage,
  newOutMessage,
  userId,
}) => {
  const isLoading = users === "Loading";
  const userList = Array.isArray(users) ? users : [];

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          minHeight: "50px",
          pt: {
            xs: "15px",
            sm: "25px",
            md: "35px",
          },
        }}
      >
        <CircularProgress
          sx={{
            width: { xs: 40, sm: 50, md: 60 },
            height: { xs: 40, sm: 50, md: 60 },
          }}
        />
      </Box>
    );
  }

  if (userList.length === 0) {
    return (
      <div className="py-4 text-center text-[var(--gray-500)] dark:text-[var(--gray-300)] opacity-60 font-poppins text-sm">
        No contacts found
      </div>
    );
  }

  return (
    <ul>
      {userList.map((user, index) => (
        <li key={user.id || user._id || index}>
          <Contact
            id={user.id || user._id}
            userId={userId}
            image={user.image}
            display={user.friendName}
            message={user.lastMessage}
            curChat={curChat}
            handleChatSelect={handleChatSelect}
            newOutMessage={newOutMessage}
            newIncomingMessage={newIncomingMessage}
          />
        </li>
      ))}
    </ul>
  );
};
export default ContactList;
