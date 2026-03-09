import { HTMLAttributes } from "react";
import styles from "./input.module.css";

interface Props extends HTMLAttributes<HTMLInputElement> {
  value?: string;
  className?: string;
  placeholder?: string;
}

function Input({
  className = "",
  value,
  placeholder = "Enter...",
  ...props
}: Props) {
  return (
    <input
      value={value}
      type="text"
      className={`${styles.input} ${className}`}
      placeholder={placeholder}
      {...props}
    />
  );
}

export default Input;
