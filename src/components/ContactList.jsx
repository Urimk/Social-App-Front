import Contact from "./Contact";

const ContactList = ({ users, selected, handleChatSelect }) => {
  return (
    <ul>
      {users.map((user) => (
        <Contact
          key={user.display}
          display={user.display}
          selected={selected}
          handleChatSelect={handleChatSelect}
        />
      ))}
    </ul>
  );
};
export default ContactList;
