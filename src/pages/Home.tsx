import Button from "@/components/ui/button";
import { Link } from "react-router-dom";
import styles from "./pages.module.css";
import QuizList from "@/components/QuizList";
import useQuizStore from "@/stores/useQuizStore";

function Home() {
  const { quiz } = useQuizStore();

  return (
    <div className={styles.home}>
      <div className={styles.title}>Home</div>
      <div className={styles.container}>
        <Link to={"/quiz-editor"} className={styles.btn}>
          <Button variant="blue">Quiz editor page</Button>
        </Link>
        <QuizList data={quiz} />
      </div>
    </div>
  );
}

export default Home;
