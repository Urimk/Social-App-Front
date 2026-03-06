import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import toast from "react-hot-toast";

import Checkbox from "../components/Checkbox/Checkbox";

const Login = () => {
  const navigate = useNavigate();

  const allUsers = JSON.parse(localStorage.getItem("users")) || [];

  const [formData, setFormData] = useState({
    password: "",
    display: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const isFilled = () => {
    if (formData.password === "" || formData.display === "") return false;
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFilled()) {
      return;
    }
    const foundUser = allUsers.find(
      (user) =>
        user.username === formData.username &&
        user.password === formData.password,
    );
    if (foundUser) {
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      toast("Signed in successfully");
      navigate("/chat");
    } else {
      toast.error("Wrong username or password", { id: "login-failed" });
    }
  };

  return (
    <div>
      <div className="min-h-screen  bg-[url('/background1.png')] bg-no-repeat bg-cover bg-center">
        <div className="absolute flex sm:block flex-col justify-center inset-0 bg-gradient-to-b dark:from-black/35 dark:to-black/55">
          <div className="mx-auto max-w-9/10 rounded-2xl sm:rounded-t-none max-h-9/10 rounded-t-2xl sm:aspect-[0.63/1] min-w-[350px] sm:max-h-97/100 bg-white dark:bg-(--gray-900) overflow-hidden">
            <SimpleBar style={{ maxHeight: "100%" }}>
              <div className="flex flex-col pt-[30%] pb-[14%] sm:pb-[0%] sm:pt-[25%] px-[9%] sm:px-[12.4%] sm:pt-[41.7%] [container-type:inline-size]">
                <h2 className="mx-auto sm:m-0 font-poppins font-bold text-[13cqw] sm:text-[10.5cqw] tracking-[1.3px] text-(--gray-500) dark:text-(--gray-300)">
                  LOGIN
                </h2>
                <form action="" className="mt-[8%] sm:mt-[6.6%] w-full">
                  <input
                    type="text"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    placeholder="Display Name"
                    name="display"
                    className="w-full py-[4%] sm:py-[2%] px-[4%] text-[6cpw] sm:text-[4.1cqw] font-poppins placeholder-(--gray-500) dark:placeholder-(--gray-300) dark:text-white bg-(--gray-100) dark:bg-(--gray-600) rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)] focus:dark:ring-[var(--blue-400)] transition-all duration-200 ease-in-out"
                  />
                  <input
                    type="password"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    placeholder="Password"
                    name="password"
                    className="w-full py-[4%] sm:py-[2%] px-[4%] text-[6cpw] sm:text-[4.1cqw] mt-[5%] sm:mt-[4%] font-poppins placeholder-(--gray-500) dark:placeholder-(--gray-300) dark:text-white bg-(--gray-100) dark:bg-(--gray-600) rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)] focus:dark:ring-[var(--blue-400)] transition-all duration-200 ease-in-out"
                  />
                  <div className="options mt-[4%] flex justify-between text-[3.8cqw]  font-poppins">
                    <Checkbox />
                    <a className="text-[var(--blue-500)] dark:text-[var(--blue-400)] text-[4.1cqw] sm:text-[3.3cqw]/3.75 mt-[0.4%] sm:mt-[0%] font-poppins underline cursor-pointer tracking-wide sm:tracking-normal">
                      Forgot your password?
                    </a>
                  </div>
                  <button
                    type="submit"
                    onClick={(e) => handleSubmit(e)}
                    className={`w-full py-[4%] sm:py-[2%] px-[4%] text-[6cpw] sm:text-[4.1cqw] mt-[12%] sm:mt-[10%] font-poppins placeholder-(--gray-500) dark:placeholder-(--gray-300) bg-(--gray-100) dark:bg-(--gray-600) rounded-lg bg-[linear-gradient(100deg,var(--blue-500),var(--purple-500))]
                    dark:bg-[linear-gradient(100deg,var(--blue-700),var(--purple-800))] text-white dark:text-[var(--gray-300)] shadow-md  transition duration-300 ease-in-out ${isFilled() ? "cursor-pointer" : "grayscale-60"}`}
                  >
                    Sign in
                  </button>
                </form>
                <h4 className="text-[6cpw] sm:text-[4.1cqw] mt-[16%] sm:mt-[14.6%] mx-auto font-poppins text-(--gray-500) dark:text-(--gray-300)">
                  Or Sign Up Using
                </h4>
                <div className="flex mt-[9.2%] justify-around mr-[5%] ml-[5%] sm:mr-[7%] sm:ml-[8%]">
                  <div className="bg-[var(--gray-100)] aspect-square w-[22%] sm:w-[19.5%] rounded-full"></div>
                  <div className="bg-[var(--gray-100)] aspect-square w-[22%] sm:w-[19.5%] rounded-full"></div>
                  <div className="bg-[var(--gray-100)] aspect-square w-[22%] sm:w-[19.5%] rounded-full"></div>
                </div>
                <div className="flex flex-col sm:flex-row mt-[10%] justify-center items-center sm:gap-[3%]">
                  <p className="text-[6cpw] sm:text-[4.1cqw] font-poppins text-(--gray-500) dark:text-(--gray-300)">
                    Not Registered?
                  </p>
                  <a
                    onClick={() => {
                      navigate("/register");
                    }}
                    className="text-[var(--blue-500)] dark:text-[var(--blue-400)] text-[6cpw] sm:text-[4.1cqw] font-poppins underline cursor-pointer mt-[3%] sm:mt-[0%]"
                  >
                    Click here to register
                  </a>
                </div>
                <div className="sm:mt-[10%] border-[var(--gray-100)] sm:border-2 h-px w-[60%] mx-auto rounded-md"></div>
              </div>
            </SimpleBar>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
