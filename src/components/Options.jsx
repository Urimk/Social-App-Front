import { useState } from "react";
import { CiDark } from "react-icons/ci";
import Switch from "@mui/material/Switch";
import { styled } from "@mui/material/styles";
import DefaultPic from "../assets/Default_pic.png";

import toast from "react-hot-toast";
import ConfirmDelete from "./ConfirmDelete";
import { useSocket } from "../context/SocketProvider";

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  "& .MuiSwitch-switchBase": {
    margin: 1,
    padding: 0,
    transform: "translateX(6px)",
    "&.Mui-checked": {
      color: "#fff",
      transform: "translateX(22px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff",
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
      },
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "#aab4be",
        ...theme.applyStyles("dark", {
          backgroundColor: "#8796A5",
        }),
      },
    },
  },
  "& .MuiSwitch-thumb": {
    backgroundColor: "#001e3c",
    width: 32,
    height: 32,
    "&::before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
        "#fff",
      )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
    },
    ...theme.applyStyles("dark", {
      backgroundColor: "#003892",
    }),
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    backgroundColor: "#aab4be",
    borderRadius: 20 / 2,
    ...theme.applyStyles("dark", {
      backgroundColor: "#8796A5",
    }),
  },
}));

const Options = ({
  isOptionsOpen,
  setIsOptionsOpen,
  isTop,
  setIsTop,
  darkMode,
  setDarkMode,
  profilePic,
  setProfilePic,
}) => {
  const { reconnectSocket } = useSocket();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [apiUrl, setApiUrl] = useState(
    localStorage.getItem("apiAddress") ||
      import.meta.env.VITE_RENDER_API_URL ||
      "http://localhost:5000",
  );
  const [customApi, setCustomApi] = useState(apiUrl);

  /**
   * Normalizes a URL by adding https if missing.
   * @param {string} url - The URL to normalize.
   * @returns {string} The normalized URL.
   */
  function normalizeUrl(url) {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      return "https://" + url;
    }
    return url;
  }

  /**
   * Validates if the URL is a valid API URL.
   * @param {string} url - The URL to validate.
   * @returns {boolean} True if valid.
   */
  function isValidApiUrl(url) {
    try {
      const parsed = new URL(url);
      return (
        ["http:", "https:"].includes(parsed.protocol) &&
        parsed.hostname.length > 0
      );
    } catch {
      return false;
    }
  }

  /**
   * Handles profile image upload.
   * @param {Event} e - The file input change event.
   */
  const handleImage = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      const token = localStorage.getItem("token");
      const response = await fetch(`${apiUrl}/image`, {
        method: "PATCH",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setProfilePic(data.url);
      }
      console.log("done");
    }
  };

  return (
    <div
      onClick={() => {
        if (isTop) {
          setIsOptionsOpen(false);
        }
      }}
      className={`${isOptionsOpen ? "" : "hidden"} fixed inset-0 w-screen
        h-screen bg-[var(--gray-100)]/60 dark:bg-[var(--gray-500)]/60
        backdrop-blur-xs flex items-center justify-center`}
    >
      {/* Options modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`2xl:w-[587px] sm:w-lg-[587px] w-[70vw] bg-white
          dark:bg-[var(--gray-800)] rounded-4xl
          drop-shadow-[2px_3px_15px_var(--blue-900)] 2xl:py-[51px]
          sm:py-lg-[51px] py-[45px] 2xl:px-[48px] sm:px-lg-[48px] px-[35px]
          flex flex-col`}
      >
        {/* Close button */}
        <div
          onClick={() => setIsOptionsOpen(false)}
          className={`absolute 2xl:right-[55px] sm:right-[48px] right-[25px]
            top-[25px] sm:top-auto 2xl:text-[20px] sm:text-lg-[20px] text-[22px]
            font-semibold text-[var(--gray-500)] dark:text-[var(--gray-300)]
            cursor-pointer`}
        >
          X
        </div>
        {/* Title */}
        <div
          className={`2xl:text-[22px] self-center sm:self-auto
          sm:text-lg-[22px] text-[20px] font-poppins text-[var(--gray-500)]
          dark:text-[var(--gray-300)] font-semibold`}
        >
          Options
        </div>
        {/* Dark mode toggle */}
        <div
          className={`flex justify-between 2xl:pt-[20px] sm:pt-lg-[20px]
          pt-[10px] items-center`}
        >
          <label
            className={`2xl:text-[20px] sm:text-lg-[20px] text-[16px]
            font-poppins text-[var(--gray-500)] dark:text-[var(--gray-300)]
            tracking-[0.2px]`}
          >
            <CiDark
              className="inline 2xl:mr-[10px] sm:mr-lg-[10px]
              sm:text-[22px] 2xl:text-[25px]"
            />
            Dark Mode
          </label>
          <MaterialUISwitch
            checked={darkMode === "true" ? true : false}
            onChange={() => {
              setDarkMode(darkMode === "true" ? "false" : "true");
              localStorage.setItem(
                "darkMode",
                darkMode === "true" ? "false" : "true",
              );
            }}
            className="scale-80 sm:scale-100"
          />
        </div>
        {/* Profile picture section */}
        <div
          className={`2xl:mt-[30px] sm:mt-lg-[30px] mt-[10px] mb-[10px]
          sm:mb-[0] flex justify-between sm:justify-normal`}
        >
          <div className="items-center flex sm:block">
            <label
              htmlFor="image"
              className={`hidden sm:flex text-[var(--blue-500)]
                dark:text-[var(--blue-400)] sm:text-lg-[20px] font-poppins
                underline cursor-pointer tracking-wide sm:tracking-normal`}
            >
              Change profile picture
            </label>
            <label
              htmlFor="image"
              className={`flex sm:hidden text-[var(--blue-500)]
                dark:text-[var(--blue-400)] sm:text-lg-[20px] font-poppins
                underline cursor-pointer tracking-wide sm:tracking-normal`}
            >
              Profile picture
            </label>
            <div
              className={`hidden sm:block 2xl:w-[60%] sm:w-[70%]
              2xl:mt-[10px] sm:mt-lg-[10px] text-[var(--gray-500)]
              dark:text-[var(--gray-300)] text-[16px] sm:text-lg-[16px]
              text-[12px] 2xl:leading-6`}
            >
              Size should be at least 192px by 192px. Use PNG or JPG for best
              results.
            </div>
          </div>

          <div
            className={`2xl:w-[160px] sm:w-[160px] w-[80px] h-[0%]
            aspect-square sm:mb-[10px] 2xl:mb-[0] rounded-[50%]
            sm:mr-lg-[90px] mr-[0] ml-[20px] sm:ml-[0] border-3 2xl:border-5
            border-[var(--blue-500)]`}
          >
            <label className="cursor-pointer" htmlFor="image">
              <img
                src={profilePic || DefaultPic}
                alt="Profile picture"
                className="w-[95%] h-[95%] mt-[2.5%] ml-[2.5%] rounded-full
                  object-cover"
              />
            </label>

            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={(e) => handleImage(e)}
              className="hidden"
            />
          </div>
        </div>
        {/* API address form */}
        <form
          className={`flex text-center sm:text-start flex-col sm:flex-row
          justify-between 2xl:gap-[6px] sm:gap-lg-[6px] 2xl:mt-[25px]`}
        >
          <h2
            className={`2xl:text-[20px] sm:text-lg-[20px] text-[16px]
            font-poppins text-[var(--gray-500)] dark:text-[var(--gray-300)]
            tracking-[0.2px]`}
          >
            API address:
          </h2>
          <input
            type="text"
            onChange={(e) => {
              const input = normalizeUrl(e.target.value);

              if (!isValidApiUrl(input)) {
                toast.error("Invalid address");
              }
              setCustomApi(input);
            }}
            name="display"
            value={customApi}
            className={`2xl:w-[270px] sm:w-lg-[270px] py-[4px] sm:py-[4px]
              px-[12px] text-[16px] sm:text-[16px] font-poppins
              placeholder-[var(--gray-500)] dark:placeholder-[var(--gray-300)]
              dark:text-white bg-[var(--gray-100)] dark:bg-[var(--gray-600)]
              rounded-lg focus:outline-none focus:ring-2
              focus:ring-[var(--blue-500)] focus:dark:ring-[var(--blue-400)]`}
          />
          <button
            type="submit"
            onClick={() => {
              localStorage.setItem("apiAddress", customApi);
              setApiUrl(customApi);
              reconnectSocket();
            }}
            className={`sm:w-[50px] self-center sm:self-auto mt-[10px]
              sm:mt-[0] py-[4px] sm:py-[4px] sm:px-[12px] px-[40px] text-[16px]
              sm:text-[16px] font-poppins placeholder-[var(--gray-500)]
              dark:placeholder-[var(--gray-300)] bg-[var(--gray-100)]
              dark:bg-[var(--gray-600)] rounded-lg
              bg-[linear-gradient(100deg,var(--blue-500),var(--purple-500))]
              dark:bg-[linear-gradient(100deg,var(--blue-700),var(--purple-800))]
              text-white dark:text-[var(--gray-300)] shadow-md
              transition duration-300 ease-in-out cursor-pointer`}
          >
            Set
          </button>
        </form>
        {/* Delete account button */}
        <button
          type="button"
          onClick={() => {
            setIsConfirmOpen(true);
            setIsTop(false);
          }}
          className={`w-[180px] self-center py-[4px] sm:py-[4px] px-[12px]
            text-[16px] sm:text-[16px] 2xl:mt-[40px] sm:mt-[40px] mt-[30px]
            font-poppins bg-white dark:bg-[var(--gray-600)]
            text-[var(--red-500)] border-2 border-[var(--red-500)]
            font-semibold shadow-md cursor-pointer rounded-lg`}
        >
          Delete Account
        </button>
      </div>
      <ConfirmDelete
        isWindowOpen={isConfirmOpen}
        setIsWindowOpen={setIsConfirmOpen}
        setIsTop={setIsTop}
      />
    </div>
  );
};

export default Options;
