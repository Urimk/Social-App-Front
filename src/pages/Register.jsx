import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import ProfilePic from "../assets/Default_pic.png";

const Register = () => {
  return (
    <div>
      <div className="min-h-screen  bg-[url('/background1.png')] bg-no-repeat bg-cover bg-center">
        <div className="absolute flex sm:block flex-col justify-center inset-0 bg-gradient-to-b dark:from-black/35 dark:to-black/55">
          <div className="mx-auto max-w-9/10 rounded-2xl sm:rounded-t-none max-h-9/10 rounded-t-2xl sm:aspect-[0.63/1] min-w-[350px] sm:max-h-97/100 bg-white dark:bg-(--container-dark) overflow-hidden">
            <SimpleBar style={{ maxHeight: "100%" }}>
              <div className="flex flex-col pt-[20%] pb-[14%] sm:pb-[0%] px-[9%] sm:px-[12.4%] sm:pt-[20%] [container-type:inline-size]">
                <h2 className="mx-auto sm:m-0 font-poppins font-bold text-[13cqw] sm:text-[10.5cqw] tracking-[1.3px] text-(--text-color) dark:text-(--dark-text)">
                  Register
                </h2>
                <form action="" className="mt-[8%] sm:mt-[6.6%] w-full">
                  <div className="flex flex-col sm:flex-row sm:gap-[2.5%]">
                    <input
                      type="text"
                      placeholder="First Name"
                      className="w-full py-[4%] sm:py-[2%] px-[4%] text-[6cpw] sm:text-[4.1cqw] font-poppins placeholder-(--text-color) dark:placeholder-(--dark-text) dark:text-white  bg-(--field-bg) dark:bg-(--dark-field) rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--checkbox-color)] focus:dark:ring-[var(--dark-checkbox)] transition-all duration-200 ease-in-out"
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      className="w-full py-[4%] sm:py-[2%] px-[4%] text-[6cpw] sm:text-[4.1cqw] mt-[5%] sm:mt-[0%] font-poppins placeholder-(--text-color) dark:placeholder-(--dark-text) dark:text-white  bg-(--field-bg) dark:bg-(--dark-field) rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--checkbox-color)] focus:dark:ring-[var(--dark-checkbox)] transition-all duration-200 ease-in-out"
                    />
                  </div>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full py-[4%] sm:py-[2%] px-[4%] text-[6cpw] sm:text-[4.1cqw] mt-[5%] sm:mt-[3.5%] font-poppins placeholder-(--text-color) dark:placeholder-(--dark-text) dark:text-white bg-(--field-bg) dark:bg-(--dark-field) rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--checkbox-color)] focus:dark:ring-[var(--dark-checkbox)] transition-all duration-200 ease-in-out"
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="w-full py-[4%] sm:py-[2%] px-[4%] text-[6cpw] sm:text-[4.1cqw] mt-[5%] sm:mt-[3.5%] font-poppins placeholder-(--text-color) dark:placeholder-(--dark-text) dark:text-white bg-(--field-bg) dark:bg-(--dark-field) rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--checkbox-color)] focus:dark:ring-[var(--dark-checkbox)] transition-all duration-200 ease-in-out"
                  />
                  <div className="mt-[4%]  font-poppins text-[var(--err-color)] text-[4.1cqw] sm:text-[3.3cqw]/3.75 font-poppins underline text-right tracking-wide sm:tracking-normal">
                    Password must be Message
                  </div>
                  <div className="flex">
                    <div className="flex flex-col">
                      <div className="mt-[18%] text-[6cpw] sm:text-[4.1cqw] font-poppins text-(--text-color) dark:text-(--dark-text)">
                        Upload a Profile Picture:
                      </div>
                      <label className="text-[var(--checkbox-color)] dark:text-[var(--dark-checkbox)] text-[4.1cqw]  mt-[0.4%] sm:mt-[0%] font-poppins underline cursor-pointer tracking-wide sm:tracking-normal">
                        Upload
                      </label>

                      <div className="mt-[5%] w-[75%] text-(--text-color) dark:text-(--dark-text) text-[6cpw] text-[0px] sm:text-[3.3cqw]/3.75 2xl: 2xl:leading-6">
                        Size should be at least 192px by 192px. Use PNG or JPG
                        for best results.
                      </div>
                    </div>
                    <div className="w-[40%] sm:w-[65%] h-[0%] aspect-square mt-[8%] mr-[4%] rounded-[50%] border-3 2xl:border-5 border-[var(--checkbox-color)]">
                      <input
                        type="image"
                        alt="Upload"
                        src={ProfilePic}
                        className="w-[95%] h-[95%] mt-[2.5%] ml-[2.5%]"
                      ></input>
                    </div>
                  </div>
                  <input
                    type="name"
                    placeholder="Display Name"
                    className="w-full py-[4%] sm:py-[2%] px-[4%] text-[6cpw] sm:text-[4.1cqw] mt-[5%] sm:mt-[6.4%] font-poppins placeholder-(--text-color) dark:placeholder-(--dark-text) dark:text-white bg-(--field-bg) dark:bg-(--dark-field) rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--checkbox-color)] focus:dark:ring-[var(--dark-checkbox)] transition-all duration-200 ease-in-out"
                  />
                  <button
                    type="submit"
                    className="w-full py-[4%] sm:py-[2%] px-[4%] text-[6cpw] sm:text-[4.1cqw] mt-[12%] sm:mt-[10%] font-poppins bg-(--field-bg) dark:bg-(--dark-field) rounded-lg bg-[linear-gradient(100deg,var(--grad-start),var(--grad-end))]
                    dark:bg-[linear-gradient(100deg,var(--dark-gstart),var(--dark-gend))] text-white dark:text-[var(--dark-text)] shadow-md cursor-pointer"
                  >
                    Sign up
                  </button>
                </form>
                <div className="flex flex-col sm:flex-row mt-[10%] justify-center items-center sm:gap-[3%]">
                  <p className="text-[6cpw] sm:text-[4.1cqw] font-poppins text-(--text-color) dark:text-(--dark-text)">
                    Already Registered?
                  </p>
                  <a className="text-[var(--checkbox-color)] dark:text-[var(--dark-checkbox)] text-[6cpw] sm:text-[4.1cqw] font-poppins underline cursor-pointer mt-[3%] sm:mt-[0%]">
                    Click here to login
                  </a>
                </div>
                <div className="sm:mt-[10%] border-[var(--field-bg)] sm:border-2 h-px w-[60%] mx-auto rounded-md"></div>
              </div>
            </SimpleBar>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;
