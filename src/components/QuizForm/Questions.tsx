import { ChangeEvent } from "react";
import { useFormContext } from "react-hook-form";
import styles from "./styles.module.css";
import { IOption } from "@/interfaces/question";
import Input from "@/components/ui/input";
import Button from "../ui/button";
import { randomId } from "@/utils/random";
import { FormValues } from "@/interfaces/form";

interface Props {
  options: IOption[];
  isEmptyOption: boolean;
  onOptions: (options: IOption[]) => void;
}

function Questions({ options, isEmptyOption = false, onOptions }: Props) {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<FormValues>();

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
      <div className={styles.quizForm}>
        <div className={styles.quizTitle}>Question</div>
        <div className={styles.quizLabel}>
          <label htmlFor="">Name</label>
          <Input
            {...register("questionName", { required: "Name is required" })}
          />
        </div>
        {errors.questionName && (
          <div className={styles.error}>{errors.questionName.message}</div>
        )}
        <div className={styles.quizLabel}>
          <label htmlFor="">Description</label>
          <Input
            {...register("questionDescription", {
              required: "Description is required",
            })}
          />
        </div>
        {errors.questionDescription && (
          <div className={styles.error}>
            {errors.questionDescription.message}
          </div>
        )}
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
                  <div
                    style={{ display: "flex", justifyContent: "end", gap: 6 }}
                  >
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
          <Button onClick={handleCreateOption} className={styles.createQuiz}>
            Create option
          </Button>
        </div>
        {isEmptyOption && (
          <div className={`${styles.errorMessage} ${styles.quizLabelOption}`}>
            Option is required
          </div>
        )}
      </div>
    </>
  );
}

export default Questions;
