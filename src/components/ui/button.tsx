import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./button.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "red" | "blue" | "black";
  children: ReactNode;
}

function Button({ className, variant = "red", children, ...props }: Props) {
  const variants = {
    red: styles.btnBgRed,
    blue: styles.btnBgBlue,
    black: styles.btnBgBlack,
  };

  return (
    <button
      className={`${styles.btn} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
