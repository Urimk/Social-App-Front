import Contact from "./Contact";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const ContactList = ({
  users,
  curChat,
  handleChatSelect,
  newIncomingMessage,
  newOutMessage,
  userId,
}) => {
  return users === "Loading" ? (
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
  ) : (
    <ul>
      {users.map((user) => (
        <Contact
          key={user.id}
          id={user.id}
          userId={userId}
          image={user.image}
          display={user.friendName}
          message={user.lastMessage}
          curChat={curChat}
          handleChatSelect={handleChatSelect}
          newOutMessage={newOutMessage}
          newIncomingMessage={newIncomingMessage}
        />
      ))}
    </ul>
  );
};
export default ContactList;
