import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./button.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "red" | "blue" | "black" | "teal";
  children: ReactNode;
}

function Button({ className, variant = "red", children, ...props }: Props) {
  const variants = {
    red: styles.btnBgRed,
    blue: styles.btnBgBlue,
    black: styles.btnBgBlack,
    teal: styles.btnBgTeal,
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
