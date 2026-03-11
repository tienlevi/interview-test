import { ChangeEvent, useRef, useState } from "react";
import styles from "./styles.module.css";

function ImportQuiz() {
  const [jsonFile, setJSONFile] = useState();
  const fileRef = useRef<HTMLInputElement>(null);

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
        <div className={styles.json}>{JSON.stringify(jsonFile)}</div>
      )}
    </div>
  );
}

export default ImportQuiz;
