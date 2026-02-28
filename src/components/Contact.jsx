import ProfilePic from "../assets/Default_pic.png";
import { Checkmark } from "../assets/icons";

function Contact() {
  return (
    <div className="2xl:w-[491px] w-lg-[491px] 2xl:h-[115px] h-lg-[115px] 2xl:mt-[1px] lg:mt-[1px] 2xl:py-[16px] py-lg-[16px] 2xl:px-[14.5px] px-lg-[14.5px] flex 2xl:rounded-[18px] rounded-lg bg-[var(--field-bg)]">
      <div className="position relative">
        <img
          src={ProfilePic}
          className="2xl:w-[82px] w-lg-[82px] rounded-lg"
        ></img>
        <div className="2xl:w-[14px] w-lg-[14px] 2xl:h-[14px] h-lg-[14px] rounded-full 2xl:border-2 lg:border-1 border-white absolute top-[77%] left-[77%] bg-[var(--online-color)]"></div>
      </div>
      <div className="flex flex-col 2xl:mt-[13px] mt-lg-[13px] 2xl:ml-[30px] ml-lg-[30px] 2xl:gap-[4px] gap-lg-[4px]">
        <div className="flex justify-between 2xl:w-[350px] w-lg-[350px]">
          <div className="2xl:text-[20px] text-lg-[20px] text-[var(--text-color)] font-poppins font-semibold">
            Name
          </div>
          <div className="2xl:text-[16px] text-lg-[16px] text-[var(--text-color)] font-poppins opacity-40">
            {"20:53"}
          </div>
        </div>
        <div className="flex justify-between 2xl:w-[350px]">
          <div className="2xl:text-[16px] text-lg-[16px] 2xl:ml-[6px] ml-lg-[6px] text-[var(--text-color)] font-poppins">
            Hey!
          </div>
          <div className="2xl:text-[16px] text-lg-[16px] text-[var(--text-color)] font-poppins relative">
            <div className="text-[var(--checkbox-color)]">
              <Checkmark className="absolute right-[35%] 2xl:w-[20px] w-lg-[20px] 2xl:h-[20px] h-lg-[20px]" />
              <Checkmark className="2xl:w-[20px] w-lg-[20px] 2xl:h-[20px] h-lg-[20px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Contact;
