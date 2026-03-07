import { mockQuizzes } from "@/constants/mockData";
import styles from "./styles.module.css";
import homeStyles from "@/pages/pages.module.css";

function QuizList() {
  return (
    <div className={styles.quizContainer}>
      <div className={homeStyles.title}>Questions</div>
      <div className={styles.quiz}>
        {mockQuizzes.map((quiz) => (
          <div key={quiz.id}>
            <div className={styles.quizName}>
              {quiz.id}. {quiz.name}
            </div>
            <div className={styles.quizDescription}>{quiz.description}</div>
            <div className={styles.options}>
              {quiz.options.map((option) => (
                <div className={styles.option}>
                  <input type="checkbox" />
                  <div>
                    {option.sortOrder}. {option.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizList;
