import Button from "@/components/ui/button";
import { Link } from "react-router-dom";
import styles from "./pages.module.css";
// import QuizList from "@/components/QuizList";

function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.title}>Home</div>
      <div className={styles.container}>
        {/* <QuizList data={[]} /> */}
        <Link to={"/quiz-editor"} className={styles.btn}>
          <Button>Quiz editor page</Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
