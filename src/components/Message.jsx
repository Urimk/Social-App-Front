import { Checkmark } from "../assets/icons";

const Message = ({ isOwn }) => {
  return (
    <div className={`flex flex-col ${isOwn ? "" : "items-end"}`}>
      <div
        className={` ${isOwn ? `bg-[linear-gradient(222deg,var(--blue-500),var(--purple-600))] dark:bg-[linear-gradient(100deg,var(--blue-400),var(--purple-500))] text-white rounded-r-4xl rounded-tl-4xl` : `bg-[var(--gray-100)] dark:bg-[var(--gray-300)] text-[var(--gray-500) dark:text-black rounded-l-4xl rounded-tr-4xl`}
                     max-w-7/10 w-fit 2xl:px-[41px] px-lg-[41px] 2xl-py-[13px] py-lg-[13px] font-poppins 2xl:text-[20px] text-lg-[20px] text-warp break-all`}
      >
        Hey
      </div>
      <div
        className={`flex ${isOwn ? "" : "items-end"} font-poppins text-[var(--gray-500)] dark:text-[var(--gray-300)] 2xl:text-[16px] text-lg-[16px] opacity-40 2xl:mt-[3px] mt-lg-[3px]`}
      >
        <div>12:00</div>
        <div className={`${isOwn ? "" : "hidden"} flex relative`}>
          <Checkmark className="2xl:w-[20px] w-lg-[20px] 2xl:h-[20px] h-lg-[20px]" />
          <Checkmark className="absolute 2xl:left-[7px] left-lg-[7px] 2xl:w-[20px] w-lg-[20px] 2xl:h-[20px] h-lg-[20px]" />
        </div>
      </div>
    </div>
  );
};
export default Message;
