import type { Routes } from "@/interfaces/route";
import Home from "@/pages/Home";
import QuizEditor from "@/pages/QuizEditor";

export const routers: Routes[] = [
  {
    href: "/",
    id: "home",
    name: "Home",
    element: <Home />,
  },
  {
    href: "/quiz-editor",
    id: "quiz-editor",
    name: "QuizEditor",
    element: <QuizEditor />,
  },
];
