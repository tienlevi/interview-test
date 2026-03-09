import { IOption } from "@/interfaces/quiz";
import { randomId } from "@/utils/random";

export const defaultOptionValues: IOption[] = [
  {
    id: randomId(),
    name: "",
    sortOrder: 1,
    isCorrect: false,
    canDelete: false,
  },
  {
    id: randomId(),
    name: "",
    sortOrder: 2,
    isCorrect: false,
    canDelete: false,
  },
];
