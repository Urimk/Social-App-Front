import { useState, useId } from "react";
import "./Checkbox.css";

export default function Checkbox({}) {
  const id = useId();
  return (
    <div
      className="checkbox-wrapper text-[var(--checkbox-color)] dark:text-[var(--dark-checkbox)] [--bg-color:theme(colors.white)] dark:[--bg-color:var(--container-dark)] flex content-center scale-125 sm:scale-none ml-[5%] mt-[2%] sm:ml-[0%] sm:mt-[0%]"
      style={{
        "--size": "var(--checkbox-size)",
      }}
    >
      <input id={id} type="checkbox" className="promoted-input-checkbox  " />
      <svg className="checkmark-outline">
        <use xlinkHref="#checkmark" />
      </svg>
      <svg className="checkmark-front">
        <use xlinkHref="#checkmark" />
      </svg>
      <label
        htmlFor={id}
        className="text-[3.3cqw]  font-poppins text-[var(--text-color)] dark:text-[var(--dark-text)]"
      >
        Remember me
      </label>

      <svg xmlns="http://www.w3.org/2000/svg">
        <symbol id="checkmark" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeMiterlimit="10"
            fill="none"
            d="M22.9 3.7l-15.2 16.6-6.6-7.1"
          ></path>
        </symbol>
      </svg>
    </div>
  );
}
