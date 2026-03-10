export interface IOption {
  id: string;
  name: string;
  isCorrect: boolean;
  canDelete: boolean;
}

export interface IQuestion {
  id?: string;
  name: string;
  description: string;
  options: IOption[];
}
