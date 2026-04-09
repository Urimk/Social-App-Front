import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ConfirmDelete = ({ isWindowOpen, setIsWindowOpen, setIsTop }) => {
  const navigate = useNavigate();

  const API_URL =
    localStorage.getItem("apiAddress") ||
    import.meta.env.VITE_RENDER_API_URL ||
    "http://localhost:5000";
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    if (!password) {
      toast.error("Please enter your password");
      return;
    }
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/users/`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        toast.success("Account deleted successfully");
        localStorage.clear();
        navigate("/login");
      } else {
        const data = await res.json();
        toast.error(data.message || "Error deleting account");
      }
    } catch (err) {
      toast.error("Network error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      onClick={() => {
        setIsTop(true);
        setIsWindowOpen(false);
      }}
      className={`${isWindowOpen ? "" : "hidden"} fixed inset-0  w-screen h-screen bg-[var(--gray-100)]/60 dark:bg-[var(--gray-500)]/60 backdrop-blur-xs flex items-center justify-center`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="2xl:w-[587px] sm:w-lg-[587px] w-[70vw]  bg-white dark:bg-[var(--gray-800)] rounded-4xl drop-shadow-[2px_3px_15px_var(--blue-900)] 2xl:py-[51px] sm:py-lg-[51px] py-[45px] 2xl:px-[48px] sm:px-lg-[48px] px-[35px] flex flex-col"
      >
        <div className="2xl:text-[20px] self-center sm:self-auto sm:text-lg-[20px] text-[20px] font-poppins text-[var(--gray-500)] dark:text-[var(--gray-300)] font-semibold">
          Are you sure you want to delete your account?
        </div>
        <form>
          <div className="2xl:mt-[50px] sm:mt-lg-[50px] mt-[30px] flex flex-col sm:flex-row 2xl:gap-[13px] sm:gap-lg-[13px] gap-[10px] items-center">
            <label
              htmlFor="password"
              className="2xl:text-[20px] sm:text-lg-[20px] text-[16px] font-poppins text-[var(--gray-500)] dark:text-[var(--gray-300)] tracking-[0.2px]"
            >
              password:
            </label>
            <input
              name="password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="sm:w-full w-[90%] 2xl:px-[10px] sm:px-lg-[10px] px-[8px] 2xl:text-[20px] sm:text-lg-[20px] text-[16px]  font-poppins  dark:text-white bg-(--gray-100) dark:bg-(--gray-600) rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)] focus:dark:ring-[var(--blue-400)] transition-all duration-200 ease-in-out py-[6px] sm:py-0"
            ></input>
          </div>
          <div className="flex flex-col-reverse sm:flex-row 2xl:gap-[13px] sm:gap-lg-[13px] gap-[14px]">
            <button
              type="button"
              onClick={() => setIsWindowOpen(false)}
              className={` 2xl:text-[20px] sm:text-lg-[20px] text-[16px] 2xl:mt-[50px] sm:mt-lg-[50px] 2xl:px-[50px] sm:px-lg-[50px] 2xl:py-[12px] sm:py-lg-[12px] py-[8px]  font-poppins  rounded-lg bg-[linear-gradient(100deg,var(--blue-500),var(--purple-800))] text-white dark:text-[var(--gray-300)] font-semibold   shadow-md transition duration-300 ease-in-out cursor-pointer cursor-pointer`}
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              type="button"
              className={`flex-1 2xl:text-[20px] sm:text-lg-[20px] text-[16px] 2xl:mt-[50px] sm:mt-lg-[50px] mt-[35px] 2xl:py-[12px] sm:py-lg-[12px] py-[8px]  font-poppins  rounded-lg bg-white dark:bg-(--gray-600) text-[var(--red-500)] border-2 border-[var(--red-500)] font-semibold  shadow-md transition duration-300 ease-in-out cursor-pointer `}
            >
              {isLoading ? "Deleting..." : "Confirm Delete"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmDelete;
