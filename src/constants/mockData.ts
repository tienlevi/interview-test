import type { IQuiz } from "@/interfaces/quiz";

export const mockQuizzes: IQuiz = {
  name: "Football",
  description: "Choose correct answer",
  questions: [
    {
      id: 1,
      name: "How many Ballon d'Or awards has Ronaldo won?",
      description:
        "Select the correct number of Ballon d'Or titles Cristiano Ronaldo has received.",
      options: [
        {
          id: 1,
          name: "3",
          sortOrder: "A",
          isCorrect: false,
        },
        {
          id: 2,
          name: "4",
          sortOrder: "B",
          isCorrect: false,
        },
        {
          id: 3,
          name: "5",
          sortOrder: "C",
          isCorrect: true,
        },
        {
          id: 4,
          name: "7",
          sortOrder: "D",
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
          sortOrder: "A",
          isCorrect: true,
        },
        {
          id: 2,
          name: "Barca",
          sortOrder: "B",
          isCorrect: false,
        },
        {
          id: 3,
          name: "Man City",
          sortOrder: "C",
          isCorrect: false,
        },
        {
          id: 4,
          name: "Real Madrid",
          sortOrder: "D",
          isCorrect: true,
        },
      ],
    },
  ],
};
