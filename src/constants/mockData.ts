import type { IQuiz } from "@/interfaces/quiz";

export const mockQuizzes: IQuiz[] = [
  {
    id: 1,
    name: "How many Ballon d'Or awards has Ronaldo won?",
    description:
      "Select the correct number of Ballon d'Or titles Cristiano Ronaldo has received.",
    options: [
      {
        id: 1,
        name: "3",
        sortOrder: 1,
        isCorrect: false,
      },
      {
        id: 2,
        name: "4",
        sortOrder: 2,
        isCorrect: false,
      },
      {
        id: 3,
        name: "5",
        sortOrder: 3,
        isCorrect: true,
      },
      {
        id: 4,
        name: "7",
        sortOrder: 4,
        isCorrect: false,
      },
    ],
  },
  {
    id: 2,
    name: "What clubs did Casemiro play ?",
    description: "Select the correct clubs of Casemiro has played.",
    options: [
      {
        id: 1,
        name: "Man United",
        sortOrder: 1,
        isCorrect: true,
      },
      {
        id: 2,
        name: "Barca",
        sortOrder: 2,
        isCorrect: false,
      },
      {
        id: 3,
        name: "Man City",
        sortOrder: 3,
        isCorrect: false,
      },
      {
        id: 4,
        name: "Real Madrid",
        sortOrder: 4,
        isCorrect: true,
      },
    ],
  },
];
