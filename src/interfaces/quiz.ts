import { IQuestion } from "./question";

export interface IQuiz {
  name: string;
  description: string;
  questions: IQuestion[];
}
