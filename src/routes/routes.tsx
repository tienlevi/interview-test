import type { Routes } from "@/interfaces/route";
import Home from "@/pages/Home";

export const routers: Routes[] = [
  {
    href: "/",
    id: "home",
    name: "Home",
    element: <Home />,
  },
];
