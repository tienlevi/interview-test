import { useState } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./styles.module.css";
import { IOption, IQuiz } from "@/interfaces/quiz";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { randomId } from "@/utils/random";
import { defaultOptionValues } from "@/constants/values";

interface FormValues extends Partial<IQuiz> {}

interface Props {
  isEmptyOption?: boolean;
}

function Options({ isEmptyOption = false }: Props) {
  const { setValue } = useFormContext<FormValues>();
  const [options, setOptions] = useState<IOption[]>(defaultOptionValues);

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    option: IOption,
  ) => {
    const data: IOption = {
      ...option,
      name: e.target.value,
    };
    const updateOptions = options.map((o) => (o.id === option.id ? data : o));
    setOptions(updateOptions);
    setValue("options", updateOptions);
  };

  const createOption = () => {
    const data: IOption = {
      id: randomId(),
      name: "",
      sortOrder: options.length + 1,
      isCorrect: false,
    };
    setOptions((prev) => [...prev, data]);
  };

  return (
    <div className={`${styles.quizLabel} ${styles.quizLabelOptions}`}>
      <label htmlFor="" className={styles.quizLabelOption}>
        Options
      </label>
      {options.map((option) => (
        <Input
          key={option.id}
          onChange={(e) => onChange(e, option)}
          className={styles.quizLabelOption}
        />
      ))}

      {isEmptyOption && (
        <div className={`${styles.errorMessage} ${styles.quizLabelOption}`}>
          Option is required
        </div>
      )}
      <Button
        onClick={createOption}
        className={styles.createQuiz}
        variant="blue"
      >
        Create option
      </Button>
    </div>
  );
}

export default Options;
