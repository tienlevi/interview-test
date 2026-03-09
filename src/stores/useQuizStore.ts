import { IQuiz } from "@/interfaces/quiz";
import { create } from "zustand";

interface Store {
  quiz: IQuiz[];
  setQuiz: (quiz: IQuiz[]) => void;
}

const useQuizStore = create<Store>((set) => ({
  quiz: JSON.parse(localStorage.getItem("quiz") as string) || [],
  setQuiz: (quiz) => {
    localStorage.setItem("quiz", JSON.stringify(quiz));
    set({ quiz: quiz });
  },
}));

export default useQuizStore;
