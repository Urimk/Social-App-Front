import FriendRequest from "./FriendRequest";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import toast from "react-hot-toast";

/**
 * RequestsList component for displaying and managing friend requests.
 * @param {Object} props - The component props.
 * @param {Array|string} props.friendRequests - List of friend requests or "Loading".
 * @param {Function} props.setFriendRequests - Function to update friend requests.
 * @param {Array} props.friends - List of friends.
 * @param {Function} props.setFriends - Function to update friends.
 */
function RequestsList({
  friendRequests = [],
  setFriendRequests,
  friends = [],
  setFriends,
}) {
  const API_URL =
    localStorage.getItem("apiAddress") ||
    import.meta.env.VITE_RENDER_API_URL ||
    "http://localhost:5000";

  const isLoading = friendRequests === "Loading";
  const requestsList = Array.isArray(friendRequests) ? friendRequests : [];

  /**
   * Handles accepting a friend request.
   * @param {Object} request - The friend request object.
   */
  const handleAddFriend = async (request) => {
    try {
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
        const res = await response.json().catch(() => ({}));
        throw new Error(res.message || "Failed to accept friend request");
      }
      const res = await response.json();
      setFriendRequests((prev) =>
        Array.isArray(prev)
          ? prev.filter((req) => req.displayName !== request.displayName)
          : [],
      );
      setFriends((prev) =>
        Array.isArray(prev) ? [...prev, res.chat] : [res.chat],
      );
      toast.success(`Accepted request from ${request.displayName}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  /**
   * Handles deleting a friend request.
   * @param {Object} request - The friend request object.
   */
  const handleDeleteRequest = async (request) => {
    try {
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
        const res = await response.json().catch(() => ({}));
        throw new Error(res.message || "Failed to decline friend request");
      }
      setFriendRequests((prev) =>
        Array.isArray(prev)
          ? prev.filter((req) => req.displayName !== request.displayName)
          : [],
      );
      toast.success(`Declined request from ${request.displayName}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!isLoading && requestsList.length === 0) {
    return null;
  }

  return (
    <div>
      {/* Header */}
      <div
        className="flex 2xl:ml-[8px] ml-lg-[8px] font-poppins
        text-[var(--gray-500)] dark:text-[var(--gray-300)] 2xl:text-[16px]
        sm:text-lg-[16px] sm:mb-lg-[5px] mb-[3px] text-[18px] items-center
        justify-between"
      >
        <div>Friend Requests</div>
        <div className="font-semibold">...</div>
      </div>
      {isLoading ? (
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
          {requestsList.map((request, index) => (
            <FriendRequest
              key={request.id || request._id || request.displayName || index}
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
