import { IQuiz } from "@/interfaces/quiz";
import { create } from "zustand";

interface Store {
  quiz: IQuiz;
  setQuiz: (quiz: IQuiz) => void;
}

const quizLocalStorage = JSON.parse(
  localStorage.getItem("quiz") as string,
) as IQuiz;

const useQuizStore = create<Store>((set) => ({
  quiz: quizLocalStorage,
  setQuiz: (quiz) => {
    localStorage.setItem("quiz", JSON.stringify(quiz));
    set({ quiz: quiz });
  },
}));

export default useQuizStore;
