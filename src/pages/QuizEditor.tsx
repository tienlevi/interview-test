import QuizList from "@/components/QuizList";
import QuizForm from "@/components/QuizForm";
import Button from "@/components/ui/button";
import styles from "./pages.module.css";
import { useState } from "react";
import useQuizStore from "@/stores/useQuizStore";
import { Link } from "react-router-dom";

function QuizEditor() {
  const { quiz } = useQuizStore();
  const [openForm, setOpenForm] = useState(false);

  return (
    <div className={`${styles.container} ${styles.editorPage}`}>
      <h1 className={styles.title}>Quiz editor page</h1>
      <div className={styles.buttons}>
        <Link to={"/"}>
          <Button>Home page</Button>
        </Link>
        <Button
          variant="teal"
          onClick={() => setOpenForm(!openForm)}
          className={styles.createQuiz}
        >
          {openForm ? "Close form" : "Create new quiz"}
        </Button>
      </div>
      {openForm && <QuizForm onOpenForm={setOpenForm} />}
      <QuizList data={quiz} />
    </div>
  );
}

export default QuizEditor;
