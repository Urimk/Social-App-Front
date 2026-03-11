import { useEffect, useState } from "react";
import FriendRequest from "./FriendRequest";

function RequestsList({
  friends,
  setFriends,
  friendRequests,
  setFriendRequests,
  display,
}) {
  const handleAddFriend = (request) => {
    console.log(request);
    friends.push({ usr1: request.from, usr2: request.to, msgs: [] });
    localStorage.setItem("friends", JSON.stringify(friends));
    const newRequests = friendRequests.filter(
      (req) => req.from !== request.form && req.to !== request.to,
    );
    setFriends(friends);
    setFriendRequests(newRequests);
    localStorage.setItem("friendRequests", JSON.stringify(newRequests));
  };

  const handleDeleteRequest = (request) => {
    const newRequests = friendRequests.filter(
      (req) => req.from === request.form && req.to === request.to,
    );
    console.log(newRequests);
    setFriendRequests(newRequests);
    localStorage.setItem("friendRequests", JSON.stringify(newRequests));
  };
  return (
    <div className={friendRequests.length === 0 ? "hidden" : ""}>
      <div className="flex 2xl:ml-[8px] ml-lg-[8px] font-poppins text-[var(--gray-500)] dark:text-[var(--gray-300)] 2xl:text-[16px] sm:text-lg-[16px] sm:mb-lg-[5px] mb-[3px] text-[18px] items-center justify-between">
        <div>Friend Requests</div>
        <div className="font-semibold">...</div>
      </div>
      <ul>
        {friendRequests
          .filter((request) => request.to === display)
          .map((request) => (
            <FriendRequest
              key={request.from}
              request={request}
              handleAddFriend={handleAddFriend}
              handleDeleteRequest={handleDeleteRequest}
            />
          ))}
      </ul>
    </div>
  );
}

export default RequestsList;
