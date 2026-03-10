import { useForm } from "react-hook-form";
import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import styles from "./styles.module.css";
import { IQuiz } from "@/interfaces/quiz";
import Questions from "./Questions";

function QuizForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IQuiz>({
    defaultValues: {},
  });

  const onSubmit = (data: IQuiz) => {
    console.log(data);
  };

  return (
    <>
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
        <Button
          onClick={handleSubmit(onSubmit)}
          variant="black"
          className={styles.quizSubmit}
        >
          Submit
        </Button>
      </div>
      <Questions />
    </>
  );
}

export default QuizForm;
