import QuizList from "@/components/QuizList";
import { mockQuizzes } from "@/constants/mockData";
import QuizForm from "@/components/QuizForm";
import Button from "@/components/ui/button";
import styles from "./pages.module.css";
import { Link } from "react-router-dom";

function QuizEditor() {
  return (
    <div className={`${styles.container} ${styles.editorPage}`}>
      <h1 className={styles.title}>Quiz editor page</h1>
      <div className={styles.buttons}>
        <Link to={"/"}>
          <Button variant="outline">Home page</Button>
        </Link>
        <div className={styles.createQuiz}>
          <Button>Create new quiz</Button>
        </div>
      </div>
      <QuizForm />
      <QuizList data={mockQuizzes} />
    </div>
  );
}

export default QuizEditor;
