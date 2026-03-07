export interface IOption {
  id: string | number;
  name: string;
  sortOrder: string;
  isCorrect: boolean;
}

export interface IQuiz {
  id: string | number;
  name: string;
  description: string;
  options: IOption[];
}
