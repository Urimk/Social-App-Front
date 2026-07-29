import { useState, useEffect, useRef } from "react";
import { Contact } from "../assets/icons";
import toast from "react-hot-toast";

/**
 * AddContact component for sending friend requests.
 * Displays a modal form to input a contact name and send a request.
 *
 * @param {Object} props - The component props.
 * @param {boolean} props.isWindowOpen - Whether the modal is open.
 * @param {Function} props.setIsWindowOpen - Function to toggle the modal.
 */
const AddContact = ({ isWindowOpen, setIsWindowOpen }) => {
  const API_URL =
    localStorage.getItem("apiAddress") ||
    import.meta.env.VITE_RENDER_API_URL ||
    "http://localhost:5000";
  const [contactName, setContactName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isWindowOpen) return;

    inputRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsWindowOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isWindowOpen, setIsWindowOpen]);

  /**
   * Checks if the contact name is filled.
   * @returns {boolean} True if filled, false otherwise.
   */
  const isFilled = () => {
    return contactName.trim().length > 0;
  };

  /**
   * Fetches the friend request API.
   * @param {string} data - The contact name.
   * @returns {Promise<Object>} The API response.
   */
  const fetchData = async (data) => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_URL}/users/${data}/request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const res = await response.json();
      throw new Error(res.message);
    }
    const res = await response.json();
    return res;
  };

  /**
   * Handles form submission to send friend request.
   * @param {Event} e - The form submit event.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFilled()) return;
    setIsLoading(true);
    try {
      await fetchData(contactName.trim());
      toast.success("Friend request sent");
      setContactName("");
      setIsWindowOpen(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      onClick={() => setIsWindowOpen(false)}
      className={`${isWindowOpen ? "" : "hidden"} fixed inset-0 w-screen h-screen
        bg-[var(--gray-100)]/60 dark:bg-[var(--gray-500)]/60 backdrop-blur-xs
        flex items-center justify-center`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="2xl:w-[587px] sm:w-lg-[587px] w-[70vw] bg-white dark:bg-[var(--gray-800)]
          rounded-4xl drop-shadow-[2px_3px_15px_var(--blue-900)] 2xl:py-[51px] sm:py-lg-[51px]
          py-[45px] 2xl:px-[48px] sm:px-lg-[48px] px-[35px] flex flex-col"
      >
        {/* Modal title */}
        <div
          className="2xl:text-[22px] self-center sm:self-auto sm:text-lg-[22px]
          text-[20px] font-poppins text-[var(--gray-500)] dark:text-[var(--gray-300)]
          font-semibold"
        >
          Add a new contact
        </div>

        <form onSubmit={handleSubmit}>
          {/* Input field */}
          <div
            className="2xl:mt-[50px] sm:mt-lg-[50px] mt-[30px] flex flex-col sm:flex-row
            2xl:gap-[13px] sm:gap-lg-[13px] gap-[10px] items-center"
          >
            <Contact className="2xl:w-[17px] sm:w-lg-[17px] hidden sm:flex" />
            <label
              htmlFor="username"
              className="2xl:text-[20px] sm:text-lg-[20px] text-[16px] font-poppins
                text-[var(--gray-500)] dark:text-[var(--gray-300)] tracking-[0.2px]"
            >
              <Contact className="w-[14px] inline sm:hidden mr-[3px] mb-[4px]" />{" "}
              Name
            </label>
            <input
              ref={inputRef}
              name="username"
              id="username"
              value={contactName}
              onChange={(e) => setContactName(e.target.value)}
              className="sm:w-full w-[90%] 2xl:px-[10px] sm:px-lg-[10px] px-[8px]
                2xl:text-[20px] sm:text-lg-[20px] text-[16px] font-poppins
                dark:text-white bg-[var(--gray-100)] dark:bg-[var(--gray-600)]
                rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)]
                focus:dark:ring-[var(--blue-400)] transition-all duration-200 ease-in-out
                py-[6px] sm:py-0"
              placeholder="Enter contact name"
            />
          </div>

          {/* Buttons */}
          <div
            className="flex flex-col-reverse sm:flex-row 2xl:gap-[13px] sm:gap-lg-[13px]
            gap-[14px]"
          >
            <button
              type="button"
              onClick={() => setIsWindowOpen(false)}
              className="2xl:text-[20px] sm:text-lg-[20px] text-[16px] 2xl:mt-[50px]
                sm:mt-lg-[50px] 2xl:px-[50px] sm:px-lg-[50px] 2xl:py-[12px] sm:py-lg-[12px]
                py-[8px] font-poppins rounded-lg bg-white dark:bg-[var(--gray-600)]
                text-[var(--red-500)] border-2 border-[var(--red-500)] font-semibold
                shadow-md transition duration-300 ease-in-out cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFilled() || isLoading}
              className={`flex-1 2xl:text-[20px] sm:text-lg-[20px] text-[16px] 2xl:mt-[50px]
                sm:mt-lg-[50px] mt-[35px] 2xl:py-[12px] sm:py-lg-[12px] py-[8px]
                font-poppins rounded-lg bg-[linear-gradient(100deg,var(--blue-500),var(--purple-800))]
                text-white dark:text-[var(--gray-300)] font-semibold shadow-md
                transition duration-300 ease-in-out
                ${isFilled() && !isLoading ? "cursor-pointer" : "opacity-50 cursor-not-allowed grayscale-70"}`}
            >
              {isLoading ? "Adding..." : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddContact;
