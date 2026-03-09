import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import styles from "./styles.module.css";
import { FormProvider, useForm } from "react-hook-form";
import { IOption, IQuiz } from "@/interfaces/quiz";
import Options from "./Options";
import { useState } from "react";
import { defaultOptionValues } from "@/constants/values";
import { toast } from "react-toastify";
import useQuizStore from "@/stores/useQuizStore";
import { randomId } from "@/utils/random";

interface FormValues extends IQuiz {}

interface Props {
  onOpenForm: (openForm: boolean) => void;
}

function QuizForm({ onOpenForm }: Props) {
  const methods = useForm<FormValues>({
    defaultValues: { id: randomId(), options: [] },
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = methods;
  const [options, setOptions] = useState<IOption[]>(defaultOptionValues);
  const [isEmptyOption, setIsEmptyOption] = useState(false);
  const { quiz, setQuiz } = useQuizStore();

  const onSubmit = (data: IQuiz) => {
    const emptyOption = options.some((option) => option.name === "");
    const checkOptionTrueAnswer = options.some((o) => o.isCorrect === true);
    setIsEmptyOption(emptyOption);
    if (!checkOptionTrueAnswer)
      return toast.warning("At least one option is true");
    if (isEmptyOption) return;

    onOpenForm(false);
    setQuiz([...quiz, data]);
  };

  return (
    <FormProvider {...methods}>
      <div className={styles.quizFormContainer}>
        <div className={styles.quizForm}>
          <div className={styles.quizFormSubmit}>
            <div className={styles.quizLabel}>
              <label htmlFor="">Name</label>
              <Input
                {...register("name", { required: "Name is required" })}
                prefixNode
              />
              {errors.name?.type === "required" && (
                <div className={styles.errorMessage}>{errors.name.message}</div>
              )}
            </div>
            <div className={styles.quizLabel}>
              <label htmlFor="">Description</label>
              <Input
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description?.type === "required" && (
                <div className={styles.errorMessage}>
                  {errors.description.message}
                </div>
              )}
            </div>
            <Options
              options={options}
              onOptions={setOptions}
              isEmptyOption={isEmptyOption}
            />
          </div>
        </div>
        <Button
          variant="black"
          onClick={handleSubmit(onSubmit)}
          className={styles.quizSubmit}
        >
          Submit
        </Button>
      </div>
    </FormProvider>
  );
}

export default QuizForm;
