import React from "react";
import DisplayProblems from "./DisplayProblems";
import Courses from "./Articles";
import { problemsType } from "@/app/page";
import Articles from "./Articles";

export default function HomePage({ problems }: { problems: problemsType[] }) {
  return (
    <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 bg-gray-100 dark:bg-[rgba(13,17,23)] min-h-screen">
      <Articles />
      <DisplayProblems problems={problems} />
    </div>
  );
}
