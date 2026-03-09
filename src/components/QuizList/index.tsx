import styles from "./styles.module.css";
import homeStyles from "@/pages/pages.module.css";
import { IQuiz } from "@/interfaces/quiz";

interface Props {
  data: IQuiz[];
}

function QuizList({ data }: Props) {
  return (
    <div className={styles.quizContainer}>
      <div className={homeStyles.title}>Questions</div>
      <div className={styles.quiz}>
        {data.map((quiz) => (
          <div key={quiz.id}>
            <div className={styles.quizName}>
              {quiz.id}. {quiz.name}
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
        ))}
      </div>
    </div>
  );
}

export default QuizList;
