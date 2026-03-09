export interface IOption {
  id: string | number;
  name: string;
  sortOrder: string;
  isCorrect: boolean;
}

export interface IQuestion {
  id: string | number;
  name: string;
  description: string;
  options: IOption[];
}

export interface IQuiz {
  name: string;
  description: string;
  questions: IQuestion[];
}
