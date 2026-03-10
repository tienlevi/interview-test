import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { FormQuestionValues } from "@/interfaces/form";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import styles from "../styles.module.css";
import { IOption, IQuestion } from "@/interfaces/question";
import Options from "./Options";
import { toast } from "react-toastify";

interface Props {
  questions: IQuestion[];
  options: IOption[];
  isEmptyOption: boolean;
  isEmptyQuestion: boolean;
  onOptions: (options: IOption[]) => void;
  onEmptyQuestion: (value: boolean) => void;
  onEmptyOption: (value: boolean) => void;
}

function Questions({
  questions,
  options,
  isEmptyOption = false,
  isEmptyQuestion = false,
  onOptions,
  onEmptyQuestion,
  onEmptyOption,
}: Props) {
  const methods = useForm<FormQuestionValues>();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = methods;

  const handleCreateQuestion = (data: FormQuestionValues) => {
    console.log("🚀 ~ handleCreateQuestion ~ data:", data);
    const emptyOption = options.some((option) => option.name === "");
    const emptyQuestion = questions.some(
      (question) => question.name === "" || question.description === "",
    );
    const checkOptionTrueAnswer = options.some((o) => o.isCorrect === true);
    onEmptyOption(emptyOption);
    onEmptyQuestion(emptyQuestion);
    if (!checkOptionTrueAnswer)
      return toast.warning("At least one option is true");
    if (isEmptyOption) return;
  };
  return (
    <FormProvider {...methods}>
      <div className={styles.quizFormContainer}>
        <div className={styles.quizForm}>
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
          </div>
          <Options
            options={options}
            isEmptyOption={isEmptyOption}
            onOptions={onOptions}
          />
          <Button
            onClick={handleSubmit(handleCreateQuestion)}
            variant="outline"
            className={styles.create}
          >
            Create question
          </Button>
        </div>
      </div>
    </FormProvider>
  );
}

export default Questions;
