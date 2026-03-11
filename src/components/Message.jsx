import { Checkmark } from "../assets/icons";

const Message = ({ msg, curDisplay }) => {
  return (
    <div
      className={`flex flex-col ${msg.author === curDisplay ? "" : "items-end"}`}
    >
      <div
        className={` ${msg.author === curDisplay ? `bg-[linear-gradient(222deg,var(--blue-500),var(--purple-600))] dark:bg-[linear-gradient(100deg,var(--blue-400),var(--purple-500))] text-white rounded-r-4xl rounded-tl-4xl` : `bg-[var(--gray-100)] dark:bg-[var(--gray-300)] text-[var(--gray-500) dark:text-black rounded-l-4xl rounded-tr-4xl`}
                     max-w-7/10 w-fit 2xl:px-[41px] px-lg-[41px] 2xl-py-[13px] py-lg-[13px] font-poppins 2xl:text-[20px] sm:text-lg-[20px] text-[20.5px] text-warp break-all`}
      >
        {msg.msg}
      </div>
      <div
        className={`flex ${msg.author === curDisplay ? "" : "items-end"} font-poppins text-[var(--gray-500)] dark:text-[var(--gray-300)] 2xl:text-[16px] sm:text-lg-[16px] text-[16.5px] opacity-40 2xl:mt-[3px] mt-lg-[3px]`}
      >
        <div>12:00</div>
        <div
          className={`${msg.author === curDisplay ? "" : "hidden"} flex relative`}
        >
          <Checkmark className="2xl:w-[20px] sm:w-lg-[20px] 2xl:h-[20px] sm:h-lg-[20px] w-[20.5px] h-[20.5px]" />
          <Checkmark className="absolute 2xl:left-[7px] sm:left-lg-[7px] left-[7.5px] 2xl:w-[20px] sm:w-lg-[20px] 2xl:h-[20px] sm:h-lg-[20px] w-[20.5px] h-[20.5px]" />
        </div>
      </div>
    </div>
  );
};
export default Message;
