import styles from "./input.module.css";

interface Props {
  className?: string;
  placeholder?: string;
}

function Input({ className = "", placeholder = "Enter..." }: Props) {
  return (
    <input
      type="text"
      className={`${styles.input} ${className}`}
      placeholder={placeholder}
    />
  );
}

export default Input;
