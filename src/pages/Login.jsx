import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import Checkbox from "../components/Checkbox/Checkbox";

const Login = () => {
  return (
    <div>
      <div className="min-h-screen  bg-[url('/background1.png')] bg-no-repeat bg-cover bg-center">
        <div className="absolute flex sm:block flex-col justify-center inset-0 bg-gradient-to-b dark:from-black/35 dark:to-black/55">
          <div className="mx-auto max-w-9/10 rounded-2xl sm:rounded-t-none max-h-9/10 rounded-t-2xl sm:aspect-[0.63/1] min-w-[350px] sm:max-h-97/100 bg-white dark:bg-(--container-dark) overflow-hidden">
            <SimpleBar style={{ maxHeight: "100%" }}>
              <div className="flex flex-col pt-[30%] pb-[14%] sm:pb-[0%] sm:pt-[25%] px-[9%] sm:px-[12.4%] sm:pt-[41.7%] [container-type:inline-size]">
                <h2 className="mx-auto sm:m-0 font-poppins font-bold text-[13cqw] sm:text-[10.5cqw] tracking-[1.3px] text-(--text-color) dark:text-(--dark-text)">
                  LOGIN
                </h2>
                <form action="" className="mt-[8%] sm:mt-[6.6%] w-full">
                  <input
                    type="text"
                    placeholder="Username"
                    className="w-full py-[4%] sm:py-[2%] px-[4%] text-[6cpw] sm:text-[4.1cqw] font-poppins placeholder-(--text-color) dark:placeholder-(--dark-text) dark:text-white bg-(--field-bg) dark:bg-(--dark-field) rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--checkbox-color)] focus:dark:ring-[var(--dark-checkbox)] transition-all duration-200 ease-in-out"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full py-[4%] sm:py-[2%] px-[4%] text-[6cpw] sm:text-[4.1cqw] mt-[5%] sm:mt-[4%] font-poppins placeholder-(--text-color) dark:placeholder-(--dark-text) dark:text-white bg-(--field-bg) dark:bg-(--dark-field) rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--checkbox-color)] focus:dark:ring-[var(--dark-checkbox)] transition-all duration-200 ease-in-out"
                  />
                  <div className="options mt-[4%] flex justify-between text-[3.8cqw]  font-poppins">
                    <Checkbox />
                    <a className="text-[var(--checkbox-color)] dark:text-[var(--dark-checkbox)] text-[4.1cqw] sm:text-[3.3cqw]/3.75 mt-[0.4%] sm:mt-[0%] font-poppins underline cursor-pointer tracking-wide sm:tracking-normal">
                      Forgot your password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-[4%] sm:py-[2%] px-[4%] text-[6cpw] sm:text-[4.1cqw] mt-[12%] sm:mt-[10%] font-poppins placeholder-(--text-color) dark:placeholder-(--dark-text) bg-(--field-bg) dark:bg-(--dark-field) rounded-lg bg-[linear-gradient(100deg,var(--grad-start),var(--grad-end))]
                    dark:bg-[linear-gradient(100deg,var(--dark-gstart),var(--dark-gend))] text-white dark:text-[var(--dark-text)] shadow-md cursor-pointer"
                  >
                    Sign in
                  </button>
                </form>
                <h4 className="text-[6cpw] sm:text-[4.1cqw] mt-[16%] sm:mt-[14.6%] mx-auto font-poppins text-(--text-color) dark:text-(--dark-text)">
                  Or Sign Up Using
                </h4>
                <div className="flex mt-[9.2%] justify-around mr-[5%] ml-[5%] sm:mr-[7%] sm:ml-[8%]">
                  <div className="bg-[var(--field-bg)] aspect-square w-[22%] sm:w-[19.5%] rounded-full"></div>
                  <div className="bg-[var(--field-bg)] aspect-square w-[22%] sm:w-[19.5%] rounded-full"></div>
                  <div className="bg-[var(--field-bg)] aspect-square w-[22%] sm:w-[19.5%] rounded-full"></div>
                </div>
                <div className="flex flex-col sm:flex-row mt-[10%] justify-center items-center sm:gap-[3%]">
                  <p className="text-[6cpw] sm:text-[4.1cqw] font-poppins text-(--text-color) dark:text-(--dark-text)">
                    Not Registered?
                  </p>
                  <a className="text-[var(--checkbox-color)] dark:text-[var(--dark-checkbox)] text-[6cpw] sm:text-[4.1cqw] font-poppins underline cursor-pointer mt-[3%] sm:mt-[0%]">
                    Click here to register
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
export default Login;
