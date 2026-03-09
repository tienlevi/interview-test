import Button from "@/components/ui/button";
import Input from "@/components/ui/input";
import styles from "./styles.module.css";

function QuizForm() {
  return (
    <>
      <div className={styles.quizFormContainer}>
        <div className={styles.quizForm}>
          <form className={styles.quizFormSubmit}>
            <div>
              <div className={styles.quizLabel}>
                <label htmlFor="">Name</label>
                <Input />
              </div>
              <div className={styles.quizLabel}>
                <label htmlFor="">Description</label>
                <Input />
              </div>
            </div>
          </form>
        </div>
        <Button variant="black" className={styles.quizSubmit}>
          Submit
        </Button>
      </div>
    </>
  );
}

export default QuizForm;
