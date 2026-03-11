import { IQuestion } from "@/interfaces/question";
import { IQuiz } from "@/interfaces/quiz";
import { create } from "zustand";

interface Store {
  quiz: IQuiz;
  questions: IQuestion[];
  setQuiz: (quiz: IQuiz) => void;
  setQuestions: (questions: IQuestion[]) => void;
}

const quizLocalStorage = JSON.parse(
  localStorage.getItem("quiz") as string,
) as IQuiz;

const useQuizStore = create<Store>((set) => ({
  quiz: quizLocalStorage,
  questions: quizLocalStorage?.questions,
  setQuiz: (quiz) => {
    localStorage.setItem("quiz", JSON.stringify(quiz));
    set({ quiz: quiz });
  },
  setQuestions: (questions) => {
    set({ questions: questions });
  },
}));

export default useQuizStore;
