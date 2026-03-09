import styles from "./styles.module.css";
import homeStyles from "@/pages/pages.module.css";
import { IQuiz } from "@/interfaces/quiz";
import Button from "@/components/ui/button";
import useQuizStore from "@/stores/useQuizStore";
import { useLocation } from "react-router-dom";

interface Props {
  data: IQuiz[];
}

function QuizList({ data }: Props) {
  const location = useLocation();
  const { setQuiz } = useQuizStore();
  const isHomePage = location.pathname === "/";

  const handleDeleteQuiz = (id: string) => {
    const remainingQuiz = data.filter((option) => option.id !== id);
    setQuiz(remainingQuiz);
  };

  return (
    <div className={styles.quizContainer}>
      <div className={homeStyles.title}>Questions</div>
      <div className={styles.quiz}>
        {data.map((quiz, index) => (
          <div className={styles.quizItem} key={quiz.id}>
            <div>
              <div className={styles.quizName}>
                {index + 1}. {quiz.name}
              </div>
              <div className={styles.quizDescription}>{quiz.description}</div>
              <div className={styles.options}>
                {quiz.options.map((option) => (
                  <div key={option.id} className={styles.option}>
                    <input type="checkbox" />
                    <div>
                      {option.sortOrder}. {option.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {!isHomePage && (
              <Button onClick={() => handleDeleteQuiz(quiz.id)}>Delete</Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizList;
