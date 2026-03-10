import { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";
import styles from "../styles.module.css";
import { IOption } from "@/interfaces/question";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";
import { randomId } from "@/utils/random";
import { FormQuestionValues } from "@/interfaces/form";

interface Props {
  options: IOption[];
  isEmptyOption: boolean;
  onOptions: (options: IOption[]) => void;
}

function Options({ options, isEmptyOption = false, onOptions }: Props) {
  const { setValue } = useFormContext<FormQuestionValues>();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    option: IOption,
  ) => {
    const data: IOption = {
      ...option,
      name: e.target.value,
    };
    const updatedOptions = options.map((o) => (o.id === option.id ? data : o));
    onOptions(updatedOptions);
    setValue("options", updatedOptions);
  };

  const handleSelectChange = (
    e: ChangeEvent<HTMLSelectElement>,
    option: IOption,
  ) => {
    const data: IOption = {
      ...option,
      isCorrect: JSON.parse(e.target.value),
    };
    const updatedOptions = options.map((o) => (o.id === option.id ? data : o));
    onOptions(updatedOptions);
    setValue("options", updatedOptions);
  };

  const handleCreateOption = () => {
    const data: IOption = {
      id: randomId(),
      name: "",
      isCorrect: false,
      canDelete: true,
    };
    onOptions([...options, data]);
  };

  const handleDeleteOption = (id: string) => {
    const remainingOptions = options.filter((option) => option.id !== id);
    onOptions(remainingOptions);
    setValue("options", remainingOptions);
  };

  return (
    <>
      <div className={`${styles.quizLabel} ${styles.quizLabelOptions}`}>
        <div className={`${styles.quizLabelOption} ${styles.quizTitle}`}>
          Options
        </div>
        {options.map((option, index) => (
          <div
            key={option.id}
            className={`${styles.quizLabelOption} ${styles.quizOption}`}
          >
            <p>{index + 1}.</p>
            <Input
              onChange={(e) => handleInputChange(e, option)}
              containerClassName={styles.quizLabelOption}
              prefixNode={
                <div style={{ display: "flex", justifyContent: "end", gap: 6 }}>
                  <select
                    key={option.id}
                    name="isCorrect"
                    defaultValue={"false"}
                    onChange={(e) => handleSelectChange(e, option)}
                    className={styles.quizSelect}
                  >
                    <option value="true">Correct answer</option>
                    <option value="false">Incorrect answer</option>
                  </select>
                  {options.length >= 3 && option.canDelete && (
                    <Button
                      onClick={() => handleDeleteOption(option.id)}
                      type="button"
                      variant="red"
                    >
                      Delete
                    </Button>
                  )}
                </div>
              }
            />
          </div>
        ))}
        <Button onClick={handleCreateOption} className={styles.create}>
          Create option
        </Button>
      </div>
      {isEmptyOption && (
        <div className={`${styles.errorMessage} ${styles.quizLabelOption}`}>
          Option is required
        </div>
      )}
    </>
  );
}

export default Options;
