import QuizList from "@/components/QuizList";
import { mockQuizzes } from "@/constants/mockData";
import QuizForm from "@/components/QuizForm";
import Button from "@/components/ui/button";
import styles from "./pages.module.css";

function QuizEditor() {
  return (
    <div className={`${styles.container} ${styles.editorPage}`}>
      <h1 className={styles.title}>Quiz editor page</h1>
      <QuizList data={mockQuizzes} />
      <QuizForm />
      <div className={styles.createQuiz}>
        <Button>Create new quiz</Button>
      </div>
    </div>
  );
}

export default QuizEditor;
