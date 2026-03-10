import styles from "./styles.module.css";
import homeStyles from "@/pages/pages.module.css";
import { IQuiz } from "@/interfaces/quiz";

interface Props {
  data: IQuiz;
}

function QuizList({ data }: Props) {
  return (
    <div className={styles.quizContainer}>
      <div className={homeStyles.title}>{data.name}</div>
      <div className={homeStyles.description}>{data.description}</div>
      <div className={styles.quiz}>
        {data.questions.map((quiz, index) => (
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
                    {index + 1}. {option.name}
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
