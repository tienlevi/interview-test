import QuizList from "@/components/QuizList";
import { mockQuizzes } from "@/constants/mockData";
import QuizForm from "@/components/QuizForm";
import Button from "@/components/ui/button";
import styles from "./pages.module.css";
import { useState } from "react";

function QuizEditor() {
  const [openForm, setOpenForm] = useState(false);

  return (
    <div className={`${styles.container} ${styles.editorPage}`}>
      <h1 className={styles.title}>Quiz editor page</h1>
      <QuizList data={mockQuizzes} />
      {openForm && <QuizForm onOpenForm={setOpenForm} />}
      <div className={styles.createQuiz}>
        <Button onClick={() => setOpenForm(!openForm)}>
          {openForm ? "Close form" : "Create new quiz"}
        </Button>
      </div>
    </div>
  );
}

export default QuizEditor;
