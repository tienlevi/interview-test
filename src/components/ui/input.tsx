import { HTMLAttributes, ReactNode } from "react";
import styles from "./input.module.css";

interface Props extends HTMLAttributes<HTMLInputElement> {
  value?: string;
  containerClassName?: string;
  className?: string;
  placeholder?: string;
  prefixNode?: ReactNode;
}

function Input({
  containerClassName = "",
  className = "",
  value,
  placeholder = "Enter...",
  prefixNode,
  ...props
}: Props) {
  return (
    <div className={`${styles.inputContainer} ${containerClassName}`}>
      <input
        value={value}
        type="text"
        className={`${styles.input} ${className}`}
        placeholder={placeholder}
        {...props}
      />
      {prefixNode}
    </div>
  );
}

export default Input;
