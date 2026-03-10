import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./styles.module.css";
import { IOption, IQuestion } from "@/interfaces/question";
import Input from "@/components/ui/input";
import { defaultOptionValues } from "@/constants/values";
import Button from "../ui/button";
import { randomId } from "@/utils/random";
import { toast } from "react-toastify";

function Questions() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<IQuestion>();
  const [options, setOptions] = useState<IOption[]>(defaultOptionValues);
  const [isEmptyOption, setIsEmptyOption] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    option: IOption,
  ) => {
    const data: IOption = {
      ...option,
      name: e.target.value,
    };
    const updatedOptions = options.map((o) => (o.id === option.id ? data : o));
    setOptions(updatedOptions);
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
    setOptions(updatedOptions);
    setValue("options", updatedOptions);
  };

  const handleCreateOption = () => {
    const data: IOption = {
      id: randomId(),
      name: "",
      isCorrect: false,
      canDelete: true,
    };
    setOptions((prev) => [...prev, data]);
  };

  const handleDeleteOption = (id: string) => {
    const remainingOptions = options.filter((option) => option.id !== id);
    setOptions(remainingOptions);
    setValue("options", remainingOptions);
  };

  const onSubmit = (data: IQuestion) => {
    const emptyOption = options.some((option) => option.name === "");
    const checkOptionTrueAnswer = options.some((o) => o.isCorrect === true);
    setIsEmptyOption(emptyOption);
    if (!checkOptionTrueAnswer)
      return toast.warning("At least one option is true");
    if (isEmptyOption) return;

    console.log("🚀 ~ onSubmit ~ data:", data);
    return data;
  };

  return (
    <div className={styles.quizFormContainer}>
      <div className={styles.quizForm}>
        <div className={styles.quizTitle}>Question</div>
        <div className={styles.quizLabel}>
          <label htmlFor="">Name</label>
          <Input {...register("name", { required: "Name is required" })} />
        </div>
        {errors.name && (
          <div className={styles.error}>{errors.name.message}</div>
        )}
        <div className={styles.quizLabel}>
          <label htmlFor="">Description</label>
          <Input
            {...register("description", {
              required: "Description is required",
            })}
          />
        </div>
        {errors.description && (
          <div className={styles.error}>{errors.description.message}</div>
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
      <Button
        onClick={handleSubmit(onSubmit)}
        variant="black"
        className={styles.quizSubmit}
      >
        Submit
      </Button>
    </div>
  );
}

export default Questions;
