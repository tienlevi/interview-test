import { IOption } from "./question";

export interface FormValues {
  name: string;
  description: string;
  questionName: string;
  questionDescription: string;
  options: IOption[];
}
