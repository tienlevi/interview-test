import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import styles from "./styles.module.css";
import { FormProvider, useForm } from "react-hook-form";
import { IQuiz } from "@/interfaces/quiz";
import Options from "./Options";
import { useState } from "react";

interface FormValues extends Partial<IQuiz> {}

function QuizForm() {
  const methods = useForm<FormValues>({ defaultValues: { options: [] } });
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = methods;
  const { options } = watch();
  const [isEmptyOption, setIsEmptyOption] = useState(false);
  const onSubmit = (data: FormValues) => {
    setIsEmptyOption(options?.some((option) => option.name === "") || false);
    if (isEmptyOption) return;
    console.log("🚀 ~ onSubmit ~ data:", data);
    return data;
  };

  return (
    <FormProvider {...methods}>
      <div className={styles.quizFormContainer}>
        <div className={styles.quizForm}>
          <div className={styles.quizFormSubmit}>
            <div className={styles.quizLabel}>
              <label htmlFor="">Name</label>
              <Input {...register("name", { required: "Name is required" })} />
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
            <Options isEmptyOption={isEmptyOption} />
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
