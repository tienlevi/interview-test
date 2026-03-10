import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { FormQuestionValues } from "@/interfaces/form";
import { FormProvider, useForm } from "react-hook-form";
import styles from "../styles.module.css";
import { IOption, IQuestion } from "@/interfaces/question";
import Options from "./Options";
import { toast } from "react-toastify";
import { randomId } from "@/utils/random";

interface Props {
  questions: IQuestion[];
  options: IOption[];
  isEmptyOption: boolean;
  onOptions: (options: IOption[]) => void;
  onQuestions: (questions: IQuestion[]) => void;
  onEmptyOption: (value: boolean) => void;
  onCloseForm: (value: boolean) => void;
}

function Questions({
  questions,
  options,
  isEmptyOption = false,
  onOptions,
  onQuestions,
  onEmptyOption,
  onCloseForm,
}: Props) {
  const methods = useForm<FormQuestionValues>();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = methods;

  const handleCreateQuestion = (data: FormQuestionValues) => {
    const emptyOption = options.some((option) => option.name === "");
    const checkOptionTrueAnswer = options.some((o) => o.isCorrect === true);
    onEmptyOption(emptyOption);
    onQuestions([
      ...questions,
      {
        id: randomId(),
        name: data.questionName,
        description: data.questionDescription,
        options: data.options,
      },
    ]);
    if (!checkOptionTrueAnswer)
      return toast.warning("At least one option is true");
    if (isEmptyOption) return;
    console.log("🚀 ~ handleCreateQuestion ~ data:", data);

    return data;
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
          <div className={styles.questionBtn}>
            <Button onClick={() => onCloseForm(false)} variant="red">
              Close form
            </Button>
            <Button
              onClick={handleSubmit(handleCreateQuestion)}
              variant="outline"
            >
              Create question
            </Button>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}

export default Questions;
