import styles from "./styles.module.css";
import homeStyles from "@/pages/pages.module.css";
import { IQuiz } from "@/interfaces/quiz";
import Button from "@/components/ui/button";
import { useLocation } from "react-router-dom";
import { ChangeEvent, useState } from "react";
import { IOption, IQuestion } from "@/interfaces/question";
import { Check, X } from "lucide-react";
import { toast } from "react-toastify";
import { exportToJSONFile } from "@/utils/json";

interface Props {
  data: IQuiz;
  onDeleteQuestion?: (id: string) => void;
  getQuestion?: (id: string) => void;
}

interface SelectOptions extends IOption {
  questionId?: string;
}

function QuizList({
  data,
  onDeleteQuestion = () => {},
  getQuestion = () => {},
}: Props) {
  const [selectedOptions, setSelectedOptions] = useState<SelectOptions[]>([]);
  const [showAnswer, setShowAnswer] = useState(false);

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const renderAnswer = (option: IOption) => {
    const isSeleted = selectedOptions.find((o) => o.id === option.id);

    if (!isSeleted) return null;

    if (isSeleted?.isCorrect) {
      return <Check size={20} color="green" />;
    }

    if (!isSeleted?.isCorrect) {
      return <X size={20} color="red" />;
    }
  };

  const handleSelectedOptions = (
    e: ChangeEvent<HTMLInputElement>,
    option: IOption,
    question: IQuestion,
  ) => {
    if (e.target.checked) {
      setSelectedOptions((prev) => [
        ...prev,
        {
          ...option,
          name: e.target.value,
          questionId: question.id || "",
        },
      ]);
    } else {
      setSelectedOptions(selectedOptions.filter((o) => o.id !== option.id));
    }
  };

  const handleSubmitAnswer = () => {
    const isSelectedOptions = data.questions.every((question) =>
      selectedOptions.find((o) => o.questionId === question.id),
    );

    if (!isSelectedOptions) {
      return toast.warning("Please select at least 1 option of question");
    }

    setShowAnswer(true);
  };

  const resetQuestions = () => {
    setShowAnswer(false);
  };

  return (
    <div className={styles.quizContainer}>
      <div className={styles.quizInfo}>
        <h2>Name: {data.name}</h2>
        <div className={homeStyles.description}>
          Description: {data.description}
        </div>
      </div>
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
                    <input
                      disabled={showAnswer}
                      onChange={(e) =>
                        handleSelectedOptions(e, option, question)
                      }
                      type="checkbox"
                      value={option.name}
                    />
                    <div>
                      {idx + 1}. {option.name}
                    </div>
                    {showAnswer && renderAnswer(option)}
                  </div>
                ))}
              </div>
            </div>
            {!isHomePage && (
              <div className={styles.btns}>
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
        <div className={styles.btns}>
          {showAnswer && (
            <Button onClick={resetQuestions} variant="outline">
              Reset questions
            </Button>
          )}
          <Button
            disabled={showAnswer}
            onClick={handleSubmitAnswer}
            variant="black"
          >
            Submit quiz
          </Button>
          <Button
            onClick={() => exportToJSONFile(JSON.stringify(data))}
            variant="primary"
          >
            Export this quiz to JSON
          </Button>
        </div>
      </div>
    </div>
  );
}

export default QuizList;
