import QuizForm from "@/components/QuizForm";
import Button from "@/components/ui/button";
import styles from "./pages.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import ImportQuiz from "@/components/ImportQuiz";

function QuizEditor() {
  const [openForm, setOpenForm] = useState(false);

  return (
    <div className={`${styles.container} ${styles.editorPage}`}>
      <h1 className={styles.title}>Quiz editor page</h1>
      <div className={styles.wrapper}>
        <div style={{ width: "50%" }}>
          <div className={styles.buttons}>
            <Link to={"/"}>
              <Button variant="outline">Home page</Button>
            </Link>
            <div className={styles.createQuestion}>
              <Button onClick={() => setOpenForm(!openForm)}>
                {openForm ? "Close question form" : "Create new question"}
              </Button>
            </div>
          </div>
          <QuizForm openForm={openForm} onOpenForm={setOpenForm} />
        </div>
        <ImportQuiz />
      </div>
    </div>
  );
}

export default QuizEditor;
