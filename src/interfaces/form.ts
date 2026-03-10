import { IOption } from "./question";

export interface FormQuestionValues {
  questionName: string;
  questionDescription: string;
  options: IOption[];
}

export interface FormValues {
  name: string;
  description: string;
  questionName: string;
  questionDescription: string;
  options: IOption[];
}
