import { IOption } from "@/interfaces/question";
import { randomId } from "@/utils/random";

export const defaultOptionValues: IOption[] = [
  {
    id: randomId(),
    name: "",
    canDelete: false,
    isCorrect: false,
  },
  {
    id: randomId(),
    name: "",
    canDelete: false,
    isCorrect: false,
  },
];
