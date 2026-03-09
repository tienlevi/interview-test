export interface IOption {
  id: string;
  name: string;
  sortOrder: number;
  isCorrect: boolean;
  canDelete?: boolean;
}

export interface IQuiz {
  id: string;
  name: string;
  description: string;
  options: IOption[];
}
