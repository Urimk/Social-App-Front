import FriendRequest from "./FriendRequest";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function RequestsList({
  friendRequests,
  setFriendRequests,
  friends,
  setFriends,
}) {
  const API_URL =
    localStorage.getItem("apiAddress") ||
    import.meta.env.VITE_RENDER_API_URL ||
    "http://localhost:5000";

  const handleAddFriend = async (request) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_URL}/chat/${request.displayName}/acceptRequest`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.message);
    }
    const res = await response.json();
    setFriendRequests(
      friendRequests.filter((req) => request.displayName != req.displayName),
    );
    const newFriends = [...friends, res.chat];
    setFriends(newFriends);
  };

  const handleDeleteRequest = async (request) => {
    const token = localStorage.getItem("token");
    const response = await fetch(
      `${API_URL}/users/${request.displayName}/request`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      },
    );
    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.message);
    }
    setFriendRequests(
      friendRequests.filter((req) => request.displayName != req.displayName),
    );
  };

  return (
    <div className={friendRequests.length === 0 ? "hidden" : ""}>
      <div className="flex 2xl:ml-[8px] ml-lg-[8px] font-poppins text-[var(--gray-500)] dark:text-[var(--gray-300)] 2xl:text-[16px] sm:text-lg-[16px] sm:mb-lg-[5px] mb-[3px] text-[18px] items-center justify-between">
        <div>Friend Requests</div>
        <div className="font-semibold">...</div>
      </div>
      {friendRequests === "Loading" ? (
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
          {friendRequests.map((request) => (
            <FriendRequest
              key={request}
              request={request}
              handleAddFriend={handleAddFriend}
              handleDeleteRequest={handleDeleteRequest}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

export default RequestsList;
