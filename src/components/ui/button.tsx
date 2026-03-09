import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./button.module.css";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  variant?: "red" | "primary" | "black" | "outline";
  children: ReactNode;
}

function Button({ className, variant = "primary", children, ...props }: Props) {
  const variants = {
    red: styles.btnBgRed,
    primary: styles.btnBgBlue,
    black: styles.btnBgBlack,
    outline: styles.outline,
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
