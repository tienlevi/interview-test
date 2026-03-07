import Button from "@/components/ui/button";
import { Link } from "react-router-dom";
import styles from "./pages.module.css";

function Home() {
  return (
    <div className="">
      <div className={styles.title}>Home</div>
      <div className={styles.container}>
        <Link to={"/quiz-editor"}>
          <Button variant="blue">Quiz editor page</Button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
