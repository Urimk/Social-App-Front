import { Checkmark } from "../assets/icons";

import ProfilePic from "../assets/Default_pic.png";

function FriendRequest({ request, handleDeleteRequest, handleAddFriend }) {
  return (
    <div className="2xl:w-[488px] sm:w-lg-[488px] 2xl:h-[115px] h-lg-[115px] mt-[1px] 2xl:py-[16px] py-lg-[16px] 2xl:px-[14.5px] px-lg-[14.5px] flex 2xl:rounded-[18px] rounded-lg   flex items-center">
      <img
        src={request.image || ProfilePic}
        className="2xl:w-[85px] w-lg-[85px] 2xl:h-[85px] h-lg-[85px] 2xl:min-w-[85px] min-w-lg-[85px] rounded-full object-cover"
      ></img>
      <div className="flex justify-between 2xl:w-[350px] sm:w-lg-[350px] w-[63vw] 2xl:ml-[30px] ml-lg-[30px]">
        <div className="2xl:text-[20px] text-lg-[20px] text-[var(--gray-500)] dark:text-[var(--gray-300)] font-poppins font-semibold">
          {request.displayName}
        </div>
      </div>
      <button
        type="button"
        onClick={() => handleDeleteRequest(request)}
        className={` 2xl:text-[21px] sm:text-lg-[21px] text-[16px]  2xl:px-[10px] sm:px-lg-[10px] px-[13px] 2xl:py-[1px] sm:py-lg-[1px] py-[6px]  font-poppins  rounded-full text-[var(--red-500)] border-2 border-[var(--red-500)] bg-[var(--gray-100)] dark:bg-[var(--gray-800)] font-semibold  shadow-md transition duration-300 ease-in-out cursor-pointer font-thin`}
      >
        X
      </button>

      <button
        type="submit"
        onClick={() => handleAddFriend(request)}
        className={`2xl:mx-[20px] sm:mx-lg-[20px] mx-[20px] 2xl:w-[50px] sm:w-lg-[50px] w-[52px]  2xl:h-[38px] sm:h-lg-[38px] h-[38px] 2xl:px-[4x] sm:px-lg-[4px] px-[6px]  font-poppins  rounded-full text-[var(--green-500)]  dark:text-[var(--green-700)] border-2 border-[var(--green-500)] dark:border-[var(--green-700)] bg-[var(--gray-100)] dark:bg-[var(--gray-800)] font-semibold  shadow-md transition duration-300 ease-in-out cursor-pointer`}
      >
        {<Checkmark />}
      </button>
    </div>
  );
}

export default FriendRequest;
