"use client";
import React, { useContext, useEffect, useState } from "react";
import { defaultCodeType, defaultTestCaseType } from "./page";
import ProblemHeader from "./ProblemHeader";
import ProblemRenderer from "./ProblemRenderer";
import Editor from "@/components/editor/Editor";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  ProblemContext,
  problemContextType,
} from "@/store/ProblemContextProvider";
import { optionsType } from "./ProblemHeader";

const ProblemDescription = ({
  problemDescription,
  defaultTestCase,
  defaultCode,
  selectedProblem,
}: {
  problemDescription: string;
  defaultTestCase: defaultTestCaseType;
  defaultCode: defaultCodeType;
  selectedProblem: problemContextType;
}) => {
  const { setProblemSelected, setProblemDetails } = useContext(ProblemContext);
  const [options, setOptions] = useState<optionsType>("Description");
  const [isMobileView, setIsMobileView] = useState(false);

  React.useEffect(() => {
    const changeSize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    changeSize();

    window.addEventListener("resize", changeSize);

    return () => window.removeEventListener("resize", changeSize);
  }, []);

  useEffect(() => {
    if (selectedProblem) setProblemSelected(selectedProblem);
    if (selectedProblem && problemDescription) {
      setProblemDetails({
        description: problemDescription,
        defaultTestCase: defaultTestCase,
        defaultCode: defaultCode,
        _id: selectedProblem._id,
        difficulty: selectedProblem.difficulty,
        problemName: selectedProblem.problemName,
        problemTitle: selectedProblem.problemTitle,
        problemNumber: selectedProblem.problemNumber,
      });
    }
  }, [selectedProblem, ProblemDescription]);

  // Mobile view - fixed stacked layout
  if (isMobileView) {
    return (
      <div className="min-h-[calc(100vh-60px)] p-1 flex flex-col gap-1 bg-black">
        <ProblemHeader
          problemDescription={problemDescription}
          options={options}
          setOptions={setOptions}
        />

        <Editor
          defaultTestCase={defaultTestCase}
          defaultCode={defaultCode}
          options={options}
          setOptions={setOptions}
        />
      </div>
    );
  }
  return (
    <ResizablePanelGroup
      direction={isMobileView ? "vertical" : "horizontal"}
      className="min-h-[calc(100vh-60px)] p-1 gap-1 dark:bg-black bg-[#F8F9FA]"
    >
      <ResizablePanel defaultSize={50}>
        <div className="dark:bg-[rgba(13,17,23)] bg-white h-full rounded-sm flex flex-col p-1">
          <ProblemHeader
            problemDescription={problemDescription}
            options={options}
            setOptions={setOptions}
          />
          {/* <ProblemRenderer problemDescription={problemDescription} /> */}
        </div>
      </ResizablePanel>
      <ResizableHandle className="w-1 bg-gray-600" />
      <ResizablePanel defaultSize={50}>
        <Editor
          defaultTestCase={defaultTestCase}
          defaultCode={defaultCode}
          options={options}
          setOptions={setOptions}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

export default ProblemDescription;
