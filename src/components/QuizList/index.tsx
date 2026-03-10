import styles from "./styles.module.css";
import homeStyles from "@/pages/pages.module.css";
import { IQuiz } from "@/interfaces/quiz";
import Button from "@/components/ui/button";
import { useLocation } from "react-router-dom";

interface Props {
  data: IQuiz;
  onDeleteQuestion?: (id: string) => void;
  getQuestion?: (id: string) => void;
}

function QuizList({
  data,
  onDeleteQuestion = () => {},
  getQuestion = () => {},
}: Props) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className={styles.quizContainer}>
      <div className={homeStyles.title}>{data.name}</div>
      <div className={homeStyles.description}>{data.description}</div>
      <div className={styles.quiz}>
        {data.questions.map((question, index) => (
          <div key={question.id} className={styles.question}>
            <div className="">
              <div className={styles.quizName}>
                {index + 1}. {question.name}
              </div>
              <div className={styles.quizDescription}>
                {question.description}
              </div>
              <div className={styles.options}>
                {question.options.map((option, idx) => (
                  <div key={option.id} className={styles.option}>
                    <input type="checkbox" />
                    <div>
                      {idx + 1}. {option.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {!isHomePage && (
              <div style={{ display: "flex", gap: 8 }}>
                <Button
                  onClick={() => getQuestion(question.id || "")}
                  variant="black"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => onDeleteQuestion(question.id || "")}
                  variant="red"
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default QuizList;
