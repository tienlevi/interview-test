import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import { FormQuestionValues } from "@/interfaces/form";
import { FormProvider, useForm } from "react-hook-form";
import styles from "../styles.module.css";
import { IOption, IQuestion } from "@/interfaces/question";
import Options from "./Options";
import { toast } from "react-toastify";
import { randomId } from "@/utils/random";
import { useEffect } from "react";
import useQuizStore from "@/stores/useQuizStore";
import { defaultOptionValues } from "@/constants/values";

interface Props {
  question: IQuestion | null;
  options: IOption[];
  isEmptyOption: boolean;
  isUpdate: boolean;
  onOptions: (options: IOption[]) => void;
  onQuestion: (question: IQuestion | null) => void;
  onEmptyOption: (value: boolean) => void;
  onCloseForm: (value: boolean) => void;
  onUpdate: (value: boolean) => void;
}

function Questions({
  question,
  options,
  isEmptyOption = false,
  isUpdate,
  onOptions,
  onQuestion,
  onEmptyOption,
  onCloseForm,
  onUpdate,
}: Props) {
  const { quiz, questions, setQuestions, setQuiz } = useQuizStore();
  const methods = useForm<FormQuestionValues>();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = methods;

  const handleUpdateQuestion = (data: FormQuestionValues) => {
    const updateData: IQuestion = {
      id: question?.id,
      name: data.questionName,
      description: data.questionDescription,
      options: data.options,
    };
    const updateQuestion = questions.map((q) =>
      q.id === question?.id ? updateData : q,
    );
    setQuestions(updateQuestion);
    setQuiz({ ...quiz, questions: updateQuestion });
    reset();
    onCloseForm(false);
    onUpdate(false);
  };

  const handleCreateQuestion = (data: FormQuestionValues) => {
    const emptyOption = options.some((option) => option.name === "");
    const checkOptionTrueAnswer = options.some((o) => o.isCorrect === true);
    if (!checkOptionTrueAnswer)
      return toast.warning("At least one option is true");
    if (isEmptyOption) return;
    onEmptyOption(emptyOption);
    setQuestions([
      ...questions,
      {
        id: randomId(),
        name: data.questionName,
        description: data.questionDescription,
        options: data.options,
      },
    ]);
    reset();
    onCloseForm(false);
  };

  const handleCloseForm = () => {
    onCloseForm(false);
    onUpdate(false);
    onQuestion(null);
    onOptions(defaultOptionValues);
    reset();
  };

  useEffect(() => {
    if (isUpdate) {
      reset({
        options: question?.options,
        questionName: question?.name,
        questionDescription: question?.description,
      });
      onOptions(question?.options || []);
    }
  }, [isUpdate]);

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
            <Button onClick={handleCloseForm} variant="red">
              Close form
            </Button>
            {isUpdate ? (
              <Button
                onClick={handleSubmit(handleUpdateQuestion)}
                variant="outline"
              >
                Update question
              </Button>
            ) : (
              <Button
                onClick={handleSubmit(handleCreateQuestion)}
                variant="outline"
              >
                Create question
              </Button>
            )}
          </div>
        </div>
      </div>
    </FormProvider>
  );
}

export default Questions;
