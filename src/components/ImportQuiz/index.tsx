import { ChangeEvent, useRef, useState } from "react";
import styles from "./styles.module.css";
import Button from "../ui/button";
import { validateInfo } from "@/utils/validates";
import useQuizStore from "@/stores/useQuizStore";
import { toast } from "react-toastify";

function ImportQuiz() {
  const { setQuiz, setQuestions } = useQuizStore();
  const [jsonFile, setJSONFile] = useState();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImport = () => {
    const validateJSON = validateInfo.safeParse(jsonFile);
    if (validateJSON.success) {
      setQuiz(validateJSON.data);
      setQuestions(validateJSON.data.questions || []);
      return toast.success("Import quiz success");
    }
    return toast.error("Import quiz failed");
  };

  const handleEvent = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/json") {
      const reader = new FileReader();

      reader.onload = (e) => {
        setJSONFile(JSON.parse(e.target?.result as any));
      };

      reader.readAsText(file);
    }
  };

  return (
    <div className={styles.importQuiz}>
      <div className={styles.title}>Upload quiz</div>
      <input type="file" ref={fileRef} accept=".json" onChange={handleEvent} />
      {jsonFile && (
        <>
          <div className={styles.json}>{JSON.stringify(jsonFile)}</div>
          <Button onClick={handleImport}>Import JSON</Button>
        </>
      )}
    </div>
  );
}

export default ImportQuiz;
