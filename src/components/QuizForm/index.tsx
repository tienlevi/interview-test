import { FormProvider, useForm } from "react-hook-form";
import Input from "@/components/ui/input";
import styles from "./styles.module.css";
import Questions from "./Questions";
import { FormValues } from "@/interfaces/form";
import Button from "@/components/ui/button";
import { useState } from "react";
import { IOption, IQuestion } from "@/interfaces/question";
import { defaultOptionValues } from "@/constants/values";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface Props {
  openForm: boolean;
  onOpenForm: (openForm: boolean) => void;
}

function QuizForm({ openForm, onOpenForm }: Props) {
  const methods = useForm<FormValues>({
    defaultValues: {},
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = methods;
  const navigate = useNavigate();
  const [options, setOptions] = useState<IOption[]>(defaultOptionValues);
  const [questions, setQuestions] = useState<IQuestion[]>(quiz.questions);
  const [isEmptyOption, setIsEmptyOption] = useState(false);

  const onSubmit = (data: FormValues) => {
    const emptyOption = options.some((option) => option.name === "");

    const checkOptionTrueAnswer = options.some((o) => o.isCorrect === true);
    setIsEmptyOption(emptyOption);
    if (!checkOptionTrueAnswer)
      return toast.warning("At least one option is true");
    if (isEmptyOption) return;
    console.log(data);
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
      </div>

      {openForm && (
        <Questions
          questions={questions}
          options={options}
          isEmptyOption={isEmptyOption}
          onEmptyOption={setIsEmptyOption}
          onQuestions={setQuestions}
          onOptions={setOptions}
          onCloseForm={onOpenForm}
        />
      )}
      <Button
        onClick={handleSubmit(onSubmit)}
        variant="black"
        className={styles.quizSubmit}
      >
        Submit
      </Button>
    </FormProvider>
  );
}

export default QuizForm;
