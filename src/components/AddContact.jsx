import React from "react";
import { Contact } from "../assets/icons";

const AddContact = () => {
  return (
    <div className="fixed inset-0  w-screen h-screen bg-[var(--gray-100)]/60 dark:bg-[var(--gray-500)]/60 backdrop-blur-xs flex items-center justify-center">
      <div className="2xl:w-[587px] sm:w-lg-[587px] w-[70vw]  bg-white dark:bg-[var(--gray-800)] rounded-4xl drop-shadow-[2px_3px_15px_var(--blue-900)] 2xl:py-[51px] sm:py-lg-[51px] py-[45px] 2xl:px-[48px] sm:px-lg-[48px] px-[35px] flex flex-col">
        <div className="2xl:text-[22px] self-center sm:self-auto sm:text-lg-[22px] text-[20px] font-poppins text-[var(--gray-500)] dark:text-[var(--gray-300)] font-semibold">
          Add a new contact
        </div>
        <form>
          <div className="2xl:mt-[50px] sm:mt-lg-[50px] mt-[30px] flex flex-col sm:flex-row 2xl:gap-[13px] sm:gap-lg-[13px] gap-[10px] items-center">
            <Contact className="2xl:w-[17px] sm:w-lg-[17px] hidden sm:flex" />
            <label
              htmlFor="username"
              className="2xl:text-[20px] sm:text-lg-[20px] text-[16px] font-poppins text-[var(--gray-500)] dark:text-[var(--gray-300)] tracking-[0.2px]"
            >
              <Contact className="w-[14px] inline sm:hidden mr-[3px] mb-[4px]" />{" "}
              Name
            </label>
            <input
              name="username"
              id="username"
              className="sm:w-full w-[90%] 2xl:px-[10px] sm:px-lg-[10px] px-[8px] 2xl:text-[20px] sm:text-lg-[20px] text-[16px]  font-poppins  dark:text-white bg-(--gray-100) dark:bg-(--gray-600) rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)] focus:dark:ring-[var(--blue-400)] transition-all duration-200 ease-in-out py-[6px] sm:py-0"
            ></input>
          </div>
          <div className="flex flex-col-reverse sm:flex-row 2xl:gap-[13px] sm:gap-lg-[13px] gap-[14px]">
            <button
              className={` 2xl:text-[20px] sm:text-lg-[20px] text-[16px] 2xl:mt-[50px] sm:mt-lg-[50px] 2xl:px-[50px] sm:px-lg-[50px] 2xl:py-[12px] sm:py-lg-[12px] py-[8px]  font-poppins  rounded-lg bg-white dark:bg-(--gray-600) text-[var(--red-500)] border-2 border-[var(--red-500)] font-semibold  shadow-md transition duration-300 ease-in-out cursor-pointer `}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex-1 2xl:text-[20px] sm:text-lg-[20px] text-[16px] 2xl:mt-[50px] sm:mt-lg-[50px] mt-[35px] 2xl:px-[130px] sm:px-lg-[130px] 2xl:py-[12px] sm:py-lg-[12px] py-[8px]  font-poppins  rounded-lg bg-[linear-gradient(100deg,var(--blue-500),var(--purple-800))] text-white dark:text-[var(--gray-300)] font-semibold   shadow-md transition duration-300 ease-in-out cursor-pointer`}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContact;
