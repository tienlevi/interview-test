import { FormProvider, useForm } from "react-hook-form";
import Input from "@/components/ui/input";
import styles from "./styles.module.css";
import Questions from "./Questions";
import { FormValues } from "@/interfaces/form";
import Button from "@/components/ui/button";
import { useEffect, useState } from "react";
import { IOption, IQuestion } from "@/interfaces/question";
import { defaultOptionValues } from "@/constants/values";
import { toast } from "react-toastify";
import QuizList from "@/components/QuizList";
import useQuizStore from "@/stores/useQuizStore";
import { useNavigate } from "react-router-dom";

interface Props {
  openForm: boolean;
  onOpenForm: (openForm: boolean) => void;
}

function QuizForm({ openForm, onOpenForm }: Props) {
  const { quiz, setQuiz } = useQuizStore();
  const methods = useForm<FormValues>({
    defaultValues: {},
  });
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = methods;
  const navigate = useNavigate();
  const [options, setOptions] = useState<IOption[]>(defaultOptionValues);
  const [questions, setQuestions] = useState<IQuestion[]>(quiz.questions);
  const [question, setQuestion] = useState<IQuestion | null>(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isEmptyOption, setIsEmptyOption] = useState(false);

  const handleDeleteQuestion = (id: string) => {
    const remainingQuestions = questions.filter(
      (question) => question.id !== id,
    );

    setQuiz({ ...quiz, questions: remainingQuestions });
    setQuestions(remainingQuestions);
  };

  const handleGetQuestion = (id: string) => {
    onOpenForm(true);
    setIsUpdate(true);
    const ques = questions.find((q) => q.id === id);
    setQuestion(ques || null);
  };

  const onSubmit = (data: FormValues) => {
    if (openForm) {
      const emptyOption = options.some((option) => option.name === "");

      const checkOptionTrueAnswer = options.some((o) => o.isCorrect === true);
      setIsEmptyOption(emptyOption);
      if (!checkOptionTrueAnswer)
        return toast.warning("At least one option is true");
      if (isEmptyOption) return;
    }
    setQuiz({ ...data, questions: questions });
    navigate("/");
  };

  useEffect(() => {
    reset({ name: quiz.name, description: quiz.description });
  }, []);

  return (
    <FormProvider {...methods}>
      <div className={styles.quizFormContainer}>
        <div className={styles.quizForm}>
          <div className={styles.intro}>Infomation Quiz</div>
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
      <QuizList
        data={{
          name: quiz.name,
          description: quiz.description,
          questions: questions,
        }}
        onDeleteQuestion={handleDeleteQuestion}
        getQuestion={handleGetQuestion}
      />
      {openForm && (
        <Questions
          question={question!}
          questions={questions}
          options={options}
          isEmptyOption={isEmptyOption}
          isUpdate={isUpdate}
          onEmptyOption={setIsEmptyOption}
          onQuestion={setQuestion}
          onQuestions={setQuestions}
          onOptions={setOptions}
          onCloseForm={onOpenForm}
          onUpdate={setIsUpdate}
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
