import { FormProvider, useForm } from "react-hook-form";
import Input from "@/components/ui/input";
import styles from "./styles.module.css";
import Questions from "./Questions";
import { FormValues } from "@/interfaces/form";
import Button from "@/components/ui/button";
import { useState } from "react";
import { IOption } from "@/interfaces/question";
import { defaultOptionValues } from "@/constants/values";
import { toast } from "react-toastify";

function QuizForm() {
  const methods = useForm<FormValues>({
    defaultValues: {},
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = methods;
  const [options, setOptions] = useState<IOption[]>(defaultOptionValues);
  const [isEmptyOption, setIsEmptyOption] = useState(false);

  const onSubmit = (data: FormValues) => {
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
    <FormProvider {...methods}>
      <div className={styles.quizFormContainer}>
        <div className={styles.quizForm}>
          <div className={styles.intro}>Intro Quiz</div>
          <form className={styles.quizFormSubmit}>
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
          </form>
        </div>
        <Questions
          options={options}
          isEmptyOption={isEmptyOption}
          onOptions={setOptions}
        />
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="black"
          className={styles.quizSubmit}
        >
          Submit
        </Button>
      </div>
    </FormProvider>
  );
}

export default QuizForm;
