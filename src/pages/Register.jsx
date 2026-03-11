import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import toast from "react-hot-toast";

import ProfilePic from "../assets/Default_pic.png";

const Register = () => {
  const NAME_CHAR_REGEX = /(\w|-|\.| )+/;
  const DISPLAY_CHAR_REGEX = /(\w|-|\.)+/;
  const NAME_SPECIAL_REGEX = /[ ][ ]/;
  const LETTER_REGEX = /(?=.*[A-Z]+)(?=.*[a-z]+)(?=.*[0-9]+).+/;
  const DISPLAY_SPECIAL_REGEX = /[-_\.][-_\.]/;

  const MAX_NAME_LEN = 20;
  const MIN_DISPLAY_LEN = 3;
  const MAX_DISPLAY_LEN = 25;
  const MIN_PASS_LEN = 8;
  const MAX_PASS_LEN = 25;

  const navigate = useNavigate();

  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    password: "",
    confirmPass: "",
    display: "",
    image: null,
  });

  const [errors, setErrors] = useState({});

  const isFilled = () => {
    if (
      formData.fName === "" ||
      formData.lName === "" ||
      formData.password === "" ||
      formData.confirmPass === "" ||
      formData.display === ""
    )
      return false;
    Object.entries(errors).forEach(([_, messages]) => {
      if (messages.length !== 0) return false;
    });
    return true;
  };

  const validateFields = () => {
    let newErrors = {};
    let noErrors = true;
    let fields = ["fName", "lName", "password", "confirmPass", "display"];

    fields.forEach((field) => {
      let someErrors = validateField(field);

      if (someErrors.length > 0) {
        noErrors = false;
      }

      newErrors = { ...newErrors, [field]: someErrors };
    });

    setErrors(newErrors);
    return noErrors;
  };

  const validateField = (field) => {
    let errors = [];

    if (field === "fName") {
      if (formData.fName.length < 2) {
        errors.push("First name is too short");
      } else if (formData.fName.length > MAX_NAME_LEN) {
        errors.push("First name is too long");
      }

      if (
        !NAME_CHAR_REGEX.test(formData.fName) ||
        NAME_SPECIAL_REGEX.test(formData.fName)
      ) {
        errors.push("Invalid first name format");
      }

      return errors;
    }

    if (field === "lName") {
      if (formData.lName.length < 1) {
        errors.push("Last name is too short");
      } else if (formData.lName.length > MAX_NAME_LEN) {
        errors.push("Last name is too long");
      }

      if (
        !NAME_CHAR_REGEX.test(formData.lNameSp) ||
        NAME_SPECIAL_REGEX.test(formData.lNameSp)
      ) {
        errors.push("Invalid last name format");
      }

      return errors;
    }

    if (field === "password") {
      if (formData.password.length < MIN_PASS_LEN) {
        errors.push("Password is too short");
      } else if (formData.password.length > MAX_PASS_LEN) {
        errors.push("Password is too long");
      }

      if (!LETTER_REGEX.test(formData.password)) {
        errors.push("Password must contain uppercase, lowercase, and a number");
      }

      return errors;
    }

    if (field === "confirmPass") {
      if (formData.password !== formData.confirmPass) {
        errors.push("Passwords do not match");
      }

      return errors;
    }

    if (field === "display") {
      if (formData.display.length < MIN_DISPLAY_LEN) {
        errors.push("Display name is too short");
      } else if (formData.display.length > MAX_DISPLAY_LEN) {
        errors.push("Display name is too long");
      }

      if (
        !DISPLAY_CHAR_REGEX.test(formData.display) ||
        DISPLAY_SPECIAL_REGEX.test(formData.display)
      ) {
        errors.push("Invalid display name format");
      }

      return errors;
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    if (e.target.name === "password" || e.target.name === "confirmPass") {
      setErrors({
        ...errors,
        password: validateField("password"),
        confirmPass: validateField("confirmPass"),
      });
    } else {
      setErrors({
        ...errors,
        [e.target.name]: validateField(e.target.name),
      });
    }
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({
        ...formData,
        image: reader.result,
      });
      console.log(reader.result);
    };

    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateFields()) {
      console.log(formData);
      existingUsers.push(formData);
      localStorage.setItem("users", JSON.stringify(existingUsers));
      toast.success("Signed up successfully", { id: "register-success" });
      navigate("/login");
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-[url('/background1.png')] bg-no-repeat bg-cover bg-center">
        <div className="absolute flex sm:block flex-col justify-center inset-0 bg-gradient-to-b dark:from-black/35 dark:to-black/55">
          <div className="mx-auto max-w-9/10 rounded-2xl sm:rounded-t-none max-h-9/10 rounded-t-2xl sm:aspect-[0.63/1] min-w-[350px] sm:max-h-97/100 bg-white dark:bg-(--gray-900) overflow-hidden">
            <SimpleBar style={{ maxHeight: "100%" }}>
              <div className="flex flex-col pt-[20%] pb-[14%] sm:pb-[0%] px-[9%] sm:px-[12.4%] sm:pt-[20%] [container-type:inline-size]">
                <h2 className="mx-auto sm:m-0 font-poppins font-bold text-[13cqw] sm:text-[10.5cqw] tracking-[1.3px] text-(--gray-500) dark:text-(--gray-300)">
                  Register
                </h2>

                <form
                  onSubmit={(e) => handleSubmit(e)}
                  className="mt-[8%] sm:mt-[6.6%] w-full"
                >
                  <div className="flex flex-col sm:flex-row sm:gap-[2.5%]">
                    <input
                      type="text"
                      name="fName"
                      placeholder="First Name"
                      className="w-full py-[4%] sm:py-[2%] px-[4%] text-[6cpw] sm:text-[4.1cqw] font-poppins placeholder-(--gray-500) dark:placeholder-(--gray-300) dark:text-white  bg-(--gray-100) dark:bg-(--gray-600) rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)] focus:dark:ring-[var(--blue-400)] transition-all duration-200 ease-in-out"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={(e) => {
                        handleBlur(e);
                      }}
                    />

                    <input
                      type="text"
                      name="lName"
                      placeholder="Last Name"
                      className="w-full py-[4%] sm:py-[2%] px-[4%] text-[6cpw] sm:text-[4.1cqw] mt-[5%] sm:mt-[0%] font-poppins placeholder-(--gray-500) dark:placeholder-(--gray-300) dark:text-white  bg-(--gray-100) dark:bg-(--gray-600) rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)] focus:dark:ring-[var(--blue-400)] transition-all duration-200 ease-in-out"
                      onChange={(e) => {
                        handleChange(e);
                      }}
                      onBlur={(e) => {
                        handleBlur(e);
                      }}
                    />
                  </div>

                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full py-[4%] sm:py-[2%] px-[4%] text-[6cpw] sm:text-[4.1cqw] mt-[5%] sm:mt-[3.5%] font-poppins placeholder-(--gray-500) dark:placeholder-(--gray-300) dark:text-white bg-(--gray-100) dark:bg-(--gray-600) rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)] focus:dark:ring-[var(--blue-400)] transition-all duration-200 ease-in-out"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                    }}
                  />

                  <input
                    type="password"
                    name="confirmPass"
                    placeholder="Confirm Password"
                    className="w-full py-[4%] sm:py-[2%] px-[4%] text-[6cpw] sm:text-[4.1cqw] mt-[5%] sm:mt-[3.5%] font-poppins placeholder-(--gray-500) dark:placeholder-(--gray-300) dark:text-white bg-(--gray-100) dark:bg-(--gray-600) rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)] focus:dark:ring-[var(--blue-400)] transition-all duration-200 ease-in-out"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                    }}
                  />

                  <div className="mt-[4%]  font-poppins text-[var(--red-500)] text-[4.1cqw] sm:text-[3.3cqw]/3.75 font-poppins underline text-right tracking-wide sm:tracking-normal">
                    {Object.entries(errors).map(([_, messages]) =>
                      messages.map((message) => (
                        <div key={message}>{message}</div>
                      )),
                    )}
                  </div>

                  <div className="flex">
                    <div className="flex flex-col">
                      <div className="mt-[18%] text-[6cpw] sm:text-[4.1cqw] font-poppins text-(--gray-500) dark:text-(--gray-300)">
                        Upload a Profile Picture:
                      </div>

                      <label
                        htmlFor="image"
                        className="text-[var(--blue-500)] dark:text-[var(--blue-400)] text-[4.1cqw]  mt-[0.4%] sm:mt-[0%] font-poppins underline cursor-pointer tracking-wide sm:tracking-normal"
                      >
                        Upload
                      </label>

                      <div className="mt-[5%] w-[75%] text-(--gray-500) dark:text-(--gray-300) text-[6cpw] text-[0px] sm:text-[3.3cqw]/3.75 2xl: 2xl:leading-6">
                        Size should be at least 192px by 192px. Use PNG or JPG
                        for best results.
                      </div>
                    </div>

                    <div className="w-[40%] sm:w-[65%] h-[0%] aspect-square mt-[8%] mr-[4%] rounded-[50%] border-3 2xl:border-5 border-[var(--blue-500)]">
                      <label className="cursor-pointer" htmlFor="image">
                        <img
                          src={formData.image ? formData.image : ProfilePic}
                          className="w-[95%] h-[95%] mt-[2.5%] ml-[2.5%] rounded-full object-cover"
                        />
                      </label>

                      <input
                        type="file"
                        name="image"
                        id="image"
                        alt="Upload"
                        accept="image/*"
                        onChange={(e) => handleImage(e)}
                        className="hidden"
                      />
                    </div>
                  </div>

                  <input
                    type="name"
                    name="display"
                    placeholder="Display Name"
                    className="w-full py-[4%] sm:py-[2%] px-[4%] text-[6cpw] sm:text-[4.1cqw] mt-[5%] sm:mt-[6.4%] font-poppins placeholder-(--gray-500) dark:placeholder-(--gray-300) dark:text-white bg-(--gray-100) dark:bg-(--gray-600) rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)] focus:dark:ring-[var(--blue-400)] transition-all duration-200 ease-in-out"
                    onChange={(e) => {
                      handleChange(e);
                    }}
                    onBlur={(e) => {
                      handleBlur(e);
                    }}
                  />

                  <button
                    type="submit"
                    className={`w-full py-[4%] sm:py-[2%] px-[4%] text-[6cpw] sm:text-[4.1cqw] mt-[12%] sm:mt-[10%] font-poppins bg-(--gray-100) dark:bg-(--gray-600) rounded-lg bg-[linear-gradient(100deg,var(--blue-500),var(--purple-800))] text-white dark:text-[var(--gray-300)] shadow-md transition duration-300 ease-in-out ${isFilled() ? "cursor-pointer" : "grayscale-60"}`}
                  >
                    Sign up
                  </button>
                </form>

                <div className="flex flex-col sm:flex-row mt-[10%] justify-center items-center sm:gap-[3%]">
                  <p className="text-[6cpw] sm:text-[4.1cqw] font-poppins text-(--gray-500) dark:text-(--gray-300)">
                    Already Registered?
                  </p>

                  <a
                    onClick={() => {
                      navigate("/login");
                    }}
                    className="text-[var(--blue-500)] dark:text-[var(--blue-400)] text-[6cpw] sm:text-[4.1cqw] font-poppins underline cursor-pointer mt-[3%] sm:mt-[0%]"
                  >
                    Click here to login
                  </a>
                </div>

                <div className="sm:mt-[10%] sm:mb-[10%] border-[var(--gray-100)] sm:border-2 h-px w-[60%] mx-auto rounded-md"></div>
              </div>
            </SimpleBar>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
