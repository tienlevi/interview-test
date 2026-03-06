import styles from "./input.module.css";

interface Props {
  value: string;
  onChange: () => void;
  placeholder?: string;
}

function Input({ value, onChange, placeholder = "Enter..." }: Props) {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      className={styles.input}
      placeholder={placeholder}
    />
  );
}

export default Input;
