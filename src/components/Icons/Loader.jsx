import React from "react";
import styles from "./loader.module.css";
function Loader() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 100 100"
      className={styles.icon}
    >
      <circle
        cx="50"
        cy="50"
        r="37"
        stroke="white"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
        strokeDasharray="40 192"
        strokeDashoffset="0"
      >
        <animate
          attributeName="stroke-dasharray"
          repeatCount="indefinite"
          dur="1.2s"
          values="14 218;160 72;14 218"
          keyTimes="0;0.5;1"
        ></animate>
        <animate
          attributeName="stroke-dashoffset"
          repeatCount="indefinite"
          dur="1.2s"
          from="0"
          to="-464"
        ></animate>
      </circle>
    </svg>
  );
}

export default Loader;
